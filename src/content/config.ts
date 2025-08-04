import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    published: z.date(),
    draft: z.boolean().default(false),
    category: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
    language: z.string().default('en'),
  }),
});

export const collections = { posts };
