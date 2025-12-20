import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { useSchema } from './composables/useSchema'
import type { GlobalSchema } from './types'

/**
 * AEO (AI Engine Optimization) 모듈 플러그인
 * 전역 스키마 정보를 자동으로 주입하는 플러그인
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const aeoConfig = config.public.aeo as {
    schemas?: GlobalSchema[]
    autoInject?: boolean
  }

  // autoInject가 false이면 주입하지 않음
  if (aeoConfig?.autoInject === false) {
    return
  }

  // schemas 배열이 있으면 주입
  if (aeoConfig?.schemas && Array.isArray(aeoConfig.schemas) && aeoConfig.schemas.length > 0) {
    for (const schema of aeoConfig.schemas) {
      // context가 없으면 기본값 추가
      useSchema({
        context: 'https://schema.org',
        ...schema,
      })
    }
  }
  else {
    // schemas가 없으면 기본 Project Schema 주입
    useSchema({
      context: 'https://schema.org',
      type: 'Project',
    })
  }
})
