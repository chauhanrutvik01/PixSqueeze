import type { Metadata } from "next";
import { FormatCompressionPage } from "@/components/FormatCompressionPage";
import { getFormatPage } from "@/lib/format-pages";
import { openGraphImage } from "@/lib/seo";

const page = getFormatPage("compress-webp");
export const metadata: Metadata = { title: page.title, description: page.description, alternates: { canonical: `/${page.slug}` }, openGraph: { title: page.title, description: page.description, url: `/${page.slug}`, images: [openGraphImage] } };
export default function Page() { return <FormatCompressionPage page={page} />; }
