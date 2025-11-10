<template>
  <button
    :class="[
      'btn',
      variantClass,
      sizeClass,
      {
        'btn-disabled': disabled,
        'btn-loading': loading
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

const variantClass = computed(() => `btn-${props.variant}`)
const sizeClass = computed(() => `btn-${props.size}`)

function handleClick(event) {
  if (props.disabled || props.loading) return
  emit('click', event)
}
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: 8px 20px;
  border-radius: 4px;
  font-size: var(--font-size-base);
  font-weight: 500;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.02em;
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
.btn-primary {
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  color: var(--color-text-primary);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
}

.btn-primary:hover:not(:disabled) {
  background: var(--glass-bg-medium);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  transform: translateY(-1px);
}

.btn-gradient {
  background: var(--gradient-primary);
  border: none;
  color: var(--color-text-primary);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.btn-gradient:hover:not(:disabled) {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
  filter: brightness(1.05);
}

.btn-success {
  background: var(--color-success);
  border: none;
  color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.btn-success:hover:not(:disabled) {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.btn-error {
  background: var(--color-error);
  border: none;
  color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.btn-error:hover:not(:disabled) {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

/* Matrix theme - tone down neon green */
[data-theme="matrix"] .btn-gradient {
  background: linear-gradient(135deg, #00AA00 0%, #00DD00 100%);
  filter: brightness(0.85);
}

[data-theme="matrix"] .btn-success {
  background: #00AA00;
  filter: brightness(0.9);
}

/* Neumorphism theme - boost button saturation */
[data-theme="neumorphism"] .btn-success {
  background: #2ecc71;
  color: white;
  filter: saturate(1.2);
}

[data-theme="neumorphism"] .btn-error {
  background: #e74c3c;
  color: white;
  filter: saturate(1.2);
}

.btn-outline {
  background: transparent;
  color: var(--color-accent-primary);
  border: 1px solid var(--color-accent-primary);
}

.btn-outline:hover:not(:disabled) {
  background: var(--color-accent-primary);
  color: var(--color-bg-primary);
}

/* Neumorphism theme overrides */
[data-theme="neumorphism"] .btn {
  background: var(--color-bg-primary);
  border: none;
  box-shadow: 4px 4px 8px rgba(163, 177, 198, 0.4),
              -4px -4px 8px rgba(255, 255, 255, 0.5);
}

[data-theme="neumorphism"] .btn:hover:not(:disabled) {
  box-shadow: 2px 2px 4px rgba(163, 177, 198, 0.4),
              -2px -2px 4px rgba(255, 255, 255, 0.5);
  transform: translateY(0);
}

[data-theme="neumorphism"] .btn:active:not(:disabled) {
  box-shadow: inset 2px 2px 4px rgba(163, 177, 198, 0.4),
              inset -2px -2px 4px rgba(255, 255, 255, 0.5);
}

[data-theme="neumorphism"] .btn-gradient {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 3px 3px 6px rgba(163, 177, 198, 0.4),
              -3px -3px 6px rgba(255, 255, 255, 0.3);
}

[data-theme="neumorphism"] .btn-outline {
  background: transparent;
  border: 1px solid var(--color-accent-primary);
  color: var(--color-accent-primary);
  box-shadow: none;
}

/* Size variants */
.btn-sm {
  padding: 6px 14px;
  font-size: var(--font-size-sm);
}

.btn-lg {
  padding: 10px 24px;
  font-size: var(--font-size-lg);
}

/* Disabled state */
.btn-disabled,
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Loading state */
.btn-loading {
  cursor: wait;
}
</style>
