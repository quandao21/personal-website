import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Matches the repository name for GitHub Pages: https://quandao21.github.io/personal-website/
  base: '/personal-website/', 
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  }
});