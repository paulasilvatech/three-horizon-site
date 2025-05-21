---
sidebar_position: 1
---

# Introduction

Welcome to the definitive tutorial for implementing a complete Three Horizons Platform. This guide will walk you through each step of the integration process, from infrastructure provisioning to full platform operation.

## Your Complete Integration Journey

At each stage, we'll provide detailed instructions, external references, and links to internal documentation. This tutorial follows the Three Horizons model, helping you build capabilities progressively.

:::note RECOMMENDED IMPLEMENTATION PATH
This tutorial is the primary documentation for implementing the Three Horizons Platform. It provides a comprehensive, step-by-step guide with detailed commands, code samples, and validation procedures.
:::

## Three Horizons Platform Architecture

The Three Horizons Platform integrates three main technology pillars to create a unified developer experience:

### Key Components

#### Microsoft Azure - Cloud infrastructure and platform services
- Azure Kubernetes Service (AKS)
- Azure Red Hat OpenShift (ARO)
- Microsoft Entra ID (formerly Azure Active Directory)
- Azure Monitor and Log Analytics
- Azure Container Registry

#### Red Hat Developer Hub - Developer portal and experience platform
- Software Catalog
- Golden Path Templates
- Technical Documentation
- Self-Service Portal
- Unified Developer Experience

#### GitHub Enterprise Cloud - Source control, collaboration, and CI/CD
- Source Repository Management
- GitHub Actions for automated CI/CD workflows
- GitHub Copilot Enterprise for AI-assisted development
- GitHub Advanced Security for code scanning and secret detection
- GitHub Codespaces for cloud-based development environments

## Implementation Phases

The complete implementation is divided into 8 phases:

1. **Infrastructure Provisioning** - Setting up Azure foundation
2. **Platform Installation** - Installing AKS/ARO and core services
3. **Developer Hub Deployment** - Deploying Red Hat Developer Hub
4. **GitHub Integration** - Connecting with GitHub Enterprise
5. **CI/CD Pipeline Setup** - Implementing GitOps workflows
6. **Monitoring & Observability** - Setting up monitoring stack
7. **Platform Validation** - Testing and validation
8. **Microsoft DevBox Configuration** - Setting up developer environments

## Prerequisites

Before beginning this tutorial, ensure you have:

- **Azure Subscription** with appropriate permissions
  - Owner or Contributor role
  - Quota for required resources
- **Required Tools**:
  - Azure CLI v2.53.0 or later
  - kubectl v1.28.0 or later
  - Git v2.42.0 or later
  - GitHub CLI v2.40.0 or later
- **Access Credentials**:
  - GitHub Enterprise account
  - Microsoft Entra ID administrator access
  - OpenShift Pull Secret (for ARO)
