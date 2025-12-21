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
const catalog = {
  name: 'Top 10 Best Selling Products',
  description: 'Our most popular products this month based on sales data.',
  items: [
    {
      position: 1,
      name: 'Premium Wireless Headphones',
      url: 'https://example.com/products/headphones',
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
      url: 'https://example.com/products/laptop-stand',
      description: 'Ergonomic laptop stand for better posture.',
    },
    {
      position: 4,
      name: 'Mechanical Keyboard',
      url: 'https://example.com/products/keyboard',
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

// Add ItemList Schema
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
useSchemaPage({
  mainEntity: [
    {
      name: 'ItemList Schema는 언제 사용하나요?',
      acceptedAnswer: {
        text: 'ItemList Schema는 순위가 있는 목록, 상품 목록, 레시피 재료 목록, 체크리스트 등 순서가 있는 항목 목록을 표현할 때 사용됩니다. 예를 들어 "인기 상품 Top 10", "기술 스택 목록", "할 일 목록" 등을 구조화된 데이터로 제공하여 AI 모델과 검색 엔진이 목록의 순서와 각 항목의 정보를 이해할 수 있도록 합니다.',
      },
    },
    {
      name: 'position 속성은 필수인가요?',
      acceptedAnswer: {
        text: '네, ItemList의 각 항목(ListItem)에서 position 속성은 필수입니다. position은 항목의 순서를 나타내는 숫자로, 1부터 시작합니다. 이를 통해 AI 모델과 검색 엔진이 목록의 순서를 정확히 이해할 수 있습니다.',
      },
    },
    {
      name: '어떤 용도로 사용할 수 있나요?',
      acceptedAnswer: {
        text: 'ItemList Schema는 다양한 용도로 사용할 수 있습니다: 인기 상품 목록, 베스트셀러 목록, 기술 스택 목록, 레시피 재료 목록, 체크리스트, 랭킹 페이지 등 순서가 있는 모든 목록에 적용할 수 있습니다. 각 항목은 URL, 이름, 설명 등의 추가 정보를 포함할 수 있습니다.',
      },
    },
    {
      name: 'ItemList의 각 항목에 추가 정보를 포함할 수 있나요?',
      acceptedAnswer: {
        text: '네, 각 ListItem 항목에는 position 외에도 name(이름), item(URL 또는 객체), description(설명) 등의 속성을 추가할 수 있습니다. item 속성에는 단순 URL 문자열뿐만 아니라 다른 Schema 객체(예: Product, Article 등)를 포함할 수도 있어 더 풍부한 정보를 제공할 수 있습니다.',
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
