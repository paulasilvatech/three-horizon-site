---
sidebar_position: 7
---

# Web Applications

This section provides architecture diagrams for different types of web applications that can be built using the Three Horizons Platform.

## Standard Web Application

The standard web application architecture provides a balanced approach suitable for most business applications:

<div className="diagram-container">
  <img src="/img/diagrams/web-application-standard.png" alt="Standard Web Application Architecture" style={{maxWidth: '100%', height: 'auto'}} />
</div>

### Key Components

- **Frontend** - React or Angular single-page application
- **Backend API** - RESTful or GraphQL API
- **Database** - Relational database for structured data
- **Authentication** - Microsoft Entra ID integration
- **Caching** - Redis for performance optimization
- **CDN** - Azure CDN for static content delivery

### Use Cases

This architecture is ideal for:
- Line-of-business applications
- Customer portals
- Admin dashboards
- Content management systems

## Microservices Web Application

The microservices architecture provides greater scalability and team autonomy for complex applications:

<div className="diagram-container">
  <img src="/img/diagrams/web-application-microservices.png" alt="Microservices Web Application Architecture" style={{maxWidth: '100%', height: 'auto'}} />
</div>

### Key Components

- **API Gateway** - Unified entry point for all microservices
- **Microservices** - Domain-focused services with independent lifecycles
- **Service Mesh** - For service discovery and communication
- **Event Bus** - For asynchronous communication between services
- **Polyglot Persistence** - Different database types for different services
- **Distributed Tracing** - End-to-end request tracking

### Use Cases

This architecture is ideal for:
- Large-scale applications
- Systems with complex domains
- Applications requiring independent scaling of components
- Multi-team development environments

## Serverless Web Application

The serverless architecture provides maximum scalability and minimal operational overhead:

<div className="diagram-container">
  <img src="/img/diagrams/web-application-serverless.png" alt="Serverless Web Application Architecture" style={{maxWidth: '100%', height: 'auto'}} />
</div>

### Key Components

- **Static Frontend** - Hosted in Azure Storage with CDN
- **API Management** - Gateway for serverless functions
- **Azure Functions** - Serverless compute for backend logic
- **Cosmos DB** - Globally distributed NoSQL database
- **Event Grid** - Event routing between components
- **Blob Storage** - Object storage for files and assets

### Use Cases

This architecture is ideal for:
- Variable or unpredictable workloads
- Minimizing operational overhead
- Rapid development and deployment
- Cost optimization for sporadic usage patterns

## Next Steps

For more information on implementing these architectures, refer to:

- [Golden Paths Guide](../golden-paths) - Standardized implementation patterns
- [Inner Loop Development](../inner-loop-development) - Local development workflow
- [Outer Loop Deployment](../outer-loop-deployment) - CI/CD pipeline integration
