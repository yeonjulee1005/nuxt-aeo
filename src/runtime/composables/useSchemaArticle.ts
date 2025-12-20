/**
 * Article/TechArticle Schema 헬퍼 composable
 * Article 및 TechArticle Schema를 쉽게 추가할 수 있는 타입 안전한 헬퍼 함수
 */

import type {
  Address,
  ArticleSchema,
  ArticleSchemaInput,
  Organization,
  PersonSchema,
  PersonSchemaInput,
  SchemaBase,
  TechArticleSchema,
  TechArticleSchemaInput,
} from '../types'
import { useSchema } from './useSchema'

/**
 * PersonSchemaInput을 PersonSchema로 변환하는 헬퍼 함수
 */
function convertPersonInputToSchema(personInput: PersonSchemaInput): PersonSchema {
  const address: Address | undefined = personInput.address
    ? {
        '@type': 'PostalAddress',
        ...personInput.address,
      }
    : undefined

  const worksFor: Organization | undefined = personInput.worksFor
    ? {
        '@type': 'Organization',
        ...personInput.worksFor,
      }
    : undefined

  const alumniOf: Organization | undefined = personInput.alumniOf
    ? {
        '@type': 'Organization',
        ...personInput.alumniOf,
      }
    : undefined

  const { address: _address, worksFor: _worksFor, alumniOf: _alumniOf, ...restData } = personInput

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    ...restData,
    ...(address && { address }),
    ...(worksFor && { worksFor }),
    ...(alumniOf && { alumniOf }),
  } as PersonSchema
}

/**
 * Article Schema를 페이지 head에 추가하는 composable
 *
 * @param data - Article Schema 입력 데이터
 *
 * @example
 * ```ts
 * useSchemaArticle({
 *   headline: 'Getting Started with Nuxt 3',
 *   description: 'Learn how to build modern web applications with Nuxt 3',
 *   image: 'https://example.com/article.jpg',
 *   datePublished: '2024-01-01',
 *   dateModified: '2024-01-02',
 *   author: {
 *     name: 'John Doe',
 *     url: 'https://example.com/author'
 *   },
 *   publisher: {
 *     name: 'Example Blog',
 *     url: 'https://example.com'
 *   },
 *   mainEntityOfPage: 'https://example.com/article',
 *   articleBody: 'This is the full article content...'
 * })
 * ```
 */
export function useSchemaArticle(data: ArticleSchemaInput) {
  // author 변환: PersonSchemaInput | PersonSchemaInput[] -> PersonSchema | PersonSchema[]
  let author: PersonSchema | PersonSchema[] | undefined
  if (data.author) {
    if (Array.isArray(data.author)) {
      author = data.author.map(convertPersonInputToSchema)
    }
    else {
      author = convertPersonInputToSchema(data.author)
    }
  }

  // publisher 변환: OrganizationInput -> Organization
  const publisher: Organization | undefined = data.publisher
    ? {
        '@type': 'Organization',
        ...data.publisher,
      }
    : undefined

  // author와 publisher를 제외한 나머지 속성만 스프레드
  const { author: _author, publisher: _publisher, ...restData } = data

  const schema: ArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    ...restData,
    ...(author && { author }),
    ...(publisher && { publisher }),
  } as ArticleSchema

  useSchema(schema)
}

/**
 * TechArticle Schema를 페이지 head에 추가하는 composable
 *
 * @param data - TechArticle Schema 입력 데이터
 *
 * @example
 * ```ts
 * useSchemaTechArticle({
 *   headline: 'Advanced TypeScript Patterns',
 *   description: 'Learn advanced TypeScript patterns and techniques',
 *   image: 'https://example.com/tech-article.jpg',
 *   datePublished: '2024-01-01',
 *   dateModified: '2024-01-02',
 *   author: {
 *     name: 'Jane Smith',
 *     url: 'https://example.com/author'
 *   },
 *   publisher: {
 *     name: 'Tech Blog',
 *     url: 'https://example.com'
 *   },
 *   dependencies: 'TypeScript 5.0+',
 *   proficiencyLevel: 'Advanced'
 * })
 * ```
 */
export function useSchemaTechArticle(data: TechArticleSchemaInput) {
  // author 변환: PersonSchemaInput | PersonSchemaInput[] -> PersonSchema | PersonSchema[]
  let author: PersonSchema | PersonSchema[] | undefined
  if (data.author) {
    if (Array.isArray(data.author)) {
      author = data.author.map(convertPersonInputToSchema)
    }
    else {
      author = convertPersonInputToSchema(data.author)
    }
  }

  // publisher 변환: OrganizationInput -> Organization
  const publisher: Organization | undefined = data.publisher
    ? {
        '@type': 'Organization',
        ...data.publisher,
      }
    : undefined

  // author와 publisher를 제외한 나머지 속성만 스프레드
  const { author: _author, publisher: _publisher, ...restData } = data

  const schema: TechArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    ...restData,
    ...(author && { author }),
    ...(publisher && { publisher }),
  } as TechArticleSchema

  // TechArticleSchema는 Omit을 통해 정의되어 TypeScript가 SchemaBase를 인식하지 못하므로 타입 단언 사용
  useSchema(schema as unknown as SchemaBase)
}
