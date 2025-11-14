import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig(({ mode }) => {
  // Demo build for GitHub Pages
  if (mode === 'demo') {
    return {
      root: 'demo',
      plugins: [vue()],
      base: '/aresrpg-ui/',
      build: {
        outDir: '../dist-demo',
        emptyOutDir: true
      }
    }
  }

  // Library build (default)
  return {
    plugins: [vue()],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.js'),
        name: 'AresRPGUI',
        fileName: (format) => `aresrpg-ui.${format === 'es' ? 'js' : 'umd.cjs'}`
      },
      rollupOptions: {
        external: ['vue', 'lucide-vue-next'],
        output: {
          exports: 'named',
          globals: {
            vue: 'Vue',
            'lucide-vue-next': 'LucideVueNext'
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') return 'style.css'
            return assetInfo.name
          }
        }
      }
    }
  }
})
