import { getCollection, type CollectionEntry } from 'astro:content';
import { slugFromId, type ContentLang } from './article-paths';

export type { ContentLang };
export { slugFromId };

export type IntroEntry = CollectionEntry<'intro'>;
export type ViewEntry = CollectionEntry<'view'>;
export type TopicsEntry = CollectionEntry<'topics'>;
export type ClassicsEntry = CollectionEntry<'classics'>;

function pathPrefix(lang: ContentLang): string {
  return lang === 'en' ? '/en' : '';
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
  lang: ContentLang = 'zh-Hant',
): ArticleNavigationData {
  const prefix = pathPrefix(lang);
  const sorted = [...entries]
    .filter((e) => !e.data.draft && e.data.lang === lang)
    .sort((a, b) => a.data.order - b.data.order)
    .map((entry) => ({
      href: `${prefix}/intro/${slugFromId(entry.id)}`,
      title: entry.data.title,
    }));
  const currentHref = `${prefix}/intro/${slugFromId(current.id)}`;
  const index = sorted.findIndex((item) => item.href === currentHref);
  return neighborsAtIndex(sorted, index, sectionHref, sectionLabel);
}

export function navigationForView(
  entries: ViewEntry[],
  current: ViewEntry,
  sectionHref: string,
  sectionLabel: string,
  lang: ContentLang = 'zh-Hant',
): ArticleNavigationData {
  const prefix = pathPrefix(lang);
  const sorted = [...entries]
    .filter((e) => !e.data.draft && e.data.lang === lang)
    .sort((a, b) => a.data.published.getTime() - b.data.published.getTime())
    .map((entry) => ({
      href: `${prefix}/view/${slugFromId(entry.id)}`,
      title: entry.data.title,
    }));
  const currentHref = `${prefix}/view/${slugFromId(current.id)}`;
  const index = sorted.findIndex((item) => item.href === currentHref);
  return neighborsAtIndex(sorted, index, sectionHref, sectionLabel);
}

export function navigationForClassics(
  entries: ClassicsEntry[],
  current: ClassicsEntry,
  sectionHref: string,
  sectionLabel: string,
  lang: ContentLang = 'zh-Hant',
): ArticleNavigationData {
  const prefix = pathPrefix(lang);
  const sorted = [...entries]
    .filter((e) => !e.data.draft && e.data.lang === lang)
    .sort((a, b) => a.data.published.getTime() - b.data.published.getTime())
    .map((entry) => ({
      href: `${prefix}/classics/${slugFromId(entry.id)}`,
      title: entry.data.title,
    }));
  const currentHref = `${prefix}/classics/${slugFromId(current.id)}`;
  const index = sorted.findIndex((item) => item.href === currentHref);
  return neighborsAtIndex(sorted, index, sectionHref, sectionLabel);
}

export function navigationForTopics(
  entries: TopicsEntry[],
  current: TopicsEntry,
  sectionHref: string,
  sectionLabel: string,
  lang: ContentLang = 'zh-Hant',
): ArticleNavigationData {
  const prefix = pathPrefix(lang);
  const sorted = [...entries]
    .filter(
      (e) =>
        !e.data.draft &&
        e.data.lang === lang &&
        e.data.series === current.data.series,
    )
    .sort((a, b) => a.data.episode - b.data.episode)
    .map((entry) => ({
      href: `${prefix}/topics/${entry.data.series}/${entry.data.episode}`,
      title: entry.data.title,
    }));
  const currentHref = `${prefix}/topics/${current.data.series}/${current.data.episode}`;
  const index = sorted.findIndex((item) => item.href === currentHref);
  return neighborsAtIndex(sorted, index, sectionHref, sectionLabel);
}

export function formatDate(date: Date, lang: ContentLang = 'zh-Hant'): string {
  return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-Hant-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export async function getPublishedIntro(
  lang: ContentLang = 'zh-Hant',
): Promise<IntroEntry[]> {
  return (await getCollection('intro'))
    .filter((entry) => !entry.data.draft && entry.data.lang === lang)
    .sort((a, b) => a.data.order - b.data.order);
}

export async function getPublishedView(
  lang: ContentLang = 'zh-Hant',
): Promise<ViewEntry[]> {
  return (await getCollection('view'))
    .filter((entry) => !entry.data.draft && entry.data.lang === lang)
    .sort((a, b) => b.data.published.getTime() - a.data.published.getTime());
}

export async function getPublishedClassics(
  lang: ContentLang = 'zh-Hant',
): Promise<ClassicsEntry[]> {
  return (await getCollection('classics'))
    .filter((entry) => !entry.data.draft && entry.data.lang === lang)
    .sort((a, b) => b.data.published.getTime() - a.data.published.getTime());
}

export type TopicSeries = {
  slug: string;
  title: string;
  entries: TopicsEntry[];
};

export async function getTopicSeries(
  lang: ContentLang = 'zh-Hant',
): Promise<TopicSeries[]> {
  const locale = lang === 'en' ? 'en' : 'zh-Hant';
  const entries = (await getCollection('topics'))
    .filter((entry) => !entry.data.draft && entry.data.lang === lang)
    .sort((a, b) => {
      if (a.data.series !== b.data.series) {
        return a.data.seriesTitle.localeCompare(b.data.seriesTitle, locale);
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

export async function getLatestArticles(
  limit = 3,
  lang: ContentLang = 'zh-Hant',
) {
  const prefix = pathPrefix(lang);
  const [view, classics, topics] = await Promise.all([
    getPublishedView(lang),
    getPublishedClassics(lang),
    getCollection('topics'),
  ]);

  const topicItems = topics
    .filter((e) => !e.data.draft && e.data.lang === lang)
    .map((entry) => ({
      href: `${prefix}/topics/${entry.data.series}/${entry.data.episode}`,
      title: entry.data.title,
      description: entry.data.description,
      section: 'topics' as const,
      published: entry.data.published,
    }));

  const viewItems = view.map((entry) => ({
    href: `${prefix}/view/${slugFromId(entry.id)}`,
    title: entry.data.title,
    description: entry.data.description,
    section: 'view' as const,
    published: entry.data.published,
  }));

  const classicItems = classics.map((entry) => ({
    href: `${prefix}/classics/${slugFromId(entry.id)}`,
    title: entry.data.title,
    description: entry.data.description,
    section: 'classics' as const,
    published: entry.data.published,
  }));

  return [...viewItems, ...topicItems, ...classicItems]
    .sort((a, b) => b.published.getTime() - a.published.getTime())
    .slice(0, limit);
}
