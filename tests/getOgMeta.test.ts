import assert from 'node:assert';
import { getOgMeta } from '../src/utils/meta';

const cases = [
  { path: '/', expected: '/og/home.png' },
  { path: '/friends', expected: '/og/friends.png' },
  { path: '/archive', expected: '/og/archive.png' },
  { path: '/archive/my-post', expected: '/og/posts/my-post.png' },
  { path: '/archive/tag/foo', expected: '/og/tags/foo.png' },
  { path: '/archive/category/bar', expected: '/og/categories/bar.png' },
];

for (const { path, expected } of cases) {
  const meta = getOgMeta(path);
  assert.strictEqual(meta.ogImage, expected, `unexpected mapping for ${path}`);
}

console.log('getOgMeta tests passed');
