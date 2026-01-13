import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets are loaded correctly on GitHub Pages sub-paths
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  }
});