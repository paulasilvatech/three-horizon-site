---
sidebar_position: 2
title: Network Architecture
---

# Network Architecture

The Three Horizons Platform implements a secure and scalable network architecture that provides isolation, protection, and connectivity for all platform components.

## Key Network Components

### Virtual Networks

- **Hub-and-Spoke Topology** for centralized connectivity and security
- Network segmentation for workload isolation
- Dedicated subnets for different service types
- Network Security Groups (NSGs) for traffic control
- Azure DDoS Protection for infrastructure protection

### Connectivity

- **Azure ExpressRoute** for private connectivity to on-premises
- VPN Gateways for secure remote access
- Azure Firewall for network traffic filtering
- Web Application Firewall (WAF) for HTTP/HTTPS protection
- Private Endpoints for secure PaaS connectivity

### DNS and Service Discovery

- Azure Private DNS for internal name resolution
- DNS forwarding for hybrid connectivity
- Custom DNS solutions for complex scenarios
- Service discovery mechanisms for microservices

### Network Monitoring

- Network Watcher for visibility and troubleshooting
- Flow logs for traffic analysis
- NSG analytics for security insights
- Network Performance Monitor for connectivity health
- Traffic Analytics for network insights

## Security Controls

The network architecture implements multiple layers of security:

1. **Perimeter Security**: Azure Firewall, DDoS Protection, WAF
2. **Network Segmentation**: NSGs, Application Security Groups
3. **Secure Connectivity**: Private Link, Service Endpoints
4. **Traffic Inspection**: TLS inspection, Intrusion Detection
5. **Identity-Based Access**: Zero Trust Network Access principles

## Network Patterns

The platform supports various network patterns to address different use cases:

- **Public-Facing Applications**: Secured through WAF and CDN
- **Internal Applications**: Private access through Private Link
- **Hybrid Connectivity**: ExpressRoute for on-premises integration
- **Multi-Region**: Global VNet peering for cross-region communication
- **DMZ Architecture**: For applications requiring special security controls

## Next Steps

For more detailed architecture information, explore the following diagrams:

- [Security Architecture](security) - Comprehensive security controls and compliance features
- [Integration Diagram](integration) - How the platform integrates with external systems
- [Three Horizons Architecture](../architecture) - Overall platform architecture
