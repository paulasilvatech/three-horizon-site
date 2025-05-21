---
sidebar_position: 3
---

# Security Architecture

This diagram illustrates the comprehensive security architecture of the Three Horizons Platform, showing the layered security controls that protect applications, data, and infrastructure.

<div className="diagram-container">
  <img src="/img/diagrams/security-architecture.svg" alt="Three Horizons Platform Security Architecture" style={{maxWidth: '100%', height: 'auto'}} />
</div>

## Security Layers

The Three Horizons Platform implements a defense-in-depth security approach with multiple layers:

1. **Identity & Access Management** - Authentication, authorization, and governance
2. **Application Security** - Secure development practices and runtime protection
3. **Data Security** - Encryption, classification, and access controls
4. **Platform Security** - Container and Kubernetes security
5. **Network Security** - Segmentation, filtering, and traffic inspection
6. **Infrastructure Security** - Secure configuration and vulnerability management

## Key Security Components

The security architecture includes several key components:

- **Microsoft Entra ID** - Centralized identity provider with MFA and conditional access
- **Azure Key Vault** - Secure storage for keys, secrets, and certificates
- **Azure Defender for Cloud** - Threat protection for cloud workloads
- **Container Security** - Image scanning, runtime protection, and policy enforcement
- **Azure Policy** - Automated compliance and governance
- **Azure Monitor** - Security monitoring and alerting

## Security Controls

Multiple security controls are implemented across the platform:

- **Authentication** - Multi-factor authentication and conditional access
- **Authorization** - Role-based and attribute-based access control
- **Encryption** - Data-at-rest and data-in-transit encryption
- **Vulnerability Management** - Continuous scanning and remediation
- **Threat Protection** - Advanced threat detection and response
- **Compliance** - Automated policy enforcement and auditing

## Compliance Framework

The Three Horizons Platform is designed to meet various compliance requirements:

- **Industry Standards** - ISO 27001, SOC 2, NIST CSF
- **Regulatory Compliance** - GDPR, HIPAA, PCI DSS (as applicable)
- **Security Benchmarks** - CIS Benchmarks for Azure and Kubernetes
- **Internal Policies** - Organization-specific security requirements

## Next Steps

For more detailed architecture information, explore the following diagrams:

- [Network Diagram](network) - Detailed network security zones and controls
- [CI/CD Pipeline](cicd) - Security controls in the deployment pipeline
- [Developer Hub Architecture](developer-hub) - Security features of the Developer Hub
