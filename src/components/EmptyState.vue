<template>
  <div class="empty-state">
    <div v-if="icon" class="empty-state-icon">
      <i :class="icon"></i>
    </div>
    <h3 v-if="title" class="empty-state-title">
      <slot name="title">{{ title }}</slot>
    </h3>
    <p v-if="message" class="empty-state-message">
      <slot name="message">{{ message }}</slot>
    </p>
    <div v-if="$slots.action" class="empty-state-action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script setup>
/**
 * Empty state component for no-data scenarios
 * @param {string} icon - Icon class (e.g., 'bx bx-inbox')
 * @param {string} title - Title text
 * @param {string} message - Message text
 */
defineProps({
  icon: {
    type: String,
    default: 'bx bx-inbox'
  },
  title: {
    type: String,
    default: 'No data'
  },
  message: {
    type: String,
    default: 'There is nothing to display here.'
  }
})
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-2xl);
  min-height: 300px;
}

.empty-state-icon {
  font-size: 4em;
  color: var(--color-text-dim);
  margin-bottom: var(--spacing-lg);
  opacity: 0.5;
}

.empty-state-icon i {
  display: block;
}

.empty-state-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.empty-state-message {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
  max-width: 400px;
}

.empty-state-action {
  margin-top: var(--spacing-md);
}
</style>
