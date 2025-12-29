/**
 * Universal Schema composable
 * A universal function that adds any Schema type to useHead
 * Includes automatic semantic HTML generation
 */

import { useHead, useRequestURL, useRuntimeConfig } from '#app'

// Schema storage for merging schemas of the same type
const schemaStorage = new Map<string, Record<string, unknown>>()

// Track page-level schemas (page-level schemas override global schemas)
const pageLevelSchemas = new Set<string>()

/**
 * Merge schemas of the same type
 */
const mergeSchemas = (
  existing: Record<string, unknown>,
  newSchema: Record<string, unknown>,
): Record<string, unknown> => {
  const schemaType = (existing['@type'] || existing.type || '') as string

  // Special handling for FAQPage - merge mainEntity arrays
  if (schemaType === 'FAQPage' || schemaType === 'faqpage') {
    const existingMainEntity = Array.isArray(existing.mainEntity) ? existing.mainEntity : []
    const newMainEntity = Array.isArray(newSchema.mainEntity) ? newSchema.mainEntity : []

    return {
      ...existing,
      ...newSchema,
      mainEntity: [...existingMainEntity, ...newMainEntity],
    }
  }

  // For other types, merge arrays and objects
  const merged = { ...existing }
  const reservedKeys = ['@type', 'type', '@context', 'context']

  for (const [key, value] of Object.entries(newSchema)) {
    if (reservedKeys.includes(key)) {
      continue
    }

    if (Array.isArray(value)) {
      const existingArray = Array.isArray(merged[key]) ? merged[key] : []
      merged[key] = [...existingArray, ...value]
    }
    else if (value && typeof value === 'object') {
      const existingObj = merged[key] && typeof merged[key] === 'object' && !Array.isArray(merged[key])
        ? merged[key] as Record<string, unknown>
        : {}
      merged[key] = { ...existingObj, ...(value as Record<string, unknown>) }
    }
    else {
      merged[key] = value
    }
  }

  return merged
}

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
 * Transform schema keys: context → @context, type → @type
 */
const transformSchemaKeys = (obj: Record<string, unknown>): Record<string, unknown> => {
  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    const transformedKey = key === 'context' ? '@context' : key === 'type' ? '@type' : key

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[transformedKey] = transformSchemaKeys(value as Record<string, unknown>)
    }
    else if (Array.isArray(value)) {
      result[transformedKey] = value.map(item =>
        item && typeof item === 'object' && !Array.isArray(item)
          ? transformSchemaKeys(item as Record<string, unknown>)
          : item,
      )
    }
    else {
      result[transformedKey] = value
    }
  }

  return result
}

/**
 * Generate semantic HTML based on Schema type
 */
const generateSemanticHTML = (schemaType: string, schemaData: Record<string, unknown>): string | null => {
  const type = schemaType.toLowerCase()

  switch (type) {
    case 'organization':
      return generateOrganizationHTML(schemaData)
    case 'person':
      return generatePersonHTML(schemaData)
    case 'itemlist':
      return generateItemListHTML(schemaData)
    default:
      return generateGenericHTML(schemaType, schemaData)
  }
}

/**
 * Generate Organization Schema HTML
 */
const generateOrganizationHTML = (data: Record<string, unknown>): string => {
  const name = escapeHtml(String(data.name || ''))
  const description = data.description ? escapeHtml(String(data.description)) : ''
  const url = data.url ? escapeHtml(String(data.url)) : ''

  let html = `<div itemscope itemtype="https://schema.org/Organization">`
  if (name) html += `<span itemprop="name">${name}</span>`
  if (description) html += `<span itemprop="description">${description}</span>`
  if (url) html += `<a itemprop="url" href="${url}">${url}</a>`
  html += `</div>`

  return html
}

/**
 * Generate Person Schema HTML
 */
const generatePersonHTML = (data: Record<string, unknown>): string => {
  const name = escapeHtml(String(data.name || ''))
  const alternateName = data.alternateName ? escapeHtml(String(data.alternateName)) : ''
  const jobTitle = data.jobTitle ? escapeHtml(String(data.jobTitle)) : ''
  const url = data.url ? escapeHtml(String(data.url)) : ''
  const knowsAbout = Array.isArray(data.knowsAbout)
    ? data.knowsAbout.map((item: unknown) => escapeHtml(String(item)))
    : []

  let html = `<div itemscope itemtype="https://schema.org/Person">`
  if (name) html += `<span itemprop="name">${name}</span>`
  if (alternateName) html += `<span itemprop="alternateName">${alternateName}</span>`
  if (jobTitle) html += `<span itemprop="jobTitle">${jobTitle}</span>`
  if (url) html += `<a itemprop="url" href="${url}">${url}</a>`
  knowsAbout.forEach((skill: string) => {
    html += `<span itemprop="knowsAbout">${skill}</span>`
  })
  html += `</div>`

  return html
}

/**
 * Generate ItemList Schema HTML
 */
