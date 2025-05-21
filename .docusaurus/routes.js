import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/three-horizon-site/markdown-page',
    component: ComponentCreator('/three-horizon-site/markdown-page', '356'),
    exact: true
  },
  {
    path: '/three-horizon-site/docs',
    component: ComponentCreator('/three-horizon-site/docs', '3ad'),
    routes: [
      {
        path: '/three-horizon-site/docs',
        component: ComponentCreator('/three-horizon-site/docs', 'b50'),
        routes: [
          {
            path: '/three-horizon-site/docs',
            component: ComponentCreator('/three-horizon-site/docs', '93a'),
            routes: [
              {
                path: '/three-horizon-site/docs/architecture',
                component: ComponentCreator('/three-horizon-site/docs/architecture', 'fa7'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/three-horizon-site/docs/diagrams/cicd',
                component: ComponentCreator('/three-horizon-site/docs/diagrams/cicd', 'fa6'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/three-horizon-site/docs/diagrams/developer-hub',
                component: ComponentCreator('/three-horizon-site/docs/diagrams/developer-hub', '6bd'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/three-horizon-site/docs/diagrams/integration',
                component: ComponentCreator('/three-horizon-site/docs/diagrams/integration', 'e24'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/three-horizon-site/docs/diagrams/network',
                component: ComponentCreator('/three-horizon-site/docs/diagrams/network', 'd76'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/three-horizon-site/docs/diagrams/overview',
                component: ComponentCreator('/three-horizon-site/docs/diagrams/overview', '066'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/three-horizon-site/docs/diagrams/security',
                component: ComponentCreator('/three-horizon-site/docs/diagrams/security', '326'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/three-horizon-site/docs/diagrams/web-applications',
                component: ComponentCreator('/three-horizon-site/docs/diagrams/web-applications', '5dd'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/three-horizon-site/docs/golden-paths',
                component: ComponentCreator('/three-horizon-site/docs/golden-paths', '567'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/three-horizon-site/docs/inner-loop-development',
                component: ComponentCreator('/three-horizon-site/docs/inner-loop-development', '1d5'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/three-horizon-site/docs/intro',
                component: ComponentCreator('/three-horizon-site/docs/intro', '948'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/three-horizon-site/docs/outer-loop-deployment',
                component: ComponentCreator('/three-horizon-site/docs/outer-loop-deployment', '5b7'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/three-horizon-site/docs/phase1-infrastructure',
                component: ComponentCreator('/three-horizon-site/docs/phase1-infrastructure', 'fc1'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/three-horizon-site/docs/phase2-platform',
                component: ComponentCreator('/three-horizon-site/docs/phase2-platform', '225'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/three-horizon-site/docs/phase3-devhub',
                component: ComponentCreator('/three-horizon-site/docs/phase3-devhub', '69f'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/three-horizon-site/docs/phase4-github',
                component: ComponentCreator('/three-horizon-site/docs/phase4-github', '114'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/three-horizon-site/docs/phase5-cicd',
                component: ComponentCreator('/three-horizon-site/docs/phase5-cicd', 'f99'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/three-horizon-site/docs/phase6-monitoring',
                component: ComponentCreator('/three-horizon-site/docs/phase6-monitoring', '030'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/three-horizon-site/docs/phase7-validation',
                component: ComponentCreator('/three-horizon-site/docs/phase7-validation', '053'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/three-horizon-site/docs/phase8-devbox',
                component: ComponentCreator('/three-horizon-site/docs/phase8-devbox', 'db2'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/three-horizon-site/docs/platform-vision',
                component: ComponentCreator('/three-horizon-site/docs/platform-vision', '6d7'),
                exact: true,
                sidebar: "docsSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/three-horizon-site/',
    component: ComponentCreator('/three-horizon-site/', 'd99'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
