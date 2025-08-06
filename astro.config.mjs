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
      theme: 'catppuccin-latte',
      wrap: true,
      defaultColor: 'light',
    }
  },
  integrations: [
    sitemap()
  ],
  output: 'static'
});