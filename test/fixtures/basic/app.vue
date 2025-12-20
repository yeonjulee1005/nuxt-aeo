<template>
  <div>basic</div>
</template>

<script setup>
// 모듈이 정상적으로 로드되었는지 테스트하기 위해 composable 사용
import { useSchema } from '#imports'

// 테스트용 간단한 스키마 추가
useSchema({
  context: 'https://schema.org',
  type: 'WebPage',
  name: 'Test Page',
})
</script>
