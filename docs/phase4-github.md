---
sidebar_position: 5
---

# Phase 4: GitHub Integration

In this phase, we'll connect the Three Horizons Platform with GitHub Enterprise to enable source control, collaboration, and CI/CD workflows.

## Step 4.1: Configure GitHub Authentication

First, set up authentication between the Developer Hub and GitHub Enterprise:

```bash
# Create a GitHub OAuth App
# 1. Go to your GitHub Enterprise organization settings
# 2. Navigate to Developer Settings > OAuth Apps > New OAuth App
# 3. Fill in the following details:
#    - Application name: Three Horizons Developer Hub
#    - Homepage URL: https://devhub.example.com
#    - Authorization callback URL: https://devhub.example.com/api/auth/github/handler/frame
# 4. Register the application and note the Client ID and Client Secret

# Store GitHub OAuth credentials in Key Vault
az keyvault secret set \
  --name github-oauth-client-id \
  --vault-name "$KEY_VAULT_NAME" \
  --value "<your-github-client-id>"

az keyvault secret set \
  --name github-oauth-client-secret \
  --vault-name "$KEY_VAULT_NAME" \
  --value "<your-github-client-secret>"

# Create Kubernetes secrets for GitHub OAuth
kubectl create secret generic github-oauth \
  --namespace developer-hub \
  --from-literal=client-id="<your-github-client-id>" \
  --from-literal=client-secret="<your-github-client-secret>"
```

## Step 4.2: Configure GitHub Integration for Developer Hub

Update the Developer Hub configuration to integrate with GitHub:

```bash
# Create a ConfigMap for GitHub integration
kubectl apply -f - <<EOF
apiVersion: v1
kind: ConfigMap
metadata:
  name: github-integration-config
  namespace: developer-hub
data:
  app-config.yaml: |
    app:
      title: Three Horizons Developer Hub
      baseUrl: https://devhub.example.com
    
    organization:
      name: Your Organization
    
    auth:
      environment: production
      providers:
        github:
          development:
            clientId: \${GITHUB_CLIENT_ID}
            clientSecret: \${GITHUB_CLIENT_SECRET}
    
    catalog:
      providers:
        github:
          yourOrgName:
            organization: your-github-org
            catalogPath: /catalog-info.yaml
            filters:
              branch: main
EOF

# Update the Developer Hub deployment to use the ConfigMap
kubectl patch backstage developer-hub -n developer-hub --type=merge -p '{
  "spec": {
    "extraVolumeMounts": [
      {
        "name": "github-config",
        "mountPath": "/opt/app-root/src/app-config.local.yaml",
        "subPath": "app-config.yaml"
      }
    ],
    "extraVolumes": [
      {
        "name": "github-config",
        "configMap": {
          "name": "github-integration-config"
        }
      }
    ],
    "extraEnvs": [
      {
        "name": "GITHUB_CLIENT_ID",
        "valueFrom": {
          "secretKeyRef": {
            "name": "github-oauth",
            "key": "client-id"
          }
        }
      },
      {
        "name": "GITHUB_CLIENT_SECRET",
        "valueFrom": {
          "secretKeyRef": {
            "name": "github-oauth",
            "key": "client-secret"
          }
        }
      }
    ]
  }
}'
```

## Step 4.3: Create GitHub Actions Workflows

Set up GitHub Actions workflows for CI/CD:

```yaml
# Example GitHub Actions workflow for a typical application
# Save this as .github/workflows/ci-cd.yml in your application repositories

name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      
      - name: Login to ACR
        uses: docker/login-action@v2
        with:
          registry: ${{ secrets.ACR_SERVER }}
          username: ${{ secrets.ACR_USERNAME }}
          password: ${{ secrets.ACR_PASSWORD }}
      
      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: ${{ secrets.ACR_SERVER }}/${{ github.repository }}:latest
      
      - name: Set up Kubernetes tools
        uses: azure/setup-kubectl@v3
      
      - name: Set AKS context
        uses: azure/aks-set-context@v3
        with:
          resource-group: three-horizons-platform
          cluster-name: three-horizons-aks
          admin: 'false'
          use-kubelogin: 'true'
          creds: ${{ secrets.AZURE_CREDENTIALS }}
      
      - name: Deploy to AKS
        run: |
          kubectl apply -f kubernetes/deployment.yaml
          kubectl apply -f kubernetes/service.yaml
```

## Step 4.4: Configure GitHub Copilot Enterprise

Set up GitHub Copilot Enterprise for AI-assisted development:

```bash
# 1. Go to your GitHub Enterprise organization settings
# 2. Navigate to GitHub Copilot > Policies
# 3. Enable GitHub Copilot for your organization
# 4. Set up access policies for your development teams
# 5. Configure any required compliance settings

# For individual developers, they can enable Copilot in their IDE:
# - For VS Code: Install the GitHub Copilot extension
# - For JetBrains IDEs: Install the GitHub Copilot plugin
# - For Visual Studio: Install the GitHub Copilot extension
```

## Step 4.5: Configure GitHub Advanced Security

Enable GitHub Advanced Security features for enhanced code security:

```bash
# 1. Go to your GitHub Enterprise organization settings
# 2. Navigate to Code security and analysis
# 3. Enable the following features:
#    - Dependabot alerts
#    - Dependabot security updates
#    - Code scanning
#    - Secret scanning

# Create a standard code scanning workflow
# Save this as .github/workflows/codeql-analysis.yml in your repositories

name: "CodeQL Analysis"

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * 0'

jobs:
  analyze:
    name: Analyze
    runs-on: ubuntu-latest
    permissions:
      security-events: write
      
    steps:
    - name: Checkout repository
      uses: actions/checkout@v3
      
    - name: Initialize CodeQL
      uses: github/codeql-action/init@v2
      with:
        languages: javascript, typescript
        
    - name: Perform CodeQL Analysis
      uses: github/codeql-action/analyze@v2
```
