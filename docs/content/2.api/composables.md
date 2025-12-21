---
title: Composables
description: Composable functions provided by Nuxt AEO
navigation: false
---

Nuxt AEO provides composable functions for easily adding Schema.org JSON-LD. These functions are automatically imported, so no separate import statement is needed.

## useSchema

A universal Schema composable that can add any Schema.org type to the page head in JSON-LD format.

### Type Definition

```ts [composables.ts]
function useSchema(schema: Record<string, unknown> & {
  renderHtml?: boolean
  visuallyHidden?: boolean
}): void
```

### `schema` (Required)

A Schema object. It can include the following properties:

- `context` (Optional): Schema.org context URL. Default is `'https://schema.org'`. Internally converted to `@context`.
- `type` (Optional): Schema type (e.g., `'Person'`, `'Organization'`, `'ItemList'`, etc.). Internally converted to `@type`.
- `renderHtml` (Optional, default: `false`): Whether to automatically generate semantic HTML. If set to `true`, semantic HTML is automatically generated based on schema data and injected into the page body.
- `visuallyHidden` (Optional, default: `true`): When `renderHtml` is `true`, whether to visually hide the generated semantic HTML. If set to `true`, screen readers and crawlers can read it, but it won't be displayed on screen.
- **Other Schema properties**: You can use any property defined by Schema.org.

### Features

- **Automatic Key Conversion**: Using `context` and `type` will automatically convert them to `@context` and `@type` internally. Nested objects are also converted recursively.
- **SSR Support**: Uses `useHead()` to work perfectly in server-side rendering environments.
- **Semantic HTML Generation**: When `renderHtml: true` is set, semantic HTML is automatically generated for specific types like Organization, Person, ItemList, etc.

> **Tip**: The `context` and `type` properties are automatically converted to `@context` and `@type` internally, so they appear as `@context` and `@type` in JSON-LD format.

### Basic Usage Example

```vue [pages/example.vue]
<script setup lang="ts">
// Organization Schema
useSchema({
  context: 'https://schema.org',
  type: 'Organization',
  name: 'Example Company',
  url: 'https://example.com',
  logo: 'https://example.com/logo.png',
  description: 'A great company',
})
</script>
```

### Person Schema Example

```vue [pages/example.vue]
<script setup lang="ts">
useSchema({
  context: 'https://schema.org',
  type: 'Person',
  name: 'John Doe',
  jobTitle: 'Software Engineer',
  url: 'https://example.com',
  image: 'https://example.com/profile.jpg',
  knowsAbout: ['Nuxt', 'TypeScript', 'Vue'],
  sameAs: [
    'https://github.com/johndoe',
    'https://twitter.com/johndoe',
  ],
})
</script>
```

### ItemList Schema Example

```vue [pages/example.vue]
<script setup lang="ts">
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
    {
      type: 'ListItem',
      position: 3,
      name: 'TypeScript',
      item: 'https://example.com/typescript',
    },
  ],
})
</script>
```

### Semantic HTML Auto-Generation Example

```vue [pages/example.vue]
<script setup lang="ts">
// Setting renderHtml: true will automatically generate semantic HTML
useSchema({
  context: 'https://schema.org',
  type: 'Organization',
  name: 'Example Company',
  url: 'https://example.com',
  description: 'A great company',
  renderHtml: true,        // Generate semantic HTML
  visuallyHidden: true,    // Visually hide (default)
})
</script>
```

### Display Semantic HTML on Screen Example

```vue [pages/example.vue]
<script setup lang="ts">
// Setting visuallyHidden: false will display semantic HTML on screen
useSchema({
  context: 'https://schema.org',
  type: 'Person',
  name: 'John Doe',
  jobTitle: 'Software Engineer',
  renderHtml: true,
  visuallyHidden: false,  // Display on screen
})
</script>
```

### Supported Semantic HTML Types

When `renderHtml: true` is set, special semantic HTML is generated for the following Schema types:

- **Organization**: Converts Organization information to microdata format
- **Person**: Converts Person information to microdata format
- **ItemList**: Converts ItemList to microdata format with `<ol>` tag
- **Other types**: Converts general Schema properties (name, description, url, image) to microdata format

### Notes

- The `context` and `type` properties are automatically converted to `@context` and `@type` internally, so they appear as `@context` and `@type` in JSON-LD format.
- The `context` and `type` properties of nested objects are also automatically converted.
- When `renderHtml: true` is set, semantic HTML is injected only on the client side.

> **Warning**: Calling the same type of Schema multiple times will remove the previously injected semantic HTML and replace it with new HTML.

---

## useSchemaPage

A type-safe helper composable for easily adding FAQPage Schema. Used when adding question-answer structures to FAQ pages.

### Type Definition

```ts [composables.ts]
function useSchemaPage(data: {
  mainEntity: Array<{
    name: string
    acceptedAnswer: { text: string, [key: string]: unknown }
    [key: string]: unknown
  }>
  renderHtml?: boolean
  visuallyHidden?: boolean
  [key: string]: unknown
}): void
```

### `data` (Required)

FAQPage Schema data object:

