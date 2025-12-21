export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/mdc',
    'nuxt-studio',
    'nuxt-aeo',
    '@nuxt/devtools',
    '@vueuse/nuxt',
    '@nuxt/image',
  ],

  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/icon.svg',
        },
      ],
    },
  },

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'dark',
  },

  // Nuxt Content configuration
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 3,
        },
      },
    },
  },

  // Route rules for static site generation
  routeRules: {
    // Prerender all pages at build time
    '/**': { prerender: true },
  },

  // Static site generation for Vercel
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      failOnError: false,
    },
  },

  // AEO module configuration
  aeo: {
    schemas: [
      {
        type: 'Organization',
        name: 'Nuxt AEO',
        url: 'https://github.com/yeonjulee1005/nuxt-aeo',
        description: 'AI Engine Optimization module for Nuxt',
        renderHtml: true,
        visuallyHidden: true,
      },
      {
        type: 'Person',
        name: 'Yeonju Lee',
        alternateName: 'Dewdew',
        jobTitle: 'Software Engineer / CDO',
        url: 'https://github.com/dewdew',
        sameAs: ['https://github.com/dewdew'],
        renderHtml: true,
        visuallyHidden: true,
      },
    ],
    autoInject: true,
    renderHtml: true,
    visuallyHidden: true,
  },
})
