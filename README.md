<a href="https://nuxt-aeo-docs.vercel.app"><img width="256" alt="Nuxt AEO" src="./docs/public/icon.svg"></a>
<br>

<h1>
Nuxt AEO
</h1>

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

<p>
A Nuxt module that implements AI Engine Optimization (AEO) using Schema.org JSON-LD structured data.
</p>

<p>
  <a href="https://github.com/yeonjulee1005/nuxt-aeo/releases">✨ Release Notes</a>
  | <a href="https://nuxt-aeo-playground.vercel.app">🏀 Online playground</a>
  | <a href="https://nuxt-aeo-docs.vercel.app">📖 Documentation</a>
</p>

<br>

## What is AEO?

**AI Engine Optimization (AEO)** is a technique for optimizing structured data so that AI models (ChatGPT, Claude, Perplexity, etc.) and search engines can better understand web content and provide accurate answers to user questions.

This module uses Schema.org JSON-LD format to add structured data to web pages and automatically injects scripts into the `<head>` tag via `useHead()` in SSR environments. This enables:

- 🤖 **AI Model Optimization**: AI models like ChatGPT, Claude, and Perplexity can use structured data when crawling and understanding content to provide more accurate information and citations
- 🔍 **Search Engine Optimization**: Search engines like Google and Bing can display your content in Featured Snippets, Knowledge Graph, etc.
- 📊 **Answer Engine Optimization**: Optimize for search engines and AI models to provide direct answers to user questions

## Installation

Install the module in your Nuxt application:

```bash
bun add nuxt-aeo
```

Once installed, you can start using Nuxt AEO ✨

## Module Options

You can configure module options in `nuxt.config.ts`:

### Global Schema Configuration

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-aeo'],
  aeo: {
    // Global schema array (automatically injected into all pages)
    // You can configure various schema types like Person, Organization, WebSite, etc.
    schemas: [
      {
        type: 'Organization',
        name: 'My Company',
        url: 'https://www.example.com',
        logo: 'https://www.example.com/logo.png',
        // Can be overridden with renderHtml, visuallyHidden options on individual schemas
        renderHtml: true,
        visuallyHidden: true,
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
    // Automatic injection (default: true)
    // If false, schemas are not injected even if the schemas array exists
    // If schemas array is missing, default Project Schema is injected (except when autoInject: false)
    autoInject: true,
    // Global semantic HTML auto-generation (default: true)
    renderHtml: true,
    // Global visual hiding (default: true)
    visuallyHidden: true,
  }
})
```

### Option Description

- **`schemas`** (Optional): Array of schemas to inject globally. You can configure various schema types like Person, Organization, WebSite, etc. When configured, they are automatically injected into all pages. If the `schemas` array is missing or empty, a default `Project` schema is injected.
- **`autoInject`** (Optional, default: `true`): Controls whether global schema information is automatically injected. If `false`, schemas are not injected even if the `schemas` array exists. If the `schemas` array is missing, a default `Project` schema is injected (except when `autoInject: false`).
- **`renderHtml`** (Optional, default: `true`): Controls whether semantic HTML is automatically generated globally. If `true`, semantic HTML is automatically generated for global schemas and injected into pages. Semantic HTML is used together with JSON-LD to optimize LLM crawling. Can be overridden with the `renderHtml` option on individual schemas.
- **`visuallyHidden`** (Optional, default: `true`): Controls whether semantic HTML is visually hidden globally. If `true`, generated semantic HTML is hidden with the `visually-hidden` class. LLM crawlers and search engines can read it, but it's not visible to users. Can be overridden with the `visuallyHidden` option on individual schemas.

## Features

- 🎯 **Type Safety**: All Schema types are defined in TypeScript, enabling type checking
- 🚀 **SSR Support**: Uses `useHead()` to work perfectly in server-side rendering environments
- 📦 **Auto Import**: Composable functions are automatically imported, no separate import statements needed
- 🔧 **Flexible Configuration**: Configure global schemas or add individual schemas per page
- 📚 **Various Schema Support**: Supports all Schema.org types including Person, Organization, FAQPage, ItemList, Article, etc.
- ✨ **Easy to Use**: Using `context` and `type` automatically converts them to `@context` and `@type` internally, so you can use them without quotes
- 🔗 **Automatic URL Normalization**: Automatically normalizes relative URLs to absolute URLs in `url`, `image`, `logo`, and `item` properties, ensuring consistent URL formatting for AI models and search engines
- 🎨 **Automatic Semantic HTML Generation**: Automatically generates semantic HTML based on schema data to optimize LLM crawling. Controllable at both global and individual schema levels
- 👁️ **Visual Hiding**: Generated semantic HTML is hidden with the `visually-hidden` class, allowing crawlers to read it without affecting user experience

## Usage

### FAQPage Schema

Add question-answer structures to FAQ pages. Semantic HTML is also automatically generated via the `renderHtml` option (default: `true`):

```vue
<script setup lang="ts">
useSchemaFaq({
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
  ],
  // renderHtml: true (default) - Automatic semantic HTML generation
  // visuallyHidden: true (default) - Visually hide
  // Using JSON-LD together with semantic HTML is more effective for LLM crawling
})
</script>
```

**Automatic Semantic HTML Generation:**
- When `renderHtml: true` (default), semantic HTML is automatically generated based on schema data
- When `visuallyHidden: true` (default), generated HTML is hidden with the `visually-hidden` class
- Generated HTML is not visible to users but is included in the HTML source for LLMs and crawlers to read
- Using JSON-LD together with semantic HTML improves AI model content understanding

**URL Normalization:**
- `useSchemaFaq()` automatically normalizes all `url`, `image`, `logo`, and `item` properties to absolute URLs
- Relative URLs are combined with the base URL (from `useRequestURL()` or `app.baseURL`)
- Absolute URLs (starting with `http://` or `https://`) remain unchanged
- This ensures consistent URL formatting for AI models and search engines

