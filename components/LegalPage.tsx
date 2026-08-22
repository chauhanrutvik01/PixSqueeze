export function LegalPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  return <article className="container-shell pt-14 sm:pt-20"><div className="mx-auto max-w-3xl"><p className="eyebrow">{eyebrow}</p><h1 className="display mt-4 text-5xl sm:text-6xl">{title}</h1><p className="mt-6 text-lg leading-8 text-slate-600">{intro}</p><div className="prose-pix mt-12">{children}</div><p className="mt-12 border-t border-line pt-6 text-xs text-slate-400">Last updated: August 22, 2026</p></div></article>;
}
