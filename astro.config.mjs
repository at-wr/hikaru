// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://wrye.dev',
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    shikiConfig: {
      // Enable dual themes for light/dark mode support
      theme: 'catppuccin-mocha',
      wrap: true,
      // Enable proper syntax highlighting
      defaultColor: 'light',
    }
  },
  integrations: [
    sitemap()
  ],
  output: 'static'
});