import { Post, ReducedPost, ReducedSeries, Series } from '@/types/post';

export const reducePost = ({
  body: _,
  _raw,
  _id,
  ...post
}: Post): ReducedPost => post;

export const reduceSeries = (series: Series): ReducedSeries => ({
  slug: series.slug,
  title: series.title,
});
