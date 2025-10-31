"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPath, localizePath, toggleLocale } from "@/lib/i18n";

export default function LocaleSwitcher() {
  const pathname = usePathname() || "/";
  const current = getLocaleFromPath(pathname);
  const target = toggleLocale(current);
  const href = localizePath(pathname, target);

  return (
    <Link
      href={href}
      prefetch={false}
      aria-label={current === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
      className="inline-flex items-center rounded border border-black/10 dark:border-white/20 px-3 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/10"
    >
      {current === "en" ? "العربية" : "English"}
    </Link>
  );
}

