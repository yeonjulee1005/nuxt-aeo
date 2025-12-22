export default defineNuxtConfig({
  modules: ['nuxt-aeo'],

  devtools: { enabled: true },

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
  /**
   * AEO (AI Engine Optimization) module configuration
   * Supports AI model and search engine optimization through Schema.org JSON-LD.
   */
  aeo: {
    /**
     * Global schema array (recommended)
     * Schema information that will be automatically injected into all pages.
     * You can configure various schema types like Person, Organization, WebSite, etc.
     * If autoInject is true, this information is automatically added to <head>.
     */
    schemas: [
      {
        type: 'Organization',
        name: 'Nuxt AEO Project',
        url: 'https://www.example.com',
        description: 'AI Engine Optimization module for Nuxt',
        renderHtml: true, // Automatic semantic HTML generation
        visuallyHidden: true, // Visually hide
      },
      {
        type: 'Person',
        name: 'Yeonju Lee',
        alternateName: 'Dewdew',
        jobTitle: 'Software Engineer / CDO',
        url: 'https://www.example.com',
        image: 'https://www.example.com/profile.jpg',
        knowsAbout: ['Nuxt3', 'TypeScript', 'Supabase'],
        sameAs: ['https://github.com/dewdew'],
        renderHtml: true, // Automatic semantic HTML generation
        visuallyHidden: true, // Visually hide
      },
    ],
    /**
     * Automatic injection
     * If true, global schema information is automatically injected into all pages.
     * @default true
     */
    autoInject: true,
    /**
     * Global semantic HTML auto-generation
     * If true, semantic HTML is automatically generated for global schemas and injected into pages.
     * @default true
     */
    renderHtml: true,
    /**
     * Global visual hiding
     * If true, generated semantic HTML is hidden with the visually-hidden class.
     * LLM crawlers and search engines can read it, but it's not visible to users.
     * @default true
     */
    visuallyHidden: true,
  },
})
