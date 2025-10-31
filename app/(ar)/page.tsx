import Image from "next/image";
import Link from "next/link";
import { personJsonLd, homeMetadata } from "@/lib/seo";

export const dynamic = "force-static";
export const metadata = homeMetadata("ar");

export default function ArabicHome() {
  const jsonLd = personJsonLd("ar");
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="grid gap-8 md:grid-cols-[1fr,1.5fr] items-center">
        <div className="aspect-square relative rounded overflow-hidden bg-black/5 dark:bg-white/10">
          <Image src="/media/portrait.jpg" alt="صورة الكاتب" fill sizes="(min-width: 768px) 320px, 100vw" className="object-cover" />
        </div>
        <div className="[padding-inline:0.5rem]">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">أحمد الأنصاري</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">1928–2015</p>
          <blockquote className="mt-6 border-s-2 ps-4 text-lg text-zinc-800 dark:text-zinc-200">
            الكتابة تعلّمنا الإصغاء لما لا يقال.
          </blockquote>
        </div>
      </section>

      <section className="mt-12 grid gap-6 sm:grid-cols-3">
        <Card href="/biography" title="السيرة" desc="نبذة عن الحياة والمنعطفات" />
        <Card href="/books" title="الكتب" desc="الأعمال المنشورة" />
        <Card href="/research" title="الأبحاث" desc="الدراسات والمقالات" />
      </section>
    </>
  );
}

function Card({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-black/10 dark:border-white/10 p-5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
    >
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{desc}</p>
    </Link>
  );
}
