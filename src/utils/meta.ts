export interface OgMeta {
  ogImage: string;
  width: number;
  height: number;
  type: string;
}

const BASE_META = { width: 1200, height: 630, type: 'image/png' } as const;

export function getOgMeta(pathname: string): OgMeta {
  const path = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;

  if (path.startsWith('/archive/')) {
    const segments = path.split('/').filter(Boolean);
    if (segments.length === 2) {
      return { ogImage: `og/posts/${segments[1]}.png`, ...BASE_META };
    }
    if (segments[1] === 'tag' && segments[2]) {
      return { ogImage: `og/tags/${segments[2]}.png`, ...BASE_META };
    }
    if (segments[1] === 'category' && segments[2]) {
      return { ogImage: `og/categories/${segments[2]}.png`, ...BASE_META };
    }
  }

  if (path === '/archive') {
    return { ogImage: 'og/archive.png', ...BASE_META };
  }

  const PAGE_IMAGES: Record<string, string> = {
    '/': 'home',
    '/friends': 'friends',
  };

  const name = PAGE_IMAGES[path] ?? 'home';
  return { ogImage: `og/${name}.png`, ...BASE_META };
}
