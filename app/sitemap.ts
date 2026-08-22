import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
import { sizeSlugs, toolLinks, site } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap():MetadataRoute.Sitemap{const staticPaths=["","/about","/privacy-policy","/terms-of-use","/contact","/guides",...toolLinks.map((tool)=>tool.href),...sizeSlugs.map((size)=>`/compress-image-to-${size}`),...guides.map((guide)=>`/guides/${guide.slug}`)];return staticPaths.map((path)=>({url:`${site.url}${path}`,lastModified:new Date("2026-08-22"),changeFrequency:path.startsWith("/guides/")?"monthly":"weekly",priority:path===""?1:path.startsWith("/compress-image")?.9:.7}))}
