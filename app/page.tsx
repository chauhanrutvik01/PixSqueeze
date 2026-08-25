import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileImage, Gauge, Layers3, LockKeyhole } from "lucide-react";
import { CompressionTool } from "@/components/CompressionTool";
import { AdSlot } from "@/components/AdSlot";
import { SizeLinks } from "@/components/SizeLinks";
import { ToolLinks } from "@/components/ToolLinks";
import { compressionLinks, site } from "@/lib/site";
import { openGraphImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free Online Image Compressor | PixSqueeze",
  description: "Compress JPG, PNG, WebP and HEIC images to an exact KB or MB size. Free private batch image compressor with no uploads or signup.",
  alternates: { canonical: "/" },
  openGraph: { title: "Free Online Image Compressor | PixSqueeze", description: "Compress images to an exact KB or MB size without uploading them.", url: "/", images: [openGraphImage] },
};

const features = [
  { icon: LockKeyhole, title: "Nothing leaves your device", body: "Every pixel is processed locally in your browser, not on a distant server." },
  { icon: Gauge, title: "Aim for an exact limit", body: "Set a KB or MB target. PixSqueeze balances quality and dimensions to stay below it." },
  { icon: Layers3, title: "Batch-friendly", body: "Queue several photos, compress them in one pass, then download each result." },
];

