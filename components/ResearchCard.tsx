import Link from "next/link";
import TagPills from "@/components/TagPills";
import type { Research } from "@/types";
import { getT } from "@/locales";

export default function ResearchCard({ item, locale }: { item: Research; locale: "ar" | "en" }) {
  const href = locale === "en" ? `/en/research/${item.slug}` : `/research/${item.slug}`;
  const title = locale === "en" ? item.title_en : item.title_ar;
  const authors = item.authors.join(", ");
  const t = getT(locale);

  return (
    <article className="rounded-lg border border-black/10 dark:border-white/10 p-4 h-full flex flex-col">
      <header>
        <h3 className="text-lg font-medium">
          <Link href={href} className="hover:underline underline-offset-4">
            {title}
          </Link>
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          {authors} 
          <span className="mx-1">·</span>
          {item.year}
        </p>
      </header>
      <div className="mt-3">
        <TagPills tags={item.tags} locale={locale} />
      </div>
      <div className="mt-4 flex gap-3 mt-auto">
        <Link href={href} className="text-sm rounded border border-black/10 dark:border-white/20 px-3 py-2 tap-target">
          {t.common.details}
        </Link>
        {item.external_url && (
          <a
            href={item.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm rounded border border-black/10 dark:border-white/20 px-3 py-2 tap-target"
          >
            {t.common.openExternal}
          </a>
        )}
      </div>
    </article>
  );
}
