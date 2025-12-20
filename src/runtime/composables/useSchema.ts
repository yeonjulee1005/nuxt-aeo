/**
 * 범용 Schema composable
 * 모든 Schema 타입을 useHead에 추가하는 범용 함수
 */

import { useHead } from '#app'

/**
 * 객체의 키를 재귀적으로 변환하는 헬퍼 함수
 * context → @context, type → @type
 */
function transformSchemaKeys(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    // 키 변환: context → @context, type → @type
    const transformedKey = key === 'context' ? '@context' : key === 'type' ? '@type' : key

    // 값이 객체이고 배열이 아니면 재귀적으로 변환
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[transformedKey] = transformSchemaKeys(value as Record<string, unknown>)
    }
    // 값이 배열이면 각 요소를 확인하여 변환
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
 * Schema.org JSON-LD를 페이지 head에 추가하는 범용 composable
 *
 * @param schema - Schema 객체 (context, type을 사용할 수 있음)
 *
 * @example
 * ```ts
 * useSchema({
 *   context: 'https://schema.org',
 *   type: 'Person',
 *   name: 'John Doe'
 * })
 * ```
 */
export function useSchema(schema: Record<string, unknown>) {
  // context, type을 @context, @type으로 변환
  const transformedSchema = transformSchemaKeys(schema)

  // @context가 없으면 기본값으로 추가
  const schemaWithContext = {
    '@context': transformedSchema['@context'] ?? 'https://schema.org',
    ...transformedSchema,
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
