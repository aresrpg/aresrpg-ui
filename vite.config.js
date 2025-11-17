import { resolve } from 'path'
import { fileURLToPath } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

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
        formats: ['es', 'umd']
      },
      rollupOptions: {
        external: ['vue', 'lucide-vue-next'],
        output: [
          // ES module build with preserved modules for tree shaking
          {
            format: 'es',
            exports: 'named',
            preserveModules: true, // Keep module structure for tree shaking
            preserveModulesRoot: 'src',
            entryFileNames: '[name].js',
            globals: {
              vue: 'Vue',
              'lucide-vue-next': 'LucideVueNext'
            }
          },
          // UMD build (single bundle, no tree shaking)
          {
            format: 'umd',
            name: 'AresRPGUI',
            exports: 'named',
            globals: {
              vue: 'Vue',
              'lucide-vue-next': 'LucideVueNext'
            },
            entryFileNames: 'aresrpg-ui.umd.cjs',
            assetFileNames: 'ui.css'
          }
        ],
        // Shared asset file naming for ES build
        assetFileNames: (assetInfo) => {
          // CSS files use their original names for tree shaking
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'styles/[name][extname]'
          }
          return 'assets/[name][extname]'
        }
      }
    }
  }
})
