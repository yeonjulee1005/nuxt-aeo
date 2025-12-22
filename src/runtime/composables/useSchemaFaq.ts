/**
 * FAQPage Schema helper composable
 * Type-safe helper function for easily adding FAQPage Schema
 * Includes automatic semantic HTML generation
 */

import { useSchema } from './useSchema'
import { useHead, useRequestURL, useRuntimeConfig } from '#app'

/**
 * Get base URL for URL normalization
 * Uses useRequestURL() origin if available, otherwise falls back to app.baseURL
 */
function getBaseUrl(): string {
  try {
    // Try to use useRequestURL() if available (SSR/client)
    const requestUrl = useRequestURL()
    if (requestUrl?.origin) {
      return requestUrl.origin
    }
  }
  catch {
    // useRequestURL() may not be available in all contexts
  }

  try {
    // Fall back to app.baseURL from runtime config
    const config = useRuntimeConfig()
    const appConfig = config.app as { baseURL?: string } | undefined
    const baseURL = appConfig?.baseURL
    if (baseURL) {
      // If baseURL is absolute, return it; otherwise construct from origin
      if (baseURL.startsWith('http://') || baseURL.startsWith('https://')) {
        return new URL(baseURL).origin
      }
      // If baseURL is relative, try to construct absolute URL
      // In browser, use window.location.origin
      if (import.meta.client && typeof window !== 'undefined') {
        return window.location.origin
      }
    }
  }
  catch {
    // Runtime config may not be available
  }

  // Final fallback: use window.location.origin in browser
  if (import.meta.client && typeof window !== 'undefined') {
    return window.location.origin
  }

  // Last resort: return empty string (will cause URL constructor to throw, but that's handled)
  return ''
}

/**
 * Normalize URL to absolute URL
 * If URL is already absolute (starts with http:// or https://), returns as-is
 * If URL is relative, combines with base URL
 */
function normalizeUrl(url: string, baseUrl: string): string {
  // Return absolute URLs as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  // Normalize relative URLs
  if (!baseUrl) {
    // If no base URL available, return relative URL as-is
    return url
  }

  try {
    // Combine base URL with relative URL
    return new URL(url, baseUrl).href
  }
  catch {
    // If URL construction fails, return original URL
    return url
  }
}

/**
 * Recursively normalize URLs in schema object
 * Processes 'url', 'image', 'logo', and 'item' properties, including nested objects and arrays
 */
function normalizeSchemaUrls(obj: unknown, baseUrl: string): unknown {
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(item => normalizeSchemaUrls(item, baseUrl))
  }

  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    // Normalize 'url', 'image', 'logo', and 'item' properties
    if ((key === 'url' || key === 'image' || key === 'logo' || key === 'item') && typeof value === 'string') {
      result[key] = normalizeUrl(value, baseUrl)
    }
    // Recursively process nested objects
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
export function useSchemaFaq(data: {
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

  // Get base URL for URL normalization
  const baseUrl = getBaseUrl()

  // Spread only remaining properties excluding mainEntity, renderHtml, visuallyHidden
  const { mainEntity: _mainEntity, renderHtml: _renderHtml, visuallyHidden: _visuallyHidden, ...restData } = data

  // Prepare schema data with normalized URLs
  const schemaData = {
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
  }

  // Normalize URLs in schema data (before passing to useSchema)
  const normalizedSchemaData = normalizeSchemaUrls(schemaData, baseUrl) as typeof schemaData

  // Add JSON-LD Schema (using context, type)
  useSchema(normalizedSchemaData)

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
