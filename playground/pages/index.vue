<script setup lang="ts">
const verificationCode = `// Check semantic HTML
document.querySelectorAll('[class*="nuxt-aeo-semantic"]').forEach(el => {
  console.log('✅ Found:', el.className, el.innerHTML.substring(0, 100) + '...')
})

// Check JSON-LD schema
document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
  console.log('✅ JSON-LD:', JSON.parse(script.innerHTML))
})`

const itemListData = {
  name: 'Top 5 Popular Technologies',
  description: 'Most popular technologies in 2024',
  itemListElement: [
    {
      position: 1,
      name: 'Nuxt 4',
      item: 'https://nuxt.com',
    },
    {
      position: 2,
      name: 'TypeScript',
      item: '/tech/typescript',
    },
    {
      position: 3,
      name: 'Vue 3',
      item: 'https://vuejs.org',
    },
    {
      position: 4,
      name: 'Vite',
      item: '/tech/vite',
    },
    {
      position: 5,
      name: 'Tailwind CSS',
      item: 'https://tailwindcss.com',
    },
  ],
}

useSchema({
  context: 'https://schema.org',
  type: 'ItemList',
  name: itemListData.name,
  description: itemListData.description,
  itemListElement: itemListData.itemListElement.map(item => ({
    type: 'ListItem',
    position: item.position,
    item: item.item,
    ...(item.name && { name: item.name }),
  })),
  renderHtml: true,
  visuallyHidden: true,
})

useSchemaFaq({
  mainEntity: [
    {
      name: 'What are the main features of the Nuxt AEO module?',
      acceptedAnswer: {
        text: 'The Nuxt AEO module automatically generates Schema.org JSON-LD structured data and automatically injects Semantic HTML to help AI models and search engines better understand content. It supports both global schema configuration and page-specific schema configuration, and automatically generates visually hidden Semantic HTML through the renderHtml option.',
      },
    },
    {
      name: 'Is Semantic HTML automatically generated?',
      acceptedAnswer: {
        text: 'Yes, when the renderHtml option is set to true, Semantic HTML based on Schema.org data is automatically generated. The generated HTML is visually hidden through the visuallyHidden option, but LLM crawlers (ChatGPT, Perplexity, etc.) and search engines can read it.',
      },
    },
  ],
})
</script>

<template>
  <div class="space-y-6">
    <UAlert
      class="mt-4"
      color="info"
      variant="soft"
      title="Semantic HTML Auto-injection Verification"
      description="Schemas configured in the aeo.schemas array in nuxt.config.ts are automatically injected into all pages. Semantic HTML is also automatically generated with the renderHtml: true option."
    />

    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">
          Verification Methods
        </h2>
      </template>

      <div class="space-y-4">
        <div>
          <h3 class="font-semibold mb-2">
            1. Open Developer Tools (F12)
          </h3>
        </div>

        <div>
          <h3 class="font-semibold mb-2">
            2. Check in Elements Tab:
          </h3>
          <ul class="list-disc list-inside space-y-1 ml-4">
            <li>
              <code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">script type="application/ld+json"</code> tag: Check JSON-LD schema
            </li>
            <li>
              <code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">div class="nuxt-aeo-semantic-organization"</code>: Check Organization semantic HTML
            </li>
            <li>
              <code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">div class="nuxt-aeo-semantic-person"</code>: Check Person semantic HTML
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold mb-2">
            3. Check semantic HTML:
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Semantic HTML with the <code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">visually-hidden</code> class applied is automatically injected inside the body tag.
          </p>
        </div>

        <div>
          <h3 class="font-semibold mb-2">
            Quick Verification Method
          </h3>
          <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
            Run the following commands in Developer Tools console:
          </p>
          <pre class="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{{ verificationCode }}</code></pre>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">
          Popular Tech Stack (Page-specific Schema)
        </h2>
      </template>

      <ul class="space-y-3">
        <li
          v-for="(item, index) in itemListData.itemListElement"
          :key="index"
          class="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900"
        >
          <UBadge
            :label="item.position"
            color="primary"
            size="lg"
            class="w-10 h-10 rounded-full flex items-center justify-center font-bold"
          />
          <div class="flex-1">
            <p class="font-semibold">
              {{ item.name }}
            </p>
            <ULink
              v-if="typeof item.item === 'string'"
              :to="item.item"
              external
              class="text-sm text-primary"
            >
              {{ item.item }}
            </ULink>
          </div>
        </li>
      </ul>
    </UCard>
  </div>
</template>
