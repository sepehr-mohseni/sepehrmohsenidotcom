import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Locale, Post, PostFrontmatter } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export function getPostSlugs(locale: Locale): string[] {
  const localeDir = path.join(CONTENT_DIR, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  return fs
    .readdirSync(localeDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}


export function getPostBySlug(slug: string, locale: Locale): Post | null {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const frontmatter = data as PostFrontmatter;

  if (frontmatter.draft && process.env.NODE_ENV === "production") {
    return null;
  }

  const stats = readingTime(content);

  return {
    ...frontmatter,
    slug,
    locale,
    content,
    readingTime: stats.text,
  };
}


export function getAllPosts(locale: Locale): Post[] {
  const slugs = getPostSlugs(locale);

  const posts = slugs
    .map((slug) => getPostBySlug(slug, locale))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}


export function getPostWithFallback(
  slug: string,
  locale: Locale
): { post: Post | null; isFallback: boolean } {
  const post = getPostBySlug(slug, locale);

  if (post) {
    return { post, isFallback: false };
  }

  const fallbackLocale: Locale = locale === "en" ? "fa" : "en";
  const fallbackPost = getPostBySlug(slug, fallbackLocale);

  return { post: fallbackPost, isFallback: fallbackPost !== null };
}

export function getAllTags(locale: Locale): string[] {
  const posts = getAllPosts(locale);
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

export function getPostsByTag(locale: Locale, tag: string): Post[] {
  return getAllPosts(locale).filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}


export function getFeaturedPosts(locale: Locale, count = 3): Post[] {
  return getAllPosts(locale).slice(0, count);
}


export function getPaginatedPosts(
  locale: Locale,
  page: number,
  perPage = 9
): { posts: Post[]; totalPages: number; currentPage: number } {
  const allPosts = getAllPosts(locale);
  const totalPages = Math.ceil(allPosts.length / perPage);
  const start = (page - 1) * perPage;
  const posts = allPosts.slice(start, start + perPage);

  return {
    posts,
    totalPages,
    currentPage: page,
  };
}


export function searchPosts(locale: Locale, query: string): Post[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    return [];
  }

  return getAllPosts(locale).filter(
    (post) =>
      post.title.toLowerCase().includes(normalizedQuery) ||
      post.description.toLowerCase().includes(normalizedQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
  );
}


export function getAdjacentPosts(
  slug: string,
  locale: Locale
): { prev: Post | null; next: Post | null } {
  const posts = getAllPosts(locale);
  const currentIndex = posts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] ?? null : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] ?? null : null,
  };
}


export function getPostsByYear(locale: Locale): Record<string, Post[]> {
  const posts = getAllPosts(locale);
  const grouped: Record<string, Post[]> = {};

  posts.forEach((post) => {
    const year = new Date(post.date).getFullYear().toString();
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(post);
  });

  return grouped;
}

export function generateBlogStaticParams(): { locale: Locale; slug: string }[] {
  const locales: Locale[] = ["en", "fa"];
  const params: { locale: Locale; slug: string }[] = [];

  locales.forEach((locale) => {
    const slugs = getPostSlugs(locale);
    slugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });

  return params;
}

export function getBlogStats(locale: Locale): {
  totalPosts: number;
  totalTags: number;
  totalReadingTime: number;
} {
  const posts = getAllPosts(locale);
  const tags = getAllTags(locale);
  
  const totalReadingTime = posts.reduce((acc, post) => {
    const minutes = parseInt(post.readingTime.split(" ")[0] || "0", 10);
    return acc + minutes;
  }, 0);

  return {
    totalPosts: posts.length,
    totalTags: tags.length,
    totalReadingTime,
  };
}
