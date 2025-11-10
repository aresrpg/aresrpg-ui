<template>
  <button
    ref="buttonRef"
    :class="[
      'enhanced-btn',
      variantClass,
      sizeClass,
      {
        'enhanced-btn-disabled': disabled,
        'enhanced-btn-loading': loading
      }
    ]"
    :disabled="disabled || loading"
    :style="cursorGlowStyle"
    @click="handleClick"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Ripple effect container -->
    <span
      v-for="ripple in ripples"
      :key="ripple.id"
      class="ripple"
      :style="{
        left: ripple.x + 'px',
        top: ripple.y + 'px'
      }"
    ></span>

    <!-- Loading spinner -->
    <span v-if="loading" class="spinner"></span>

    <!-- Button content -->
    <span :class="{ 'content-loading': loading }">
      <slot />
    </span>
  </button>
</template>

<script setup>
import { ref, computed } from 'vue'

/**
 * Enhanced glassmorphism button with 2025 design trends
 * Features: ripple effects, cursor-tracking glow, pulse animations
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

const buttonRef = ref(null)
const ripples = ref([])
const cursorX = ref(0)
const cursorY = ref(0)
const isHovered = ref(false)

const variantClass = computed(() => `enhanced-btn-${props.variant}`)
const sizeClass = computed(() => `enhanced-btn-${props.size}`)

// Cursor-tracking glow effect
const cursorGlowStyle = computed(() => {
  if (!isHovered.value) return {}
  return {
    '--cursor-x': `${cursorX.value}px`,
    '--cursor-y': `${cursorY.value}px`
  }
})

/**
 * Handle mouse move for cursor tracking
 */
function handleMouseMove(event) {
  if (!buttonRef.value) return
  const rect = buttonRef.value.getBoundingClientRect()
  cursorX.value = event.clientX - rect.left
  cursorY.value = event.clientY - rect.top
  isHovered.value = true
}

/**
 * Reset cursor tracking on mouse leave
 */
function handleMouseLeave() {
  isHovered.value = false
}

/**
 * Handle button click with ripple effect
 */
function handleClick(event) {
  if (props.disabled || props.loading) return

  // Create ripple effect
  if (buttonRef.value) {
    const rect = buttonRef.value.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const rippleId = Date.now()

    ripples.value.push({ id: rippleId, x, y })

    // Remove ripple after animation
    setTimeout(() => {
      ripples.value = ripples.value.filter(r => r.id !== rippleId)
    }, 600)
  }

  emit('click', event)
}
</script>

<style scoped>
.enhanced-btn {
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Cursor-tracking glow effect */
.enhanced-btn::before {
  content: '';
  position: absolute;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  left: var(--cursor-x, 50%);
  top: var(--cursor-y, 50%);
  transform: translate(-50%, -50%);
  mix-blend-mode: soft-light;
}

.enhanced-btn:hover::before {
  opacity: 1;
}

/* Pulse animation on hover */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

.enhanced-btn:hover {
  animation: pulse 2s ease-in-out infinite;
}

/* Ripple effect */
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  width: 10px;
  height: 10px;
  transform: translate(-50%, -50%) scale(0);
  animation: ripple-animation 0.6s ease-out;
  pointer-events: none;
}

@keyframes ripple-animation {
  to {
    transform: translate(-50%, -50%) scale(20);
    opacity: 0;
  }
}

/* Loading spinner */
.spinner {
  width: 16px;
  height: 16px;
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
.enhanced-btn-primary {
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  color: var(--color-text-primary);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05), var(--shadow-md);
}

.enhanced-btn-primary:hover:not(:disabled) {
  background: var(--glass-bg-medium);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1),
              var(--shadow-lg),
              0 0 30px rgba(255, 202, 40, 0.3);
  transform: translateY(-2px);
}

.enhanced-btn-gradient {
  background: var(--gradient-primary);
  border: none;
  color: var(--color-text-primary);
  box-shadow: var(--shadow-md);
}

.enhanced-btn-gradient:hover:not(:disabled) {
  box-shadow: var(--glow-primary),
              0 8px 24px rgba(0, 0, 0, 0.4),
              0 0 40px rgba(255, 202, 40, 0.5);
  transform: translateY(-2px) scale(1.02);
  filter: brightness(1.1);
}

.enhanced-btn-success {
  background: var(--color-success);
  border: none;
  color: white;
}

.enhanced-btn-success:hover:not(:disabled) {
  box-shadow: 0 0 30px rgba(46, 204, 113, 0.5),
              var(--shadow-lg);
  transform: translateY(-2px);
}

.enhanced-btn-error {
  background: var(--color-error);
  border: none;
  color: white;
}

.enhanced-btn-error:hover:not(:disabled) {
  box-shadow: 0 0 30px rgba(239, 83, 80, 0.5),
              var(--shadow-lg);
  transform: translateY(-2px);
}

.enhanced-btn-outline {
  background: transparent;
  color: var(--color-accent-primary);
  border: 2px solid var(--color-accent-primary);
}

.enhanced-btn-outline:hover:not(:disabled) {
  background: var(--color-accent-primary);
  color: var(--color-bg-primary);
  box-shadow: 0 0 20px rgba(255, 202, 40, 0.4);
}

/* Size variants */
.enhanced-btn-sm {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: var(--font-size-sm);
}

.enhanced-btn-lg {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-lg);
}

/* Disabled state */
.enhanced-btn-disabled,
.enhanced-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
  animation: none;
}

/* Loading state */
.enhanced-btn-loading {
  cursor: wait;
  animation: none;
}
</style>
