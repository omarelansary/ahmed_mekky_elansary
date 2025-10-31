import React from "react";
import ReactMarkdown from "react-markdown";
import { getBiography } from "@/lib/content";
import { biographyMetadata } from "@/lib/seo";

export const dynamic = "force-static";
export const metadata = biographyMetadata("en");

export default async function BiographyEnPage() {
  const md = await getBiography("en");
  const timeline: { year: string; text: string }[] = [
    { year: "1928", text: "Born in a coastal town" },
    { year: "1950", text: "First publication in a literary magazine" },
    { year: "1987", text: "Novel 'The Book of Hope' published" },
  ];

  return (
    <div>
      <div className="prose prose-zinc max-w-none border-s-4 ps-4 [border-color:var(--accent)]">
        <ReactMarkdown>{md}</ReactMarkdown>
      </div>
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Milestones</h2>
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
