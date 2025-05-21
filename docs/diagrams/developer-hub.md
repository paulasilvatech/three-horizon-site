---
sidebar_position: 4
---

# Developer Hub Architecture

This diagram illustrates the architecture of the Red Hat Developer Hub, a central component of the Three Horizons Platform that provides a unified developer experience.

## Developer Hub Portal

Below is a screenshot of the actual Red Hat Developer Hub portal interface, showing the integration of various tools and services:

<div className="portal-screenshot-container">
  <img src="/img/dev-hub-portal-sample.png" alt="Red Hat Developer Hub Portal" className="portal-screenshot" />
</div>

The portal provides a unified experience with quick access to GitHub Enterprise, GitHub Copilot, Microsoft DevBox, VS Code, Azure DevOps, and other essential development tools.

## Architecture Diagram

The following diagram shows the technical architecture of the Developer Hub:

<div className="diagram-container">
  <img src="/img/diagrams/developer-hub-architecture.svg" alt="Developer Hub Architecture" style={{maxWidth: '100%', height: 'auto'}} />
</div>

## Key Components

The Developer Hub consists of several integrated components:

1. **Portal Frontend** - The web interface that developers interact with
2. **Catalog Service** - Manages the software catalog and component metadata
3. **Scaffolder** - Generates new projects from templates
4. **Template Engine** - Processes and renders templates
5. **Plugin System** - Extends functionality through plugins
6. **Backend Services** - Provides API access and integration points

## Core Features

The Developer Hub provides several core features:

- **Software Catalog** - Inventory of all software components and their relationships
- **Template Library** - Standardized templates for creating new components
- **Documentation Portal** - Centralized technical documentation
- **API Registry** - Catalog of available APIs and their specifications
- **Developer Workflows** - Guided processes for common development tasks
- **Insights Dashboard** - Metrics and analytics for development activities

## Integration Points

The Developer Hub integrates with several platform components:

- **GitHub** - Source code repositories and CI/CD workflows
- **Kubernetes** - Deployment targets for applications
- **Azure Services** - Cloud resources and managed services
- **Monitoring Tools** - Application and infrastructure monitoring
- **Identity Provider** - Authentication and authorization

## User Personas

The Developer Hub serves different user personas:

- **Application Developers** - Building and deploying applications
- **Platform Engineers** - Managing the platform and creating templates
- **DevOps Engineers** - Implementing CI/CD pipelines
- **Architects** - Defining standards and patterns
- **Product Owners** - Tracking development progress

## Next Steps

For more detailed architecture information, explore the following diagrams:

- [CI/CD Pipeline](cicd) - How the Developer Hub integrates with CI/CD workflows
- [Integration Diagram](integration) - How the Developer Hub connects with other systems
- [Workflow Diagram](/img/diagrams/workflow-diagram.svg) - Developer workflows enabled by the Hub
