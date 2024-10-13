import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'public',
  resolve: {
    alias: {
      '@/components': path.resolve(__dirname, './src/components'),
      '@/core': path.resolve(__dirname, './src/core'),
      '@/kit': path.resolve(__dirname, './src/features/kit/components'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/pathsConfig': path.resolve(__dirname, './src/router/entities/paths.config.ts')
    }
  },
  plugins: [react()]
})
