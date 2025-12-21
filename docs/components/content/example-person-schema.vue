<script setup lang="ts">
interface Props {
  name?: string
  jobTitle?: string
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  name: 'John Doe',
  jobTitle: undefined,
  title: undefined,
  description: undefined,
})
</script>

<template>
  <div class="example-person-schema">
    <div class="person-card">
      <div class="person-header">
        <h3
          v-if="title || $slots.title"
          class="person-title"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </h3>
        <p
          v-if="description || $slots.description"
          class="person-description"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </p>
      </div>

      <div class="person-content">
        <div class="person-info">
          <div class="person-name">
            <strong>Name:</strong> {{ name || 'John Doe' }}
          </div>
          <div
            v-if="jobTitle"
            class="person-job"
          >
            <strong>Job Title:</strong> {{ jobTitle }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.example-person-schema {
  padding: 1rem;
}

.person-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.person-header {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.person-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #1a202c;
}

.person-description {
  font-size: 0.875rem;
  color: #718096;
  margin: 0;
  line-height: 1.5;
}

.person-content {
  margin-top: 1rem;
}

.person-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.person-name,
.person-job {
  font-size: 0.9375rem;
  color: #2d3748;
  line-height: 1.5;
}

.person-name strong,
.person-job strong {
  color: #1a202c;
  font-weight: 600;
  margin-right: 0.5rem;
}
</style>
