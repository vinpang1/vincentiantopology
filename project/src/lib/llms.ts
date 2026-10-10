import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '../site.config';
import { articleUrl, publisherName } from './article-paths';
import type { ContentLang } from './article-paths';

export type LlmsArticle = {
  title: string;
  description: string;
  url: string;
  lang: ContentLang;
};

type ArticleCollection = 'intro' | 'view' | 'topics' | 'classics';

type AnyArticleEntry =
  | CollectionEntry<'intro'>
  | CollectionEntry<'view'>
  | CollectionEntry<'topics'>
  | CollectionEntry<'classics'>;

async function publishedArticles(): Promise<LlmsArticle[]> {
  const [intro, view, topics, classics] = await Promise.all([
    getCollection('intro', ({ data }) => !data.draft),
    getCollection('view', ({ data }) => !data.draft),
    getCollection('topics', ({ data }) => !data.draft),
    getCollection('classics', ({ data }) => !data.draft),
  ]);

  const items: LlmsArticle[] = [];

  const pushAll = (collection: ArticleCollection, entries: AnyArticleEntry[]) => {
    for (const entry of entries) {
      items.push({
        title: entry.data.title,
        description: entry.data.description ?? '',
        url: articleUrl(collection, entry),
        lang: entry.data.lang,
      });
    }
  };

  pushAll('intro', intro);
  pushAll('view', view);
  pushAll('topics', topics);
  pushAll('classics', classics);

  return items.sort((a, b) => a.title.localeCompare(b.title, 'zh-Hant'));
}

function formatSection(heading: string, articles: LlmsArticle[]): string {
  if (articles.length === 0) return '';
  const lines = articles.map((article) => {
    const desc = article.description.trim();
    return desc
      ? `- [${article.title}](${article.url}): ${desc}`
      : `- [${article.title}](${article.url})`;
  });
  return `## ${heading}\n\n${lines.join('\n')}\n`;
}

export async function generateLlmsTxt(): Promise<string> {
  const articles = await publishedArticles();
  const zh = articles.filter((a) => a.lang === 'zh-Hant');
  const en = articles.filter((a) => a.lang === 'en');

  const header = `# ${publisherName('zh-Hant')} / ${publisherName('en')}

> ${site.description}

`;

  return (
    header +
    formatSection('中文文章', zh) +
    formatSection('English articles', en)
  ).trimEnd() + '\n';
}

export async function generateLlmsFullTxt(): Promise<string> {
  const [intro, view, topics, classics] = await Promise.all([
    getCollection('intro', ({ data }) => !data.draft),
    getCollection('view', ({ data }) => !data.draft),
    getCollection('topics', ({ data }) => !data.draft),
    getCollection('classics', ({ data }) => !data.draft),
  ]);

  const blocks: string[] = [
    `# ${publisherName('zh-Hant')} / ${publisherName('en')}`,
    '',
    `> ${site.description}`,
    '',
  ];

  const appendEntries = (
    collection: ArticleCollection,
    entries: AnyArticleEntry[],
  ) => {
    const sorted = [...entries].sort((a, b) =>
      a.data.title.localeCompare(b.data.title, 'zh-Hant'),
    );
    for (const entry of sorted) {
      blocks.push(
        '---',
        '',
        `# ${entry.data.title}`,
        '',
        `URL: ${articleUrl(collection, entry)}`,
        '',
        entry.body.trim(),
        '',
      );
    }
  };

  appendEntries('intro', intro);
  appendEntries('view', view);
  appendEntries('topics', topics);
  appendEntries('classics', classics);

  return blocks.join('\n').trimEnd() + '\n';
}
