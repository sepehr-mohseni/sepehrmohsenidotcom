
export type Locale = "en" | "fa";

export type Direction = "ltr" | "rtl";

export interface Project {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  tags: string[];
  image?: string;
  link?: string;
  github?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  company: Record<Locale, string>;
  role: Record<Locale, string>;
  description: Record<Locale, string>;
  startDate: string;
  endDate?: string;
  current: boolean;
  location?: string;
  technologies: string[];
}

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  hero?: string;
  draft: boolean;
}

export interface Post extends PostFrontmatter {
  slug: string;
  locale: Locale;
  content: string;
  readingTime: string;
}

export interface NavItem {
  key: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface SiteConfig {
  name: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  url: string;
  author: {
    name: Record<Locale, string>;
    email: string;
    twitter?: string;
    github: string;
    linkedin: string;
  };
  defaultLocale: Locale;
  locales: readonly Locale[];
}
