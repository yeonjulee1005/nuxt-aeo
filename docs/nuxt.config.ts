export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/mdc',
    'nuxt-studio',
    'nuxt-aeo',
    '@nuxt/devtools',
    '@vueuse/nuxt',
  ],

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

  // Static site generation for Vercel
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      failOnError: false,
    },
    output: {
      publicDir: '.output/public',
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
