import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseArticle = {
  title: z.string(),
  description: z.string().optional(),
  published: z.coerce.date(),
  lang: z.enum(['zh-Hant', 'en']).default('zh-Hant'),
  /** Internal trace to Spin Map uuid — never shown in reader-facing body */
  spin_map_source: z.string().optional(),
  draft: z.boolean().default(false),
};

const intro = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/intro' }),
  schema: z.object({
    ...baseArticle,
    order: z.number().int().min(1).max(99),
  }),
});

const view = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/view' }),
  schema: z.object(baseArticle),
});

const topics = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/topics' }),
  schema: z.object({
    ...baseArticle,
    series: z.string(),
    seriesTitle: z.string(),
    episode: z.number().int().min(1),
  }),
});

const classics = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/classics' }),
  schema: z.object(baseArticle),
});

export const collections = { intro, view, topics, classics };
