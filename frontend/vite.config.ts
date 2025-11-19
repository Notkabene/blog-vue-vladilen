import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'


import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const backendUrl = 'http://localhost:3002'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5174,
    proxy: {
      '/posts': {
        target: backendUrl,
        changeOrigin: true,
      },
      '/register': {
        target: backendUrl,
        changeOrigin: true,
      },
    }
  },
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
