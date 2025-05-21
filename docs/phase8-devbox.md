---
sidebar_position: 9
---

# Phase 8: Microsoft DevBox Configuration

In this phase, we'll set up Microsoft DevBox to provide cloud-based developer environments that are pre-configured with all the tools and access needed for the Three Horizons Platform.

## Step 8.1: Create DevBox Project

First, let's create a Microsoft DevBox project:

```bash
# Create a DevBox project
az devcenter admin project create \
  --name three-horizons-devbox \
  --resource-group three-horizons-shared \
  --location centralus \
  --description "Developer environments for Three Horizons Platform"

# Create a DevBox pool
az devcenter admin devbox-definition create \
  --devbox-definition-name standard-devbox \
  --project-name three-horizons-devbox \
  --resource-group three-horizons-shared \
  --image-reference "microsoftwindowsdesktop:windows-ent-cpc:win11-21h2-ent:latest" \
  --os-storage-type ssd \
  --sku general_i_8c32gb256ssd
```

## Step 8.2: Configure DevBox Network Connection

Set up network connectivity for DevBox:

```bash
# Create a network connection
az devcenter admin network-connection create \
  --name three-horizons-network \
  --resource-group three-horizons-shared \
  --location centralus \
  --domain-join-type none \
  --subnet-id $(az network vnet subnet show --resource-group three-horizons-platform --vnet-name three-horizons-vnet --name services-subnet --query id -o tsv)

# Attach network connection to project
az devcenter admin project network-connection attach \
  --project-name three-horizons-devbox \
  --resource-group three-horizons-shared \
  --network-connection-name three-horizons-network \
  --network-connection-resource-group three-horizons-shared
```

## Step 8.3: Create DevBox Pool

Create a pool of DevBoxes for developers:

```bash
# Create a DevBox pool
az devcenter admin devbox-pool create \
  --name three-horizons-pool \
  --project-name three-horizons-devbox \
  --resource-group three-horizons-shared \
  --devbox-definition-name standard-devbox \
  --network-connection-name three-horizons-network \
  --network-connection-resource-group three-horizons-shared \
  --local-administrator enabled
```

## Step 8.4: Configure DevBox Image

Create a custom DevBox image with pre-installed tools:

```bash
# Create a custom image using Azure Image Builder
az image builder create \
  --resource-group three-horizons-shared \
  --name three-horizons-devbox-image \
  --image-template @devbox-image-template.json

# Start the image build
az image builder run \
  --resource-group three-horizons-shared \
  --name three-horizons-devbox-image

# Wait for the image build to complete
az image builder wait \
  --resource-group three-horizons-shared \
  --name three-horizons-devbox-image \
  --custom "status.runState=='Completed'"

# Get the image ID
IMAGE_ID=$(az image builder show \
  --resource-group three-horizons-shared \
  --name three-horizons-devbox-image \
  --query "outputResources[0].id" -o tsv)

# Update the DevBox definition to use the custom image
az devcenter admin devbox-definition update \
  --devbox-definition-name standard-devbox \
  --project-name three-horizons-devbox \
  --resource-group three-horizons-shared \
  --image-reference $IMAGE_ID
```

## Step 8.5: Configure DevBox Tools and Extensions

Create a script to install required tools and extensions:

```powershell
# Create a PowerShell script for DevBox setup
cat > devbox-setup.ps1 <<EOF
# Install Chocolatey
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install development tools
choco install -y git
choco install -y vscode
choco install -y nodejs-lts
choco install -y python
choco install -y azure-cli
choco install -y kubernetes-cli
choco install -y kubernetes-helm
choco install -y docker-desktop
choco install -y github-desktop

# Install VS Code extensions
code --install-extension ms-vscode.azure-account
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-kubernetes-tools.vscode-kubernetes-tools
code --install-extension github.copilot
code --install-extension github.vscode-pull-request-github
code --install-extension redhat.vscode-yaml

# Configure Git
git config --global user.name "Three Horizons Developer"
git config --global user.email "developer@example.com"

# Clone starter repositories
mkdir -p C:/Projects
cd C:/Projects
git clone https://github.com/your-org/three-horizons-templates.git

# Create desktop shortcuts
$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut("$env:USERPROFILE\Desktop\Developer Hub.lnk")
$Shortcut.TargetPath = "https://devhub.example.com"
$Shortcut.Save()
EOF

# Upload the script to Azure Storage for use in DevBox
az storage blob upload \
  --account-name yourstorageaccount \
  --container-name scripts \
  --name devbox-setup.ps1 \
  --file devbox-setup.ps1 \
  --auth-mode login
```

## Step 8.6: Assign Users to DevBox

Assign users to the DevBox project:

```bash
# Assign users to the DevBox project
az role assignment create \
  --role "DevCenter DevBox User" \
  --assignee-object-id $(az ad user show --id developer@example.com --query id -o tsv) \
  --scope $(az devcenter admin project show --name three-horizons-devbox --resource-group three-horizons-shared --query id -o tsv)

# Create a DevBox for a specific user
az devcenter dev devbox create \
  --name developer-devbox \
  --project-name three-horizons-devbox \
  --pool-name three-horizons-pool
```

## Step 8.7: Configure DevBox Policies

Set up policies for DevBox usage:

```bash
# Create an auto-stop policy
az devcenter admin devbox-pool update \
  --name three-horizons-pool \
  --project-name three-horizons-devbox \
  --resource-group three-horizons-shared \
  --auto-stop-time 30
```

## Step 8.8: Configure DevBox Access

Set up access to internal resources:

```bash
# Create a private endpoint for DevBox to access internal resources
az network private-endpoint create \
  --resource-group three-horizons-shared \
  --name devbox-acr-endpoint \
  --vnet-name three-horizons-vnet \
  --subnet endpoint-subnet \
  --private-connection-resource-id $(az acr show --name $ACR_NAME --resource-group three-horizons-shared --query id -o tsv) \
  --group-id registry \
  --connection-name devbox-acr-connection

# Create a private DNS zone for ACR
az network private-dns zone create \
  --resource-group three-horizons-shared \
  --name privatelink.azurecr.io

# Link the private DNS zone to the VNet
az network private-dns link vnet create \
  --resource-group three-horizons-shared \
  --zone-name privatelink.azurecr.io \
  --name acr-dns-link \
  --virtual-network three-horizons-vnet \
  --registration-enabled false

# Create DNS records for the private endpoint
az network private-endpoint dns-zone-group create \
  --resource-group three-horizons-shared \
  --endpoint-name devbox-acr-endpoint \
  --name acr-zone-group \
  --private-dns-zone privatelink.azurecr.io \
  --zone-name acr
```

:::tip
For a complete developer experience, consider:
- Creating custom DevBox images with pre-installed tools and configurations
- Setting up automatic repository cloning
- Configuring IDE settings and extensions
- Providing sample projects and templates
- Creating documentation shortcuts
:::
