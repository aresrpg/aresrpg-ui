# Notification System Usage

Vuesax-style notification system for aresrpg-ui. Fully responsive with mobile support.

## Setup

1. **Add NotificationContainer to your app**:

```vue
<!-- App.vue or main layout -->
<template>
  <div id="app">
    <!-- Your app content -->

    <!-- Add notification container -->
    <NotificationContainer
      :notifications="notifications"
      @remove="removeNotification"
    />
  </div>
</template>

<script setup>
import { NotificationContainer, useNotification } from 'aresrpg-ui'

const { notifications, removeNotification } = useNotification()
</script>
```

## Basic Usage

### Simple Notifications

```js
import notification from 'aresrpg-ui'

// Success
notification.success('Operation completed!', 'Success')

// Error
notification.error('Something went wrong!', 'Error')

// Info
notification.info('Here is some information', 'Info')

// Warning
notification.warning('Be careful!', 'Warning')

// Dark
notification.dark('Dark mode notification', 'Notice')

// Primary
notification.primary('Primary notification', 'Notification')
```

### Using Composable

```vue
<script setup>
import { useNotification } from 'aresrpg-ui'

const { success, error, info, warning } = useNotification()

function handleSuccess() {
  success('Data saved successfully!', 'Success')
}

function handleError() {
  error('Failed to save data', 'Error')
}
</script>
```

### Updatable Notifications (Loading States)

Perfect for async operations like transactions:

```js
import notification from 'aresrpg-ui'

// Create loading notification
const notif = notification.create({
  title: 'Processing',
  content: 'Please wait...',
  loading: true
})

// Later, update it
notif.update({
  loading: false,
  color: 'success',
  title: 'Complete',
  content: 'Transaction successful!'
})

// Or remove it
notif.remove()
```

### Custom Components

You can pass custom Vue components as notification content:

```js
import notification from 'aresrpg-ui'
import CustomToast from './CustomToast.vue'

notification.create({
  component: CustomToast,
  componentProps: {
    status: 'loading',
    text: 'Processing transaction...'
  },
  square: true,
  notPadding: true,
  width: 'auto'
})
```

## Configuration Options

All notification methods accept an options object:

```js
notification.success('Content', 'Title', {
  // Position
  position: 'bottom-right', // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right

  // Duration
  duration: 7000, // milliseconds, or 'none' for persistent

  // Appearance
  flat: true,          // Lighter color scheme (default: false)
  square: false,       // Remove border radius (default: false)
  border: false,       // Add colored border (default: false)

  // Icon
  icon: "<i class='bx bx-check'></i>", // HTML string or Vue component

  // Behavior
  buttonClose: true,   // Show close button (default: true)
  sticky: false,       // Stick to corner (default: false)

  // Dimensions
  width: '340px',      // '340px', 'auto', '100%', or number
  notPadding: false,   // Remove padding (default: false)

  // Progress
  progress: null,      // 0-100 or null to hide (default: null)

  // Loading
  loading: false       // Show loading spinner (default: false)
})
```

## Examples

### Transaction Notification

```js
const tx = notification.create({
  title: 'Transaction Pending',
  content: 'Waiting for confirmation...',
  loading: true,
  icon: 'sword' // Custom icon
})

// On success
tx.update({
  loading: false,
  color: 'success',
  title: 'Transaction Complete',
  content: 'Your transaction was successful!',
  duration: 2000
})

// On error
tx.update({
  loading: false,
  color: 'danger',
  title: 'Transaction Failed',
  content: 'Please try again',
  duration: 7000
})
```

### Persistent Notification with Action

```js
notification.warning(
  'Your session will expire in 5 minutes',
  'Session Expiring',
  {
    duration: 'none', // Persistent
    position: 'top-center',
    buttonClose: true
  }
)
```

### Full-width Mobile Notification

```js
notification.info(
  'New update available!',
  'Update',
  {
    width: '100%',
    position: 'top-center'
  }
)
```

## Mobile Behavior

- Notifications automatically adapt to mobile screens
- Full-width display on mobile devices
- Top notifications positioned below mobile headers (60px offset)
- Touch-friendly close buttons
- Smooth slide animations optimized for mobile

## Colors Reference

- **primary**: `#3498db` (Blue)
- **success**: `#2ecc71` (Green)
- **danger**: `#e74c3c` (Red)
- **warning**: `#f39c12` (Orange)
- **dark**: `#34495e` (Dark Gray)
- **info**: `#3498db` (Blue)

## Dark Mode

Notifications automatically adapt to dark mode when `prefers-color-scheme: dark` is detected.
