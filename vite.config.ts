import path from "path"
import react from "@vitejs/plugin-react"
import Pages from "vite-plugin-pages"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Pages({
      dirs: 'src/components',
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },  
  server: {
    port: 3000, // 여기에서 원하는 포트로 설정 (예: 3000)
  },  
})
