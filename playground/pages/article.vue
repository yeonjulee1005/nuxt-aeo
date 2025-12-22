<template>
  <article class="article-page">
    <div class="container">
      <header class="article-header">
        <h1>{{ article.headline }}</h1>
        <div class="article-meta">
          <div class="author-info">
            <img
              v-if="article.author.image"
              :src="article.author.image"
              :alt="article.author.name"
              class="author-image"
            >
            <div>
              <p class="author-name">
                {{ article.author.name }}
              </p>
              <p
                v-if="article.author.jobTitle"
                class="author-title"
              >
                {{ article.author.jobTitle }}
              </p>
            </div>
          </div>
          <div class="article-dates">
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
        <img
          v-if="article.image"
          :src="article.image"
          :alt="article.headline"
          class="article-image"
        >
      </header>

      <div class="article-content">
        <p class="lead">
          {{ article.description }}
        </p>

        <div>
          {{ article.articleBody }}
        </div>
      </div>

      <footer class="article-footer">
        <div
          v-if="article.keywords && article.keywords.length > 0"
          class="tags"
        >
          <span
            v-for="(keyword, index) in article.keywords"
            :key="index"
            class="tag"
          >
            {{ keyword }}
          </span>
        </div>
      </footer>
    </div>
  </article>
</template>

<script setup lang="ts">
// Article data
// Note: Mix of absolute and relative URLs to demonstrate URL normalization
const article = {
  headline: 'Getting Started with Nuxt AEO Module',
  description: 'Learn how to implement AI Engine Optimization in your Nuxt application using Schema.org JSON-LD structured data.',
  image: '/images/nuxt-aeo.jpg', // Relative URL - will be normalized to absolute
  datePublished: '2024-01-15',
  dateModified: '2024-01-20',
  author: {
    name: 'Yeonju Lee',
    jobTitle: 'Software Engineer / CDO',
    image: '/authors/yeonju.jpg', // Relative URL - will be normalized to absolute
    url: 'https://example.com/authors/yeonju', // Absolute URL - used as-is
  },
  publisher: {
    name: 'Nuxt AEO Project',
    logo: {
      url: '/logo.png', // Relative URL - will be normalized to absolute
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

// Format date helper
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Add Article Schema
// Note: useSchema() automatically normalizes URLs:
// - Absolute URLs (http:// or https://) are used as-is
// - Relative URLs are combined with the base URL (from useRequestURL() or app.baseURL)
// - URL normalization applies recursively to nested objects (e.g., author.url, publisher.logo.url)
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

// Add FAQPage Schema for Article Schema-related questions
// Note: useSchemaFaq() also automatically normalizes URLs like useSchema()
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

<style scoped>
.article-page {
  min-height: 100vh;
  padding: 2rem;
  background: #f7fafc;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.article-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #1a202c;
  line-height: 1.2;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.author-title {
  font-size: 0.9rem;
  color: #718096;
  margin: 0.25rem 0 0 0;
}

.article-dates {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #718096;
}

.article-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 1rem;
}

.article-content {
  line-height: 1.8;
  color: #2d3748;
}

.article-content :deep(h2) {
  font-size: 1.8rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #1a202c;
}

.article-content :deep(p) {
  margin-bottom: 1.5rem;
}

.article-content :deep(pre) {
  background: #f7fafc;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.article-content :deep(code) {
  background: #edf2f7;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
}

.lead {
  font-size: 1.25rem;
  color: #4a5568;
  font-weight: 400;
  margin-bottom: 2rem;
}

.article-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #edf2f7;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #2d3748;
}
</style>
