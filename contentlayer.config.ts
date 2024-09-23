import {
  defineDocumentType,
  FieldDefs,
  makeSource,
} from 'contentlayer/source-files';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import rehypeCodeWrap from './src/libs/rehypeCodeWrap';
import { slugStore } from './src/libs/slug';

const fields: FieldDefs = {
  title: { type: 'string', required: true },
  description: { type: 'string', default: '' },
  date: { type: 'date', required: true },
  tags: { type: 'list', required: true, of: { type: 'string' } },
  draft: { type: 'boolean' },
  image: { type: 'string' },
  icon: { type: 'string' },
  isFeatured: { type: 'boolean', default: false },
  isVisible: { type: 'boolean', default: true },
};

export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: `**/*.mdx`,
  fields,
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => {
        if (post._raw.sourceFileName === 'index.mdx') {
          return '/' + post._raw.flattenedPath;
        } else {
          return '/post/' + slugStore.get(post._raw.sourceFilePath);
        }
      },
    },
    readingMinutes: {
      type: 'string',
      resolve: (post) => Math.ceil(readingTime(post.body.raw).minutes),
    },
    wordCount: {
      type: 'number',
      resolve: (post) => post.body.raw.split(/\s+/gu).length,
    },
  },
}));

const contentSource = makeSource({
  contentDirPath: 'contents',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm, remarkBreaks],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeWrap,
      rehypePrism,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
            ariaLabel: 'anchor',
          },
        },
      ],
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noopener noreferrer'],
        },
      ],
    ],
  },
});

export default contentSource;
