<template>
  <span :class="['badge', variantClass]">
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

/**
 * Badge component for labels and statuses
 * @param {string} variant - Badge color variant (primary/success/error/warning/info)
 */
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'success', 'error', 'warning', 'info'].includes(value)
  }
})

const variantClass = computed(() => `badge-${props.variant}`)
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-xl);
  font-size: var(--font-size-xs);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--glass-bg);
  backdrop-filter: blur(25px) saturate(180%);
  border: 1px solid;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);
}

.badge-primary {
  border-color: var(--color-accent-primary);
  color: var(--color-accent-primary);
}

.badge-success {
  border-color: var(--color-success);
  color: var(--color-success);
}

.badge-error {
  border-color: var(--color-error);
  color: var(--color-error);
}

.badge-warning {
  border-color: var(--color-warning);
  color: var(--color-warning);
}

.badge-info {
  border-color: var(--color-info);
  color: var(--color-info);
}
</style>
