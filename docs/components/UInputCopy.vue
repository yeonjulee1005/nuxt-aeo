<script setup lang="ts">
const { copy, copied } = useClipboard()

withDefaults(
  defineProps<{
    value?: string
  }>(),
  {
    value: '',
  },
)
</script>

<template>
  <UInput
    :model-value="value"
    readonly
    :ui="{ trailing: 'pr-0.5' }"
  >
    <template #trailing>
      <UTooltip
        :text="copied ? 'Copied!' : 'Copy to clipboard'"
        :content="{ side: 'right' }"
      >
        <UButton
          :color="copied ? 'primary' : 'neutral'"
          variant="link"
          size="sm"
          :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
          aria-label="Copy to clipboard"
          @click="copy(value)"
        />
      </UTooltip>
    </template>
  </UInput>
</template>
