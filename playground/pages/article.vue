<script setup lang="ts">
const article = {
  headline: 'Getting Started with Nuxt AEO Module',
  description: 'Learn how to implement AI Engine Optimization in your Nuxt application using Schema.org JSON-LD structured data.',
  image: '/images/nuxt-aeo.jpg',
  datePublished: '2024-01-15',
  dateModified: '2024-01-20',
  author: {
    name: 'Yeonju Lee',
    jobTitle: 'Software Engineer / CDO',
    image: '/authors/yeonju.jpg',
    url: 'https://example.com/authors/yeonju',
  },
  publisher: {
    name: 'Nuxt AEO Project',
    logo: {
      url: '/logo.png',
    },
  },
  keywords: ['Nuxt', 'AEO', 'Schema.org', 'SEO', 'AI'],
  articleBody: `
    <h2>Introduction</h2>
    <p>Nuxt AEO is a powerful module that helps you implement AI Engine Optimization (AEO) in your Nuxt applications. By using Schema.org JSON-LD structured data, you can make your content more understandable to AI models and search engines.</p>
    
    <h2>Installation</h2>
    <p>To get started, install the module using your preferred package manager:</p>
    <pre><code>npm install nuxt-aeo</code></pre>
    
    <h2>Configuration</h2>
    <p>Add the module to your <code>nuxt.config.ts</code>:</p>
    <pre><code>export default defineNuxtConfig({
  modules: ['nuxt-aeo']
})</code></pre>
    
    <h2>Conclusion</h2>
    <p>With Nuxt AEO, you can easily add structured data to your pages and improve how AI models understand your content.</p>
  `,
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

useSchema({
  context: 'https://schema.org',
  type: 'Article',
  headline: article.headline,
  description: article.description,
  image: article.image,
  datePublished: article.datePublished,
  dateModified: article.dateModified,
  author: {
    type: 'Person',
    name: article.author.name,
    jobTitle: article.author.jobTitle,
    image: article.author.image,
    url: article.author.url,
  },
  publisher: {
    type: 'Organization',
    name: article.publisher.name,
    logo: {
      type: 'ImageObject',
      url: article.publisher.logo.url,
    },
  },
  keywords: article.keywords.join(', '),
  articleBody: article.articleBody,
  renderHtml: true,
  visuallyHidden: true,
})

useSchemaFaq({
  mainEntity: [
    {
      name: 'When should I use Article Schema?',
      acceptedAnswer: {
        text: 'Article Schema is used for text-based content such as blog posts, news articles, magazine articles, technical documentation, etc. It provides structured data about title, description, author, publication date, modification date, publisher, keywords, body, etc., to help search engines and AI models better understand the article\'s metadata and content.',
      },
    },
    {
      name: 'What format should datePublished be in?',
      acceptedAnswer: {
        text: 'datePublished and dateModified use date strings in ISO 8601 format. Example: "2024-01-15" (date only) or "2024-01-15T10:30:00Z" (date and time included). The YYYY-MM-DD format is most commonly used, and you can use the full ISO 8601 format when time information is needed.',
      },
    },
    {
      name: 'What is the difference between author and publisher?',
      acceptedAnswer: {
        text: 'author represents the individual or multiple authors who wrote the article and is set as type Person. publisher represents the organization or company that published the article and is set as type Organization. For example, if an individual writes a blog post, author would be that individual, and publisher could be the organization that operates the blog.',
      },
    },
    {
      name: 'Can I use subtypes of Article Schema?',
      acceptedAnswer: {
        text: 'Yes, you can use subtypes of Article Schema such as TechArticle, NewsArticle, BlogPosting, ScholarlyArticle, etc. Each subtype provides properties that are more suitable for specific types of articles. For example, it is recommended to use TechArticle for technical documentation and NewsArticle for news articles.',
      },
    },
  ],
})
</script>

<template>
  <article class="space-y-6">
    <UCard>
      <header class="space-y-4">
        <h1 class="text-3xl font-bold">
          {{ article.headline }}
        </h1>

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="flex items-center gap-3">
            <UAvatar
              :src="article.author.image"
              :alt="article.author.name"
              size="sm"
            />
            <div>
              <p class="font-semibold">
                {{ article.author.name }}
              </p>
              <p
                v-if="article.author.jobTitle"
                class="text-sm text-gray-600 dark:text-gray-400"
              >
                {{ article.author.jobTitle }}
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-400">
            <time :datetime="article.datePublished">
              Published: {{ formatDate(article.datePublished) }}
            </time>
            <time
              v-if="article.dateModified"
              :datetime="article.dateModified"
            >
              Updated: {{ formatDate(article.dateModified) }}
            </time>
          </div>
        </div>

        <UImage
          v-if="article.image"
          :src="article.image"
          :alt="article.headline"
          class="w-full rounded-lg"
        />
      </header>

      <div class="prose dark:prose-invert max-w-none mt-6">
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">
          {{ article.description }}
        </p>
        <div v-dompurify-html="article.articleBody" />
      </div>

      <footer
        v-if="article.keywords && article.keywords.length > 0"
        class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800"
      >
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="(keyword, index) in article.keywords"
            :key="index"
            :label="keyword"
            color="neutral"
            variant="soft"
          />
        </div>
      </footer>
    </UCard>
  </article>
</template>
