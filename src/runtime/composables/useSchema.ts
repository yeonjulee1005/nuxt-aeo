/**
 * 범용 Schema composable
 * 모든 Schema 타입을 useHead에 추가하는 범용 함수
 */

import type { SchemaBase } from '../types'
import { useHead } from '#app'

/**
 * Schema.org JSON-LD를 페이지 head에 추가하는 범용 composable
 *
 * @param schema - SchemaBase를 확장한 모든 Schema 타입
 *
 * @example
 * ```ts
 * useSchema({
 *   '@context': 'https://schema.org',
 *   '@type': 'Person',
 *   name: 'John Doe'
 * })
 * ```
 */
export function useSchema(schema: SchemaBase) {
  // @context가 없으면 기본값으로 추가
  const schemaWithContext: SchemaBase = {
    ...schema,
    '@context': schema['@context'] ?? 'https://schema.org',
  }

  // useHead를 사용하여 JSON-LD 스크립트 태그 추가
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schemaWithContext, null, 2),
      },
    ],
  })
}
