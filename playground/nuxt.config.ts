export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  /**
   * AEO (Answer Engine Optimization) 모듈 설정
   * Schema.org JSON-LD를 통해 검색 엔진 최적화를 지원합니다.
   */
  aeo: {
    /**
     * 전역 Person 정보
     * 모든 페이지에 자동으로 주입될 Person Schema 정보입니다.
     * autoInject가 true인 경우, 이 정보가 자동으로 <head>에 추가됩니다.
     */
    person: {
      name: 'Yeonju Lee',
      alternateName: 'Dewdew',
      jobTitle: 'Software Engineer / CDO',
      url: 'https://www.example.com',
      image: 'https://www.example.com/profile.jpg',
      knowsAbout: ['Nuxt3', 'TypeScript', 'Supabase'],
      sameAs: ['https://github.com/dewdew'],
    },
    /**
     * 자동 주입 여부
     * true인 경우, 전역 Person 정보가 모든 페이지에 자동으로 주입됩니다.
     * @default true
     */
    autoInject: true,
  },
})
