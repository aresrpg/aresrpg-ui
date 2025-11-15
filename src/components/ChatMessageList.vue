<template>
  <div class="chat-message-list-container">
    <!-- Messages container -->
    <div
      ref="messagesContainer"
      class="messages-scroll-container"
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
      @scroll="handleScroll"
    >
      <!-- Empty state -->
      <div v-if="messages.length === 0" class="empty-state">
        <i class="bx bx-message-dots empty-icon"></i>
        <p class="empty-text">{{ emptyStateText }}</p>
      </div>

      <!-- Messages list -->
      <div v-else class="messages-list">
        <ChatMessage
          v-for="(msg, index) in messages"
          :key="msg.id || index"
          :message="msg.message"
          :sender-name="msg.senderName"
          :avatar-src="msg.avatarSrc"
          :avatar-icon="msg.avatarIcon"
          :is-own="msg.isOwn"
          :timestamp="msg.timestamp"
          :status="msg.status"
          :show-status="msg.showStatus"
        />
      </div>
    </div>

    <!-- Scroll to bottom button -->
    <transition name="fade-slide">
      <button
        v-if="showScrollButton"
        class="scroll-bottom-button"
        aria-label="Scroll to bottom"
        @click="scrollToBottom(true)"
      >
        <i class="bx bx-chevron-down"></i>
      </button>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import ChatMessage from './ChatMessage.vue'

/**
 * Chat message list container with auto-scroll
 * Displays a scrollable list of messages and auto-scrolls to bottom on new messages
 *
 * @param {Array} messages - Array of message objects
 *   Each message object should have:
 *   - id: Unique identifier (optional)
 *   - message: Message text (required)
 *   - senderName: Sender's name
 *   - avatarSrc: Avatar image URL
 *   - avatarIcon: Icon class for avatar
 *   - isOwn: Boolean indicating if message is from current user
 *   - timestamp: Message timestamp
 *   - status: Online status ('online'|'offline'|'')
 *   - showStatus: Whether to show status indicator
 * @param {boolean} autoScroll - Auto-scroll to bottom on new messages
 * @param {string} emptyStateText - Text to show when no messages
 * @param {number} scrollThreshold - Distance from bottom to hide scroll button (px)
 */
const props = defineProps({
  messages: {
    type: Array,
    default: () => []
  },
  autoScroll: {
    type: Boolean,
    default: true
  },
  emptyStateText: {
    type: String,
    default: 'No messages yet. Start the conversation!'
  },
  scrollThreshold: {
    type: Number,
    default: 150
  }
})

const messagesContainer = ref(null)
const showScrollButton = ref(false)

/**
 * Scroll to bottom of messages
 * @param {boolean} smooth - Use smooth scrolling
 */
function scrollToBottom(smooth = false) {
  if (!messagesContainer.value) return

  messagesContainer.value.scrollTo({
    top: messagesContainer.value.scrollHeight,
    behavior: smooth ? 'smooth' : 'auto'
  })
}

/**
 * Check if user is near bottom of scroll container
 */
function isNearBottom() {
  if (!messagesContainer.value) return true

  const { scrollTop, scrollHeight, clientHeight } = messagesContainer.value
  return scrollHeight - scrollTop - clientHeight < props.scrollThreshold
}

/**
 * Handle scroll event
 */
function handleScroll() {
  showScrollButton.value = !isNearBottom()
}

/**
 * Watch for new messages and auto-scroll
 */
watch(
  () => props.messages.length,
  async (newLength, oldLength) => {
    if (newLength > oldLength && props.autoScroll && isNearBottom()) {
      await nextTick()
      scrollToBottom(true)
    }
  }
)

/**
 * Scroll to bottom on mount
 */
onMounted(() => {
  nextTick(() => {
    scrollToBottom(false)
  })
})
</script>

<style scoped>
.chat-message-list-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Scrollable messages container */
.messages-scroll-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: var(--spacing-md);
  scroll-behavior: smooth;

  /* Custom scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: var(--glass-border) transparent;
}

.messages-scroll-container::-webkit-scrollbar {
  width: 6px;
}

.messages-scroll-container::-webkit-scrollbar-track {
  background: transparent;
}

.messages-scroll-container::-webkit-scrollbar-thumb {
  background: var(--glass-border);
  border-radius: 3px;
  transition: background 0.2s ease;
}

.messages-scroll-container::-webkit-scrollbar-thumb:hover {
  background: var(--glass-border-bright);
}

/* Messages list */
.messages-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  min-height: min-content;
}

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 200px;
  color: var(--color-text-secondary);
  gap: var(--spacing-md);
}

.empty-icon {
  font-size: 64px;
  opacity: 0.3;
  color: var(--color-accent-primary);
}

.empty-text {
  font-size: var(--font-size-base);
  margin: 0;
  text-align: center;
}

/* Scroll to bottom button */
.scroll-bottom-button {
  position: absolute;
  bottom: var(--spacing-md);
  right: var(--spacing-md);
  width: 40px;
  height: 40px;
  background: var(--glass-bg-medium);
  backdrop-filter: blur(25px) saturate(180%);
  border: 1px solid var(--glass-border-bright);
  border-radius: 50%;
  color: var(--color-accent-primary);
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

.scroll-bottom-button:hover {
  background: var(--glass-bg);
  border-color: var(--color-accent-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.scroll-bottom-button:active {
  transform: translateY(0);
}

/* Neumorphism theme override */
[data-theme="neumorphism"] .scroll-bottom-button {
  background: var(--color-bg-primary);
  border: none;
  box-shadow: 3px 3px 6px rgba(163, 177, 198, 0.4),
              -3px -3px 6px rgba(255, 255, 255, 0.5);
}

[data-theme="neumorphism"] .scroll-bottom-button:hover {
  box-shadow: 2px 2px 5px rgba(163, 177, 198, 0.4),
              -2px -2px 5px rgba(255, 255, 255, 0.5);
}

/* Fade-slide transition for scroll button */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .messages-scroll-container {
    padding: var(--spacing-sm);
  }

  .scroll-bottom-button {
    bottom: var(--spacing-sm);
    right: var(--spacing-sm);
    width: 36px;
    height: 36px;
    font-size: 20px;
  }
}
</style>
