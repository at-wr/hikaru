export function getOgImage(path: string, site: URL | string): string {
    const base = typeof site === 'string' ? site : site.href;
    const segments = path.split('/').filter(Boolean);

    if (path === '/archive') {
        return `${base}og/archive.png`;
    }

    if (path === '/friends') {
        return `${base}og/friends.png`;
    }

    if (path.startsWith('/archive/')) {
        if (
            segments.length === 2 &&
            segments[0] === 'archive' &&
            segments[1] !== 'tag' &&
            segments[1] !== 'category'
        ) {
            return `${base}og/posts/${segments[1]}.png`;
        }
        if (segments.length === 3 && segments[1] === 'tag') {
            return `${base}og/tags/${segments[2]}.png`;
        }
        if (segments.length === 3 && segments[1] === 'category') {
            return `${base}og/categories/${segments[2]}.png`;
        }
    }

    return `${base}og/home.png`;
}
