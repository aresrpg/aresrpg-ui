import { ref, watch, onMounted } from 'vue'

/**
 * Theme composable for managing app themes
 * Supports: dark (default), neumorphism (light)
 *
 * @returns {Object} Theme management utilities
 */
export function useTheme() {
  const STORAGE_KEY = 'aresrpg-ui-theme'
  const THEMES = ['dark', 'neumorphism']

  const currentTheme = ref('dark')

  /**
   * Set the active theme
   * @param {string} theme - Theme name (dark/white/blue/matrix)
   */
  function setTheme(theme) {
    if (!THEMES.includes(theme)) {
      console.warn(`Invalid theme: ${theme}. Using 'dark' as fallback.`)
      theme = 'dark'
    }

    currentTheme.value = theme
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }

  /**
   * Get the current theme
   * @returns {string} Current theme name
   */
  function getTheme() {
    return currentTheme.value
  }

  /**
   * Toggle to next theme in cycle
   */
  function toggleTheme() {
    const currentIndex = THEMES.indexOf(currentTheme.value)
    const nextIndex = (currentIndex + 1) % THEMES.length
    setTheme(THEMES[nextIndex])
  }

  /**
   * Load theme from localStorage or use default
   */
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY)

    if (savedTheme && THEMES.includes(savedTheme)) {
      setTheme(savedTheme)
    } else {
      setTheme('dark')
    }
  }

  // Auto-init on mount
  onMounted(() => {
    initTheme()
  })

  // Watch theme changes
  watch(currentTheme, (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme)
  })

  return {
    currentTheme,
    themes: THEMES,
    setTheme,
    getTheme,
    toggleTheme,
    initTheme
  }
}
