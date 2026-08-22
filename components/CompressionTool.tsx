"use client";
/* eslint-disable @next/next/no-img-element -- previews use local blob URLs that next/image cannot optimize */

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, Check, Download, ImageIcon, LockKeyhole, Plus, Sparkles, Trash2, UploadCloud, X } from "lucide-react";

type Item = {
  id: string;
  file: File;
  sourceUrl: string;
  resultUrl?: string;
  result?: Blob;
  progress: number;
  status: "ready" | "working" | "done" | "error";
  error?: string;
};

type OutputChoice = "jpg" | "png" | "webp";

const accepted = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
const prettyBytes = (bytes: number) => bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(bytes < 10240 ? 1 : 0)} KB` : `${(bytes / 1024 / 1024).toFixed(2)} MB`;

export function CompressionTool({ presetKb = 100, heading }: { presetKb?: number; heading?: string }) {
  const [items, setItems] = useState<Item[]>([]);
  const [target, setTarget] = useState(presetKb >= 1024 ? presetKb / 1024 : presetKb);
  const [unit, setUnit] = useState<"KB" | "MB">(presetKb >= 1024 ? "MB" : "KB");
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [downloadItem, setDownloadItem] = useState<Item | null>(null);
  const [preparingFormat, setPreparingFormat] = useState<OutputChoice | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!downloadItem) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape" && !preparingFormat) setDownloadItem(null); };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [downloadItem, preparingFormat]);

  const addFiles = useCallback((files: FileList | File[]) => {
    const next = Array.from(files).filter((file) => accepted.includes(file.type) || /\.(jpe?g|png|webp|hei[cf])$/i.test(file.name)).map((file) => ({
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      sourceUrl: URL.createObjectURL(file),
      progress: 0,
      status: "ready" as const,
    }));
    setItems((current) => [...current, ...next]);
  }, []);

  const remove = (id: string) => setItems((current) => {
    const item = current.find((entry) => entry.id === id);
    if (item) { URL.revokeObjectURL(item.sourceUrl); if (item.resultUrl) URL.revokeObjectURL(item.resultUrl); }
    return current.filter((entry) => entry.id !== id);
  });

  const compressAll = async () => {
    if (!items.length || target <= 0) return;
    setBusy(true);
    const targetBytes = target * (unit === "KB" ? 1024 : 1024 * 1024);
    const { compressToTarget } = await import("@/lib/client-image");
    for (const item of items) {
      setItems((all) => all.map((entry) => entry.id === item.id ? { ...entry, status: "working", progress: 4, error: undefined } : entry));
      try {
        const result = await compressToTarget(item.file, targetBytes, (progress) => setItems((all) => all.map((entry) => entry.id === item.id ? { ...entry, progress } : entry)), "original");
        const resultUrl = URL.createObjectURL(result.blob);
        setItems((all) => all.map((entry) => entry.id === item.id ? { ...entry, status: "done", progress: 100, result: result.blob, resultUrl } : entry));
      } catch (error) {
        setItems((all) => all.map((entry) => entry.id === item.id ? { ...entry, status: "error", error: error instanceof Error ? error.message : "Compression failed." } : entry));
      }
    }
    setBusy(false);
  };

  const downloadAs = async (format: OutputChoice) => {
    if (!downloadItem?.result) return;
    setPreparingFormat(format);
    const { compressToTarget, saveBlob } = await import("@/lib/client-image");
    const mimeType = `image/${format === "jpg" ? "jpeg" : format}` as "image/jpeg" | "image/png" | "image/webp";
    const targetBytes = target * (unit === "KB" ? 1024 : 1024 * 1024);
    try {
      const blob = downloadItem.result.type === mimeType
        ? downloadItem.result
        : (await compressToTarget(downloadItem.file, targetBytes, undefined, mimeType)).blob;
      const stem = downloadItem.file.name.replace(/\.[^.]+$/, "");
      saveBlob(blob, `${stem}-pixsqueeze.${format}`);
      setDownloadItem(null);
    } catch (error) {
      setDownloadError(error instanceof Error ? error.message : "This format could not be prepared.");
    } finally {
      setPreparingFormat(null);
    }
  };

  return (
    <>
    <section id="compress" className="surface mx-auto max-w-5xl overflow-hidden" aria-label="Image compressor">
      <div className="border-b border-line bg-white px-6 py-6 sm:px-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><span className="eyebrow">Private by design</span><h2 className="mt-1 text-xl font-extrabold">{heading ?? "Choose your images"}</h2></div>
          <span className="inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1.5 text-xs font-bold text-moss"><LockKeyhole size={14} /> Never uploaded</span>
        </div>
      </div>
      <div className="p-4 sm:p-8">
        {items.length === 0 && <button type="button" onClick={() => inputRef.current?.click()} onDragEnter={(e) => { e.preventDefault(); setDragging(true); }} onDragOver={(e) => e.preventDefault()} onDragLeave={() => setDragging(false)} onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }} className={`group grid min-h-56 w-full place-items-center rounded-3xl border-2 border-dashed p-7 text-center transition ${dragging ? "border-moss bg-mint/70" : "border-slate-300 bg-slate-50/70 hover:border-moss hover:bg-mint/30"}`}>
          <span>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-ink text-white shadow-lg transition group-hover:-translate-y-1"><UploadCloud size={26} /></span>
            <span className="mt-4 block text-lg font-extrabold">Drop images here, or click to browse</span>
            <span className="mt-2 block text-sm text-slate-500">JPG, PNG, WebP or HEIC · add several at once</span>
          </span>
        </button>}
        <input ref={inputRef} type="file" multiple accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif" className="sr-only" onChange={(event) => { if (event.target.files) addFiles(event.target.files); event.currentTarget.value = ""; }} />

        {items.length > 0 && (
          <div className="rounded-3xl border border-line bg-slate-50/70 p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-4 px-1">
              <p className="text-sm font-extrabold">{items.length} {items.length === 1 ? "image" : "images"} selected</p>
              <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-2 rounded-full bg-mint px-3 py-2 text-xs font-bold text-moss"><Plus size={14} /> Add more</button>
            </div>
            <div className="max-h-52 space-y-2 overflow-y-auto pr-1">
            {items.map((item) => (
              <article key={item.id} className="rounded-2xl border border-line bg-white p-3 sm:p-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <img className="h-14 w-14 rounded-xl bg-slate-100 object-cover sm:h-16 sm:w-16" src={item.resultUrl ?? item.sourceUrl} alt={`Preview of ${item.file.name}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{item.file.name}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span>{prettyBytes(item.file.size)}</span>
                      {item.result && <><ArrowDown size={12} className="text-moss" /><span className="font-bold text-moss">{prettyBytes(item.result.size)}</span><span className="rounded bg-mint px-1.5 py-0.5 font-bold uppercase text-moss">{item.result.type.split("/")[1]?.replace("jpeg", "jpg")}</span><span className="rounded bg-mint px-1.5 py-0.5 font-bold text-moss">{Math.max(0, Math.round((1 - item.result.size / item.file.size) * 100))}% smaller</span></>}
                    </div>
                    {item.status === "working" && <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-coral transition-all" style={{ width: `${item.progress}%` }} /></div>}
                    {item.error && <p className="mt-1 text-xs font-semibold text-red-600">{item.error}</p>}
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    {item.status === "done" && <button onClick={() => { setDownloadError(null); setDownloadItem(item); }} className="grid h-10 w-10 place-items-center rounded-xl bg-moss text-white" aria-label={`Choose format and download ${item.file.name}`}><Download size={18} /></button>}
                    <button disabled={busy} onClick={() => remove(item.id)} className="grid h-10 w-10 place-items-center rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-40" aria-label={`Delete ${item.file.name}`}><Trash2 size={18} /></button>
                  </div>
                </div>
              </article>
            ))}
            </div>
          </div>
        )}

        <div className="mt-5 grid gap-4 rounded-2xl bg-ink p-5 text-white sm:p-6 md:grid-cols-[1fr_auto] md:items-end md:gap-5">
          <label className="block flex-1">
            <span className="text-sm font-bold">Target file size</span>
            <span className="mt-1 block text-xs text-white/60">We aim for the closest result at or below your limit.</span>
            <span className="mt-3 flex overflow-hidden rounded-xl bg-white">
              <input min="1" step="1" type="number" value={target} onChange={(e) => setTarget(Number(e.target.value))} className="min-w-0 flex-1 bg-transparent px-4 py-3 font-extrabold text-ink outline-none" aria-label="Target file size" />
              <select value={unit} onChange={(e) => setUnit(e.target.value as "KB" | "MB")} className="border-l border-line bg-white px-4 font-bold text-ink outline-none" aria-label="File size unit"><option>KB</option><option>MB</option></select>
            </span>
          </label>
          <button disabled={!items.length || busy || target <= 0} onClick={compressAll} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-coral px-7 py-3.5 font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto">
            {busy ? <><Sparkles className="animate-pulse" size={18} /> Squeezing…</> : items.every((item) => item.status === "done") && items.length ? <><Check size={18} /> Compress again</> : <><ImageIcon size={18} /> Compress images</>}
          </button>
        </div>
      </div>
    </section>
    {downloadItem && (
      <div className="fixed inset-0 z-50 grid place-items-center bg-ink/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="download-format-title" onMouseDown={() => { if (!preparingFormat) setDownloadItem(null); }}>
        <div className="w-full max-w-md rounded-[1.75rem] border border-white/20 bg-white p-6 shadow-2xl sm:p-8" onMouseDown={(event) => event.stopPropagation()}>
          <div className="flex items-start gap-4">
            <img src={downloadItem.resultUrl ?? downloadItem.sourceUrl} alt={`Preview of ${downloadItem.file.name}`} className="h-16 w-16 rounded-2xl bg-slate-100 object-cover" />
            <div className="min-w-0 flex-1"><p className="eyebrow">Ready to save</p><h2 id="download-format-title" className="mt-1 text-2xl font-extrabold">Choose a format</h2><p className="mt-1 truncate text-xs text-slate-500">{downloadItem.file.name}</p></div>
            <button disabled={Boolean(preparingFormat)} onClick={() => setDownloadItem(null)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200" aria-label="Close download options"><X size={17} /></button>
          </div>
          <p className="mt-6 text-sm leading-6 text-slate-600">Select the file type you need. PixSqueeze will prepare that format while keeping it within your target size.</p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {(["jpg", "png", "webp"] as OutputChoice[]).map((format) => (
              <button key={format} disabled={Boolean(preparingFormat)} onClick={() => downloadAs(format)} className="rounded-2xl border border-line bg-slate-50 px-3 py-5 text-center transition hover:-translate-y-0.5 hover:border-moss hover:bg-mint disabled:cursor-wait disabled:opacity-60">
                <span className="block text-lg font-extrabold uppercase text-ink">{format}</span>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">{preparingFormat === format ? "Preparing…" : "Download"}</span>
              </button>
            ))}
          </div>
          {downloadError && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{downloadError}</p>}
          <p className="mt-5 text-center text-xs leading-5 text-slate-400">JPG uses a white background for transparent areas. PNG may require smaller dimensions at strict limits.</p>
        </div>
      </div>
    )}
    </>
  );
}
