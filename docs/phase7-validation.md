---
sidebar_position: 8
---

# Phase 7: Platform Validation

In this phase, we'll validate the Three Horizons Platform to ensure all components are working correctly and integrated properly.

## Step 7.1: Validate Infrastructure Components

First, let's validate the core infrastructure components:

```bash
# Validate AKS/ARO cluster health
kubectl get nodes
kubectl get pods --all-namespaces

# Check cluster version and status
az aks show \
  --resource-group three-horizons-platform \
  --name three-horizons-aks \
  --query "{Name:name, K8sVersion:kubernetesVersion, ProvisioningState:provisioningState, Fqdn:fqdn}" \
  -o table

# Validate networking
kubectl run -it --rm --restart=Never network-test --image=mcr.microsoft.com/aks/fundamental/base-ubuntu:v0.0.11 -- bash -c "apt-get update && apt-get install -y curl && curl -s http://developer-hub.developer-hub.svc"

# Validate storage
kubectl create -f - <<EOF
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: validation-pvc
  namespace: default
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
EOF

kubectl get pvc validation-pvc
```

## Step 7.2: Validate Developer Hub

Validate the Red Hat Developer Hub deployment:

```bash
# Check Developer Hub pods
kubectl get pods -n developer-hub

# Check Developer Hub services
kubectl get svc -n developer-hub

# Check Developer Hub ingress/route
kubectl get ingress -n developer-hub

# Validate Developer Hub API
kubectl run -it --rm --restart=Never curl-test --image=curlimages/curl -- curl -s http://developer-hub.developer-hub.svc/api/catalog/entities

# Clean up test pod
kubectl delete pod curl-test
```

## Step 7.3: Validate GitHub Integration

Validate the GitHub integration:

```bash
# Check GitHub OAuth secrets
kubectl get secrets -n developer-hub github-oauth -o yaml

# Validate GitHub API access (requires GitHub CLI)
gh auth status

# Test repository access
gh repo list your-org --limit 5
```

## Step 7.4: Validate CI/CD Pipelines

Validate the CI/CD pipeline setup:

```bash
# Check Flux installation
flux check

# List Flux sources
flux get sources git

# List Flux kustomizations
flux get kustomizations

# Trigger a test pipeline in GitHub Actions
gh workflow run ci.yml -R your-org/your-repo

# Check workflow status
gh run list -R your-org/your-repo -L 5
```

## Step 7.5: Validate Monitoring

Validate the monitoring setup:

```bash
# Check Prometheus pods
kubectl get pods -n monitoring

# Check Grafana service
kubectl get svc -n monitoring prometheus-grafana

# Test Prometheus API
kubectl port-forward -n monitoring svc/prometheus-operated 9090:9090 &
curl -s http://localhost:9090/api/v1/targets | jq '.data.activeTargets | length'
pkill -f "port-forward"

# Validate Azure Monitor
az monitor log-analytics query \
  --workspace $(az monitor log-analytics workspace show --resource-group three-horizons-platform --workspace-name three-horizons-workspace --query customerId -o tsv) \
  --analytics-query "KubeNodeInventory | summarize count()" \
  -o table
```

## Step 7.6: End-to-End Testing

Perform end-to-end testing of the platform:

```bash
# Deploy a test application
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: test-app
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: test-app
  template:
    metadata:
      labels:
        app: test-app
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: test-app
  namespace: default
spec:
  selector:
    app: test-app
  ports:
  - port: 80
    targetPort: 80
  type: ClusterIP
EOF

# Verify deployment
kubectl get pods -l app=test-app
kubectl get svc test-app

# Test application access
kubectl port-forward svc/test-app 8080:80 &
curl -s http://localhost:8080
pkill -f "port-forward"

# Clean up test application
kubectl delete deployment test-app
kubectl delete service test-app
```

## Step 7.7: Security Validation

Validate the security configuration:

```bash
# Check network policies
kubectl get networkpolicies --all-namespaces

# Check pod security policies or pod security standards
kubectl get podsecuritypolicies 2>/dev/null || echo "Using Pod Security Standards instead of PSPs"

# Check RBAC configuration
kubectl get clusterroles,clusterrolebindings | grep -i three-horizons

# Validate Key Vault integration
az keyvault secret list --vault-name "$KEY_VAULT_NAME" --query "[].{Name:name}" -o table

# Check for exposed secrets
kubectl get secrets --all-namespaces | grep -v "kubernetes.io/service-account-token"
```

:::tip Validation Checklist
Use this checklist to ensure all components are properly validated:
- [ ] AKS/ARO cluster is healthy and accessible
- [ ] Developer Hub is deployed and accessible
- [ ] GitHub integration is working correctly
- [ ] CI/CD pipelines are configured and operational
- [ ] Monitoring and alerting are set up
- [ ] Security controls are in place
- [ ] End-to-end application deployment works
:::
