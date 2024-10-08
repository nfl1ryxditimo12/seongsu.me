import { DefaultSeoProps } from 'next-seo';
import path from 'path';

export const BASE_PATH = '/posts';
export const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

export const siteConfig = {
  url: 'https://seongsu.me',
  title: 'seongsu.me',
  description: '',
  copyright: 'seongsu © All rights reserved.',
  since: 2021,
  googleAnalyticsId: 'G-MHYY2H7B9N',
  author: {
    name: 'Seongsu Kim',
    photo: '/images/profile.jpg',
    bio: 'Backend Developer',
    contacts: {
      email: 'holy@seongsu.me',
      github: 'nfl1ryxditimo12',
    },
  },
  menus: [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'Post',
      path: '/post',
    },
    {
      label: 'Snippet',
      path: '/snippet',
    },
  ],
};

export const seoConfig: DefaultSeoProps = {
  title: siteConfig.title,
  description: siteConfig.description,
  canonical: siteConfig.url,
  openGraph: {
    type: 'website',
    locale: 'ko-KR',
    url: siteConfig.url,
    siteName: siteConfig.title,
  },
  additionalMetaTags: [
    {
      name: 'author',
      content: siteConfig.author.name,
    },
  ],
};
