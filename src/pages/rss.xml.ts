import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const site = context.site?.href ?? 'https://wrye.dev';

  return rss({
    title: 'Alan Ye',
    description: 'Place where I write, record, and share my thoughts.',
    site,
    items: posts
      .sort((a, b) => new Date(b.data.published).getTime() - new Date(a.data.published).getTime())
      .map((post) => ({
        link: `/archive/${post.slug}`,
        title: post.data.title,
        pubDate: post.data.published,
        description: post.data.description,
        categories: post.data.category ? [post.data.category] : [],
      })),
  });
}
