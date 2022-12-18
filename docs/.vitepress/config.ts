import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vue3 Library',
  description: 'Vue3 Library',
  base: '/vue3-vite-template/',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide' },
      {
        text: 'DropDown Menu',
        items: [
          {
            text: 'Item A',
            link: './item-1'
          },
          {
            text: 'Item B',
            link: './item-2'
          },
          {
            text: 'Item C',
            link: './item-3'
          }
        ]
      }
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      { icon: 'twitter', link: '...' },
      // You can also add custom icons by passing SVG as string:
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Dribbble</title><path d="M12...6.38z"/></svg>'
        },
        link: '...'
      }
    ],
    // 页脚配置。您可以在页脚上添加消息或版权文本，但是，它只会在页面不包含侧边栏时显示。这是由于设计问题
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You'
    },
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    lastUpdatedText: 'Updated Date'
  }
})
