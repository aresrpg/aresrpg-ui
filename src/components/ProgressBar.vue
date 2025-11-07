<template>
  <div class="progress-bar-container">
    <div v-if="label" class="progress-label">
      <span>{{ label }}</span>
      <span v-if="showValue" class="progress-value">{{ value }}%</span>
    </div>
    <div
      class="progress-bar"
      :class="[`progress-${variant}`, { 'progress-animated': animated }]"
      role="progressbar"
      :aria-valuenow="value"
      :aria-valuemin="0"
      :aria-valuemax="100"
      :aria-label="label || 'Progress'"
    >
      <div
        class="progress-fill"
        :style="{ width: `${clampedValue}%` }"
      >
        <div v-if="striped" class="progress-stripes"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

/**
 * Progress bar component with glassmorphism design
 * Displays progress with optional label, gradients, and animations
 *
 * @param {number} value - Progress value (0-100)
 * @param {string} variant - Visual style (primary, success, error, warning, gradient)
 * @param {string} label - Optional label text
 * @param {boolean} showValue - Show percentage value
 * @param {boolean} striped - Show animated stripes
 * @param {boolean} animated - Enable smooth animation
 */
const props = defineProps({
  value: {
    type: Number,
    default: 0,
    validator: (val) => val >= 0 && val <= 100
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (val) => ['primary', 'success', 'error', 'warning', 'gradient'].includes(val)
  },
  label: {
    type: String,
    default: ''
  },
  showValue: {
    type: Boolean,
    default: false
  },
  striped: {
    type: Boolean,
    default: false
  },
  animated: {
    type: Boolean,
    default: true
  }
})

const clampedValue = computed(() => Math.max(0, Math.min(100, props.value)))
</script>

<style scoped>
.progress-bar-container {
  width: 100%;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xs);
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}

.progress-value {
  color: var(--color-accent-primary);
  font-weight: 700;
}

.progress-bar {
  position: relative;
  width: 100%;
  height: 12px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.progress-fill {
  height: 100%;
  position: relative;
  border-radius: var(--radius-full);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.progress-animated .progress-fill {
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Variant styles */
.progress-primary .progress-fill {
  background: var(--color-accent-primary);
  box-shadow: 0 0 10px var(--color-accent-primary);
}

.progress-success .progress-fill {
  background: var(--color-success);
  box-shadow: 0 0 10px var(--color-success);
}

.progress-error .progress-fill {
  background: var(--color-error);
  box-shadow: 0 0 10px var(--color-error);
}

.progress-warning .progress-fill {
  background: var(--color-warning);
  box-shadow: 0 0 10px var(--color-warning);
}

.progress-gradient .progress-fill {
  background: var(--gradient-primary);
  box-shadow: var(--glow-primary);
}

/* Striped animation */
.progress-stripes {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 20px 20px;
  animation: progress-stripes 1s linear infinite;
}

@keyframes progress-stripes {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 20px 20px;
  }
}
</style>
