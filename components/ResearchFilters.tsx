"use client";

import { useMemo, useState } from "react";
import type { Research } from "@/types";
import TagPills from "@/components/TagPills";

type Props = {
  items: Research[];
  locale: "ar" | "en";
  children: (filtered: Research[]) => React.ReactNode;
};

export default function ResearchFilters({ items, locale, children }: Props) {
  const [tag, setTag] = useState<string | null>(null);
  const [year, setYear] = useState<string>("all");

  const years = useMemo(() => Array.from(new Set(items.map((i) => i.year))).sort(), [items]);
  const tags = useMemo(() => Array.from(new Set(items.flatMap((i) => i.tags))).sort(), [items]);

  const tagLabel = locale === "en" ? "Filter by tag" : "تصفية بالوسم";
  const yearLabel = locale === "en" ? "Year" : "السنة";

  const filtered = useMemo(() => {
    return items.filter((r) => {
      if (tag && !r.tags.includes(tag)) return false;
      if (year !== "all" && String(r.year) !== year) return false;
      return true;
    });
  }, [items, tag, year]);

  return (
    <div className="mb-6 grid gap-3">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-zinc-600 dark:text-zinc-400">{tagLabel}</span>
        <TagPills tags={tags} selected={tag} onSelect={setTag} locale={locale} />
      </div>
      <label className="flex items-center gap-2">
        <span className="w-24 shrink-0 text-sm text-zinc-600 dark:text-zinc-400">{yearLabel}</span>
        <select
          className="w-full rounded border border-black/10 dark:border-white/20 bg-transparent px-3 py-2"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="all">{locale === "en" ? "All" : "الكل"}</option>
          {years.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>
      </label>
      <div>{children(filtered)}</div>
    </div>
  );
}

