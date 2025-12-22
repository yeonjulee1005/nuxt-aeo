# Schema Usage Guide

This document explains how to use schemas in the Nuxt AEO module.

## Schema Usage Patterns

The Nuxt AEO module supports two ways to use schemas:

### 1. Global Schemas

Schemas configured in the `aeo.schemas` array in `nuxt.config.ts` are **automatically injected into all pages**.

**Use Cases:**
- Organization: Project/company information
- Person: Author information (common to all pages)
- WebSite: Website information

**Configuration:**
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-aeo'],
  aeo: {
    schemas: [
      {
        type: 'Organization',
        name: 'My Company',
        url: '/', // Relative URL - will be normalized to absolute
        logo: '/images/logo.png', // Relative URL - will be normalized to absolute
      },
      {
        type: 'Person',
        name: 'John Doe',
        url: 'https://example.com/profile', // Absolute URL - used as-is
        image: '/images/profile.jpg', // Relative URL - will be normalized to absolute
      },
    ],
  },
})
```

**Note:** Using `type` will automatically convert it to `@type` internally. If the `schemas` array is missing or empty, a default `Project` schema is injected.

### 2. Page-specific Schemas

You can add schemas **only to specific pages** using composable functions.

**Use Cases:**
- FAQPage: Required only on FAQ pages
- Article: Required only on blog post pages
- ItemList: Required only on list pages
- Person: When you want to display additional Person information on specific pages

**Usage:**
```vue
<!-- pages/faq.vue -->
<script setup lang="ts">
// Add FAQPage Schema only to FAQ page
useSchemaFaq({
  mainEntity: [
    {
      name: 'Question?',
      acceptedAnswer: { text: 'Answer' },
    },
  ],
})
</script>
```

## Composable Functions

The following composable functions are used to add **page-specific schemas**:

### ✅ Available Functions

1. **`useSchemaFaq()`** - Add FAQPage Schema
  - Required for FAQ pages
  - Includes automatic semantic HTML generation (default: `true`)
  - **Automatic URL Normalization**: Provides URL normalization functionality like `useSchema()`
  - Added per page, separate from global schemas

2. **`useSchema()`** - Universal Schema addition
  - Universal function that can add any Schema type
  - Using `context` and `type` will automatically convert them to `@context` and `@type` internally
  - **Automatic URL Normalization**: Absolute URLs are used as-is, while relative URLs are combined with the base URL to convert to absolute URLs
  - URL normalization applies recursively to nested objects and arrays (e.g., `author.url`, `publisher.logo.url`, `sameAs[]`, `itemListElement[].item`)
  - Supports all Schema types including Person, Organization, ItemList, Article, etc.

**Usage Examples:**
```vue
<script setup lang="ts">
// FAQPage Schema
useSchemaFaq({
  mainEntity: [
    {
      name: 'Question?',
      acceptedAnswer: { text: 'Answer' },
    },
  ],
})

// Person Schema with mixed absolute and relative URLs
useSchema({
  context: 'https://schema.org',
  type: 'Person',
  name: 'John Doe',
  jobTitle: 'Software Engineer',
  url: '/profile', // Relative URL - will be normalized to absolute
  image: 'https://example.com/profile.jpg', // Absolute URL - used as-is
  sameAs: [
    'https://github.com/johndoe', // Absolute URL - used as-is
    '/social/twitter', // Relative URL - will be normalized to absolute
  ],
})

