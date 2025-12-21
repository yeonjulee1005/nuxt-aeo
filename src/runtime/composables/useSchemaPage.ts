/**
 * FAQPage Schema helper composable
 * Type-safe helper function for easily adding FAQPage Schema
 * Includes automatic semantic HTML generation
 */

import { useSchema } from './useSchema'
import { useHead } from '#app'

/**
 * Composable that adds FAQPage Schema to page head
 *
 * @param data - FAQPage Schema input data
 * @param data.mainEntity - Array of FAQ questions and answers
 * @param data.renderHtml - Whether to automatically generate semantic HTML (default: true)
 * @param data.visuallyHidden - Whether to visually hide (default: true)
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
 *   ],
 *   renderHtml: true,
 *   visuallyHidden: true
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
  visuallyHidden?: boolean
  [key: string]: unknown
}) {
  // renderHtml option (default: true)
  const renderHtml = data.renderHtml !== false
  // visuallyHidden option (default: true)
  const visuallyHidden = data.visuallyHidden !== false

  // Spread only remaining properties excluding mainEntity, renderHtml, visuallyHidden
  const { mainEntity: _mainEntity, renderHtml: _renderHtml, visuallyHidden: _visuallyHidden, ...restData } = data

  // Add JSON-LD Schema (using context, type)
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

  // Automatic semantic HTML generation (default: true)
  if (renderHtml) {
    const semanticHtml = generateFAQPageSemanticHTML(data.mainEntity)

    // Add visually-hidden CSS style (only once)
    if (visuallyHidden) {
      useHead({
        style: [
          {
            innerHTML: `
              .nuxt-aeo-visually-hidden {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
              }
            `,
          },
        ],
      })
    }

    // Inject semantic HTML into body on client side
    if (import.meta.client) {
      // Execute similar to onMounted
      const injectSemanticHTML = () => {
        if (typeof document !== 'undefined') {
          // Remove existing injected semantic HTML if present
          const existing = document.querySelector('.nuxt-aeo-semantic-faqpage')
          if (existing) {
            existing.remove()
          }

          // Add semantic HTML to body
          const semanticDiv = document.createElement('div')
          semanticDiv.className = `nuxt-aeo-semantic-faqpage ${visuallyHidden ? 'nuxt-aeo-visually-hidden' : ''}`
          semanticDiv.setAttribute('aria-hidden', 'true')
          semanticDiv.innerHTML = semanticHtml
          document.body.appendChild(semanticDiv)
        }
      }

      // Execute when DOM is ready
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
 * Generate semantic HTML based on FAQPage Schema data
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
 * HTML escape helper function
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
