// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sanity from '@sanity/astro';

export default defineConfig({
  integrations: [
    react(),
    sanity({
      projectId: 'h5u9npf1',
      dataset: 'production',
      studioBasePath: '/studio',
      useCdn: false,
    }),
  ],
});
