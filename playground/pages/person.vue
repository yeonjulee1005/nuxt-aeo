<template>
  <div class="profile-page">
    <div class="container">
      <div class="profile-header">
        <img
          v-if="person.image"
          :src="person.image"
          :alt="person.name"
          class="profile-image"
        >
        <div class="profile-info">
          <h1>{{ person.name }}</h1>
          <p
            v-if="person.alternateName"
            class="alternate-name"
          >
            {{ person.alternateName }}
          </p>
          <p
            v-if="person.jobTitle"
            class="job-title"
          >
            {{ person.jobTitle }}
          </p>
          <p
            v-if="person.description"
            class="description"
          >
            {{ person.description }}
          </p>
        </div>
      </div>

      <div
        v-if="person.knowsAbout && person.knowsAbout.length > 0"
        class="skills-section"
      >
        <h2>Technical Stack</h2>
        <ul class="skills-list">
          <li
            v-for="(skill, index) in person.knowsAbout"
            :key="index"
          >
            {{ skill }}
          </li>
        </ul>
      </div>

      <div
        v-if="person.sameAs && person.sameAs.length > 0"
        class="social-section"
      >
        <h2>Social Media</h2>
        <ul class="social-list">
          <li
            v-for="(url, index) in person.sameAs"
            :key="index"
          >
            <a
              :href="url"
              target="_blank"
              rel="noopener noreferrer"
            >{{ url }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Person data
const person = {
  name: 'John Doe',
  alternateName: 'johndoe',
  jobTitle: 'Software Engineer',
  url: 'https://example.com',
  image: 'https://example.com/profile.jpg',
  description: 'Full-stack developer with expertise in web application development.',
  knowsAbout: ['JavaScript', 'TypeScript', 'Vue.js', 'Nuxt', 'Node.js'],
  sameAs: [
    'https://github.com/johndoe',
    'https://twitter.com/johndoe',
    'https://linkedin.com/in/johndoe',
  ],
  worksFor: {
    name: 'Example Company',
  },
}

// Add Person Schema
useSchema({
  context: 'https://schema.org',
  type: 'Person',
  name: person.name,
  alternateName: person.alternateName,
  jobTitle: person.jobTitle,
  url: person.url,
  image: person.image,
  description: person.description,
  knowsAbout: person.knowsAbout,
  sameAs: person.sameAs,
  worksFor: {
    type: 'Organization',
    name: person.worksFor.name,
  },
  renderHtml: true,
  visuallyHidden: true,
})

// Add FAQPage Schema for Person Schema-related questions
useSchemaPage({
  mainEntity: [
    {
      name: 'Person Schema는 언제 사용하나요?',
      acceptedAnswer: {
        text: 'Person Schema는 개인 프로필 페이지, 팀 소개 페이지, 저자 정보 페이지 등에서 사용됩니다. 특정 인물의 이름, 직업, 소셜 미디어 링크, 기술 스택 등의 정보를 구조화된 데이터로 제공하여 AI 모델과 검색 엔진이 해당 인물에 대한 정보를 더 잘 이해할 수 있도록 합니다.',
      },
    },
    {
      name: 'knowsAbout 속성은 무엇인가요?',
      acceptedAnswer: {
        text: 'knowsAbout 속성은 해당 인물이 알고 있는 주제나 기술 스택을 나타내는 배열입니다. 예를 들어 ["JavaScript", "TypeScript", "Vue.js"]와 같이 기술 스택을 나열할 수 있으며, 이를 통해 AI 모델이 해당 인물의 전문 분야를 파악할 수 있습니다.',
      },
    },
    {
      name: '전역 설정과 페이지별 설정의 차이는?',
      acceptedAnswer: {
        text: '전역 설정(nuxt.config.ts의 aeo.schemas)은 모든 페이지에 자동으로 적용되는 스키마로, 사이트 전체에 공통으로 적용되는 Organization이나 주요 Person 정보에 사용합니다. 페이지별 설정(useSchema())은 특정 페이지에만 적용되는 스키마로, 각 페이지의 고유한 Person 정보를 추가할 때 사용합니다.',
      },
    },
    {
      name: 'Person Schema의 필수 속성은 무엇인가요?',
      acceptedAnswer: {
        text: 'Person Schema에서 필수 속성은 name입니다. 하지만 더 풍부한 정보를 제공하기 위해 jobTitle, description, image, url, sameAs(소셜 미디어 링크), knowsAbout(기술 스택) 등을 추가하는 것이 좋습니다. worksFor 속성을 통해 소속 조직 정보도 포함할 수 있습니다.',
      },
    },
  ],
})
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.profile-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #667eea;
}

.profile-info {
  flex: 1;
}

h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #1a202c;
}

.alternate-name {
  font-size: 1.1rem;
  color: #667eea;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.job-title {
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 1rem;
  font-weight: 500;
}

.description {
  font-size: 1rem;
  color: #718096;
  line-height: 1.6;
  margin: 0;
}

.skills-section,
.social-section {
  margin-top: 2rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.skills-list,
.social-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skills-list li {
  background: #edf2f7;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #2d3748;
}

.social-list li {
  margin-bottom: 0.5rem;
}

.social-list a {
  color: #2563eb;
  text-decoration: none;
  transition: color 0.2s;
}

.social-list a:hover {
  color: #1d4ed8;
  text-decoration: underline;
}
</style>
