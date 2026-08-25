"use client";
/* eslint-disable @next/next/no-img-element -- previews use local blob URLs that next/image cannot optimize */

import { useMemo, useRef, useState } from "react";
import { Download, LockKeyhole, Trash2, UploadCloud, WandSparkles } from "lucide-react";

type Mode = "resize" | "passport" | "jpg" | "png" | "webp" | "pdf";
type Item = { id: string; file: File; url: string; result?: Blob; resultUrl?: string; error?: string };

const fmt = (bytes: number) => bytes < 1048576 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / 1048576).toFixed(2)} MB`;
const configs = {
  resize: { title: "Resize by pixel dimensions", action: "Resize image", acceptMany: false },
  passport: { title: "Create a passport-size photo", action: "Crop & resize", acceptMany: false },
  jpg: { title: "Convert images to JPG", action: "Convert to JPG", acceptMany: true },
  png: { title: "Convert images to PNG", action: "Convert to PNG", acceptMany: true },
  webp: { title: "Convert images to WebP", action: "Convert to WebP", acceptMany: true },
  pdf: { title: "Combine images into a PDF", action: "Create PDF", acceptMany: true },
} as const;

const passportPresets = [
  {
    name: "US Visa",
    dimensions: "2 × 2 in · square",
    width: 600,
    height: 600,
    targetKb: 240,
    targetLabel: "Maximum 240KB",
    guide: "Outputs a 600 × 600px JPEG. U.S. visa digital photos allow 600–1200px square images and must be 240KB or smaller.",
    source: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos/digital-image-requirements.html",
  },
  {
    name: "Indian Passport",
    dimensions: "35 × 45 mm",
    width: 413,
    height: 531,
    targetKb: 50,
    targetLabel: "50KB working target",
    guide: "Uses the 35 × 45mm print ratio at 300dpi. The 50KB target is common on some portals, not a universal Passport Seva digital limit—verify your application channel.",
    source: "https://www.passportindia.gov.in/psp/Apply",
  },
  {
    name: "UK Passport",
    dimensions: "35 × 45 mm",
    width: 413,
    height: 531,
    targetKb: null,
    targetLabel: "File limit varies by submission method",
    guide: "Uses the requested 35 × 45mm printed-photo ratio at 300dpi. UK online passport uploads use separate digital-photo rules, so enter the limit shown by your application channel.",
    source: "https://www.gov.uk/photos-for-passports",
  },
  {
    name: "Schengen Visa",
    dimensions: "35 × 45 mm",
    width: 413,
    height: 531,
    targetKb: null,
    targetLabel: "File limit varies by portal",
    guide: "Uses the common 35 × 45mm ratio at 300dpi. Schengen rules require an ICAO-compliant photo, but digital file-size limits vary by country, consulate and application portal.",
    source: "https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en",
  },
] as const;

export function ToolWorkbench({ mode }: { mode: Mode }) {
  const config = configs[mode];
  const [items, setItems] = useState<Item[]>([]);
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(800);
  const [lockRatio, setLockRatio] = useState(true);
  const [ratio, setRatio] = useState(1.5);
  const [passport, setPassport] = useState(0);
  const [passportTargetKb, setPassportTargetKb] = useState<string>(String(passportPresets[0].targetKb));
  const [busy, setBusy] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob>();
  const inputRef = useRef<HTMLInputElement>(null);
  const isConvert = ["jpg", "png", "webp"].includes(mode);
  const canRun = items.length > 0 && !busy;

  const addFiles = (files: FileList) => {
    const selected = Array.from(files).filter((file) => file.type.startsWith("image/")).slice(0, config.acceptMany ? 30 : 1);
    if (!selected.length) return;
    const next = selected.map((file) => ({ id: crypto.randomUUID(), file, url: URL.createObjectURL(file) }));
    setItems((old) => config.acceptMany ? [...old, ...next] : next);
    if (mode === "resize") {
      const image = new Image();
      image.onload = () => { setWidth(image.naturalWidth); setHeight(image.naturalHeight); setRatio(image.naturalWidth / image.naturalHeight); };
      image.src = next[0].url;
    }
  };

  const remove = (id: string) => setItems((old) => old.filter((item) => item.id !== id));

  const run = async () => {
    if (!canRun) return;
    setBusy(true); setPdfBlob(undefined);
    try {
      const { cropImageToTarget, transformImage } = await import("@/lib/client-image");
      if (mode === "pdf") {
        const { jsPDF } = await import("jspdf");
        const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });
        for (let i = 0; i < items.length; i++) {
          const result = await transformImage(items[i].file, { format: "image/jpeg", quality: 0.88 });
          const dataUrl = await new Promise<string>((resolve) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.readAsDataURL(result.blob); });
          if (i > 0) pdf.addPage();
          const pageW = 210, pageH = 297, margin = 12;
          const scale = Math.min((pageW - margin * 2) / result.width, (pageH - margin * 2) / result.height);
          const drawW = result.width * scale, drawH = result.height * scale;
          pdf.addImage(dataUrl, "JPEG", (pageW - drawW) / 2, (pageH - drawH) / 2, drawW, drawH, undefined, "FAST");
        }
        setPdfBlob(pdf.output("blob"));
      } else {
        const type = mode === "jpg" ? "image/jpeg" : mode === "png" ? "image/png" : mode === "webp" ? "image/webp" : "image/jpeg";
        const preset = passportPresets[passport];
        for (const item of items) {
          try {
            const result = mode === "passport"
              ? await cropImageToTarget(item.file, {
                  width: preset.width,
                  height: preset.height,
                  targetBytes: Number(passportTargetKb) > 0 ? Number(passportTargetKb) * 1024 : undefined,
                })
              : await transformImage(item.file, {
                  width: mode === "resize" ? width : undefined,
                  height: mode === "resize" ? height : undefined,
                  format: type,
                  quality: type === "image/png" ? undefined : 0.9,
                });
            const resultUrl = URL.createObjectURL(result.blob);
            setItems((all) => all.map((entry) => entry.id === item.id ? { ...entry, result: result.blob, resultUrl, error: undefined } : entry));
          } catch (error) { setItems((all) => all.map((entry) => entry.id === item.id ? { ...entry, error: error instanceof Error ? error.message : "Processing failed" } : entry)); }
        }
      }
    } catch { setItems((all) => all.map((item) => ({ ...item, error: "We could not process that file in this browser." }))); }
    setBusy(false);
  };

  const outputExtension = useMemo(() => mode === "resize" || mode === "passport" ? "jpg" : mode, [mode]);
  const downloadItem = async (item: Item) => {
    if (!item.result) return;
    const { saveBlob } = await import("@/lib/client-image");
    saveBlob(item.result, `${item.file.name.replace(/\.[^.]+$/, "")}-${mode}.${outputExtension}`);
  };
  const downloadPdf = async () => { if (pdfBlob) { const { saveBlob } = await import("@/lib/client-image"); saveBlob(pdfBlob, "pixsqueeze-images.pdf"); } };

  return (
    <section className="surface mx-auto max-w-4xl overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-6 sm:px-9"><h2 className="text-xl font-extrabold">{config.title}</h2><span className="inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1.5 text-xs font-bold text-moss"><LockKeyhole size={14} /> Browser-only</span></div>
      <div className="p-4 sm:p-8">
        <button onClick={() => inputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }} className="grid min-h-48 w-full place-items-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-6 text-center transition hover:border-moss hover:bg-mint/30">
          <span><span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-ink text-white"><UploadCloud size={23} /></span><strong className="mt-4 block">Drop {config.acceptMany ? "images" : "an image"} here, or click to browse</strong><span className="mt-1 block text-xs text-slate-500">JPG, PNG, WebP or HEIC</span></span>
        </button>
        <input ref={inputRef} className="sr-only" type="file" accept="image/*,.heic,.heif" multiple={config.acceptMany} onChange={(e) => e.target.files && addFiles(e.target.files)} />

        {items.length > 0 && <div className="mt-5 space-y-3">{items.map((item) => <div key={item.id} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-3"><img src={item.resultUrl ?? item.url} alt={`Preview of ${item.file.name}`} className={`h-14 w-14 bg-slate-100 ${mode === "passport" ? "object-cover" : "object-contain"} rounded-xl`} /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{item.file.name}</p><p className="mt-1 text-xs text-slate-500">{fmt(item.file.size)}{item.result ? ` → ${fmt(item.result.size)}` : ""}</p>{item.error && <p className="mt-1 text-xs font-semibold text-red-600">{item.error}</p>}</div>{item.result ? <button onClick={() => downloadItem(item)} className="grid h-10 w-10 place-items-center rounded-xl bg-moss text-white" aria-label={`Download ${item.file.name}`}><Download size={18} /></button> : <button onClick={() => remove(item.id)} className="grid h-10 w-10 place-items-center rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-600" aria-label={`Remove ${item.file.name}`}><Trash2 size={18} /></button>}</div>)}</div>}

        {mode === "resize" && <div className="mt-6 grid gap-4 rounded-2xl bg-slate-50 p-5 sm:grid-cols-[1fr_auto_1fr]"><label className="text-sm font-bold">Width (px)<input className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3" type="number" min="1" value={width} onChange={(e) => { const value = Number(e.target.value); setWidth(value); if (lockRatio) setHeight(Math.round(value / ratio)); }} /></label><button onClick={() => setLockRatio(!lockRatio)} className={`mt-7 h-11 rounded-xl px-3 text-xs font-bold ${lockRatio ? "bg-mint text-moss" : "bg-white text-slate-500"}`} aria-pressed={lockRatio}>Ratio {lockRatio ? "on" : "off"}</button><label className="text-sm font-bold">Height (px)<input className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3" type="number" min="1" value={height} onChange={(e) => { const value = Number(e.target.value); setHeight(value); if (lockRatio) setWidth(Math.round(value * ratio)); }} /></label></div>}
        {mode === "passport" && <div className="mt-6 rounded-2xl bg-slate-50 p-5">
          <label className="text-sm font-bold">Country or visa preset
            <select value={passport} onChange={(e) => { const index = Number(e.target.value); setPassport(index); setPassportTargetKb(passportPresets[index].targetKb === null ? "" : String(passportPresets[index].targetKb)); }} className="mt-2 block w-full rounded-xl border border-line bg-white px-4 py-3">
              {passportPresets.map((preset, index) => <option value={index} key={preset.name}>{preset.name} · {preset.dimensions}</option>)}
            </select>
          </label>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-line bg-white px-4 py-3"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Output dimensions</p><p className="mt-1 font-extrabold">{passportPresets[passport].width} × {passportPresets[passport].height}px</p></div>
            <label className="rounded-xl border border-line bg-white px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">Target file size (KB)
              <input className="mt-1 block w-full text-base font-extrabold normal-case tracking-normal text-ink outline-none" min="1" placeholder="Portal-specific" type="number" value={passportTargetKb} onChange={(event) => setPassportTargetKb(event.target.value)} />
            </label>
          </div>
          {items[0] && <div className="mt-4 flex items-center gap-4 rounded-xl border border-line bg-white p-4">
            <div className="relative h-28 shrink-0 overflow-hidden rounded-lg bg-slate-100" style={{ aspectRatio: `${passportPresets[passport].width} / ${passportPresets[passport].height}` }}>
              <img src={items[0].url} alt={`${passportPresets[passport].name} center-crop preview`} className="h-full w-full object-cover" />
              <span className="pointer-events-none absolute inset-2 rounded-full border border-dashed border-white/90 shadow-[0_0_0_999px_rgba(15,23,42,.15)]" />
            </div>
            <div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Crop guide</p><p className="mt-1 text-sm font-extrabold">Centered {passportPresets[passport].dimensions}</p><p className="mt-1 text-xs leading-5 text-slate-500">The download uses this center crop. Reposition the source before adding it if the face is not centered.</p></div>
          </div>}
          <p className="mt-4 text-sm font-extrabold text-moss">{passportPresets[passport].targetLabel}</p>
          <p className="mt-2 text-xs leading-5 text-slate-500">{passportPresets[passport].guide} The image is center-cropped; this tool does not certify biometric acceptance.</p>
          <a className="mt-3 inline-block text-xs font-bold text-moss underline" href={passportPresets[passport].source} rel="noreferrer" target="_blank">Check official guidance</a>
        </div>}
        {isConvert && <div className="mt-6 rounded-2xl bg-mint/50 p-4 text-sm leading-6 text-moss"><strong>Quality note:</strong> conversion changes the file format, not the original. JPG removes transparency; PNG can be larger; WebP is often the lightest choice for the web.</div>}
        {mode === "pdf" && <div className="mt-6 rounded-2xl bg-mint/50 p-4 text-sm leading-6 text-moss"><strong>Page order:</strong> images appear in the same order shown above, one image per A4 page. Nothing is sent to a server.</div>}

        <button disabled={!canRun} onClick={run} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-coral px-6 py-4 font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 disabled:opacity-50"><WandSparkles size={18} /> {busy ? "Working…" : config.action}</button>
        {pdfBlob && <button onClick={downloadPdf} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-moss px-6 py-4 font-extrabold text-white"><Download size={18} /> Download PDF · {fmt(pdfBlob.size)}</button>}
      </div>
    </section>
  );
}
