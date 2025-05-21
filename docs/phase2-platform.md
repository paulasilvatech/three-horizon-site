---
sidebar_position: 3
---

# Phase 2: Platform Installation

Now let's install the core platform components: Azure Kubernetes Service (AKS) or Azure Red Hat OpenShift (ARO).

## Implementation Options

You can choose between AKS or ARO based on your organization's requirements. Follow the appropriate option below.

## Option A: AKS Installation

### Step 2.A.1: Create AKS Cluster

```bash
# Create AKS cluster with modern features
az aks create \
  --resource-group three-horizons-platform \
  --name three-horizons-aks \
  --node-count 3 \
  --enable-managed-identity \
  --enable-workload-identity \
  --enable-oidc-issuer \
  --enable-addons monitoring \
  --network-plugin azure \
  --network-plugin-mode overlay \
  --vnet-subnet-id $(az network vnet subnet show --resource-group three-horizons-platform --vnet-name three-horizons-vnet --name aks-subnet --query id -o tsv) \
  --docker-bridge-address 172.17.0.1/16 \
  --dns-service-ip 10.2.0.10 \
  --service-cidr 10.2.0.0/24 \
  --node-vm-size Standard_D4s_v3 \
  --kubernetes-version 1.28.3 \
  --tags Environment=Production Project=ThreeHorizons \
  --generate-ssh-keys
```

### Step 2.A.2: Connect to AKS Cluster

```bash
# Get credentials
az aks get-credentials \
  --resource-group three-horizons-platform \
  --name three-horizons-aks

# Verify connection
kubectl get nodes
```

### Step 2.A.3: Configure Workload Identity

```bash
# Get AKS OIDC issuer URL
AKS_OIDC_ISSUER="$(az aks show -n three-horizons-aks -g three-horizons-platform --query "oidcIssuerProfile.issuerUrl" -o tsv)"

# Create a Kubernetes service account and establish federated identity
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  annotations:
    azure.workload.identity/client-id: $IDENTITY_CLIENT_ID
  name: workload-identity-sa
  namespace: default
EOF

# Create federated identity credential
az identity federated-credential create \
  --name three-horizons-federated-credential \
  --identity-name three-horizons-identity \
  --resource-group three-horizons-shared \
  --issuer $AKS_OIDC_ISSUER \
  --subject system:serviceaccount:default:workload-identity-sa
```

:::info LEARN MORE
Review our [AKS architecture documentation](./architecture) for details on how AKS fits into the Three Horizons architecture and [Azure Workload Identity documentation](https://learn.microsoft.com/en-us/azure/aks/workload-identity-overview).
:::

## Option B: ARO Installation

### Step 2.B.1: Create ARO Cluster

```bash
# Register required resource providers
az provider register --namespace Microsoft.RedHatOpenShift --wait
az provider register --namespace Microsoft.Compute --wait
az provider register --namespace Microsoft.Storage --wait
az provider register --namespace Microsoft.Authorization --wait

# Create master and worker subnets
az network vnet subnet create \
  --resource-group three-horizons-platform \
  --vnet-name three-horizons-vnet \
  --name aro-master-subnet \
  --address-prefixes 10.0.8.0/23 \
  --service-endpoints Microsoft.ContainerRegistry

az network vnet subnet create \
  --resource-group three-horizons-platform \
  --vnet-name three-horizons-vnet \
  --name aro-worker-subnet \
  --address-prefixes 10.0.10.0/23 \
  --service-endpoints Microsoft.ContainerRegistry

# Update subnet for Azure CNI networking
az network vnet subnet update \
  --name aro-master-subnet \
  --resource-group three-horizons-platform \
  --vnet-name three-horizons-vnet \
  --private-link-service-network-policies Disabled

# Create ARO cluster with current OpenShift version
az aro create \
  --resource-group three-horizons-platform \
  --name three-horizons-aro \
  --vnet three-horizons-vnet \
  --master-subnet aro-master-subnet \
  --worker-subnet aro-worker-subnet \
  --apiserver-visibility Public \
  --ingress-visibility Public \
  --pull-secret @pull-secret.txt \
  --worker-count 3 \
  --worker-vm-size Standard_D4s_v3 \
  --tags Environment=Production Project=ThreeHorizons
```

### Step 2.B.2: Connect to ARO Cluster

```bash
# Get the console URL
az aro show \
  --name three-horizons-aro \
  --resource-group three-horizons-platform \
  --query consoleProfile.url -o tsv

# Get the API server URL
az aro show \
  --name three-horizons-aro \
  --resource-group three-horizons-platform \
  --query apiserverProfile.url -o tsv

# Get login credentials
az aro list-credentials \
  --name three-horizons-aro \
  --resource-group three-horizons-platform

# Login with oc CLI (substitute with your actual API URL from above)
oc login "$(az aro show --name three-horizons-aro --resource-group three-horizons-platform --query apiserverProfile.url -o tsv)" -u kubeadmin -p "<password-from-previous-command>" --insecure-skip-tls-verify=true

# Verify connection
oc get nodes
```

:::note
The ARO console URL will open the web UI. Use the kubeadmin credentials to log in. For production environments, configure Microsoft Entra ID integration for authentication. See [ARO Azure AD integration](https://learn.microsoft.com/en-us/azure/openshift/configure-azure-ad-ui).
:::

## Step 2.3: Configure RBAC

Set up role-based access control for your cluster:

```bash
# Create namespace for platform components
kubectl create namespace three-horizons-system

# Apply RBAC configuration
kubectl apply -f - <<EOF
apiVersion: v1
kind: ServiceAccount
metadata:
  name: platform-admin
  namespace: three-horizons-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: platform-admin
subjects:
- kind: ServiceAccount
  name: platform-admin
  namespace: three-horizons-system
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
EOF
```
