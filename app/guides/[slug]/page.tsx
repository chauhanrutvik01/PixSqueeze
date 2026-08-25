import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getGuide, guides } from "@/lib/guides";
import { site } from "@/lib/site";
import { openGraphImage } from "@/lib/seo";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const url = `/guides/${slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: { type: "article", title: guide.title, description: guide.description, url, publishedTime: guide.published, images: [openGraphImage] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const related = guides.filter((item) => item.slug !== slug).slice(0, 2);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.published,
    dateModified: guide.published,
    mainEntityOfPage: `${site.url}/guides/${guide.slug}`,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url, logo: { "@type": "ImageObject", url: `${site.url}/icon.svg` } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
      <article className="container-shell pt-14 sm:pt-20">
        <div className="mx-auto max-w-3xl">
          <Link href="/guides" className="inline-flex items-center gap-2 text-sm font-bold text-moss"><ArrowLeft size={16} /> All guides</Link>
          <div className="mt-8 flex items-center gap-3 text-xs font-extrabold uppercase tracking-widest"><span className="text-coral">{guide.category}</span><span className="text-slate-300">•</span><span className="text-slate-400">{guide.readTime}</span></div>
          <h1 className="display mt-5 text-4xl leading-tight sm:text-6xl">{guide.title}</h1>
          <p className="mt-6 text-xl leading-9 text-slate-600">{guide.intro}</p>
          <div className="prose-pix mt-12">
            {guide.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((text) => <p key={text}>{text}</p>)}{section.list && <ul>{section.list.map((item) => <li key={item}>{item}</li>)}</ul>}</section>)}
          </div>
          <div className="mt-14 rounded-3xl bg-mint/70 p-7 sm:p-9"><p className="eyebrow">Put it into practice</p><h2 className="display mt-2 text-3xl">Ready to make your image smaller?</h2><Link href="/#compress" className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-white">Open the compressor <ArrowRight size={17} /></Link></div>
        </div>
      </article>
      <section className="container-shell mt-20"><div className="mx-auto max-w-3xl"><p className="eyebrow">Continue reading</p><div className="mt-5 grid gap-4 sm:grid-cols-2">{related.map((item) => <Link href={`/guides/${item.slug}`} className="rounded-2xl border border-line bg-white p-5 font-bold hover:border-moss" key={item.slug}>{item.title}<ArrowRight className="mt-4 text-coral" size={16} /></Link>)}</div></div></section>
    </>
  );
}
