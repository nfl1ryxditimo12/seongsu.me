import appRootPath from 'app-root-path';
import fastGlob from 'fast-glob';
import fs from 'fs';

import { PostMetadata, SlugStore } from '@/types/post';

const contentPath = `${appRootPath.path}/contents/`;

const parseDate = (filePath: string): Date => {
  const file = fs.readFileSync(filePath, 'utf8');
  const date = (file.match(/date: (.*)/) as RegExpMatchArray)[1];

  if (isNaN(new Date(date).getTime())) {
    throw new Error(`Invalid date: ${filePath}`);
  }

  return new Date(date);
};

const generateSlug = (): SlugStore => {
  const contents = fastGlob
    .sync(contentPath + '**/*.mdx', { ignore: ['**/index.mdx'] })
    .map(
      (content: string): PostMetadata => ({
        sourcePath: content.replace(contentPath, ''),
        date: parseDate(content),
      }),
    );

  const sorted = contents.sort(
    (prev, curr) => prev.date.getTime() - curr.date.getTime(),
  );

  const stored = sorted.reduce((map, post, index) => {
    map.set(post.sourcePath, (index + 1).toString());
    return map;
  }, new Map<string, string>());

  return stored;
};

const slugStore = generateSlug();

export { slugStore };
