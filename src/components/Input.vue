<template>
  <div class="input-wrapper" :class="{ 'input-wrapper-error': error, 'input-wrapper-success': success }">
    <label v-if="label" class="input-label" :for="inputId">{{ label }}</label>
    <div class="input-container">
      <span v-if="prefixIcon" class="input-prefix-icon">
        <i :class="prefixIcon"></i>
      </span>
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-invalid="error ? 'true' : 'false'"
        :aria-describedby="helperTextId"
        class="input"
        :class="{
          'input-error': error,
          'input-success': success,
          'input-with-prefix': prefixIcon,
          'input-with-suffix': suffixIcon
        }"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span v-if="suffixIcon || error || success" class="input-suffix-icon">
        <i v-if="error" class="bx bx-error-circle" style="color: var(--color-error)"></i>
        <i v-else-if="success" class="bx bx-check-circle" style="color: var(--color-success)"></i>
        <i v-else :class="suffixIcon"></i>
      </span>
    </div>
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
import { computed } from 'vue'

/**
 * Glass morphism input component with validation states
 * @param {string} modelValue - v-model binding
 * @param {string} type - Input type (text/email/password/number)
 * @param {string} label - Input label
 * @param {string} placeholder - Placeholder text
 * @param {boolean} disabled - Disabled state
 * @param {boolean} error - Error state
 * @param {string} errorMessage - Error message to display
 * @param {boolean} success - Success state
 * @param {string} successMessage - Success message to display
 * @param {string} helperText - Helper text (shown below input)
 * @param {string} prefixIcon - Icon class for prefix (e.g., 'bx bx-search')
 * @param {string} suffixIcon - Icon class for suffix (e.g., 'bx bx-lock')
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
  }
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

// Generate unique IDs for accessibility
const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)
const helperTextId = computed(() => `helper-${inputId.value}`)

/**
 * Handle input change
 * @param {Event} event - Input event
 */
function handleInput(event) {
  emit('update:modelValue', event.target.value)
}

/**
 * Handle focus event
 * @param {Event} event - Focus event
 */
function handleFocus(event) {
  emit('focus', event)
}

/**
 * Handle blur event
 * @param {Event} event - Blur event
 */
function handleBlur(event) {
  emit('blur', event)
}
</script>

<style scoped>
.input-wrapper {
  width: 100%;
}

.input-label {
  display: block;
  font-size: var(--font-size-xs);
  font-weight: 700;
  margin-bottom: var(--spacing-xs);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.input-container {
  position: relative;
  width: 100%;
}

.input-prefix-icon,
.input-suffix-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  font-size: 18px;
  pointer-events: none;
  z-index: 1;
}

.input-prefix-icon {
  left: var(--spacing-sm);
}

.input-suffix-icon {
  right: var(--spacing-sm);
}

.input {
  width: 100%;
  padding: var(--spacing-sm);
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
  font-family: var(--font-family);
  transition: all var(--transition-base);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);
}

.input-with-prefix {
  padding-left: calc(var(--spacing-sm) * 2 + 18px);
}

.input-with-suffix {
  padding-right: calc(var(--spacing-sm) * 2 + 18px);
}

.input::placeholder {
  color: var(--color-text-dim);
}

.input:focus {
  outline: none;
  border-color: var(--color-accent-primary);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08),
              0 0 0 3px rgba(255, 202, 40, 0.15),
              var(--glow-primary);
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
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08),
              0 0 0 3px rgba(239, 68, 68, 0.15);
}

/* Success state */
.input-success {
  border-color: var(--color-success);
}

.input-success:focus {
  border-color: var(--color-success);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08),
              0 0 0 3px rgba(34, 197, 94, 0.15);
}

/* Helper text */
.input-helper-text {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
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
