import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Lightbulb } from "lucide-react";
import { CompressionTool } from "@/components/CompressionTool";
import { AdSlot } from "@/components/AdSlot";
import { ToolLinks } from "@/components/ToolLinks";
import { getSizePage, sizePages } from "@/lib/size-pages";

export function generateStaticParams() { return sizePages.map((page) => ({ slug: `compress-image-to-${page.slug}` })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getSizePage(slug.replace(/^compress-image-to-/, ""));
  if (!page) return {};
  const url = `/compress-image-to-${page.slug}`;
  return { title: page.title, description: page.description, alternates: { canonical: url }, openGraph: { title: page.title, description: page.description, url, type: "website" } };
}

export default async function SizeLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getSizePage(slug.replace(/^compress-image-to-/, ""));
  if (!page) notFound();
  const related = sizePages.filter((entry) => entry.slug !== page.slug).sort((a, b) => Math.abs(a.kb - page.kb) - Math.abs(b.kb - page.kb)).slice(0, 4);
  const howTo = { "@context":"https://schema.org", "@type":"HowTo", name:`How to compress an image to ${page.label}`, description:page.description, totalTime:"PT1M", step:[
    {"@type":"HowToStep",position:1,name:"Choose your image",text:"Select a JPG, PNG, WebP or HEIC file from your device."},
    {"@type":"HowToStep",position:2,name:`Keep ${page.label} selected`,text:`The target is prefilled at ${page.label}. Add more images if you want to process a batch.`},
    {"@type":"HowToStep",position:3,name:"Compress and review",text:"Start compression and compare the original and finished file sizes."},
    {"@type":"HowToStep",position:4,name:"Download",text:"Save the compressed copy to your device and verify the destination’s other upload rules."}
  ]};
  const faqSchema = { "@context":"https://schema.org", "@type":"FAQPage", mainEntity:page.faqs.map((faq) => ({"@type":"Question",name:faq.question,acceptedAnswer:{"@type":"Answer",text:faq.answer}})) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
      <section className="container-shell pb-10 pt-14 text-center sm:pt-20">
        <p className="eyebrow">Exact-size image compressor</p>
        <h1 className="display mx-auto mt-4 max-w-4xl text-4xl leading-tight sm:text-6xl">Compress image to <span className="text-moss">{page.label}</span> online free</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">A precise, private {page.label} photo size reducer. Your image stays in your browser from start to finish.</p>
      </section>
      <div className="container-shell"><CompressionTool presetKb={page.kb} heading={`Add images to reduce to ${page.label}`} /></div>
      <div className="container-shell mt-10"><AdSlot /></div>

      <article className="container-shell mt-20">
        <div className="mx-auto max-w-3xl prose-pix">
          <p className="text-lg !leading-8">{page.intro}</p>
          <h2>When a {page.label} image makes sense</h2><p>{page.common}</p>
          <h2>How to reduce image size to {page.label}</h2>
          <ol>{howTo.step.map((step) => <li key={step.position}><strong className="text-ink">{step.name}.</strong> {step.text}</li>)}</ol>
          <div className="my-8 flex gap-4 rounded-2xl border border-moss/15 bg-mint/60 p-5"><Lightbulb className="mt-0.5 shrink-0 text-moss" size={22} /><p className="!mt-0 text-sm !leading-6">{page.strategy}</p></div>
          <h2>Check the result before you upload</h2><p>{page.check}</p>
          <h2>Questions about {page.label} image compression</h2>
          <div className="mt-6 divide-y divide-line rounded-3xl border border-line bg-white px-6 sm:px-8">
            {page.faqs.map((faq) => <section className="py-6" key={faq.question}><h3 className="!mt-0 text-lg">{faq.question}</h3><p className="!mt-2 !leading-7">{faq.answer}</p></section>)}
          </div>
        </div>
      </article>

      <section className="container-shell mt-20">
        <span className="eyebrow">Need a different size?</span><h2 className="display mt-2 text-3xl">Try a nearby target</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">{related.map((entry) => <Link className="group rounded-2xl border border-line bg-white p-5 font-extrabold transition hover:border-moss hover:shadow-lg" href={`/compress-image-to-${entry.slug}`} key={entry.slug}>{entry.label}<ArrowRight className="mt-5 text-coral transition group-hover:translate-x-1" size={17} /></Link>)}</div>
      </section>
      <section className="container-shell mt-20"><span className="eyebrow">Related tools</span><h2 className="display mt-2 text-3xl">Do more with your image</h2><div className="mt-6"><ToolLinks /></div></section>
    </>
  );
}
