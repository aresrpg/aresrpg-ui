<template>
  <teleport to="body">
    <div
      v-for="position in positions"
      :key="position"
      :class="['notification-container', `notification-container-${position}`]"
    >
      <transition-group name="notification-list">
        <!-- Wrapper div that provides .vs-notification equivalent styles -->
        <div
          v-for="notification in getNotificationsByPosition(position)"
          :key="notification.id"
          :class="[
            'notification-wrapper',
            { 'is-flat': notification.flat !== false },
            { 'is-square': notification.square !== false },
            { 'is-not-padding': notification.notPadding !== false }
          ]"
        >
          <Notification
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
        </div>
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
  gap: 0; /* No gap - use margin on wrapper instead */
  max-height: 100vh;
  overflow: visible;
  padding: 10px 0; /* Vuesax container padding */
}

.notification-container > * {
  pointer-events: auto;
}

/* Vuesax .vs-notification wrapper styles (exact copy from notification.scss line 184-230) */
.notification-wrapper {
  position: relative;
  max-width: 340px;
  width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  background: var(--color-background-primary, #1a1a1a);
  color: var(--color-text-primary, #ffffff);
  margin: 3px 10px;
  transition: all 0.25s ease, transform 0.3s ease 0.1s, max-height 0.25s ease, clip-path 0.5s ease 0.1s;
}

/* When flat: true (line 236-266) */
.notification-wrapper.is-flat {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  background: transparent; /* Let ::after handle background */
}

.notification-wrapper.is-flat::after {
  content: '';
  background: var(--color-background-secondary, rgba(255, 255, 255, 0.1));
  width: 100%;
  height: 100%;
  border-radius: inherit;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: all 0.25s ease;
}

/* When square: true (line 228-230) */
.notification-wrapper.is-square {
  border-radius: 0 !important;
}

/* When notPadding: true (line 207-209) */
.notification-wrapper.is-not-padding :deep(.notification) {
  padding: 0 !important;
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
    padding: 0;
  }

  .notification-container-top-left,
  .notification-container-top-center,
  .notification-container-top-right {
    top: 60px; /* Account for mobile header */
  }

  .notification-container-bottom-left,
  .notification-container-bottom-center,
  .notification-container-bottom-right {
    bottom: 0;
  }
}
</style>
