<template>
  <div class="app">
    <!-- Animated gradient orbs for glassmorphism -->
    <div class="gradient-orb orb-1"></div>
    <div class="gradient-orb orb-2"></div>
    <div class="gradient-orb orb-3"></div>
    <div class="gradient-orb orb-4"></div>

    <!-- Toast Container -->
    <div class="toast-container">
      <Toast
        v-for="toast in toasts"
        :key="toast.id"
        v-model="toast.show"
        :variant="toast.variant"
        :title="toast.title"
        :message="toast.message"
      />
    </div>

    <!-- Layout Container -->
    <div class="layout">
      <!-- Sidebar -->
      <Sidebar
        title="AresRPG UI"
        icon="bx bx-game"
        :items="sidebarItems"
        :collapsible="true"
        @item-click="handleSidebarClick"
      >
        <template #footer>
          <div style="padding: var(--spacing-md); display: flex; flex-direction: column; gap: var(--spacing-sm);">
            <Badge variant="primary">v0.1.0</Badge>
            <Button variant="outline" size="sm">
              <i class="bx bx-log-out"></i>
              Logout
            </Button>
          </div>
        </template>
      </Sidebar>

      <!-- Main Content Area -->
      <div class="main-area">
        <!-- Navbar -->
        <Navbar
          title="Dashboard"
          icon="bx bx-grid-alt"
          :links="navLinks"
          @link-click="handleNavClick"
        >
          <template #actions>
            <Button variant="gradient" size="sm">
              <i class="bx bx-plus"></i>
              New
            </Button>
            <Button variant="outline" size="sm" aria-label="Notifications">
              <i class="bx bx-bell"></i>
            </Button>
            <Button variant="outline" size="sm" aria-label="User profile">
              <i class="bx bx-user-circle"></i>
            </Button>
          </template>
        </Navbar>

        <!-- Content -->
        <main class="content">
          <!-- Sticky Theme Switcher -->
          <div class="theme-switcher-container">
            <ThemeSwitcher :sticky="true" />
          </div>

          <!-- Header -->
          <header class="header">
            <h1 class="title">AresRPG UI Component Library</h1>
            <p class="subtitle">Glassmorphism Vue 3 Components with 5 Themes</p>
          </header>

          <!-- Buttons Section -->
          <section class="section">
            <h2 class="section-title">
              <i class="bx bx-mouse"></i>
              Buttons
            </h2>
            <div class="component-demo">
              <h3 class="demo-subtitle">Variants</h3>
              <div class="demo-group">
                <Button variant="primary">
                  <i class="bx bx-rocket"></i>
                  Primary
                </Button>
                <Button variant="gradient">
                  <i class="bx bx-star"></i>
                  Gradient
                </Button>
                <Button variant="success">
                  <i class="bx bx-check"></i>
                  Success
                </Button>
                <Button variant="error">
                  <i class="bx bx-x"></i>
                  Error
                </Button>
                <Button variant="outline">
                  <i class="bx bx-border-all"></i>
                  Outline
                </Button>
              </div>

              <h3 class="demo-subtitle">Sizes</h3>
              <div class="demo-group">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>

              <h3 class="demo-subtitle">States</h3>
              <div class="demo-group">
                <Button :disabled="true">Disabled</Button>
                <Button variant="gradient" :disabled="true">Disabled Gradient</Button>
              </div>
            </div>
          </section>

          <!-- Cards Section -->
          <section class="section">
            <h2 class="section-title">
              <i class="bx bx-layout"></i>
              Cards
            </h2>
            <div class="grid">
              <Card
                title="Lightning Fast"
                description="Optimized performance with sub-100ms response times"
                icon="bx bx-bolt"
              >
                <p style="margin-bottom: var(--spacing-md); color: var(--color-text-secondary);">
                  Built with Vite for instant HMR and optimized production builds.
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </Card>

              <Card
                title="Secure"
                description="Bank-grade encryption and security protocols"
                icon="bx bx-shield"
              >
                <p style="margin-bottom: var(--spacing-md); color: var(--color-text-secondary);">
                  OWASP security best practices, XSS protection, and CSRF tokens.
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </Card>

              <Card
                title="Customizable"
                description="Fully customizable with theme system"
                icon="bx bx-customize"
              >
                <p style="margin-bottom: var(--spacing-md); color: var(--color-text-secondary);">
                  4 built-in themes, CSS variables, and full component customization.
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </Card>
            </div>
          </section>

          <!-- Form Inputs Section -->
          <section class="section">
            <h2 class="section-title">
              <i class="bx bx-edit"></i>
              Form Inputs
            </h2>
            <div class="form-demo">
              <Input
                v-model="formData.username"
                label="Username"
                placeholder="Enter username..."
              />
              <Input
                v-model="formData.email"
                type="email"
                label="Email"
                placeholder="email@example.com"
              />
              <Input
                v-model="formData.password"
                type="password"
                label="Password"
                placeholder="Enter password..."
              />
              <Input
                v-model="formData.disabled"
                label="Disabled Input"
                placeholder="This is disabled"
                :disabled="true"
              />
            </div>
          </section>

          <!-- Badges Section -->
          <section class="section">
            <h2 class="section-title">
              <i class="bx bx-purchase-tag"></i>
              Badges
            </h2>
            <div class="demo-group">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </section>

          <!-- Modal Section -->
          <section class="section">
            <h2 class="section-title">
              <i class="bx bx-window"></i>
              Modal
            </h2>
            <div class="demo-group">
              <Button variant="gradient" @click="showModal = true">
                <i class="bx bx-window-open"></i>
                Open Modal
              </Button>
              <Button variant="primary" @click="showConfirmModal = true">
                <i class="bx bx-message-square-check"></i>
                Confirm Modal
              </Button>
            </div>

            <Modal v-model="showModal" title="Example Modal">
              <p>This is a glassmorphism modal with blur effects and smooth animations.</p>
              <p style="margin-top: var(--spacing-md); color: var(--color-text-secondary);">
                Click outside, press ESC, or use the X button to close.
              </p>
              <template #footer>
                <Button variant="outline" @click="showModal = false">Cancel</Button>
                <Button variant="gradient" @click="showModal = false">Confirm</Button>
              </template>
            </Modal>

            <Modal v-model="showConfirmModal" title="Confirm Action" :close-on-overlay="false">
              <div style="display: flex; align-items: center; gap: var(--spacing-md); padding: var(--spacing-md); background: var(--glass-bg-medium); border-radius: var(--radius-md);">
                <i class="bx bx-error" style="font-size: 2em; color: var(--color-warning);"></i>
                <div>
                  <p style="font-weight: 600; margin-bottom: var(--spacing-xs);">Are you sure?</p>
                  <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                    This action cannot be undone. Please confirm to continue.
                  </p>
                </div>
              </div>
              <template #footer>
                <Button variant="outline" @click="showConfirmModal = false">Cancel</Button>
                <Button variant="error" @click="confirmAction">Confirm</Button>
              </template>
            </Modal>
          </section>

          <!-- Navigation Components Section -->
          <section class="section">
            <h2 class="section-title">
              <i class="bx bx-menu"></i>
              Navigation Components
            </h2>
            <div class="component-demo">
              <h3 class="demo-subtitle">Navbar (See top of page)</h3>
              <p style="color: var(--color-text-secondary); margin-bottom: var(--spacing-md);">
                The navbar component is displayed at the top of the page with brand, navigation links, and action buttons.
              </p>

              <h3 class="demo-subtitle">Sidebar (See left of page)</h3>
              <p style="color: var(--color-text-secondary); margin-bottom: var(--spacing-md);">
                The sidebar component is displayed on the left with collapsible functionality and navigation items.
              </p>

              <h3 class="demo-subtitle">Inline Navbar Example</h3>
              <div style="border: 1px solid var(--glass-border); border-radius: var(--radius-md); overflow: hidden;">
                <Navbar
                  title="Mini Nav"
                  icon="bx bx-menu-alt-left"
                  :links="[
                    { label: 'Item 1', icon: 'bx bx-home', active: true },
                    { label: 'Item 2', icon: 'bx bx-user' },
                    { label: 'Item 3', icon: 'bx bx-cog' }
                  ]"
                >
                  <template #actions>
                    <Button size="sm" variant="outline">Action</Button>
                  </template>
                </Navbar>
              </div>
            </div>
          </section>

          <!-- Dropdown Section -->
          <section class="section">
            <h2 class="section-title">
              <i class="bx bx-chevron-down"></i>
              Dropdown / Select
            </h2>
            <div class="component-demo">
              <h3 class="demo-subtitle">Basic Dropdown</h3>
              <div class="demo-group">
                <Dropdown
                  v-model="selectedOption"
                  :options="dropdownOptions"
                  placeholder="Select an option..."
                  style="width: 250px;"
                />
                <p style="color: var(--color-text-secondary); margin-top: var(--spacing-sm);">
                  Selected: {{ selectedOption ? selectedOption.label : 'None' }}
                </p>
              </div>
            </div>
          </section>

          <!-- Tooltip Section -->
          <section class="section">
            <h2 class="section-title">
              <i class="bx bx-info-circle"></i>
              Tooltips
            </h2>
            <div class="component-demo">
              <h3 class="demo-subtitle">Tooltip Positions</h3>
              <div class="demo-group" style="gap: var(--spacing-xl);">
                <Tooltip content="Tooltip on top" position="top">
                  <Button variant="outline" size="sm">Top</Button>
                </Tooltip>
                <Tooltip content="Tooltip on bottom" position="bottom">
                  <Button variant="outline" size="sm">Bottom</Button>
                </Tooltip>
                <Tooltip content="Tooltip on left" position="left">
                  <Button variant="outline" size="sm">Left</Button>
                </Tooltip>
                <Tooltip content="Tooltip on right" position="right">
                  <Button variant="outline" size="sm">Right</Button>
                </Tooltip>
              </div>

              <h3 class="demo-subtitle">With Icons</h3>
              <div class="demo-group">
                <Tooltip content="Click to edit">
                  <Button variant="primary" size="sm">
                    <i class="bx bx-edit"></i>
                  </Button>
                </Tooltip>
                <Tooltip content="Delete this item">
                  <Button variant="error" size="sm">
                    <i class="bx bx-trash"></i>
                  </Button>
                </Tooltip>
                <Tooltip content="Download file">
                  <Button variant="success" size="sm">
                    <i class="bx bx-download"></i>
                  </Button>
                </Tooltip>
              </div>
            </div>
          </section>

          <!-- Avatar Section -->
          <section class="section">
            <h2 class="section-title">
              <i class="bx bx-user-circle"></i>
              Avatars
            </h2>
            <div class="component-demo">
              <h3 class="demo-subtitle">Sizes</h3>
              <div class="demo-group">
                <Avatar initials="SM" size="sm" />
                <Avatar initials="MD" size="md" />
                <Avatar initials="LG" size="lg" />
                <Avatar initials="XL" size="xl" />
              </div>

              <h3 class="demo-subtitle">With Icons</h3>
              <div class="demo-group">
                <Avatar icon="bx bx-user" size="md" />
                <Avatar icon="bx bx-group" size="md" />
                <Avatar icon="bx bx-bot" size="md" />
              </div>

              <h3 class="demo-subtitle">Status Indicators</h3>
              <div class="demo-group">
                <Avatar initials="ON" size="lg" status="online" />
                <Avatar initials="OFF" size="lg" status="offline" />
                <Avatar initials="NX" size="lg" />
              </div>
            </div>
          </section>

          <!-- Alert Section -->
          <section class="section">
            <h2 class="section-title">
              <i class="bx bx-bell"></i>
              Alerts
            </h2>
            <div class="component-demo">
              <h3 class="demo-subtitle">Variants</h3>
              <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
                <Alert
                  v-model="showSuccessAlert"
                  variant="success"
                  title="Success!"
                  message="Your changes have been saved successfully."
                />
                <Alert
                  v-model="showErrorAlert"
                  variant="error"
                  title="Error"
                  message="Something went wrong. Please try again."
                />
                <Alert
                  v-model="showWarningAlert"
                  variant="warning"
                  title="Warning"
                  message="This action cannot be undone. Please proceed with caution."
                />
                <Alert
                  variant="info"
                  title="Info"
                  message="You have 3 new messages in your inbox."
                  :closable="false"
                />
              </div>
            </div>
          </section>

          <!-- Toggle Section -->
          <section class="section">
            <h2 class="section-title">
              <i class="bx bx-toggle-left"></i>
              Toggle / Switch
            </h2>
            <div class="component-demo">
              <h3 class="demo-subtitle">Basic Toggle</h3>
              <div class="demo-group">
                <Toggle v-model="toggleState" />
                <p style="color: var(--color-text-secondary);">
                  State: {{ toggleState ? 'ON' : 'OFF' }}
                </p>
              </div>

              <h3 class="demo-subtitle">With Labels</h3>
              <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
                <Toggle v-model="toggleWithLabel" label="Enable notifications" />
                <Toggle :model-value="true" label="Dark mode" />
                <Toggle :model-value="false" label="Auto-save" :disabled="true" />
              </div>
            </div>
          </section>

          <!-- Tabs Section -->
          <section class="section">
            <h2 class="section-title">
              <i class="bx bx-tab"></i>
              Tabs
            </h2>
            <div class="component-demo">
              <h3 class="demo-subtitle">Tabbed Navigation</h3>
              <Tabs v-model="activeTab" :tabs="tabsList">
                <template #tab-0>
                  <div style="padding: var(--spacing-md);">
                    <h4 style="margin-bottom: var(--spacing-md); color: var(--color-accent-primary);">Tab 1 Content</h4>
                    <p style="color: var(--color-text-secondary); margin-bottom: var(--spacing-md);">
                      This is the content for the first tab. You can put any Vue components or HTML here.
                    </p>
                    <Button variant="primary" size="sm">Action Button</Button>
                  </div>
                </template>
                <template #tab-1>
                  <div style="padding: var(--spacing-md);">
                    <h4 style="margin-bottom: var(--spacing-md); color: var(--color-accent-primary);">Tab 2 Content</h4>
                    <p style="color: var(--color-text-secondary); margin-bottom: var(--spacing-md);">
                      The second tab shows different content. Each tab can have its own unique layout and components.
                    </p>
                    <div style="display: flex; gap: var(--spacing-sm);">
                      <Badge variant="success">Active</Badge>
                      <Badge variant="info">Beta</Badge>
                    </div>
                  </div>
                </template>
                <template #tab-2>
                  <div style="padding: var(--spacing-md);">
                    <h4 style="margin-bottom: var(--spacing-md); color: var(--color-accent-primary);">Tab 3 Content</h4>
                    <p style="color: var(--color-text-secondary); margin-bottom: var(--spacing-md);">
                      Configure your settings here. This tab demonstrates how you can use tabs for settings panels.
                    </p>
                    <Toggle label="Enable feature" :model-value="true" />
                  </div>
                </template>
              </Tabs>
            </div>
          </section>

          <!-- Toast Section -->
          <section class="section">
            <h2 class="section-title">
              <i class="bx bx-message-square-dots"></i>
              Toast Notifications
            </h2>
            <div class="component-demo">
              <h3 class="demo-subtitle">Toast Variants</h3>
              <div class="demo-group">
                <Button variant="success" @click="showToast('success', 'Success!', 'Operation completed successfully.')">
                  <i class="bx bx-check"></i>
                  Show Success Toast
                </Button>
                <Button variant="error" @click="showToast('error', 'Error!', 'Something went wrong.')">
                  <i class="bx bx-x"></i>
                  Show Error Toast
                </Button>
                <Button variant="primary" @click="showToast('info', 'Info', 'Here is some information.')">
                  <i class="bx bx-info-circle"></i>
                  Show Info Toast
                </Button>
                <Button variant="gradient" @click="showToast('warning', 'Warning', 'Please be careful!')">
                  <i class="bx bx-error"></i>
                  Show Warning Toast
                </Button>
              </div>
            </div>
          </section>

          <!-- Skeleton Section -->
          <section class="section">
            <h2 class="section-title">
              <i class="bx bx-loader-alt"></i>
              Skeleton Loaders
            </h2>
            <div class="component-demo">
              <h3 class="demo-subtitle">Loading States</h3>
              <div class="demo-group" style="flex-direction: column; width: 100%;">
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="40%" />
                <div style="margin-top: var(--spacing-md);"></div>
                <Skeleton variant="rectangle" width="100%" height="200px" />
                <div style="margin-top: var(--spacing-md);"></div>
                <Skeleton variant="circle" width="64px" height="64px" />
              </div>
            </div>
          </section>

          <!-- ProgressBar Section -->
          <section class="section">
            <h2 class="section-title">
              <i class="bx bx-slider"></i>
              Progress Bars
            </h2>
            <div class="component-demo">
              <h3 class="demo-subtitle">Variants</h3>
              <div style="display: flex; flex-direction: column; gap: var(--spacing-md); width: 100%;">
                <ProgressBar :value="progressValue" label="Primary Progress" variant="primary" :show-value="true" />
                <ProgressBar :value="45" label="Success Progress" variant="success" :show-value="true" />
                <ProgressBar :value="85" label="Gradient Progress" variant="gradient" :show-value="true" />
                <ProgressBar :value="60" label="Striped Progress" variant="primary" :striped="true" :show-value="true" />
              </div>
            </div>
          </section>

          <!-- Chart Section -->
          <section class="section">
            <h2 class="section-title">
              <i class="bx bx-line-chart"></i>
              Charts
            </h2>
            <div class="component-demo">
              <h3 class="demo-subtitle">Chart Types</h3>
              <div class="grid">
                <Chart
                  :data="chartData"
                  :labels="chartLabels"
                  type="bar"
                  title="Bar Chart"
                  subtitle="Monthly Stats"
                  :height="250"
                  gradient-start="#FFCA28"
                  gradient-end="#FF6F00"
                />
                <Chart
                  :data="chartData"
                  :labels="chartLabels"
                  type="line"
                  title="Line Chart"
                  subtitle="Growth Trend"
                  :height="250"
                  :show-points="true"
                  gradient-start="#3b82f6"
                  gradient-end="#1d4ed8"
                />
                <Chart
                  :data="chartData"
                  :labels="chartLabels"
                  type="area"
                  title="Area Chart"
                  subtitle="Performance Over Time"
                  :height="250"
                  gradient-start="#00ff41"
                  gradient-end="#008f11"
                />
              </div>
            </div>
          </section>

          <!-- EmptyState Section -->
          <section class="section">
            <h2 class="section-title">
              <i class="bx bx-folder-open"></i>
              Empty States
            </h2>
            <div class="component-demo">
              <h3 class="demo-subtitle">No Data State</h3>
              <EmptyState
                icon="bx bx-inbox"
                title="No items found"
                description="Your inbox is empty. Start by adding some items."
              >
                <Button variant="gradient">
                  <i class="bx bx-plus"></i>
                  Add Item
                </Button>
              </EmptyState>
            </div>
          </section>

          <!-- Footer -->
          <footer class="footer">
            <p>Built with Vue 3 + Vite</p>
            <p>
              <Badge variant="primary">Vue 3</Badge>
              <Badge variant="info">Vite</Badge>
              <Badge variant="success">Glassmorphism</Badge>
            </p>
            <p style="margin-top: var(--spacing-sm); color: var(--color-text-tertiary); font-size: var(--font-size-xs);">
              © 2024 AresRPG. MIT License.
            </p>
          </footer>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Button, Card, Input, Badge, Modal, ThemeSwitcher, Navbar, Sidebar, Dropdown, Tooltip, Avatar, Alert, Toggle, Tabs, Toast, Skeleton, EmptyState, ProgressBar, Chart } from '../src/index.js'

