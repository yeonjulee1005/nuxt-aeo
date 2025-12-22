# Nuxt AEO 모듈 구현 히스토리

## 1. 기본 구조 설계

### 모듈 진입점 (`src/module.ts`)

Nuxt 모듈의 기본 구조를 설계했습니다:

```typescript
export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-aeo',
    configKey: 'aeo',
  },
  setup(options, nuxt) {
    // 모듈 옵션을 runtime config에 추가
    // 플러그인 등록
    // composable 자동 import 설정
  },
})
```

**핵심 설계 결정:**
- `configKey: 'aeo'`로 설정하여 `nuxt.config.ts`에서 `aeo` 옵션으로 접근 가능
- `runtimeConfig.public`에 옵션을 저장하여 클라이언트/서버 양쪽에서 접근 가능
- `addImportsDir`로 composable 자동 import 구현

---

## 2. 범용 Schema Composable 구현 (`useSchema`)

### 2.1 초기 구현: JSON-LD 생성

가장 먼저 Schema.org JSON-LD를 생성하는 기본 기능을 구현했습니다:

```typescript
export function useSchema(schema: Record<string, unknown>) {
  // JSON-LD를 <head>에 주입
  useHead({
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schema, null, 2),
    }],
  })
}
```

### 2.2 키 변환 로직 추가

사용자 편의성을 위해 `context`와 `type`을 `@context`와 `@type`으로 자동 변환하는 기능을 추가했습니다:

```typescript
function transformSchemaKeys(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  
  for (const [key, value] of Object.entries(obj)) {
    // context → @context, type → @type 변환
    const transformedKey = key === 'context' ? '@context' : key === 'type' ? '@type' : key
    
    // 중첩 객체와 배열도 재귀적으로 변환
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[transformedKey] = transformSchemaKeys(value as Record<string, unknown>)
    } else if (Array.isArray(value)) {
      result[transformedKey] = value.map(item => 
        item && typeof item === 'object' 
          ? transformSchemaKeys(item as Record<string, unknown>)
          : item
      )
    } else {
      result[transformedKey] = value
    }
  }
  
  return result
}
```

**왜 이렇게 구현했나요?**
- JavaScript 객체에서 `@`로 시작하는 키는 따옴표 없이 사용하기 어려움
- `context`, `type`을 일반 속성처럼 사용할 수 있게 하여 개발자 경험 개선
- 중첩된 객체와 배열도 자동 변환하여 모든 Schema 구조 지원

### 2.3 시멘틱 HTML 자동 생성 기능 추가

AI 모델의 학습을 최적화하기 위해 시멘틱 HTML 자동 생성 기능을 추가했습니다:

```typescript
// Schema 타입별 HTML 생성 함수
function generateSemanticHTML(schemaType: string, schemaData: Record<string, unknown>): string | null {
  const type = schemaType.toLowerCase()
  
  switch (type) {
    case 'organization':
      return generateOrganizationHTML(schemaData)
    case 'person':
      return generatePersonHTML(schemaData)
    case 'itemlist':
      return generateItemListHTML(schemaData)
    default:
      return generateGenericHTML(schemaType, schemaData)
  }
}
```

**구현 세부사항:**
- `itemscope`, `itemtype`, `itemprop` 속성을 사용한 마이크로데이터 형식
- HTML 이스케이프 처리로 XSS 방지
- `visually-hidden` CSS 클래스로 사용자에게는 보이지 않지만 크롤러는 읽을 수 있도록 처리

### 2.4 클라이언트 사이드 HTML 주입

시멘틱 HTML을 클라이언트 사이드에서 동적으로 주입하는 로직을 구현했습니다:

```typescript
if (import.meta.client) {
  const injectSemanticHTML = () => {
    // 기존 HTML 제거 (같은 타입이 중복 주입되는 것 방지)
    const existing = document.querySelector(`.nuxt-aeo-semantic-${schemaType.toLowerCase()}`)
    if (existing) existing.remove()
    
    // 새로운 시멘틱 HTML 주입
    const semanticDiv = document.createElement('div')
    semanticDiv.className = `nuxt-aeo-semantic-${schemaType.toLowerCase()} ${visuallyHidden ? 'nuxt-aeo-visually-hidden' : ''}`
    semanticDiv.setAttribute('aria-hidden', 'true')
    semanticDiv.innerHTML = semanticHtml
    document.body.appendChild(semanticDiv)
  }
  
  // DOM 준비 상태에 따라 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSemanticHTML)
  } else {
    injectSemanticHTML()
  }
}
```

---

## 3. FAQPage 전용 Composable 구현 (`useSchemaPage`)

### 3.1 초기 설계

FAQPage는 가장 많이 사용되는 Schema 타입 중 하나였기 때문에, 전용 composable을 만들기로 결정했습니다:

```typescript
export function useSchemaPage(data: {
  mainEntity: Array<{
    name: string
    acceptedAnswer: { text: string }
  }>
}) {
  // useSchema를 내부적으로 사용
  useSchema({
    context: 'https://schema.org',
    type: 'FAQPage',
    mainEntity: data.mainEntity.map(questionInput => ({
      type: 'Question',
      name: questionInput.name,
      acceptedAnswer: {
        type: 'Answer',
        text: questionInput.acceptedAnswer.text,
      },
    })),
  })
}
```