### Universal useSchema Function

You can also create Schema objects directly. Using `context` and `type` automatically converts them to `@context` and `@type` internally:

```vue
<script setup lang="ts">
// Organization Schema
useSchema({
  context: 'https://schema.org',
  type: 'Organization',
  name: 'Example Company',
  url: 'https://example.com',
  logo: '/logo.png', // Relative URL from /public folder - automatically normalized to absolute URL
  // renderHtml: true (default) - Automatic semantic HTML generation
  // visuallyHidden: true (default) - Visually hide
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
      item: '/languages/javascript', // Relative URL - automatically normalized to absolute
    },
    {
      type: 'ListItem',
      position: 2,
      name: 'Python',
      item: 'https://www.python.org', // Absolute URL - used as-is
    },
    {
      type: 'ListItem',
      position: 3,
      name: 'TypeScript',
      item: '/languages/typescript', // Relative URL - automatically normalized to absolute
    },
  ],
  renderHtml: true,
  visuallyHidden: true,
})

// Person Schema with nested object
useSchema({
  context: 'https://schema.org',
  type: 'Person',
  name: 'John Doe',
  jobTitle: 'Software Engineer',
  url: '/about', // Relative URL - automatically normalized to absolute URL
  image: '/images/profile.jpg', // Relative URL from /public folder - automatically normalized
  // Control semantic HTML generation with renderHtml and visuallyHidden options
  renderHtml: false, // Disable semantic HTML generation
})
</script>
```

**Note:** 
- `context` and `type` are automatically converted to `@context` and `@type` internally, so you can use them without quotes like regular properties. Nested objects are also converted automatically.
- Use the `renderHtml` and `visuallyHidden` options to control semantic HTML generation and visual hiding.
- **URL Normalization**: All `url`, `image`, `logo`, and `item` properties in the schema are automatically normalized to absolute URLs. Relative URLs are combined with the base URL (from `useRequestURL()` or `app.baseURL`), while absolute URLs (starting with `http://` or `https://`) remain unchanged. This normalization applies recursively to nested objects and arrays (e.g., `author.url`, `publisher.logo.url`, `sameAs[]`, `itemListElement[].item`).

