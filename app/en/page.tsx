import Image from "next/image";
import Link from "next/link";
import { personJsonLd, homeMetadata } from "@/lib/seo";

export const dynamic = "force-static";
export const metadata = homeMetadata("en");

export default function EnglishHome() {
  const jsonLd = personJsonLd("en");
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="section rounded-2xl bg-[url('/texture.png')] bg-cover bg-no-repeat">
        <div className="grid gap-8 md:grid-cols-[1fr,1.5fr] items-center">
          <div className="aspect-square relative rounded overflow-hidden bg-black/5 dark:bg-white/10">
            <Image src="/media/portrait.jpg" alt="Writer portrait" fill sizes="(min-width: 768px) 320px, 100vw" className="object-cover" />
          </div>
          <div className="[padding-inline:0.5rem]">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight ui">Ahmed Elansary</h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2">1928–2015</p>
            <blockquote className="mt-6 border-s-2 ps-4 text-lg text-zinc-800 dark:text-zinc-200">
              Writing teaches us to listen to what is unsaid.
            </blockquote>
          </div>
        </div>
      </section>

      <section className="section grid gap-6 sm:grid-cols-3">
        <Card href="/en/biography" title="Biography" desc="Life overview and milestones" />
        <Card href="/en/books" title="Books" desc="Published works" />
        <Card href="/en/research" title="Research" desc="Studies and essays" />
      </section>
    </>
  );
}

function Card({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link
      href={href}
      className="block rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow p-5 hover:scale-[1.02] transition-all duration-300 ease-out"
    >
      <h3 className="text-xl font-semibold mb-2 ui">{title}</h3>
      <p className="text-gray-700 text-sm">{desc}</p>
    </Link>
  );
}

