import { Post as TPost } from 'contentlayer/generated';

export type PostMetadata = {
  sourcePath: string;
  date: Date;
};

export type SlugStore = Map<string, string>;

export type Optional<Type, Key extends keyof Type> = Omit<Type, Key> &
  Partial<Pick<Type, Key>>;

export type Post = TPost & {
  seriesName?: string | null;
  snippetName?: string | null;
};

export type ReducedPost = Omit<Post, 'body' | '_raw' | '_id'>;

export type ReducedSeries = Pick<Post, 'slug' | 'title'>;

export type Series = Post & {
  posts: ReducedPost[];
};

export type TableOfContents = Section[];
export type SubSection = {
  slug: string;
  text: string;
};
export type Section = SubSection & {
  subSections: SubSection[];
};

export type PostPressedCardType = {
  href: string;
  imgUrl: string;
  title: string;
  date: string;
  isDraft?: boolean;
};

export type Snippet = {
  key: string;
  postList: ReducedPost[];
};
