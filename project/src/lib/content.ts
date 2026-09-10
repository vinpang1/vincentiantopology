import { getCollection, type CollectionEntry } from 'astro:content';

export type IntroEntry = CollectionEntry<'intro'>;
export type ViewEntry = CollectionEntry<'view'>;
export type TopicsEntry = CollectionEntry<'topics'>;
export type ClassicsEntry = CollectionEntry<'classics'>;

export function slugFromId(id: string): string {
  return id.replace(/\.md$/, '').split('/').pop() ?? id;
}

export function formatDate(date: Date, lang: 'zh-Hant' | 'en' = 'zh-Hant'): string {
  return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-Hant-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export async function getPublishedIntro(): Promise<IntroEntry[]> {
  return (await getCollection('intro'))
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => a.data.order - b.data.order);
}

export async function getPublishedView(): Promise<ViewEntry[]> {
  return (await getCollection('view'))
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => b.data.published.getTime() - a.data.published.getTime());
}

export async function getPublishedClassics(): Promise<ClassicsEntry[]> {
  return (await getCollection('classics'))
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => b.data.published.getTime() - a.data.published.getTime());
}

export type TopicSeries = {
  slug: string;
  title: string;
  entries: TopicsEntry[];
};

export async function getTopicSeries(): Promise<TopicSeries[]> {
  const entries = (await getCollection('topics'))
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => {
      if (a.data.series !== b.data.series) {
        return a.data.seriesTitle.localeCompare(b.data.seriesTitle, 'zh-Hant');
      }
      return a.data.episode - b.data.episode;
    });

  const map = new Map<string, TopicSeries>();

  for (const entry of entries) {
    const existing = map.get(entry.data.series);
    if (existing) {
      existing.entries.push(entry);
    } else {
      map.set(entry.data.series, {
        slug: entry.data.series,
        title: entry.data.seriesTitle,
        entries: [entry],
      });
    }
  }

  return [...map.values()];
}

export async function getLatestArticles(limit = 3) {
  const [view, classics, topics] = await Promise.all([
    getPublishedView(),
    getPublishedClassics(),
    getCollection('topics'),
  ]);

  const topicItems = topics
    .filter((e) => !e.data.draft)
    .map((entry) => ({
      href: `/topics/${entry.data.series}/${entry.data.episode}`,
      title: entry.data.title,
      section: 'topics' as const,
      published: entry.data.published,
    }));

  const viewItems = view.map((entry) => ({
    href: `/view/${slugFromId(entry.id)}`,
    title: entry.data.title,
    section: 'view' as const,
    published: entry.data.published,
  }));

  const classicItems = classics.map((entry) => ({
    href: `/classics/${slugFromId(entry.id)}`,
    title: entry.data.title,
    section: 'classics' as const,
    published: entry.data.published,
  }));

  return [...viewItems, ...topicItems, ...classicItems]
    .sort((a, b) => b.published.getTime() - a.published.getTime())
    .slice(0, limit);
}
