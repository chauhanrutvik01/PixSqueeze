export function AdSlot({ className = "" }: { className?: string }) {
  return (
    <aside className={`mx-auto flex min-h-24 max-w-4xl items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/50 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 ${className}`} aria-label="Advertisement placeholder">
      Advertisement
      {/* AdSense integration point. Add the approved <ins className="adsbygoogle"> unit here. */}
    </aside>
  );
}
