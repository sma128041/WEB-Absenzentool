import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  // Mehrseitige App: jede HTML-Seite muss hier für den Build eingetragen sein
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        erfassen: resolve(import.meta.dirname, 'erfassen.html'),
        detail: resolve(import.meta.dirname, 'detail.html'),
      },
    },
  },
  // Im Entwicklungsmodus werden alle Anfragen an /api an das Node-Backend weitergeleitet
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
