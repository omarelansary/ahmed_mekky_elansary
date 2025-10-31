import BooksBrowser from "@/components/BooksBrowser";
import { getBooks } from "@/lib/content";
import { getT } from "@/locales";

export const dynamic = "force-static";

export default async function BooksIndexEn() {
  const books = await getBooks();
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">{getT("en").books.title}</h1>
      <BooksBrowser items={books} locale="en" />
    </div>
  );
}
