<template>
  <div class="faq-page">
    <div class="container">
      <h1>자주 묻는 질문 (FAQ)</h1>
      <p class="description">
        아래는 Nuxt AEO 모듈에 대한 자주 묻는 질문과 답변입니다.
        이 페이지는 FAQPage Schema를 사용하여 구조화된 데이터를 제공합니다.
      </p>

      <!-- 전역 스키마 정보 표시 -->
      <div class="global-schemas-section">
        <h2 class="section-title">
          전역 스키마 (자동 주입)
        </h2>
        <div class="schemas-grid">
          <div class="schema-card">
            <h3>Organization</h3>
            <p class="schema-name">
              {{ organizationData.name }}
            </p>
            <p class="schema-description">
              {{ organizationData.description }}
            </p>
            <p class="schema-note">
              nuxt.config.ts의 <code>aeo.schemas</code> 배열에서 설정
            </p>
          </div>
          <div class="schema-card">
            <h3>Person</h3>
            <p class="schema-name">
              {{ personData.name }}
            </p>
            <p class="schema-description">
              {{ personData.jobTitle }}
            </p>
            <p class="schema-note">
              nuxt.config.ts의 <code>aeo.schemas</code> 배열에서 설정
            </p>
          </div>
        </div>
      </div>

      <div class="faq-list">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="faq-item"
        >
          <h2 class="question">
            {{ faq.question }}
          </h2>
          <p class="answer">
            {{ faq.answer }}
          </p>
        </div>
      </div>

      <div class="info-box">
        <h3>Schema 정보</h3>
        <p>
          <strong>전역 스키마 (자동 주입):</strong> nuxt.config.ts의 <code>aeo.schemas</code> 배열에 설정된 Organization과 Person 스키마가
          이 페이지에도 자동으로 주입됩니다. 이 스키마들은 모든 페이지에 공통으로 포함됩니다.
        </p>
        <p>
          <strong>페이지별 스키마 (수동 추가):</strong> 이 페이지는 <code>useSchemaPage()</code> composable을 사용하여
          FAQPage Schema를 페이지별로 추가합니다. FAQ 페이지이므로 FAQPage Schema가 필요합니다.
        </p>
        <p style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
          <strong>💡 개발자 도구 확인:</strong> 개발자 도구(F12)의 Elements 탭에서
          <code>&lt;script type="application/ld+json"&gt;</code> 태그를 확인하세요.
          <br>
          <strong>예상되는 스키마:</strong>
          <br>
          • Organization (전역)
          <br>
          • Person (전역)
          <br>
          • FAQPage (페이지별)
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Organization 데이터 (전역 스키마에서 주입됨 - nuxt.config.ts 참조)
const organizationData = {
  name: 'Nuxt AEO Project',
  description: 'AI Engine Optimization module for Nuxt',
}

// Person 데이터 (전역 스키마에서 주입됨 - nuxt.config.ts 참조)
const personData = {
  name: 'Yeonju Lee',
  jobTitle: 'Software Engineer / CDO',
}

// FAQ 데이터 - 화면에 표시되는 Q&A와 Schema가 1:1로 일치
const faqs = [
  {
    question: 'Nuxt AEO 모듈이란 무엇인가요?',
    answer: 'Nuxt AEO 모듈은 Schema.org JSON-LD를 통해 AI Engine Optimization(AEO)을 지원하는 Nuxt 모듈입니다. 이 모듈을 사용하면 AI 모델과 검색 엔진이 콘텐츠를 더 잘 이해할 수 있도록 구조화된 데이터를 쉽게 추가할 수 있습니다.',
  },
  {
    question: '어떤 Schema 타입을 지원하나요?',
    answer: '현재 Person, FAQPage, ItemList, Article, TechArticle 등의 Schema 타입을 지원합니다. 각 타입에 대한 타입 안전한 composable 함수를 제공합니다.',
  },
  {
    question: 'useSchemaPage는 어떻게 사용하나요?',
    answer: 'useSchemaPage() composable에 mainEntity 배열을 전달하면 됩니다. 각 항목은 질문(name)과 답변(acceptedAnswer)을 포함해야 합니다. 이 함수는 자동으로 useHead()를 호출하여 페이지 head에 JSON-LD 스크립트를 추가합니다.',
  },
  {
    question: 'SSR 환경에서도 작동하나요?',
    answer: '네, 완전히 SSR을 지원합니다. useHead()를 사용하여 서버 사이드에서도 스크립트 태그가 올바르게 렌더링됩니다.',
  },
  {
    question: '전역 스키마를 설정할 수 있나요?',
    answer: '네, nuxt.config.ts의 aeo 모듈 옵션에서 schemas 배열을 사용하여 Organization, Person, WebSite 등 다양한 스키마를 설정할 수 있습니다. 설정한 스키마는 모든 페이지에 자동으로 주입됩니다. autoInject 옵션으로 자동 주입 여부를 제어할 수 있습니다.',
  },
]

// FAQPage Schema 추가
// 화면에 표시되는 Q&A와 Schema의 mainEntity가 1:1로 일치하도록 구성
useSchemaPage({
  mainEntity: faqs.map(faq => ({
    name: faq.question,
    acceptedAnswer: {
      text: faq.answer,
    },
  })),
})
</script>

<style scoped>
.faq-page {
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

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1a202c;
  text-align: center;
}

.description {
  font-size: 1.1rem;
  color: #4a5568;
  margin-bottom: 2rem;
  text-align: center;
  line-height: 1.6;
}

.faq-list {
  margin-top: 2rem;
}

.faq-item {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.faq-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.question {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.answer {
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.7;
  margin: 0;
}

.info-box {
  margin-top: 3rem;
  padding: 1.5rem;
  background: #f7fafc;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.info-box h3 {
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.info-box p {
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
}

.info-box code {
  background: #edf2f7;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
  color: #c53030;
}

.global-schemas-section {
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: #f7fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #2d3748;
  text-align: center;
}

.schemas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.schema-card {
  background: white;
  padding: 1.25rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.schema-card h3 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #667eea;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.schema-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
}

.schema-description {
  font-size: 0.875rem;
  color: #4a5568;
  margin: 0 0 0.75rem 0;
  line-height: 1.5;
}

.schema-note {
  font-size: 0.75rem;
  color: #718096;
  margin: 0;
  padding-top: 0.75rem;
  border-top: 1px solid #e2e8f0;
}

.schema-note code {
  background: #edf2f7;
  padding: 0.125rem 0.25rem;
  border-radius: 3px;
  font-size: 0.75rem;
  color: #667eea;
}
</style>
