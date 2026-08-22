import Link from "next/link";
import { sizeSlugs } from "@/lib/site";

export function SizeLinks({ limit }: { limit?: number }) {
  const entries = typeof limit === "number" ? sizeSlugs.slice(0, limit) : sizeSlugs;
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {entries.map((size) => <Link key={size} href={`/compress-image-to-${size}`} className="group rounded-2xl border border-line bg-white p-4 transition hover:-translate-y-1 hover:border-moss hover:shadow-lg"><span className="text-xs font-bold uppercase tracking-widest text-slate-400">Compress to</span><span className="mt-1 block text-lg font-extrabold group-hover:text-moss">{size.toUpperCase()}</span></Link>)}
    </div>
  );
}
