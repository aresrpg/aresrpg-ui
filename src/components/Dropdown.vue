<template>
  <div class="dropdown" :class="{ open: isOpen }" v-click-outside="close">
    <!-- Trigger -->
    <button
      class="dropdown-trigger"
      :aria-label="label || 'Open dropdown'"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <slot name="trigger">
        <span>{{ selectedLabel || placeholder }}</span>
        <i class="bx" :class="isOpen ? 'bx-chevron-up' : 'bx-chevron-down'"></i>
      </slot>
    </button>

    <!-- Dropdown Menu -->
    <transition name="dropdown-fade">
      <div v-if="isOpen" class="dropdown-menu" :style="{ maxHeight: maxHeight }">
        <div class="dropdown-content">
          <div
            v-for="(option, index) in options"
            :key="index"
            class="dropdown-item"
            :class="{ active: isSelected(option), disabled: option.disabled }"
            @click="selectOption(option)"
          >
            <i v-if="option.icon" :class="option.icon"></i>
            <span>{{ option.label }}</span>
            <i v-if="isSelected(option)" class="bx bx-check check-icon"></i>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

/**
 * Glassmorphism Dropdown Component
 *
 * @component Dropdown
 * @description Select dropdown with glassmorphism styling
 *
 * @param {string} modelValue - Selected value (v-model)
 * @param {Array} options - Dropdown options [{ label, value, icon, disabled }]
 * @param {string} placeholder - Placeholder text
 * @param {string} label - Accessible label
 * @param {string} maxHeight - Max height of dropdown menu
 *
 * @emits update:modelValue - Emitted when selection changes
 * @emits change - Emitted when selection changes with option data
 *
 * @slot trigger - Custom trigger content
 *
 * @example
 * <Dropdown
 *   v-model="selected"
 *   :options="[
 *     { label: 'Option 1', value: '1', icon: 'bx bx-home' },
 *     { label: 'Option 2', value: '2' }
 *   ]"
 *   placeholder="Select option"
 * />
 */

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null
  },
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: 'Select...'
  },
  label: {
    type: String,
    default: ''
  },
  maxHeight: {
    type: String,
    default: '300px'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)

const selectedLabel = computed(() => {
  const selected = props.options.find(opt => opt.value === props.modelValue)
  return selected ? selected.label : ''
})

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

function isSelected(option) {
  return option.value === props.modelValue
}

function selectOption(option) {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  emit('change', option)
  close()
}

// Click outside directive
const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = function(event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 300px;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--glass-bg);
  backdrop-filter: blur(25px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-fast);
  text-align: left;
}

.dropdown-trigger:hover {
  background: var(--glass-bg-medium);
  border-color: var(--glass-border-bright);
  transform: translateY(-1px);
}

.dropdown.open .dropdown-trigger {
  border-color: var(--color-accent-primary);
  box-shadow: 0 0 0 2px rgba(var(--color-accent-primary), 0.1);
}

.dropdown-trigger i:last-child {
  font-size: 1.2em;
  transition: transform var(--transition-fast);
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: calc(100% + var(--spacing-xs));
  left: 0;
  right: 0;
  background: var(--glass-bg);
  backdrop-filter: blur(25px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  z-index: 1000;
}

.dropdown-content {
  max-height: inherit;
  overflow-y: auto;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-fast);
  position: relative;
}

.dropdown-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--gradient-primary);
  transform: scaleY(0);
  transition: transform var(--transition-fast);
}

.dropdown-item:hover {
  background: var(--glass-bg-medium);
  color: var(--color-text-primary);
}

.dropdown-item:hover::before {
  transform: scaleY(1);
}

.dropdown-item.active {
  background: var(--glass-bg-medium);
  color: var(--color-accent-primary);
  font-weight: 700;
}

.dropdown-item.active::before {
  transform: scaleY(1);
}

.dropdown-item.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.dropdown-item i {
  font-size: 1.2em;
}

.check-icon {
  margin-left: auto;
  color: var(--color-accent-primary);
}

/* Transitions */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.dropdown-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Scrollbar */
.dropdown-content::-webkit-scrollbar {
  width: 6px;
}

.dropdown-content::-webkit-scrollbar-thumb {
  background: var(--glass-bg-medium);
  border-radius: var(--radius-sm);
}
</style>
