import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { useSchemaPerson } from './composables/useSchemaPerson'

/**
 * AEO 모듈 플러그인
 * 전역 Person 정보를 자동으로 주입하는 플러그인
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const aeoConfig = config.public.aeo as {
    person?: Parameters<typeof useSchemaPerson>[0]
    autoInject?: boolean
  }

  // autoInject가 true이고 person 정보가 설정된 경우에만 자동 주입
  if (aeoConfig?.autoInject !== false && aeoConfig?.person) {
    useSchemaPerson(aeoConfig.person)
  }
})
