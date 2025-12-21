<template>
  <div class="about-page">
    <div class="container">
      <h1>{{ organization.name }}</h1>
      <p class="description">
        {{ organization.description }}
      </p>

      <div class="info-section">
        <h2>Company Information</h2>
        <ul>
          <li><strong>Website:</strong> <a :href="organization.url">{{ organization.url }}</a></li>
          <li v-if="organization.contactPoint">
            <strong>Contact:</strong> {{ organization.contactPoint.telephone }}
          </li>
          <li v-if="organization.contactPoint">
            <strong>Email:</strong> {{ organization.contactPoint.email }}
          </li>
        </ul>
      </div>

      <div
        v-if="organization.sameAs && organization.sameAs.length > 0"
        class="social-section"
      >
        <h2>Social Media</h2>
        <ul>
          <li
            v-for="(url, index) in organization.sameAs"
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
// Organization data
const organization = {
  name: 'Example Company',
  url: 'https://example.com',
  description: 'Example Company provides the best services.',
  logo: 'https://example.com/logo.png',
  sameAs: [
    'https://github.com/example',
    'https://twitter.com/example',
  ],
  contactPoint: {
    telephone: '+1-555-123-4567',
    contactType: 'Customer Service',
    email: 'support@example.com',
  },
}

// Add Organization Schema
useSchema({
  context: 'https://schema.org',
  type: 'Organization',
  name: organization.name,
  url: organization.url,
  description: organization.description,
  logo: organization.logo,
  sameAs: organization.sameAs,
  contactPoint: {
    type: 'ContactPoint',
    telephone: organization.contactPoint.telephone,
    contactType: organization.contactPoint.contactType,
    email: organization.contactPoint.email,
  },
  renderHtml: true,
  visuallyHidden: true,
})

// Add FAQPage Schema for Organization Schema-related questions
useSchemaPage({
  mainEntity: [
    {
      name: 'Organization Schema는 언제 사용하나요?',
      acceptedAnswer: {
        text: 'Organization Schema는 회사 소개 페이지, 조직 정보 페이지, About 페이지 등에서 사용됩니다. 회사나 조직의 이름, 설명, 로고, 웹사이트 URL, 연락처 정보, 소셜 미디어 링크 등을 구조화된 데이터로 제공하여 검색 엔진과 AI 모델이 조직 정보를 더 잘 이해할 수 있도록 합니다.',
      },
    },
    {
      name: '필수 속성은 무엇인가요?',
      acceptedAnswer: {
        text: 'Organization Schema에서 필수 속성은 name입니다. 하지만 더 완전한 정보를 제공하기 위해 url, description, logo, sameAs(소셜 미디어 링크), contactPoint(연락처 정보) 등을 추가하는 것이 좋습니다. 특히 contactPoint를 통해 고객 지원, 영업, 일반 문의 등의 연락처를 구분하여 제공할 수 있습니다.',
      },
    },
    {
      name: 'contactPoint는 어떻게 설정하나요?',
      acceptedAnswer: {
        text: 'contactPoint는 ContactPoint 타입의 객체로 설정하며, telephone(전화번호), email(이메일), contactType(연락처 유형) 등의 속성을 포함합니다. contactType은 "Customer Service", "Sales", "Technical Support" 등으로 구분할 수 있으며, 여러 연락처를 배열로 제공할 수도 있습니다.',
      },
    },
    {
      name: 'Organization Schema를 전역으로 설정할 수 있나요?',
      acceptedAnswer: {
        text: '네, nuxt.config.ts의 aeo.schemas 배열에 Organization Schema를 추가하면 모든 페이지에 자동으로 주입됩니다. 이는 사이트 전체에 공통으로 적용되는 조직 정보(회사명, 로고, 기본 연락처 등)를 설정할 때 유용합니다.',
      },
    },
  ],
})
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  padding: 2rem;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 3rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.info-section,
.social-section {
  margin-top: 2rem;
}

.info-section h2,
.social-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

a {
  color: #2563eb;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
