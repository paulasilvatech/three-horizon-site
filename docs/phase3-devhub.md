---
sidebar_position: 4
---

# Phase 3: Developer Hub Deployment

Now let's deploy the Red Hat Developer Hub (RHDH) version 1.5, which is the central component for the Three Horizons Platform.

## Step 3.1: Install Operator Lifecycle Manager

```bash
# For AKS
curl -sL https://github.com/operator-framework/operator-lifecycle-manager/releases/download/v0.26.0/install.sh | bash -s v0.26.0

# For ARO, OLM is already installed - verify with:
oc get pods -n openshift-operator-lifecycle-manager
```

## Step 3.2: Install Developer Hub Operator

```bash
# Create namespace
kubectl create namespace developer-hub

# For AKS: Install OLM Catalog Sources for Red Hat Operators
cat <<EOF | kubectl apply -f -
apiVersion: operators.coreos.com/v1alpha1
kind: CatalogSource
metadata:
  name: redhat-operators
  namespace: olm
spec:
  displayName: Red Hat Operators
  publisher: Red Hat
  sourceType: grpc
  image: registry.redhat.io/redhat/redhat-operator-index:v4.13
  updateStrategy:
    registryPoll:
      interval: 30m
EOF

# Create OperatorGroup
cat <<EOF | kubectl apply -f -
apiVersion: operators.coreos.com/v1
kind: OperatorGroup
metadata:
  name: developer-hub-operatorgroup
  namespace: developer-hub
spec: {}
EOF

# Deploy Developer Hub Operator v1.5
cat <<EOF | kubectl apply -f -
apiVersion: operators.coreos.com/v1alpha1
kind: Subscription
metadata:
  name: rhdh-operator
  namespace: developer-hub
spec:
  channel: fast-1.5
  name: rhdh
  source: redhat-operators
  sourceNamespace: openshift-marketplace
EOF

# For ARO, OLM is already installed so you only need to create the OperatorGroup and Subscription
# Wait for the operator to be installed
kubectl wait --for=condition=ready pod -l app=rhdh-operator -n developer-hub --timeout=300s
```

:::note
For ARO/OpenShift clusters, the Operator Lifecycle Manager (OLM) is already installed. You only need to create the OperatorGroup and Subscription. The correct channel for RHDH 1.5 is "fast-1.5".

For detailed operator configuration, see the [Red Hat Developer Hub documentation](https://developers.redhat.com/rhdh/1.5/getting_started).
:::

## RHDH 1.5 Key Features

Red Hat Developer Hub 1.5 introduces several important enhancements and features:

1. **Dynamic Plugins Architecture**:
   - Plugin loading without container rebuilds
   - Hot-swappable plugins for runtime customization
   - Simplified plugin management through Kubernetes resources

2. **Enhanced Software Catalog**:
   - Improved component discovery
   - Automatic relationship mapping
   - Advanced filtering and search capabilities
   - Extended metadata support

3. **Template Improvements**:
   - Template parameters validation
   - Conditional template steps
   - Enhanced template authoring experience
   - Output preview capabilities

4. **Integration Improvements**:
   - Native OpenShift integration
   - Enhanced Kubernetes resource visualization
   - Improved CI/CD integration

## Step 3.3: Configure Managed Database

For production environments, we recommend using a managed database service:

```bash
# Generate a unique timestamp for the server name to avoid naming conflicts
TIMESTAMP=$(date +"%m%d%H%M")
DB_SERVER_NAME="backstagedb-${TIMESTAMP}"

# Create Azure Database for PostgreSQL flexible server
# Run these commands one at a time to avoid issues with multiline commands
az postgres flexible-server create \
  --resource-group three-horizons-shared \
  --name ${DB_SERVER_NAME} \
  --admin-user backstage \
  --admin-password "StrongPassword123!" \
  --sku-name Standard_D2s_v3 \
  --tier GeneralPurpose \
  --storage-size 32 \
  --version 14 \
  --high-availability ZoneRedundant \
  --location centralus \
  --database-name backstage \
  --tags Environment=Production Project=ThreeHorizons

# Configure firewall rule to allow Azure services
az postgres flexible-server firewall-rule create \
  --resource-group three-horizons-shared \
  --name ${DB_SERVER_NAME} \
  --rule-name AllowAzureServices \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0

# Store database credentials in Key Vault (ensure KEY_VAULT_NAME is set correctly)
az keyvault secret set \
  --name db-password \
  --vault-name "$KEY_VAULT_NAME" \
  --value "StrongPassword123!"

# Get the database host and store it in a variable
DB_HOST=$(az postgres flexible-server show \
  --resource-group three-horizons-shared \
  --name ${DB_SERVER_NAME} \
  --query fullyQualifiedDomainName \
  --output tsv)

# Create Kubernetes secret for database connection
kubectl create secret generic developer-hub-postgres \
  --namespace developer-hub \
  --from-literal=postgres-password="StrongPassword123!"
```

:::warning
For production, use a more secure method to manage passwords, such as retrieving them from Key Vault using managed identities.
:::

## Step 3.4: Deploy Developer Hub Instance

```bash
# Deploy Red Hat Developer Hub instance v1.5
kubectl apply -f - <<EOF
apiVersion: rhdh.redhat.com/v1alpha1
kind: Backstage
metadata:
  name: developer-hub
  namespace: developer-hub
spec:
  application:
    replicas: 2
    resources:
      requests:
        cpu: "1"
        memory: "2Gi"
      limits:
        cpu: "2"
        memory: "4Gi"
  database:
    host: "${DB_HOST}"
    port: 5432
    name: "backstage"
    user: "backstage"
    passwordSecret:
      name: "developer-hub-postgres"
      key: "postgres-password"
  rbac:
    enabled: true
  extraEnvs:
    - name: RHDH_CONFIG_APP_CONFIG_app_baseUrl
      value: "https://devhub.example.com"
    - name: RHDH_DYNAMIC_PLUGINS_BACKEND_DYNAMIC_PLUGINS
      value: "true"
EOF
```
