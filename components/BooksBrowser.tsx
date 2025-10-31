"use client";

import BookFilters from "@/components/BookFilters";
import BookCard from "@/components/BookCard";
import type { Book } from "@/types";

export default function BooksBrowser({ items, locale }: { items: Book[]; locale: "ar" | "en" }) {
  return (
    <BookFilters items={items} locale={locale}>
      {(filtered) => (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b) => (
            <BookCard key={b.slug} book={b} locale={locale} />
          ))}
        </div>
      )}
    </BookFilters>
  );
}

