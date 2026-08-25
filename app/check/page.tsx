import type { Metadata } from "next";
import Link from "next/link";
import { ImageSizeChecker } from "@/components/ImageSizeChecker";
import { site } from "@/lib/site";
import { openGraphImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Image Size Checker Online",
  description: "Check an image file size, dimensions, format and megapixels online for free. Private browser-only inspection with no upload.",
  alternates: { canonical: "/check" },
  openGraph: { title: "Free Image Size Checker", description: "See an image’s KB or MB size, pixel dimensions and format without uploading it.", url: "/check", images: [openGraphImage] },
};

export default function Page() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PixSqueeze Image Size Checker",
    url: `${site.url}/check`,
    description: metadata.description,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any modern web browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, "\\u003c") }} />
      <section className="container-shell pb-10 pt-14 text-center sm:pt-20"><p className="eyebrow">Free image size checker</p><h1 className="display mx-auto mt-4 max-w-4xl text-4xl leading-tight sm:text-6xl">Check image size and <span className="text-moss">dimensions online</span></h1><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">See the exact bytes, KB or MB, pixel dimensions, megapixels and format of an image. Nothing is uploaded.</p></section>
      <div className="container-shell"><ImageSizeChecker /></div>
      <article className="container-shell mt-20"><div className="mx-auto max-w-3xl prose-pix"><h2>How to check an image size</h2><ol><li>Choose or drop an image into the checker.</li><li>Read its exact file weight and pixel dimensions.</li><li>If it is above your upload limit, open the <Link href="/#compress">image compressor</Link> and enter the required KB or MB size.</li></ol><h2>File size and dimensions are different</h2><p>File size measures storage weight in bytes, KB or MB. Dimensions measure the number of pixels across and down the image. An upload form can check either rule—or both—so confirm every requirement before submitting.</p><h2>Private by design</h2><p>The checker reads the file through browser APIs on your device. PixSqueeze does not upload the image, store a copy or send its name to analytics.</p></div></article>
    </>
  );
}
