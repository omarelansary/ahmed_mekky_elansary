export type Locale = "ar" | "en";

export const defaultLocale: Locale = "ar";
export const supportedLocales: Locale[] = ["ar", "en"];

export function isSupportedLocale(value: string | undefined | null): value is Locale {
  return value === "ar" || value === "en";
}

export function getLocaleFromPath(pathname: string): Locale {
  // Expect paths like "/", "/en", "/en/...", "/ar" (alias of default)
  const seg = pathname.split("/").filter(Boolean)[0];
  if (isSupportedLocale(seg)) return seg;
  return defaultLocale;
}

export function getHtmlAttrs(locale: Locale): { lang: string; dir: "rtl" | "ltr" } {
  return locale === "ar" ? { lang: "ar", dir: "rtl" } : { lang: "en", dir: "ltr" };
}

export function toggleLocale(current: Locale): Locale {
  return current === "ar" ? "en" : "ar";
}

// Normalize path to ensure no trailing slash (except root)
function normalizePath(p: string): string {
  if (!p || p === "/") return "/";
  return p.endsWith("/") ? p.slice(0, -1) : p;
}

// Map current pathname to a target locale by adding or removing the `/en` segment.
export function localizePath(pathname: string, target: Locale): string {
  const path = normalizePath(pathname);
  const isEn = path === "/en" || path.startsWith("/en/");
  if (target === "en") {
    if (isEn) return path; // already English
    return path === "/" ? "/en" : `/en${path}`;
  }
  // target ar
  if (isEn) {
    const stripped = path.replace(/^\/en(\/|$)/, "/");
    return stripped === "" ? "/" : stripped;
  }
  return path; // already Arabic
}

// App routes use the same path segments in both locales; only `/en` prefix differs.
export function navItems(locale: Locale): { href: string; label: string; key: string }[] {
  const base = locale === "en" ? "/en" : "";
  const t = (en: string, ar: string) => (locale === "en" ? en : ar);
  return [
    { key: "home", href: base || "/", label: t("Home", "الرئيسية") },
    { key: "biography", href: `${base}/biography`, label: t("Biography", "السيرة") },
    { key: "books", href: `${base}/books`, label: t("Books", "الكتب") },
    { key: "research", href: `${base}/research`, label: t("Research", "الأبحاث") },
  ];
}

export function siteTitle(locale: Locale): string {
  return locale === "en" ? "Writer Memorial" : "إرث الكاتب";
}

