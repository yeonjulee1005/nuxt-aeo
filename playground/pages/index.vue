<template>
  <div class="container">
    <!-- Organization 정보 (전역 스키마에서 주입됨) -->
    <div class="organization-card">
      <h2 class="card-title">
        프로젝트 정보 (전역 스키마)
      </h2>
      <div class="organization-info">
        <h3>{{ organizationData.name }}</h3>
        <p v-if="organizationData.description">
          {{ organizationData.description }}
        </p>
        <a
          v-if="organizationData.url"
          :href="organizationData.url"
          target="_blank"
          rel="noopener noreferrer"
          class="org-link"
        >
          {{ organizationData.url }}
        </a>
      </div>
      <p class="schema-note">
        ℹ️ 이 정보는 nuxt.config.ts의 <code>aeo.schemas</code> 배열에서 자동으로 주입됩니다.
      </p>
    </div>

    <!-- Person 정보 (전역 스키마에서 주입됨) -->
    <div class="profile-card">
      <h2 class="card-title">
        작성자 정보 (전역 스키마)
      </h2>
      <div class="profile-header">
        <div class="profile-info">
          <h3 class="profile-name">
            {{ personData.name }}
          </h3>
          <p
            v-if="personData.alternateName"
            class="profile-alternate-name"
          >
            {{ personData.alternateName }}
          </p>
          <p
            v-if="personData.jobTitle"
            class="profile-job-title"
          >
            {{ personData.jobTitle }}
          </p>
        </div>
      </div>

      <div
        v-if="personData.knowsAbout && personData.knowsAbout.length > 0"
        class="profile-section"
      >
        <h4>기술 스택</h4>
        <div class="tags">
          <span
            v-for="skill in personData.knowsAbout"
            :key="skill"
            class="tag"
          >
            {{ skill }}
          </span>
        </div>
      </div>

      <p class="schema-note">
        ℹ️ 이 정보는 nuxt.config.ts의 <code>aeo.schemas</code> 배열에서 자동으로 주입됩니다.
      </p>
    </div>

    <!-- ItemList 예제 (페이지별 스키마) -->
    <div class="list-card">
      <h2 class="card-title">
        인기 기술 스택 (페이지별 스키마)
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

      <div class="info-box">
        <h3>전역 스키마 (nuxt.config.ts에서 설정)</h3>
        <p>
          <strong>Organization & Person Schema:</strong> nuxt.config.ts의 <code>aeo.schemas</code> 배열에 설정된 스키마가
          모든 페이지에 자동으로 주입됩니다.
        </p>
        <h3>페이지별 스키마</h3>
        <p>
          <strong>ItemList Schema:</strong> 이 페이지에서는 <code>useSchemaItemList()</code> composable을 사용하여
          ItemList Schema를 페이지 head에 추가했습니다.
        </p>
        <p style="margin-top: 1rem;">
          <strong>💡 개발자 도구 확인:</strong> 개발자 도구(F12)를 열어 Elements 탭에서
          <code>&lt;script type="application/ld+json"&gt;</code> 태그를 확인하세요.
          전역 스키마(Organization, Person)와 페이지별 스키마(ItemList)가 모두 포함되어 있습니다.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Organization 데이터 (전역 스키마에서 주입됨 - nuxt.config.ts 참조)
const organizationData = {
  name: 'Nuxt AEO Project',
  url: 'https://www.example.com',
  description: 'AI Engine Optimization module for Nuxt',
}

// Person 데이터 (전역 스키마에서 주입됨 - nuxt.config.ts 참조)
const personData = {
  name: 'Yeonju Lee',
  alternateName: 'Dewdew',
  jobTitle: 'Software Engineer / CDO',
  knowsAbout: ['Nuxt3', 'TypeScript', 'Supabase'],
}

// ItemList Schema 데이터 (페이지별로 추가)
const itemListData = {
  name: 'Top 5 Popular Technologies',
  description: 'Most popular technologies in 2024',
  itemListElement: [
    {
      position: 1,
      name: 'Nuxt 3',
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

// ItemList Schema를 페이지 head에 추가 (페이지별 스키마)
// useSchema를 직접 사용하여 ItemList Schema 추가
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

.organization-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  color: white;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: white;
}

.organization-info h3 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: white;
}

.organization-info p {
  font-size: 1rem;
  margin: 0 0 1rem 0;
  opacity: 0.9;
  line-height: 1.6;
}

.org-link {
  color: white;
  text-decoration: underline;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.org-link:hover {
  opacity: 0.8;
}

.schema-note {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 0.875rem;
  opacity: 0.8;
}

.schema-note code {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.profile-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.profile-header {
  margin-bottom: 1.5rem;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: #111827;
}

.profile-alternate-name {
  font-size: 1.25rem;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
}

.profile-job-title {
  font-size: 1rem;
  color: #4b5563;
  margin: 0;
}

.profile-section {
  margin-bottom: 2rem;
}

.profile-section h4 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: #111827;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #f3f4f6;
  color: #374151;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
}

.links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.links li {
  margin-bottom: 0.5rem;
}

.links a {
  color: #2563eb;
  text-decoration: none;
  transition: color 0.2s;
}

.links a:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.info-box {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
}

.info-box h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #1e40af;
}

.info-box h3:not(:first-child) {
  margin-top: 1rem;
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
