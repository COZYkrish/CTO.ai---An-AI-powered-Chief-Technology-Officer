import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@cinematic': path.resolve(__dirname, './src/cinematic'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'motion': ['framer-motion', 'gsap'],
          'flow': ['reactflow'],
          'charts': ['recharts'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['three', 'gsap', 'framer-motion'],
  },
})
