export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  /**
   * AEO (AI Engine Optimization) 모듈 설정
   * Schema.org JSON-LD를 통해 AI 모델과 검색 엔진 최적화를 지원합니다.
   */
  aeo: {
    /**
     * 전역 스키마 배열 (권장)
     * 모든 페이지에 자동으로 주입될 Schema 정보들입니다.
     * Person, Organization, WebSite 등 다양한 스키마 타입을 설정할 수 있습니다.
     * autoInject가 true인 경우, 이 정보들이 자동으로 <head>에 추가됩니다.
     */
    schemas: [
      {
        type: 'Organization',
        name: 'Nuxt AEO Project',
        url: 'https://www.example.com',
        description: 'AI Engine Optimization module for Nuxt',
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
      },
    ],
    /**
     * 자동 주입 여부
     * true인 경우, 전역 스키마 정보가 모든 페이지에 자동으로 주입됩니다.
     * @default true
     */
    autoInject: true,
  },
})
