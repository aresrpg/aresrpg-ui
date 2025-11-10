<template>
  <button
    :class="[
      'refined-btn',
      variantClass,
      sizeClass,
      {
        'refined-btn-disabled': disabled,
        'refined-btn-loading': loading
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- Loading spinner -->
    <span v-if="loading" class="spinner"></span>

    <!-- Button content -->
    <span :class="{ 'content-loading': loading }">
      <slot />
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

/**
 * Refined button with subtle improvements
 * Clean design with thin borders, better spacing, and refined shadows
 * @param {string} variant - Button style variant (primary/gradient/success/error/outline)
 * @param {string} size - Button size (sm/md/lg)
 * @param {boolean} disabled - Disabled state
 * @param {boolean} loading - Loading state with spinner
 */
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'gradient', 'success', 'error', 'outline'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const variantClass = computed(() => `refined-btn-${props.variant}`)
const sizeClass = computed(() => `refined-btn-${props.size}`)

function handleClick(event) {
  if (props.disabled || props.loading) return
  emit('click', event)
}
</script>

<style scoped>
.refined-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid var(--glass-border);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  position: relative;
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Loading spinner */
.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  position: absolute;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.content-loading {
  opacity: 0.5;
}

/* Variant styles */
.refined-btn-primary {
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  color: var(--color-text-primary);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
              inset 0 0 0 1px rgba(255, 255, 255, 0.05);
}

.refined-btn-primary:hover:not(:disabled) {
  background: var(--glass-bg-medium);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15),
              inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  transform: translateY(-1px);
}

.refined-btn-gradient {
  background: var(--gradient-primary);
  border: none;
  color: var(--color-text-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.refined-btn-gradient:hover:not(:disabled) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-1px);
  filter: brightness(1.05);
}

.refined-btn-success {
  background: var(--color-success);
  border: none;
  color: white;
  box-shadow: 0 2px 8px rgba(46, 204, 113, 0.25);
}

.refined-btn-success:hover:not(:disabled) {
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
  transform: translateY(-1px);
}

.refined-btn-error {
  background: var(--color-error);
  border: none;
  color: white;
  box-shadow: 0 2px 8px rgba(239, 83, 80, 0.25);
}

.refined-btn-error:hover:not(:disabled) {
  box-shadow: 0 4px 12px rgba(239, 83, 80, 0.3);
  transform: translateY(-1px);
}

.refined-btn-outline {
  background: transparent;
  color: var(--color-accent-primary);
  border: 1px solid var(--color-accent-primary);
}

.refined-btn-outline:hover:not(:disabled) {
  background: var(--color-accent-primary);
  color: var(--color-bg-primary);
}

/* Neumorphism theme overrides */
[data-theme="neumorphism"] .refined-btn {
  background: var(--color-bg-primary);
  border: none;
  box-shadow: 4px 4px 8px rgba(163, 177, 198, 0.4),
              -4px -4px 8px rgba(255, 255, 255, 0.5);
}

[data-theme="neumorphism"] .refined-btn:hover:not(:disabled) {
  box-shadow: 2px 2px 4px rgba(163, 177, 198, 0.4),
              -2px -2px 4px rgba(255, 255, 255, 0.5);
  transform: translateY(0);
}

[data-theme="neumorphism"] .refined-btn:active:not(:disabled) {
  box-shadow: inset 2px 2px 4px rgba(163, 177, 198, 0.4),
              inset -2px -2px 4px rgba(255, 255, 255, 0.5);
}

[data-theme="neumorphism"] .refined-btn-gradient {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 3px 3px 6px rgba(163, 177, 198, 0.4),
              -3px -3px 6px rgba(255, 255, 255, 0.3);
}

[data-theme="neumorphism"] .refined-btn-outline {
  background: transparent;
  border: 1px solid var(--color-accent-primary);
  color: var(--color-accent-primary);
  box-shadow: none;
}

/* Size variants */
.refined-btn-sm {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: var(--font-size-sm);
}

.refined-btn-lg {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-lg);
}

/* Disabled state */
.refined-btn-disabled,
.refined-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Loading state */
.refined-btn-loading {
  cursor: wait;
}
</style>
