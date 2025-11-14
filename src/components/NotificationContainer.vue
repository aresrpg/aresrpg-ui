<template>
  <teleport to="body">
    <div
      v-for="position in positions"
      :key="position"
      :class="['notification-container', `notification-container-${position}`]"
    >
      <transition-group name="notification-list">
        <Notification
          v-for="notification in getNotificationsByPosition(position)"
          :key="notification.id"
          v-bind="notification"
          @close="removeNotification(notification.id)"
        >
          <component
            v-if="notification.component"
            :is="notification.component"
            v-bind="notification.componentProps"
          />
          <template v-else>
            {{ notification.content }}
          </template>
        </Notification>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup>
import { computed } from 'vue'
import Notification from './Notification.vue'

/**
 * Notification Container Component
 *
 * @component NotificationContainer
 * @description Container that manages notification positioning and stacking
 *
 * @param {Array} notifications - Array of notification objects
 * @emits remove - Emitted when a notification should be removed
 */

const props = defineProps({
  notifications: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['remove'])

const positions = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right'
]

function getNotificationsByPosition(position) {
  return props.notifications.filter(n => (n.position || 'bottom-right') === position)
}

function removeNotification(id) {
  emit('remove', id)
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 100vh;
  overflow: visible;
}

.notification-container > * {
  pointer-events: auto;
}

/* Top positions */
.notification-container-top-left {
  top: 20px;
  left: 20px;
  align-items: flex-start;
}

.notification-container-top-center {
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}

.notification-container-top-right {
  top: 20px;
  right: 20px;
  align-items: flex-end;
}

/* Bottom positions */
.notification-container-bottom-left {
  bottom: 20px;
  left: 20px;
  align-items: flex-start;
  flex-direction: column-reverse;
}

.notification-container-bottom-center {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  flex-direction: column-reverse;
}

.notification-container-bottom-right {
  bottom: 20px;
  right: 20px;
  align-items: flex-end;
  flex-direction: column-reverse;
}

/* List transition */
.notification-list-move,
.notification-list-enter-active,
.notification-list-leave-active {
  transition: all 0.3s ease;
}

.notification-list-enter-from,
.notification-list-leave-to {
  opacity: 0;
}

.notification-list-leave-active {
  position: absolute;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .notification-container {
    left: 0 !important;
    right: 0 !important;
    transform: none !important;
    align-items: stretch !important;
    padding: 0 16px;
  }

  .notification-container-top-left,
  .notification-container-top-center,
  .notification-container-top-right {
    top: 60px; /* Account for mobile header */
  }

  .notification-container-bottom-left,
  .notification-container-bottom-center,
  .notification-container-bottom-right {
    bottom: 16px;
  }
}
</style>
