import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Lightbulb } from "lucide-react";
import { CompressionTool } from "@/components/CompressionTool";
import { AdSlot } from "@/components/AdSlot";
import { ToolLinks } from "@/components/ToolLinks";
import { PopularSizeLinks } from "@/components/PopularSizeLinks";
import { getSizePage, sizePages, targetSizeFaqs } from "@/lib/size-pages";
import { openGraphImage } from "@/lib/seo";

export function generateStaticParams() { return sizePages.map((page) => ({ slug: `compress-image-to-${page.slug}` })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getSizePage(slug.replace(/^compress-image-to-/, ""));
  if (!page) return {};
  const url = `/compress-image-to-${page.slug}`;
  const title = page.title;
  const description = page.description;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | PixSqueeze`, description, url, type: "website", images: [openGraphImage] },
    twitter: { card: "summary_large_image", title: `${title} | PixSqueeze`, description, images: [openGraphImage] },
  };
}

export default async function SizeLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getSizePage(slug.replace(/^compress-image-to-/, ""));
  if (!page) notFound();
  const isTwoMbPage = page.slug === "2mb";
  const faqs = [...targetSizeFaqs, ...page.faqs];
  const howTo = { "@context":"https://schema.org", "@type":"HowTo", name:`How to compress an image to ${page.label}`, description:page.description, totalTime:"PT1M", step:[
    {"@type":"HowToStep",position:1,name:"Choose your image",text:"Select a JPG, PNG, WebP or HEIC file from your device."},
    {"@type":"HowToStep",position:2,name:`Keep ${page.label} selected`,text:`The target is prefilled at ${page.label}. Add more images if you want to process a batch.`},
    {"@type":"HowToStep",position:3,name:"Compress and review",text:"Start compression and compare the original and finished file sizes."},
    {"@type":"HowToStep",position:4,name:"Download",text:"Save the compressed copy to your device and verify the destination’s other upload rules."}
  ]};
  const faqSchema = { "@context":"https://schema.org", "@type":"FAQPage", mainEntity:faqs.map((faq) => ({"@type":"Question",name:faq.question,acceptedAnswer:{"@type":"Answer",text:faq.answer}})) };
  const breadcrumbSchema = { "@context":"https://schema.org", "@type":"BreadcrumbList", itemListElement:[
    {"@type":"ListItem",position:1,name:"Image compressor",item:"https://pixsqueeze.me"},
    {"@type":"ListItem",position:2,name:`Compress image to ${page.label}`,item:`https://pixsqueeze.me/compress-image-to-${page.slug}`}
  ]};

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
      <section className="container-shell pb-10 pt-14 text-center sm:pt-20">
        <p className="eyebrow">Exact-size image compressor</p>
        <h1 className="display mx-auto mt-4 max-w-4xl text-4xl leading-tight sm:text-6xl">
          {isTwoMbPage ? <>Make an image <span className="text-moss">under 2MB</span> online free</> : <>Compress image to <span className="text-moss">{page.label}</span> online free</>}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          {isTwoMbPage ? "Reduce a JPG, PNG, WebP or HEIC photo to less than 2MB with private browser processing." : `A precise, private ${page.label} photo size reducer. Your image stays in your browser from start to finish.`}
        </p>
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
          {isTwoMbPage && (
            <>
              <h2>2MB and 2MP are different limits</h2>
              <p><strong>2MB</strong> describes the file&apos;s storage size. <strong>2MP</strong> means two megapixels and describes its pixel resolution. A photo can be 2MP while still weighing more or less than 2MB, so check which measurement your upload form requires.</p>
              <h2>What if the website still says the image is too large?</h2>
              <p>Some services calculate a megabyte as 1,000KB while others use 1,024KB. If a strict portal rejects a result made with the 2MB preset, enter 1.9MB or 1,950KB to leave a safe margin, then compress and download again.</p>
            </>
          )}
          <h2>Check the result before you upload</h2><p>{page.check}</p>
          <h2>Questions about {page.label} image compression</h2>
          <div className="mt-6 divide-y divide-line rounded-3xl border border-line bg-white px-6 sm:px-8">
            {faqs.map((faq) => <section className="py-6" key={faq.question}><h3 className="!mt-0 text-lg">{faq.question}</h3><p className="!mt-2 !leading-7">{faq.answer}</p></section>)}
          </div>
        </div>
      </article>

      <PopularSizeLinks currentKb={page.kb} currentSlug={page.slug} />
      <section className="container-shell mt-20"><span className="eyebrow">Related tools</span><h2 className="display mt-2 text-3xl">Do more with your image</h2><div className="mt-6"><ToolLinks /></div></section>
    </>
  );
}
