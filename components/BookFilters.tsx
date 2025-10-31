"use client";

import { useMemo, useState } from "react";
import type { Book } from "@/types";
import { getT } from "@/locales";

type Props = {
  items: Book[];
  locale: "ar" | "en";
  children: (filtered: Book[]) => React.ReactNode;
};

export default function BookFilters({ items, locale, children }: Props) {
  const [type, setType] = useState<string>("all");
  const [decade, setDecade] = useState<string>("all");
  const [q, setQ] = useState<string>("");

  const t = getT(locale);
  const typeLabel = t.books.type;
  const decadeLabel = t.books.decade;
  const searchLabel = t.books.searchTitle;

  const types = useMemo(() => Array.from(new Set(items.map((i) => i.type))), [items]);
  const decades = useMemo(() => {
    const d = new Set(items.map((i) => `${Math.floor(i.year / 10) * 10}s`).sort());
    return Array.from(d);
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((b) => {
      if (type !== "all" && b.type !== type) return false;
      if (decade !== "all") {
        const d = `${Math.floor(b.year / 10) * 10}s`;
        if (d !== decade) return false;
      }
      if (q.trim()) {
        const title = `${b.title_ar} ${b.title_en}`.toLowerCase();
        if (!title.includes(q.trim().toLowerCase())) return false;
      }
      return true;
    });
  }, [items, type, decade, q]);

  return (
    <div className="mb-6 grid gap-3 md:grid-cols-3">
      <label className="flex items-center gap-2">
        <span className="w-24 shrink-0 text-sm text-zinc-600 dark:text-zinc-400">{typeLabel}</span>
        <select
          className="w-full rounded border border-black/10 dark:border-white/20 bg-transparent px-3 py-2 tap-target"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="all">{t.common.all}</option>
          {types.map((tval) => (
            <option key={tval} value={tval}>
              {labelType(tval as Book["type"], locale)}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2">
        <span className="w-24 shrink-0 text-sm text-zinc-600 dark:text-zinc-400">{decadeLabel}</span>
        <select
          className="w-full rounded border border-black/10 dark:border-white/20 bg-transparent px-3 py-2 tap-target"
          value={decade}
          onChange={(e) => setDecade(e.target.value)}
        >
          <option value="all">{t.common.all}</option>
          {decades.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2">
        <span className="w-24 shrink-0 text-sm text-zinc-600 dark:text-zinc-400">{searchLabel}</span>
        <input
          type="search"
          className="w-full rounded border border-black/10 dark:border-white/20 bg-transparent px-3 py-2 tap-target"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.books.searchTitle}
          aria-label={t.books.searchTitle}
        />
      </label>

      <div className="md:col-span-3">{children(filtered)}</div>
    </div>
  );
}

function labelType(type: Book["type"], locale: "ar" | "en") {
  const t = getT(locale);
  return t.books.types[type];
}

