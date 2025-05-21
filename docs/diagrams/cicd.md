---
sidebar_position: 5
---

# CI/CD Pipeline

This diagram illustrates the continuous integration and continuous deployment (CI/CD) pipeline architecture used in the Three Horizons Platform.

<div className="diagram-container">
  <img src="/img/diagrams/cicd-pipeline.svg" alt="CI/CD Pipeline Architecture" style={{maxWidth: '100%', height: 'auto'}} />
</div>

## Pipeline Overview

The Three Horizons Platform implements a comprehensive CI/CD pipeline that automates the build, test, and deployment processes:

1. **Source Control** - Code and configuration management in GitHub
2. **Continuous Integration** - Automated building and testing
3. **Artifact Management** - Storage and versioning of build artifacts
4. **Continuous Deployment** - Automated deployment across environments
5. **Release Management** - Controlled promotion between environments

## Pipeline Stages

The CI/CD pipeline consists of several key stages:

### 1. Code Commit & Pull Request

- Developer commits code to feature branch
- Pull request created for code review
- Automated linting and static analysis

### 2. Build & Test

- Compile and build application
- Run unit and integration tests
- Generate code coverage reports
- Perform security scanning

### 3. Artifact Creation

- Build container images
- Sign and verify artifacts
- Store in container registry
- Generate Software Bill of Materials (SBOM)

### 4. Deployment

- Deploy to development environment
- Run automated acceptance tests
- Progressive deployment to higher environments
- Automated and manual approval gates

### 5. Monitoring & Feedback

- Collect deployment metrics
- Monitor application health
- Automated rollback if needed
- Feedback loop to development

## Integration Points

The CI/CD pipeline integrates with several platform components:

- **GitHub Actions** - Workflow automation
- **Azure Container Registry** - Image storage
- **Azure Key Vault** - Secrets management
- **Kubernetes** - Deployment target
- **Azure Monitor** - Deployment monitoring

## Security Controls

The pipeline implements several security controls:

- **Code Scanning** - Detect vulnerabilities in code
- **Dependency Scanning** - Check for vulnerable dependencies
- **Image Scanning** - Scan container images for vulnerabilities
- **Policy Enforcement** - Ensure compliance with security policies
- **Approval Gates** - Required approvals for production deployments

## Next Steps

For more detailed information, explore the following diagrams:

- [Integration Workflow](integration) - How the CI/CD pipeline integrates with other systems
- [Developer Hub Architecture](developer-hub) - How the Developer Hub initiates CI/CD workflows
- [Workflow Diagram](/img/diagrams/workflow-diagram.svg) - End-to-end developer workflow
