---
sidebar_position: 2
---

# Network Diagram

This diagram illustrates the network architecture of the Three Horizons Platform, showing the different security zones, connectivity patterns, and network controls.

![Three Horizons Platform Network Architecture](/img/diagrams/network-diagram.svg)

## Network Zones

The Three Horizons Platform implements a multi-layered network architecture with distinct security zones:

1. **Public Zone** - Internet-facing components with appropriate security controls
2. **DMZ** - Semi-trusted zone for components that need both internal and external connectivity
3. **Application Zone** - Secure zone for application workloads
4. **Data Zone** - Highly restricted zone for data storage and processing
5. **Management Zone** - Isolated zone for platform administration

## Key Network Components

The network architecture includes several key components:

- **Azure Front Door** - Global entry point with WAF protection
- **Application Gateway** - L7 load balancing and traffic management
- **Azure Firewall** - Network-level security and traffic filtering
- **Network Security Groups (NSGs)** - Subnet-level access controls
- **Private Endpoints** - Secure connectivity to Azure PaaS services
- **Azure ExpressRoute** - Dedicated connectivity to on-premises networks

## Network Security Controls

Multiple layers of security controls protect the network:

- **DDoS Protection** - Azure DDoS Protection Standard for all public endpoints
- **Web Application Firewall (WAF)** - OWASP Top 10 protection
- **Network Segmentation** - Strict isolation between zones
- **Traffic Inspection** - Deep packet inspection for all cross-zone traffic
- **Private DNS** - Internal name resolution with no public exposure

## Connectivity Patterns

The diagram shows several connectivity patterns:

- **Ingress Traffic** - External user access to applications
- **Egress Traffic** - Controlled outbound connectivity
- **East-West Traffic** - Communication between services
- **Hybrid Connectivity** - Integration with on-premises systems

## Next Steps

For more detailed architecture information, explore the following diagrams:

- [Security Architecture](security) - Comprehensive security controls and compliance features
- [Integration Diagram](integration) - How the platform integrates with external systems
- [Three Horizons Architecture](../architecture) - Overall platform architecture
