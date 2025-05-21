import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">A comprehensive platform for modern application development</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/platform-vision">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="A comprehensive platform for modern application development">
      <HomepageHeader />
      <main>
        <div className="container margin-top--lg">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <h2 className="text--center margin-bottom--lg">Platform Vision</h2>
              <p className="margin-bottom--md">
                The Three Horizons Platform represents a revolutionary approach to enterprise software development, 
                unifying Microsoft Azure, Red Hat Developer Hub, and GitHub into a seamless, integrated experience. 
                As the first platform that truly unifies these technologies into one integrated development experience, 
                Three Horizons eliminates the traditional dilemma between buying limited off-the-shelf solutions or 
                building complex platforms in-house.
              </p>
              
              <h3 className="text--center margin-top--xl margin-bottom--lg">Key Differentiators</h3>
              
              <div className="row margin-top--lg">
                <div className="col col--6">
                  <div className="card" style={{borderTop: '4px solid #0078D4'}}>
                    <div className="card__header">
                      <h4>Unified Portal Experience</h4>
                    </div>
                    <div className="card__body">
                      <p>The Red Hat Developer Hub creates a seamless portal that brings together all essential tools and platforms in one place, eliminating fragmentation and accelerating development cycles.</p>
                    </div>
                  </div>
                </div>
                
                <div className="col col--6">
                  <div className="card" style={{borderTop: '4px solid #EE0000'}}>
                    <div className="card__header">
                      <h4>Complete Automation</h4>
                    </div>
                    <div className="card__body">
                      <p>End-to-end automation for infrastructure provisioning and CI/CD pipelines via GitHub Actions and ARM templates, extending across the entire application lifecycle.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="row margin-top--lg">
                <div className="col col--6">
                  <div className="card" style={{borderTop: '4px solid #28A745'}}>
                    <div className="card__header">
                      <h4>Flexibility and Choice</h4>
                    </div>
                    <div className="card__body">
                      <p>Applications can be deployed on AKS, ARO, or both, giving organizations the flexibility to choose the right environment for each workload within a governed framework.</p>
                    </div>
                  </div>
                </div>
                
                <div className="col col--6">
                  <div className="card" style={{borderTop: '4px solid #24292E'}}>
                    <div className="card__header">
                      <h4>Enhanced Developer Experience</h4>
                    </div>
                    <div className="card__body">
                      <p>AI-assisted development through GitHub Copilot integration, accelerated onboarding, consistent environments, and streamlined lifecycle management.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text--center margin-top--xl margin-bottom--lg">Advantages for Stakeholders</h3>
              
              <div className="row margin-top--lg">
                <div className="col col--4">
                  <div className="card" style={{borderTop: '4px solid #0078D4'}}>
                    <div className="card__header">
                      <h4>For Development Teams</h4>
                    </div>
                    <div className="card__body">
                      <ul>
                        <li>Accelerated onboarding</li>
                        <li>Consistent environments</li>
                        <li>Reduced cognitive load</li>
                        <li>AI-assisted development</li>
                      </ul>
                    </div>
                    <div className="card__footer">
                      <Link className="button button--primary button--block" to="/docs/platform-vision#for-development-teams">Learn More</Link>
                    </div>
                  </div>
                </div>
                
                <div className="col col--4">
                  <div className="card" style={{borderTop: '4px solid #EE0000'}}>
                    <div className="card__header">
                      <h4>For Platform Teams</h4>
                    </div>
                    <div className="card__body">
                      <ul>
                        <li>Simplified management</li>
                        <li>Enhanced visibility</li>
                        <li>Integrated security</li>
                        <li>Standardized operations</li>
                      </ul>
                    </div>
                    <div className="card__footer">
                      <Link className="button button--primary button--block" to="/docs/platform-vision#for-platform-teams">Learn More</Link>
                    </div>
                  </div>
                </div>
                
                <div className="col col--4">
                  <div className="card" style={{borderTop: '4px solid #28A745'}}>
                    <div className="card__header">
                      <h4>For Business Leaders</h4>
                    </div>
                    <div className="card__body">
                      <ul>
                        <li>Faster time-to-market</li>
                        <li>Lower operational costs</li>
                        <li>Improved quality</li>
                        <li>Competitive advantage</li>
                      </ul>
                    </div>
                    <div className="card__footer">
                      <Link className="button button--primary button--block" to="/docs/platform-vision#for-business-leaders">Learn More</Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text--center margin-top--xl">
                <Link
                  className="button button--lg button--outline button--primary"
                  to="/docs/platform-vision">
                  Read the Full Platform Vision
                </Link>
              </div>
              
              <h3 className="text--center margin-top--xl margin-bottom--lg">Comprehensive Documentation</h3>
              <p className="margin-bottom--md">
                Our documentation provides detailed guidance for implementing and using the Three Horizons Platform:
              </p>
              
              <div className="row margin-top--lg">
                <div className="col col--4">
                  <div className="card">
                    <div className="card__header">
                      <h4>Implementation Guide</h4>
                    </div>
                    <div className="card__body">
                      <p>Step-by-step instructions for setting up the platform</p>
                    </div>
                    <div className="card__footer">
                      <Link className="button button--primary button--block" to="/docs/intro">Learn More</Link>
                    </div>
                  </div>
                </div>
                
                <div className="col col--4">
                  <div className="card">
                    <div className="card__header">
                      <h4>Architecture</h4>
                    </div>
                    <div className="card__body">
                      <p>Detailed architecture diagrams and explanations</p>
                    </div>
                    <div className="card__footer">
                      <Link className="button button--primary button--block" to="/docs/architecture">Learn More</Link>
                    </div>
                  </div>
                </div>
                
                <div className="col col--4">
                  <div className="card">
                    <div className="card__header">
                      <h4>Developer Guide</h4>
                    </div>
                    <div className="card__body">
                      <p>Best practices for developers using the platform</p>
                    </div>
                    <div className="card__footer">
                      <Link className="button button--primary button--block" to="/docs/inner-loop-development">Learn More</Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="row margin-top--lg">
                <div className="col col--4 col--offset-2">
                  <div className="card">
                    <div className="card__header">
                      <h4>Reference Diagrams</h4>
                    </div>
                    <div className="card__body">
                      <p>Visual representations of key platform components</p>
                    </div>
                    <div className="card__footer">
                      <Link className="button button--primary button--block" to="/docs/diagrams/overview">Learn More</Link>
                    </div>
                  </div>
                </div>
                
                <div className="col col--4">
                  <div className="card">
                    <div className="card__header">
                      <h4>Platform Evolution</h4>
                    </div>
                    <div className="card__body">
                      <p>How the platform evolves across three horizons of capability</p>
                    </div>
                    <div className="card__footer">
                      <Link className="button button--primary button--block" to="/docs/intro">Learn More</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
