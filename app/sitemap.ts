import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
import { compressionLinks, sizeSlugs, toolLinks, site } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const utilityPaths = ["", "/check", "/guides", "/compress-images-for-website-speed", ...compressionLinks.map((tool) => tool.href), ...toolLinks.map((tool) => tool.href)];
  const sizePaths = sizeSlugs.map((size) => `/compress-image-to-${size}`);
  const trustPaths = ["/about", "/privacy-policy", "/terms-of-use", "/contact"];

  return [
    ...utilityPaths.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(site.updated),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : path === "/guides" ? 0.7 : 0.85,
    })),
    ...sizePaths.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(site.updated),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...guides.map((guide) => ({
      url: `${site.url}/guides/${guide.slug}`,
      lastModified: new Date(guide.published),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...trustPaths.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(site.updated),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
