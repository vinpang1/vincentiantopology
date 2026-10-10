import type { SitemapItem } from '@astrojs/sitemap';
import { topicHreflangAlternates } from './article-paths';

const REDIRECT_SOURCE_PREFIXES = ['/topics/pyramid-myths-en/'];

function isRedirectOnlyPath(pathname: string): boolean {
  return REDIRECT_SOURCE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function pathnameFromSitemapUrl(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

function topicAlternateLinks(pathname: string): SitemapItem['links'] | undefined {
  const zhMatch = pathname.match(/^\/topics\/([^/]+)\/(\d+)\/?$/);
  const enMatch = pathname.match(/^\/en\/topics\/([^/]+)\/(\d+)\/?$/);

  const series = zhMatch?.[1] ?? enMatch?.[1];
  const episode = Number(zhMatch?.[2] ?? enMatch?.[2]);
  if (!series || !episode) return undefined;

  const alternates = topicHreflangAlternates(series, episode);
  if (!alternates) return undefined;

  return alternates.map(({ lang, url }) => ({
    url,
    lang,
  }));
}

export function sitemapSerialize(item: SitemapItem): SitemapItem | undefined {
  const pathname = pathnameFromSitemapUrl(item.url);
  if (isRedirectOnlyPath(pathname)) {
    return undefined;
  }

  const links = topicAlternateLinks(pathname);
  if (links) {
    item.links = links;
  }

  return item;
}
