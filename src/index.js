// Import global styles
import './styles/themes.css'

// Import components
import Button from './components/Button.vue'
import Card from './components/Card.vue'
import Modal from './components/Modal.vue'
import Badge from './components/Badge.vue'
import Input from './components/Input.vue'
import Textarea from './components/Textarea.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import Dropdown from './components/Dropdown.vue'
import Tooltip from './components/Tooltip.vue'
import Avatar from './components/Avatar.vue'
import Alert from './components/Alert.vue'
import Toggle from './components/Toggle.vue'
import Tabs from './components/Tabs.vue'
import Skeleton from './components/Skeleton.vue'
import EmptyState from './components/EmptyState.vue'
import ProgressBar from './components/ProgressBar.vue'
import Chart from './components/Chart.vue'
import AuthForm from './components/AuthForm.vue'
import AuthCard from './components/AuthCard.vue'
import EnhancedButton from './components/EnhancedButton.vue'
import EnhancedCard from './components/EnhancedCard.vue'
import EnhancedInput from './components/EnhancedInput.vue'
import Notification from './components/Notification.vue'
import NotificationContainer from './components/NotificationContainer.vue'
import ChatMessage from './components/ChatMessage.vue'
import ChatMessageList from './components/ChatMessageList.vue'
import ChatInput from './components/ChatInput.vue'

// Import composables
import { useTheme } from './composables/useTheme.js'
import { useNotification } from './composables/useNotification.js'

// Component map for global registration
const components = {
  Button,
  Card,
  Modal,
  Badge,
  Input,
  Textarea,
  ThemeSwitcher,
  Navbar,
  Sidebar,
  Dropdown,
  Tooltip,
  Avatar,
  Alert,
  Toggle,
  Tabs,
  Skeleton,
  EmptyState,
  ProgressBar,
  Chart,
  AuthForm,
  AuthCard,
  EnhancedButton,
  EnhancedCard,
  EnhancedInput,
  Notification,
  NotificationContainer,
  ChatMessage,
  ChatMessageList,
  ChatInput
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
  Textarea,
  ThemeSwitcher,
  Navbar,
  Sidebar,
  Dropdown,
  Tooltip,
  Avatar,
  Alert,
  Toggle,
  Tabs,
  Skeleton,
  EmptyState,
  ProgressBar,
  Chart,
  AuthForm,
  AuthCard,
  EnhancedButton,
  EnhancedCard,
  EnhancedInput,
  Notification,
  NotificationContainer,
  ChatMessage,
  ChatMessageList,
  ChatInput,
  useTheme,
  useNotification
}

// Export install function and components
export default {
  install,
  ...components
}
