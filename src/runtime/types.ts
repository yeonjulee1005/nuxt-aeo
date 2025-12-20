/**
 * Schema.org JSON-LD 타입 정의
 * AEO (AI Engine Optimization)를 위한 Schema 타입들
 */

/**
 * 기본 Schema 인터페이스
 * 모든 Schema 타입은 이 인터페이스를 확장합니다.
 */
export interface SchemaBase {
  '@context': 'https://schema.org' | string
  '@type': string
  '@id'?: string
}

/**
 * FAQPage Schema 타입
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
 * 전역으로 주입할 스키마 설정
 * 모든 페이지에 자동으로 주입될 Schema 정보
 * context와 type을 사용하면 내부적으로 @context와 @type으로 자동 변환됩니다
 */
export type GlobalSchema = {
  context?: 'https://schema.org' | string
  type: string
  [key: string]: unknown
}

/**
 * Nuxt 모듈 설정 옵션 타입
 */
export interface ModuleOptions {
  /**
   * 전역으로 주입할 스키마 배열
   * 모든 페이지에 자동으로 주입될 Schema 정보들
   * Person, Organization, WebSite 등 다양한 스키마 타입을 설정할 수 있습니다.
   * context와 type을 사용하면 내부적으로 @context와 @type으로 자동 변환됩니다.
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
   * 자동 주입 여부
   * @default true
   * false인 경우, schemas 배열이 있어도 주입하지 않습니다.
   * schemas 배열이 없으면 기본 Project Schema가 주입됩니다.
   */
  autoInject?: boolean
}

/**
 * Nuxt Config 타입 확장
 */
declare module '@nuxt/schema' {
  interface NuxtConfig {
    aeo?: ModuleOptions
  }
}
