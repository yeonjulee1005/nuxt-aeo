<template>
  <div class="container">
    <!-- Information -->
    <div class="info-box">
      <h2>Semantic HTML Auto-injection Verification</h2>
      <p>
        <strong>✅ Global Schema Auto-injection:</strong> Schemas configured in the <code>aeo.schemas</code> array in nuxt.config.ts
        are automatically injected into all pages. Semantic HTML is also automatically generated with the <code>renderHtml: true</code> option.
      </p>
      <p>
        <strong>✅ Visual Hiding:</strong> Generated semantic HTML is hidden with the <code>visually-hidden</code> class,
        so it's not visible to users, but LLM crawlers (ChatGPT, Perplexity, etc.) and search engines can read it.
      </p>
      <h3>Verification Methods</h3>
      <ol class="check-list">
        <li>
          <strong>Open Developer Tools (F12)</strong>
        </li>
        <li>
          <strong>Check in Elements Tab:</strong>
          <ul>
            <li><code>&lt;script type="application/ld+json"&gt;</code> tag: Check JSON-LD schema</li>
            <li><code>&lt;div class="nuxt-aeo-semantic-organization"&gt;</code>: Check Organization semantic HTML</li>
            <li><code>&lt;div class="nuxt-aeo-semantic-person"&gt;</code>: Check Person semantic HTML</li>
          </ul>
        </li>
        <li>
          <strong>Check semantic HTML:</strong> Semantic HTML with the <code>visually-hidden</code> class applied
          is automatically injected inside the body tag.
        </li>
      </ol>
      <h3>Page-specific Schema</h3>
      <p>
        <strong>ItemList Schema:</strong> On this page, we use the <code>useSchema()</code> composable to
        add ItemList Schema to the page head.
      </p>
      <h3>Quick Verification Method</h3>
      <p>
        Run the following commands in Developer Tools console:
      </p>
      <pre class="code-block"><code>// Check semantic HTML
document.querySelectorAll('[class*="nuxt-aeo-semantic"]').forEach(el => {
  console.log('✅ Found:', el.className, el.innerHTML.substring(0, 100) + '...')
})

// Check JSON-LD schema
document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
  console.log('✅ JSON-LD:', JSON.parse(script.innerHTML))
})</code></pre>
    </div>

    <!-- ItemList Example (Page-specific Schema) -->
    <div class="list-card">
      <h2 class="card-title">
        Popular Tech Stack (Page-specific Schema)
      </h2>
      <div class="list-section">
        <ol class="item-list">
          <li
            v-for="(item, index) in itemListData.itemListElement"
            :key="index"
            class="list-item"
          >
            <span class="item-position">{{ item.position }}</span>
            <div class="item-content">
              <strong class="item-name">{{ item.name }}</strong>
              <a
                v-if="typeof item.item === 'string'"
                :href="item.item"
                target="_blank"
                rel="noopener noreferrer"
                class="item-link"
              >
                {{ item.item }}
              </a>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ItemList Schema data (added per page)
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
      item: 'https://www.typescriptlang.org',
    },
    {
      position: 3,
      name: 'Vue 3',
      item: 'https://vuejs.org',
    },
    {
      position: 4,
      name: 'Vite',
      item: 'https://vitejs.dev',
    },
    {
      position: 5,
      name: 'Tailwind CSS',
      item: 'https://tailwindcss.com',
    },
  ],
}

// Add ItemList Schema to page head (page-specific schema)
// Use useSchema directly to add ItemList Schema
// Also automatically generate semantic HTML with renderHtml: true
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
  renderHtml: true, // Automatic semantic HTML generation
  visuallyHidden: true, // Visually hide
})
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #111827;
}

.info-box {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.info-box h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #1e40af;
}

.info-box h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 1rem 0 0.5rem 0;
  color: #1e40af;
}

.info-box h3:first-of-type {
  margin-top: 0.5rem;
}

.info-box p {
  margin: 0 0 0.75rem 0;
  color: #1e40af;
  font-size: 0.875rem;
  line-height: 1.6;
}

.info-box p:last-child {
  margin-bottom: 0;
}

.info-box code {
  background: #dbeafe;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-family: 'Monaco', 'Courier New', monospace;
}

.check-list {
  margin: 0.75rem 0;
  padding-left: 1.5rem;
  color: #1e40af;
}

.check-list li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.check-list ul {
  margin-top: 0.5rem;
  padding-left: 1.5rem;
  list-style-type: disc;
}

.check-list ul li {
  margin-bottom: 0.25rem;
}

.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 0.75rem 0;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}

.code-block code {
  background: transparent;
  padding: 0;
  color: inherit;
  font-size: inherit;
}

.list-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.list-section {
  margin-bottom: 1.5rem;
}

.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: item-counter;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #667eea;
  transition: transform 0.2s, box-shadow 0.2s;
}

.list-item:hover {
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
}

.item-position {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  font-weight: 700;
  font-size: 1.125rem;
  flex-shrink: 0;
}

.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.item-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.item-link {
  font-size: 0.875rem;
  color: #2563eb;
  text-decoration: none;
  transition: color 0.2s;
}

.item-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}
</style>
