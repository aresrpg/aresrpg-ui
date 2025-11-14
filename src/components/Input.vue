<template>
  <div class="input-wrapper" :class="{ 'input-wrapper-error': error, 'input-wrapper-success': success }">
    <!-- Floating label -->
    <label
      v-if="label"
      :for="inputId"
      class="input-label"
      :class="{
        'input-label-float': isFocused || hasValue,
        'input-label-error': error,
        'input-label-success': success,
        'input-label-with-prefix': prefixIcon
      }"
    >
      {{ label }}
    </label>

    <div class="input-container">
      <!-- Prefix icon -->
      <span v-if="prefixIcon" class="input-prefix-icon">
        <i :class="prefixIcon"></i>
      </span>

      <!-- Input field -->
      <input
        :id="inputId"
        ref="inputRef"
        :type="type"
        :value="modelValue"
        :placeholder="isFocused || !label ? placeholder : ''"
        :disabled="disabled"
        :maxlength="maxLength"
        :aria-invalid="error ? 'true' : 'false'"
        :aria-describedby="helperTextId"
        class="input"
        :class="{
          'input-error': error,
          'input-success': success,
          'input-with-prefix': prefixIcon,
          'input-with-suffix': suffixIcon || error || success || (maxLength && showCharCount)
        }"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- Suffix icons and character count -->
      <span v-if="suffixIcon || error || success || (maxLength && showCharCount)" class="input-suffix">
        <!-- Validation icons -->
        <i v-if="error" class="bx bx-error-circle validation-icon error-icon"></i>
        <i v-else-if="success" class="bx bx-check-circle validation-icon success-icon"></i>
        <i v-else-if="suffixIcon" :class="suffixIcon"></i>

        <!-- Character count -->
        <span v-if="maxLength && showCharCount" class="char-count" :class="{ 'char-count-warning': characterCount > maxLength * 0.9 }">
          {{ characterCount }}/{{ maxLength }}
        </span>
      </span>

      <!-- Animated bottom border -->
      <div class="bottom-border" :class="{ 'bottom-border-active': isFocused, 'bottom-border-error': error, 'bottom-border-success': success }"></div>
    </div>

    <!-- Character count progress bar -->
    <div v-if="maxLength && showCharCount" class="progress-bar-container">
      <div
        class="progress-bar"
        :class="{
          'progress-bar-warning': characterCount > maxLength * 0.7,
          'progress-bar-danger': characterCount > maxLength * 0.9
        }"
        :style="{ width: `${(characterCount / maxLength) * 100}%` }"
      ></div>
    </div>

    <!-- Helper/Error/Success message -->
    <p v-if="helperText || error || success" :id="helperTextId" class="input-helper-text" :class="{
      'input-helper-error': error,
      'input-helper-success': success
    }">
      <i v-if="error" class="bx bx-error-circle"></i>
      <i v-if="success" class="bx bx-check-circle"></i>
      {{ errorMessage || successMessage || helperText }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

/**
 * Refined glassmorphism input with subtle improvements
 * Features: floating label, character count, validation states, progress bar
 * @param {string} modelValue - v-model binding
 * @param {string} type - Input type (text/email/password/number)
 * @param {string} label - Input label (floats on focus)
 * @param {string} placeholder - Placeholder text
 * @param {boolean} disabled - Disabled state
 * @param {boolean} error - Error state
 * @param {string} errorMessage - Error message to display
 * @param {boolean} success - Success state
 * @param {string} successMessage - Success message to display
 * @param {string} helperText - Helper text (shown below input)
 * @param {string} prefixIcon - Icon class for prefix (e.g., 'bx bx-search')
 * @param {string} suffixIcon - Icon class for suffix (e.g., 'bx bx-lock')
 * @param {number} maxLength - Maximum character length
 * @param {boolean} showCharCount - Show character counter (requires maxLength)
 */
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  },
  success: {
    type: Boolean,
    default: false
  },
  successMessage: {
    type: String,
    default: ''
  },
  helperText: {
    type: String,
    default: ''
  },
  prefixIcon: {
    type: String,
    default: ''
  },
  suffixIcon: {
    type: String,
    default: ''
  },
  maxLength: {
    type: Number,
    default: null
  },
  showCharCount: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const inputRef = ref(null)
const isFocused = ref(false)

// Generate unique IDs for accessibility
const inputId = computed(() => `enhanced-input-${Math.random().toString(36).substr(2, 9)}`)
const helperTextId = computed(() => `helper-${inputId.value}`)
const hasValue = computed(() => props.modelValue !== '' && props.modelValue != null)
const characterCount = computed(() => String(props.modelValue || '').length)

/**
 * Handle input change
 */
