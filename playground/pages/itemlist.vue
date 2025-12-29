<script setup lang="ts">
const catalog = {
  name: 'Top 10 Best Selling Products',
  description: 'Our most popular products this month based on sales data.',
  items: [
    {
      position: 1,
      name: 'Premium Wireless Headphones',
      url: '/products/headphones',
      description: 'High-quality wireless headphones with noise cancellation.',
    },
    {
      position: 2,
      name: 'Smart Watch Pro',
      url: 'https://example.com/products/smartwatch',
      description: 'Advanced smartwatch with health tracking features.',
    },
    {
      position: 3,
      name: 'Portable Laptop Stand',
      url: '/products/laptop-stand',
      description: 'Ergonomic laptop stand for better posture.',
    },
    {
      position: 4,
      name: 'Mechanical Keyboard',
      url: '/products/keyboard',
      description: 'RGB mechanical keyboard with customizable keys.',
    },
    {
      position: 5,
      name: 'USB-C Hub',
      url: 'https://example.com/products/usb-hub',
      description: 'Multi-port USB-C hub for laptops and tablets.',
    },
  ],
}

useSchema({
  context: 'https://schema.org',
  type: 'ItemList',
  name: catalog.name,
  description: catalog.description,
  itemListElement: catalog.items.map(item => ({
    type: 'ListItem',
    position: item.position,
    name: item.name,
    item: item.url,
  })),
  renderHtml: true,
  visuallyHidden: true,
})

useSchemaFaq({
  mainEntity: [
    {
      name: 'When should I use ItemList Schema?',
      acceptedAnswer: {
        text: 'ItemList Schema is used to represent ordered item lists such as ranked lists, product lists, recipe ingredient lists, checklists, etc. For example, it provides structured data for "Top 10 Popular Products", "Technology Stack Lists", "To-do Lists", etc., to help AI models and search engines understand the order of the list and information about each item.',
      },
    },
    {
      name: 'Is the position property required?',
      acceptedAnswer: {
        text: 'Yes, the position property is required for each item (ListItem) in ItemList. position is a number representing the order of the item, starting from 1. This allows AI models and search engines to accurately understand the order of the list.',
      },
    },
    {
      name: 'What can it be used for?',
      acceptedAnswer: {
        text: 'ItemList Schema can be used for various purposes: popular product lists, bestseller lists, technology stack lists, recipe ingredient lists, checklists, ranking pages, etc. It can be applied to any ordered list. Each item can include additional information such as URL, name, description, etc.',
      },
    },
    {
      name: 'Can I include additional information for each item in ItemList?',
      acceptedAnswer: {
        text: 'Yes, each ListItem can include properties such as name (name), item (URL or object), description (description), etc., in addition to position. The item property can include not only simple URL strings but also other Schema objects (e.g., Product, Article, etc.), allowing you to provide richer information.',
      },
    },
  ],
})
</script>

<template>
  <div class="space-y-6">
    <UCard>
      <h1 class="text-3xl font-bold mb-4">
        {{ catalog.name }}
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
        {{ catalog.description }}
      </p>

      <ul class="space-y-4">
        <li
          v-for="(item, index) in catalog.items"
          :key="index"
          class="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-800 last:border-0 last:pb-0"
        >
          <UBadge
            :label="item.position"
            color="primary"
            size="lg"
            class="w-12 h-12 rounded-full flex items-center justify-center font-bold shrink-0"
          />
          <div class="flex-1">
            <h2 class="text-xl font-semibold mb-1">
              <ULink
                :to="item.url"
                class="hover:text-primary transition-colors"
              >
                {{ item.name }}
              </ULink>
            </h2>
            <p
              v-if="item.description"
              class="text-gray-600 dark:text-gray-400"
            >
              {{ item.description }}
            </p>
          </div>
        </li>
      </ul>
    </UCard>
  </div>
</template>
