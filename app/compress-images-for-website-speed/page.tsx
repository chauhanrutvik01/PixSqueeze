import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Gauge, Layers3, ShieldCheck } from "lucide-react";
import { CompressionTool } from "@/components/CompressionTool";
import { targetSizeFaqs } from "@/lib/size-pages";
import { openGraphImage } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/compress-images-for-website-speed";
const title = "Compress Images for Website Speed";
const description = "Compress website images in batches for faster pages and better LCP. Free, private browser processing—your client assets are never uploaded.";

const developerFaqs = [
  ...targetSizeFaqs,
  {
    question: "Can smaller images improve Largest Contentful Paint?",
    answer: "They can when an image is the LCP element: fewer image bytes can shorten its resource load time. LCP also depends on discovery, priority, server response, rendering and responsive sizing, so measure the page before and after deploying changes.",
  },
  {
    question: "Can I compress several website images at once?",
    answer: "Yes. Add a batch, choose one maximum file size and compress the files locally in the same browser session before uploading them to your CMS, repository or hosting provider.",
  },
];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title: `${title} | PixSqueeze`, description, url: path, type: "website", images: [openGraphImage] },
  twitter: { card: "summary_large_image", title: `${title} | PixSqueeze`, description, images: [openGraphImage] },
};

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: developerFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PixSqueeze website image compressor",
    url: `${site.url}${path}`,
    description,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any modern web browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, "\\u003c") }} />

      <section className="container-shell pb-10 pt-14 text-center sm:pt-20">
        <p className="eyebrow">For developers, bloggers and site owners</p>
        <h1 className="display mx-auto mt-4 max-w-5xl text-4xl leading-tight sm:text-6xl">Compress images for <span className="text-moss">faster website speed</span></h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">Prepare an entire asset batch before deployment. Files stay on your device, so client work, unreleased products and proprietary graphics are never sent to PixSqueeze.</p>
      </section>

      <div className="container-shell"><CompressionTool presetKb={200} heading="Add website images to compress" /></div>

      <section className="container-shell mt-20 grid gap-5 md:grid-cols-3">
        {[
          { icon: ShieldCheck, title: "Private before upload", text: "Compression happens locally in the browser. Only you decide whether the finished asset is later uploaded to a CMS, repository or host." },
          { icon: Gauge, title: "Reduce transfer weight", text: "Smaller image resources generally download sooner. That can help an image-based LCP when transfer time is part of the bottleneck." },
          { icon: Layers3, title: "Prepare a batch", text: "Apply one byte budget to multiple content images, thumbnails or campaign assets, then download each optimized result." },
        ].map(({ icon: Icon, title: cardTitle, text }) => (
          <article key={cardTitle} className="rounded-3xl border border-line bg-white p-7">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-mint text-moss"><Icon size={21} /></span>
            <h2 className="mt-5 text-xl font-extrabold">{cardTitle}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
          </article>
        ))}
      </section>

      <article className="container-shell mt-20">
        <div className="mx-auto max-w-3xl prose-pix">
          <h2>How image size affects Core Web Vitals</h2>
          <p>Largest Contentful Paint measures when the largest visible image or text block finishes rendering. If that element is an image, reducing its transfer size can shorten resource loading—but compression is only one part of LCP. The image must also be discoverable early, requested at the right priority and served at suitable dimensions.</p>
          <p>Google’s web performance guidance recommends a good LCP of 2.5 seconds or less at the 75th percentile. Use field data and a lab trace to find the actual bottleneck instead of treating a single KB target as a universal score.</p>
          <div className="not-prose my-8 rounded-2xl bg-mint/60 p-6">
            <p className="font-extrabold text-moss">A practical pre-deploy workflow</p>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {[
                "Export each asset near its maximum rendered dimensions.",
                "Compress a batch to a sensible project budget and inspect visual quality.",
                "Serve responsive variants with srcset and sizes when layouts need multiple widths.",
                "Do not lazy-load the likely LCP image; make it discoverable in the initial HTML.",
                "Deploy, measure real-user LCP, and adjust the resource that is actually slow.",
              ].map((step) => <li key={step} className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-moss" size={18} />{step}</li>)}
            </ol>
          </div>
          <h2>Compress client and proprietary assets safely</h2>
          <p>A conventional online compressor must receive the source file before it can process it. PixSqueeze instead decodes and re-encodes the image in your browser. That makes it useful before a launch, during client work or whenever the source should not be transferred to another processing service.</p>
          <h2>Choose a budget based on the rendered image</h2>
          <p>There is no SEO-approved file size that fits every image. A small card thumbnail and a full-width photographic hero have different visual jobs. Start with the rendered dimensions and acceptable quality, compress to remove unnecessary weight, then validate the page rather than sacrificing detail solely to hit a round number.</p>
          <p>For implementation detail, read Google’s guidance on <a href="https://web.dev/articles/optimize-lcp" rel="noreferrer" target="_blank">optimizing LCP</a>, <a href="https://web.dev/articles/compress-images" rel="noreferrer" target="_blank">compressing images</a> and <a href="https://web.dev/articles/responsive-images" rel="noreferrer" target="_blank">responsive image markup</a>.</p>
          <h2>Website image compression questions</h2>
          <div className="mt-6 divide-y divide-line rounded-3xl border border-line bg-white px-6 sm:px-8">
            {developerFaqs.map((faq) => <section className="py-6" key={faq.question}><h3 className="!mt-0 text-lg">{faq.question}</h3><p className="!mt-2 !leading-7">{faq.answer}</p></section>)}
          </div>
        </div>
      </article>

      <section className="container-shell mt-20 rounded-[2rem] bg-ink p-8 text-white sm:p-11">
        <p className="eyebrow !text-mint">Need a strict CMS limit?</p>
        <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><h2 className="font-display text-4xl font-semibold">Open a prefilled target page.</h2><p className="mt-3 text-sm leading-6 text-white/65">Use a dedicated reducer when your platform specifies an exact maximum.</p></div>
          <div className="flex flex-wrap gap-3">{[100, 150, 200, 250, 300].map((kb) => <Link className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-bold text-ink" key={kb} href={`/compress-image-to-${kb}kb`}>{kb}KB <ArrowRight size={14} /></Link>)}</div>
        </div>
      </section>
    </>
  );
}
