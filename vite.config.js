import vitePluginRequire from "vite-plugin-require";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Enables source maps
  },
  server: {
    historyApiFallback: true,
}
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'