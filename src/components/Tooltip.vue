<template>
  <div class="tooltip-wrapper" @mouseenter="show" @mouseleave="hide">
    <slot></slot>
    <transition name="tooltip-fade">
      <div
        v-if="isVisible"
        class="tooltip"
        :class="[`tooltip-${position}`]"
        role="tooltip"
      >
        {{ content }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  content: { type: String, required: true },
  position: { type: String, default: 'top', validator: v => ['top', 'bottom', 'left', 'right'].includes(v) }
})

const isVisible = ref(false)
const show = () => isVisible.value = true
const hide = () => isVisible.value = false
</script>

<style scoped>
.tooltip-wrapper { position: relative; display: inline-block; }
.tooltip {
  position: absolute;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-primary);
  font-size: var(--font-size-xs);
  font-weight: 600;
  white-space: nowrap;
  z-index: 9999;
  pointer-events: none;
  box-shadow: var(--shadow-lg);
}
.tooltip-top { bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
.tooltip-bottom { top: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
.tooltip-left { right: calc(100% + 8px); top: 50%; transform: translateY(-50%); }
.tooltip-right { left: calc(100% + 8px); top: 50%; transform: translateY(-50%); }
.tooltip-fade-enter-active, .tooltip-fade-leave-active { transition: opacity var(--transition-fast); }
.tooltip-fade-enter-from, .tooltip-fade-leave-to { opacity: 0; }
</style>
