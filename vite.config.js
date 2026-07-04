import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensure the base path starts and ends with a single quote mark
  base: '/youtube-clone/', 
})
