<template>
  <div
    ref="cardRef"
    :class="['enhanced-card', { 'enhanced-card-hover': hoverable, 'enhanced-card-visible': isVisible }]"
    :style="tiltStyle"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Cursor-tracking light reflection -->
    <div class="light-reflection" :style="lightReflectionStyle"></div>

    <!-- Gradient noise overlay -->
    <div class="noise-overlay"></div>

    <!-- Organic shape background -->
    <div class="organic-shape"></div>

    <div v-if="$slots.icon || icon" class="enhanced-card-icon">
      <slot name="icon">
        <i :class="icon"></i>
      </slot>
    </div>

    <div v-if="$slots.header || title || description" class="enhanced-card-header">
      <h3 v-if="title || $slots.title" class="enhanced-card-title">
        <slot name="title">{{ title }}</slot>
      </h3>
      <p v-if="description || $slots.description" class="enhanced-card-description">
        <slot name="description">{{ description }}</slot>
      </p>
    </div>

    <div class="enhanced-card-content">
      <slot />
    </div>

    <div v-if="$slots.footer" class="enhanced-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

/**
 * Enhanced glassmorphism card with 2025 design trends
 * Features: 3D tilt, cursor-tracking light, scroll-reveal, noise texture
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
const mouseX = ref(0)
const mouseY = ref(0)
const isHovered = ref(false)

// 3D tilt effect based on mouse position
const tiltStyle = computed(() => {
  if (!isHovered.value || !props.hoverable) return {}

  const xRotation = ((mouseY.value - 0.5) * 10).toFixed(2) // -5 to 5 degrees
  const yRotation = ((mouseX.value - 0.5) * -10).toFixed(2) // -5 to 5 degrees

  return {
    transform: `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) translateZ(10px)`,
    '--mouse-x': mouseX.value,
    '--mouse-y': mouseY.value
  }
})

// Light reflection that follows cursor
const lightReflectionStyle = computed(() => {
  if (!isHovered.value) return { opacity: 0 }

  return {
    background: `radial-gradient(circle at ${mouseX.value * 100}% ${mouseY.value * 100}%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)`,
    opacity: 1
  }
})

/**
 * Handle mouse move for tilt and light effects
 */
function handleMouseMove(event) {
  if (!cardRef.value || !props.hoverable) return

  const rect = cardRef.value.getBoundingClientRect()
  mouseX.value = (event.clientX - rect.left) / rect.width
  mouseY.value = (event.clientY - rect.top) / rect.height
  isHovered.value = true
}

/**
 * Reset effects on mouse leave
 */
function handleMouseLeave() {
  isHovered.value = false
}

/**
 * Scroll-reveal animation using Intersection Observer
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
.enhanced-card {
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border);
  padding: var(--spacing-lg);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05),
              0 8px 32px 0 rgba(0, 0, 0, 0.37);
  transform-style: preserve-3d;

  /* Scroll-reveal animation - starts hidden */
  opacity: 0;
  transform: translateY(30px);
}

/* Scroll-reveal animation - when visible */
.enhanced-card-visible {
  opacity: 1;
  transform: translateY(0);
  animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Cursor-tracking light reflection */
.light-reflection {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  border-radius: var(--radius-lg);
  transition: opacity 0.3s ease;
  z-index: 1;
}

/* Gradient noise texture overlay */
.noise-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
  opacity: 0.3;
  pointer-events: none;
  border-radius: var(--radius-lg);
  z-index: 0;
}

/* Organic shape background */
.organic-shape {
  position: absolute;
  bottom: -50%;
  right: -30%;
  width: 150%;
  height: 150%;
  background: radial-gradient(circle, rgba(255, 202, 40, 0.1) 0%, transparent 70%);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  opacity: 0;
  transition: opacity 0.5s ease, transform 0.5s ease;
  pointer-events: none;
  z-index: 0;
  animation: morphShape 10s ease-in-out infinite;
}

@keyframes morphShape {
  0%, 100% {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  }
  50% {
    border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
  }
}

/* Gradient border effect */
.enhanced-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gradient-border);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
}

/* Enhanced hover effects */
.enhanced-card-hover:hover {
  border-color: var(--glass-border-bright);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1),
              0 20px 60px 0 rgba(0, 0, 0, 0.5),
              var(--glow-primary);
  backdrop-filter: blur(24px) saturate(200%);
}

.enhanced-card-hover:hover::before {
  opacity: 1;
}

.enhanced-card-hover:hover .organic-shape {
  opacity: 1;
  transform: rotate(5deg) scale(1.1);
}

/* Card content */
.enhanced-card-icon,
.enhanced-card-header,
.enhanced-card-content,
.enhanced-card-footer {
  position: relative;
  z-index: 3;
}

.enhanced-card-icon {
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
  animation: iconFloat 3s ease-in-out infinite;
}

@keyframes iconFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.enhanced-card-header {
  margin-bottom: var(--spacing-md);
}

.enhanced-card-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: var(--spacing-xs);
  text-transform: uppercase;
  color: var(--color-text-primary);
  background: linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-accent-primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.enhanced-card-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.enhanced-card-footer {
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--glass-border);
}
</style>
