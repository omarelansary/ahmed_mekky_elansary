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

