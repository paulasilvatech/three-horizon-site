---
sidebar_position: 2
---

# Phase 1: Infrastructure Provisioning

In this phase, we'll set up the foundational Azure infrastructure required for the Three Horizons Platform.

## Step 1.1: Resource Group Creation

First, create resource groups to organize your resources:

```bash
# Login to Azure
az login

# Set your subscription
az account set --subscription "<subscription-id>"

# Create resource group for the platform with tags
az group create \
  --name three-horizons-platform \
  --location centralus \
  --tags Environment=Production Project=ThreeHorizons Owner=PlatformTeam

# Create resource group for shared services
az group create \
  --name three-horizons-shared \
  --location centralus \
  --tags Environment=Production Project=ThreeHorizons Owner=PlatformTeam
```

:::tip NOTE
For production environments, consider using separate resource groups for each major component.
Read more in the [Azure cloud foundations guide](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/).
:::

## Step 1.2: Virtual Network Setup

Create the virtual network and subnets:

```bash
# Create the virtual network with proper address space
az network vnet create \
  --resource-group three-horizons-platform \
  --name three-horizons-vnet \
  --address-prefix 10.0.0.0/16 \
  --subnet-name aks-subnet \
  --subnet-prefix 10.0.0.0/22 \
  --tags Environment=Production Project=ThreeHorizons

# Create subnet for Azure services
az network vnet subnet create \
  --resource-group three-horizons-platform \
  --vnet-name three-horizons-vnet \
  --name services-subnet \
  --address-prefix 10.0.4.0/24

# Create subnet for private endpoints
az network vnet subnet create \
  --resource-group three-horizons-platform \
  --vnet-name three-horizons-vnet \
  --name endpoint-subnet \
  --address-prefix 10.0.5.0/24 \
  --disable-private-endpoint-network-policies true
```

## Step 1.3: Create Key Vault

Create an Azure Key Vault to store secrets:

```bash
# Create Key Vault with access policies and network rules
az keyvault create \
  --name "th3horizons$(date +%s)" \
  --resource-group three-horizons-shared \
  --location centralus \
  --sku standard \
  --enable-rbac-authorization true \
  --tags Environment=Production Project=ThreeHorizons Owner=PlatformTeam

# Capture the Key Vault name for future use
KEY_VAULT_NAME=$(az keyvault list --resource-group three-horizons-shared --query "[0].name" -o tsv)

# Important: Assign yourself the necessary permissions to manage secrets
az role assignment create \
  --role "Key Vault Secrets Officer" \
  --assignee "$(az account show --query user.name -o tsv)" \
  --scope "$(az keyvault show --name "$KEY_VAULT_NAME" --resource-group three-horizons-shared --query id -o tsv)"
```

:::warning IMPORTANT - Key Vault Permissions
When using RBAC for Key Vault, you must explicitly assign the "Key Vault Secrets Officer" role to any user or service principal that needs to manage secrets. Without this permission, you'll receive a "Caller is not authorized to perform action on resource" error when trying to access or modify secrets.
:::

## Step 1.4: Create Container Registry

Set up Azure Container Registry:

```bash
# Create Container Registry with geo-replication and unique name
# Using timestamp to ensure uniqueness
ACR_NAME="threehorizonsreg$(date +%s)"
az acr create \
  --name $ACR_NAME \
  --resource-group three-horizons-shared \
  --location centralus \
  --sku Premium \
  --admin-enabled false \
  --tags Environment=Production Project=ThreeHorizons

# Store the ACR name for future use (important for subsequent commands)
echo "Container Registry name: $ACR_NAME"

# Enable geo-replication for production workloads
az acr replication create \
  --registry $ACR_NAME \
  --location eastus2
```

## Step 1.5: Create Managed Identity for Workload Identity

Create managed identities for modern authentication:

```bash
# Create user-assigned managed identity
az identity create \
  --name three-horizons-identity \
  --resource-group three-horizons-shared \
  --tags Environment=Production Project=ThreeHorizons

# Get identity client ID and principal ID
IDENTITY_CLIENT_ID=$(az identity show --name three-horizons-identity --resource-group three-horizons-shared --query clientId -o tsv)
IDENTITY_PRINCIPAL_ID=$(az identity show --name three-horizons-identity --resource-group three-horizons-shared --query principalId -o tsv)

# Grant access to Key Vault
az role assignment create \
  --assignee-object-id $IDENTITY_PRINCIPAL_ID \
  --assignee-principal-type ServicePrincipal \
  --role "Key Vault Secrets User" \
  --scope $(az keyvault show --name "$KEY_VAULT_NAME" --resource-group three-horizons-shared --query id -o tsv)
```

## Horizon 1 (Foundation) Validation

Validate your infrastructure setup:

```bash
# Verify resource groups
az group list --query "[?contains(name, 'three-horizons')]" -o table

# Verify virtual network and subnets
az network vnet subnet list \
  --resource-group three-horizons-platform \
  --vnet-name three-horizons-vnet \
  -o table

# Verify Key Vault
az keyvault show --name "$KEY_VAULT_NAME" -o table

# Verify Container Registry
az acr show --name $ACR_NAME -o table

# Verify managed identity
az identity show --name three-horizons-identity --resource-group three-horizons-shared -o table
```
