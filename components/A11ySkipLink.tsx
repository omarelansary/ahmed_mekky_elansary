"use client";

import { usePathname } from "next/navigation";
import { getLocaleFromPath } from "@/lib/i18n";
import { getT } from "@/locales";

export default function A11ySkipLink() {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);
  const t = getT(locale);
  const label = locale === "en" ? "Skip to content" : "تخطّي إلى المحتوى";
  return (
    <a href="#main-content" className="skip-link">
      {label}
    </a>
  );
}
