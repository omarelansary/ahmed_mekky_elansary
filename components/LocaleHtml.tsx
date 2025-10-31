"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getHtmlAttrs, getLocaleFromPath } from "@/lib/i18n";

export default function LocaleHtml() {
  const pathname = usePathname() || "/";
  useEffect(() => {
    const locale = getLocaleFromPath(pathname);
    const { lang, dir } = getHtmlAttrs(locale);
    const root = document.documentElement;
    if (root.getAttribute("lang") !== lang) root.setAttribute("lang", lang);
    if (root.getAttribute("dir") !== dir) root.setAttribute("dir", dir);
  }, [pathname]);
  return null;
}

