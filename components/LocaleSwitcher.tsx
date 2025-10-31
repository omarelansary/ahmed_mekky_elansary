"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPath, localizePath, toggleLocale } from "@/lib/i18n";

export default function LocaleSwitcher() {
  const pathname = usePathname() || "/";
  const current = getLocaleFromPath(pathname);
  const target = toggleLocale(current);
  const href = localizePath(pathname, target);

  const aria = current === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية";
  const labelText = current === "en" ? "العربية" : "English";

  return (
    <Link
      href={href}
      prefetch={false}
      aria-label={aria}
      className="inline-flex items-center rounded border border-black/10 dark:border-white/20 px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10 tap-target"
    >
      {labelText}
    </Link>
  );
}

