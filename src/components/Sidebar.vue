<template>
  <aside class="sidebar" :class="{ collapsed: isCollapsed, open: isOpen }">
    <!-- Header -->
    <div class="sidebar-header">
      <slot name="header">
        <div class="sidebar-brand">
          <i v-if="icon" :class="icon"></i>
          <span v-if="!isCollapsed" class="sidebar-title">{{ title }}</span>
        </div>
      </slot>
      <button
        v-if="collapsible"
        class="collapse-btn"
        :aria-label="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        @click="toggleCollapse"
      >
        <i :class="isCollapsed ? 'bx bx-chevron-right' : 'bx bx-chevron-left'"></i>
      </button>
    </div>

    <!-- Navigation Items -->
    <nav class="sidebar-nav">
      <slot name="nav">
        <template v-for="(item, index) in items" :key="index">
          <!-- Parent Item -->
          <div
            class="nav-item"
            :class="{
              active: item.active,
              disabled: item.disabled,
              'has-children': item.children && item.children.length > 0,
              'expanded': expandedItems.includes(index)
            }"
            @click="handleItemClick(item, index, $event)"
          >
            <i v-if="item.icon" :class="item.icon"></i>
            <span v-if="!isCollapsed" class="nav-label">{{ item.label }}</span>
            <span v-if="item.badge && !isCollapsed" class="nav-badge">{{ item.badge }}</span>
            <i
              v-if="item.children && item.children.length > 0 && !isCollapsed"
              class="nav-expand-icon bx"
              :class="expandedItems.includes(index) ? 'bx-chevron-down' : 'bx-chevron-right'"
            ></i>
          </div>

          <!-- Sub Items -->
          <transition name="submenu">
            <div
              v-if="item.children && item.children.length > 0 && expandedItems.includes(index) && !isCollapsed"
              class="nav-subitems"
            >
              <div
                v-for="(child, childIndex) in item.children"
                :key="`${index}-${childIndex}`"
                class="nav-subitem"
                :class="{ active: child.active, disabled: child.disabled }"
                @click="handleSubItemClick(child, $event)"
              >
                <i v-if="child.icon" :class="child.icon"></i>
                <span class="nav-label">{{ child.label }}</span>
                <span v-if="child.badge" class="nav-badge">{{ child.badge }}</span>
              </div>
            </div>
          </transition>
        </template>
      </slot>
    </nav>

    <!-- Footer -->
    <div v-if="$slots.footer" class="sidebar-footer">
      <slot name="footer"></slot>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch } from 'vue'

/**
 * Glassmorphism Sidebar Component
 *
 * @component Sidebar
 * @description Vertical navigation sidebar with glassmorphism styling
 *
 * @param {string} title - Sidebar title/brand
 * @param {string} icon - Icon class for brand (e.g., 'bx bx-grid-alt')
 * @param {Array} items - Navigation items array
 * @param {boolean} collapsible - Enable collapse/expand functionality
 * @param {boolean} collapsed - Initial collapsed state
 * @param {string} position - Sidebar position: 'left' | 'right'
 *
 * @emits item-click - Emitted when a nav item is clicked
 * @emits collapse - Emitted when sidebar is collapsed/expanded
 *
 * @slot header - Custom header content
 * @slot nav - Custom navigation items
 * @slot footer - Footer content (e.g., user profile, logout)
 *
 * @example
 * <Sidebar
 *   title="Dashboard"
 *   icon="bx bx-grid-alt"
 *   :items="[
 *     { label: 'Home', icon: 'bx bx-home', active: true },
 *     { label: 'Settings', icon: 'bx bx-cog', badge: '3' }
 *   ]"
 *   :collapsible="true"
 * >
 *   <template #footer>
 *     <Button variant="outline" size="sm">Logout</Button>
 *   </template>
 * </Sidebar>
 */

const props = defineProps({
  title: {
    type: String,
    default: 'Menu'
  },
  icon: {
    type: String,
    default: ''
  },
  items: {
    type: Array,
    default: () => []
  },
  collapsible: {
    type: Boolean,
    default: true
  },
  collapsed: {
    type: Boolean,
    default: false
  },
  position: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value)
  },
  open: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['item-click', 'collapse', 'update:open'])

const isCollapsed = ref(props.collapsed)
const isOpen = ref(props.open)
const expandedItems = ref([])

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
  emit('collapse', isCollapsed.value)
}

function toggleOpen() {
  isOpen.value = !isOpen.value
  emit('update:open', isOpen.value)
}

function handleItemClick(item, index, event) {
  if (item.disabled) return

  // Toggle expansion if item has children
  if (item.children && item.children.length > 0) {
    event.stopPropagation()
    const expandedIndex = expandedItems.value.indexOf(index)
    if (expandedIndex > -1) {
      expandedItems.value.splice(expandedIndex, 1)
    } else {
      expandedItems.value.push(index)
    }
    return
  }

  emit('item-click', { item, event })
  // Close sidebar on mobile after item click
  if (window.innerWidth <= 768) {
    isOpen.value = false
    emit('update:open', false)
  }
}

