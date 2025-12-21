---
title: Nuxt AEO
navigation: false
seo:
  title: Nuxt Module for AI Engine Optimization
  description: A Nuxt module that implements AI Engine Optimization using Schema.org JSON-LD structured data.
  ogImage: https://github.com/yeonjulee1005/nuxt-aeo/raw/main/docs/public/og-image.png
prose: true
---

::u-page-hero
---
orientation: horizontal
---
#title{unwrap="p" class="!my-0 !leading-tight"}
The [AI Engine Optimization]{.text-primary} module for Nuxt.

#description{class="break-keep"}
Nuxt AEO is a module for Nuxt that provides a simple way to implement AI Engine Optimization using `Schema.org JSON-LD` structured data.<br />
It allows developers to easily add and manage schemas through composable functions with full TypeScript support.

#links
  :::u-button
  ---
  label: Get Started
  size: lg
  to: /guide/getting-started
  trailingIcon: i-lucide-arrow-right
  ---
  :::

:u-input-copy{size="xl" value="bun add nuxt-aeo"}
::

::u-container{.pb-12.xl:pb-24}
  :::u-page-section
  #title
  Everything you need for AI Engine Optimization

  #description
  Combine Schema.org simplicity with Nuxt composable power.<br />
  Build AI-optimized websites, from documentation pages to complex applications.
  :::

  :::u-page-grid
    ::::u-page-feature
    ---
    icon: i-lucide-code
    ---
    #title{unwrap="p"}
    Schema.org JSON-LD

    #description{unwrap="p"}
    Implement AI Engine Optimization and search engine optimization using standard Schema.org JSON-LD structured data.
    ::::

    ::::u-page-feature
    ---
    icon: i-lucide-file-code
    ---
    #title{unwrap="p"}
    Automatic HTML Generation

    #description{unwrap="p"}
    Automatically generate semantic HTML based on schema data to improve accessibility.
    ::::

    ::::u-page-feature
    ---
    icon: i-lucide-shield-check
    ---
    #title{unwrap="p"}
    Type Safety

    #description{unwrap="p"}
    Full TypeScript support for type-safe schema definitions.
    ::::

    ::::u-page-feature
    ---
    icon: i-lucide-list
    ---
    #title{unwrap="p"}
    Various Schema Types

    #description{unwrap="p"}
    Supports both global schemas and page-specific schemas for various use cases.
    ::::

    ::::u-page-feature
    ---
    icon: i-lucide-zap
    ---
    #title{unwrap="p"}
    Easy to Use

    #description{unwrap="p"}
    Easily add and manage schemas through composable functions.
    ::::

    ::::u-page-feature
    ---
    icon: i-lucide-globe
    ---
    #title{unwrap="p"}
    Deploy everywhere

    #description{unwrap="p"}
    Nuxt AEO works on all hosting providers, static, server, serverless & edge.
    ::::
  :::
::

::u-page-section
---
reverse: false
orientation: horizontal
---
  :::tabs
    ::::tabs-item{icon="i-simple-icons-nuxtdotjs" label="pages/article.vue"}
    ```vue [pages/article.vue]
    <script setup lang="ts">
    const { data: article } = await useAsyncData('article', () => {
      return queryCollection('articles').path('/my-article').first()
    })

    useSchema({
      type: 'Article',
      headline: article.value?.title,
      datePublished: article.value?.date,
      author: {
        type: 'Person',
        name: 'Author Name'
      }
    })
    </script>

    <template>
      <article>
        <h1>{{ article?.title }}</h1>
        <ContentRenderer :value="article" />
      </article>
    </template>
    ```
    ::::

    ::::tabs-item{icon="i-lucide-eye" label="Preview"}
      :::::browser-frame
        ::::::example-article-schema
        ---
        author: John Doe
        headline: Article Schema Example
        datePublished: 2024-01-01
        ---
        #title
        Article Schema Example.

        #description
        Learn how to use useSchema() composable to structure blog posts and articles with Article schema.
        ::::::
      :::::
    ::::
  :::

#title{unwrap="p" class="!my-0 !leading-tight"}
Set up easily using [useSchema()]{.text-(--ui-secondary)} composable

#features
  :::u-page-feature
  ---
  icon: i-lucide-list
  ---
  #title{unwrap="p"}
  Specify schemas with composable functions
  :::

  :::u-page-feature
  ---
  icon: i-lucide-hash
  ---
  #title{unwrap="p"}
  Use TypeScript for type safety
  :::

  :::u-page-feature
  ---
  icon: i-lucide-code-xml
  ---
  #title{unwrap="p"}
  Automatic JSON-LD generation
  :::

#links
  :::u-button
  ---
  color: neutral
  label: Learn more about schemas
  to: /guide/usage
  trailingIcon: i-lucide-arrow-right
  variant: subtle
  ---
  :::
::

::u-page-section
---
reverse: false
orientation: vertical
---
#title{unwrap="p"}
Check out [examples]{.text-(--ui-primary)}

#description
Explore real-world examples of how to use Nuxt AEO with different schema types.

#features
  :::u-page-feature
  ---
  icon: i-lucide-user
  to: /examples/person
  ---
  #title{unwrap="p"}
  Person Schema

  #description{unwrap="p"}
  Learn how to use useSchema() composable to provide personal information as structured data.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-building
  to: /examples/organization
  ---
  #title{unwrap="p"}
  Organization Schema

  #description{unwrap="p"}
  Learn how to use useSchema() composable to provide company or organization information as structured data.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-list
  to: /examples/itemlist
  ---
  #title{unwrap="p"}
  ItemList Schema

  #description{unwrap="p"}
  Learn how to use useSchema() composable to create structured lists for products, catalogs, or ranking pages.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-file-text
  to: /examples/article
  ---
  #title{unwrap="p"}
  Article Schema

  #description{unwrap="p"}
  Learn how to use useSchema() composable to structure blog posts, news articles, and tutorials with Article schema.
  :::
::
