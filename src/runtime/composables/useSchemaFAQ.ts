/**
 * FAQPage Schema 헬퍼 composable
 * FAQPage Schema를 쉽게 추가할 수 있는 타입 안전한 헬퍼 함수
 */

import type {
  Answer,
  AnswerInput,
  FAQPageSchema,
  FAQPageSchemaInput,
  Question,
  QuestionInput,
} from '../types'
import { useSchema } from './useSchema'

/**
 * FAQPage Schema를 페이지 head에 추가하는 composable
 *
 * @param data - FAQPage Schema 입력 데이터
 *
 * @example
 * ```ts
 * useSchemaFAQ({
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
 *   ]
 * })
 * ```
 */
export function useSchemaFAQ(data: FAQPageSchemaInput) {
  // QuestionInput 배열을 Question 배열로 변환
  const mainEntity: Question[] = data.mainEntity.map((questionInput: QuestionInput) => {
    // AnswerInput을 Answer로 변환
    const answerInput: AnswerInput = questionInput.acceptedAnswer
    const acceptedAnswer: Answer = {
      '@type': 'Answer',
      ...answerInput,
    }

    // QuestionInput의 acceptedAnswer를 제외한 나머지 속성만 스프레드
    const { acceptedAnswer: _acceptedAnswer, ...restQuestion } = questionInput

    return {
      '@type': 'Question',
      ...restQuestion,
      acceptedAnswer,
    } as Question
  })

  // mainEntity를 제외한 나머지 속성만 스프레드
  const { mainEntity: _mainEntity, ...restData } = data

  const schema: FAQPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...restData,
    mainEntity,
  } as FAQPageSchema

  useSchema(schema)
}
