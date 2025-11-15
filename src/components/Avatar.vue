<template>
  <div class="avatar" :class="[`avatar-${size}`, { online: status === 'online', offline: status === 'offline' }]">
    <img v-if="src" :src="src" :alt="alt" class="avatar-img" />
    <div v-else class="avatar-placeholder">
      <i v-if="icon" :class="icon"></i>
      <span v-else>{{ initials }}</span>
    </div>
    <span v-if="status" class="avatar-status"></span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: 'Avatar' },
  icon: { type: String, default: '' },
  name: { type: String, default: '' },
  size: { type: String, default: 'md', validator: v => ['sm', 'md', 'lg', 'xl'].includes(v) },
  status: { type: String, default: '', validator: v => ['', 'online', 'offline'].includes(v) }
})

const initials = computed(() => {
  if (!props.name) return '?'
  return props.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})
</script>

<style scoped>
.avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--glass-bg);
  backdrop-filter: blur(25px) saturate(180%);
  border: 2px solid var(--glass-border);
  flex-shrink: 0;
}
.avatar-sm { width: 32px; height: 32px; font-size: var(--font-size-xs); }
.avatar-md { width: 48px; height: 48px; font-size: var(--font-size-sm); }
.avatar-lg { width: 64px; height: 64px; font-size: var(--font-size-base); }
.avatar-xl { width: 96px; height: 96px; font-size: var(--font-size-lg); }
.avatar-img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
  color: var(--color-text-primary);
  font-weight: 700;
  border-radius: 50%;
  overflow: hidden;
}
.avatar-status {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 35%;
  height: 35%;
  border-radius: 50%;
  border: 3px solid var(--color-bg-primary);
}
.avatar.online .avatar-status {
  background: var(--color-success);
  box-shadow: 0 0 0 2px var(--color-success-light), 0 0 8px var(--color-success);
}
.avatar.offline .avatar-status {
  background: var(--color-text-tertiary);
  box-shadow: 0 0 0 2px rgba(128, 128, 128, 0.3);
}
</style>
