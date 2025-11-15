<template>
  <div class="auth-card-wrapper">
    <div class="auth-card">
      <!-- Branding Section -->
      <div class="auth-branding">
        <slot name="logo">
          <div class="auth-logo-placeholder"></div>
        </slot>
        <h1 v-if="title" class="auth-title">{{ title }}</h1>
        <p v-if="tagline" class="auth-tagline">{{ tagline }}</p>
      </div>

      <!-- Body Section -->
      <div class="auth-body">
        <slot></slot>
      </div>

      <!-- Footer Section -->
      <div v-if="$slots.footer" class="auth-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * AuthCard Component
 * Glassy, electric-themed authentication card
 * Inspired by Noxant's state-of-the-art auth design
 * @param {string} title - Card title (e.g., "NOXANT")
 * @param {string} tagline - Card tagline (e.g., "Agentic colony systems")
 */
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  tagline: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
/* Match Noxant login card style exactly */
.auth-card-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.auth-card {
  width: 90%;
  max-width: 400px;
  background: var(--glass-bg);
  backdrop-filter: blur(25px) saturate(180%);
  -webkit-backdrop-filter: blur(25px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.auth-branding {
  text-align: center;
  padding: 2rem 1.5rem 1.5rem;
}

.auth-logo-placeholder {
  width: 100px;
  height: 100px;
  margin: 0 auto 1rem;
  background: var(--glass-bg-light);
  border: 1px solid var(--glass-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-title {
  font-size: 1.75rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-text-primary);
}

.auth-tagline {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  opacity: 0.7;
  margin: 0;
}

.auth-body {
  padding: 0 1.5rem 2rem;
}

.auth-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--glass-border);
  text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
  .auth-card {
    width: 95%;
  }

  .auth-branding {
    padding: 1.5rem 1rem 1rem;
  }

  .auth-logo-placeholder {
    width: 80px;
    height: 80px;
  }

  .auth-title {
    font-size: 1.5rem;
  }
}
</style>
