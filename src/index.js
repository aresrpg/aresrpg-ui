// Import global styles
import './styles/themes.css'

// Import components
import Button from './components/Button.vue'
import Card from './components/Card.vue'
import Modal from './components/Modal.vue'
import Badge from './components/Badge.vue'
import Input from './components/Input.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import Dropdown from './components/Dropdown.vue'
import Tooltip from './components/Tooltip.vue'
import Avatar from './components/Avatar.vue'
import Alert from './components/Alert.vue'
import Toggle from './components/Toggle.vue'
import Tabs from './components/Tabs.vue'

// Import composables
import { useTheme } from './composables/useTheme.js'

// Component map for global registration
const components = {
  Button,
  Card,
  Modal,
  Badge,
  Input,
  ThemeSwitcher,
  Navbar,
  Sidebar,
  Dropdown,
  Tooltip,
  Avatar,
  Alert,
  Toggle,
  Tabs
}

/**
 * Install function for Vue app
 * @param {Object} app - Vue app instance
 */
function install(app) {
  // Register all components globally
  Object.entries(components).forEach(([name, component]) => {
    app.component(`Ares${name}`, component)
  })
}

// Export individual components
export {
  Button,
  Card,
  Modal,
  Badge,
  Input,
  ThemeSwitcher,
  Navbar,
  Sidebar,
  Dropdown,
  Tooltip,
  Avatar,
  Alert,
  Toggle,
  Tabs,
  useTheme
}

// Export install function and components
export default {
  install,
  ...components
}
