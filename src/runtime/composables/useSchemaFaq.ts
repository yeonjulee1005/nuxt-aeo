/**
 * FAQPage Schema helper composable
 * Type-safe helper function for easily adding FAQPage Schema
 * Includes automatic semantic HTML generation
 */

import { useSchema } from './useSchema'
import { useHead, useRequestURL, useRuntimeConfig, useRoute } from '#app'

type FAQItem = {
  name: string
  acceptedAnswer: { text: string, [key: string]: unknown }
  [key: string]: unknown
}

// Page-specific storage for FAQ mainEntity items (key: page path)
const faqMainEntityStorage = new Map<string, FAQItem[]>()

/**
 * Get base URL for URL normalization
 */
const getBaseUrl = (): string => {
  try {
    const requestUrl = useRequestURL()
    if (requestUrl?.origin) {
      return requestUrl.origin
    }
  }
  catch {
    // useRequestURL() may not be available in all contexts
  }

  try {
    const config = useRuntimeConfig()
    const appConfig = config.app as { baseURL?: string } | undefined
    const baseURL = appConfig?.baseURL

    if (baseURL) {
      if (baseURL.startsWith('http://') || baseURL.startsWith('https://')) {
        return new URL(baseURL).origin
      }
      if (import.meta.client && typeof window !== 'undefined') {
        return window.location.origin
      }
    }
  }
  catch {
    // Runtime config may not be available
  }

  if (import.meta.client && typeof window !== 'undefined') {
    return window.location.origin
  }

  return ''
}

/**
 * Normalize URL to absolute URL
 */
const normalizeUrl = (url: string, baseUrl: string): string => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  if (!baseUrl) {
    return url
  }

  try {
    return new URL(url, baseUrl).href
  }
  catch {
    return url
  }
}

/**
 * Recursively normalize URLs in schema object
 */
const normalizeSchemaUrls = (obj: unknown, baseUrl: string): unknown => {
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(item => normalizeSchemaUrls(item, baseUrl))
  }

  const result: Record<string, unknown> = {}
  const urlKeys = ['url', 'image', 'logo', 'item']

  for (const [key, value] of Object.entries(obj)) {
    if (urlKeys.includes(key) && typeof value === 'string') {
      result[key] = normalizeUrl(value, baseUrl)
    }
    else if (value && typeof value === 'object') {
      result[key] = normalizeSchemaUrls(value, baseUrl)
    }
    else {
      result[key] = value
    }
  }

  return result
}

/**
 * Get current page path
 */
const getCurrentPath = (): string => {
  try {
    const route = useRoute()
    return route.path || '/'
  }
  catch {
    return '/'
  }
}

/**
 * Transform FAQ input to Schema.org format
 */
const transformFAQToSchema = (mainEntity: FAQItem[]) => {
  return mainEntity.map((questionInput) => {
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
  })
}

/**
 * Generate semantic HTML for FAQPage
 */
const generateFAQPageSemanticHTML = (mainEntity: FAQItem[]): string => {
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
 * HTML escape helper
 */
const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#039;',
  }
  return text.replace(/[&<>"']/g, m => map[m] ?? m)
}

/**
 * Add visually-hidden CSS style
 */
const addVisuallyHiddenStyle = () => {
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
          [class*="nuxt-aeo-semantic-"] {
            pointer-events: none;
          }
          [class*="nuxt-aeo-semantic-"] a,
          [class*="nuxt-aeo-semantic-"] button,
          [class*="nuxt-aeo-semantic-"] input,
          [class*="nuxt-aeo-semantic-"] select,
          [class*="nuxt-aeo-semantic-"] textarea {
            pointer-events: none;
            tabindex: -1;
          }
        `,
      },
    ],
  })
}

/**
 * Inject semantic HTML into body
 */
const injectSemanticHTML = (semanticHtml: string, visuallyHidden: boolean) => {
  if (typeof document === 'undefined') {
    return
  }

  const existing = document.querySelector('.nuxt-aeo-semantic-faqpage')
  if (existing) {
    existing.remove()
  }

  const semanticDiv = document.createElement('div')
  semanticDiv.className = `nuxt-aeo-semantic-faqpage ${visuallyHidden ? 'nuxt-aeo-visually-hidden' : ''}`
  semanticDiv.setAttribute('aria-hidden', 'true')
  semanticDiv.setAttribute('tabindex', '-1')
  semanticDiv.innerHTML = semanticHtml
  document.body.appendChild(semanticDiv)
}

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
 * useSchemaFaq({
 *   mainEntity: [
 *     {
 *       name: 'What is Nuxt?',
 *       acceptedAnswer: {
 *         text: 'Nuxt is a Vue.js framework for building modern web applications.'
 *       }
 *     }
 *   ]
 * })
 * ```
 */
export const useSchemaFaq = (data: {
  mainEntity: FAQItem[]
  renderHtml?: boolean
  visuallyHidden?: boolean
  [key: string]: unknown
}) => {
  const renderHtml = data.renderHtml !== false
  const visuallyHidden = data.visuallyHidden !== false
  const baseUrl = getBaseUrl()

  const { mainEntity: _mainEntity, renderHtml: _renderHtml, visuallyHidden: _visuallyHidden, ...restData } = data

  const schemaData = {
    context: 'https://schema.org',
    type: 'FAQPage',
    ...restData,
    mainEntity: transformFAQToSchema(data.mainEntity),
  }

  const normalizedSchemaData = normalizeSchemaUrls(schemaData, baseUrl) as typeof schemaData
  useSchema(normalizedSchemaData)

  if (renderHtml) {
    const currentPath = getCurrentPath()
    const existingMainEntity = faqMainEntityStorage.get(currentPath) || []
    const mergedMainEntity = [...existingMainEntity, ...data.mainEntity]
    faqMainEntityStorage.set(currentPath, mergedMainEntity)

    const semanticHtml = generateFAQPageSemanticHTML(mergedMainEntity)

    if (visuallyHidden) {
      addVisuallyHiddenStyle()
    }

    if (import.meta.client) {
      const inject = () => injectSemanticHTML(semanticHtml, visuallyHidden)

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject)
      }
      else {
        inject()
      }
    }
  }
}
