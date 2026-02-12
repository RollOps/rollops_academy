import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // For local subdomain testing: add entries to /etc/hosts
    // 127.0.0.1 onyx.localhost
    // Then access http://onyx.localhost:5173
    host: true,
    port: 5173,
  },
})
