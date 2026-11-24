import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        services: resolve(import.meta.dirname, 'services.html'),
        packages: resolve(import.meta.dirname, 'packages.html'),
        gallery: resolve(import.meta.dirname, 'gallery.html'),
        faqs: resolve(import.meta.dirname, 'faqs.html'),
        contact: resolve(import.meta.dirname, 'contact.html')
      }
    }
  }
});
