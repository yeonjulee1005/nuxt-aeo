# Nuxt AEO Module Implementation History

## 1. Basic Structure Design

### Module Entry Point (`src/module.ts`)

We designed the basic structure of the Nuxt module:

```typescript
export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-aeo',
    configKey: 'aeo',
  },
  setup(options, nuxt) {
    // Add module options to runtime config
    // Register plugins
    // Configure automatic composable imports
  },
})
```

**Key Design Decisions:**
- Set `configKey: 'aeo'` to access via `aeo` option in `nuxt.config.ts`
- Store options in `runtimeConfig.public` for access from both client and server
- Implement automatic composable imports using `addImportsDir`

---

## 2. Universal Schema Composable Implementation (`useSchema`)

### 2.1 Initial Implementation: JSON-LD Generation

We first implemented the basic functionality to generate Schema.org JSON-LD:

```typescript
export function useSchema(schema: Record<string, unknown>) {
  // Inject JSON-LD into <head>
  useHead({
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schema, null, 2),
    }],
  })
}
```

### 2.2 Key Transformation Logic Addition

We added functionality to automatically convert `context` and `type` to `@context` and `@type` for better developer experience:

```typescript
function transformSchemaKeys(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  
  for (const [key, value] of Object.entries(obj)) {
    // Transform context → @context, type → @type
    const transformedKey = key === 'context' ? '@context' : key === 'type' ? '@type' : key
    
    // Recursively transform nested objects and arrays
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

**Why this implementation?**
- Keys starting with `@` in JavaScript objects are difficult to use without quotes
- Allows using `context` and `type` as regular properties, improving developer experience
- Automatically converts nested objects and arrays to support all Schema structures

### 2.3 Semantic HTML Auto-generation Feature Addition

We added semantic HTML auto-generation functionality to optimize AI model learning:

```typescript
// HTML generation function for each Schema type
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

**Implementation Details:**
- Microdata format using `itemscope`, `itemtype`, `itemprop` attributes
- HTML escaping to prevent XSS
- `visually-hidden` CSS class to hide from users while remaining readable by crawlers

### 2.4 Client-side HTML Injection

We implemented logic to dynamically inject semantic HTML on the client side:

```typescript
if (import.meta.client) {
  const injectSemanticHTML = () => {
    // Remove existing HTML (prevent duplicate injection of same type)
    const existing = document.querySelector(`.nuxt-aeo-semantic-${schemaType.toLowerCase()}`)
    if (existing) existing.remove()
    
    // Inject new semantic HTML
    const semanticDiv = document.createElement('div')
    semanticDiv.className = `nuxt-aeo-semantic-${schemaType.toLowerCase()} ${visuallyHidden ? 'nuxt-aeo-visually-hidden' : ''}`
    semanticDiv.setAttribute('aria-hidden', 'true')
    semanticDiv.setAttribute('tabindex', '-1')
    semanticDiv.innerHTML = semanticHtml
    document.body.appendChild(semanticDiv)
  }
  
  // Execute based on DOM ready state
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSemanticHTML)
  } else {
    injectSemanticHTML()
  }
}
```

---

## 3. FAQPage-specific Composable Implementation (`useSchemaFaq`)

### 3.1 Initial Design

Since FAQPage is one of the most commonly used Schema types, we decided to create a dedicated composable:

```typescript
export function useSchemaFaq(data: {
  mainEntity: Array<{
    name: string
    acceptedAnswer: { text: string }
  }>
}) {
  // Use useSchema internally
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

**Design Rationale:**
- FAQPage structure is complex and difficult to write directly
- Only need to provide `name` and `acceptedAnswer.text`, rest is automatically transformed
- Ensures type safety

### 3.2 Semantic HTML Generation Addition

We implemented a FAQPage-specific semantic HTML generation function:

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

**Default Settings:**
- `renderHtml: true` (default) - Semantic HTML is important for FAQPage
- `visuallyHidden: true` (default) - Maintains user experience

---

## 4. Global Schema Auto-injection (`plugin.ts`)

### 4.1 Plugin Implementation

We implemented a plugin that automatically injects global schemas into all pages:

```typescript
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const aeoConfig = config.public.aeo as ModuleOptions
  
  // Don't inject if autoInject is false
  if (aeoConfig?.autoInject === false) {
    return
  }
  
  // Inject each schema if schemas array exists
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
    // Inject default Project Schema if schemas is missing
    useSchema({
      context: 'https://schema.org',
      type: 'Project',
    })
  }
})
```

**Design Decisions:**
- Plugin automatically runs on all pages
- Can disable global injection with `autoInject: false` option
- Individual schema's `renderHtml` and `visuallyHidden` options take precedence over global options

---

## 5. Type Safety Guarantee

### 5.1 TypeScript Type Definitions

We defined TypeScript types for all Schema types:

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

### 5.2 Nuxt Config Type Extension

We extended types to enable type checking in `nuxt.config.ts`:

```typescript
declare module '@nuxt/schema' {
  interface NuxtConfig {
    aeo?: ModuleOptions
  }
}
```

---

## 6. Key Implementation Decision Summary

### 6.1 Why use `useHead()`?

- Safely inject into `<head>` tag in Nuxt's SSR environment
- Works on both client and server
- Ensures stability by leveraging Nuxt's built-in functionality

### 6.2 Why inject semantic HTML on the client side?

- Difficult to directly inject into `<body>` in SSR
- `useHead()` can only inject into `<head>`
- Client-side injection allows free DOM manipulation
- Handled with `aria-hidden="true"` to prevent exposure to screen readers

### 6.3 Why use `visually-hidden` class?

- Some crawlers may not read `display: none`
- `visually-hidden` is not visible on screen but exists in DOM
- Readable by LLM crawlers and search engines
- Maintains accessibility (screen readers don't read it)

### 6.4 Why automatically convert `context` and `type`?

- Keys starting with `@` in JavaScript objects are inconvenient to use
- Can use `context: 'https://schema.org'` like a regular property
- Recursively converts nested objects and arrays to support all Schema structures

---

## 7. Future Improvement Plans

1. **Support for More Schema Types**: Article, TechArticle, NewsArticle, etc.
2. **Performance Optimization**: Optimize semantic HTML generation logic
3. **Enhanced Type Safety**: Stricter type checking
4. **Add Test Code**: Unit tests and integration tests
