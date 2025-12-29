<script setup lang="ts">
const navLinks = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Person',
    to: '/person',
  },
  {
    label: 'Organization',
    to: '/organization',
  },
  {
    label: 'ItemList',
    to: '/itemlist',
  },
  {
    label: 'Article',
    to: '/article',
  },
]
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink
          to="/"
          class="font-bold text-2xl"
        >
          Nuxt AEO
        </NuxtLink>
      </template>
      <template #right>
        <UNavigationMenu
          :items="navLinks"
          variant="pill"
          color="neutral"
        />
      </template>
    </UHeader>

    <UMain>
      <UContainer>
        <NuxtPage />
      </UContainer>
    </UMain>

    <UFooter>
      <UContainer>
        <p class="text-center text-sm text-gray-500 dark:text-gray-400">
          Nuxt AEO Module Playground - Schema.org JSON-LD examples
        </p>
      </UContainer>
    </UFooter>
  </UApp>
</template>
