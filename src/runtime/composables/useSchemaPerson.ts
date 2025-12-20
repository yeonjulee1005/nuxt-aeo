/**
 * Person Schema 헬퍼 composable
 * Person Schema를 쉽게 추가할 수 있는 타입 안전한 헬퍼 함수
 */

import type { Address, Organization, PersonSchema, PersonSchemaInput } from '../types'
import { useSchema } from './useSchema'

/**
 * Person Schema를 페이지 head에 추가하는 composable
 *
 * @param data - Person Schema 입력 데이터
 *
 * @example
 * ```ts
 * useSchemaPerson({
 *   name: 'John Doe',
 *   alternateName: 'JD',
 *   jobTitle: 'Software Engineer',
 *   url: 'https://example.com',
 *   image: 'https://example.com/profile.jpg',
 *   knowsAbout: ['TypeScript', 'Nuxt'],
 *   sameAs: ['https://github.com/johndoe']
 * })
 * ```
 */
export function useSchemaPerson(data: PersonSchemaInput) {
  // 중첩 객체 변환: Input 타입을 Schema 타입으로 변환
  const address: Address | undefined = data.address
    ? {
        '@type': 'PostalAddress',
        ...data.address,
      }
    : undefined

  const worksFor: Organization | undefined = data.worksFor
    ? {
        '@type': 'Organization',
        ...data.worksFor,
      }
    : undefined

  const alumniOf: Organization | undefined = data.alumniOf
    ? {
        '@type': 'Organization',
        ...data.alumniOf,
      }
    : undefined

  // address, worksFor, alumniOf를 제외한 나머지 속성만 스프레드
  const { address: _address, worksFor: _worksFor, alumniOf: _alumniOf, ...restData } = data

  const schema: PersonSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    ...restData,
    ...(address && { address }),
    ...(worksFor && { worksFor }),
    ...(alumniOf && { alumniOf }),
  } as PersonSchema

  useSchema(schema)
}
