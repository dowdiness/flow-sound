import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unfonts from 'unplugin-fonts/vite'
import TurboConsole from 'unplugin-turbo-console/vite'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Unfonts({
      google: {
        families: ['Orbitron'],
      },
    }),
    TurboConsole(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          radix: ["@radix-ui/react-context-menu", "@radix-ui/react-slot"],
          xyflow: ["@xyflow/react"],
          knob: ["react-knob-headless"],
          css: ["clsx", "tailwind-merge", "class-variance-authority"],
        },
      },
    }
  }
})