const generateItemListHTML = (data: Record<string, unknown>): string => {
  const name = escapeHtml(String(data.name || ''))
  const description = data.description ? escapeHtml(String(data.description)) : ''
  const itemListElement = Array.isArray(data.itemListElement) ? data.itemListElement : []

  let html = `<div itemscope itemtype="https://schema.org/ItemList">`
  if (name) html += `<span itemprop="name">${name}</span>`
  if (description) html += `<span itemprop="description">${description}</span>`
  if (itemListElement.length > 0) {
    html += `<ol>`
    itemListElement.forEach((item: unknown) => {
      if (item && typeof item === 'object') {
        const itemObj = item as Record<string, unknown>
        const position = itemObj.position || ''
        const itemName = itemObj.name ? escapeHtml(String(itemObj.name)) : ''
        const itemUrl = typeof itemObj.item === 'string' ? escapeHtml(itemObj.item) : ''

        html += `<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">`
        if (position) html += `<meta itemprop="position" content="${position}">`
        if (itemName) html += `<span itemprop="name">${itemName}</span>`
        if (itemUrl) html += `<a itemprop="item" href="${itemUrl}">${itemUrl}</a>`
        html += `</li>`
      }
    })
    html += `</ol>`
  }
  html += `</div>`

  return html
}

/**
 * Generate generic Schema HTML
 */
const generateGenericHTML = (schemaType: string, data: Record<string, unknown>): string => {
  const typeUrl = `https://schema.org/${schemaType}`
  let html = `<div itemscope itemtype="${typeUrl}">`

  const commonProps = ['name', 'description', 'url', 'image']
  commonProps.forEach((prop) => {
    if (data[prop]) {
      const value = escapeHtml(String(data[prop]))
      if (prop === 'url' || prop === 'image') {
        html += `<a itemprop="${prop}" href="${value}">${value}</a>`
      }
      else {
        html += `<span itemprop="${prop}">${value}</span>`
      }
    }
  })

  html += `</div>`
  return html
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
        `,
      },
    ],
  })
}

/**
 * Inject semantic HTML into body
 */
const injectSemanticHTML = (schemaType: string, semanticHtml: string, visuallyHidden: boolean) => {
  if (typeof document === 'undefined') {
    return
  }

  const className = `nuxt-aeo-semantic-${schemaType.toLowerCase()}`
  const existing = document.querySelector(`.${className}`)
  if (existing) {
    existing.remove()
  }

  const semanticDiv = document.createElement('div')
  semanticDiv.className = `${className} ${visuallyHidden ? 'nuxt-aeo-visually-hidden' : ''}`
  semanticDiv.setAttribute('aria-hidden', 'true')
  semanticDiv.innerHTML = semanticHtml
  document.body.appendChild(semanticDiv)
}

/**
 * Handle page-level schema
 */
const handlePageLevelSchema = (schemaKey: string, transformedSchema: Record<string, unknown>) => {
  pageLevelSchemas.add(schemaKey)

  const existingSchema = schemaStorage.get(schemaKey)
  const mergedSchema = existingSchema
    ? mergeSchemas(existingSchema, transformedSchema)
    : transformedSchema

  schemaStorage.set(schemaKey, mergedSchema)
}

/**
 * Handle plugin-level (global) schema
 */
const handlePluginLevelSchema = (schemaKey: string, transformedSchema: Record<string, unknown>): boolean => {
  if (pageLevelSchemas.has(schemaKey)) {
    return false // Skip if page-level schema exists
  }

  const existingSchema = schemaStorage.get(schemaKey)
  const mergedSchema = existingSchema
    ? mergeSchemas(existingSchema, transformedSchema)
    : transformedSchema

  schemaStorage.set(schemaKey, mergedSchema)
  return true
}

/**
 * Universal composable that adds Schema.org JSON-LD to page head
 *
 * @param schema - Schema object (can use context, type)
 * @param schema.renderHtml - Whether to automatically generate semantic HTML (default: false)
 * @param schema.visuallyHidden - Whether to visually hide (default: true)
 * @param schema._isPageLevel - Internal flag to mark page-level schemas (default: true)
 *
 * @example
 * ```ts
 * useSchema({
 *   context: 'https://schema.org',
 *   type: 'Person',
 *   name: 'John Doe',
 *   renderHtml: true
 * })
 * ```
 */
export const useSchema = (schema: Record<string, unknown> & {
  renderHtml?: boolean
  visuallyHidden?: boolean
  _isPageLevel?: boolean
}) => {
  const { renderHtml = false, visuallyHidden = true, _isPageLevel = true, ...schemaData } = schema
  const baseUrl = getBaseUrl()

  const normalizedSchemaData = normalizeSchemaUrls(schemaData, baseUrl) as Record<string, unknown>
  const transformedSchema = transformSchemaKeys(normalizedSchemaData)

  const schemaType = (transformedSchema['@type'] || schemaData.type || '') as string
  const schemaKey = `nuxt-aeo-schema-${schemaType.toLowerCase()}`

  if (_isPageLevel) {
    handlePageLevelSchema(schemaKey, transformedSchema)
  }
  else {
    const shouldContinue = handlePluginLevelSchema(schemaKey, transformedSchema)
    if (!shouldContinue) {
      return
    }
  }

  const finalSchema = schemaStorage.get(schemaKey) || transformedSchema
  const schemaWithContext = {
    '@context': finalSchema['@context'] ?? 'https://schema.org',
    ...finalSchema,
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schemaWithContext, null, 2),
        key: schemaKey,
        id: schemaKey,
      },
    ],
  })

  if (renderHtml) {
    const semanticHtml = generateSemanticHTML(schemaType, schemaData)

    if (semanticHtml) {
      if (visuallyHidden) {
        addVisuallyHiddenStyle()
      }

      if (import.meta.client) {
        const inject = () => injectSemanticHTML(schemaType, semanticHtml, visuallyHidden)

        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', inject)
        }
        else {
          inject()
        }
      }
    }
  }
}
