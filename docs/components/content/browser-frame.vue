<template>
  <div class="browser-frame">
    <div class="browser-frame-header">
      <div class="browser-frame-controls">
        <span class="browser-frame-dot browser-frame-dot-red" />
        <span class="browser-frame-dot browser-frame-dot-yellow" />
        <span class="browser-frame-dot browser-frame-dot-green" />
      </div>
      <div class="browser-frame-url">
        <slot name="url">
          example.com
        </slot>
      </div>
    </div>
    <div class="browser-frame-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.browser-frame {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.browser-frame-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
}

.browser-frame-controls {
  display: flex;
  gap: 0.5rem;
}

.browser-frame-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.browser-frame-dot-red {
  background: #ef4444;
}

.browser-frame-dot-yellow {
  background: #f59e0b;
}

.browser-frame-dot-green {
  background: #10b981;
}

.browser-frame-url {
  flex: 1;
  font-size: 0.75rem;
  color: #718096;
  text-align: center;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.browser-frame-content {
  padding: 1.5rem;
  background: white;
}
</style>
