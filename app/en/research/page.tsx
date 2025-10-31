import ResearchBrowser from "@/components/ResearchBrowser";
import { getResearch } from "@/lib/content";
import { getT } from "@/locales";

export const dynamic = "force-static";

export default async function ResearchIndexEn() {
  const items = await getResearch();
  const t = getT("en");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((r, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "ScholarlyArticle",
        headline: r.title_en,
        inLanguage: "en",
        datePublished: String(r.year),
        author: r.authors.map((a) => ({ "@type": "Person", name: a })),
        keywords: r.tags.join(", "),
        url: `/en/research/${r.slug}`,
      },
    })),
  };

  return (
    <div>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-2xl font-semibold mb-2">{t.research.title}</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
        {t.common.seeAlso} <a className="hover:underline underline-offset-4" href="/en/books">{t.nav.books}</a> · {""}
        <a className="hover:underline underline-offset-4" href="/en/biography">{t.nav.biography}</a>
      </p>
      <ResearchBrowser items={items} locale="en" />
    </div>
  );
}
