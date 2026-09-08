import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    section: z.enum(['intro', 'view', 'topics', 'classics']),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(true),
    lang: z.enum(['zh', 'en']).default('zh'),
  }),
});

export const collections = { posts };
