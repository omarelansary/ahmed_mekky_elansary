"use client";

import ResearchFilters from "@/components/ResearchFilters";
import ResearchCard from "@/components/ResearchCard";
import type { Research } from "@/types";

export default function ResearchBrowser({ items, locale }: { items: Research[]; locale: "ar" | "en" }) {
  return (
    <ResearchFilters items={items} locale={locale}>
      {(filtered) => (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <ResearchCard key={r.slug} item={r} locale={locale} />
          ))}
        </div>
      )}
    </ResearchFilters>
  );
}

