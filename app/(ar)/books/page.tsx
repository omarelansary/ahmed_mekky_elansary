import BooksBrowser from "@/components/BooksBrowser";
import { getBooks } from "@/lib/content";

export const dynamic = "force-static";

export default async function BooksIndexAr() {
  const books = await getBooks();
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">الكتب</h1>
      <BooksBrowser items={books} locale="ar" />
    </div>
  );
}
