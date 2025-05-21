import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Infrastructure Provisioning',
    imgSrc: require('@site/static/img/azure-logo.png').default,
    description: (
      <>
        Learn how to set up the foundational Azure infrastructure required for the Three Horizons Platform.
      </>
    ),
    borderColor: '#0078D4', // Azure blue
  },
  {
    title: 'Platform Installation',
    Svg: require('@site/static/img/platform-icon.svg').default,
    description: (
      <>
        Install and configure AKS/ARO and core services to establish the runtime environment for your platform.
      </>
    ),
    borderColor: '#00A650', // Green
    iconColor: '#00A650', // Green icon
    backgroundColor: 'white', // White background
  },
  {
    title: 'Developer Hub Deployment',
    imgSrc: require('@site/static/img/red-hat-logo.png').default,
    description: (
      <>
        Deploy the Red Hat Developer Hub as the central component for the Three Horizons Platform.
      </>
    ),
    borderColor: '#EE0000', // Red Hat red
  },
  {
    title: 'GitHub Integration',
    imgSrc: require('@site/static/img/github-logo.png').default,
    description: (
      <>
        Connect your platform with GitHub Enterprise to enable source control, collaboration, and CI/CD workflows.
      </>
    ),
    borderColor: '#333333', // GitHub dark
  },
];

function Feature({Svg, imgSrc, title, description, borderColor, backgroundColor, iconColor}) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--center" style={{
        backgroundColor: backgroundColor || 'white', 
        padding: '15px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        border: `3px solid ${borderColor || '#000000'}`,
        width: '100px',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px auto'
      }}>
        {Svg && <Svg className={styles.featureSvg} role="img" style={{fill: iconColor || undefined}} />}
        {imgSrc && <img src={imgSrc} alt={title} className={styles.featureImg} />}
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="text--center padding-horiz--md">
        <a className="button button--primary" href={`/docs/${title.toLowerCase().replace(/\s+/g, '-')}`}>
          Learn More
        </a>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className="text--center margin-bottom--lg">Featured Implementation Phases</h2>
        <p className="text--center margin-bottom--xl">
          Explore our step-by-step implementation guide designed to help you build a complete Three Horizons Platform
        </p>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
