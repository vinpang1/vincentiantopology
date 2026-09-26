import { getCollection, type CollectionEntry } from 'astro:content';

export type IntroEntry = CollectionEntry<'intro'>;
export type ViewEntry = CollectionEntry<'view'>;
export type TopicsEntry = CollectionEntry<'topics'>;
export type ClassicsEntry = CollectionEntry<'classics'>;

export function slugFromId(id: string): string {
  return id.replace(/\.md$/, '').split('/').pop() ?? id;
}

export type ArticleNeighbor = {
  href: string;
  title: string;
};

export type ArticleNavigationData = {
  sectionHref: string;
  sectionLabel: string;
  prev?: ArticleNeighbor;
  next?: ArticleNeighbor;
};

function neighborsAtIndex(
  sorted: { href: string; title: string }[],
  index: number,
  sectionHref: string,
  sectionLabel: string,
): ArticleNavigationData {
  return {
    sectionHref,
    sectionLabel,
    prev: index > 0 ? sorted[index - 1] : undefined,
    next: index < sorted.length - 1 ? sorted[index + 1] : undefined,
  };
}

export function navigationForIntro(
  entries: IntroEntry[],
  current: IntroEntry,
  sectionHref: string,
  sectionLabel: string,
): ArticleNavigationData {
  const sorted = [...entries]
    .filter((e) => !e.data.draft)
    .sort((a, b) => a.data.order - b.data.order)
    .map((entry) => ({
      href: `/intro/${slugFromId(entry.id)}`,
      title: entry.data.title,
    }));
  const index = sorted.findIndex((item) => item.href === `/intro/${slugFromId(current.id)}`);
  return neighborsAtIndex(sorted, index, sectionHref, sectionLabel);
}

export function navigationForView(
  entries: ViewEntry[],
  current: ViewEntry,
  sectionHref: string,
  sectionLabel: string,
): ArticleNavigationData {
  const sorted = [...entries]
    .filter((e) => !e.data.draft)
    .sort((a, b) => a.data.published.getTime() - b.data.published.getTime())
    .map((entry) => ({
      href: `/view/${slugFromId(entry.id)}`,
      title: entry.data.title,
    }));
  const index = sorted.findIndex(
    (item) => item.href === `/view/${slugFromId(current.id)}`,
  );
  return neighborsAtIndex(sorted, index, sectionHref, sectionLabel);
}

export function navigationForClassics(
  entries: ClassicsEntry[],
  current: ClassicsEntry,
  sectionHref: string,
  sectionLabel: string,
): ArticleNavigationData {
  const sorted = [...entries]
    .filter((e) => !e.data.draft)
    .sort((a, b) => a.data.published.getTime() - b.data.published.getTime())
    .map((entry) => ({
      href: `/classics/${slugFromId(entry.id)}`,
      title: entry.data.title,
    }));
  const index = sorted.findIndex(
    (item) => item.href === `/classics/${slugFromId(current.id)}`,
  );
  return neighborsAtIndex(sorted, index, sectionHref, sectionLabel);
}

export function navigationForTopics(
  entries: TopicsEntry[],
  current: TopicsEntry,
  sectionHref: string,
  sectionLabel: string,
): ArticleNavigationData {
  const sorted = [...entries]
    .filter(
      (e) => !e.data.draft && e.data.series === current.data.series,
    )
    .sort((a, b) => a.data.episode - b.data.episode)
    .map((entry) => ({
      href: `/topics/${entry.data.series}/${entry.data.episode}`,
      title: entry.data.title,
    }));
  const index = sorted.findIndex(
    (item) =>
      item.href === `/topics/${current.data.series}/${current.data.episode}`,
  );
  return neighborsAtIndex(sorted, index, sectionHref, sectionLabel);
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
      description: entry.data.description,
      section: 'topics' as const,
      published: entry.data.published,
    }));

  const viewItems = view.map((entry) => ({
    href: `/view/${slugFromId(entry.id)}`,
    title: entry.data.title,
    description: entry.data.description,
    section: 'view' as const,
    published: entry.data.published,
  }));

  const classicItems = classics.map((entry) => ({
    href: `/classics/${slugFromId(entry.id)}`,
    title: entry.data.title,
    description: entry.data.description,
    section: 'classics' as const,
    published: entry.data.published,
  }));

  return [...viewItems, ...topicItems, ...classicItems]
    .sort((a, b) => b.published.getTime() - a.published.getTime())
    .slice(0, limit);
}
