<template>
  <div class="input-wrapper">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="input"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>

<script setup>
/**
 * Glass morphism input component
 * @param {string} modelValue - v-model binding
 * @param {string} type - Input type (text/email/password/number)
 * @param {string} label - Input label
 * @param {string} placeholder - Placeholder text
 * @param {boolean} disabled - Disabled state
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
  }
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

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
</style>
