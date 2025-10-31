"use client";

import { usePathname } from "next/navigation";
import { getLocaleFromPath } from "@/lib/i18n";
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default function Footer() {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);
  const year = new Date().getFullYear();
  const copyright =
    locale === "en" ? `© ${year} Writer Memorial` : `© ${year} إرث الكاتب`;
  const contactLabel = locale === "en" ? "Contact" : "تواصل";

  return (
    <footer className="mt-16 bg-[#1f1d1b] text-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 py-8 grid gap-4 md:flex md:items-center md:justify-between">
        <span className="opacity-90">{copyright}</span>
        <div className="flex items-center gap-4">
          <a className="hover:underline underline-offset-4 text-[color:var(--accent)]" href="mailto:contact@example.com">
            {contactLabel}
          </a>
          <div className="hidden md:block">|</div>
          <div>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
