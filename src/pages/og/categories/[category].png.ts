import type { APIRoute } from 'astro';
import satori from 'satori';
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join } from 'path';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const categories = [...new Set(posts.map(post => post.data.category))];
  
  return categories.map((category) => ({
    params: { category: category.toLowerCase().replace(/\s+/g, '-') },
    props: { category },
  }));
}

const ogImage: APIRoute = async ({ props }) => {
  const { category } = props;
  const siteHost = (() => {
    try {
      const url = new URL((import.meta as any).env?.SITE || 'https://wrye.dev');
      return url.hostname;
    } catch {
      return 'wrye.dev';
    }
  })();
  
  // Load fonts
  const interRegular = readFileSync(
    join(process.cwd(), 'src/assets/Inter.woff')
  );
  
  let notoSansSCRegular;
  try {
    notoSansSCRegular = readFileSync(
      join(process.cwd(), 'src/assets/NotoSansSC-Regular.woff')
    );
  } catch {
    notoSansSCRegular = interRegular;
  }

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px',
          fontFamily: 'Inter, Noto Sans SC, sans-serif',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                fontWeight: 500,
                fontSize: '64px',
                lineHeight: '1.2',
                letterSpacing: '-0.03em',
                color: '#000000',
                textAlign: 'center',
                maxWidth: '100%',
                wordBreak: 'break-word',
                marginBottom: '32px',
              },
              children: category,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontWeight: 400,
                fontSize: '32px',
                lineHeight: '1.35',
                letterSpacing: '-0.02em',
                color: '#20242A',
                textAlign: 'center',
                maxWidth: '800px',
                wordBreak: 'break-word',
              },
              children: `Posts in the ${category} category`,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: '80px',
                fontWeight: 400,
                fontSize: '24px',
                color: '#59606A',
              },
              children: siteHost,
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: interRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: interRegular,
          weight: 500,
          style: 'normal',
        },
        {
          name: 'Noto Sans SC',
          data: notoSansSCRegular,
          weight: 400,
          style: 'normal',
        }
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};

export const GET = ogImage;
