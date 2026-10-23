import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(fileURLToPath(import.meta.url), '..', '..');
const source = path.join(root, 'src', 'data', 'articles.csv');
const dest = path.join(root, 'public', 'articles.csv');
const body = readFileSync(source);
const withBom = Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), body]);
writeFileSync(dest, withBom);
