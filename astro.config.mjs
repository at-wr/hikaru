// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://wrye.dev',
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'Inter',
        cssVariable: '--font-inter',
        weights: ['100 900'],
        subsets: ['latin', 'latin-ext'],
      }
    ]
  },
  vite: {
    plugins: [tailwindcss()]
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-mocha',
      },
      wrap: true,
      defaultColor: 'dark',
    }
  },
  integrations: [
    sitemap()
  ],
  output: 'static'
});
