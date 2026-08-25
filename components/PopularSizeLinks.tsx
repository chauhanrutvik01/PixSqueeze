import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sizePages } from "@/lib/size-pages";

export function PopularSizeLinks({ currentKb, currentSlug, limit = 5 }: { currentKb: number; currentSlug: string; limit?: number }) {
  const nearby = sizePages
    .filter((page) => page.slug !== currentSlug)
    .sort((a, b) => Math.abs(a.kb - currentKb) - Math.abs(b.kb - currentKb) || a.kb - b.kb)
    .slice(0, limit);

  return (
    <section className="container-shell mt-20" aria-labelledby="popular-sizes-title">
      <p className="eyebrow">Popular sizes</p>
      <h2 className="display mt-2 text-3xl" id="popular-sizes-title">Try another image-size target</h2>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {nearby.map((page) => (
          <Link className="group rounded-2xl border border-line bg-white p-5 font-extrabold transition hover:border-moss hover:shadow-lg" href={`/compress-image-to-${page.slug}`} key={page.slug}>
            {page.label}
            <ArrowRight className="mt-5 text-coral transition group-hover:translate-x-1" size={17} />
          </Link>
        ))}
      </div>
    </section>
  );
}