## Verification

Using each composable function automatically adds a JSON-LD script to the page's `<head>` tag. Open Developer Tools (F12) and check the Elements tab for a script tag like this:

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

**Note:** 
- When you pass `context` and `type` to `useSchema`, they are internally converted to `@context` and `@type` and injected into JSON-LD.
- If semantic HTML is generated, you can check for elements with the `nuxt-aeo-semantic-*` class in Developer Tools.
- You can use [Google's Rich Results Test](https://search.google.com/test/rich-results) to verify that your Schema is correctly recognized.

## Frequently Asked Questions

This page includes FAQPage Schema to help AI models and search engines understand common questions about Nuxt AEO.

```vue
<script setup lang="ts">
useSchemaFaq({
  mainEntity: [
    {
      name: 'What is the Nuxt AEO module?',
      acceptedAnswer: {
        text: 'Nuxt AEO is a Nuxt module that implements AI Engine Optimization (AEO) using Schema.org JSON-LD structured data. It helps AI models (ChatGPT, Claude, Perplexity, etc.) and search engines better understand web content and provide accurate answers to user questions.',
      },
    },
    {
      name: 'What Schema types are supported?',
      acceptedAnswer: {
        text: 'Nuxt AEO supports all Schema.org types including Person, Organization, FAQPage, ItemList, Article, TechArticle, NewsArticle, WebSite, and more. You can use any Schema.org type through the useSchema() composable.',
      },
    },
    {
      name: 'Can I use it immediately after installation?',
      acceptedAnswer: {
        text: 'Yes! Once you install the module with `bun add nuxt-aeo` and add it to your `nuxt.config.ts`, you can start using it immediately. If you don\'t configure global schemas, a default Project schema will be automatically injected. You can also add schemas per page using useSchema() or useSchemaFaq() composables.',
      },
    },
    {
      name: 'What is the difference between useSchemaFaq() and useSchema()?',
      acceptedAnswer: {
        text: 'useSchemaFaq() is a specialized composable for FAQPage Schema that provides a simpler API for adding question-answer structures. useSchema() is a universal composable that can create any Schema.org type. Both support automatic semantic HTML generation and visual hiding options.',
      },
    },
    {
      name: 'How does automatic semantic HTML generation work?',
      acceptedAnswer: {
        text: 'When renderHtml is set to true (default), Nuxt AEO automatically generates semantic HTML based on your schema data. This HTML is hidden from users (when visuallyHidden is true) but is included in the HTML source for LLMs and crawlers to read. Using JSON-LD together with semantic HTML improves AI model content understanding.',
      },
    },
  ],
})
</script>
```

### Question List

- **What is the Nuxt AEO module?**: A Nuxt module that implements AI Engine Optimization (AEO) using Schema.org JSON-LD structured data to help AI models and search engines better understand web content.

- **What Schema types are supported?**: Supports all Schema.org types including Person, Organization, FAQPage, ItemList, Article, TechArticle, NewsArticle, WebSite, and more.

- **Can I use it immediately after installation?**: Yes! Once installed and added to your config, you can start using it immediately. A default Project schema is automatically injected if no global schemas are configured.

- **What is the difference between useSchemaFaq() and useSchema()?**: useSchemaFaq() is specialized for FAQPage Schema with a simpler API, while useSchema() is a universal composable for any Schema.org type.

- **How does automatic semantic HTML generation work?**: When enabled (default), semantic HTML is automatically generated from schema data and hidden from users but accessible to LLMs and crawlers, improving AI model content understanding.

## Documentation

For more detailed documentation, please refer to the [documentation site](/docs).

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
