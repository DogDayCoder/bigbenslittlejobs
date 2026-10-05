import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true },
  build: {
    rollupOptions: {
      input: { main: resolve(import.meta.dirname, 'index.html'), thanks: resolve(import.meta.dirname, 'thanks.html') },
    },
  },
});
