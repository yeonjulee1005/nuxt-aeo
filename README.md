<!-- <a href="https://devtools.nuxt.com"><img width="1200" alt="Nuxt DevTools" src="https://github-production-user-asset-6210df.s3.amazonaws.com/904724/261577617-a10567bd-ad33-48cc-9bda-9e37dbe1929f.png"></a>
<br> -->

<h1>
Nuxt AEO
</h1>

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

<p>
Schema.org JSON-LD를 통해 Answer Engine Optimization (AEO)을 지원하는 Nuxt 모듈입니다.
</p>

<p>
  <a href="/CHANGELOG.md">✨ Release Notes</a>
  <!-- | <a href="https://stackblitz.com/github/your-org/nuxt-aeo?file=playground%2Fapp.vue">🏀 Online playground</a> -->
  <!-- | <a href="https://example.com">📖 Documentation</a> -->
</p>

<br>

## AEO란?

**Answer Engine Optimization (AEO)**는 검색 엔진이 사용자의 질문에 직접 답변을 제공할 수 있도록 구조화된 데이터를 최적화하는 기법입니다. 

이 모듈은 Schema.org JSON-LD 형식을 사용하여 웹페이지에 구조화된 데이터를 추가하고, `useHead()`를 통해 SSR 환경에서 자동으로 `<head>` 태그에 스크립트를 주입합니다. 이를 통해 검색 엔진이 콘텐츠를 더 잘 이해하고, 사용자에게 더 정확한 답변을 제공할 수 있습니다.

## Installation

Nuxt 애플리케이션에 모듈을 설치하세요:

```bash
npx nuxi module add nuxt-aeo
```

설치가 완료되면 Nuxt AEO를 사용할 수 있습니다 ✨

## Module Options

