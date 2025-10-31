import Link from "next/link";
import Image from "next/image";
import type { Book } from "@/types";

type Props = {
  book: Book;
  locale: "ar" | "en";
};

export default function BookCard({ book, locale }: Props) {
  const href = locale === "en" ? `/en/books/${book.slug}` : `/books/${book.slug}`;
  const title = locale === "en" ? book.title_en : book.title_ar;
  return (
    <Link href={href} className="group rounded-lg border border-black/10 dark:border-white/10 overflow-hidden block hover:shadow-sm">
      <div className="relative aspect-[3/4] bg-black/5 dark:bg-white/10">
        <Image src={book.cover} alt={title} fill sizes="(min-width: 768px) 200px, 40vw" className="object-cover" />
      </div>
      <div className="p-3">
        <h3 className="font-medium leading-tight line-clamp-2 group-hover:underline underline-offset-4">{title}</h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {book.year} • {labelType(book.type, locale)}
        </p>
      </div>
    </Link>
  );
}

function labelType(type: Book["type"], locale: "ar" | "en") {
  const map: Record<Book["type"], { ar: string; en: string }> = {
    novel: { ar: "رواية", en: "Novel" },
    poetry: { ar: "شعر", en: "Poetry" },
    essays: { ar: "مقالات", en: "Essays" },
  };
  return map[type][locale];
}