const showModal = ref(false)
const showConfirmModal = ref(false)

const formData = ref({
  username: '',
  email: '',
  password: '',
  disabled: 'Cannot edit this field'
})

// Dropdown state
const selectedOption = ref(null)
const dropdownOptions = [
  { label: 'Option 1', value: '1', icon: 'bx bx-home' },
  { label: 'Option 2', value: '2', icon: 'bx bx-user' },
  { label: 'Option 3', value: '3', icon: 'bx bx-cog', disabled: true },
  { label: 'Option 4', value: '4', icon: 'bx bx-star' }
]

// Alert state
const showSuccessAlert = ref(true)
const showErrorAlert = ref(true)
const showWarningAlert = ref(true)

// Toggle state
const toggleState = ref(false)
const toggleWithLabel = ref(true)

// Tabs state
const activeTab = ref(0)
const tabsList = [
  { label: 'Tab 1', icon: 'bx bx-home', badge: '3' },
  { label: 'Tab 2', icon: 'bx bx-user' },
  { label: 'Tab 3', icon: 'bx bx-cog' }
]

// Toast state
const toasts = ref([])
let toastId = 0

// Progress bar state
const progressValue = ref(65)

// Chart state
const chartData = ref([30, 45, 28, 60, 75, 50, 85, 70])
const chartLabels = ref(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'])

const sidebarItems = [
  { label: 'Dashboard', icon: 'bx bx-home', active: true },
  { label: 'Components', icon: 'bx bx-layout', badge: '14' },
  { label: 'Themes', icon: 'bx bx-palette', badge: '5' },
  { label: 'Documentation', icon: 'bx bx-book' },
  { label: 'Settings', icon: 'bx bx-cog' }
]

const navLinks = [
  { label: 'Overview', href: '#', icon: 'bx bx-home', active: true },
  { label: 'Components', href: '#', icon: 'bx bx-grid-alt' },
  { label: 'Docs', href: '#', icon: 'bx bx-file' }
]

function handleSidebarClick({ item }) {
  console.log('Sidebar item clicked:', item.label)
}

function handleNavClick({ link }) {
  console.log('Nav link clicked:', link.label)
}

function confirmAction() {
  console.log('Action confirmed!')
  showConfirmModal.value = false
}

function showToast(variant, title, message) {
  const id = toastId++
  toasts.value.push({
    id,
    variant,
    title,
    message,
    show: true
  })
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  position: relative;
}

.toast-container {
  position: fixed;
  top: var(--spacing-lg);
  right: var(--spacing-lg);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  pointer-events: none;
}

.toast-container > * {
  pointer-events: auto;
}

.layout {
  display: flex;
  min-height: 100vh;
}

.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: var(--spacing-lg);
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.theme-switcher-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: var(--spacing-lg);
}