// ItemList Schema with mixed absolute and relative URLs
useSchema({
  context: 'https://schema.org',
  type: 'ItemList',
  name: 'Top 10 Items',
  itemListElement: [
    {
      type: 'ListItem',
      position: 1,
      name: 'Item 1',
      item: '/products/item1', // Relative URL - will be normalized to absolute
    },
    {
      type: 'ListItem',
      position: 2,
      name: 'Item 2',
      item: 'https://example.com/item2', // Absolute URL - used as-is
    },
  ],
})
</script>
```

## Global Schemas vs Page-specific Schemas

| Category | Global Schemas | Page-specific Schemas |
|----------|---------------|----------------------|
| Configuration Location | `nuxt.config.ts` | Each page component |
| Scope | All pages | Only that page |
| Usage Method | `aeo.schemas` array | Composable functions |
| Examples | Organization, Person (common) | FAQPage, Article (page-specific) |

## Real-world Usage Examples

### Example 1: FAQ Page

```vue
<!-- pages/faq.vue -->
<script setup lang="ts">
// Global schemas (auto-injected):
// - Organization (configured in nuxt.config.ts)
// - Person (configured in nuxt.config.ts)

// Page-specific schema (manually added):
useSchemaFaq({
  mainEntity: [
    // FAQ questions and answers
  ],
})
</script>
```

**Result:**
- Organization Schema (global)
- Person Schema (global)
- FAQPage Schema (page-specific)

### Example 2: Blog Post Page

```vue
<!-- pages/blog/[slug].vue -->
<script setup lang="ts">
// Global schemas (auto-injected):
// - Organization (global)
// - Person (global)

// Page-specific schema (manually added):
useSchema({
  context: 'https://schema.org',
  type: 'Article',
  headline: 'Article Title',
  datePublished: '2024-01-01',
  image: '/images/article.jpg', // Relative URL - will be normalized to absolute
  author: {
    type: 'Person',
    name: 'Author Name',
    url: 'https://example.com/author', // Absolute URL - used as-is
  },
  publisher: {
    type: 'Organization',
    name: 'Example Company',
    logo: {
      type: 'ImageObject',
      url: '/logo.png', // Relative URL - will be normalized to absolute
    },
  },
  // ...
})
</script>
```

**Result:**
- Organization Schema (global)
- Person Schema (global)
- Article Schema (page-specific)

### Example 3: List Page

```vue
<!-- pages/list.vue -->
<script setup lang="ts">
// Global schemas (auto-injected):
// - Organization (global)
// - Person (global)

// Page-specific schema (manually added):
useSchema({
  context: 'https://schema.org',
  type: 'ItemList',
  name: 'Top 10 Items',
  itemListElement: [
    {
      type: 'ListItem',
      position: 1,
      name: 'Item 1',
      item: '/products/item1', // Relative URL - will be normalized to absolute
    },
    {
      type: 'ListItem',
      position: 2,
      name: 'Item 2',
      item: 'https://example.com/item2', // Absolute URL - used as-is
    },
  ],
})
</script>
```

**Result:**
- Organization Schema (global)
- Person Schema (global)
- ItemList Schema (page-specific)

## URL Normalization

Both `useSchema()` and `useSchemaFaq()` automatically perform URL normalization:

- **Absolute URLs** (starting with `http://` or `https://`): Used as-is
- **Relative URLs**: Combined with base URL (from `useRequestURL()` or `app.baseURL`)
- **Recursive Processing**: Processes `url` and `image` properties recursively, including nested objects
  - Examples: `author.url`, `publisher.logo.url`, `sameAs[]`, `itemListElement[].item`

This ensures that all URLs in your schema are automatically converted to absolute URLs, which is required by Schema.org standards.

## Conclusion

- **Global Schemas**: Information common to all pages (Organization, Person, etc.). Configure in the `schemas` array in `nuxt.config.ts`. If not configured, a default `Project` schema is injected.
- **Page-specific Schemas**: Information required only on specific pages (FAQPage, Article, ItemList, etc.). Add using `useSchema()` or `useSchemaFaq()`.
- **Key Conversion**: Using `context` and `type` will automatically convert them to `@context` and `@type` internally, so you can use them like regular properties without quotes.
- **URL Normalization**: Relative URL paths are automatically converted to absolute URLs to comply with Schema.org standards.

You can use both approaches together to implement flexible and powerful AEO optimization.
