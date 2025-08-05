// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://wrye.dev', // TODO: Update with actual site URL
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    shikiConfig: {
      // Enable dual themes for light/dark mode support
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
      // Enable proper syntax highlighting
      defaultColor: 'light',
    }
  },
  integrations: [
    sitemap()
  ]
});