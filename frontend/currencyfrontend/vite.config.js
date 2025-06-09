import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // KEEP THIS AS '/' for Vercel
  plugins: [react()],
})
