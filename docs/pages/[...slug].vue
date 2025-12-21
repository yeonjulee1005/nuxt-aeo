<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

definePageMeta({
  layout: 'docs',
  // Exclude Nuxt internal paths
  alias: [],
})

const route = useRoute()

const navigation = inject<Ref<ContentNavigationItem[] | null> | ContentNavigationItem[] | null>('navigation')

const mappedNavigation = computed(() => {
  if (!navigation) return []
  const navValue = unref(navigation as Ref<ContentNavigationItem[] | null> | ContentNavigationItem[] | null)
  if (!navValue || !Array.isArray(navValue)) return []
  return mapContentNavigation(navValue)
})

function mapContentNavigation(navigation: ContentNavigationItem[] | null | undefined): ContentNavigationItem[] {
  if (!navigation) return []
  return navigation.map((item) => {
    return {
      ...item,
      children: item.children ? mapContentNavigation(item.children) : undefined,
    }
  })
}

const { data: page } = await useAsyncData(`docs-${route.path}`, async () => {
  // Skip if it's a Nuxt internal path (not content pages)
  // Note: /api/ is a valid content path (e.g., /api/composables), so we don't skip it
  if (
    route.path.startsWith('/_nuxt/')
    || route.path.startsWith('/__nuxt')
    || route.path.startsWith('/_content')
  ) {
    return null
  }

  // Normalize path: remove trailing slash
  const path = route.path.endsWith('/') ? route.path.slice(0, -1) : route.path

  // Try exact path first
  let result = await queryCollection('docs').path(path).first()

  // If no result and path is like /examples, also try /examples/index
  if (!result && path === '/examples') {
    result = await queryCollection('docs').path('/examples/index').first()
  }

  return result
}, {
  default: () => null,
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

// Ensure page is not null - maintain reactivity
const currentPage = computed(() => page.value!)

const { data: surround } = await useAsyncData(`docs-${route.path}-surround`, () => {
  const path = route.path.endsWith('/') ? route.path.slice(0, -1) : route.path
  return queryCollectionItemSurroundings('docs', path)
    .where('navigation', '<>', false)
}, {
  transform(surround) {
    return surround?.filter(doc => doc && doc.navigation !== false) || []
  },
})

useSeoMeta({
  titleTemplate: '%s - Nuxt AEO',
  title: computed(() => currentPage.value?.title || ''),
  ogTitle: computed(() => currentPage.value?.title ? `${currentPage.value.title} - Nuxt AEO` : 'Nuxt AEO'),
  description: computed(() => currentPage.value?.description || ''),
  ogDescription: computed(() => currentPage.value?.description || ''),
})

const communityLinks = computed(() => [
  {
    icon: 'i-lucide-pen',
    label: '이 페이지 수정',
    to: `https://github.com/yeonjulee1005/nuxt-aeo/edit/main/docs/content${currentPage.value.path}.md`,
    target: '_blank',
  },
  {
    icon: 'i-lucide-star',
    label: 'GitHub에서 스타',
    to: 'https://github.com/yeonjulee1005/nuxt-aeo',
    target: '_blank',
  },
  {
    icon: 'i-lucide-message-circle',
    label: '이슈 리포트',
    to: 'https://github.com/yeonjulee1005/nuxt-aeo/issues',
    target: '_blank',
  },
])
</script>

<template>
  <UPage v-if="currentPage">
    <template #left>
      <UPageAside>
        <template #top>
          <UContentSearchButton
            size="lg"
            :collapsed="false"
          />
        </template>
        <UContentNavigation
          v-if="mappedNavigation.length > 0"
          :navigation="mappedNavigation"
          highlight
        />
      </UPageAside>
    </template>

    <UPageHeader
      :title="currentPage.title"
      :description="currentPage.description"
      :links="currentPage.links || []"
    />

    <UPageBody
      prose
      class="pb-0"
    >
      <ContentRenderer
        v-if="currentPage.body"
        :value="currentPage"
      />
      <USeparator
        v-if="surround && surround.length > 0"
      />
      <UContentSurround :surround="surround" />
    </UPageBody>

    <template
      v-if="currentPage.body?.toc?.links?.length"
      #right
    >
      <UContentToc :links="currentPage.body.toc.links">
        <template #bottom>
          <USeparator
            v-if="currentPage.body?.toc?.links?.length"
            type="dashed"
          />
          <UPageLinks
            title="커뮤니티"
            :links="communityLinks"
          />
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>
