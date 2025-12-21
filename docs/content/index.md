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
reverse: true
orientation: horizontal
---
  :::tabs
    ::::tabs-item{icon="i-simple-icons-nuxtdotjs" label="pages/index.vue"}
    ```vue [pages/index.vue]
    <script setup lang="ts">
    useSchemaPage({
      mainEntity: [
        {
          name: 'Nuxt AEO 모듈이란 무엇인가요?',
          acceptedAnswer: {
            text: 'Nuxt AEO는 AI Engine Optimization을 구현하기 위한 Nuxt 모듈입니다. Schema.org JSON-LD 구조화된 데이터를 사용하여 AI 모델과 검색 엔진이 웹사이트 콘텐츠를 더 잘 이해할 수 있도록 도와줍니다.',
          },
        },
        {
          name: '어떤 Schema 타입을 지원하나요?',
          acceptedAnswer: {
            text: 'Nuxt AEO는 Person, Organization, Article, ItemList 등 다양한 Schema.org 타입을 지원합니다. useSchema()와 useSchemaPage() composable을 통해 전역 스키마와 페이지별 스키마를 모두 설정할 수 있습니다.',
          },
        },
        {
          name: '설치 후 바로 사용할 수 있나요?',
          acceptedAnswer: {
            text: '네, Nuxt AEO는 설치 후 바로 사용할 수 있습니다. 모듈을 설치하고 nuxt.config.ts에 추가한 후, useSchema() 또는 useSchemaPage() composable을 사용하여 스키마를 정의하면 됩니다. 추가 설정 없이도 기본 동작을 제공합니다.',
          },
        },
        {
          name: 'useSchemaPage()와 useSchema()의 차이는?',
          acceptedAnswer: {
            text: 'useSchema()는 페이지의 주요 콘텐츠를 설명하는 스키마(예: Article, Person)를 정의할 때 사용하고, useSchemaPage()는 페이지 자체에 대한 메타데이터(예: FAQPage, BreadcrumbList)를 정의할 때 사용합니다. 두 composable을 함께 사용하여 페이지의 콘텐츠와 메타데이터를 모두 구조화할 수 있습니다.',
          },
        },
      ],
    })
    </script>

    <template>
      <div>
        <h1>Nuxt AEO</h1>
        <!-- 페이지 콘텐츠 -->
      </div>
    </template>
    ```
    ::::

    ::::tabs-item{icon="i-lucide-eye" label="Preview"}
      :::::browser-frame
        ::::::example-article-schema
        ---
        author: Nuxt AEO
        headline: FAQPage Schema Example
        datePublished: 2024-01-01
        ---
        #title
        FAQPage Schema Example.

        #description
        Learn how to use useSchemaPage() composable to add FAQPage schema for better AI and search engine understanding.
        ::::::
      :::::
    ::::
  :::

#title{unwrap="p" class="!my-0 !leading-tight"}
Add FAQPage schema with [useSchemaPage()]{.text-(--ui-secondary)} composable

#features
  :::u-page-feature
  ---
  icon: i-lucide-message-circle-question
  ---
  #title{unwrap="p"}
  Structure FAQs for AI models
  :::

  :::u-page-feature
  ---
  icon: i-lucide-search
  ---
  #title{unwrap="p"}
  Improve search engine understanding
  :::

  :::u-page-feature
  ---
  icon: i-lucide-file-code
  ---
  #title{unwrap="p"}
  Easy FAQPage schema definition
  :::

#links
  :::u-button
  ---
  color: neutral
  label: Learn more about useSchemaPage()
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
