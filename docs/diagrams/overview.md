---
sidebar_position: 1
---

# Overview Diagram

This diagram provides a high-level overview of the Three Horizons Platform architecture, showing the key components and their relationships.

<div className="diagram-container">
  <img src="/img/diagrams/overview-diagram.svg" alt="Three Horizons Platform Overview" style={{maxWidth: '100%', height: 'auto'}} />
</div>

## Key Components

The Three Horizons Platform consists of several integrated components:

1. **Azure Infrastructure Layer** - The foundation of the platform, providing compute, storage, networking, and security services
2. **Kubernetes Platform** - Azure Kubernetes Service (AKS) or Red Hat OpenShift on Azure (ARO) for container orchestration
3. **Red Hat Developer Hub** - The central developer portal providing access to templates, documentation, and tools
4. **GitHub Integration** - Source control, CI/CD pipelines, and collaboration features
5. **Monitoring & Observability** - End-to-end visibility across the platform

## Component Relationships

The diagram illustrates how these components interact:

- The Azure Infrastructure provides the foundation for all other components
- Kubernetes hosts the Developer Hub and application workloads
- GitHub integrates with the Developer Hub for source control and CI/CD
- Applications are deployed through standardized pipelines
- Monitoring spans all layers of the platform

## Next Steps

For more detailed architecture information, explore the following diagrams:

- [Network Diagram](network) - Detailed network architecture and security zones
- [Security Architecture](security) - Security controls and compliance features
- [Developer Hub Architecture](developer-hub) - Internal structure of the Developer Hub
- [CI/CD Pipeline](cicd) - Continuous integration and delivery workflows
