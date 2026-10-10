// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/lib/sitemap-serialize.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.vincentiantopology.com',
  integrations: [
    sitemap({
      serialize: sitemapSerialize,
    }),
  ],
  redirects: {
    '/topics/pyramid-myths-en/1': {
      status: 308,
      destination: '/en/topics/pyramid-myths-en/1',
    },
    '/topics/pyramid-myths-en/2': {
      status: 308,
      destination: '/en/topics/pyramid-myths-en/2',
    },
    '/topics/pyramid-myths-en/3': {
      status: 308,
      destination: '/en/topics/pyramid-myths-en/3',
    },
    '/topics/pyramid-myths-en/4': {
      status: 308,
      destination: '/en/topics/pyramid-myths-en/4',
    },
  },
});
