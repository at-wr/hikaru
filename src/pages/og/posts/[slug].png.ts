import type { APIRoute } from 'astro';
import satori from 'satori';
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join } from 'path';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.map(post => ({
    params: { slug: post.slug },
    props: post,
  }));
}

const ogImage: APIRoute = async ({ props }) => {
  const post = props;
  
  // Load Inter font files
  const interRegular = readFileSync(
    join(process.cwd(), 'src/assets/Inter.woff')
  );
  
  // Load proper Chinese font weights
  let notoSansSCRegular;
  try {
    notoSansSCRegular = readFileSync(
      join(process.cwd(), 'src/assets/NotoSansSC-Regular.woff')
    );
  } catch {
    notoSansSCRegular = interRegular;
  }

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  const title = truncateText(post.data.title, 60);
  const description = truncateText(post.data.description || post.body?.slice(0, 300) || '', 200);

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
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'Inter, Noto Sans SC, sans-serif',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                maxWidth: '100%',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontWeight: 300,
                      fontSize: '24px',
                      lineHeight: '29px',
                      letterSpacing: '-0.055em',
                      color: '#59606A',
                      fontFamily: 'Inter',
                    },
                    children: new Date(post.data.published).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }),
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontWeight: 500,
                      fontSize: '64px',
                      lineHeight: '1.2',
                      letterSpacing: '-0.03em',
                      color: '#000000',
                      maxWidth: '100%',
                      wordBreak: 'break-word',
                      fontFamily: 'Inter, Noto Sans SC, sans-serif',
                    },
                    children: title,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontWeight: 400,
                      fontSize: '26px',
                      lineHeight: '1.35',
                      letterSpacing: '-0.02em',
                      color: '#20242A',
                      maxWidth: '100%',
                      wordBreak: 'break-word',
                      fontFamily: 'Inter, Noto Sans SC, sans-serif',
                    },
                    children: description,
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontWeight: 400,
                fontSize: '24px',
                color: '#59606A',
                marginTop: 'auto',
              },
              children: 'wrye.dev',
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

  // Convert SVG to PNG using sharp
  const png = await sharp(Buffer.from(svg))
    .png()
    .toBuffer();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};

export const GET = ogImage;