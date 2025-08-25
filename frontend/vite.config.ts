import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // 👈 тут фіксуємо порт
    strictPort: true, // якщо порт зайнятий → кине помилку, а не вибере інший
  },
})
