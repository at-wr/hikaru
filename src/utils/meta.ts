export interface OgMeta {
  ogImage: string;
  width: number;
  height: number;
  type: string;
}

export function getOgMeta(pathname: string): OgMeta {
  const width = 1200;
  const height = 630;
  const type = 'image/png';

  if (pathname.startsWith('/archive/')) {
    const segments = pathname.split('/').filter(Boolean);
    if (
      segments.length === 2 &&
      segments[0] === 'archive' &&
      segments[1] !== 'tag' &&
      segments[1] !== 'category'
    ) {
      const slug = segments[1];
      return { ogImage: `/og/posts/${slug}.png`, width, height, type };
    }

    if (segments.length === 3 && segments[0] === 'archive' && segments[1] === 'tag') {
      const tag = segments[2];
      return { ogImage: `/og/tags/${tag}.png`, width, height, type };
    }

    if (segments.length === 3 && segments[0] === 'archive' && segments[1] === 'category') {
      const category = segments[2];
      return { ogImage: `/og/categories/${category}.png`, width, height, type };
    }
  }

  if (pathname === '/archive') {
    return { ogImage: `/og/archive.png`, width, height, type };
  }

  let ogImage = '/og/home.png';
  if (pathname === '/friends') {
    ogImage = '/og/friends.png';
  }

  return { ogImage, width, height, type };
}
