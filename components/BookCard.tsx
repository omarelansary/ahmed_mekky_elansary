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
    <Link href={href} className="block rounded-2xl bg-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-out p-5 border border-black/5">
      <div className="relative w-full h-60">
        <Image src={book.cover} alt={title} fill sizes="(min-width: 768px) 300px, 90vw" className="object-cover rounded-lg mb-4" />
      </div>
      <h3 className="text-xl font-semibold mb-2 ui">{title}</h3>
      <p className="text-gray-700 text-sm">{book.year} • {labelType(book.type, locale)}</p>
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
