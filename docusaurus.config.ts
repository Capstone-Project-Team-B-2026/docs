import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Nexus Ops',
  tagline: 'Capstone Project 50 Team B 2026',
  favicon: 'img/brand/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://capstone-project-team-b-2026.github.io',
  baseUrl: '/docs/',

  organizationName: 'Capstone-Project-Team-B-2026',
  projectName: 'docs',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/Capstone-Project-Team-B-2026/docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Nexus Ops',
      logo: {
        alt: 'Nexus Ops',
        src: 'img/brand/logo-navbar.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/links',
          label: 'Links',
          position: 'left',
        },
        {
          href: 'https://github.com/orgs/Capstone-Project-Team-B-2026/projects/2/views/4',
          label: 'Board',
          position: 'right',
        },
        {
          href: 'https://www.figma.com/design/JOx148Ldmrd6DnmVwoRkti/NexusOps?node-id=0-1',
          label: 'Figma',
          position: 'right',
        },
        {
          href: 'https://github.com/Capstone-Project-Team-B-2026/docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/',
            },
          ],
        },
        {
          title: 'Repos',
          items: [
            {
              label: 'Backend',
              href: 'https://github.com/Capstone-Project-Team-B-2026/backend',
            },
            {
              label: 'Web',
              href: 'https://github.com/Capstone-Project-Team-B-2026/web',
            },
            {
              label: 'Mobile',
              href: 'https://github.com/Capstone-Project-Team-B-2026/mobile',
            },
            {
              label: 'Docs',
              href: 'https://github.com/Capstone-Project-Team-B-2026/docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Capstone Project 50 Team B 2026`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
