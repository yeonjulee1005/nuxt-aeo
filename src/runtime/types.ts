/**
 * Schema.org JSON-LD type definitions
 * Schema types for AEO (AI Engine Optimization)
 */

/**
 * Base Schema interface
 * All Schema types extend this interface.
 */
export interface SchemaBase {
  '@context': 'https://schema.org' | string
  '@type': string
  '@id'?: string
}

/**
 * FAQPage Schema type
 */
export interface FAQPageSchema extends SchemaBase {
  '@type': 'FAQPage'
  'mainEntity': Array<{
    '@type': 'Question'
    'name': string
    'acceptedAnswer': {
      '@type': 'Answer'
      'text': string
      [key: string]: unknown
    }
    [key: string]: unknown
  }>
  [key: string]: unknown
}

/**
 * Global schema configuration to inject
 * Schema information that will be automatically injected into all pages
 * Using context and type will automatically convert them to @context and @type internally
 */
export type GlobalSchema = {
  context?: 'https://schema.org' | string
  type: string
  /**
   * Whether to automatically generate semantic HTML
   * @default true
   * If true, semantic HTML is automatically generated based on schema data and injected into pages.
   */
  renderHtml?: boolean
  /**
   * Whether to visually hide
   * @default true
   * If true, generated semantic HTML is hidden with the visually-hidden class.
   * LLM crawlers and search engines can read it, but it's not visible to users.
   */
  visuallyHidden?: boolean
  [key: string]: unknown
}

/**
 * Nuxt module configuration options type
 */
export interface ModuleOptions {
  /**
   * Array of schemas to inject globally
   * Schema information that will be automatically injected into all pages
   * You can configure various schema types like Person, Organization, WebSite, etc.
   * Using context and type will automatically convert them to @context and @type internally.
   *
   * @example
   * ```ts
   * schemas: [
   *   {
   *     type: 'Organization',
   *     name: 'My Company',
   *     url: 'https://example.com',
   *   },
   *   {
   *     type: 'Person',
   *     name: 'John Doe',
   *   }
   * ]
   * ```
   */
  schemas?: GlobalSchema[]

  /**
   * Automatic injection
   * @default true
   * If false, schemas are not injected even if the schemas array exists.
   * If schemas array is missing, a default Project Schema is injected.
   */
  autoInject?: boolean

  /**
   * Global semantic HTML auto-generation
   * @default true
   * If true, semantic HTML is automatically generated for global schemas and injected into pages.
   */
  renderHtml?: boolean

  /**
   * Global visual hiding
   * @default true
   * If true, generated semantic HTML is hidden with the visually-hidden class.
   */
  visuallyHidden?: boolean
}

/**
 * Nuxt Config type extension
 */
declare module '@nuxt/schema' {
  interface NuxtConfig {
    aeo?: ModuleOptions
  }
}
