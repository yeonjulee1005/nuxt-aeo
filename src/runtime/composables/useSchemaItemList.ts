/**
 * ItemList Schema 헬퍼 composable
 * ItemList Schema를 쉽게 추가할 수 있는 타입 안전한 헬퍼 함수
 */

import type { ItemListSchema, ItemListSchemaInput, ListItem, ListItemInput } from '../types'
import { useSchema } from './useSchema'

/**
 * ItemList Schema를 페이지 head에 추가하는 composable
 *
 * @param data - ItemList Schema 입력 데이터
 *
 * @example
 * ```ts
 * useSchemaItemList({
 *   name: 'Top 10 Programming Languages',
 *   description: 'The most popular programming languages in 2024',
 *   itemListElement: [
 *     {
 *       position: 1,
 *       name: 'JavaScript',
 *       item: 'https://example.com/javascript'
 *     },
 *     {
 *       position: 2,
 *       name: 'Python',
 *       item: 'https://example.com/python'
 *     }
 *   ]
 * })
 * ```
 */
export function useSchemaItemList(data: ItemListSchemaInput) {
  // ListItemInput 배열을 ListItem 배열로 변환
  const itemListElement: ListItem[] = data.itemListElement.map((itemInput: ListItemInput) => {
    // itemInput의 모든 속성을 가져오되, @type은 추가
    const { position, item, name, ...restItem } = itemInput

    return {
      '@type': 'ListItem',
      position,
      item,
      ...(name && { name }),
      ...restItem,
    } as ListItem
  })

  // itemListElement를 제외한 나머지 속성만 스프레드
  const { itemListElement: _itemListElement, ...restData } = data

  const schema: ItemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    ...restData,
    itemListElement,
  } as ItemListSchema

  useSchema(schema)
}
