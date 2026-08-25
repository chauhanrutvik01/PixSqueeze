export type FormatPage = {
  slug: string;
  format: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  bestFor: string[];
  details: { heading: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
};

export const formatPages: FormatPage[] = [
  {
    slug: "compress-jpg",
    format: "JPG",
    title: "Compress JPG Online Free",
    description: "Compress JPG and JPEG images to an exact KB or MB size online. Free private batch compression with no upload, signup or watermark.",
    heading: "Compress JPG images online",
    intro: "Reduce JPEG file size for websites, email, forms and applications while keeping the strongest quality that fits your chosen limit. PixSqueeze processes every photo locally in your browser.",
    bestFor: ["Photos and portraits", "Job and exam application uploads", "Website and product images", "Email attachments"],
    details: [
      { heading: "How to reduce JPG file size", paragraphs: ["Add one or more JPG or JPEG files, enter the maximum KB or MB size you need, and select Compress images. PixSqueeze tests quality levels and only reduces dimensions when the file cannot otherwise fit.", "Download the result as JPG for broad compatibility, or choose WebP when the destination accepts it and a smaller modern file is useful."] },
      { heading: "Compress once from the best source", paragraphs: ["JPEG is a lossy format, so repeatedly saving an already compressed copy can add blockiness and halos. Start from the clearest original you have, keep that source, and make each delivery copy from it.", "A close crop and suitable pixel dimensions often protect visible detail better than forcing a very large photo into an extremely small file budget."] },
    ],
    faqs: [
      { question: "Can I compress a JPG to an exact KB size?", answer: "PixSqueeze finds the closest practical JPG at or below your target. Encoders cannot always produce every exact byte count, so the safe result may be slightly smaller." },
      { question: "Are my JPEG photos uploaded?", answer: "No. Decoding, compression and download preparation happen in your browser on your device." },
      { question: "Does JPG compression change image dimensions?", answer: "Quality is reduced first. Dimensions are lowered only when necessary to meet a strict target size." },
    ],
  },
  {
    slug: "compress-png",
    format: "PNG",
    title: "Compress PNG Online Free",
    description: "Compress PNG images online to a smaller KB or MB size. Free private batch tool with no file upload, account or watermark.",
    heading: "Compress PNG images online",
    intro: "Make PNG screenshots, graphics and transparent images smaller without sending them to a server. Set a target size and compare the finished file before downloading it.",
    bestFor: ["Screenshots and interface graphics", "Logos and illustrations", "Images with transparency", "Forms that require PNG"],
    details: [
      { heading: "How PNG compression works here", paragraphs: ["Browser PNG encoding is lossless and does not respond to a normal quality slider. When a full-size PNG is above your target, PixSqueeze carefully reduces its pixel dimensions until it finds the largest valid result under the limit.", "If transparency is not required, downloading the result as JPG or WebP can often produce a much smaller photographic file."] },
      { heading: "Choose PNG for the right content", paragraphs: ["PNG is excellent for crisp text, screenshots, diagrams, flat colors and transparent edges. It is often inefficient for ordinary camera photos, where JPG or WebP usually reaches the same visual goal with fewer bytes.", "Always follow the destination’s accepted-format rule. A smaller WebP is not useful when an older upload form accepts PNG only."] },
    ],
    faqs: [
      { question: "Will PNG transparency be preserved?", answer: "Yes when you download as PNG or WebP. JPG does not support transparency and uses a white background." },
      { question: "Why might PNG dimensions become smaller?", answer: "PNG is lossless, so pixel dimensions are the dependable control available when the original encoding is still above a strict target." },
      { question: "Are PNG files stored by PixSqueeze?", answer: "No. The files and results remain in the current browser session and are never uploaded to PixSqueeze." },
    ],
  },
  {
    slug: "compress-webp",
    format: "WebP",
    title: "Compress WebP Online Free",
    description: "Compress WebP images to an exact target size online. Free private batch compression in your browser with no uploads or signup.",
    heading: "Compress WebP images online",
    intro: "Reduce WebP file size for faster websites, content systems and sharing. Choose an exact limit, keep transparency where supported and process multiple images privately on your device.",
    bestFor: ["Website photos and graphics", "Transparent web assets", "CMS upload limits", "Modern browsers and apps"],
    details: [
      { heading: "Smaller WebP files without guesswork", paragraphs: ["Instead of asking you to guess a quality percentage, PixSqueeze works backward from your KB or MB limit. It searches for the strongest encoding below the target and scales dimensions only if quality adjustment is not enough.", "The before-and-after figures show the actual saving for each file, which is more useful than assuming every WebP can shrink by the same percentage."] },
      { heading: "When WebP is the right output", paragraphs: ["WebP handles both photographic content and transparent graphics efficiently, making it a strong choice for modern websites. Keep JPG or PNG when a legacy editor, print workflow or application portal explicitly requires those formats.", "For web publishing, match the pixel dimensions to the size the image will actually occupy. Encoding an oversized source efficiently still leaves users downloading unnecessary pixels."] },
    ],
    faqs: [
      { question: "Can WebP be compressed to a specific KB size?", answer: "Yes. Enter the limit and PixSqueeze chooses the closest usable WebP at or below it." },
      { question: "Does WebP support transparent backgrounds?", answer: "Yes. Transparent source pixels can remain transparent when the result is downloaded as WebP." },
      { question: "Is WebP supported everywhere?", answer: "Current browsers support WebP well, but some older tools and upload forms still require JPG or PNG." },
    ],
  },
  {
    slug: "compress-heic",
    format: "HEIC",
    title: "Compress HEIC Online Free",
    description: "Compress iPhone HEIC photos to an exact KB or MB size online. Convert privately to JPG, PNG or WebP with no upload or signup.",
    heading: "Compress HEIC photos online",
    intro: "Open iPhone HEIC or HEIF photos, reduce them to a precise file-size limit, and download a compatible JPG, PNG or WebP copy. Processing stays on your device.",
    bestFor: ["iPhone and iPad photos", "Application portals", "Email and messaging", "HEIC-to-JPG compatibility"],
    details: [
      { heading: "Compress and convert HEIC in one step", paragraphs: ["Browsers do not generally encode new HEIC files, so PixSqueeze decodes the source locally and prepares a JPG, PNG or WebP result. JPG is the most widely accepted choice for ordinary photos and upload forms.", "Set the destination’s maximum size before compressing. The tool adjusts quality and, when required, dimensions to stay under that byte limit."] },
      { heading: "Check compatibility before uploading", paragraphs: ["HEIC is efficient, but many recruitment, government, education and document systems still accept only JPG or PNG. Converting a dedicated copy avoids changing the original photo stored on your device.", "Keep the source until the receiving system accepts the result, and verify separate rules for pixel dimensions, aspect ratio and file naming."] },
    ],
    faqs: [
      { question: "Can I download another HEIC file?", answer: "No. Current browser encoders do not create HEIC output here. Download the compressed copy as JPG, PNG or WebP." },
      { question: "Are iPhone photos uploaded to a server?", answer: "No. The HEIC decoder and compression process run locally in your browser." },
      { question: "Which output is best for an application form?", answer: "JPG is usually the safest choice unless the form specifically requests PNG or another format." },
    ],
  },
];

export function getFormatPage(slug: string) {
  const page = formatPages.find((entry) => entry.slug === slug);
  if (!page) throw new Error(`Unknown format page: ${slug}`);
  return page;
}
