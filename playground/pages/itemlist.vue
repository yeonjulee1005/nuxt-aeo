<template>
  <div class="catalog-page">
    <div class="container">
      <h1>{{ catalog.name }}</h1>
      <p class="description">
        {{ catalog.description }}
      </p>

      <ol class="product-list">
        <li
          v-for="(product, index) in catalog.items"
          :key="index"
          class="product-item"
        >
          <div class="product-rank">
            {{ product.position }}
          </div>
          <div class="product-info">
            <h2>
              <a :href="product.url">{{ product.name }}</a>
            </h2>
            <p v-if="product.description">
              {{ product.description }}
            </p>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
// Catalog data
// Note: Mix of absolute and relative URLs to demonstrate URL normalization
const catalog = {
  name: 'Top 10 Best Selling Products',
  description: 'Our most popular products this month based on sales data.',
  items: [
    {
      position: 1,
      name: 'Premium Wireless Headphones',
      url: '/products/headphones', // Relative URL - will be normalized to absolute
      description: 'High-quality wireless headphones with noise cancellation.',
    },
    {
      position: 2,
      name: 'Smart Watch Pro',
      url: 'https://example.com/products/smartwatch', // Absolute URL - used as-is
      description: 'Advanced smartwatch with health tracking features.',
    },
    {
      position: 3,
      name: 'Portable Laptop Stand',
      url: '/products/laptop-stand', // Relative URL - will be normalized to absolute
      description: 'Ergonomic laptop stand for better posture.',
    },
    {
      position: 4,
      name: 'Mechanical Keyboard',
      url: '/products/keyboard', // Relative URL - will be normalized to absolute
      description: 'RGB mechanical keyboard with customizable keys.',
    },
    {
      position: 5,
      name: 'USB-C Hub',
      url: 'https://example.com/products/usb-hub', // Absolute URL - used as-is
      description: 'Multi-port USB-C hub for laptops and tablets.',
    },
  ],
}

// Add ItemList Schema
// Note: useSchema() automatically normalizes URLs:
// - Absolute URLs (http:// or https://) are used as-is
// - Relative URLs are combined with the base URL (from useRequestURL() or app.baseURL)
// - URL normalization applies recursively to nested objects and arrays (e.g., itemListElement[].item)
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

// Add FAQPage Schema for ItemList Schema-related questions
// Note: useSchemaFaq() also automatically normalizes URLs like useSchema()
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

<style scoped>
.catalog-page {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.container {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1a202c;
}

.description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #718096;
  line-height: 1.6;
}

.product-list {
  list-style: none;
  padding: 0;
  counter-reset: rank;
}

.product-item {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
  counter-increment: rank;
}

.product-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.product-rank {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: bold;
  flex-shrink: 0;
}

.product-info {
  flex: 1;
}

.product-info h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.product-info h2 a {
  color: #2d3748;
  text-decoration: none;
  transition: color 0.2s;
}

.product-info h2 a:hover {
  color: #667eea;
}

.product-info p {
  color: #718096;
  line-height: 1.6;
  margin: 0;
}
</style>
