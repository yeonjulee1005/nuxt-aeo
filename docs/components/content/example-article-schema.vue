<script setup lang="ts">
interface Props {
  headline?: string
  author?: string
  datePublished?: string
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  headline: 'Article Title',
  author: undefined,
  datePublished: undefined,
  title: undefined,
  description: undefined,
})
</script>

<template>
  <div class="example-article-schema">
    <div class="article-card">
      <div class="article-header">
        <h3
          v-if="title || $slots.title"
          class="article-title"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </h3>
        <p
          v-if="description || $slots.description"
          class="article-description"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </p>
      </div>

      <div class="article-content">
        <div class="article-info">
          <div
            v-if="headline"
            class="article-headline"
          >
            <strong>Headline:</strong> {{ headline }}
          </div>
          <div
            v-if="author"
            class="article-author"
          >
            <strong>Author:</strong> {{ author }}
          </div>
          <div
            v-if="datePublished"
            class="article-date"
          >
            <strong>Date Published:</strong> {{ datePublished }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.example-article-schema {
  padding: 1rem;
}

.article-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.article-header {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.article-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #1a202c;
}

.article-description {
  font-size: 0.875rem;
  color: #718096;
  margin: 0;
  line-height: 1.5;
}

.article-content {
  margin-top: 1rem;
}

.article-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.article-headline,
.article-author,
.article-date {
  font-size: 0.9375rem;
  color: #2d3748;
  line-height: 1.5;
}

.article-headline strong,
.article-author strong,
.article-date strong {
  color: #1a202c;
  font-weight: 600;
  margin-right: 0.5rem;
}
</style>
