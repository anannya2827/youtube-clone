import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add the base property below if deploying to GitHub Pages:
  base: process.env.NODE_ENV === 'production' ? '/youtube-clone/' : '/',
})