.header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  padding-bottom: var(--spacing-xl);
  border-bottom: 1px solid var(--glass-border);
}

.title {
  font-size: var(--font-size-4xl);
  font-weight: 900;
  margin-bottom: var(--spacing-sm);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 10px rgba(255, 202, 40, 0.15);
}

.subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
}

.section {
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-xl);
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  position: relative;
}

.section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-glass);
  opacity: 0.1;
  border-radius: var(--radius-lg);
  pointer-events: none;
}

.section-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-2xl);
  font-weight: 900;
  margin-bottom: var(--spacing-lg);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-accent-primary);
  position: relative;
  z-index: 1;
}

.section-title i {
  font-size: 1.2em;
}

.component-demo {
  position: relative;
  z-index: 1;
}

.demo-subtitle {
  font-size: var(--font-size-lg);
  font-weight: 700;
  margin-bottom: var(--spacing-md);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: var(--font-size-sm);
}

.demo-group {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  margin-bottom: var(--spacing-lg);
  position: relative;
  z-index: 1;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
  position: relative;
  z-index: 1;
}

.form-demo {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  position: relative;
  z-index: 1;
}

.footer {
  text-align: center;
  padding-top: var(--spacing-xl);
  margin-top: var(--spacing-2xl);
  border-top: 1px solid var(--glass-border);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.footer p {
  margin: var(--spacing-sm) 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 768px) {
  .content {
    padding: var(--spacing-md);
  }

  .section {
    padding: var(--spacing-md);
  }

  .title {
    font-size: var(--font-size-3xl);
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
