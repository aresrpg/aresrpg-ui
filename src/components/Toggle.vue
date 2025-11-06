<template>
  <label class="toggle" :class="{ checked: modelValue, disabled }">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="toggle-input"
    />
    <span class="toggle-slider"></span>
    <span v-if="label" class="toggle-label">{{ label }}</span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  user-select: none;
}
.toggle.disabled { opacity: 0.5; cursor: not-allowed; }
.toggle-input { display: none; }
.toggle-slider {
  position: relative;
  width: 48px;
  height: 24px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  border: 2px solid var(--glass-border);
  border-radius: 24px;
  transition: var(--transition-base);
}
.toggle-slider::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  background: var(--color-text-secondary);
  border-radius: 50%;
  transition: var(--transition-base);
  box-shadow: var(--shadow-md);
}
.toggle.checked .toggle-slider {
  background: var(--gradient-primary);
  border-color: var(--color-accent-primary);
}
.toggle.checked .toggle-slider::before {
  left: calc(100% - 18px);
  background: white;
}
.toggle:not(.disabled):hover .toggle-slider { border-color: var(--glass-border-bright); }
.toggle-label { font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text-primary); }
</style>
