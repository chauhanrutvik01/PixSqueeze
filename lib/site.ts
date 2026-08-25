export const site = {
  name: "PixSqueeze",
  url: "https://pixsqueeze.me",
  email: "rcshortsx@gmail.com",
  description: "Free online image compressor for reducing JPG, PNG, WebP and HEIC files to an exact KB or MB size. Private browser processing with no uploads.",
  updated: "2026-08-25",
};

export const sizeSlugs = [
  "5kb", "10kb", "15kb", "20kb", "30kb", "40kb", "50kb", "60kb", "80kb", "90kb", "100kb", "150kb", "200kb", "250kb", "300kb", "400kb", "500kb", "1mb", "2mb"
] as const;

export const toolLinks = [
  { href: "/resize-image", label: "Resize image" },
  { href: "/passport-photo-size", label: "Passport photo" },
  { href: "/convert-to-jpg", label: "Convert to JPG" },
  { href: "/convert-to-png", label: "Convert to PNG" },
  { href: "/convert-to-webp", label: "Convert to WebP" },
  { href: "/image-to-pdf", label: "Image to PDF" },
] as const;

export const compressionLinks = [
  { href: "/compress-jpg", label: "Compress JPG" },
  { href: "/compress-png", label: "Compress PNG" },
  { href: "/compress-webp", label: "Compress WebP" },
  { href: "/compress-heic", label: "Compress HEIC" },
] as const;
