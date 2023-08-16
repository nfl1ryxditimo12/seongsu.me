import { fadeIn, staggerHalf } from '@/constants/animations';
import { allFeaturedPosts } from '@/libs/dataset';

import { AnimatedContainer, LinkArrow, SubTitle } from '../common';
import { PostPressedCard } from '../post';

export default function FeaturedPosts() {
  return (
    <AnimatedContainer variants={staggerHalf} className="mt-10">
      <AnimatedContainer variants={fadeIn}>
        <SubTitle className="mb-6 text-tertiary">Featured Posts</SubTitle>
      </AnimatedContainer>
      <AnimatedContainer
        variants={fadeIn}
        className="grid gap-6 md:grid-cols-4"
      >
        {allFeaturedPosts.map((post) => (
          <PostPressedCard
            key={post.title}
            href={post.href}
            imgUrl={post.imgUrl}
            title={post.title}
            date={post.date}
            isDraft={post.isDraft}
          />
        ))}
      </AnimatedContainer>
      <AnimatedContainer variants={fadeIn}>
        <LinkArrow href="/blog" className="mt-8">
          모든 글 보기
        </LinkArrow>
      </AnimatedContainer>
    </AnimatedContainer>
  );
}
