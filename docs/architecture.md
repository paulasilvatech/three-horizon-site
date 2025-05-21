---
sidebar_position: 10
---

# Architecture Overview

This document provides a comprehensive overview of the Three Horizons Platform architecture, explaining the key components, their relationships, and the design principles that guide the platform implementation.

<div className="diagram-container">
  <img src="/img/diagrams/architecture-diagram.svg" alt="Three Horizons Architecture" style={{maxWidth: '100%', height: 'auto'}} />
</div>

## Platform Layers

The Three Horizons Platform consists of several logical layers:

### 1. Infrastructure Layer

The foundation of the platform, providing compute, storage, networking, and security services:

- **Azure Infrastructure** - Cloud resources and services
- **Network Architecture** - Segmented network with security controls
- **Identity Foundation** - Microsoft Entra ID integration

### 2. Platform Layer

The container orchestration and management layer:

- **Azure Kubernetes Service (AKS)** or **Red Hat OpenShift on Azure (ARO)**
- **Service Mesh** - For service discovery and communication
- **Ingress Controllers** - For external access to services
- **Persistent Storage** - For stateful applications

### 3. Developer Experience Layer

Tools and services that enhance developer productivity:

- **Red Hat Developer Hub** - Central developer portal
- **GitHub Integration** - Source control and CI/CD
- **Template Catalog** - Standardized application templates
- **Self-Service Portal** - Developer-focused interface

### 4. Application Layer

The business applications built on the platform:

- **Web Applications** - User-facing interfaces
- **APIs and Microservices** - Business logic and data access
- **Event-Driven Components** - Asynchronous processing
- **Data Services** - Storage and analytics

### 5. Operations Layer

Tools and processes for managing the platform:

- **Monitoring & Observability** - Azure Monitor and Application Insights
- **Logging** - Centralized log management
- **Alerting** - Proactive notification system
- **Automation** - Infrastructure as Code and GitOps

## Key Components

### Azure Infrastructure

The platform leverages several Azure services:

- **Azure Virtual Network** - Network foundation
- **Azure Kubernetes Service** - Container orchestration
- **Azure Container Registry** - Image storage
- **Azure Key Vault** - Secrets management
- **Azure Monitor** - Monitoring and alerting
- **Azure Storage** - Object and file storage

### Red Hat Developer Hub

The Developer Hub provides a unified developer experience:

- **Software Catalog** - Inventory of all components
- **Template Library** - Standardized templates
- **Documentation Portal** - Technical documentation
- **API Registry** - API specifications
- **Developer Workflows** - Guided processes

### GitHub Integration

GitHub provides source control and CI/CD capabilities:

- **Repositories** - Code storage and version control
- **GitHub Actions** - CI/CD workflows
- **Pull Requests** - Code review process
- **GitHub Advanced Security** - Security scanning
- **GitHub Packages** - Artifact storage

## Design Principles

The Three Horizons Platform is built on several key design principles:

1. **Developer-Centric** - Optimize for developer productivity and experience
2. **Secure by Design** - Security integrated at every layer
3. **Cloud-Native** - Leverage cloud services and patterns
4. **Standardized Patterns** - Consistent approaches for common tasks
5. **Automation First** - Automate repetitive tasks and processes
6. **Observable** - Comprehensive monitoring and logging
7. **Scalable** - Ability to grow with business needs
8. **Compliant** - Meet regulatory and organizational requirements

## Next Steps

For more detailed information about specific aspects of the architecture, explore:

- [Network Diagram](diagrams/network) - Detailed network architecture
- [Security Architecture](diagrams/security) - Security controls and compliance
- [Developer Hub Architecture](diagrams/developer-hub) - Developer experience components
- [CI/CD Pipeline](diagrams/cicd) - Continuous integration and delivery
- [Integration Architecture](diagrams/integration) - External system integration
- [Web Applications](diagrams/web-applications) - Application architecture patterns
