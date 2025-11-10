<template>
  <div class="enhanced-input-wrapper" :class="{ 'enhanced-input-wrapper-error': error, 'enhanced-input-wrapper-success': success }">
    <!-- Floating label -->
    <label
      v-if="label"
      :for="inputId"
      class="enhanced-input-label"
      :class="{
        'enhanced-input-label-float': isFocused || hasValue,
        'enhanced-input-label-error': error,
        'enhanced-input-label-success': success
      }"
    >
      {{ label }}
    </label>

    <div class="enhanced-input-container">
      <!-- Breathing glow effect -->
      <div class="glow-effect" :class="{ 'glow-active': isFocused }"></div>

      <!-- Prefix icon -->
      <span v-if="prefixIcon" class="enhanced-input-prefix-icon">
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
        class="enhanced-input"
        :class="{
          'enhanced-input-error': error,
          'enhanced-input-success': success,
          'enhanced-input-with-prefix': prefixIcon,
          'enhanced-input-with-suffix': suffixIcon || error || success || (maxLength && showCharCount)
        }"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- Suffix icons and character count -->
      <span v-if="suffixIcon || error || success || (maxLength && showCharCount)" class="enhanced-input-suffix">
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
    <p v-if="helperText || error || success" :id="helperTextId" class="enhanced-input-helper-text" :class="{
      'enhanced-input-helper-error': error,
      'enhanced-input-helper-success': success
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
 * Enhanced glassmorphism input with 2025 design trends
 * Features: floating label, breathing glow, character count, smooth animations
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
.enhanced-input-wrapper {
  width: 100%;
  position: relative;
}

/* Floating label */
.enhanced-input-label {
  position: absolute;
  left: var(--spacing-sm);
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--color-text-secondary);
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
  padding: 0 var(--spacing-xs);
  z-index: 2;
}

.enhanced-input-label-float {
  top: 0;
  transform: translateY(-50%);
  font-size: var(--font-size-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-accent-primary);
  background: var(--color-bg-primary);
}

.enhanced-input-label-error {
  color: var(--color-error);
}

.enhanced-input-label-success {
  color: var(--color-success);
}

.enhanced-input-container {
  position: relative;
  width: 100%;
}

/* Breathing glow effect */
.glow-effect {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, var(--color-accent-primary), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 0;
}

.glow-active {
  opacity: 0.3;
  animation: breathe 2s ease-in-out infinite;
}

@keyframes breathe {
  0%, 100% {
    opacity: 0.2;
    filter: blur(4px);
  }
  50% {
    opacity: 0.4;
    filter: blur(8px);
  }
}

/* Prefix and suffix icons */
.enhanced-input-prefix-icon,
.enhanced-input-suffix {
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

.enhanced-input-prefix-icon {
  left: var(--spacing-sm);
}

.enhanced-input-suffix {
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
.enhanced-input {
  width: 100%;
  padding: var(--spacing-sm);
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
  font-family: var(--font-family);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);
  position: relative;
  z-index: 1;
}

.enhanced-input-with-prefix {
  padding-left: calc(var(--spacing-sm) * 2 + 18px);
}

.enhanced-input-with-suffix {
  padding-right: calc(var(--spacing-sm) * 3 + 50px);
}

.enhanced-input::placeholder {
  color: var(--color-text-dim);
  transition: opacity 0.3s ease;
}

.enhanced-input:focus {
  outline: none;
  border-color: var(--color-accent-primary);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08),
              0 0 0 3px rgba(255, 202, 40, 0.15);
  background: var(--glass-bg-medium);
}

.enhanced-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Error state */
.enhanced-input-error {
  border-color: var(--color-error);
}

.enhanced-input-error:focus {
  border-color: var(--color-error);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08),
              0 0 0 3px rgba(239, 68, 68, 0.15);
}

/* Success state */
.enhanced-input-success {
  border-color: var(--color-success);
}

.enhanced-input-success:focus {
  border-color: var(--color-success);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08),
              0 0 0 3px rgba(34, 197, 94, 0.15);
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
.enhanced-input-helper-text {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  animation: slideIn 0.3s ease;
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

.enhanced-input-helper-error {
  color: var(--color-error);
}

.enhanced-input-helper-success {
  color: var(--color-success);
}

.enhanced-input-helper-text i {
  font-size: 14px;
}
</style>
