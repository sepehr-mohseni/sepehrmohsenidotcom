import type { SiteConfig } from "./types";
import { profile } from "@/data/profile";

export const siteConfig: SiteConfig = {
  name: profile.name,
  title: {
    en: `${profile.name.en} - ${profile.title.en}`,
    fa: `${profile.name.fa} - ${profile.title.fa}`,
  },
  description: profile.bio,
  url: process.env.NEXT_PUBLIC_SITE_URL || `https://${profile.website}`,
  author: {
    name: profile.name,
    email: profile.email,
    github: profile.github,
    linkedin: profile.linkedin,
  },
  defaultLocale: "en",
  locales: ["en", "fa"] as const,
};

export function getDirection(locale: string): "ltr" | "rtl" {
  return locale === "fa" ? "rtl" : "ltr";
}

export function isValidLocale(locale: string): locale is "en" | "fa" {
  return siteConfig.locales.includes(locale as "en" | "fa");
}
