<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        ref="modalOverlay"
        class="modal-overlay"
        @click="handleOverlayClick"
        @keydown.esc="handleEscape"
      >
        <div
          ref="modalEl"
          class="modal"
          :class="`modal-${size}`"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? 'modal-title' : undefined"
          @click.stop
          @keydown.tab="handleTab"
        >
          <div v-if="$slots.header || title" class="modal-header">
            <h3 id="modal-title" class="modal-title">
              <slot name="header">{{ title }}</slot>
            </h3>
            <button
              v-if="closable"
              ref="closeBtn"
              class="modal-close"
              aria-label="Close modal"
              @click="close"
            >
              <i class="bx bx-x"></i>
            </button>
          </div>

          <div class="modal-content">
            <slot />
          </div>

          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue'

/**
 * Glass morphism modal component with focus trap
 * @param {boolean} modelValue - v-model binding for visibility
 * @param {string} title - Modal title
 * @param {boolean} closable - Show close button
 * @param {boolean} closeOnOverlay - Close when clicking overlay
 * @param {string} size - Modal size (sm/md/lg/xl/full)
 */
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  closable: {
    type: Boolean,
    default: true
  },
  closeOnOverlay: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl', 'full'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const modalEl = ref(null)
const modalOverlay = ref(null)
const closeBtn = ref(null)
let previousActiveElement = null

/**
 * Get all focusable elements within the modal
 */
function getFocusableElements() {
  if (!modalEl.value) return []

  const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  return Array.from(modalEl.value.querySelectorAll(selector))
    .filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null)
}

/**
 * Handle Tab key for focus trap
 */
function handleTab(event) {
  const focusableElements = getFocusableElements()
  if (focusableElements.length === 0) return

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (event.shiftKey) {
    // Shift + Tab: going backwards
    if (document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    }
  } else {
    // Tab: going forwards
    if (document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }
}

/**
 * Handle Escape key to close modal
 */
function handleEscape() {
  if (props.closable) {
    close()
  }
}

/**
 * Close the modal
 */
function close() {
  emit('update:modelValue', false)
  emit('close')
}

/**
 * Handle overlay click
 */
function handleOverlayClick() {
  if (props.closeOnOverlay) {
    close()
  }
}

/**
 * Watch for modal visibility changes
 */
watch(() => props.modelValue, async (isOpen) => {
  if (isOpen) {
    // Store the currently focused element to restore later
    previousActiveElement = document.activeElement

    // Wait for next tick to ensure modal is rendered
    await nextTick()

    // Focus first focusable element or close button
    const focusableElements = getFocusableElements()
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    } else if (closeBtn.value) {
      closeBtn.value.focus()
    }

    // Lock body scroll
    document.body.style.overflow = 'hidden'
  } else {
    // Restore focus to previous element
    if (previousActiveElement && previousActiveElement.focus) {
      previousActiveElement.focus()
    }
    previousActiveElement = null

    // Unlock body scroll
    document.body.style.overflow = ''
  }
})

/**
 * Cleanup on unmount
 */
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-lg);
}

.modal {
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  width: 100%;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05),
              0 20px 60px rgba(0, 0, 0, 0.5);
}

/* Modal sizes */
.modal-sm { max-width: 400px; }
.modal-md { max-width: 500px; }
.modal-lg { max-width: 700px; }
.modal-xl { max-width: 900px; }
.modal-full {
  max-width: calc(100vw - var(--spacing-xl) * 2);
  max-height: calc(100vh - var(--spacing-xl) * 2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--glass-border);
}

.modal-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-text-primary);
  margin: 0;
}

.modal-close {
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  font-size: 24px;
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: var(--radius-sm);
  transition: all var(--transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: var(--glass-bg-light);
  color: var(--color-text-primary);
}

.modal-content {
  margin-bottom: var(--spacing-lg);
  color: var(--color-text-secondary);
}

.modal-footer {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-end;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--glass-border);
}

/* Transition animations */
.modal-enter-active {
  transition: opacity 0.3s ease;
}

.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal {
  animation: modal-appear 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
