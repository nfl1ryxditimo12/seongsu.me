import { allPosts } from 'contentlayer/generated';
import dayjs from 'dayjs';

import { defaultCoverImage } from '@/constants/image';
import { Post, PostPressedCardType, Series } from '@/types/post';

import { reducePost } from './post';

export const allSeriesName = allPosts
  .filter((post) => post._raw.sourceFilePath.includes('/index.mdx'))
  .map((post) => post._raw.sourceFilePath.split('/')[1]);

export const allSnippetName = allPosts
  .filter((post) => post._raw.sourceFilePath.includes('snippet'))
  .map((post) => post._raw.sourceFilePath.split('/')[1]);

export const allPost = allPosts
  .filter(
    (post) => !post.draft && !post._raw.sourceFilePath.includes('/index.mdx'),
  )
  .map((post) => ({
    ...post,
    image: post.image ? post.image : defaultCoverImage,
    seriesName:
      allSeriesName.find((seriesName) =>
        post._raw.flattenedPath.includes(seriesName),
      ) ?? null,
    snippetName:
      allSnippetName.find((snippetName) =>
        post._raw.flattenedPath.includes(snippetName),
      ) ?? null,
  }))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const allBlogPosts: Post[] = allPost.filter(
  (post) => post.snippetName === null,
);

export const allSnippets: Post[] = allPosts
  .filter((post) => post._raw.sourceFilePath.includes('snippet'))
  .map((snippet) => ({
    ...snippet,
    snippetName: snippet._raw.sourceFilePath.split('/')[1] ?? null,
  }))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const reducedAllSnippets = allSnippets.map(reducePost);

export const allSeries: Series[] = allPosts
  .filter((post) => post._raw.sourceFilePath.includes('/index.mdx'))
  .map((series) => ({
    ...series,
    seriesName: series._raw.sourceFilePath.split('/')[1],
    posts: allBlogPosts
      .filter((post) => series.slug.includes(post.seriesName ?? 'none'))
      .map(reducePost)
      .reverse(),
  }))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const allFeaturedPosts: PostPressedCardType[] = allPosts
  .filter((post: Post) => post.isFeatured)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .map((post) => ({
    href: post.slug,
    imgUrl: post.image ?? defaultCoverImage,
    title: post.title,
    date: dayjs(post.date).format('YY.MM.DD'),
  }));
