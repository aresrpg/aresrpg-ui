<template>
  <div class="theme-switcher" :class="{ sticky: sticky }">
    <button
      v-for="theme in themes"
      :key="theme"
      :class="['theme-button', { active: currentTheme === theme }]"
      :title="`Switch to ${theme} theme`"
      :aria-label="`Switch to ${capitalizeTheme(theme)} theme`"
      @click="setTheme(theme)"
    >
      <span :class="`theme-icon theme-icon-${theme}`">
        <i :class="getThemeIcon(theme)"></i>
      </span>
      <span class="theme-label">{{ capitalizeTheme(theme) }}</span>
    </button>
  </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme.js'

/**
 * Theme switcher component
 * Displays buttons for each available theme
 *
 * @param {boolean} sticky - Make the theme switcher sticky to the top
 */
defineProps({
  sticky: {
    type: Boolean,
    default: false
  }
})

const { currentTheme, themes, setTheme } = useTheme()

/**
 * Get icon class for theme
 * @param {string} theme - Theme name
 * @returns {string} Icon class
 */
function getThemeIcon(theme) {
  const icons = {
    dark: 'bx bx-moon',
    white: 'bx bx-sun',
    blue: 'bx bx-water',
    matrix: 'bx bx-code-alt',
    neumorphism: 'bx bx-cube'
  }
  return icons[theme] || 'bx bx-palette'
}

/**
 * Capitalize theme name
 * @param {string} theme - Theme name
 * @returns {string} Capitalized theme name
 */
function capitalizeTheme(theme) {
  return theme.charAt(0).toUpperCase() + theme.slice(1)
}
</script>

<style scoped>
.theme-switcher {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
  align-items: center;
}

.theme-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-md);
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-base);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: 600;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);
}

.theme-button:hover {
  background: var(--glass-bg-medium);
  border-color: var(--glass-border-bright);
  color: var(--color-text-primary);
  transform: translateY(-2px);
}

.theme-button.active {
  background: var(--gradient-primary);
  border-color: transparent;
  color: #ffffff;
  box-shadow: var(--glow-primary);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.theme-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  width: 24px;
  height: 24px;
}

.theme-icon-dark i {
  color: #FFCA28;
}

.theme-icon-white i {
  color: #3b82f6;
}

.theme-icon-blue i {
  color: #38bdf8;
}

.theme-icon-matrix i {
  color: #00ff41;
}

.theme-icon-neumorphism i {
  color: #667eea;
}

.theme-button.active .theme-icon i {
  color: currentColor;
}

.theme-label {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Sticky variant */
.theme-switcher.sticky {
  position: sticky;
  top: var(--spacing-md);
  z-index: 1000;
  padding: var(--spacing-sm);
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

@media (max-width: 768px) {
  .theme-label {
    display: none;
  }

  .theme-button {
    padding: var(--spacing-xs);
  }
}
</style>
