export default defineNuxtConfig({
  // Add local nuxt-aeo module
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
    preference: 'light',
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
