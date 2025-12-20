<template>
  <div class="container">
    <div class="profile-card">
      <div class="profile-header">
        <img
          v-if="personData.image"
          :src="personData.image"
          :alt="personData.name"
          class="profile-image"
        >
        <div class="profile-info">
          <h1 class="profile-name">
            {{ personData.name }}
          </h1>
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
        <h2>기술 스택</h2>
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

      <div
        v-if="personData.sameAs && personData.sameAs.length > 0"
        class="profile-section"
      >
        <h2>소셜 링크</h2>
        <ul class="links">
          <li
            v-for="(link, index) in personData.sameAs"
            :key="index"
          >
            <a
              :href="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ link }}
            </a>
          </li>
        </ul>
      </div>

      <div
        v-if="personData.url"
        class="profile-section"
      >
        <h2>웹사이트</h2>
        <a
          :href="personData.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ personData.url }}
        </a>
      </div>

      <div class="info-box">
        <p>
          <strong>💡 개발자 도구 확인:</strong> 이 페이지의 HTML head에 Person Schema JSON-LD가
          자동으로 추가되었습니다. 개발자 도구(F12)를 열어 Elements 탭에서
          <code>&lt;script type="application/ld+json"&gt;</code> 태그를 확인하세요.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Person Schema 데이터
const personData = {
  name: 'Yeonju Lee',
  alternateName: 'Dewdew',
  jobTitle: 'Software Engineer / CDO',
  url: 'https://www.example.com',
  image: 'https://www.example.com/profile.jpg',
  knowsAbout: ['Nuxt3', 'TypeScript', 'Supabase'],
  sameAs: ['https://github.com/dewdew'],
}

// Person Schema를 페이지 head에 추가
useSchemaPerson(personData)
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.profile-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f3f4f6;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 2rem;
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

.profile-section h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
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
  padding: 1rem;
  margin-top: 2rem;
}

.info-box p {
  margin: 0;
  color: #1e40af;
  font-size: 0.875rem;
  line-height: 1.6;
}

.info-box code {
  background: #dbeafe;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-family: 'Monaco', 'Courier New', monospace;
}
</style>
