---
sidebar_position: 7
---

# Phase 6: Monitoring & Observability

In this phase, we'll set up comprehensive monitoring and observability for the Three Horizons Platform to ensure optimal performance and quick troubleshooting.

## Step 6.1: Deploy Azure Monitor for Containers

First, let's set up Azure Monitor for container insights:

```bash
# Enable monitoring add-on if not already enabled during AKS creation
az aks enable-addons \
  --resource-group three-horizons-platform \
  --name three-horizons-aks \
  --addons monitoring

# For ARO, enable monitoring through the Azure portal or with:
az monitor log-analytics workspace create \
  --resource-group three-horizons-platform \
  --workspace-name three-horizons-workspace \
  --location centralus

# Get the workspace ID and key
WORKSPACE_ID=$(az monitor log-analytics workspace show \
  --resource-group three-horizons-platform \
  --workspace-name three-horizons-workspace \
  --query customerId -o tsv)

WORKSPACE_KEY=$(az monitor log-analytics workspace get-shared-keys \
  --resource-group three-horizons-platform \
  --workspace-name three-horizons-workspace \
  --query primarySharedKey -o tsv)

# Deploy the monitoring agent to ARO
oc create namespace azure-monitoring
oc project azure-monitoring

# Create secret for the Log Analytics workspace
oc create secret generic oms-agent \
  --from-literal=WSID=$WORKSPACE_ID \
  --from-literal=KEY=$WORKSPACE_KEY

# Deploy the monitoring agent
oc apply -f https://raw.githubusercontent.com/Microsoft/OMS-docker/master/Kubernetes/container-azm-ms-agentconfig.yaml
```

## Step 6.2: Configure Prometheus and Grafana

Deploy Prometheus and Grafana for detailed metrics:

```bash
# Add Prometheus Helm repository
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Create monitoring namespace
kubectl create namespace monitoring

# Install Prometheus using Helm
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --set grafana.adminPassword="StrongPassword123!" \
  --set prometheus.prometheusSpec.serviceMonitorSelectorNilUsesHelmValues=false \
  --set prometheus.prometheusSpec.podMonitorSelectorNilUsesHelmValues=false

# Expose Grafana service
kubectl patch svc prometheus-grafana \
  --namespace monitoring \
  --type='json' \
  -p '[{"op":"replace","path":"/spec/type","value":"LoadBalancer"}]'

# Get Grafana external IP
GRAFANA_IP=$(kubectl get svc prometheus-grafana \
  --namespace monitoring \
  -o jsonpath='{.status.loadBalancer.ingress[0].ip}')

echo "Grafana is available at: http://$GRAFANA_IP"
echo "Username: admin"
echo "Password: StrongPassword123!"
```

## Step 6.3: Configure Application Insights

Set up Application Insights for application-level monitoring:

```bash
# Create Application Insights resource
az monitor app-insights component create \
  --app three-horizons-insights \
  --location centralus \
  --resource-group three-horizons-shared \
  --application-type web \
  --kind web

# Get the instrumentation key
APPINSIGHTS_KEY=$(az monitor app-insights component show \
  --app three-horizons-insights \
  --resource-group three-horizons-shared \
  --query instrumentationKey -o tsv)

# Store the key in Key Vault
az keyvault secret set \
  --name appinsights-key \
  --vault-name "$KEY_VAULT_NAME" \
  --value "$APPINSIGHTS_KEY"

# Create Kubernetes secret for applications
kubectl create secret generic appinsights-secret \
  --namespace three-horizons-system \
  --from-literal=instrumentationKey="$APPINSIGHTS_KEY"
```

## Step 6.4: Configure Log Analytics Queries

Set up useful Log Analytics queries for monitoring:

```bash
# Example KQL queries for monitoring AKS/ARO clusters

# CPU usage by node
cat > cpu-by-node-query.kql <<EOF
Perf
| where ObjectName == "K8SNode" 
| where CounterName == "cpuUsageNanoCores" 
| summarize CPUUsageCores = max(CounterValue) / 1000000000 by Computer, bin(TimeGenerated, 1m) 
| render timechart
EOF

# Memory usage by node
cat > memory-by-node-query.kql <<EOF
Perf
| where ObjectName == "K8SNode" 
| where CounterName == "memoryRssBytes" 
| summarize MemoryUsageGB = max(CounterValue) / 1073741824 by Computer, bin(TimeGenerated, 1m) 
| render timechart
EOF

# Pod restarts
cat > pod-restarts-query.kql <<EOF
KubePodInventory
| where ContainerRestartCount > 0
| project TimeGenerated, Computer, Namespace, Name, ContainerRestartCount
| summarize TotalRestarts = max(ContainerRestartCount) by Computer, Namespace, Name
| sort by TotalRestarts desc
EOF

# Failed deployments
cat > failed-deployments-query.kql <<EOF
KubeEvents
| where not(isempty(Namespace))
| where Reason in ("Failed", "FailedCreate", "FailedScheduling")
| project TimeGenerated, Namespace, Name, Reason, Message
| sort by TimeGenerated desc
EOF

echo "KQL queries have been saved to the current directory"
```

## Step 6.5: Create Monitoring Dashboards

Create custom dashboards for monitoring:

```bash
# Create a custom dashboard in Azure Portal
az portal dashboard create \
  --resource-group three-horizons-shared \
  --name three-horizons-dashboard \
  --location centralus \
  --input-path ./dashboard-template.json

# Note: You'll need to create the dashboard-template.json file separately
# or use the Azure Portal to create and export a dashboard
```

## Step 6.6: Configure Alerts

Set up alerts for critical conditions:

```bash
# Create an action group for notifications
az monitor action-group create \
  --resource-group three-horizons-shared \
  --name three-horizons-alerts \
  --short-name th-alerts \
  --email-receiver name=admin email=admin@example.com

# Create an alert for high CPU usage
az monitor metrics alert create \
  --resource-group three-horizons-platform \
  --name high-cpu-alert \
  --scopes $(az aks show --resource-group three-horizons-platform --name three-horizons-aks --query id -o tsv) \
  --condition "avg Percentage CPU > 80" \
  --window-size 5m \
  --evaluation-frequency 1m \
  --action $(az monitor action-group show --resource-group three-horizons-shared --name three-horizons-alerts --query id -o tsv)

# Create an alert for high memory usage
az monitor metrics alert create \
  --resource-group three-horizons-platform \
  --name high-memory-alert \
  --scopes $(az aks show --resource-group three-horizons-platform --name three-horizons-aks --query id -o tsv) \
  --condition "avg Percentage Memory > 80" \
  --window-size 5m \
  --evaluation-frequency 1m \
  --action $(az monitor action-group show --resource-group three-horizons-shared --name three-horizons-alerts --query id -o tsv)
```

:::tip
For production environments, consider implementing:
- Distributed tracing with Jaeger or Zipkin
- Custom metrics collection for business KPIs
- Log aggregation with Elasticsearch, Fluentd, and Kibana (EFK stack)
- Service mesh observability with Istio or Linkerd
:::
