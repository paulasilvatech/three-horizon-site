---
sidebar_position: 1
---

# Platform Vision

The Three Horizons Platform represents a revolutionary approach to enterprise software development, unifying Microsoft Azure, Red Hat Developer Hub, and GitHub into a seamless, integrated experience. This vision document outlines what the platform is, its key differentiators, and the advantages it brings to development teams, platform teams, and business leaders.

## What is the Three Horizons Platform?

The Three Horizons Platform is a comprehensive engineering system built on the principles of DevOps that seeks to improve security, compliance, cost efficiency, and time-to-market for enterprise development teams. It embodies a product-oriented mindset, providing a cohesive set of tools and systems that enhance developer experiences through self-service capabilities within a secure, governed framework.

As the first platform that truly unifies Microsoft Azure, Red Hat Developer Hub, and GitHub into one integrated development experience, Three Horizons eliminates the traditional dilemma between buying limited off-the-shelf solutions or building complex platforms in-house. Instead, it offers a modern engineering platform that integrates the best of Azure infrastructure, application innovation, and data/AI capabilities into a cohesive experience.

The platform is structured around three core components:

1. **Application Platform** - The foundation that provides runtime environments, compute resources, networking, storage, and essential platform services.

2. **Engineering System** - A comprehensive set of tools and processes that support the entire software development lifecycle, from ideation to deployment and monitoring.

3. **Application Templates** - Pre-configured, standardized templates that accelerate development across various application types, from web and mobile applications to AI/data science projects and IoT solutions.

## Understanding Platform Engineering, Backstage, and Red Hat Developer Hub

### What is Platform Engineering?

Platform engineering is a discipline within software development that focuses on building and maintaining internal developer platforms (IDPs) to improve productivity, security, compliance, and time-to-market. It evolved from DevOps principles to address the growing complexity of modern software development environments.

At its core, platform engineering aims to create self-service capabilities for software engineering organizations through toolchains and workflows that abstract away infrastructure complexity. This allows developers to focus on writing code and delivering features rather than managing underlying infrastructure and tooling.

Key characteristics of platform engineering include:

- **Self-service capabilities** that empower developers to provision resources and deploy applications without manual intervention
- **Standardized workflows** that enforce best practices and governance
- **Abstraction of complexity** through automation and well-designed interfaces
- **Improved developer experience** through streamlined processes and reduced cognitive load
- **Centralized governance** that ensures security and compliance without impeding productivity

Platform engineering teams typically create and maintain internal developer platforms that serve as the foundation for all software development activities within an organization. These platforms integrate various tools and services into a cohesive experience, reducing fragmentation and improving efficiency.

### What is Backstage?

Backstage is an open-source framework for building internal developer portals, originally created by Spotify and later donated to the Cloud Native Computing Foundation (CNCF). It was developed to address the challenges of managing thousands of microservices and providing a consistent developer experience across a large engineering organization.

Backstage unifies all infrastructure tooling, services, and documentation with a single, consistent user interface. At its center is a software catalog that serves as a centralized registry of all software components, APIs, resources, and documentation within an organization.

Key features of Backstage include:

- **Software Catalog**: A centralized inventory of all software assets in the organization
- **Service Templates**: Pre-configured templates for creating new services and applications
- **Documentation**: Integrated technical documentation using Markdown
- **Plugin Architecture**: Extensible system for adding new functionality
- **TechDocs**: Documentation-as-code approach for maintaining up-to-date documentation
- **API Registry**: Catalog of all APIs in the organization

Backstage helps organizations restore order to their microservices and infrastructure by providing a unified portal where developers can find all the resources they need. It reduces cognitive load by centralizing information and standardizing workflows, allowing developers to focus on creating value rather than navigating complex tooling.

### What is Red Hat Developer Hub?

Red Hat Developer Hub is an enterprise distribution of Backstage that enhances the open-source framework with additional features, support, and integration capabilities specifically designed for enterprise environments. It serves as a comprehensive internal developer platform that brings together all the tools and resources developers need in one place.

Red Hat Developer Hub extends Backstage with:

- **Enterprise Support**: Full support from Red Hat for production deployments
- **Enhanced Security**: Additional security features and compliance capabilities
- **OpenShift Integration**: Seamless integration with Red Hat OpenShift and other Red Hat products
- **Enterprise Authentication**: Advanced authentication and authorization mechanisms
- **Dynamic Plugins**: Plugins that can be updated without redeploying the entire platform
- **Data Aggregation**: Ability to aggregate data from different sources including CI/CD systems, cloud providers, access management, and source control

The Developer Hub simplifies the installation and configuration of Backstage, making it more accessible to enterprise organizations. It provides a curated set of plugins and integrations that work well together, reducing the effort required to build and maintain an internal developer platform.

In the context of the Three Horizons Platform, Red Hat Developer Hub serves as the central portal that unifies Microsoft Azure, GitHub, and other tools into a cohesive developer experience. It provides the interface through which developers interact with the platform, access resources, and manage their applications throughout the development lifecycle.

## Key Differentiators

The Three Horizons Platform stands apart from other solutions through several key differentiators:

### Unified Portal Experience

