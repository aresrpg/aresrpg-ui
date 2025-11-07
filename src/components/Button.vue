<template>
  <button
    :class="[
      'btn',
      variantClass,
      sizeClass,
      {
        'btn-disabled': disabled
      }
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

/**
 * Glass morphism button component
 * @param {string} variant - Button style variant (primary/gradient/success/error/outline)
 * @param {string} size - Button size (sm/md/lg)
 * @param {boolean} disabled - Disabled state
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
  }
})

const emit = defineEmits(['click'])

const variantClass = computed(() => `btn-${props.variant}`)
const sizeClass = computed(() => `btn-${props.size}`)

/**
 * Handle button click
 * @param {Event} event - Click event
 */
function handleClick(event) {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  font-weight: 900;
  text-decoration: none;
  text-transform: uppercase;
  border: 1px solid var(--glass-border);
  cursor: pointer;
  transition: all var(--transition-base);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Adjust text shadow for dark themes only */
[data-theme="dark"] .btn,
[data-theme="blue"] .btn,
[data-theme="matrix"] .btn {
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}

/* No text shadow on light themes for crisp text */
[data-theme="white"] .btn {
  text-shadow: none;
}

/* Matrix theme button contrast fixes - AGGRESSIVE */
[data-theme="matrix"] .btn-gradient,
[data-theme="matrix"] .btn-success,
[data-theme="matrix"] .btn-error,
[data-theme="matrix"] .btn-primary {
  color: var(--color-bg-primary) !important;
  text-shadow: 0 1px 3px rgba(0, 255, 65, 0.8) !important;
  font-weight: 900;
}

[data-theme="matrix"] .btn-outline {
  background: rgba(0, 0, 0, 0.5);
  border-color: var(--color-accent-primary);
}

[data-theme="matrix"] .btn-outline:hover {
  background: var(--color-accent-primary);
  color: var(--color-bg-primary) !important;
  text-shadow: none !important;
}

/* Neumorphism theme - Soft extruded buttons */
[data-theme="neumorphism"] .btn {
  background: var(--color-bg-primary);
  border: none;
  text-shadow: none;
  box-shadow: 8px 8px 16px rgba(163, 177, 198, 0.6), -8px -8px 16px rgba(255, 255, 255, 0.5);
}

[data-theme="neumorphism"] .btn:hover {
  box-shadow: 4px 4px 8px rgba(163, 177, 198, 0.6), -4px -4px 8px rgba(255, 255, 255, 0.5);
  transform: translateY(0);
}

[data-theme="neumorphism"] .btn:active {
  box-shadow: inset 4px 4px 8px rgba(163, 177, 198, 0.5), inset -4px -4px 8px rgba(255, 255, 255, 0.5);
}

[data-theme="neumorphism"] .btn-gradient {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 6px 6px 12px rgba(163, 177, 198, 0.6), -6px -6px 12px rgba(255, 255, 255, 0.5);
}

[data-theme="neumorphism"] .btn-outline {
  background: transparent;
  border: 2px solid var(--color-accent-primary);
  color: var(--color-accent-primary);
  box-shadow: none;
}

[data-theme="neumorphism"] .btn-outline:hover {
  background: var(--color-bg-primary);
  box-shadow: inset 2px 2px 4px rgba(163, 177, 198, 0.3), inset -2px -2px 4px rgba(255, 255, 255, 0.3);
}

.btn-primary {
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  color: var(--color-text-primary);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05),
              var(--shadow-md);
}

.btn-primary:hover {
  background: var(--glass-bg-medium);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1),
              var(--shadow-lg);
  transform: translateY(-3px);
}

.btn-gradient {
  background: var(--gradient-primary);
  border: none;
  color: var(--color-text-primary);
  box-shadow: var(--shadow-md);
}

.btn-gradient:hover {
  box-shadow: var(--glow-primary),
              0 8px 16px rgba(0, 0, 0, 0.4);
  transform: translateY(-3px) scale(1.02);
  filter: brightness(1.05);
}

.btn-success {
  background: var(--color-success);
  border: none;
  color: var(--color-text-primary);
}

.btn-success:hover {
  box-shadow: 0 0 20px rgba(46, 204, 113, 0.3);
  transform: translateY(-3px);
}

.btn-error {
  background: var(--color-error);
  border: none;
  color: var(--color-text-primary);
}

.btn-error:hover {
  box-shadow: 0 0 20px rgba(239, 83, 80, 0.3);
  transform: translateY(-3px);
}

.btn-outline {
  background: transparent;
  color: var(--color-accent-primary);
  border-color: var(--color-accent-primary);
}

.btn-outline:hover {
  background: var(--color-accent-primary);
  color: var(--color-bg-primary);
}

.btn-sm {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: var(--font-size-sm);
}

.btn-lg {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-lg);
}

.btn-disabled,
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