`nuxt.config.ts`에서 모듈 옵션을 설정할 수 있습니다:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-aeo'],
  aeo: {
    // 전역 Person 정보 (모든 페이지에 자동 주입)
    person: {
      name: 'Yeonju Lee',
      alternateName: 'Dewdew',
      jobTitle: 'Software Engineer / CDO',
      url: 'https://www.example.com',
      image: 'https://www.example.com/profile.jpg',
      knowsAbout: ['Nuxt3', 'TypeScript', 'Supabase'],
      sameAs: ['https://github.com/dewdew'],
    },
    // 자동 주입 여부 (기본값: true)
    autoInject: true,
  }
})
```

### 옵션 설명

- **`person`** (선택): 전역 Person Schema 정보. 설정하면 모든 페이지에 자동으로 주입됩니다.
- **`autoInject`** (선택, 기본값: `true`): 전역 Person 정보의 자동 주입 여부를 제어합니다.

## Features

- 🎯 **타입 안전성**: TypeScript로 모든 Schema 타입이 정의되어 있어 타입 체크가 가능합니다
- 🚀 **SSR 지원**: `useHead()`를 사용하여 서버 사이드 렌더링 환경에서 완벽하게 작동합니다
- 📦 **자동 Import**: Composable 함수들이 자동으로 import되어 별도 import 문이 필요 없습니다
- 🔧 **유연한 설정**: 전역 Person 정보를 설정하거나 페이지별로 개별 Schema를 추가할 수 있습니다
- 📚 **다양한 Schema 지원**: Person, FAQPage, ItemList, Article, TechArticle 등 다양한 Schema 타입을 지원합니다

## Usage

### Person Schema

사용자 프로필 정보를 구조화된 데이터로 추가합니다:

```vue
<script setup lang="ts">
useSchemaPerson({
  name: 'Yeonju Lee',
  alternateName: 'Dewdew',
  jobTitle: 'Software Engineer / CDO',
  url: 'https://www.example.com',
  image: 'https://www.example.com/profile.jpg',
  knowsAbout: ['Nuxt3', 'TypeScript', 'Supabase'],
  sameAs: ['https://github.com/dewdew'],
  address: {
    addressCountry: 'KR',
    addressLocality: 'Seoul',
  },
  worksFor: {
    name: 'Example Company',
    url: 'https://example.com',
  },
})
</script>
```

### FAQPage Schema

FAQ 페이지에 질문-답변 구조를 추가합니다:

```vue
<script setup lang="ts">
useSchemaFAQ({
  mainEntity: [
    {
      name: 'Nuxt AEO 모듈이란 무엇인가요?',
      acceptedAnswer: {
        text: 'Nuxt AEO 모듈은 Schema.org JSON-LD를 통해 Answer Engine Optimization(AEO)을 지원하는 Nuxt 모듈입니다.',
      },
    },
    {
      name: '어떤 Schema 타입을 지원하나요?',
      acceptedAnswer: {
        text: '현재 Person, FAQPage, ItemList, Article, TechArticle 등의 Schema 타입을 지원합니다.',
      },
    },
  ],
})
</script>
```

### ItemList Schema

리스트 형태의 콘텐츠를 구조화된 데이터로 표현합니다:

```vue
<script setup lang="ts">
useSchemaItemList({
  name: 'Top 10 Programming Languages',
  description: 'The most popular programming languages in 2024',
  itemListElement: [
    {
      position: 1,
      name: 'JavaScript',
      item: 'https://example.com/javascript',
    },
    {
      position: 2,
      name: 'Python',
      item: 'https://example.com/python',
    },
  ],
})
</script>
```

### Article Schema

블로그 포스트나 기사 콘텐츠에 Article Schema를 추가합니다:

```vue
<script setup lang="ts">
useSchemaArticle({
  headline: 'Getting Started with Nuxt 3',
  description: 'Learn how to build modern web applications with Nuxt 3',
  image: 'https://example.com/article.jpg',
  datePublished: '2024-01-01',
  dateModified: '2024-01-02',
  author: {
    name: 'John Doe',
    url: 'https://example.com/author',
  },
  publisher: {
    name: 'Example Blog',
    url: 'https://example.com',
  },
  mainEntityOfPage: 'https://example.com/article',
  articleBody: 'This is the full article content...',
})
</script>
```

### TechArticle Schema

기술 문서나 튜토리얼에 TechArticle Schema를 추가합니다:

```vue
<script setup lang="ts">
useSchemaTechArticle({
  headline: 'Advanced TypeScript Patterns',
  description: 'Learn advanced TypeScript patterns and techniques',
  image: 'https://example.com/tech-article.jpg',
  datePublished: '2024-01-01',
  dateModified: '2024-01-02',
  author: {
    name: 'Jane Smith',
    url: 'https://example.com/author',
  },
  publisher: {
    name: 'Tech Blog',
    url: 'https://example.com',
  },
  dependencies: 'TypeScript 5.0+',
  proficiencyLevel: 'Advanced',
})
</script>
```

### 범용 useSchema 함수

직접 Schema 객체를 생성하여 사용할 수도 있습니다:

```vue
<script setup lang="ts">
useSchema({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Example Company',
  url: 'https://example.com',
  logo: 'https://example.com/logo.png',
})
</script>
```

## 확인 방법

각 composable 함수를 사용하면 자동으로 페이지의 `<head>` 태그에 JSON-LD 스크립트가 추가됩니다. 개발자 도구(F12)를 열어 Elements 탭에서 다음과 같은 스크립트 태그를 확인할 수 있습니다:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Yeonju Lee",
  ...
}
</script>
```

또한 [Google의 Rich Results Test](https://search.google.com/test/rich-results)를 사용하여 Schema가 올바르게 인식되는지 확인할 수 있습니다.

## Contribution

Please refer to the [Contribution Guide](#local-development).

<details>
  <summary id="local-development">Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>

## License

[MIT](./LICENSE)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-aeo/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-aeo

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-aeo.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npm.chart.dev/nuxt-aeo

[license-src]: https://img.shields.io/npm/l/nuxt-aeo.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-aeo

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt
[nuxt-href]: https://nuxt.com
