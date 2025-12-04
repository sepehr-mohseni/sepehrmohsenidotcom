import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { getAllPosts } from "@/lib/mdx";
import type { Locale } from "@/lib/types";


export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const locales: Locale[] = ["en", "fa"];

  const staticPages = ["", "/blog"];

  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en${page}`,
          fa: `${baseUrl}/fa${page}`,
          "x-default": `${baseUrl}/en${page}`,
        },
      },
    }))
  );

  const blogEntries: MetadataRoute.Sitemap = locales.flatMap((locale) => {
    const posts = getAllPosts(locale);
    return posts.map((post) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/${post.slug}`,
          fa: `${baseUrl}/fa/blog/${post.slug}`,
          "x-default": `${baseUrl}/en/blog/${post.slug}`,
        },
      },
    }));
  });

  return [...staticEntries, ...blogEntries];
}
