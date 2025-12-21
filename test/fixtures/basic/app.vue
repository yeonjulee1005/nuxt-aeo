<template>
  <div>basic</div>
</template>

<script setup>
// Use composable to test that module is loaded correctly
import { useSchema } from '#imports'

// Add simple schema for testing
useSchema({
  context: 'https://schema.org',
  type: 'WebPage',
  name: 'Test Page',
})
</script>
