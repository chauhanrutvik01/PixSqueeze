import Link from "next/link";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { CompressionTool } from "./CompressionTool";
import { FormatPage } from "@/lib/format-pages";
import { compressionLinks, site } from "@/lib/site";

export function FormatCompressionPage({ page }: { page: FormatPage }) {
  const url = `${site.url}/${page.slug}`;
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${page.format} Compressor by PixSqueeze`,
    url,
    description: page.description,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any modern web browser",
    browserRequirements: "Requires JavaScript and a modern browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Exact KB and MB targets", "Batch image compression", "Local browser processing", "No watermark"],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Image compressor", item: site.url },
      { "@type": "ListItem", position: 2, name: `Compress ${page.format}`, item: url },
    ],
  };

  return (
    <>
      {[webAppSchema, faqSchema, breadcrumbSchema].map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      ))}
      <section className="container-shell pb-10 pt-14 text-center sm:pt-20">
        <p className="eyebrow">Free · private · exact target size</p>
        <h1 className="display mx-auto mt-4 max-w-4xl text-4xl leading-tight sm:text-6xl">{page.heading} <span className="text-moss">for free</span></h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">{page.intro}</p>
      </section>

      <div className="container-shell"><CompressionTool heading={`Choose ${page.format} images to compress`} /></div>

      <section className="container-shell mt-20">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_.55fr]">
          <article className="prose-pix">
            {page.details.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}
            <h2>{page.format} compression questions</h2>
            <div className="divide-y divide-line rounded-3xl border border-line bg-white px-6 sm:px-8">
              {page.faqs.map((faq) => <section className="py-6" key={faq.question}><h3 className="!mt-0 text-lg">{faq.question}</h3><p className="!mt-2 !leading-7">{faq.answer}</p></section>)}
            </div>
          </article>
          <aside className="space-y-5">
            <div className="rounded-3xl bg-ink p-7 text-white">
              <p className="eyebrow !text-mint">Best for</p>
              <ul className="mt-5 space-y-4">{page.bestFor.map((item) => <li className="flex gap-3 text-sm leading-6 text-white/75" key={item}><CheckCircle2 className="mt-0.5 shrink-0 text-coral" size={18} />{item}</li>)}</ul>
            </div>
            <div className="rounded-3xl border border-moss/15 bg-mint/60 p-6">
              <ShieldCheck className="text-moss" size={25} />
              <h2 className="mt-4 text-lg font-extrabold">Your files stay private</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Images are processed locally. PixSqueeze has no image-upload server and cannot view your files.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="container-shell mt-20">
        <p className="eyebrow">Compress another format</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {compressionLinks.filter((link) => link.href !== `/${page.slug}`).map((link) => <Link className="rounded-2xl border border-line bg-white p-5 font-extrabold transition hover:border-moss hover:text-moss" href={link.href} key={link.href}>{link.label}</Link>)}
        </div>
      </section>
    </>
  );
}
