import { createSocialImage, socialImageSize } from "@/lib/social-image";

export const dynamic = "force-static";
export const alt = "PixSqueeze free online image compressor for exact KB and MB file sizes";
export const size = socialImageSize;
export const contentType = "image/png";

export default function Image() {
  return createSocialImage();
}
