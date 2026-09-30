const {themes: prismThemes} = require('prism-react-renderer');

module.exports = {
  title: 'Auto System Agent',
  tagline: '面向自动化 Editor 的本地 Agent 工作台',
  favicon: 'img/favicon.svg',
  url: 'https://auto-system-agent-docs.vercel.app',
  baseUrl: '/',
  organizationName: 'Wadehl',
  projectName: 'auto-system-agent-docs',
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/Wadehl/auto-system-agent-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],
  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Auto System Agent',
      items: [
        {
          href: 'https://github.com/Wadehl/auto-system-agent-docs',
          label: '文档仓库',
          position: 'right',
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    mermaid: {
      theme: {
        light: 'neutral',
        dark: 'dark',
      },
      options: {
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif',
        flowchart: {
          curve: 'basis',
          htmlLabels: true,
          useMaxWidth: true,
        },
        themeVariables: {
          fontSize: '15px',
          primaryColor: '#f3f6fc',
          primaryTextColor: '#202124',
          primaryBorderColor: '#9bb9e8',
          lineColor: '#8793a5',
          secondaryColor: '#fff6e8',
          secondaryBorderColor: '#e2a23a',
          tertiaryColor: '#f8f9fa',
          mainBkg: '#f3f6fc',
          nodeBorder: '#9bb9e8',
          clusterBkg: '#fbfcff',
          clusterBorder: '#d7dce5',
          edgeLabelBackground: '#ffffff',
        },
      },
    },
  },
};
