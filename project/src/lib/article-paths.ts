import type { CollectionEntry } from 'astro:content';
import { site } from '../site.config';

export type ContentLang = 'zh-Hant' | 'en';

export function slugFromId(id: string): string {
  return id.replace(/\.md$/, '').split('/').pop() ?? id;
}

export function pathPrefix(lang: ContentLang): string {
  return lang === 'en' ? '/en' : '';
}

export function absoluteUrl(pathname: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return new URL(path, site.url).href;
}

type ArticleCollection = 'intro' | 'view' | 'topics' | 'classics';

type AnyArticleEntry =
  | CollectionEntry<'intro'>
  | CollectionEntry<'view'>
  | CollectionEntry<'topics'>
  | CollectionEntry<'classics'>;

export function articlePathname(
  collection: ArticleCollection,
  entry: AnyArticleEntry,
): string {
  const prefix = pathPrefix(entry.data.lang);
  switch (collection) {
    case 'intro':
    case 'view':
    case 'classics':
      return `${prefix}/${collection}/${slugFromId(entry.id)}`;
    case 'topics': {
      const data = entry.data as CollectionEntry<'topics'>['data'];
      return `${prefix}/topics/${data.series}/${data.episode}`;
    }
  }
}

export function articleUrl(
  collection: ArticleCollection,
  entry: AnyArticleEntry,
): string {
  return absoluteUrl(articlePathname(collection, entry));
}

const TOPIC_ZH_TO_EN: Record<string, string> = {
  'pyramid-myths': 'pyramid-myths-en',
};

const TOPIC_EN_TO_ZH: Record<string, string> = {
  'pyramid-myths-en': 'pyramid-myths',
};

export type HreflangAlternate = {
  lang: 'zh-Hant' | 'en';
  url: string;
};

export function topicHreflangAlternates(
  series: string,
  episode: number,
): HreflangAlternate[] | undefined {
  let zhSeries: string | undefined;
  let enSeries: string | undefined;

  if (series in TOPIC_ZH_TO_EN) {
    zhSeries = series;
    enSeries = TOPIC_ZH_TO_EN[series];
  } else if (series in TOPIC_EN_TO_ZH) {
    enSeries = series;
    zhSeries = TOPIC_EN_TO_ZH[series];
  }

  if (!zhSeries || !enSeries) return undefined;

  return [
    {
      lang: 'zh-Hant',
      url: absoluteUrl(`/topics/${zhSeries}/${episode}`),
    },
    {
      lang: 'en',
      url: absoluteUrl(`/en/topics/${enSeries}/${episode}`),
    },
  ];
}

export function publisherName(lang: ContentLang): string {
  return lang === 'en'
    ? 'All Things Are One｜Vincentian Topology'
    : '萬脈同構｜文森思維';
}

export function authorName(lang: ContentLang): string {
  return lang === 'en' ? 'Vincent' : '文森';
}

export function ogLocale(lang: ContentLang): string {
  return lang === 'en' ? 'en_US' : 'zh_TW';
}
