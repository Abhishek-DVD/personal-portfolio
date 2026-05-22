import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const base = process.env.VERCEL ? '/' : '/personal-portfolio/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
