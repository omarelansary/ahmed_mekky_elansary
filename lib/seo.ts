import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";

function baseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  // Dev fallback
  return "http://localhost:3000";
}

function absolute(path: string): string {
  const root = baseUrl();
  return path.startsWith("http") ? path : `${root}${path.startsWith("/") ? "" : "/"}${path}`;
}

function localePath(path: string, locale: Locale): string {
  if (locale === "en") {
    if (path === "/") return "/en";
    return path.startsWith("/en") ? path : `/en${path}`;
  }
  // ar
  return path.startsWith("/en") ? path.replace(/^\/en(\/|$)/, "/") || "/" : path || "/";
}

export function personJsonLd(locale: Locale) {
  const name = locale === "en" ? "Ahmed Elansary" : "أحمد الأنصاري";
  const description =
    locale === "en"
      ? "Egyptian writer and researcher whose work explores identity, memory, and exile."
      : "كاتب وباحث مصري يستكشف في أعماله قضايا الهوية والذاكرة والمنفى.";
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    description,
    birthDate: "1928-01-01",
    deathDate: "2015-01-01",
    image: absolute("/media/portrait.jpg"),
  };
}

function commonAlternates(path: string): Metadata["alternates"] {
  const ar = absolute(localePath(path, "ar"));
  const en = absolute(localePath(path, "en"));
  return {
    canonical: ar, // Will be overwritten by page-specific per-locale call
    languages: {
      ar,
      en,
    },
  };
}

export function homeMetadata(locale: Locale): Metadata {
  const title = locale === "en" ? "Writer Memorial" : "إرث الكاتب";
  const description =
    locale === "en"
      ? "A memorial site celebrating the works and life of the writer."
      : "موقع تذكاري يحتفي بحياة الكاتب وأعماله.";
  const path = localePath("/", locale);
  const url = absolute(path);
  return {
    title,
    description,
    alternates: { ...commonAlternates("/"), canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [{ url: absolute("/media/portrait.jpg"), alt: title }],
      locale: locale === "en" ? "en" : "ar",
    },
  };
}

export function biographyMetadata(locale: Locale): Metadata {
  const title = locale === "en" ? "Biography • Writer Memorial" : "السيرة • إرث الكاتب";
  const description =
    locale === "en"
      ? "Biography of the writer, early life and key milestones."
      : "سيرة الكاتب: البدايات والمحطات الرئيسية.";
  const path = localePath("/biography", locale);
  const url = absolute(path);
  return {
    title,
    description,
    alternates: { ...commonAlternates("/biography"), canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [{ url: absolute("/media/portrait.jpg"), alt: title }],
      locale: locale === "en" ? "en" : "ar",
    },
  };
}

