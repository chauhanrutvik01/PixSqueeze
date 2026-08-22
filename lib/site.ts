export const site = {
  name: "PixSqueeze",
  url: "https://pixsqueeze.me",
  email: "rcshortsx@gmail.com",
  description: "Private, browser-based tools for compressing, resizing and converting images.",
};

export const sizeSlugs = [
  "5kb", "10kb", "20kb", "30kb", "50kb", "100kb", "150kb", "200kb", "300kb", "500kb", "1mb", "2mb"
] as const;

export const toolLinks = [
  { href: "/resize-image", label: "Resize image" },
  { href: "/passport-photo-size", label: "Passport photo" },
  { href: "/convert-to-jpg", label: "Convert to JPG" },
  { href: "/convert-to-png", label: "Convert to PNG" },
  { href: "/convert-to-webp", label: "Convert to WebP" },
  { href: "/image-to-pdf", label: "Image to PDF" },
] as const;