function handleSubItemClick(child, event) {
  if (child.disabled) return
  emit('item-click', { item: child, event })
  // Close sidebar on mobile after item click
  if (window.innerWidth <= 768) {
    isOpen.value = false
    emit('update:open', false)
  }
}

// Watch for prop changes
watch(() => props.open, (newValue) => {
  isOpen.value = newValue
})
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: 260px;
  min-height: 100vh;
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  border-right: 1px solid var(--glass-border);
  position: relative;
  transition: width var(--transition-base);
  z-index: 50;
}

.sidebar::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-glass);
  opacity: 0.2;
  pointer-events: none;
}

/* Collapsed state */
.sidebar.collapsed {
  width: 70px;
}

/* Header */
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--glass-border);
  position: relative;
  z-index: 1;
}

.sidebar.collapsed .sidebar-header {
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-lg);
  font-weight: 900;
  color: var(--color-text-primary);
  white-space: nowrap;
}

.sidebar-brand i {
  font-size: 1.5em;
  min-width: 1.5em;
  color: var(--color-accent-primary);
}

.sidebar-title {
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sidebar.collapsed .sidebar-title {
  display: none;
}

/* Collapse Button */
.collapse-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--glass-bg-light);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: var(--transition-fast);
  flex-shrink: 0;
}

.collapse-btn:hover {
  background: var(--glass-bg-medium);
  color: var(--color-accent-primary);
  transform: scale(1.1);
}

/* Navigation */
.sidebar-nav {
  flex: 1;
  padding: var(--spacing-md);
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-xs);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: 600;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-fast);
  position: relative;
  white-space: nowrap;
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: var(--gradient-primary);
  border-radius: var(--radius-sm);
  transition: var(--transition-fast);
}

.nav-item:hover {
  background: var(--glass-bg-medium);
  color: var(--color-text-primary);
  transform: translateX(4px);
}

.nav-item:hover::before {
  height: 70%;
}

.nav-item.active {
  background: var(--glass-bg-medium);
  color: var(--color-accent-primary);
  box-shadow: inset 0 0 0 1px var(--glass-border-bright);
}

.nav-item.active::before {
  height: 70%;
}

.nav-item.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.nav-item i {
  font-size: 1.5em;
  min-width: 1.5em;
  text-align: center;
  flex-shrink: 0;
}

.nav-label {
  flex: 1;
}

.sidebar.collapsed .nav-label {
  display: none;
}

/* Badge */
.nav-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 var(--spacing-xs);
  background: var(--color-accent-primary);
  color: var(--color-bg-primary);
  font-size: var(--font-size-xs);
  font-weight: 700;
  border-radius: var(--radius-lg);
  flex-shrink: 0;
}

.sidebar.collapsed .nav-badge {
  display: none;
}

/* Expand icon for items with children */
.nav-expand-icon {
  margin-left: auto;
  font-size: 1.2em;
  transition: transform var(--transition-fast);
}

.nav-item.expanded .nav-expand-icon {
  transform: rotate(0deg);
}

/* Sub-items */
.nav-subitems {
  overflow: hidden;
}

.nav-subitem {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md) var(--spacing-sm) var(--spacing-2xl);
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
  font-weight: 600;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition-fast);
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  margin: var(--spacing-xs) 0;
}

.nav-subitem::before {
  content: '';
  position: absolute;
  left: var(--spacing-lg);
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background: var(--color-text-tertiary);
  border-radius: 50%;
  transition: var(--transition-fast);
}

.nav-subitem:hover {
  background: var(--glass-bg-light);
  color: var(--color-text-primary);
  padding-left: calc(var(--spacing-2xl) + var(--spacing-xs));
}

.nav-subitem:hover::before {
  background: var(--color-accent-primary);
  transform: translateY(-50%) scale(1.3);
}

.nav-subitem.active {
  background: var(--glass-bg-light);
  color: var(--color-accent-primary);
}

.nav-subitem.active::before {
  background: var(--color-accent-primary);
  transform: translateY(-50%) scale(1.3);
}

.nav-subitem.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.nav-subitem i {
  font-size: 1.2em;
  min-width: 1.2em;
  text-align: center;
  flex-shrink: 0;
}

/* Submenu transition */
.submenu-enter-active,
.submenu-leave-active {
  transition: all var(--transition-base);
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.submenu-enter-to,
.submenu-leave-from {
  opacity: 1;
  max-height: 500px;
  transform: translateY(0);
}

/* Footer */
.sidebar-footer {
  padding: var(--spacing-lg);
  border-top: 1px solid var(--glass-border);
  z-index: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    transform: translateX(-100%);
    transition: transform var(--transition-base);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .sidebar.collapsed {
    width: 260px;
  }
}

/* Scrollbar */
.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: var(--glass-bg-medium);
  border-radius: var(--radius-sm);
}
</style>