export default function Home() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${site.url}/#image-compressor`,
    name: "PixSqueeze Online Image Compressor",
    url: site.url,
    description: metadata.description,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any modern web browser",
    browserRequirements: "Requires JavaScript and a modern browser",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Exact KB and MB targets", "Batch compression", "JPG, PNG, WebP and HEIC support", "Local browser processing", "No watermark"],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, "\\u003c") }} />
      <section className="container-shell pb-12 pt-7 sm:pt-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-moss/15 bg-white/70 px-4 py-2 text-xs font-extrabold text-moss shadow-sm"><span className="h-2 w-2 rounded-full bg-coral" /> Free · private · no sign-up</div>
          <h1 className="display mt-4 text-5xl leading-[1.02] sm:text-6xl">Free online image compressor for <span className="text-moss">exact file sizes.</span></h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">Compress JPG, PNG, WebP and HEIC images to the KB or MB limit you need—without uploading your files or sacrificing more quality than necessary.</p>
        </div>
        <div className="mt-8">
          <CompressionTool />
        </div>
      </section>
      <div className="container-shell mt-10"><AdSlot /></div>

      <section className="container-shell mt-24">
        <div className="grid gap-5 md:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => <article className="rounded-3xl border border-line bg-white/80 p-7" key={title}><span className="grid h-12 w-12 place-items-center rounded-2xl bg-mint text-moss"><Icon size={22} /></span><h2 className="mt-5 text-lg font-extrabold">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{body}</p></article>)}
        </div>
      </section>

      <section id="sizes" className="container-shell mt-24 scroll-mt-24">
        <span className="eyebrow">Pick a shortcut</span>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4"><h2 className="display max-w-xl text-4xl sm:text-5xl">Compress to a specific file size</h2><p className="max-w-sm text-sm leading-6 text-slate-600">Each shortcut opens a focused tool with the target already filled in.</p></div>
        <div className="mt-8"><SizeLinks /></div>
      </section>

      <section id="formats" className="container-shell mt-24 scroll-mt-24">
        <span className="eyebrow">Compress by format</span>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4"><h2 className="display max-w-xl text-4xl sm:text-5xl">Smaller JPG, PNG, WebP and HEIC files</h2><Link className="font-bold text-moss" href="/check">Check image size first <ArrowRight className="inline" size={16} /></Link></div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {compressionLinks.map((link) => <Link key={link.href} href={link.href} className="group rounded-3xl border border-line bg-white p-6 transition hover:-translate-y-1 hover:border-moss hover:shadow-lg"><FileImage className="text-coral" size={23} /><h3 className="mt-5 text-xl font-extrabold group-hover:text-moss">{link.label} online</h3><p className="mt-2 text-sm leading-6 text-slate-600">Set an exact target size and process files privately in your browser.</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-moss">Open tool <ArrowRight size={15} /></span></Link>)}
        </div>
      </section>

      <section className="container-shell mt-24">
        <span className="eyebrow">More ways to edit</span><h2 className="display mt-2 text-4xl sm:text-5xl">One tidy image toolkit</h2>
        <div className="mt-8"><ToolLinks /></div>
      </section>

      <section className="container-shell mt-24">
        <div className="grid overflow-hidden rounded-[2rem] bg-ink text-white lg:grid-cols-[.85fr_1.15fr]">
          <div className="p-8 sm:p-12"><span className="eyebrow !text-mint">How it works</span><h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Smaller in three calm steps.</h2><p className="mt-5 leading-7 text-white/65">There is no account, transfer, or hidden queue. Your browser does the work.</p></div>
          <ol className="grid gap-px bg-white/10 sm:grid-cols-3 lg:grid-cols-1">
            {["Choose one or more images", "Enter the size limit", "Compress and download"].map((step, index) => <li className="flex items-center gap-4 bg-ink p-7" key={step}><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 font-display text-lg text-mint">{index + 1}</span><span className="font-bold">{step}</span><CheckCircle2 className="ml-auto text-coral" size={19} /></li>)}
          </ol>
        </div>
      </section>

      <section className="container-shell mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><span className="eyebrow">Learn before you export</span><h2 className="display mt-2 text-4xl">Practical image guides</h2></div><Link className="inline-flex items-center gap-2 font-bold text-moss" href="/guides">See all guides <ArrowRight size={17} /></Link></div>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {[{slug:"why-websites-require-specific-image-sizes",title:"Why websites set image size limits",tag:"File size basics"},{slug:"jpeg-vs-png-which-compresses-better",title:"JPEG vs PNG: which gets smaller?",tag:"Format guide"},{slug:"reduce-photo-size-for-job-applications",title:"Prepare photos for online applications",tag:"Step by step"}].map((guide) => <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group rounded-3xl border border-line bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"><span className="text-xs font-extrabold uppercase tracking-widest text-coral">{guide.tag}</span><h3 className="mt-3 text-xl font-extrabold leading-snug group-hover:text-moss">{guide.title}</h3><span className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-moss">Read guide <ArrowRight size={15} /></span></Link>)}
        </div>
      </section>

      <section className="container-shell mt-24">
        <article className="mx-auto max-w-3xl prose-pix">
          <h2>Compress an image to any KB or MB limit</h2>
          <p>PixSqueeze is built for upload rules that give you a number, not a quality setting. Enter 50KB, 100KB, 200KB, 1MB or any custom limit, and the compressor searches for the strongest practical result at or below it. If quality adjustment is not enough, it gradually reduces dimensions instead of failing without explanation.</p>
          <h2>Private image compression with no upload</h2>
          <p>Your selected images are decoded, compressed and prepared for download inside the browser. They are not sent to PixSqueeze servers. That makes the tool suitable for personal photos, client assets and application documents you would rather not hand to an unknown processing service.</p>
          <h2>How to make an image smaller</h2>
          <ol><li>Add one image or a batch of JPG, PNG, WebP or HEIC files.</li><li>Enter the maximum file size and choose KB or MB.</li><li>Select <strong>Compress images</strong>, compare the result and download it as JPG, PNG or WebP.</li></ol>
          <h2>Image compressor questions</h2>
          <h3>Is PixSqueeze free?</h3><p>Yes. Core compression is free, requires no account and adds no watermark.</p>
          <h3>Can I compress an image to an exact size?</h3><p>The tool aims for the closest valid result at or below your target. Image encoders produce discrete file sizes, so a safe output can be slightly smaller than the number entered.</p>
          <h3>Does compression overwrite the original?</h3><p>No. PixSqueeze creates a new download and leaves the source file unchanged on your device.</p>
        </article>
      </section>
    </>
  );
}
