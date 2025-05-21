---
sidebar_position: 6
---

# Phase 5: CI/CD Pipeline Setup

In this phase, we'll set up continuous integration and continuous deployment (CI/CD) pipelines to automate the build, test, and deployment processes for your applications.

## Step 5.1: Set Up GitOps Repository Structure

First, create a GitOps repository structure to manage your Kubernetes configurations:

```bash
# Create a new repository in your GitHub organization
# Clone it locally
git clone https://github.com/your-org/three-horizons-gitops.git
cd three-horizons-gitops

# Create directory structure
mkdir -p {base,overlays}/{dev,staging,prod}

# Create base kustomization file
cat > base/kustomization.yaml <<EOF
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- deployment.yaml
- service.yaml
EOF

# Create base deployment template
cat > base/deployment.yaml <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: three-horizons-app
  template:
    metadata:
      labels:
        app: three-horizons-app
    spec:
      containers:
      - name: app
        image: \${ACR_SERVER}/app:latest
        ports:
        - containerPort: 8080
        resources:
          limits:
            cpu: "1"
            memory: "1Gi"
          requests:
            cpu: "500m"
            memory: "512Mi"
EOF

# Create base service template
cat > base/service.yaml <<EOF
apiVersion: v1
kind: Service
metadata:
  name: app-service
spec:
  selector:
    app: three-horizons-app
  ports:
  - port: 80
    targetPort: 8080
  type: ClusterIP
EOF

# Create environment-specific overlays
for env in dev staging prod; do
  cat > overlays/$env/kustomization.yaml <<EOF
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: three-horizons-$env
resources:
- ../../base
- namespace.yaml
patchesStrategicMerge:
- deployment-patch.yaml
EOF

  cat > overlays/$env/namespace.yaml <<EOF
apiVersion: v1
kind: Namespace
metadata:
  name: three-horizons-$env
EOF

  cat > overlays/$env/deployment-patch.yaml <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-deployment
spec:
  replicas: $([ "$env" == "prod" ] && echo "3" || echo "1")
EOF
done

# Commit and push the GitOps structure
git add .
git commit -m "Initial GitOps repository structure"
git push
```

## Step 5.2: Configure Flux for GitOps

Install and configure Flux to manage GitOps deployments:

```bash
# Install Flux CLI
curl -s https://fluxcd.io/install.sh | sudo bash

# Check prerequisites
flux check --pre

# Bootstrap Flux on your cluster
flux bootstrap github \
  --owner=your-org \
  --repository=three-horizons-gitops \
  --branch=main \
  --path=./clusters/three-horizons \
  --personal

# Create a source for your GitOps repository
flux create source git three-horizons-gitops \
  --url=https://github.com/your-org/three-horizons-gitops \
  --branch=main \
  --interval=1m

# Create Kustomization for each environment
for env in dev staging prod; do
  flux create kustomization three-horizons-$env \
    --source=three-horizons-gitops \
    --path="./overlays/$env" \
    --prune=true \
    --interval=5m
done
```

## Step 5.3: Configure GitHub Actions for CI

Set up GitHub Actions workflows for continuous integration:

```yaml
# Save as .github/workflows/ci.yml in your application repositories

name: Continuous Integration

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
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
      
      - name: Lint code
        run: npm run lint
      
      - name: Run unit tests
        run: npm test
      
      - name: Run integration tests
        run: npm run test:integration
      
      - name: Build
        run: npm run build
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-artifacts
          path: dist/
```

## Step 5.4: Configure GitHub Actions for CD

Set up GitHub Actions workflows for continuous deployment:

```yaml
# Save as .github/workflows/cd.yml in your application repositories

name: Continuous Deployment

on:
  push:
    branches: [ main ]
    tags: [ 'v*' ]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      
      - name: Login to ACR
        uses: docker/login-action@v2
        with:
          registry: ${{ secrets.ACR_SERVER }}
          username: ${{ secrets.ACR_USERNAME }}
          password: ${{ secrets.ACR_PASSWORD }}
      
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v4
        with:
          images: ${{ secrets.ACR_SERVER }}/${{ github.repository }}
          tags: |
            type=semver,pattern={{version}}
            type=ref,event=branch
            type=sha,format=short
      
      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
      
      - name: Update GitOps repository
        uses: actions/checkout@v3
        with:
          repository: your-org/three-horizons-gitops
          token: ${{ secrets.GITOPS_PAT }}
          path: gitops
      
      - name: Update image tag in GitOps repository
        run: |
          cd gitops
          # Determine environment based on branch or tag
          if [[ "${{ github.ref }}" == "refs/heads/main" ]]; then
            ENV="staging"
          elif [[ "${{ github.ref }}" == refs/tags/* ]]; then
            ENV="prod"
          else
            ENV="dev"
          fi
          
          # Update the image tag in the appropriate environment
          IMAGE_TAG=$(echo "${{ steps.meta.outputs.tags }}" | head -n 1)
          sed -i "s|image: .*|image: $IMAGE_TAG|" overlays/$ENV/deployment-patch.yaml
          
          # Commit and push changes
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add overlays/$ENV/deployment-patch.yaml
          git commit -m "Update image to $IMAGE_TAG in $ENV environment"
          git push
```

## Step 5.5: Configure Deployment Approvals

Set up deployment approvals for production environments:

```yaml
# Save as .github/workflows/approval.yml in your application repositories

name: Production Deployment Approval

on:
  workflow_run:
    workflows: ["Continuous Deployment"]
    types:
      - completed
    branches:
      - main

jobs:
  wait-for-approval:
    runs-on: ubuntu-latest
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    environment: production-approval
    steps:
      - name: Approval notification
        run: echo "Production deployment has been approved"
      
  deploy-to-production:
    needs: wait-for-approval
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          repository: your-org/three-horizons-gitops
          token: ${{ secrets.GITOPS_PAT }}
      
      - name: Promote staging to production
        run: |
          # Copy the current staging image to production
          STAGING_IMAGE=$(grep -o 'image: .*' overlays/staging/deployment-patch.yaml)
          sed -i "s|image: .*|$STAGING_IMAGE|" overlays/prod/deployment-patch.yaml
          
          # Commit and push changes
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add overlays/prod/deployment-patch.yaml
          git commit -m "Promote staging image to production"
          git push
```

:::tip
For more advanced CI/CD patterns, consider implementing:
- Canary deployments
- Blue/green deployments
- Feature flags
- Automated rollbacks
:::
