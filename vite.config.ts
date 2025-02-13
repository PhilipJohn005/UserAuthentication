import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // Allow external access
    strictPort: true,
    port: 5173, // Ensure it matches your Vite port
    allowedHosts: ['.ngrok-free.app'] // Allow all ngrok subdomains
  }
})
