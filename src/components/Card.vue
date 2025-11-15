<template>
  <div
    ref="cardRef"
    :class="['card', { 'card-hover': hoverable, 'card-visible': isVisible }]"
  >
    <div v-if="$slots.icon || icon !== ''" class="card-icon">
      <slot name="icon">
        <i v-if="icon" :class="icon"></i>
      </slot>
    </div>

    <div v-if="$slots.header || title || description" class="card-header">
      <h3 v-if="title || $slots.title" class="card-title">
        <slot name="title">{{ title }}</slot>
      </h3>
      <p v-if="description || $slots.description" class="card-description">
        <slot name="description">{{ description }}</slot>
      </p>
    </div>

    <div class="card-content">
      <slot />
    </div>

    <div v-if="$slots.footer" class="card-footer">
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
.card {
  background: var(--glass-bg);
  backdrop-filter: blur(25px) saturate(180%);
  -webkit-backdrop-filter: blur(25px) saturate(180%);
  border-radius: 12px;
  border: 1px solid var(--glass-border);
  padding: 20px;
  transition: all 0.2s ease;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1);

  /* Subtle scroll-reveal animation - starts hidden */
  opacity: 0;
  transform: translateY(10px);
}

/* Scroll-reveal animation - when visible */
.card-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Subtle hover effect */
.card-hover:hover {
  border-color: var(--glass-border-bright);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

/* Neumorphism theme overrides */
[data-theme="neumorphism"] .card {
  background: var(--color-bg-primary);
  border: none;
  box-shadow: 4px 4px 8px rgba(163, 177, 198, 0.35),
              -4px -4px 8px rgba(255, 255, 255, 0.45);
}

[data-theme="neumorphism"] .card-hover:hover {
  box-shadow: 3px 3px 6px rgba(163, 177, 198, 0.35),
              -3px -3px 6px rgba(255, 255, 255, 0.45);
  transform: translateY(0);
}

/* Card content */
.card-icon {
  width: 40px;
  height: 40px;
  background: var(--glass-bg-medium);
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 12px;
  color: var(--color-accent-primary);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(25px);
}

[data-theme="neumorphism"] .card-icon {
  background: var(--color-bg-primary);
  border: none;
  box-shadow: 2px 2px 4px rgba(163, 177, 198, 0.35),
              -2px -2px 4px rgba(255, 255, 255, 0.45);
}

.card-header {
  margin-bottom: 12px;
}

.card-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin-bottom: 6px;
  text-transform: uppercase;
  color: var(--color-text-primary);
  letter-spacing: 0.02em;
}

.card-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.5;
}

.card-content {
  color: var(--color-text-primary);
}

.card-footer {
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--glass-border);
}

[data-theme="neumorphism"] .card-footer {
  border-top: 1px solid rgba(163, 177, 198, 0.2);
}
</style>
