<template>
  <nav class="navbar">
    <!-- Logo/Brand -->
    <div class="navbar-brand">
      <slot name="brand">
        <i v-if="icon" :class="icon"></i>
        <span v-if="title" class="navbar-title">{{ title }}</span>
      </slot>
    </div>

    <!-- Navigation Links -->
    <div class="navbar-nav">
      <slot name="nav">
        <a
          v-for="(link, index) in links"
          :key="index"
          :href="link.href"
          class="nav-link"
          :class="{ active: link.active }"
          @click="handleLinkClick(link, $event)"
        >
          <i v-if="link.icon" :class="link.icon"></i>
          <span>{{ link.label }}</span>
        </a>
      </slot>
    </div>

    <!-- Actions (right side) -->
    <div class="navbar-actions">
      <slot name="actions"></slot>
    </div>
  </nav>
</template>

<script setup>
/**
 * Glassmorphism Navbar Component
 *
 * @component Navbar
 * @description Horizontal navigation bar with glassmorphism styling
 *
 * @param {string} title - Navbar brand title
 * @param {string} icon - Icon class for brand (e.g., 'bx bx-home')
 * @param {Array} links - Navigation links array
 * @param {boolean} sticky - Make navbar sticky to top
 *
 * @emits link-click - Emitted when a nav link is clicked
 *
 * @slot brand - Custom brand/logo content
 * @slot nav - Custom navigation links
 * @slot actions - Right-side actions (buttons, user menu, etc.)
 *
 * @example
 * <Navbar
 *   title="AresRPG"
 *   icon="bx bx-game"
 *   :links="[
 *     { label: 'Home', href: '/', icon: 'bx bx-home', active: true },
 *     { label: 'About', href: '/about', icon: 'bx bx-info-circle' }
 *   ]"
 *   :sticky="true"
 * >
 *   <template #actions>
 *     <Button size="sm">Login</Button>
 *   </template>
 * </Navbar>
 */

defineProps({
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  links: {
    type: Array,
    default: () => []
  },
  sticky: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['link-click'])

function handleLinkClick(link, event) {
  emit('link-click', { link, event })
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-lg);
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--glass-border);
  border-bottom-left-radius: var(--radius-lg);
  position: relative;
  z-index: 100;
}

.navbar::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-glass);
  opacity: 0.3;
  pointer-events: none;
  border-bottom-left-radius: var(--radius-lg);
}

/* Brand/Logo */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-xl);
  font-weight: 900;
  color: var(--color-text-primary);
  z-index: 1;
  cursor: pointer;
  transition: var(--transition-fast);
}

.navbar-brand:hover {
  color: var(--color-accent-primary);
  transform: translateY(-1px);
}

.navbar-brand i {
  font-size: 1.5em;
}

.navbar-title {
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Navigation Links */
.navbar-nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex: 1;
  justify-content: center;
  z-index: 1;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: var(--font-size-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: var(--radius-md);
  transition: var(--transition-fast);
  position: relative;
}

.nav-link::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--glass-bg-light);
  border-radius: var(--radius-md);
  opacity: 0;
  transition: var(--transition-fast);
}

.nav-link:hover::before {
  opacity: 1;
}

.nav-link:hover {
  color: var(--color-text-primary);
  transform: translateY(-2px);
}

.nav-link.active {
  color: var(--color-accent-primary);
  background: var(--glass-bg-medium);
  box-shadow: inset 0 0 0 1px var(--glass-border);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30%;
  height: 2px;
  background: var(--gradient-primary);
  border-radius: var(--radius-sm);
}

.nav-link i {
  font-size: 1.2em;
}

/* Actions */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  z-index: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    flex-wrap: wrap;
    padding: var(--spacing-sm) var(--spacing-md);
  }

  .navbar-nav {
    order: 3;
    width: 100%;
    justify-content: flex-start;
    padding-top: var(--spacing-sm);
    border-top: 1px solid var(--glass-border);
  }

  .nav-link {
    font-size: var(--font-size-xs);
    padding: var(--spacing-xs) var(--spacing-sm);
  }
}
</style>
