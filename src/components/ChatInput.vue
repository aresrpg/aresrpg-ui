<template>
  <div class="chat-input-container">
    <!-- Main input wrapper -->
    <div
      class="chat-input-wrapper"
      :class="{
        'chat-input-disabled': disabled,
        'chat-input-focused': isFocused
      }"
    >
      <!-- Text input -->
      <textarea
        ref="inputRef"
        v-model="inputValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxLength"
        :rows="rows"
        class="chat-input"
        aria-label="Message input"
        @input="handleInput"
        @keydown="handleKeyDown"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- Send button -->
      <button
        class="send-button"
        :disabled="!canSend"
        aria-label="Send message"
        @click="handleSend"
      >
        <i class="bx bx-send"></i>
      </button>
    </div>

    <!-- Character counter -->
    <div v-if="maxLength && showCharCount" class="char-counter">
      <span
        :class="{
          'char-counter-warning': characterCount > maxLength * 0.8,
          'char-counter-danger': characterCount > maxLength * 0.95
        }"
      >
        {{ characterCount }}/{{ maxLength }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

/**
 * Chat input component with send button
 * Features: auto-resize, enter-to-send, shift-enter for new line, character counter
 *
 * @param {string} modelValue - v-model binding for input text
 * @param {string} placeholder - Placeholder text
 * @param {boolean} disabled - Disabled state
 * @param {number} maxLength - Maximum character length
 * @param {boolean} showCharCount - Show character counter
 * @param {number} rows - Initial number of rows (min height)
 * @param {boolean} autoResize - Auto-resize textarea based on content
 * @param {number} maxRows - Maximum rows before scrolling
 */
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Type a message...'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  maxLength: {
    type: Number,
    default: null
  },
  showCharCount: {
    type: Boolean,
    default: false
  },
  rows: {
    type: Number,
    default: 1
  },
  autoResize: {
    type: Boolean,
    default: true
  },
  maxRows: {
    type: Number,
    default: 5
  }
})

const emit = defineEmits(['update:modelValue', 'send', 'focus', 'blur'])

const inputRef = ref(null)
const inputValue = ref(props.modelValue)
const isFocused = ref(false)

/**
 * Character count
 */
const characterCount = computed(() => inputValue.value.length)

/**
 * Can send message (has non-empty content and not disabled)
 */
const canSend = computed(() => {
  const trimmed = inputValue.value.trim()
  return trimmed.length > 0 && !props.disabled
})

/**
 * Handle input change
 */
function handleInput() {
  emit('update:modelValue', inputValue.value)

  if (props.autoResize) {
    autoResizeTextarea()
  }
}

/**
 * Auto-resize textarea based on content
 */
function autoResizeTextarea() {
  if (!inputRef.value) return

  const textarea = inputRef.value
  const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight) || 20
  const maxHeight = lineHeight * props.maxRows

  // Reset height to recalculate
  textarea.style.height = 'auto'

  // Set new height (capped at maxHeight)
  const newHeight = Math.min(textarea.scrollHeight, maxHeight)
  textarea.style.height = `${newHeight}px`
}

/**
 * Handle keydown events
 * Enter to send, Shift+Enter for new line
 */
function handleKeyDown(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleSend()
  }
}

/**
 * Handle send message
 */
function handleSend() {
  if (!canSend.value) return

  const message = inputValue.value.trim()
  emit('send', message)

  // Clear input
  inputValue.value = ''
  emit('update:modelValue', '')

  // Reset textarea height
  if (props.autoResize) {
    nextTick(() => {
      autoResizeTextarea()
    })
  }

  // Refocus input
  inputRef.value?.focus()
}

/**
 * Handle focus event
 */
function handleFocus(event) {
  isFocused.value = true
  emit('focus', event)
}

/**
 * Handle blur event
 */
function handleBlur(event) {
  isFocused.value = false
  emit('blur', event)
}

/**
 * Public method to focus input
 */
function focus() {
  inputRef.value?.focus()
}

// Expose public methods
defineExpose({
  focus
})
</script>

<style scoped>
.chat-input-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

/* Input wrapper */
.chat-input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: var(--spacing-sm);
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  padding: var(--spacing-sm);
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.chat-input-wrapper:hover {
  border-color: var(--glass-border-bright);
}

.chat-input-focused {
  border-color: var(--color-accent-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12),
              0 0 0 2px rgba(255, 202, 40, 0.1);
}

/* Matrix theme - tone down focus */
[data-theme="matrix"] .chat-input-focused {
  border-color: #00AA00;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12),
              0 0 0 2px rgba(0, 170, 0, 0.15);
}

.chat-input-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Neumorphism theme override */
[data-theme="neumorphism"] .chat-input-wrapper {
  background: var(--color-bg-primary);
  border: none;
  box-shadow: inset 2px 2px 4px rgba(163, 177, 198, 0.35),
              inset -2px -2px 4px rgba(255, 255, 255, 0.45);
}

[data-theme="neumorphism"] .chat-input-focused {
  box-shadow: inset 3px 3px 6px rgba(163, 177, 198, 0.4),
              inset -3px -3px 6px rgba(255, 255, 255, 0.5);
}

/* Text input */
.chat-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
  font-family: var(--font-family);
  line-height: 1.5;
  resize: none;
  min-height: 24px;
  max-height: 120px;
  overflow-y: auto;
  padding: 0;

  /* Custom scrollbar */
  scrollbar-width: thin;
  scrollbar-color: var(--glass-border) transparent;
}

.chat-input::-webkit-scrollbar {
  width: 4px;
}

.chat-input::-webkit-scrollbar-track {
  background: transparent;
}

.chat-input::-webkit-scrollbar-thumb {
  background: var(--glass-border);
  border-radius: 2px;
}

.chat-input::placeholder {
  color: var(--color-text-dim);
}

.chat-input:disabled {
  cursor: not-allowed;
}

/* Send button */
.send-button {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  background: var(--gradient-primary);
  border: none;
  border-radius: 6px;
  color: var(--color-text-inverse);
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.send-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.send-button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.send-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

/* Matrix theme - different button color */
[data-theme="matrix"] .send-button {
  background: linear-gradient(135deg, #00AA00 0%, #007700 100%);
}

/* Neumorphism theme - different button style */
[data-theme="neumorphism"] .send-button {
  background: linear-gradient(135deg, #5865F2 0%, #4752C4 100%);
  box-shadow: 2px 2px 4px rgba(163, 177, 198, 0.4),
              -2px -2px 4px rgba(255, 255, 255, 0.5);
}

[data-theme="neumorphism"] .send-button:hover:not(:disabled) {
  box-shadow: 1px 1px 3px rgba(163, 177, 198, 0.4),
              -1px -1px 3px rgba(255, 255, 255, 0.5);
}

/* Character counter */
.char-counter {
  display: flex;
  justify-content: flex-end;
  padding: 0 var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--color-text-dim);
  font-weight: 600;
}

.char-counter-warning {
  color: var(--color-accent-primary);
}

.char-counter-danger {
  color: var(--color-error);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .chat-input-wrapper {
    padding: var(--spacing-xs);
  }

  .send-button {
    width: 32px;
    height: 32px;
    font-size: 18px;
  }
}
</style>
