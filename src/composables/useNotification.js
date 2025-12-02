import { ref, readonly } from 'vue'

/**
 * Notification state (global singleton)
 */
const notifications = ref([])
let notificationIdCounter = 0

/**
 * Generate unique notification ID
 * @returns {number}
 */
function generateId() {
  return ++notificationIdCounter
}

/**
 * Add notification to the stack
 * @param {Object} options - Notification options
 * @returns {Object} Notification controller
 */
function addNotification(options) {
  const id = generateId()
  const notification = {
    id,
    ...options,
  }

  notifications.value.push(notification)

  /**
   * Update notification properties
   * @param {Object} updates - Properties to update
   */
  function update(updates) {
    const index = notifications.value.findIndex((n) => n.id === id)
    if (index !== -1) {
      const current = notifications.value[index]

      // Special handling for componentProps to avoid re-rendering component
      if (updates.componentProps && !updates.component && current.component) {
        notifications.value[index] = {
          ...current,
          ...updates,
          componentProps: {
            ...current.componentProps,
            ...updates.componentProps,
          },
        }
      } else {
        notifications.value[index] = {
          ...current,
          ...updates,
        }
      }
    }
  }

  /**
   * Remove this notification
   */
  function remove() {
    const index = notifications.value.findIndex((n) => n.id === id)
    if (index !== -1) {
      notifications.value.splice(index, 1)
    }
  }

  return {
    id,
    update,
    remove,
    close: remove,
  }
}

/**
 * Remove notification by ID
 * @param {number} id - Notification ID
 */
function removeNotification(id) {
  const index = notifications.value.findIndex((n) => n.id === id)
  if (index !== -1) {
    notifications.value.splice(index, 1)
  }
}

/**
 * Clear all notifications
 */
function clearAll() {
  notifications.value = []
}

/**
 * Show success notification
 * @param {string} content - Notification content
 * @param {string} title - Notification title
 * @param {Object} options - Additional options
 * @returns {Object} Notification controller
 */
function success(content, title = 'Success', options = {}) {
  return addNotification({
    color: 'success',
    title,
    content,
    icon: options.icon || "<i class='bx bx-check'></i>",
    flat: true,
    duration: 7000,
    position: 'bottom-right',
    ...options,
  })
}

/**
 * Show error notification
 * @param {string} content - Notification content
 * @param {string} title - Notification title
 * @param {Object} options - Additional options
 * @returns {Object} Notification controller
 */
function error(content, title = 'Error', options = {}) {
  return addNotification({
    color: 'danger',
    title,
    content,
    icon: options.icon || "<i class='bx bx-error-circle'></i>",
    flat: true,
    duration: 7000,
    position: 'bottom-right',
    ...options,
  })
}

/**
 * Show info notification
 * @param {string} content - Notification content
 * @param {string} title - Notification title
 * @param {Object} options - Additional options
 * @returns {Object} Notification controller
 */
function info(content, title = 'Info', options = {}) {
  return addNotification({
    color: 'info',
    title,
    content,
    icon: options.icon || "<i class='bx bx-info-circle'></i>",
    flat: true,
    duration: 7000,
    position: 'bottom-right',
    ...options,
  })
}

/**
 * Show warning notification
 * @param {string} content - Notification content
 * @param {string} title - Notification title
 * @param {Object} options - Additional options
 * @returns {Object} Notification controller
 */
function warning(content, title = 'Warning', options = {}) {
  return addNotification({
    color: 'warning',
    title,
    content,
    icon: options.icon || "<i class='bx bx-error'></i>",
    flat: true,
    duration: 7000,
    position: 'bottom-right',
    ...options,
  })
}

/**
 * Show dark notification
 * @param {string} content - Notification content
 * @param {string} title - Notification title
 * @param {Object} options - Additional options
 * @returns {Object} Notification controller
 */
function dark(content, title = 'Notice', options = {}) {
  return addNotification({
    color: 'dark',
    title,
    content,
    icon: options.icon || "<i class='bx bx-moon'></i>",
    flat: true,
    duration: 7000,
    position: 'bottom-right',
    width: 'auto',
    ...options,
  })
}

/**
 * Show primary notification
 * @param {string} content - Notification content
 * @param {string} title - Notification title
 * @param {Object} options - Additional options
 * @returns {Object} Notification controller
 */
function primary(content, title = 'Notification', options = {}) {
  return addNotification({
    color: 'primary',
    title,
    content,
    icon: options.icon || "<i class='bx bx-info-circle'></i>",
    flat: true,
    duration: 7000,
    position: 'bottom-right',
    ...options,
  })
}

/**
 * Create updatable notification (for loading states, transactions, etc.)
 * @param {Object} options - Initial notification options
 * @returns {Object} Notification controller with update method
 */
function create(options = {}) {
  return addNotification({
    color: 'primary',
    title: options.title || 'Loading',
    content: options.content || 'Please wait...',
    loading: true,
    duration: 'none',
    buttonClose: false,
    notPadding: options.notPadding || false,
    square: options.square || false,
    width: options.width || 'auto',
    position: options.position || 'bottom-right',
    component: options.component || null,
    componentProps: options.componentProps || {},
    ...options,
  })
}

/**
 * Use notification composable
 * @returns {Object} Notification methods and state
 */
export function useNotification() {
  return {
    notifications: readonly(notifications),
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    info,
    warning,
    dark,
    primary,
    create,
  }
}

// Default export for convenience
export default {
  success,
  error,
  info,
  warning,
  warn: warning,
  dark,
  primary,
  create,
  tx: create, // Alias for transaction-style notifications
}