At the heart of the platform is the Red Hat Developer Hub, installable on Azure Red Hat OpenShift (ARO) or Azure Kubernetes Service (AKS) based on customer preference. This hub creates a seamless portal that brings together all essential tools and platforms in one place, eliminating fragmentation and accelerating development cycles.

The Developer Hub extends the upstream Backstage product with additional enterprise features such as:

- Integration with OpenShift and Azure services
- Enterprise role-based access control (RBAC)
- Dynamic plugins that can be updated without redeploying the entire platform
- Aggregation of data from different sources including CI/CD systems, cloud providers, access management, and source control
- A comprehensive Software Catalog that functions as the central source for locating applications, APIs, and resources

### Complete Automation

The platform delivers end-to-end automation for infrastructure provisioning and CI/CD pipelines via GitHub Actions and ARM templates. This automation extends across the entire application lifecycle, from development environment setup to production deployment and monitoring.

Key integration points include:

- GitHub Enterprise, Copilot, Actions, and Advanced Security directly accessible through the Developer Hub
- Microsoft DevBox and VS Code integration for consistent development environments
- Azure DevOps and Azure Pipelines for enterprise CI/CD capabilities
- OpenShift on Azure providing the hybrid cloud foundation

### Flexibility and Choice

Applications developed on the Three Horizons Platform can be deployed on AKS, ARO, or both, giving organizations the flexibility to choose the right environment for each workload. This flexibility extends to development tools and workflows, allowing teams to use their preferred tools within the platform's governance framework.

The platform includes pre-configured ARO and Azure deployment templates, creating standardized environments that maintain governance while enabling self-service for development teams.

### Enhanced Developer Experience

The Three Horizons Platform dramatically improves the developer experience through:

- Accelerated onboarding that makes developers productive in minutes, not days or weeks
- Consistent environments through standardized DevBox templates
- Reduced cognitive load with Golden Paths that guide developers through common workflows
- AI-assisted development through GitHub Copilot integration
- Streamlined lifecycle management from inner loop development to outer loop deployment

## Advantages for Stakeholders

The Three Horizons Platform delivers specific advantages to different stakeholder groups:

### For Development Teams

Development teams benefit from a streamlined, productive environment that allows them to focus on creating value rather than managing infrastructure:

- **Accelerated Onboarding**: Developers become productive in minutes, not days or weeks, with pre-configured environments and clear documentation.

- **Consistent Environments**: Standardized DevBox templates ensure everyone works in identical environments, eliminating "works on my machine" issues.

- **Reduced Cognitive Load**: Golden Paths guide developers through common workflows without requiring deep platform knowledge, allowing them to focus on application logic.

- **AI-Assisted Development**: GitHub Copilot integration enhances developer productivity and code quality through intelligent code suggestions and pair programming.

- **Streamlined Lifecycle**: Seamless transitions from inner loop development to outer loop deployment reduce friction and accelerate delivery.

### For Platform Teams

Platform engineering teams gain comprehensive control and visibility across the entire development ecosystem:

- **Simplified Management**: A single pane of glass for administering the entire developer platform reduces operational complexity.

- **Enhanced Visibility**: Comprehensive monitoring and analytics across all platform components provide insights into usage patterns and potential bottlenecks.

- **Integrated Security**: Unified security controls and policies ensure consistent protection across all environments and applications.

- **Standardized Operations**: Consistent operations and automation reduce manual effort and minimize the risk of configuration drift.

- **Governance Compliance**: Built-in controls meet organizational and regulatory requirements without impeding developer productivity.

### For Business Leaders

Business stakeholders realize tangible business outcomes that directly impact the organization's ability to innovate and compete:

- **Faster Time-to-Market**: Reduced development cycles and accelerated innovation help organizations respond more quickly to market opportunities.

- **Lower Operational Costs**: Optimized resource utilization and reduced platform maintenance overhead improve cost efficiency.

- **Improved Quality**: Consistent processes and automated testing increase overall software quality and reliability.

- **Scalable Solutions**: The platform easily scales from small teams to enterprise-wide adoption, supporting growth and organizational change.

- **Competitive Advantage**: The ability to deploy new features and capabilities ahead of competitors creates sustainable business differentiation.

## Transformation Potential

The Three Horizons Platform represents more than just a set of integrated tools—it embodies a transformational approach to software delivery. By providing integrated engineering platforms, it enables a significant reduction in environment setup time and accelerates development cycles, transforming software delivery from a barrier to a strategic business enabler.

This transformation potential is realized through:

- Elimination of silos between development, operations, and security teams
- Standardization of processes and tools across the organization
- Automation of repetitive tasks and reduction of manual handoffs
- Enablement of self-service capabilities within a governed framework
- Creation of a continuous feedback loop that drives ongoing improvement

## Conclusion

The Three Horizons Platform represents a significant advancement in enterprise development platforms, bringing together the best of Microsoft Azure, Red Hat Developer Hub, and GitHub into a unified, cohesive experience. By addressing the needs of development teams, platform teams, and business leaders, it delivers a comprehensive solution that accelerates innovation, improves quality, and reduces costs.

As organizations continue to face increasing pressure to deliver software faster and with higher quality, the Three Horizons Platform provides a strategic advantage by transforming the way software is developed, deployed, and managed. It is not just a platform but a catalyst for digital transformation and business innovation.
