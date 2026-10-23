import articlesCsv from '../data/articles.csv?raw';

export type ArticleIndexRow = {
  uuid: string;
  id: string;
  lang: 'zh' | 'en';
  section: string;
  title: string;
  url: string;
  description: string;
  keywords: string[];
  link: string[];
  translation_of: string;
};

export type RelatedArticleItem = {
  title: string;
  url: string;
  description: string;
};

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      fields.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

function parseArticlesCsv(raw: string): ArticleIndexRow[] {
  const text = raw.replace(/^\uFEFF/, '');
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length < 2) return [];
  const header = parseCsvLine(lines[0]);
  const rows: ArticleIndexRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    const record: Record<string, string> = {};
    header.forEach((key, idx) => {
      record[key] = values[idx] ?? '';
    });
    rows.push({
      uuid: record.uuid,
      id: record.id,
      lang: record.lang as 'zh' | 'en',
      section: record.section,
      title: record.title,
      url: record.url,
      description: record.description,
      keywords: record.keywords
        .split('|')
        .map((k) => k.trim())
        .filter(Boolean),
      link: record.link.split('|').map((k) => k.trim()).filter(Boolean),
      translation_of: record.translation_of ?? '',
    });
  }
  return rows;
}

const rows = parseArticlesCsv(articlesCsv);
const byUuid = new Map(rows.map((row) => [row.uuid, row]));
const byId = new Map(rows.map((row) => [row.id, row]));

export function getArticleIndexRows(): ArticleIndexRow[] {
  return rows;
}

export function getArticleIndexById(id: string): ArticleIndexRow | undefined {
  return byId.get(id);
}

export function getArticleIndexByUuid(uuid: string): ArticleIndexRow | undefined {
  return byUuid.get(uuid);
}

export function getRelatedArticlesForContentId(
  contentId: string,
): RelatedArticleItem[] {
  const row = byId.get(contentId);
  if (!row) return [];
  return row.link
    .map((uuid) => byUuid.get(uuid))
    .filter((linked): linked is ArticleIndexRow => linked !== undefined)
    .map((linked) => ({
      title: linked.title,
      url: linked.url,
      description: linked.description,
    }));
}

export type ArticleStructuredMeta = {
  uuid: string;
  keywords: string[];
  relatedLinks: string[];
};

export function getArticleStructuredMeta(
  contentId: string,
): ArticleStructuredMeta | undefined {
  const row = byId.get(contentId);
  if (!row) return undefined;
  const relatedLinks = row.link
    .map((uuid) => byUuid.get(uuid)?.url)
    .filter((url): url is string => Boolean(url));
  return {
    uuid: row.uuid,
    keywords: row.keywords,
    relatedLinks,
  };
}

export function topicsContentId(series: string, episode: number): string {
  return `${series}/${episode}`;
}
