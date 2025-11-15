<template>
  <div class="tabs">
    <div class="tabs-header">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab-button"
        :class="{ active: modelValue === index }"
        @click="selectTab(index)"
      >
        <i v-if="tab.icon" :class="tab.icon"></i>
        {{ tab.label }}
        <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
      </button>
    </div>
    <div class="tabs-content">
      <slot :name="`tab-${modelValue}`"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: Number, default: 0 },
  tabs: { type: Array, required: true }
})

const emit = defineEmits(['update:modelValue', 'change'])

function selectTab(index) {
  emit('update:modelValue', index)
  emit('change', index)
}
</script>

<style scoped>
.tabs {
  background: var(--glass-bg);
  backdrop-filter: blur(25px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.tabs-header {
  display: flex;
  border-bottom: 1px solid var(--glass-border);
  background: var(--glass-bg-light);
}
.tab-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--color-text-secondary);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: var(--transition-fast);
  position: relative;
}
.tab-button:hover { background: var(--glass-bg-medium); color: var(--color-text-primary); }
.tab-button.active {
  color: var(--color-accent-primary);
  border-bottom-color: var(--color-accent-primary);
  background: var(--glass-bg-medium);
}
.tab-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 var(--spacing-xs);
  background: var(--color-accent-primary);
  color: var(--color-bg-primary);
  font-size: var(--font-size-xs);
  font-weight: 700;
  border-radius: var(--radius-lg);
}
.tabs-content { padding: var(--spacing-lg); }
</style>
