<template>
  <div class="textarea-wrapper" :class="{ 'textarea-wrapper-error': error, 'textarea-wrapper-success': success }">
    <!-- Floating label -->
    <label
      v-if="label"
      :for="textareaId"
      class="textarea-label"
      :class="{
        'textarea-label-float': isFocused || hasValue,
        'textarea-label-error': error,
        'textarea-label-success': success
      }"
    >
      {{ label }}
    </label>

    <div class="textarea-container">
      <!-- Textarea field -->
      <textarea
        :id="textareaId"
        ref="textareaRef"
        :value="modelValue"
        :placeholder="isFocused || !label ? placeholder : ''"
        :disabled="disabled"
        :rows="rows"
        :maxlength="maxLength"
        :aria-invalid="error ? 'true' : 'false'"
        :aria-describedby="helperTextId"
        class="textarea"
        :class="{
          'textarea-error': error,
          'textarea-success': success,
          'textarea-with-count': maxLength && showCharCount
        }"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- Animated bottom border -->
      <div class="bottom-border" :class="{ 'bottom-border-active': isFocused, 'bottom-border-error': error, 'bottom-border-success': success }"></div>
    </div>

    <!-- Character count and validation icons row -->
    <div v-if="(maxLength && showCharCount) || error || success" class="textarea-footer">
      <!-- Validation status -->
      <div v-if="error || success" class="validation-status">
        <i v-if="error" class="bx bx-error-circle error-icon"></i>
        <i v-else-if="success" class="bx bx-check-circle success-icon"></i>
      </div>

      <!-- Character count -->
      <span v-if="maxLength && showCharCount" class="char-count" :class="{ 'char-count-warning': characterCount > maxLength * 0.9 }">
        {{ characterCount }}/{{ maxLength }}
      </span>
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
    <p v-if="helperText || error || success" :id="helperTextId" class="textarea-helper-text" :class="{
      'textarea-helper-error': error,
      'textarea-helper-success': success
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
 * Glassmorphism textarea with floating label
 * Features: floating label, character count, validation states, progress bar, auto-resize
 * @param {string} modelValue - v-model binding
 * @param {string} label - Textarea label (floats on focus)
 * @param {string} placeholder - Placeholder text
 * @param {boolean} disabled - Disabled state
 * @param {number} rows - Initial number of rows
 * @param {boolean} error - Error state
 * @param {string} errorMessage - Error message to display
 * @param {boolean} success - Success state
 * @param {string} successMessage - Success message to display
 * @param {string} helperText - Helper text to display below textarea
 * @param {number} maxLength - Maximum character length
 * @param {boolean} showCharCount - Show character counter
 */
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
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
  rows: {
    type: Number,
    default: 4
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
  maxLength: {
    type: Number,
    default: null
  },
  showCharCount: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const textareaRef = ref(null)
const isFocused = ref(false)
const textareaId = computed(() => `textarea-${Math.random().toString(36).substr(2, 9)}`)
const helperTextId = computed(() => `helper-${textareaId.value}`)
const hasValue = computed(() => props.modelValue && props.modelValue.length > 0)
const characterCount = computed(() => props.modelValue ? props.modelValue.length : 0)

function handleInput(event) {
  emit('update:modelValue', event.target.value)
}

function handleFocus(event) {
  isFocused.value = true
  emit('focus', event)
}

function handleBlur(event) {
  isFocused.value = false
  emit('blur', event)
}

// Expose ref for parent access
defineExpose({
  textareaRef,
  focus: () => textareaRef.value?.focus()
})
</script>

<style scoped>
/* Wrapper */
.textarea-wrapper {
  position: relative;
  width: 100%;
  margin-bottom: var(--spacing-md);
}

.textarea-wrapper-error {
  --border-color: var(--color-error, #ef4444);
}

.textarea-wrapper-success {
  --border-color: var(--color-success, #22c55e);
}

/* Floating Label */
.textarea-label {
  position: absolute;
  left: var(--spacing-md);
  top: var(--spacing-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  transition: var(--transition-fast);
  pointer-events: none;
  z-index: 2;
  background: transparent;
  padding: 0 var(--spacing-xs);
}

.textarea-label-float {
  top: -10px;
  left: var(--spacing-sm);
  font-size: var(--font-size-xs);
  color: rgba(255, 255, 255, 0.9);
  background: var(--color-bg-primary);
}

.textarea-label-error {
  color: var(--color-error, #ef4444);
}

.textarea-label-success {
  color: var(--color-success, #22c55e);
}

/* Container */
.textarea-container {
  position: relative;
  width: 100%;
}

/* Textarea */
.textarea {
  width: 100%;
  padding: var(--spacing-md);
  font-size: var(--font-size-sm);
  font-family: inherit;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  outline: none;
  resize: vertical;
  transition: var(--transition-fast);
  line-height: 1.5;
  min-height: 80px;
}

.textarea:focus {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
}

.textarea:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: rgba(255, 255, 255, 0.02);
}

.textarea-error {
  border-color: var(--color-error, #ef4444);
}

.textarea-success {
  border-color: var(--color-success, #22c55e);
}

.textarea::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

/* Bottom Border Animation */
.bottom-border {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.6)
  );
  border-radius: var(--radius-sm);
  transition: transform var(--transition-fast);
  pointer-events: none;
}

.bottom-border-active {
  transform: translateX(-50%) scaleX(1);
}

.bottom-border-error {
  background: var(--color-error, #ef4444);
}

.bottom-border-success {
  background: var(--color-success, #22c55e);
}

/* Footer (char count + validation icons) */
.textarea-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--spacing-xs);
  padding: 0 var(--spacing-xs);
}

.validation-status i {
  font-size: var(--font-size-sm);
}

.error-icon {
  color: var(--color-error, #ef4444);
}

.success-icon {
  color: var(--color-success, #22c55e);
}

/* Character Count */
.char-count {
  font-size: var(--font-size-xs);
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  margin-left: auto;
}

.char-count-warning {
  color: var(--color-warning, #f59e0b);
}

/* Progress Bar */
.progress-bar-container {
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-sm);
  overflow: hidden;
  margin-top: var(--spacing-xs);
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.6)
  );
  transition: width var(--transition-fast), background var(--transition-fast);
  border-radius: var(--radius-sm);
}

.progress-bar-warning {
  background: linear-gradient(90deg,
    var(--color-warning, #f59e0b),
    rgba(245, 158, 11, 0.7)
  );
}

.progress-bar-danger {
  background: linear-gradient(90deg,
    var(--color-error, #ef4444),
    rgba(239, 68, 68, 0.7)
  );
}

/* Helper Text */
.textarea-helper-text {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-xs);
  padding: 0 var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: rgba(255, 255, 255, 0.6);
}

.textarea-helper-error {
  color: var(--color-error, #ef4444);
}

.textarea-helper-success {
  color: var(--color-success, #22c55e);
}

.textarea-helper-text i {
  font-size: var(--font-size-sm);
}

/* Neumorphism theme */
[data-theme="neumorphism"] .textarea {
  background: var(--color-bg-secondary);
  border: none;
  box-shadow: inset 3px 3px 6px rgba(163, 177, 198, 0.2),
              inset -3px -3px 6px rgba(255, 255, 255, 0.7);
  color: var(--color-text-primary);
}

[data-theme="neumorphism"] .textarea:focus {
  box-shadow: inset 5px 5px 10px rgba(163, 177, 198, 0.3),
              inset -5px -5px 10px rgba(255, 255, 255, 0.8);
}

[data-theme="neumorphism"] .textarea-label {
  color: var(--color-text-secondary);
}

[data-theme="neumorphism"] .textarea-label-float {
  color: var(--color-text-primary);
  background: var(--color-bg-primary);
}

[data-theme="neumorphism"] .char-count {
  color: var(--color-text-secondary);
}
</style>
