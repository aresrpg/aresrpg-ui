<template>
  <transition name="notification-slide">
    <div
      v-if="visible"
      class="notification"
      :class="[`notification-${color}`, { flat, square, loading }]"
      :style="{ width: computedWidth }"
      role="alert"
    >
      <!-- Icon -->
      <div v-if="!loading" class="notification-icon">
        <i v-if="typeof icon === 'string'" v-html="icon"></i>
        <component v-else-if="icon" :is="icon" />
        <i v-else :class="defaultIcon"></i>
      </div>

      <!-- Loading spinner -->
      <div v-if="loading" class="notification-loading">
        <div class="spinner"></div>
      </div>

      <!-- Content -->
      <div class="notification-content">
        <div v-if="title" class="notification-title">{{ title }}</div>
        <div class="notification-text">
          <slot>{{ content }}</slot>
        </div>
      </div>

      <!-- Close button -->
      <button
        v-if="buttonClose && !loading"
        class="notification-close"
        @click="close"
        aria-label="Close notification"
      >
        <i class="bx bx-x"></i>
      </button>

      <!-- Progress bar -->
      <div
        v-if="progress !== null"
        class="notification-progress"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

/**
 * Vuesax-style Notification Component
 *
 * @component Notification
 * @description Toast notification with vuesax styling and animations
 *
 * @param {string} color - Notification color: 'primary' | 'success' | 'danger' | 'warning' | 'dark' | 'info'
 * @param {string} title - Notification title
 * @param {string} content - Notification text content
 * @param {string|Component} icon - Icon (HTML string, component, or boxicons class)
 * @param {string} position - Position: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'
 * @param {number|string} duration - Auto-close duration in ms, or 'none' for no auto-close
 * @param {boolean} flat - Use flat/lighter color scheme
 * @param {boolean} square - Remove border radius
 * @param {boolean} border - Add colored border
 * @param {boolean} buttonClose - Show close button
 * @param {boolean} sticky - Stick to corner
 * @param {string|number} width - Width: '340px' | '100%' | 'auto' | number
 * @param {boolean} notPadding - Remove padding
 * @param {number|null} progress - Progress bar value (0-100), null to hide
 * @param {boolean} loading - Show loading spinner
 *
 * @emits close - Emitted when notification is closed
 */

const props = defineProps({
  color: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'success', 'danger', 'warning', 'dark', 'info'].includes(v)
  },
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  icon: {
    type: [String, Object],
    default: null
  },
  position: {
    type: String,
    default: 'bottom-right',
    validator: (v) => ['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'].includes(v)
  },
  duration: {
    type: [Number, String],
    default: 7000
  },
  flat: {
    type: Boolean,
    default: false
  },
  square: {
    type: Boolean,
    default: false
  },
  border: {
    type: Boolean,
    default: false
  },
  buttonClose: {
    type: Boolean,
    default: true
  },
  sticky: {
    type: Boolean,
    default: false
  },
  width: {
    type: [String, Number],
    default: '340px'
  },
  notPadding: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const visible = ref(false)
const autoCloseTimer = ref(null)

const defaultIcon = computed(() => {
  const icons = {
    primary: 'bx bx-info-circle',
    success: 'bx bx-check-circle',
    danger: 'bx bx-error-circle',
    warning: 'bx bx-error',
    dark: 'bx bx-moon',
    info: 'bx bx-info-circle'
  }
  return icons[props.color] || icons.primary
})

const computedWidth = computed(() => {
  if (typeof props.width === 'number') return `${props.width}px`
  return props.width
})

function close() {
  visible.value = false
  clearTimeout(autoCloseTimer.value)
  setTimeout(() => {
    emit('close')
  }, 300) // Wait for animation
}

function setupAutoClose() {
  if (props.duration !== 'none' && props.duration > 0 && !props.loading) {
    autoCloseTimer.value = setTimeout(() => {
      close()
    }, props.duration)
  }
}

// Watch loading state to trigger auto-close when loading completes
watch(() => props.loading, (isLoading) => {
  if (!isLoading && props.duration !== 'none') {
    setupAutoClose()
  }
})

onMounted(() => {
  visible.value = true
  setupAutoClose()
})
</script>

<style scoped>
/* Copy exact dapp toast.vue .notification-loader styling */
.notification {
  /* Inner layout only - NO background/border styles (handled by parent) */
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
  transition: all 0.3s ease-in-out;
  padding: 0.25em 0.5em;
}

/* No padding mode */
.notification.notPadding {
  padding: 0;
}

/* Color variants using theme colors */
.notification-primary .notification-icon {
  color: var(--color-accent-primary);
}

.notification-success .notification-icon {
  color: var(--color-success);
}

.notification-danger .notification-icon {
  color: var(--color-error);
}

.notification-warning .notification-icon {
  color: var(--color-warning);
}

.notification-dark .notification-icon {
  color: var(--color-text-primary);
}

.notification-info .notification-icon {
  color: var(--color-info);
}

/* Icon/Spinner - exact dapp .spin sizing */
.notification-icon,
.notification-loading {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.notification-icon {
  font-size: 50px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Content - exact dapp .left styling */
.notification-content {
  display: flex;
  flex-flow: column nowrap;
  padding-right: 0.5em;
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-size: 0.7em;
  font-weight: bold;
  text-transform: uppercase;
}

.notification-text {
  font-size: 0.8em;
  opacity: 0.7;
}

/* Close button (optional, dapp .right equivalent) */
.notification-close {
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  padding: 0;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  opacity: 0.5;
  transition: opacity 0.2s ease;
}

.notification-close:hover {
  opacity: 1;
}

/* Progress bar */
.notification-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: currentColor;
  transition: width 0.3s ease;
  opacity: 0.3;
}

/* Animations */
.notification-slide-enter-active,
.notification-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.notification-slide-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.notification-slide-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}
</style>
