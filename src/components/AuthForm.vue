<template>
  <div class="auth-form">
    <div class="auth-header">
      <h2 class="auth-title">
        <LockKeyhole :size="28" />
        Sign In
      </h2>
      <p class="auth-subtitle">Choose your preferred authentication method</p>
    </div>

    <!-- Auth Method Grid -->
    <div class="auth-methods">
      <button
        v-for="method in authMethods"
        :key="method.id"
        class="auth-method-card"
        :class="`auth-${method.id}`"
        type="button"
        @click="handleAuthMethod(method.id)"
      >
        <component :is="method.icon" :size="40" :stroke-width="1.5" />
        <span>{{ method.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { Mail, Chrome, Github, LockKeyhole, Droplet } from 'lucide-vue-next'
import { h } from 'vue'

/**
 * Authentication Form Component
 * All authentication methods shown as equal-weight cards
 * @emits auth-method - Emitted when an auth method is selected
 */

const emit = defineEmits(['auth-method'])

// Custom Discord logo SVG
const DiscordIcon = (props) => h('svg', {
  width: props.size || 24,
  height: props.size || 24,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  xmlns: 'http://www.w3.org/2000/svg'
}, [
  h('path', {
    d: 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z'
  })
])

const authMethods = [
  { id: 'email', name: 'Email', icon: Mail },
  { id: 'google', name: 'Google', icon: Chrome },
  { id: 'discord', name: 'Discord', icon: DiscordIcon },
  { id: 'github', name: 'GitHub', icon: Github },
  { id: 'sui', name: 'Sui', icon: Droplet }
]

function handleAuthMethod(method) {
  emit('auth-method', method)
}
</script>

<style scoped>
.auth-form {
  width: 100%;
  max-width: 520px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
}

.auth-form::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-glass);
  opacity: 0.1;
  border-radius: var(--radius-lg);
  pointer-events: none;
}

.auth-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  position: relative;
  z-index: 1;
}

.auth-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-2xl);
  font-weight: 900;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.auth-title svg {
  color: var(--color-accent-primary);
  flex-shrink: 0;
}

.auth-subtitle {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.auth-methods {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  position: relative;
  z-index: 1;
}

.auth-method-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-xl);
  background: var(--glass-bg-light);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font-family: var(--font-family);
  font-size: var(--font-size-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
}

.auth-method-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.1));
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.auth-method-card:hover {
  transform: translateX(4px);
  background: var(--glass-bg-medium);
  border-color: var(--color-accent-primary);
}

.auth-method-card:hover::before {
  opacity: 1;
}

.auth-method-card:active {
  transform: translateX(2px);
}

.auth-method-card svg {
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.auth-method-card:hover svg {
  transform: scale(1.1);
}

.auth-method-card span {
  font-weight: 600;
  flex: 1;
}

/* Provider-specific colors */
.auth-email:hover {
  border-color: var(--color-accent-primary);
  background: linear-gradient(135deg, var(--glass-bg-light), rgba(255, 202, 40, 0.1));
}

.auth-google:hover {
  border-color: #DB4437;
  background: linear-gradient(135deg, var(--glass-bg-light), rgba(219, 68, 55, 0.1));
}

.auth-google:hover svg {
  color: #DB4437;
}

.auth-discord:hover {
  border-color: #5865F2;
  background: linear-gradient(135deg, var(--glass-bg-light), rgba(88, 101, 242, 0.1));
}

.auth-discord:hover svg {
  color: #5865F2;
}

.auth-github:hover {
  border-color: #24292e;
  background: linear-gradient(135deg, var(--glass-bg-light), rgba(36, 41, 46, 0.1));
}

.auth-github:hover svg {
  color: #24292e;
}

[data-theme="dark"] .auth-github:hover svg,
[data-theme="matrix"] .auth-github:hover svg,
[data-theme="blue"] .auth-github:hover svg {
  color: #ffffff;
}

[data-theme="dark"] .auth-github:hover,
[data-theme="matrix"] .auth-github:hover,
[data-theme="blue"] .auth-github:hover {
  border-color: #ffffff;
}

.auth-sui:hover {
  border-color: #6FBCF0;
  background: linear-gradient(135deg, var(--glass-bg-light), rgba(111, 188, 240, 0.1));
}

.auth-sui:hover svg {
  color: #6FBCF0;
}

/* Responsive */
@media (max-width: 768px) {
  .auth-form {
    padding: var(--spacing-xl);
  }
}
</style>
