"use client";

import { usePathname } from "next/navigation";
import { getLocaleFromPath } from "@/lib/i18n";

export default function Footer() {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);
  const year = new Date().getFullYear();
  const copyright =
    locale === "en" ? `© ${year} Writer Memorial` : `© ${year} إرث الكاتب`;
  const contactLabel = locale === "en" ? "Contact" : "تواصل";

  return (
    <footer className="mt-12 border-t border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-5xl [padding-inline:1rem] md:[padding-inline:2rem] py-6 text-sm text-zinc-700 dark:text-zinc-300 flex items-center justify-between flex-wrap gap-3">
        <span>{copyright}</span>
        <a className="hover:underline underline-offset-4" href="mailto:contact@example.com">
          {contactLabel}
        </a>
      </div>
    </footer>
  );
}

