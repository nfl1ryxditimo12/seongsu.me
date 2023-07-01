import { GetStaticPaths, GetStaticProps } from 'next';

import { PostNavigationProps } from '@/components/PostNavigation';
import PostDetailLayout, {
  PostDetailLayoutProps,
} from '@/layouts/PostDetailLayout';
import { allBlogPosts, allSeries } from '@/libs/dataset';
import { parseContents } from '@/libs/mdx';
import { Series } from '@/types/post';

// SSG 렌더링을 사용하기 위한 getStaticPaths 함수 사용
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allBlogPosts.map((post) => post.slug),
    // 현재 등록된 글 이외의 제목이 전달될경우 404 처리
    fallback: true,
  };
};

// SSG 렌더링을 사용하기 위한 getStaticProps 함수 사용
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slugs } = params as { slugs: string[] };
  const slug = `/blog/${[...slugs].join('/')}`;

  const post = allBlogPosts.find((v) => v.slug === slug);
  const postIndex = allBlogPosts.findIndex((v) => v.slug === slug);

  if (!post || postIndex < 0) {
    return {
      notFound: true,
    };
  }

  const postNavigation: PostNavigationProps = {
    prevPost: allBlogPosts.at(postIndex + 1) ?? null,
    nextPost: allBlogPosts.at(postIndex - 1) ?? null,
  };

  let series: Series | null = null;

  if (post.seriesName) {
    series =
      allSeries.find((series) =>
        series.slug.startsWith(`/blog/${post.seriesName}`),
      ) ?? null;
  }

  const props: PostDetailLayoutProps = {
    post,
    series,
    postNavigation,
    tableOfContents: parseContents(post.body.raw),
  };

  return {
    props,
  };
};

export default function PostPage(props: PostDetailLayoutProps) {
  return <PostDetailLayout {...props} />;
}
