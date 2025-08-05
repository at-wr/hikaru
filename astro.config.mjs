// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

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
    sitemap(),
    cloudflare()
  ],
  output: 'static',
  adapter: cloudflare({
    imageService: 'compile'
  }),
  redirects: {
    // Blog posts: /posts/[slug] -> /archive/[slug]
    "/posts/:slug": "/archive/:slug"
  }
});