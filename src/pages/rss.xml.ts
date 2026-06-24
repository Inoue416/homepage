import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { byNewest, isPublished } from '@/lib/content';
import { site } from '@/site.config';

export async function GET(context: { site: URL }) {
  const blog = (await getCollection('blog')).filter(isPublished).sort(byNewest);

  return rss({
    title: site.title,
    description: site.description,
    site: context.site,
    items: blog.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.pubDate,
      link: `/blog/${entry.id}/`,
    })),
  });
}