- `mainEntity`(Required): An array of FAQ questions and answers. Each item includes the following properties:
  - `name` (Required): Question text
  - `acceptedAnswer`(Required): Answer object
    - `text` (Required): Answer text
    - Other Schema.org Answer properties
  - Other Schema.org Question properties
- `renderHtml` (Optional, default: `true`): Whether to automatically generate semantic HTML. Unlike `useSchema`, the default is `true`.
- `visuallyHidden` (Optional, default: `true`): Whether to visually hide the generated semantic HTML.
- **Other FAQPage properties**: You can use any property defined by Schema.org FAQPage.

### Features

- **Type Safety**: Defined with TypeScript for type checking.
- **Easy to Use**: You can define FAQs in a simple object format without writing complex JSON-LD structures directly.
- **Automatic Conversion**: Internally uses `useSchema` to convert to JSON-LD format and automatically generates semantic HTML suitable for FAQPage.
- **Default Semantic HTML Generation**: `renderHtml` is set to `true` by default, so semantic HTML is automatically generated without additional configuration.

> **Note**: Unlike `useSchema`, `useSchemaPage` has a default value of `true` for `renderHtml`. To not generate semantic HTML, you must explicitly set `renderHtml: false`.

### Basic Usage Example

```vue [pages/example.vue]
<script setup lang="ts">
useSchemaPage({
  mainEntity: [
    {
      name: 'What is the Nuxt AEO module?',
      acceptedAnswer: {
        text: 'Nuxt AEO is a Nuxt module that supports AI Engine Optimization (AEO) through Schema.org JSON-LD.',
      },
    },
    {
      name: 'What Schema types are supported?',
      acceptedAnswer: {
        text: 'Currently supports Schema types such as Person, FAQPage, ItemList, Article, TechArticle, etc.',
      },
    },
    {
      name: 'Is semantic HTML automatically generated?',
      acceptedAnswer: {
        text: 'Yes, useSchemaPage automatically generates semantic HTML by default. You can control it with the renderHtml option.',
      },
    },
  ],
})
</script>
```

### Additional Properties Example

```vue [pages/example.vue]
<script setup lang="ts">
useSchemaPage({
  mainEntity: [
    {
      name: 'How do I install it?',
      acceptedAnswer: {
        text: 'You can install it with the command: npx nuxi module add nuxt-aeo',
        dateCreated: '2024-01-01',
      },
    },
  ],
  // Additional FAQPage properties
  headline: 'Frequently Asked Questions',
  description: 'Frequently asked questions about the Nuxt AEO module',
})
</script>
```

### Disable Semantic HTML Example

```vue [pages/example.vue]
<script setup lang="ts">
// Add only JSON-LD, do not generate semantic HTML
useSchemaPage({
  mainEntity: [
    {
      name: 'Question 1',
      acceptedAnswer: {
        text: 'Answer 1',
      },
    },
  ],
  renderHtml: false,  // Disable semantic HTML generation
})
</script>
```

### Display Semantic HTML on Screen Example

```vue [pages/example.vue]
<script setup lang="ts">
// Display semantic HTML on screen (so screen readers and crawlers can read it)
useSchemaPage({
  mainEntity: [
    {
      name: 'Question 1',
      acceptedAnswer: {
        text: 'Answer 1',
      },
    },
  ],
  renderHtml: true,
  visuallyHidden: false,  // Display on screen
})
</script>
```

### Generated JSON-LD Structure

`useSchemaPage` internally generates the following JSON-LD structure:

```json [example.json]
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question text",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer text"
      }
    }
  ]
}
```

### Generated Semantic HTML Structure

When `renderHtml: true`, the following semantic HTML is generated:

```html [example.html]
<div itemscope itemtype="https://schema.org/FAQPage">
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h2 itemprop="name">Question text</h2>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p itemprop="text">Answer text</p>
    </div>
  </div>
</div>
```

### Notes

- Since `renderHtml` defaults to `true`, you must explicitly set `renderHtml: false` if you don't want to generate semantic HTML.
- Since `visuallyHidden` defaults to `true`, the generated semantic HTML is not displayed on screen by default.

> **Warning**:
>
> - Semantic HTML is injected only on the client side.
> - Calling `useSchemaPage` multiple times on the same page will remove the previously injected semantic HTML and replace it with new HTML.

---

## Comparison: useSchema vs useSchemaPage

| Feature            | useSchema                                     | useSchemaPage                          |
| ------------------ | --------------------------------------------- | -------------------------------------- |
| Purpose            | Supports all Schema types                     | FAQPage only                           |
| Type Safety        | Generic object                                | FAQPage-specific type definition       |
| renderHtml Default | `false`                                       | `true`                                 |
| Ease of Use        | Define all properties directly                | Simple API optimized for FAQ structure |
| Semantic HTML      | Supports Organization, Person, ItemList, etc. | FAQPage-specific semantic HTML         |

### When to Use What?

- `useSchema`: Use for all Schema types other than FAQPage, such as Person, Organization, ItemList, Article, etc.
- `useSchemaPage`: Use when adding question-answer structures to FAQ pages (more convenient and type-safe)

---

## Additional Resources

- [Schema.org Official Documentation](https://schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [FAQPage Schema Documentation](https://schema.org/FAQPage)
