<template>
  <div :class="['glass-card', { 'glass-card-hover': hoverable }]">
    <div v-if="$slots.icon || icon" class="glass-card-icon">
      <slot name="icon">
        <i :class="icon"></i>
      </slot>
    </div>

    <div v-if="$slots.header || title || description" class="glass-card-header">
      <h3 v-if="title || $slots.title" class="glass-card-title">
        <slot name="title">{{ title }}</slot>
      </h3>
      <p v-if="description || $slots.description" class="glass-card-description">
        <slot name="description">{{ description }}</slot>
      </p>
    </div>

    <div class="glass-card-content">
      <slot />
    </div>

    <div v-if="$slots.footer" class="glass-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
/**
 * Glass morphism card component
 * @param {string} title - Card title
 * @param {string} description - Card description
 * @param {string} icon - Icon class (e.g., 'bx bx-star')
 * @param {boolean} hoverable - Enable hover effect
 */
defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  hoverable: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border);
  padding: var(--spacing-lg);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05),
              0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gradient-border);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.glass-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, transparent 50%, rgba(255, 255, 255, 0.01) 100%);
  pointer-events: none;
  border-radius: var(--radius-lg);
}

.glass-card-hover:hover {
  transform: translateY(-4px);
  border-color: var(--glass-border-bright);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1),
              0 16px 48px 0 rgba(0, 0, 0, 0.5),
              var(--glow-primary);
  backdrop-filter: blur(24px) saturate(200%);
}

.glass-card-hover:hover::before {
  opacity: 1;
}

.glass-card-hover:hover::after {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, transparent 50%, rgba(255, 202, 40, 0.02) 100%);
}

.glass-card-icon {
  width: 48px;
  height: 48px;
  background: var(--gradient-glass);
  border: 1px solid var(--glass-border-bright);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: var(--spacing-md);
  color: var(--color-accent-primary);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05),
              0 0 20px rgba(255, 202, 40, 0.15);
  backdrop-filter: blur(20px);
  position: relative;
  z-index: 1;
}

.glass-card-header {
  margin-bottom: var(--spacing-md);
  position: relative;
  z-index: 1;
}

.glass-card-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: var(--spacing-xs);
  text-transform: uppercase;
  color: var(--color-text-primary);
}

.glass-card-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.glass-card-content {
  position: relative;
  z-index: 1;
}

.glass-card-footer {
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--glass-border);
  position: relative;
  z-index: 1;
}
</style>
