"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { FileImage, LockKeyhole, RefreshCw, Ruler, UploadCloud } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type ImageDetails = {
  name: string;
  bytes: number;
  type: string;
  width?: number;
  height?: number;
};

const formatBytes = (bytes: number) => bytes < 1024 * 1024
  ? `${(bytes / 1024).toFixed(bytes < 10240 ? 2 : 1)} KB`
  : `${(bytes / 1024 / 1024).toFixed(2)} MB`;

export function ImageSizeChecker() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [details, setDetails] = useState<ImageDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function inspect(file: File) {
    setError(null);
    const next: ImageDetails = { name: file.name, bytes: file.size, type: file.type || "Unknown image type" };
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
      next.width = bitmap.width;
      next.height = bitmap.height;
      bitmap.close();
    } catch {
      setError("File size and format are available, but this browser could not read the image dimensions.");
    }
    setDetails(next);
    trackEvent("image_size_checked", { file_type: next.type, dimensions_available: Boolean(next.width) });
  }

  function reset() {
    setDetails(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <section className="surface mx-auto max-w-4xl overflow-hidden" aria-label="Image size checker">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-white px-6 py-6 sm:px-9">
        <div><p className="eyebrow">Instant file details</p><h2 className="mt-1 text-xl font-extrabold">Choose an image to inspect</h2></div>
        <span className="inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1.5 text-xs font-bold text-moss"><LockKeyhole size={14} /> Never uploaded</span>
      </div>
      <div className="p-5 sm:p-8">
        {!details ? (
          <button
            className="grid min-h-56 w-full place-items-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-7 text-center transition hover:border-moss hover:bg-mint/30"
            onClick={() => inputRef.current?.click()}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => { event.preventDefault(); const file = event.dataTransfer.files[0]; if (file) void inspect(file); }}
            type="button"
          >
            <span><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-ink text-white"><UploadCloud size={26} /></span><span className="mt-4 block text-lg font-extrabold">Drop an image here, or click to browse</span><span className="mt-2 block text-sm text-slate-500">The file stays on your device</span></span>
          </button>
        ) : (
          <div>
            <div className="rounded-3xl bg-ink p-6 text-white sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4"><div className="min-w-0"><p className="eyebrow !text-mint">Image inspected</p><h2 className="mt-2 truncate text-xl font-extrabold">{details.name}</h2></div><button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold hover:bg-white/20" onClick={reset} type="button"><RefreshCw size={15} /> Check another</button></div>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/10 p-5"><FileImage className="text-coral" size={20} /><p className="mt-4 text-xs font-bold uppercase tracking-widest text-white/50">File size</p><p className="mt-1 text-2xl font-extrabold">{formatBytes(details.bytes)}</p><p className="mt-1 text-xs text-white/45">{details.bytes.toLocaleString()} bytes</p></div>
                <div className="rounded-2xl bg-white/10 p-5"><Ruler className="text-coral" size={20} /><p className="mt-4 text-xs font-bold uppercase tracking-widest text-white/50">Dimensions</p><p className="mt-1 text-2xl font-extrabold">{details.width && details.height ? `${details.width} × ${details.height}` : "Unavailable"}</p><p className="mt-1 text-xs text-white/45">{details.width && details.height ? `${((details.width * details.height) / 1_000_000).toFixed(2)} megapixels` : "Browser could not decode"}</p></div>
                <div className="rounded-2xl bg-white/10 p-5"><FileImage className="text-coral" size={20} /><p className="mt-4 text-xs font-bold uppercase tracking-widest text-white/50">Format</p><p className="mt-1 break-all text-xl font-extrabold">{details.type.replace("image/", "").toUpperCase()}</p><p className="mt-1 text-xs text-white/45">Detected from the file</p></div>
              </div>
            </div>
            {error && <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">{error}</p>}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-moss/15 bg-mint/50 p-5"><div><p className="font-extrabold">Need a smaller file?</p><p className="mt-1 text-sm text-slate-600">Set any KB or MB limit and compress it privately.</p></div><Link className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white" href="/#compress">Open image compressor</Link></div>
          </div>
        )}
        <input ref={inputRef} className="sr-only" type="file" accept="image/*,.heic,.heif" onChange={(event) => { const file = event.target.files?.[0]; if (file) void inspect(file); }} />
      </div>
    </section>
  );
}
