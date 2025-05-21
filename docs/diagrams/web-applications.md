---
sidebar_position: 7
title: Web Application Patterns
---

# Web Application Patterns

The Three Horizons Platform supports multiple web application deployment patterns, each optimized for different use cases and requirements.

## Microservices Architecture

The microservices pattern is ideal for complex, scalable applications that need independent scaling and deployment of components.

![Web Application Microservices Pattern](/img/diagrams/web-application-microservices.png)

### Key Features

- Container-based microservices running on Azure Kubernetes Service
- API Gateway for unified access and security
- Independent scaling of individual services
- Service mesh for inter-service communication
- Event-driven communication between services

## Serverless Architecture

The serverless pattern is optimized for event-driven workloads with variable traffic patterns and minimal operational overhead.

![Web Application Serverless Pattern](/img/diagrams/web-application-serverless.png)

### Key Features

- Azure Functions for back-end processing
- Azure Static Web Apps for front-end hosting
- Pay-per-execution pricing model
- Auto-scaling without capacity planning
- Event-driven architecture
- Reduced operational complexity

## Standard Web Application

The standard web application pattern provides a balanced approach for typical web applications with more predictable traffic patterns.

![Web Application Standard Pattern](/img/diagrams/web-application-standard.png)

### Key Features

- App Service for web application hosting
- Azure SQL Database for relational data
- Azure Redis Cache for session and data caching
- Azure CDN for content delivery
- Integrated authentication and authorization
- Simplified DevOps workflow

## Pattern Selection Criteria

When selecting a web application pattern, consider the following factors:

- **Complexity**: Microservices for complex applications, Standard or Serverless for simpler ones
- **Scale**: Microservices or Serverless for highly variable workloads
- **Development Expertise**: Standard for traditional web expertise, Microservices for distributed systems expertise
- **Cost Model**: Serverless for optimizing costs with unpredictable traffic
- **Operational Overhead**: Serverless for minimal ops, Standard for moderate, Microservices for highest control with higher overhead

## Next Steps

For more information on implementing these architectures, refer to:

- [Golden Paths Guide](../golden-paths) - Standardized implementation patterns
- [Inner Loop Development](../inner-loop-development) - Local development workflow
- [Outer Loop Deployment](../outer-loop-deployment) - CI/CD pipeline integration
