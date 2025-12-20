/**
 * FAQPage Schema 헬퍼 composable
 * FAQPage Schema를 쉽게 추가할 수 있는 타입 안전한 헬퍼 함수
 * 시맨틱 HTML 자동 생성 기능 포함
 */

import { useSchema } from './useSchema'
import { useHead } from '#app'

/**
 * FAQPage Schema를 페이지 head에 추가하는 composable
 *
 * @param data - FAQPage Schema 입력 데이터
 * @param data.mainEntity - FAQ 질문과 답변 배열
 * @param data.renderHtml - 시맨틱 HTML 자동 생성 여부 (기본값: true)
 *
 * @example
 * ```ts
 * useSchemaPage({
 *   mainEntity: [
 *     {
 *       name: 'What is Nuxt?',
 *       acceptedAnswer: {
 *         text: 'Nuxt is a Vue.js framework for building modern web applications.'
 *       }
 *     },
 *     {
 *       name: 'How do I install Nuxt?',
 *       acceptedAnswer: {
 *         text: 'You can install Nuxt using npm, yarn, or pnpm.'
 *       }
 *     }
 *   ]
 * })
 * ```
 */
export function useSchemaPage(data: {
  mainEntity: Array<{
    name: string
    acceptedAnswer: { text: string, [key: string]: unknown }
    [key: string]: unknown
  }>
  renderHtml?: boolean
  [key: string]: unknown
}) {
  // renderHtml 옵션 (기본값: true)
  const renderHtml = data.renderHtml !== false

  // mainEntity와 renderHtml을 제외한 나머지 속성만 스프레드
  const { mainEntity: _mainEntity, renderHtml: _renderHtml, ...restData } = data

  // JSON-LD Schema 추가 (context, type을 사용)
  useSchema({
    context: 'https://schema.org',
    type: 'FAQPage',
    ...restData,
    mainEntity: data.mainEntity.map((questionInput) => {
      const { name, acceptedAnswer: acceptedAnswerInput, ...restQuestion } = questionInput
      const { text, ...restAnswer } = acceptedAnswerInput

      return {
        type: 'Question',
        name,
        acceptedAnswer: {
          type: 'Answer',
          text,
          ...restAnswer,
        },
        ...restQuestion,
      }
    }),
  })

  // 시맨틱 HTML 자동 생성 (기본값: true)
  if (renderHtml) {
    const semanticHtml = generateFAQPageSemanticHTML(data.mainEntity)

    // 스타일 추가
    useHead({
      style: [
        {
          innerHTML: `
            .nuxt-aeo-semantic-faq {
              display: none !important;
              visibility: hidden;
              position: absolute;
              width: 1px;
              height: 1px;
              overflow: hidden;
              clip: rect(0, 0, 0, 0);
              white-space: nowrap;
            }
          `,
        },
      ],
    })

    // 클라이언트 사이드에서 body에 시맨틱 HTML 주입
    if (import.meta.client) {
      // onMounted와 유사하게 실행되도록 처리
      const injectSemanticHTML = () => {
        if (typeof document !== 'undefined') {
          // 기존에 주입된 시맨틱 HTML이 있으면 제거
          const existing = document.querySelector('.nuxt-aeo-semantic-faq')
          if (existing) {
            existing.remove()
          }

          // 시맨틱 HTML을 body에 추가
          const semanticDiv = document.createElement('div')
          semanticDiv.className = 'nuxt-aeo-semantic-faq'
          semanticDiv.setAttribute('aria-hidden', 'true')
          semanticDiv.innerHTML = semanticHtml
          document.body.appendChild(semanticDiv)
        }
      }

      // DOM이 준비되면 실행
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectSemanticHTML)
      }
      else {
        injectSemanticHTML()
      }
    }
  }
}

/**
 * FAQPage Schema 데이터를 기반으로 시맨틱 HTML 생성
 */
function generateFAQPageSemanticHTML(mainEntity: Array<{
  name: string
  acceptedAnswer: { text: string, [key: string]: unknown }
  [key: string]: unknown
}>): string {
  const questionsHtml = mainEntity
    .map((question) => {
      const questionText = escapeHtml(question.name || '')
      const answerText = escapeHtml(question.acceptedAnswer.text || '')

      return `
    <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <h2 itemprop="name">${questionText}</h2>
      <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
        <p itemprop="text">${answerText}</p>
      </div>
    </div>
      `.trim()
    })
    .join('\n')

  return `
<div itemscope itemtype="https://schema.org/FAQPage">
${questionsHtml}
</div>
  `.trim()
}

/**
 * HTML 이스케이프 헬퍼 함수
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#039;',
  }
  return text.replace(/[&<>"']/g, m => map[m] ?? m)
}
