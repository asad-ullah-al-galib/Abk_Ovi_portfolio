import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';

const postsDirectory = path.join(process.cwd(), 'assets/_posts');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  timestamp: number;
  description: string;
  tags: string[];
  categories: string[];
  thumbnail?: string;
  content: string;
  emoji?: string;
}

export async function getSortedPostsData(): Promise<BlogPost[]> {
  // Get file names under /assets/_posts
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(async (fileName) => {
      // Jekyll format: YYYY-MM-DD-title.md
      // Extract the date and the title-slug
      const match = fileName.match(/^(\d{4}-\d{2}-\d{2})-(.*)\.md$/);
      const slug = match ? match[2] : fileName.replace(/\.md$/, '');
      const dateFromFilename = match ? match[1] : null;

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Extract date from filename if not in front matter
      let dateStr = matterResult.data.date;
      if (dateStr instanceof Date) {
        dateStr = dateStr.toISOString();
      } else if (!dateStr) {
        const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})/);
        dateStr = dateMatch ? dateMatch[1] : new Date().toISOString();
      }

      // Ensure tags and categories are arrays
      const tags = Array.isArray(matterResult.data.tags) 
        ? matterResult.data.tags 
        : (matterResult.data.tags ? [matterResult.data.tags] : []);
      
      const categories = Array.isArray(matterResult.data.categories)
        ? matterResult.data.categories
        : (matterResult.data.categories ? [matterResult.data.categories] : []);

      // Try to find an emoji in the title
      const emojiMatch = matterResult.data.title?.match(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u);
      const emoji = emojiMatch ? emojiMatch[0] : '📝';

      return {
        slug,
        title: matterResult.data.title || slug,
        date: dateStr,
        timestamp: new Date(dateStr).getTime(),
        description: matterResult.data.description || '',
        tags,
        categories,
        thumbnail: matterResult.data.thumbnail || null,
        emoji,
        content: matterResult.content,
      };
    }));

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.timestamp < b.timestamp) {
      return 1;
    } else {
      return -1;
    }
  });
}

function processLiquidTags(content: string): string {
  // Replace {% include figure.liquid ... path="assets/img/..." ... %}
  // with <img src="/assets/img/..." />
  content = content.replace(/{%\s*include figure\.liquid.*?path="([^"]+)".*?%}/g, (match, path) => {
    const src = path.startsWith('/') ? path : `/${path}`;
    return `<img src="${src}" class="rounded-xl shadow-lg my-8 mx-auto w-full max-w-2xl" />`;
  });

  // Replace {% include video.liquid path="..." %}
  // with <iframe src="..." ...></iframe>
  content = content.replace(/{%\s*include video\.liquid.*?path="([^"]+)".*?%}/g, (match, path) => {
    return `<div class="aspect-video my-8"><iframe src="${path}" class="w-full h-full rounded-xl shadow-lg" allowfullscreen></iframe></div>`;
  });

  return content;
}

export async function getPostData(slug: string): Promise<BlogPost | null> {
  if (!fs.existsSync(postsDirectory)) return null;

  const fileNames = fs.readdirSync(postsDirectory);
  const fileName = fileNames.find(name => name.endsWith(`-${slug}.md`) || name === `${slug}.md`);
  
  if (!fileName) {
    return null;
  }

  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  
  // Pre-process Liquid tags
  const processedMarkdown = processLiquidTags(matterResult.content);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(processedMarkdown);
  
  const contentHtml = processedContent.toString();

  let dateStr = matterResult.data.date;
  if (dateStr instanceof Date) {
    dateStr = dateStr.toISOString();
  } else if (!dateStr) {
    const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})/);
    dateStr = dateMatch ? dateMatch[1] : new Date().toISOString();
  }

  // Try to find an emoji in the title
  const emojiMatch = matterResult.data.title?.match(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u);
  const emoji = emojiMatch ? emojiMatch[0] : '📝';

  return {
    slug,
    title: matterResult.data.title || slug,
    date: dateStr,
    timestamp: new Date(dateStr).getTime(),
    description: matterResult.data.description || '',
    tags: Array.isArray(matterResult.data.tags) ? matterResult.data.tags : [],
    categories: Array.isArray(matterResult.data.categories) ? matterResult.data.categories : [],
    thumbnail: matterResult.data.thumbnail || null,
    content: contentHtml,
    emoji,
  };
}
