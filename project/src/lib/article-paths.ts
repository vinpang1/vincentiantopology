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

const INTRO_ZH_TO_EN: Record<string, string> = {
  '0-1': '0-1-en',
  '0-2': '0-2-en',
  '0-3': '0-3-en',
  '0-4': '0-4-en',
};

const INTRO_EN_TO_ZH: Record<string, string> = {
  '0-1-en': '0-1',
  '0-2-en': '0-2',
  '0-3-en': '0-3',
  '0-4-en': '0-4',
};

const VIEW_ZH_TO_EN: Record<string, string> = {
  'dream-fill-stories': 'dream-fill-stories-en',
};

const VIEW_EN_TO_ZH: Record<string, string> = {
  'dream-fill-stories-en': 'dream-fill-stories',
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

export function viewHreflangAlternates(
  slug: string,
): HreflangAlternate[] | undefined {
  let zhSlug: string | undefined;
  let enSlug: string | undefined;

  if (slug in VIEW_ZH_TO_EN) {
    zhSlug = slug;
    enSlug = VIEW_ZH_TO_EN[slug];
  } else if (slug in VIEW_EN_TO_ZH) {
    enSlug = slug;
    zhSlug = VIEW_EN_TO_ZH[slug];
  }

  if (!zhSlug || !enSlug) return undefined;

  return [
    {
      lang: 'zh-Hant',
      url: absoluteUrl(`/view/${zhSlug}`),
    },
    {
      lang: 'en',
      url: absoluteUrl(`/en/view/${enSlug}`),
    },
  ];
}

export function introHreflangAlternates(
  slug: string,
): HreflangAlternate[] | undefined {
  let zhSlug: string | undefined;
  let enSlug: string | undefined;

  if (slug in INTRO_ZH_TO_EN) {
    zhSlug = slug;
    enSlug = INTRO_ZH_TO_EN[slug];
  } else if (slug in INTRO_EN_TO_ZH) {
    enSlug = slug;
    zhSlug = INTRO_EN_TO_ZH[slug];
  }

  if (!zhSlug || !enSlug) return undefined;

  return [
    {
      lang: 'zh-Hant',
      url: absoluteUrl(`/intro/${zhSlug}`),
    },
    {
      lang: 'en',
      url: absoluteUrl(`/en/intro/${enSlug}`),
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
