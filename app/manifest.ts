import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PixSqueeze Image Compressor",
    short_name: "PixSqueeze",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fbfaf5",
    theme_color: "#25634f",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