function handleInput(event) {
  emit('update:modelValue', event.target.value)
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
</script>

<style scoped>
.input-wrapper {
  width: 100%;
  position: relative;
}

/* Floating label */
.input-label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--color-text-secondary);
  pointer-events: none;
  transition: all 0.2s ease;
  background: transparent;
  padding: 0 4px;
  z-index: 2;
}

.input-label-float {
  top: 0;
  transform: translateY(-50%);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--color-accent-primary);
  background: var(--color-bg-primary);
}

/* Matrix theme - tone down neon label */
[data-theme="matrix"] .input-label-float {
  color: #00AA00;
  filter: brightness(0.9);
}

/* Shift label when prefix icon exists */
.input-label-with-prefix {
  left: 38px;
}

.input-label-error {
  color: var(--color-error);
}

.input-label-success {
  color: var(--color-success);
}

.input-container {
  position: relative;
  width: 100%;
}

/* Prefix and suffix icons */
.input-prefix-icon,
.input-suffix {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  color: var(--color-text-secondary);
  font-size: 18px;
  pointer-events: none;
  z-index: 2;
}

.input-prefix-icon {
  left: var(--spacing-sm);
}

.input-suffix {
  right: var(--spacing-sm);
}

.validation-icon {
  font-size: 18px;
}

.error-icon {
  color: var(--color-error);
  animation: shake 0.3s ease-in-out;
}

.success-icon {
  color: var(--color-success);
  animation: checkmark 0.3s ease-in-out;
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-4px);
  }
  75% {
    transform: translateX(4px);
  }
}

@keyframes checkmark {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/* Character count */
.char-count {
  font-size: var(--font-size-xs);
  color: var(--color-text-dim);
  font-weight: 600;
}

.char-count-warning {
  color: var(--color-error);
}

/* Input field */
.input {
  width: 100%;
  padding: 12px 14px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: 4px;
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
  font-family: var(--font-family);
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  position: relative;
  z-index: 1;
}

.input-with-prefix {
  padding-left: 42px;
}

.input-with-suffix {
  padding-right: 45px;
}

.input::placeholder {
  color: var(--color-text-dim);
  transition: opacity 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--color-accent-primary);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1),
              0 0 0 2px rgba(255, 202, 40, 0.08);
  background: var(--glass-bg-medium);
}

/* Matrix theme - tone down focus glow */
[data-theme="matrix"] .input:focus {
  border-color: #00AA00;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1),
              0 0 0 2px rgba(0, 170, 0, 0.15);
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Error state */
.input-error {
  border-color: var(--color-error);
}

.input-error:focus {
  border-color: var(--color-error);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15),
              inset 0 0 0 1px rgba(255, 255, 255, 0.05),
              0 0 0 2px rgba(239, 68, 68, 0.1);
}

/* Success state */
.input-success {
  border-color: var(--color-success);
}

.input-success:focus {
  border-color: var(--color-success);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15),
              inset 0 0 0 1px rgba(255, 255, 255, 0.05),
              0 0 0 2px rgba(34, 197, 94, 0.1);
}

/* Neumorphism theme overrides */
[data-theme="neumorphism"] .input {
  background: var(--color-bg-primary);
  border: none;
  box-shadow: inset 1px 1px 3px rgba(163, 177, 198, 0.3),
              inset -1px -1px 3px rgba(255, 255, 255, 0.4);
}

[data-theme="neumorphism"] .input:focus {
  box-shadow: inset 2px 2px 4px rgba(163, 177, 198, 0.3),
              inset -2px -2px 4px rgba(255, 255, 255, 0.4);
}

[data-theme="neumorphism"] .input-label-float {
  background: transparent;
  color: #5865F2;
}

/* Animated bottom border */
.bottom-border {
  position: absolute;
  bottom: -1px;
  left: 0;
  height: 2px;
  width: 0;
  background: var(--gradient-primary);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 0 0 var(--radius-sm) var(--radius-sm);
  z-index: 2;
}

.bottom-border-active {
  width: 100%;
}

.bottom-border-error {
  background: var(--color-error);
}

.bottom-border-success {
  background: var(--color-success);
}

/* Progress bar for character count */
.progress-bar-container {
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  margin-top: var(--spacing-xs);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--gradient-primary);
  transition: width 0.3s ease, background 0.3s ease;
  border-radius: 2px;
}

.progress-bar-warning {
  background: linear-gradient(90deg, var(--color-accent-primary), orange);
}

.progress-bar-danger {
  background: var(--color-error);
  animation: pulse-bar 1s ease-in-out infinite;
}

@keyframes pulse-bar {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Helper text */
.input-helper-text {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  animation: slideIn 0.2s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.input-helper-error {
  color: var(--color-error);
}

.input-helper-success {
  color: var(--color-success);
}

.input-helper-text i {
  font-size: 14px;
}
</style>
