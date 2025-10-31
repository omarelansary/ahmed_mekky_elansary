import Image from "next/image";
import { notFound } from "next/navigation";
import { getBookBySlug, getBooks } from "@/lib/content";
import PdfViewer from "@/components/PdfViewer";

type Props = { params: { slug: string } };

export const dynamic = "force-static";

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((b) => ({ slug: b.slug }));
}

export default async function BookDetailEn({ params }: Props) {
  const book = await getBookBySlug(params.slug);
  if (!book) return notFound();

  const related = (await getBooks()).filter(
    (b) => b.slug !== book.slug && (b.type === book.type || b.tags.some((t) => book.tags.includes(t)))
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title_ar, // Arabic is the canonical PDF language
    inLanguage: "ar",
    datePublished: String(book.year),
    publisher: book.publisher,
    isbn: book.isbn,
    keywords: book.tags.join(", "),
    workExample: {
      "@type": "CreativeWork",
      url: book.pdf,
      fileFormat: "application/pdf",
    },
  };

  const pdfUrl = book.pdf ?? "";
  return (
    <div className="grid gap-8">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="section rounded-2xl bg-[url('/texture.png')] bg-cover bg-no-repeat">
        <div className="grid gap-6 md:grid-cols-[1fr,2fr] items-start">
          <div className="relative aspect-[3/4] rounded overflow-hidden border border-black/10 dark:border-white/10">
            <Image src={book.cover} alt={book.title_en} fill sizes="(min-width: 768px) 320px, 80vw" className="object-cover" />
          </div>
          <div className="[padding-inline:0.5rem]">
            <h1 className="text-3xl font-semibold tracking-tight">{book.title_en}</h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              {book.year} • {labelType(book.type, "en")}
            </p>
            <dl className="mt-4 grid gap-2 text-sm">
              <div className="flex gap-2"><dt className="text-zinc-500 w-24">Publisher</dt><dd>{book.publisher}</dd></div>
              <div className="flex gap-2"><dt className="text-zinc-500 w-24">ISBN</dt><dd>{book.isbn}</dd></div>
            </dl>
            <p className="mt-4 text-zinc-800 dark:text-zinc-200">{book.summary_en}</p>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">PDF available in Arabic only.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {book.tags.map((t) => (
                <span key={t} className="text-xs rounded-full [padding-inline:0.5rem] py-1 border border-black/10 dark:border-white/20">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {pdfUrl && <ActionRow fileUrl={pdfUrl} locale="en" title={book.title_en} />}
      {pdfUrl && (
        <div className="rounded-2xl bg-white shadow-md border border-black/5 p-2">
          <PdfViewer fileUrl={pdfUrl} />
        </div>
      )}

      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Related Books</h2>
          <ul className="flex flex-wrap gap-2">
            {related.slice(0, 6).map((r) => (
              <li key={r.slug} className="text-sm">
                <a className="hover:underline underline-offset-4" href={`/en/books/${r.slug}`}>{r.title_en}</a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function labelType(type: "novel" | "poetry" | "essays", locale: "ar" | "en") {
  const map = { novel: { ar: "رواية", en: "Novel" }, poetry: { ar: "شعر", en: "Poetry" }, essays: { ar: "مقالات", en: "Essays" } } as const;
  return map[type][locale];
}

function ActionRow({ fileUrl, locale, title }: { fileUrl: string; locale: "ar" | "en"; title: string }) {
  async function onShare() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: typeof window !== "undefined" ? window.location.href : undefined });
      } else {
        await navigator.clipboard.writeText(typeof window !== "undefined" ? window.location.href : "");
        alert(locale === "en" ? "Link copied" : "تم نسخ الرابط");
      }
    } catch {}
  }
  return (
    <div className="sticky top-[56px] z-30 flex items-center gap-3 rounded border border-black/10 dark:border-white/10 bg-background/90 backdrop-blur px-3 py-2">
      <a href={fileUrl} download className="rounded border border-black/10 dark:border-white/20 px-3 py-1">
        {locale === "en" ? "Download" : "تنزيل"}
      </a>
      <button onClick={onShare} className="rounded border border-black/10 dark:border-white/20 px-3 py-1">
        {locale === "en" ? "Share" : "مشاركة"}
      </button>
    </div>
  );
}
