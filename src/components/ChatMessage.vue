<template>
  <article
    class="chat-message"
    :class="{ 'chat-message-own': isOwn }"
    role="article"
    :aria-label="`Message from ${senderName}`"
  >
    <div class="message-wrapper">
      <!-- Avatar -->
      <div class="message-avatar">
        <Avatar
          :src="avatarSrc"
          :name="senderName"
          :icon="avatarIcon"
          size="sm"
          :status="showStatus ? status : ''"
        />
      </div>

      <div class="message-container">
        <!-- Sender name aligned with avatar (only for other's messages) -->
        <div v-if="!isOwn && senderName" class="message-sender">
          {{ senderName }}
        </div>

        <!-- Message bubble -->
        <div class="message-bubble">
          <!-- Message text -->
          <p class="message-text">{{ message }}</p>
        </div>

        <!-- Timestamp outside bubble -->
        <time
          class="message-timestamp"
          :datetime="timestampISO"
          :aria-label="`Sent at ${timestampFormatted}`"
        >
          {{ timestampFormatted }}
        </time>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import Avatar from './Avatar.vue'

/**
 * Messenger-style chat message component
 * Avatar integrated inside bubble with tail pointing to avatar
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
  margin-bottom: var(--spacing-sm);
  opacity: 0;
  transform: translateY(10px);
  animation: slideIn 0.3s ease forwards;
  max-width: 75%;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Own messages aligned to the right */
.chat-message-own {
  margin-left: auto;
}

/* Message wrapper - contains avatar + message container */
.message-wrapper {
  display: flex;
  gap: var(--spacing-xs);
  align-items: flex-start;
  width: 100%;
}

/* Own messages: reverse order (message first, then avatar) */
.chat-message-own .message-wrapper {
  flex-direction: row-reverse;
}

/* Avatar */
.message-avatar {
  flex-shrink: 0;
}

/* Message container - contains name, bubble, timestamp */
.message-container {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

/* Sender name - aligned with avatar */
.message-sender {
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--color-accent-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding-left: 2px;
}

/* Own messages: right-align sender name */
.chat-message-own .message-sender {
  text-align: right;
  padding-left: 0;
  padding-right: 2px;
}

/* Message bubble - compact, just the text */
.message-bubble {
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: 12px 12px 12px 4px;
  padding: var(--spacing-xs) var(--spacing-sm);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
  width: fit-content;
  max-width: 100%;
}

.message-bubble:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

/* Own message styling - accent gradient */
.chat-message-own .message-bubble {
  background: linear-gradient(135deg, var(--glass-bg-medium) 0%, var(--glass-bg-light) 100%);
  border-color: var(--glass-border-bright);
  border-radius: 12px 12px 4px 12px;
  margin-left: auto;
}

/* Message text */
.message-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  margin: 0;
  line-height: 1.4;
  word-wrap: break-word;
  white-space: pre-wrap;
}

/* Timestamp - below bubble */
.message-timestamp {
  font-size: var(--font-size-xs);
  color: var(--color-text-dim);
  padding-left: 2px;
}

/* Own messages: right-align timestamp */
.chat-message-own .message-timestamp {
  text-align: right;
  padding-left: 0;
  padding-right: 2px;
}

/* Neumorphism theme overrides */
[data-theme="neumorphism"] .message-bubble {
  background: var(--color-bg-primary);
  border: none;
  box-shadow: 3px 3px 6px rgba(163, 177, 198, 0.4),
              -3px -3px 6px rgba(255, 255, 255, 0.5);
}

[data-theme="neumorphism"] .message-bubble:hover {
  box-shadow: 2px 2px 4px rgba(163, 177, 198, 0.4),
              -2px -2px 4px rgba(255, 255, 255, 0.5);
}

[data-theme="neumorphism"] .chat-message-own .message-bubble {
  background: linear-gradient(135deg, #e0e5ec 0%, #f8f9fc 100%);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .chat-message {
    max-width: 85%;
  }

  .message-bubble {
    padding: var(--spacing-xs);
  }

  .message-text {
    font-size: var(--font-size-xs);
  }
}
</style>
