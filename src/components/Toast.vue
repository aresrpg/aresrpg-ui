<template>
  <Transition name="toast-slide">
    <div
      v-if="modelValue"
      class="toast"
      :class="`toast-${variant}`"
      role="alert"
      aria-live="polite"
    >
        <i class="toast-icon" :class="iconClass"></i>
        <div class="toast-content">
          <strong v-if="title" class="toast-title">{{ title }}</strong>
          <p class="toast-message"><slot>{{ message }}</slot></p>
        </div>
        <button
          v-if="closable"
          class="toast-close"
          aria-label="Close notification"
          @click="close"
        >
          <i class="bx bx-x"></i>
        </button>
      </div>
    </Transition>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'

/**
 * Toast notification component
 * @param {boolean} modelValue - v-model for visibility
 * @param {string} variant - Toast variant (success/error/warning/info)
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 * @param {boolean} closable - Show close button
 * @param {number} duration - Auto-dismiss duration in ms (0 = no auto-dismiss)
 */
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  variant: { type: String, default: 'info', validator: v => ['success', 'error', 'warning', 'info'].includes(v) },
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  closable: { type: Boolean, default: true },
  duration: { type: Number, default: 5000 }
})

const emit = defineEmits(['update:modelValue', 'close'])

const iconClass = computed(() => ({
  success: 'bx bx-check-circle',
  error: 'bx bx-error-circle',
  warning: 'bx bx-error',
  info: 'bx bx-info-circle'
}[props.variant]))

let timer = null

onMounted(() => {
  if (props.duration > 0 && props.modelValue) {
    timer = setTimeout(close, props.duration)
  }
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})

function close() {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<style scoped>
.toast {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  min-width: 300px;
  max-width: 400px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-left: 4px solid currentColor;
  border-radius: var(--radius-md);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.toast-success { color: var(--color-success); }
.toast-error { color: var(--color-error); }
.toast-warning { color: var(--color-warning); }
.toast-info { color: var(--color-info); }

.toast-icon {
  font-size: 1.5em;
  flex-shrink: 0;
}

.toast-content {
  flex: 1;
}

.toast-title {
  display: block;
  font-weight: 700;
  margin-bottom: var(--spacing-xs);
  color: var(--color-text-primary);
}

.toast-message {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin: 0;
}

.toast-close {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  font-size: 1.5em;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-fast);
}

.toast-close:hover {
  color: var(--color-text-primary);
  transform: scale(1.1);
}

/* Enhanced Animations */
.toast-slide-enter-active {
  animation: toast-bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toast-slide-leave-active {
  animation: toast-slide-out 0.3s cubic-bezier(0.4, 0, 1, 1);
}

/* Toast icon pulse animation */
.toast-icon {
  animation: icon-pulse 0.8s ease-in-out;
}

/* Error shake animation */
.toast-error {
  animation: toast-shake 0.5s ease-in-out;
}

@keyframes toast-bounce-in {
  0% {
    opacity: 0;
    transform: translateX(400px) scale(0.8);
  }
  50% {
    transform: translateX(-10px) scale(1.02);
  }
  70% {
    transform: translateX(5px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes toast-slide-out {
  0% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateX(100px) scale(0.95);
  }
}

@keyframes icon-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

@keyframes toast-shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

/* Hover effects */
.toast:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  transition: all var(--transition-fast);
}
</style>
