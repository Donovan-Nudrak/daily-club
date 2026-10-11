import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Production uses the root of the custom domain daily-club.nudrak.dev.
  base: '/',
})
