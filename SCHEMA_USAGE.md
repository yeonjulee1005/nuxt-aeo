# Schema 사용 가이드

이 문서는 Nuxt AEO 모듈에서 스키마를 사용하는 방법을 설명합니다.

## 스키마 사용 패턴

Nuxt AEO 모듈은 두 가지 방식으로 스키마를 사용할 수 있습니다:

### 1. 전역 스키마 (Global Schemas)

`nuxt.config.ts`의 `aeo.schemas` 배열에 설정된 스키마는 **모든 페이지에 자동으로 주입**됩니다.

**사용 사례:**
- Organization: 프로젝트/회사 정보
- Person: 작성자 정보 (모든 페이지에 공통)
- WebSite: 웹사이트 정보

**설정 방법:**
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-aeo'],
  aeo: {
    schemas: [
      {
        type: 'Organization',
        name: 'My Company',
        url: 'https://example.com',
      },
      {
        type: 'Person',
        name: 'John Doe',
      },
    ],
  },
})
```

**참고:** `type`을 사용하면 내부적으로 `@type`으로 자동 변환됩니다. `schemas` 배열이 없거나 비어있으면 기본 `Project` 스키마가 주입됩니다.

### 2. 페이지별 스키마 (Page-specific Schemas)

각 페이지에서 composable 함수를 사용하여 **해당 페이지에만** 스키마를 추가할 수 있습니다.

**사용 사례:**
- FAQPage: FAQ 페이지에만 필요
- Article: 블로그 포스트 페이지에만 필요
- ItemList: 리스트 페이지에만 필요
- Person: 특정 페이지에서만 추가로 표시하고 싶은 경우

**사용 방법:**
```vue
<!-- pages/faq.vue -->
<script setup lang="ts">
// FAQ 페이지에만 FAQPage Schema 추가
useSchemaPage({
  mainEntity: [
    {
      name: 'Question?',
      acceptedAnswer: { text: 'Answer' },
    },
  ],
})
</script>
```

## Composable 함수들

다음 composable 함수들은 **페이지별 스키마**를 추가하는 데 사용됩니다:

### ✅ 사용 가능한 함수들

1. **`useSchemaPage()`** - FAQPage Schema 추가
  - FAQ 페이지에 필수
  - 시맨틱 HTML 자동 생성 기능 포함 (기본값: `true`)
  - 전역 스키마와는 별개로 페이지별로 추가

2. **`useSchema()`** - 범용 Schema 추가
  - 모든 Schema 타입을 추가할 수 있는 범용 함수
  - `context`와 `type`을 사용하면 내부적으로 `@context`와 `@type`으로 자동 변환
  - Person, Organization, ItemList, Article 등 모든 Schema 타입 지원

**사용 예시:**
```vue
<script setup lang="ts">
// FAQPage Schema
useSchemaPage({
  mainEntity: [
    {
      name: 'Question?',
      acceptedAnswer: { text: 'Answer' },
    },
  ],
})

// Person Schema
useSchema({
  context: 'https://schema.org',
  type: 'Person',
  name: 'John Doe',
  jobTitle: 'Software Engineer',
})

// ItemList Schema
useSchema({
  context: 'https://schema.org',
  type: 'ItemList',
  name: 'Top 10 Items',
  itemListElement: [
    {
      type: 'ListItem',
      position: 1,
      name: 'Item 1',
      item: 'https://example.com/item1',
    },
  ],
})
</script>
```

## 전역 스키마 vs 페이지별 스키마

| 구분 | 전역 스키마 | 페이지별 스키마 |
|------|------------|----------------|
| 설정 위치 | `nuxt.config.ts` | 각 페이지 컴포넌트 |
| 적용 범위 | 모든 페이지 | 해당 페이지만 |
| 사용 방법 | `aeo.schemas` 배열 | Composable 함수 |
| 예시 | Organization, Person (공통) | FAQPage, Article (페이지별) |

## 실제 사용 예시

### 예시 1: FAQ 페이지

```vue
<!-- pages/faq.vue -->
<script setup lang="ts">
// 전역 스키마 (자동 주입):
// - Organization (nuxt.config.ts에서 설정)
// - Person (nuxt.config.ts에서 설정)

// 페이지별 스키마 (수동 추가):
useSchemaPage({
  mainEntity: [
    // FAQ 질문-답변
  ],
})
</script>
```

**결과:**
- Organization Schema (전역)
- Person Schema (전역)
- FAQPage Schema (페이지별)

### 예시 2: 블로그 포스트 페이지

```vue
<!-- pages/blog/[slug].vue -->
<script setup lang="ts">
// 전역 스키마 (자동 주입):
// - Organization (전역)
// - Person (전역)

// 페이지별 스키마 (수동 추가):
useSchema({
  context: 'https://schema.org',
  type: 'Article',
  headline: 'Article Title',
  datePublished: '2024-01-01',
  author: {
    type: 'Person',
    name: 'Author Name',
  },
  // ...
})
</script>
```

**결과:**
- Organization Schema (전역)
- Person Schema (전역)
- Article Schema (페이지별)

### 예시 3: 리스트 페이지

```vue
<!-- pages/list.vue -->
<script setup lang="ts">
// 전역 스키마 (자동 주입):
// - Organization (전역)
// - Person (전역)

// 페이지별 스키마 (수동 추가):
useSchema({
  context: 'https://schema.org',
  type: 'ItemList',
  name: 'Top 10 Items',
  itemListElement: [
    {
      type: 'ListItem',
      position: 1,
      name: 'Item 1',
      item: 'https://example.com/item1',
    },
  ],
})
</script>
```

**결과:**
- Organization Schema (전역)
- Person Schema (전역)
- ItemList Schema (페이지별)

## 결론

- **전역 스키마**: 모든 페이지에 공통으로 필요한 정보 (Organization, Person 등). `nuxt.config.ts`의 `schemas` 배열로 설정. 설정하지 않으면 기본 `Project` 스키마가 주입됩니다.
- **페이지별 스키마**: 특정 페이지에만 필요한 정보 (FAQPage, Article, ItemList 등). `useSchema()` 또는 `useSchemaPage()`로 추가.
- **키 변환**: `context`와 `type`을 사용하면 내부적으로 `@context`와 `@type`으로 자동 변환되므로, 따옴표 없이 일반 속성처럼 사용할 수 있습니다.

두 방식을 함께 사용하여 유연하고 강력한 AEO 최적화를 구현할 수 있습니다.
