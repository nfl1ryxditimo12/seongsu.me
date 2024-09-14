import { mkdirSync, writeFileSync } from 'fs';

import PostJson from '../.contentlayer/generated/Post/_index.json';
import { siteConfig } from '../src/constants/config';

const createSiteMap = () => {
  const siteUrl = siteConfig.url;
  const allSeriesName = [
    ...new Set(
      PostJson.filter((post) =>
        post._raw.sourceFilePath.includes('series'),
      ).map((post) => {
        const seriesName = post._raw.sourceFilePath.split('/')[1];
        return `<url><loc>${siteUrl}/series/${seriesName}</loc><changefreq>daily</changefreq></url>`;
      }),
    ),
  ].join('\n');
  const allPost = PostJson.filter(
    (post) => post._raw.sourceFileName !== 'index.mdx',
  )
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(
      (post) =>
        `<url><loc>${siteUrl}${post.slug}</loc><changefreq>daily</changefreq></url>`,
    )
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
<url><loc>${siteUrl}</loc><changefreq>daily</changefreq></url>
${siteConfig.menus
  .map(
    ({ path }) =>
      `<url><loc>${siteUrl}${path}</loc><changefreq>daily</changefreq></url>`,
  )
  .join('\n')}
${allSeriesName}
${allPost}
</urlset>`;

  mkdirSync('out', { recursive: true });
  writeFileSync('out/sitemap.xml', sitemap, 'utf-8');
};

const createRobotsTxt = () => {
  const siteUrl = siteConfig.url;

  const text = `
User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
Host: ${siteUrl}
  `;

  mkdirSync('out', { recursive: true });
  writeFileSync('out/robots.txt', text.trim(), 'utf-8');
};

(() => {
  createSiteMap();
  createRobotsTxt();
})();
