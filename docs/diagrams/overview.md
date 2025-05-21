---
sidebar_position: 1
title: Architecture Overview
---

# Architecture Overview

The Three Horizons Platform utilizes a modern microservices architecture pattern deployed on Azure Kubernetes Service (AKS). This architecture enables scalability, resilience, and maintainability through service isolation and independent deployment.

## Architecture Diagram

![Microservices Architecture Pattern](/img/diagrams/microservices-architecture.png)

## Key Components

### API Gateway
The API Gateway serves as the entry point for all client requests, routing them to appropriate microservices. It handles cross-cutting concerns like:
- Request routing
- Authentication and authorization
- Rate limiting
- Request/response transformation
- API documentation

Technologies used include Azure API Management, NGINX, or Envoy.

### Microservices
The platform consists of multiple domain-focused microservices:

**Users Service**
- Handles user authentication and authorization
- Manages user profiles and preferences
- Integrates with identity providers

**Products Service**
- Maintains product catalog
- Manages inventory and availability
- Handles product search and filtering

**Orders Service**
- Processes customer orders
- Manages order fulfillment
- Handles payment processing
- Tracks shipping and delivery

### Event Bus / Message Broker
The event bus facilitates asynchronous communication between microservices using a publish-subscribe model. This enables:
- Loose coupling between services
- Reliable message delivery
- Event-driven architecture patterns

Azure Service Bus or Event Hubs are used as the messaging infrastructure.

### Databases
Each microservice maintains its own database, allowing for:
- Independent data models
- Technology selection based on service needs
- Scalability without affecting other services
- Isolation of data concerns

The Analytics database aggregates data from various services for reporting and analysis purposes.

## Benefits of This Architecture

1. **Scalability**: Services can be scaled independently based on demand
2. **Resilience**: Failure in one service doesn't bring down the entire system
3. **Technology Flexibility**: Each service can use the most appropriate technology stack
4. **Development Agility**: Teams can work independently on different services
5. **Deployment Independence**: Services can be deployed without affecting others
6. **Organizational Alignment**: Services can align with business capabilities 