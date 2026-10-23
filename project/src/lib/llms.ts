import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '../site.config';
import { articleUrl, publisherName } from './article-paths';
import type { ContentLang } from './article-paths';
import { getArticleIndexByUuid, getArticleIndexRows } from './articles-index';

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

const ZH_SECTION_ORDER = ['文森世界', '專題探討', '關於我們', '經典註解'] as const;
const EN_SECTION_ORDER = [
  'Vincentian View',
  'Special Topics',
  'About Us',
  'Classic Commentary',
] as const;

const SECTION_INTRO_ZH: Record<string, string> = {
  文森世界: '短評與觀察：從當下新聞、生活與閱讀出發，連到經典與思想。',
  專題探討: '連載式深度專題，依期推進論點與材料。',
  關於我們: '說明本站寫作方法、訂閱與「思想對碰」的定位。',
  經典註解: '慢讀經典文本的長篇註解與導讀。',
};

const SECTION_INTRO_EN: Record<string, string> = {
  'Vincentian View':
    'Short essays linking current events, life, and reading to classics and ideas.',
  'Special Topics': 'Serialized deep dives that build argument and evidence by episode.',
  'About Us':
    'How this site writes, what the subscription is for, and what Ideas in Collision means.',
  'Classic Commentary': 'Long-form commentary and guided reading of classic texts.',
};

function formatRelatedLine(
  row: ReturnType<typeof getArticleIndexRows>[number],
  isEn: boolean,
): string {
  const linked = row.link
    .map((uuid) => getArticleIndexByUuid(uuid))
    .filter((item): item is NonNullable<typeof item> => item !== undefined);
  if (linked.length === 0) return '';
  const label = isEn ? 'Related' : '相關';
  const parts = linked.map((item) => `[${item.title}](${item.url})`);
  const joiner = isEn ? ', ' : '、';
  return `  ${label}：${parts.join(joiner)}`;
}

function formatCsvSection(
  heading: string,
  intro: string,
  sectionName: string,
  isEn: boolean,
): string {
  const rows = getArticleIndexRows().filter(
    (row) => row.section === sectionName && row.lang === (isEn ? 'en' : 'zh'),
  );
  if (rows.length === 0) return '';
  const lines = rows.map((row) => {
    const desc = row.description.trim();
    const main = desc
      ? `- [${row.title}](${row.url}): ${desc}`
      : `- [${row.title}](${row.url})`;
    const related = formatRelatedLine(row, isEn);
    return related ? `${main}\n${related}` : main;
  });
  return `## ${heading}\n\n${intro}\n\n${lines.join('\n')}\n`;
}

export async function generateLlmsTxt(): Promise<string> {
  const header = `# ${publisherName('zh-Hant')} / ${publisherName('en')}

> ${site.description}

## 文章索引（機器可讀）

完整文章清單見 [/articles.csv](https://www.vincentiantopology.com/articles.csv)。每行含 \`uuid\`（前綴為欄目代碼：vwd 文森世界、tpc 專題探討、abt 關於我們、cls 經典註解）、\`keywords\`（以 \`|\` 分隔，供主題搜尋）、\`link\`（相關文章 uuid，由左至右相關度由高至低，限同語言）、以及 \`translation_of\`（另一語言對應篇之 uuid）。

## Article index (machine-readable)

The full catalog is at [/articles.csv](https://www.vincentiantopology.com/articles.csv). Each row includes \`uuid\` (section prefix: vwd Vincentian View, tpc Special Topics, abt About Us, cls Classic Commentary), pipe-separated \`keywords\`, ordered \`link\` uuids (left = most related; same language only), and \`translation_of\` for the paired article in the other language.

`;

  const zhBlocks = ZH_SECTION_ORDER.map((section) =>
    formatCsvSection(section, SECTION_INTRO_ZH[section] ?? '', section, false),
  ).join('');

  const enBlocks = EN_SECTION_ORDER.map((section) =>
    formatCsvSection(section, SECTION_INTRO_EN[section] ?? '', section, true),
  ).join('');

  return (header + zhBlocks + enBlocks).trimEnd() + '\n';
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
