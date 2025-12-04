import type { Metadata } from "next";
import type { Locale, Post } from "./types";
import { siteConfig } from "./siteConfig";
import { getAlternateUrls } from "./i18n";

interface SEOParams {
  locale: Locale;
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
}

export function generateSEO({
  locale,
  title,
  description,
  path = "/",
  image,
  type = "website",
  publishedTime,
  tags,
}: SEOParams): Metadata {
  const siteTitle = siteConfig.title[locale];
  const siteDescription = siteConfig.description[locale];
  const pageTitle = title ? `${title} | ${siteConfig.name[locale]}` : siteTitle;
  const pageDescription = description || siteDescription;
  const canonicalUrl = `${siteConfig.url}/${locale}${path === "/" ? "" : path}`;
  const alternates = getAlternateUrls(path);
  const ogImage = image || `${siteConfig.url}/og-image.png`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: tags,
    authors: [{ name: siteConfig.author.name[locale] }],
    creator: siteConfig.author.name[locale],
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: alternates.en,
        fa: alternates.fa,
        "x-default": alternates.en,
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: siteConfig.name[locale],
      locale: locale === "fa" ? "fa_IR" : "en_US",
      alternateLocale: locale === "fa" ? "en_US" : "fa_IR",
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      ...(type === "article" && publishedTime
        ? {
            publishedTime,
            authors: [siteConfig.author.name[locale]],
            tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generatePersonJsonLd(locale: Locale): string {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name[locale],
    url: siteConfig.url,
    jobTitle: locale === "fa" ? "توسعه‌دهنده فول‌استک" : "Tech Lead | Senior Software Engineer",
    sameAs: [
      `https://github.com/${siteConfig.author.github}`,
      `https://linkedin.com/in/${siteConfig.author.linkedin}`,
    ],
    email: `mailto:${siteConfig.author.email}`,
  };

  return JSON.stringify(jsonLd);
}


export function generateArticleJsonLd(post: Post, locale: Locale): string {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: siteConfig.author.name[locale],
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name[locale],
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/${locale}/blog/${post.slug}`,
    },
    ...(post.hero ? { image: `${siteConfig.url}${post.hero}` } : {}),
  };

  return JSON.stringify(jsonLd);
}
