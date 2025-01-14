import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true
  },
  build: {
    assetsInlineLimit: 0, // Ensures all assets are processed by the asset pipeline
  },
  publicDir: 'public', // Static assets directory
});
