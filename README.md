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
Schema.org JSON-LD를 통해 AI Engine Optimization (AEO)을 지원하는 Nuxt 모듈입니다.
</p>

<p>
  <a href="/CHANGELOG.md">✨ Release Notes</a>
  <!-- | <a href="https://stackblitz.com/github/your-org/nuxt-aeo?file=playground%2Fapp.vue">🏀 Online playground</a> -->
  <!-- | <a href="https://example.com">📖 Documentation</a> -->
</p>

<br>

## AEO란?

**AI Engine Optimization (AEO)**는 AI 모델(ChatGPT, Claude, Perplexity 등)과 검색 엔진이 웹 콘텐츠를 더 잘 이해하고, 사용자의 질문에 정확한 답변을 제공할 수 있도록 구조화된 데이터를 최적화하는 기법입니다.

이 모듈은 Schema.org JSON-LD 형식을 사용하여 웹페이지에 구조화된 데이터를 추가하고, `useHead()`를 통해 SSR 환경에서 자동으로 `<head>` 태그에 스크립트를 주입합니다. 이를 통해:

- 🤖 **AI 모델 최적화**: ChatGPT, Claude, Perplexity 등의 AI 모델이 콘텐츠를 크롤링하고 이해할 때 구조화된 데이터를 활용하여 더 정확한 정보를 제공하고 인용할 수 있습니다
- 🔍 **검색 엔진 최적화**: Google, Bing 등의 검색 엔진이 Featured Snippets, Knowledge Graph 등에 콘텐츠를 표시할 수 있습니다
- 📊 **답변 엔진 최적화**: 검색 엔진과 AI 모델이 사용자의 질문에 직접 답변을 제공할 수 있도록 최적화합니다

## Installation

Nuxt 애플리케이션에 모듈을 설치하세요:

```bash
npx nuxi module add nuxt-aeo
```

설치가 완료되면 Nuxt AEO를 사용할 수 있습니다 ✨

## Module Options

`nuxt.config.ts`에서 모듈 옵션을 설정할 수 있습니다:

### 전역 스키마 설정

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-aeo'],
  aeo: {
    // 전역 스키마 배열 (모든 페이지에 자동 주입)
    // Person, Organization, WebSite 등 다양한 스키마 타입을 설정할 수 있습니다
    schemas: [
      {
        type: 'Organization',
        name: 'My Company',
        url: 'https://www.example.com',
        logo: 'https://www.example.com/logo.png',
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
      {
        type: 'WebSite',
        name: 'My Website',
        url: 'https://www.example.com',
        description: 'My awesome website',
      },
    ],
    // 자동 주입 여부 (기본값: true)
    // false인 경우, schemas 배열이 있어도 주입하지 않습니다
    // schemas 배열이 없으면 기본 Project Schema가 주입됩니다
    autoInject: true,
  }
})
```

### 옵션 설명

- **`schemas`** (선택): 전역으로 주입할 스키마 배열. Person, Organization, WebSite 등 다양한 스키마 타입을 설정할 수 있습니다. 설정하면 모든 페이지에 자동으로 주입됩니다. `schemas` 배열이 없거나 비어있으면 기본 `Project` 스키마가 주입됩니다.
- **`autoInject`** (선택, 기본값: `true`): 전역 스키마 정보의 자동 주입 여부를 제어합니다. `false`인 경우 아무것도 주입하지 않습니다.

## Features

- 🎯 **타입 안전성**: TypeScript로 모든 Schema 타입이 정의되어 있어 타입 체크가 가능합니다
- 🚀 **SSR 지원**: `useHead()`를 사용하여 서버 사이드 렌더링 환경에서 완벽하게 작동합니다
- 📦 **자동 Import**: Composable 함수들이 자동으로 import되어 별도 import 문이 필요 없습니다
- 🔧 **유연한 설정**: 전역 스키마를 설정하거나 페이지별로 개별 Schema를 추가할 수 있습니다
- 📚 **다양한 Schema 지원**: Person, Organization, FAQPage, ItemList, Article 등 모든 Schema.org 타입을 지원합니다
- ✨ **간편한 사용법**: `context`와 `type`을 사용하면 내부적으로 `@context`와 `@type`으로 자동 변환되어 따옴표 없이 사용할 수 있습니다
- 🎨 **시맨틱 HTML 자동 생성**: FAQPage Schema에 대해 시맨틱 HTML을 자동으로 생성하여 LLM 크롤링을 최적화합니다

## Usage

### FAQPage Schema

FAQ 페이지에 질문-답변 구조를 추가합니다. `renderHtml` 옵션(기본값: `true`)을 통해 시맨틱 HTML도 자동으로 생성됩니다:

```vue
<script setup lang="ts">
useSchemaPage({
  mainEntity: [
    {
      name: 'Nuxt AEO 모듈이란 무엇인가요?',
      acceptedAnswer: {
        text: 'Nuxt AEO 모듈은 Schema.org JSON-LD를 통해 AI Engine Optimization(AEO)을 지원하는 Nuxt 모듈입니다.',
      },
    },
    {
      name: '어떤 Schema 타입을 지원하나요?',
      acceptedAnswer: {
        text: '현재 Person, FAQPage, ItemList, Article, TechArticle 등의 Schema 타입을 지원합니다.',
      },
    },
  ],
  // renderHtml: true (기본값) - 시맨틱 HTML 자동 생성
  // JSON-LD와 함께 시맨틱 HTML이 생성되어 LLM 크롤링에 더 효과적입니다
})
</script>
```

**시맨틱 HTML 자동 생성:**
- `renderHtml: true` (기본값)인 경우, Schema 데이터를 기반으로 시맨틱 HTML이 자동 생성됩니다
- 생성된 HTML은 `display: none`으로 숨겨져 있지만, HTML 소스에는 포함되어 LLM과 크롤러가 읽을 수 있습니다
- JSON-LD와 시맨틱 HTML을 함께 사용하면 AI 모델의 콘텐츠 이해도가 향상됩니다

### 범용 useSchema 함수

직접 Schema 객체를 생성하여 사용할 수도 있습니다. `context`와 `type`을 사용하면 내부적으로 `@context`와 `@type`으로 자동 변환됩니다:

```vue
<script setup lang="ts">
// Organization Schema
useSchema({
  context: 'https://schema.org',
  type: 'Organization',
  name: 'Example Company',
  url: 'https://example.com',
  logo: 'https://example.com/logo.png',
})

// ItemList Schema
useSchema({
  context: 'https://schema.org',
  type: 'ItemList',
  name: 'Top 10 Programming Languages',
  description: 'The most popular programming languages in 2024',
  itemListElement: [
    {
      type: 'ListItem',
      position: 1,
      name: 'JavaScript',
      item: 'https://example.com/javascript',
    },
    {
      type: 'ListItem',
      position: 2,
      name: 'Python',
      item: 'https://example.com/python',
    },
  ],
})

// Person Schema
useSchema({
  context: 'https://schema.org',
  type: 'Person',
  name: 'John Doe',
  jobTitle: 'Software Engineer',
  url: 'https://example.com',
})
</script>
```

**참고:** `context`와 `type`은 내부적으로 `@context`와 `@type`으로 변환되므로, 따옴표 없이 일반 속성처럼 사용할 수 있습니다. 중첩된 객체도 자동으로 변환됩니다.

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

**참고:** `useSchema`에 `context`와 `type`을 전달하면, 내부적으로 `@context`와 `@type`으로 변환되어 JSON-LD에 주입됩니다.

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
