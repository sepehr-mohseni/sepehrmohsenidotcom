import type { Locale } from "./types";
import { siteConfig } from "./siteConfig";

import en from "@/locales/en.json";
import fa from "@/locales/fa.json";

type TranslationKeys = Record<string, unknown>;

const translations: Record<Locale, TranslationKeys> = {
  en,
  fa,
};

function getNestedValue(obj: unknown, path: string): string {
  const keys = path.split(".");
  let result: unknown = obj;

  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }

  return typeof result === "string" ? result : path;
}

export function t(locale: Locale, key: string): string {
  const translation = translations[locale];
  return getNestedValue(translation, key);
}

export function createTranslator(locale: Locale) {
  return (key: string) => t(locale, key);
}

export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale];
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "fa" ? "rtl" : "ltr";
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "en" ? "fa" : "en";
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && siteConfig.locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }

  return siteConfig.defaultLocale;
}

export function localizedPath(locale: Locale, path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${cleanPath === "/" ? "" : cleanPath}`;
}

export function getAlternateUrls(path: string): Record<Locale, string> {
  const baseUrl = siteConfig.url;
  return {
    en: `${baseUrl}/en${path === "/" ? "" : path}`,
    fa: `${baseUrl}/fa${path === "/" ? "" : path}`,
  };
}
