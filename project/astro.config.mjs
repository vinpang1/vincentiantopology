// @ts-check
import { copyFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/lib/sitemap-serialize.ts';

/** Copy sitemap-0.xml → sitemap.xml so /sitemap.xml resolves for tools that guess that path. */
function sitemapXmlAlias() {
  return {
    name: 'sitemap-xml-alias',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const outDir = fileURLToPath(dir);
        const source = path.join(outDir, 'sitemap-0.xml');
        const dest = path.join(outDir, 'sitemap.xml');
        if (!existsSync(source)) {
          throw new Error(`Missing ${source}; cannot emit /sitemap.xml alias.`);
        }
        copyFileSync(source, dest);
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://www.vincentiantopology.com',
  integrations: [
    sitemap({
      serialize: sitemapSerialize,
    }),
    sitemapXmlAlias(),
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
