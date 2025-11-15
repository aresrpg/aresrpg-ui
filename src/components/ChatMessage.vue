<template>
  <article
    class="chat-message"
    :class="{ 'chat-message-own': isOwn }"
    role="article"
    :aria-label="`Message from ${senderName}`"
  >
    <!-- Avatar -->
    <div v-if="!isOwn" class="message-avatar">
      <Avatar
        :src="avatarSrc"
        :name="senderName"
        :icon="avatarIcon"
        size="sm"
        :status="showStatus ? status : ''"
      />
    </div>

    <!-- Message content -->
    <div class="message-content">
      <!-- Sender name (only for other's messages) -->
      <div v-if="!isOwn && senderName" class="message-sender">
        {{ senderName }}
      </div>

      <!-- Message bubble -->
      <div class="message-bubble">
        <p class="message-text">{{ message }}</p>

        <!-- Timestamp -->
        <time
          class="message-timestamp"
          :datetime="timestampISO"
          :aria-label="`Sent at ${timestampFormatted}`"
        >
          {{ timestampFormatted }}
        </time>
      </div>
    </div>

    <!-- Avatar for own messages (right side) -->
    <div v-if="isOwn" class="message-avatar">
      <Avatar
        :src="avatarSrc"
        :name="senderName"
        :icon="avatarIcon"
        size="sm"
        :status="showStatus ? status : ''"
      />
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import Avatar from './Avatar.vue'

/**
 * Chat message component with glassmorphism styling
 * Displays sender avatar, message content, and timestamp
 * Supports "own" vs "other" message alignment
 *
 * @param {string} message - Message text content
 * @param {string} senderName - Name of the sender
 * @param {string} avatarSrc - Avatar image URL
 * @param {string} avatarIcon - Icon class for avatar (if no src)
 * @param {boolean} isOwn - Whether this message is from the current user
 * @param {string|Date} timestamp - Message timestamp
 * @param {string} status - Online status ('online'|'offline'|'')
 * @param {boolean} showStatus - Whether to show online status indicator
 */
const props = defineProps({
  message: {
    type: String,
    required: true
  },
  senderName: {
    type: String,
    default: 'Unknown'
  },
  avatarSrc: {
    type: String,
    default: ''
  },
  avatarIcon: {
    type: String,
    default: 'bx bx-user'
  },
  isOwn: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: [String, Date, Number],
    default: () => new Date()
  },
  status: {
    type: String,
    default: '',
    validator: v => ['', 'online', 'offline'].includes(v)
  },
  showStatus: {
    type: Boolean,
    default: false
  }
})

/**
 * Format timestamp to ISO string for datetime attribute
 */
const timestampISO = computed(() => {
  const date = new Date(props.timestamp)
  return date.toISOString()
})

/**
 * Format timestamp for display (HH:MM)
 */
const timestampFormatted = computed(() => {
  const date = new Date(props.timestamp)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
})
</script>

<style scoped>
.chat-message {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  opacity: 0;
  transform: translateY(10px);
  animation: slideIn 0.3s ease forwards;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Own messages aligned to the right */
.chat-message-own {
  flex-direction: row-reverse;
}

.message-avatar {
  flex-shrink: 0;
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  max-width: 70%;
  min-width: 120px;
}

.chat-message-own .message-content {
  align-items: flex-end;
}

/* Sender name */
.message-sender {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding-left: var(--spacing-xs);
}

/* Message bubble */
.message-bubble {
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: var(--spacing-sm) var(--spacing-md);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
  position: relative;
}

.message-bubble:hover {
  border-color: var(--glass-border-bright);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
}

/* Own message bubble styling */
.chat-message-own .message-bubble {
  background: linear-gradient(135deg,
    rgba(255, 202, 40, 0.15) 0%,
    rgba(255, 202, 40, 0.08) 100%);
  border-color: rgba(255, 202, 40, 0.3);
}

.chat-message-own .message-bubble:hover {
  border-color: rgba(255, 202, 40, 0.5);
}

/* Neumorphism theme overrides */
[data-theme="neumorphism"] .message-bubble {
  background: var(--color-bg-primary);
  border: none;
  box-shadow: 3px 3px 6px rgba(163, 177, 198, 0.4),
              -3px -3px 6px rgba(255, 255, 255, 0.5);
}

[data-theme="neumorphism"] .message-bubble:hover {
  box-shadow: 2px 2px 5px rgba(163, 177, 198, 0.4),
              -2px -2px 5px rgba(255, 255, 255, 0.5);
}

[data-theme="neumorphism"] .chat-message-own .message-bubble {
  background: linear-gradient(135deg, #e0e5ec 0%, #f8f9fc 100%);
}

/* Matrix theme overrides */
[data-theme="matrix"] .chat-message-own .message-bubble {
  background: linear-gradient(135deg,
    rgba(0, 170, 0, 0.15) 0%,
    rgba(0, 170, 0, 0.08) 100%);
  border-color: rgba(0, 170, 0, 0.3);
}

[data-theme="matrix"] .chat-message-own .message-bubble:hover {
  border-color: rgba(0, 170, 0, 0.5);
}

/* Message text */
.message-text {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-xs) 0;
  line-height: 1.5;
  word-wrap: break-word;
  white-space: pre-wrap;
}

/* Timestamp */
.message-timestamp {
  font-size: var(--font-size-xs);
  color: var(--color-text-dim);
  display: block;
  text-align: right;
}

.chat-message-own .message-timestamp {
  text-align: left;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .message-content {
    max-width: 85%;
  }

  .message-bubble {
    padding: var(--spacing-xs) var(--spacing-sm);
  }
}
</style>
