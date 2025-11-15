<template>
  <div
    ref="cardRef"
    :class="['refined-card', { 'refined-card-hover': hoverable, 'refined-card-visible': isVisible }]"
  >
    <div v-if="$slots.icon || icon" class="refined-card-icon">
      <slot name="icon">
        <i :class="icon"></i>
      </slot>
    </div>

    <div v-if="$slots.header || title || description" class="refined-card-header">
      <h3 v-if="title || $slots.title" class="refined-card-title">
        <slot name="title">{{ title }}</slot>
      </h3>
      <p v-if="description || $slots.description" class="refined-card-description">
        <slot name="description">{{ description }}</slot>
      </p>
    </div>

    <div class="refined-card-content">
      <slot />
    </div>

    <div v-if="$slots.footer" class="refined-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Refined glassmorphism card with subtle improvements
 * Clean design with thin borders, better spacing, and refined shadows
 * @param {string} title - Card title
 * @param {string} description - Card description
 * @param {string} icon - Icon class (e.g., 'bx bx-star')
 * @param {boolean} hoverable - Enable hover effects
 */
const props = defineProps({
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

const cardRef = ref(null)
const isVisible = ref(false)

/**
 * Subtle scroll-reveal animation using Intersection Observer
 */
function setupScrollReveal() {
  if (!cardRef.value) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  observer.observe(cardRef.value)

  return () => {
    if (cardRef.value) observer.unobserve(cardRef.value)
  }
}

onMounted(() => {
  const cleanup = setupScrollReveal()
  onUnmounted(cleanup)
})
</script>

<style scoped>
.refined-card {
  background: var(--glass-bg);
  backdrop-filter: blur(25px) saturate(180%);
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  padding: 20px;
  transition: all 0.2s ease;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

  /* Subtle scroll-reveal animation - starts hidden */
  opacity: 0;
  transform: translateY(10px);
}

/* Scroll-reveal animation - when visible */
.refined-card-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Subtle hover effect */
.refined-card-hover:hover {
  border-color: var(--glass-border-bright);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

/* Neumorphism theme overrides */
[data-theme="neumorphism"] .refined-card {
  background: var(--color-bg-primary);
  border: none;
  box-shadow: 4px 4px 8px rgba(163, 177, 198, 0.35),
              -4px -4px 8px rgba(255, 255, 255, 0.45);
}

[data-theme="neumorphism"] .refined-card-hover:hover {
  box-shadow: 3px 3px 6px rgba(163, 177, 198, 0.35),
              -3px -3px 6px rgba(255, 255, 255, 0.45);
  transform: translateY(0);
}

/* Card content */
.refined-card-icon {
  width: 40px;
  height: 40px;
  background: var(--glass-bg-medium);
  border: 1px solid var(--glass-border);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 12px;
  color: var(--color-accent-primary);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(25px);
}

[data-theme="neumorphism"] .refined-card-icon {
  background: var(--color-bg-primary);
  border: none;
  box-shadow: 2px 2px 4px rgba(163, 177, 198, 0.35),
              -2px -2px 4px rgba(255, 255, 255, 0.45);
}

.refined-card-header {
  margin-bottom: 12px;
}

.refined-card-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin-bottom: 6px;
  text-transform: uppercase;
  color: var(--color-text-primary);
  letter-spacing: 0.02em;
}

.refined-card-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.5;
}

.refined-card-content {
  color: var(--color-text-primary);
}

.refined-card-footer {
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--glass-border);
}

[data-theme="neumorphism"] .refined-card-footer {
  border-top: 1px solid rgba(163, 177, 198, 0.2);
}
</style>
