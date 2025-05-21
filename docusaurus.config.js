// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Three Horizons Platform',
  tagline: 'A comprehensive platform for modern application development',
  favicon: 'img/favicon.svg',

  // Set the production url of your site here
  url: 'https://three-horizon-platform.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/three-horizon-site/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'paulasilvatech', // Usually your GitHub org/user name.
  projectName: 'three-horizon-site', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./src/css/remove-branding.css')
          ],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/three-horizons-logo.png',
      navbar: {
        title: 'Three Horizons Platform',
        logo: {
          alt: 'Three Horizons Platform Logo',
          src: 'img/three-horizons-logo.svg',
        },
        items: [
          {
            to: '/docs/platform-vision',
            label: 'Platform Vision',
            position: 'left',
          },
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Implementation Guide',
          },
          {
            to: '/docs/architecture',
            label: 'Architecture',
            position: 'left',
          },
          {
            to: '/docs/inner-loop-development',
            label: 'Developer Guide',
            position: 'left',
          },
          {
            href: 'https://github.com/three-horizon-platform/Three-Horizons-Playbook',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Platform Vision',
                to: '/docs/platform-vision',
              },
              {
                label: 'Getting Started',
                to: '/docs/intro',
              },
              {
                label: 'Implementation Guide',
                to: '/docs/phase1-infrastructure',
              },
              {
                label: 'Architecture',
                to: '/docs/architecture',
              },
            ],
          },
          {
            title: 'Developer Resources',
            items: [
              {
                label: 'Inner Loop Development',
                to: '/docs/inner-loop-development',
              },
              {
                label: 'Outer Loop Deployment',
                to: '/docs/outer-loop-deployment',
              },
              {
                label: 'Golden Paths',
                to: '/docs/golden-paths',
              },
            ],
          },
          {
            title: 'Reference',
            items: [
              {
                label: 'Architecture Diagrams',
                to: '/docs/diagrams/overview',
              },
              {
                label: 'Web Application Patterns',
                to: '/docs/diagrams/web-applications',
              },
              {
                label: 'Security Architecture',
                to: '/docs/diagrams/security',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Three Horizons Platform. All rights reserved.`,
      },
      prism: {
        theme: require('prism-react-renderer').themes.github,
        darkTheme: require('prism-react-renderer').themes.dracula,
      },
    }),
};

module.exports = config;
