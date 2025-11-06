import { createApp } from 'vue'
import App from './App.vue'
import AresRPGUI from '../src/index.js'

const app = createApp(App)

// Install AresRPG UI library
app.use(AresRPGUI)

app.mount('#app')
