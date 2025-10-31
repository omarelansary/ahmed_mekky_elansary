import React from "react";
import ReactMarkdown from "react-markdown";
import { getBiography } from "@/lib/content";
import { biographyMetadata } from "@/lib/seo";

export const dynamic = "force-static";
export const metadata = biographyMetadata("ar");

export default async function BiographyArPage() {
  const md = await getBiography("ar");
  const timeline: { year: string; text: string }[] = [
    { year: "1928", text: "الولادة في مدينة ساحلية" },
    { year: "1950", text: "النشر الأول في مجلة أدبية" },
    { year: "1987", text: "صدور رواية \"كتاب الأمل\"" },
  ];

  return (
    <div className="prose prose-zinc max-w-none rtl:[text-align:start]">
      <ReactMarkdown>{md}</ReactMarkdown>
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">محطات مختصرة</h2>
        <ul className="grid gap-2">
          {timeline.map((t) => (
            <li key={t.year} className="flex gap-3 items-baseline">
              <span className="text-zinc-500 w-16 shrink-0">{t.year}</span>
              <span>{t.text}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

