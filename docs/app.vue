<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const { data: navigation } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('docs')
})

const { data: files } = await useAsyncData('search', () => {
  return queryCollectionSearchSections('docs')
})

provide('navigation', navigation)
provide('searchFiles', files)

const navItems = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Guide',
    icon: 'i-lucide-book-open',
    to: '/guide/getting-started',
    active: route.path.startsWith('/guide'),
  },
  {
    label: 'API',
    icon: 'i-lucide-code',
    to: '/api/composables',
    active: route.path.startsWith('/api'),
  },
  {
    label: 'Examples',
    icon: 'i-lucide-file-code',
    to: '/examples/organization',
    active: route.path.startsWith('/examples'),
  },
  {
    label: 'Playground',
    icon: 'i-lucide-play',
    to: 'https://nuxt-aeo-playground.vercel.app',
    target: '_blank',
  },
])
</script>

<template>
  <UApp>
    <!-- Header Navigation -->
    <UHeader>
      <template #title>
        <NuxtLink
          to="/"
          class="flex items-center gap-2"
          prefetch
        >
          <div class="font-bold text-2xl flex items-center gap-2">
            <NuxtImg
              src="https://raw.githubusercontent.com/yeonjulee1005/nuxt-aeo/main/.github/assets/icon.svg"
              alt="Nuxt AEO"
              width="36"
              height="36"
            />
            <span class="text-highlighted">Nuxt</span>
            <span class="text-green-400">AEO</span>
          </div>
        </NuxtLink>
      </template>

      <UNavigationMenu :items="navItems" />

      <template #right>
        <UColorModeButton />
        <UButton
          to="https://github.com/yeonjulee1005/nuxt-aeo"
          target="_blank"
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          aria-label="GitHub"
        />
      </template>
    </UHeader>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Search Modal -->
    <ClientOnly>
      <UContentSearch
        :files="files"
        :navigation="navigation"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>

    <!-- Footer -->
    <UFooter>
      <template #left>
        <p class="text-gray-500 dark:text-gray-400">
          © 2025 Nuxt AEO. MIT License.
        </p>
      </template>
      <template #right>
        <UButton
          to="https://github.com/yeonjulee1005/nuxt-aeo"
          target="_blank"
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          size="sm"
          aria-label="GitHub"
        />
      </template>
    </UFooter>
  </UApp>
</template>
