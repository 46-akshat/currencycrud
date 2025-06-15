import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // Keep this as '/' for Vercel
  build: {
    outDir: 'dist', // This is Vite's default, but adding explicitly
  },
  plugins: [react()],
})
