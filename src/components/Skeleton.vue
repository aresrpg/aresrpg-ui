<template>
  <div
    class="skeleton"
    :class="[
      `skeleton-${variant}`,
      { 'skeleton-animated': animated }
    ]"
    :style="style"
    role="status"
    aria-label="Loading..."
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

/**
 * Skeleton loader component for loading states
 * @param {string} variant - Skeleton variant (text/circle/rectangle/card)
 * @param {string|number} width - Width (px or %)
 * @param {string|number} height - Height (px or %)
 * @param {boolean} animated - Enable shimmer animation
 */
const props = defineProps({
  variant: {
    type: String,
    default: 'text',
    validator: v => ['text', 'circle', 'rectangle', 'card'].includes(v)
  },
  width: {
    type: [String, Number],
    default: null
  },
  height: {
    type: [String, Number],
    default: null
  },
  animated: {
    type: Boolean,
    default: true
  }
})

const style = computed(() => {
  const s = {}
  if (props.width) {
    s.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  if (props.height) {
    s.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return s
})
</script>

<style scoped>
.skeleton {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  overflow: hidden;
  position: relative;
}

.skeleton-text {
  height: 1em;
  border-radius: var(--radius-sm);
  width: 100%;
}

.skeleton-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.skeleton-rectangle {
  border-radius: var(--radius-md);
  width: 100%;
  height: 100px;
}

.skeleton-card {
  border-radius: var(--radius-lg);
  width: 100%;
  height: 200px;
}

/* Shimmer animation */
.skeleton-animated::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Screen reader only text */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
