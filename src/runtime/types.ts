/**
 * Schema.org JSON-LD 타입 정의
 * AEO (Answer Engine Optimization)를 위한 Schema 타입들
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
 * Person Schema 입력 타입
 * 사용자가 입력하는 Person 데이터
 */
export interface PersonSchemaInput {
  name: string
  alternateName?: string
  jobTitle?: string
  url?: string
  image?: string | string[]
  knowsAbout?: string[]
  sameAs?: string[]
  email?: string
  telephone?: string
  address?: AddressInput
  worksFor?: OrganizationInput
  alumniOf?: OrganizationInput
  [key: string]: unknown
}

/**
 * Person Schema 타입
 * 완전한 Person Schema 구조
 */
export interface PersonSchema extends SchemaBase {
  '@type': 'Person'
  'name': string
  'alternateName'?: string
  'jobTitle'?: string
  'url'?: string
  'image'?: string | string[]
  'knowsAbout'?: string[]
  'sameAs'?: string[]
  'email'?: string
  'telephone'?: string
  'address'?: Address
  'worksFor'?: Organization
  'alumniOf'?: Organization
  [key: string]: unknown
}

/**
 * FAQPage Schema 입력 타입
 */
export interface FAQPageSchemaInput {
  mainEntity: QuestionInput[]
  [key: string]: unknown
}

/**
 * FAQPage Schema 타입
 */
export interface FAQPageSchema extends SchemaBase {
  '@type': 'FAQPage'
  'mainEntity': Question[]
  [key: string]: unknown
}

/**
 * Question 입력 타입
 */
export interface QuestionInput {
  name: string
  acceptedAnswer: AnswerInput
  [key: string]: unknown
}

/**
 * Question 타입
 */
export interface Question {
  '@type': 'Question'
  'name': string
  'acceptedAnswer': Answer
  [key: string]: unknown
}

/**
 * Answer 입력 타입
 */
export interface AnswerInput {
  text: string
  [key: string]: unknown
}

/**
 * Answer 타입
 */
export interface Answer {
  '@type': 'Answer'
  'text': string
  [key: string]: unknown
}

/**
 * ItemList Schema 입력 타입
 */
export interface ItemListSchemaInput {
  itemListElement: ListItemInput[]
  name?: string
  description?: string
  [key: string]: unknown
}

/**
 * ItemList Schema 타입
 */
export interface ItemListSchema extends SchemaBase {
  '@type': 'ItemList'
  'itemListElement': ListItem[]
  'name'?: string
  'description'?: string
  [key: string]: unknown
}

/**
 * ListItem 입력 타입
 */
export interface ListItemInput {
  position: number
  item: string | SchemaBase
  name?: string
  [key: string]: unknown
}

/**
 * ListItem 타입
 */
export interface ListItem {
  '@type': 'ListItem'
  'position': number
  'item': string | SchemaBase
  'name'?: string
  [key: string]: unknown
}

/**
 * Article Schema 입력 타입
 */
export interface ArticleSchemaInput {
  headline: string
  description?: string
  image?: string | string[]
  datePublished?: string
  dateModified?: string
  author?: PersonSchemaInput | PersonSchemaInput[]
  publisher?: OrganizationInput
  mainEntityOfPage?: string
  articleBody?: string
  [key: string]: unknown
}

/**
 * Article Schema 타입
 */
export interface ArticleSchema extends SchemaBase {
  '@type': 'Article' | 'TechArticle'
  'headline': string
  'description'?: string
  'image'?: string | string[]
  'datePublished'?: string
  'dateModified'?: string
  'author'?: PersonSchema | PersonSchema[]
  'publisher'?: Organization
  'mainEntityOfPage'?: string
  'articleBody'?: string
  [key: string]: unknown
}

/**
 * TechArticle Schema 입력 타입
 * Article을 확장한 기술 문서 타입
 */
export interface TechArticleSchemaInput extends ArticleSchemaInput {
  dependencies?: string
  proficiencyLevel?: string
  [key: string]: unknown
}

/**
 * TechArticle Schema 타입
 */
export interface TechArticleSchema extends Omit<ArticleSchema, '@type'> {
  '@type': 'TechArticle'
  'dependencies'?: string
  'proficiencyLevel'?: string
  [key: string]: unknown
}

/**
 * Organization 입력 타입
 */
export interface OrganizationInput {
  name: string
  url?: string
  logo?: string | string[]
  [key: string]: unknown
}

/**
 * Organization 타입
 */
export interface Organization {
  '@type': 'Organization'
  'name': string
  'url'?: string
  'logo'?: string | string[]
  [key: string]: unknown
}

/**
 * Address 입력 타입
 */
export interface AddressInput {
  streetAddress?: string
  addressLocality?: string
  addressRegion?: string
  postalCode?: string
  addressCountry?: string
  [key: string]: unknown
}

/**
 * Address 타입
 */
export interface Address {
  '@type': 'PostalAddress'
  'streetAddress'?: string
  'addressLocality'?: string
  'addressRegion'?: string
  'postalCode'?: string
  'addressCountry'?: string
  [key: string]: unknown
}
