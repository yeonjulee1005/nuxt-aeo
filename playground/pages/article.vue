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
const article = {
  headline: 'Getting Started with Nuxt AEO Module',
  description: 'Learn how to implement AI Engine Optimization in your Nuxt application using Schema.org JSON-LD structured data.',
  image: 'https://example.com/images/nuxt-aeo.jpg',
  datePublished: '2024-01-15',
  dateModified: '2024-01-20',
  author: {
    name: 'Yeonju Lee',
    jobTitle: 'Software Engineer / CDO',
    image: 'https://example.com/authors/yeonju.jpg',
    url: 'https://example.com/authors/yeonju',
  },
  publisher: {
    name: 'Nuxt AEO Project',
    logo: {
      url: 'https://example.com/logo.png',
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
useSchemaPage({
  mainEntity: [
    {
      name: 'Article Schema는 언제 사용하나요?',
      acceptedAnswer: {
        text: 'Article Schema는 블로그 포스트, 뉴스 기사, 매거진 기사, 기술 문서 등 텍스트 기반 콘텐츠에 사용됩니다. 제목, 설명, 작성자, 발행일, 수정일, 발행자, 키워드, 본문 등의 정보를 구조화된 데이터로 제공하여 검색 엔진과 AI 모델이 기사의 메타데이터와 내용을 더 잘 이해할 수 있도록 합니다.',
      },
    },
    {
      name: 'datePublished 형식은 어떻게 되나요?',
      acceptedAnswer: {
        text: 'datePublished와 dateModified는 ISO 8601 형식의 날짜 문자열을 사용합니다. 예: "2024-01-15" (날짜만) 또는 "2024-01-15T10:30:00Z" (날짜와 시간 포함). YYYY-MM-DD 형식이 가장 일반적으로 사용되며, 시간 정보가 필요한 경우에는 전체 ISO 8601 형식을 사용할 수 있습니다.',
      },
    },
    {
      name: 'author와 publisher의 차이는?',
      acceptedAnswer: {
        text: 'author는 기사를 작성한 개인 또는 여러 작성자를 나타내며, Person 타입으로 설정합니다. publisher는 기사를 발행한 조직이나 회사를 나타내며, Organization 타입으로 설정합니다. 예를 들어, 개인이 블로그에 글을 작성했다면 author는 해당 개인이고, publisher는 블로그를 운영하는 조직이 될 수 있습니다.',
      },
    },
    {
      name: 'Article Schema의 하위 타입을 사용할 수 있나요?',
      acceptedAnswer: {
        text: '네, Article Schema의 하위 타입으로 TechArticle, NewsArticle, BlogPosting, ScholarlyArticle 등을 사용할 수 있습니다. 각 하위 타입은 특정 종류의 기사에 더 적합한 속성을 제공합니다. 예를 들어, 기술 문서에는 TechArticle을, 뉴스 기사에는 NewsArticle을 사용하는 것이 좋습니다.',
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
