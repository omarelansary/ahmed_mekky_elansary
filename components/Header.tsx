"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPath, navItems, siteTitle } from "@/lib/i18n";
import { useState, useMemo } from "react";
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default function Header() {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);
  const items = useMemo(() => navItems(locale), [locale]);
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 dark:border-white/10 bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-5xl [padding-inline:1rem] md:[padding-inline:2rem]">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href={locale === "en" ? "/en" : "/"}
              className="font-semibold tracking-tight text-lg truncate"
            >
              {siteTitle(locale)}
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <nav className="hidden md:block">
              <ul className="flex items-center gap-6">
                {items.map((i) => (
                  <li key={i.key}>
                    <Link
                      className="hover:underline underline-offset-4"
                      href={i.href}
                      prefetch={false}
                    >
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <LocaleSwitcher />
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded border border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10"
            >
              <span className="sr-only">Menu</span>
              {/* Simple hamburger icon (direction-agnostic) */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        {open && (
          <nav id="mobile-nav" className="md:hidden pb-4">
            <ul className="flex flex-col gap-2">
              {items.map((i) => (
                <li key={i.key}>
                  <Link
                    className="block rounded [padding-inline:0.75rem] py-2 hover:bg-black/5 dark:hover:bg-white/10"
                    href={i.href}
                    prefetch={false}
                    onClick={() => setOpen(false)}
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

