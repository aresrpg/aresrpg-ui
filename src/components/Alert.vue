<template>
  <transition name="alert-slide">
    <div v-if="modelValue" class="alert" :class="`alert-${variant}`" role="alert">
      <i class="alert-icon" :class="iconClass"></i>
      <div class="alert-content">
        <strong v-if="title" class="alert-title">{{ title }}</strong>
        <p class="alert-message"><slot>{{ message }}</slot></p>
      </div>
      <button v-if="closable" class="alert-close" @click="close" aria-label="Close alert">
        <i class="bx bx-x"></i>
      </button>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: true },
  variant: { type: String, default: 'info', validator: v => ['success', 'error', 'warning', 'info'].includes(v) },
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  closable: { type: Boolean, default: true }
})

const emit = defineEmits(['update:modelValue', 'close'])

const iconClass = computed(() => ({
  success: 'bx bx-check-circle',
  error: 'bx bx-error-circle',
  warning: 'bx bx-error',
  info: 'bx bx-info-circle'
}[props.variant]))

function close() {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<style scoped>
.alert {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--glass-bg);
  backdrop-filter: blur(25px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-left: 4px solid currentColor;
  border-radius: var(--radius-md);
  position: relative;
}
.alert-success { color: var(--color-success); }
.alert-error { color: var(--color-error); }
.alert-warning { color: var(--color-warning); }
.alert-info { color: var(--color-info); }
.alert-icon { font-size: 1.5em; flex-shrink: 0; }
.alert-content { flex: 1; }
.alert-title { display: block; font-weight: 700; margin-bottom: var(--spacing-xs); color: var(--color-text-primary); }
.alert-message { color: var(--color-text-secondary); font-size: var(--font-size-sm); margin: 0; }
.alert-close {
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
.alert-close:hover { color: var(--color-text-primary); transform: scale(1.1); }
.alert-slide-enter-active, .alert-slide-leave-active { transition: all var(--transition-base); }
.alert-slide-enter-from { opacity: 0; transform: translateY(-20px); }
.alert-slide-leave-to { opacity: 0; transform: translateY(-20px); }
</style>
