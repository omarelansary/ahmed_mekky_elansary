import { notFound } from "next/navigation";
import { getResearch, getResearchBySlug } from "@/lib/content";
import PdfViewer from "@/components/PdfViewer";

type Props = { params: { slug: string } };

export const dynamic = "force-static";

export async function generateStaticParams() {
  const items = await getResearch();
  return items.map((r) => ({ slug: r.slug }));
}

export default async function ResearchDetailAr({ params }: Props) {
  const item = await getResearchBySlug(params.slug);
  if (!item) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: item.title_ar,
    inLanguage: "ar",
    datePublished: String(item.year),
    author: item.authors.map((a) => ({ "@type": "Person", name: a })),
    keywords: item.tags.join(", "),
    url: `/research/${item.slug}`,
    ...(item.external_url ? { sameAs: item.external_url } : {}),
    ...(item.pdf
      ? {
          encoding: {
            "@type": "MediaObject",
            contentUrl: item.pdf,
            fileFormat: "application/pdf",
          },
        }
      : {}),
  } as const;

  const pdfUrl = item.pdf ?? "";

  return (
    <div className="grid gap-6">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">{item.title_ar}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {item.authors.join(", ")} · {item.year}
        </p>
      </header>

      <p className="text-zinc-800 dark:text-zinc-200">{item.abstract_ar}</p>

      <div className="flex gap-3 flex-wrap">
        {item.external_url && (
          <a
            href={item.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-black/10 dark:border-white/20 px-3 py-1"
          >
            فتح الرابط الخارجي
          </a>
        )}
        {pdfUrl && <ActionRow fileUrl={pdfUrl} locale="ar" title={item.title_ar} />}
      </div>

      {pdfUrl && <PdfViewer fileUrl={pdfUrl} />}

      <section className="mt-8 text-sm text-zinc-600 dark:text-zinc-400">
        اطّلع أيضًا على: <a className="hover:underline underline-offset-4" href="/books">الكتب</a> · {""}
        <a className="hover:underline underline-offset-4" href="/biography">السيرة</a>
      </section>
    </div>
  );
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
    <div className="flex items-center gap-3">
      <a href={fileUrl} download className="rounded border border-black/10 dark:border-white/20 px-3 py-1">
        {locale === "en" ? "Download PDF" : "تنزيل"}
      </a>
      <button onClick={onShare} className="rounded border border-black/10 dark:border-white/20 px-3 py-1">
        {locale === "en" ? "Share" : "مشاركة"}
      </button>
    </div>
  );
}

