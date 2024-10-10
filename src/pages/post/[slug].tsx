import { GetStaticPaths, GetStaticProps } from 'next';

import { PostNavigationProps } from '@/components/post/PostNavigation';
import PostLayout, { PostLayoutProps } from '@/layouts/PostLayout';
import { isDev } from '@/libs/core';
import { allPost, allSeries } from '@/libs/dataset';
import { parseContents } from '@/libs/mdx';
import { Series } from '@/types/post';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allPost.map((post) => post.slug),
    fallback: isDev ? false : 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const path = `/post/${slug}`;

  const post = allPost.find((v) => v.slug === path);
  const postIndex = allPost.findIndex((v) => v.slug === path);

  if (!post || postIndex < 0) {
    return {
      notFound: true,
    };
  }

  const postNavigation: PostNavigationProps = {
    prevPost: allPost.at(postIndex + 1) ?? null,
    nextPost: postIndex === 0 ? null : allPost.at(postIndex - 1) ?? null,
  };

  let series: Series | null = null;

  if (post.seriesName) {
    series =
      allSeries.find((series) =>
        series._raw.sourceFilePath.startsWith(`series/${post.seriesName}`),
      ) ?? null;
  }

  const props: PostLayoutProps = {
    post,
    series,
    postNavigation,
    tableOfContents: parseContents(post.body.raw),
  };

  return {
    props,
  };
};

export default function PostPage(props: PostLayoutProps) {
  return <PostLayout {...props} />;
}
