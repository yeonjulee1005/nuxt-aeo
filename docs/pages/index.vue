<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('landing', async () => {
  // Get all docs and find index.md
  let result = await queryCollection('docs').path('/index').first()

  // If first() returns array, find the index.md item by id
  if (Array.isArray(result)) {
    // Always find by id 'docs/index.md' first (most reliable)
    result = result.find(item => item.id === 'docs/index.md') || null
  }

  // If still not found, try root path
  if (!result) {
    const rootResult = await queryCollection('docs').path('/').first()
    if (Array.isArray(rootResult)) {
      // Always find by id 'docs/index.md'
      result = rootResult.find(item => item.id === 'docs/index.md') || null
    }
    else {
      result = rootResult
    }
  }

  return result || null
}, {
  default: () => null,
  watch: [() => route.path], // Reload on route change
})

// Ensure page is always a single object, not an array
const currentPage = computed(() => {
  if (!page.value) {
    return null
  }

  // If it's an array, find index.md
  if (Array.isArray(page.value)) {
    return page.value.find(item => item.id === 'docs/index.md') || null
  }

  // Otherwise return as is
  return page.value
})

if (!currentPage.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

useSeoMeta({
  titleTemplate: '',
  title: currentPage.value?.seo?.title || currentPage.value?.title || 'Nuxt AEO',
  ogTitle: currentPage.value?.seo?.title || currentPage.value?.title || 'Nuxt AEO',
  description: currentPage.value?.seo?.description || currentPage.value?.description || 'A Nuxt module that implements AI Engine Optimization using Schema.org JSON-LD structured data.',
  ogDescription: currentPage.value?.seo?.description || currentPage.value?.description || 'A Nuxt module that implements AI Engine Optimization using Schema.org JSON-LD structured data.',
  ogImage: currentPage.value?.seo?.ogImage || 'https://github.com/yeonjulee1005/nuxt-aeo/raw/main/docs/public/og-image.png',
})
</script>

<template>
  <ContentRenderer
    v-if="currentPage"
    :value="currentPage"
  />
</template>
