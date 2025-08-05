import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;
  
  // Handle category case normalization
  if (pathname.startsWith('/archive/category/')) {
    const categoryPath = pathname.replace('/archive/category/', '');
    const normalizedCategory = categoryPath.toLowerCase();
    
    if (categoryPath !== normalizedCategory) {
      return new Response(null, {
        status: 301,
        headers: {
          Location: `/archive/category/${normalizedCategory}`
        }
      });
    }
  }
  
  // Handle tag case and space normalization
  if (pathname.startsWith('/archive/tag/')) {
    const tagPath = pathname.replace('/archive/tag/', '');
    const normalizedTag = decodeURIComponent(tagPath)
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/_/g, '-');
    
    if (tagPath !== normalizedTag) {
      return new Response(null, {
        status: 301,
        headers: {
          Location: `/archive/tag/${normalizedTag}`
        }
      });
    }
  }
  
  return next();
});