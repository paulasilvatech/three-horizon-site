/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'platform-vision',
      label: 'Platform Vision & Differentiators'
    },
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction'
    },
    {
      type: 'category',
      label: 'Implementation Guide',
      items: [
        'phase1-infrastructure',
        'phase2-platform',
        'phase3-devhub',
        'phase4-github',
        'phase5-cicd',
        'phase6-monitoring',
        'phase7-validation',
        'phase8-devbox'
      ],
    },
    {
      type: 'doc',
      id: 'architecture',
      label: 'Architecture Overview'
    },
    {
      type: 'category',
      label: 'Developer Guide',
      items: [
        'inner-loop-development',
        'outer-loop-deployment',
        'golden-paths'
      ],
    },
    {
      type: 'category',
      label: 'Diagrams',
      items: [
        'diagrams/overview',
        'diagrams/network',
        'diagrams/security',
        'diagrams/developer-hub',
        'diagrams/cicd',
        'diagrams/integration',
        'diagrams/web-applications'
      ],
    },
  ],
};

module.exports = sidebars;