**설계 이유:**
- FAQPage는 구조가 복잡하여 직접 작성하기 어려움
- `name`, `acceptedAnswer.text`만 제공하면 나머지는 자동 변환
- 타입 안전성 보장

### 3.2 시멘틱 HTML 생성 추가

FAQPage 전용 시멘틱 HTML 생성 함수를 구현했습니다:

```typescript
function generateFAQPageSemanticHTML(mainEntity: Array<{
  name: string
  acceptedAnswer: { text: string }
}>): string {
  const questionsHtml = mainEntity
    .map((question) => {
      const questionText = escapeHtml(question.name || '')
      const answerText = escapeHtml(question.acceptedAnswer.text || '')
      
      return `
        <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h2 itemprop="name">${questionText}</h2>
          <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
            <p itemprop="text">${answerText}</p>
          </div>
        </div>
      `.trim()
    })
    .join('\n')
  
  return `
    <div itemscope itemtype="https://schema.org/FAQPage">
      ${questionsHtml}
    </div>
  `.trim()
}
```

**기본값 설정:**
- `renderHtml: true` (기본값) - FAQPage는 시멘틱 HTML이 중요
- `visuallyHidden: true` (기본값) - 사용자 경험 유지

---

## 4. 전역 스키마 자동 주입 (`plugin.ts`)

### 4.1 플러그인 구현

모든 페이지에 전역 스키마를 자동으로 주입하는 플러그인을 구현했습니다:

```typescript
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const aeoConfig = config.public.aeo as ModuleOptions
  
  // autoInject가 false면 주입하지 않음
  if (aeoConfig?.autoInject === false) {
    return
  }
  
  // schemas 배열이 있으면 각각 주입
  if (aeoConfig?.schemas && aeoConfig.schemas.length > 0) {
    for (const schema of aeoConfig.schemas) {
      useSchema({
        context: 'https://schema.org',
        ...schemaData,
        renderHtml,
        visuallyHidden,
      })
    }
  } else {
    // schemas가 없으면 기본 Project Schema 주입
    useSchema({
      context: 'https://schema.org',
      type: 'Project',
    })
  }
})
```

**설계 결정:**
- 플러그인은 모든 페이지에서 자동 실행
- `autoInject: false` 옵션으로 전역 주입 비활성화 가능
- 개별 스키마의 `renderHtml`, `visuallyHidden` 옵션이 전역 옵션보다 우선

---

## 5. 타입 안전성 보장

### 5.1 TypeScript 타입 정의

모든 Schema 타입에 대한 TypeScript 타입을 정의했습니다:

```typescript
export interface ModuleOptions {
  schemas?: GlobalSchema[]
  autoInject?: boolean
  renderHtml?: boolean
  visuallyHidden?: boolean
}

export type GlobalSchema = {
  context?: 'https://schema.org' | string
  type: string
  renderHtml?: boolean
  visuallyHidden?: boolean
  [key: string]: unknown
}
```

### 5.2 Nuxt Config 타입 확장

`nuxt.config.ts`에서 타입 체크가 가능하도록 타입을 확장했습니다:

```typescript
declare module '@nuxt/schema' {
  interface NuxtConfig {
    aeo?: ModuleOptions
  }
}
```

---

## 6. 주요 구현 결정사항 요약

### 6.1 왜 `useHead()`를 사용했나요?

- Nuxt의 SSR 환경에서 `<head>` 태그에 안전하게 주입 가능
- 클라이언트와 서버 양쪽에서 동작
- Nuxt의 내장 기능을 활용하여 안정성 보장

### 6.2 왜 시멘틱 HTML을 클라이언트에서 주입하나요?

- SSR에서는 `<body>`에 직접 주입하기 어려움
- `useHead()`는 `<head>`에만 주입 가능
- 클라이언트에서 주입하면 DOM 조작이 자유로움
- `aria-hidden="true"`로 스크린 리더에 노출되지 않도록 처리

### 6.3 왜 `visually-hidden` 클래스를 사용하나요?

- `display: none`은 일부 크롤러가 읽지 않을 수 있음
- `visually-hidden`은 화면에는 보이지 않지만 DOM에는 존재
- LLM 크롤러와 검색 엔진이 읽을 수 있음
- 접근성 유지 (스크린 리더는 읽지 않음)

### 6.4 왜 `context`, `type`을 자동 변환하나요?

- JavaScript 객체에서 `@`로 시작하는 키는 사용하기 불편
- `context: 'https://schema.org'`처럼 일반 속성처럼 사용 가능
- 중첩 객체와 배열도 재귀적으로 변환하여 모든 Schema 구조 지원

---

## 7. 향후 개선 계획

1. **더 많은 Schema 타입 지원**: Article, TechArticle, NewsArticle 등
2. **성능 최적화**: 시멘틱 HTML 생성 로직 최적화
3. **타입 안전성 강화**: 더 엄격한 타입 체크
4. **테스트 코드 추가**: 단위 테스트 및 통합 테스트

