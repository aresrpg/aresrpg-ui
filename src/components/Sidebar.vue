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
/* Vuesax sidebar base styles */
.sidebar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  width: 260px;
  min-height: 100vh;
  border-radius: 0 30px 30px 0;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.05);
  /* aresrpg-dapp custom override */
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  transition: all 0.25s ease;
  z-index: 10;
}

/* Collapsed state */
.sidebar.collapsed {
  width: 70px;
}

/* Vuesax header (logo section) */
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px 0;
  min-height: 60px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
  justify-content: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-lg);
  font-weight: 900;
  color: #fff;
  white-space: nowrap;
  padding: 0 1em;
  width: 100%;
}

.sidebar-brand i {
  font-size: 1.5em;
  min-width: 1.5em;
  color: #fff;
}

/* aresrpg-dapp logo style with drop shadow */
.sidebar-title {
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #fff;
  /* aresrpg-dapp override: drop shadow */
  filter: drop-shadow(1px 2px 3px black);
  max-width: 100%;
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
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: var(--transition-fast);
  flex-shrink: 0;
}

.collapse-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  transform: scale(1.1);
}

/* Vuesax navigation body */
.sidebar-nav {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
  z-index: 1;
}

/* Hide scrollbar like vuesax */
.sidebar-nav::-webkit-scrollbar {
  width: 0;
}

/* Vuesax sidebar item styles */
.nav-item {
  transition: all 0.25s ease;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 10px 12px;
  text-align: left;
  background: transparent;
  font-size: 0.9rem;
  font-weight: 600;
  opacity: 0.7;
  position: relative;
  /* aresrpg-dapp override: white text */
  color: rgba(255, 255, 255, 0.7);
  border: 0;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
}

/* Active indicator bar on LEFT side (vuesax pattern) */
.nav-item::after {
  content: '';
  position: absolute;
  left: -4px;
  top: 0;
  width: 10px;
  height: 100%;
  /* aresrpg-dapp override: white bar */
  background: #fff;
  border-radius: 0 20px 20px 0;
  transform: translate(-7px);
  transition: all 0.25s ease;
  z-index: 60;
}

.nav-item:hover {
  opacity: 1;
  padding-left: 18px;
}

.nav-item.active {
  opacity: 1;
  padding-left: 18px;
  /* aresrpg-dapp override: white text when active */
  color: #fff !important;
}

.nav-item.active::after {
  transform: translate(-1px);
  /* aresrpg-dapp override: white bar */
  background: #fff !important;
}

.nav-item.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

/* Vuesax icon styling */
.nav-item i {
  min-width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  z-index: 50;
  /* aresrpg-dapp override: no background */
  background: none;
}

/* Vuesax text label */
.nav-label {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  z-index: 10;
  transition: all 0.25s ease;
  font-size: 0.9rem;
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
  color: rgba(255, 255, 255, 0.6);
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
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  transition: var(--transition-fast);
}

.nav-subitem:hover {
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.9);
  padding-left: calc(var(--spacing-2xl) + var(--spacing-xs));
}

.nav-subitem:hover::before {
  background: #fff;
  transform: translateY(-50%) scale(1.3);
}

.nav-subitem.active {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.nav-subitem.active::before {
  background: #fff;
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

/* Vuesax footer */
.sidebar-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: flex-start;
  width: 100%;
  padding: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
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

</style>
