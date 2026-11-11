import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    // the skill's checks keep Chrome profiles and screenshots here
    watch: { ignored: ['**/.taste-skill/**', '**/shots/**', '**/dist/**'] },
  },
})
