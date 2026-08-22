export type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

export type ProcessResult = {
  blob: Blob;
  width: number;
  height: number;
  quality?: number;
};

const canvasBlob = (canvas: HTMLCanvasElement, type: string, quality?: number) =>
  new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Your browser could not encode this image.")), type, quality);
  });

async function normalizeInput(file: File): Promise<Blob> {
  const isHeic = /heic|heif/i.test(file.type) || /\.hei[cf]$/i.test(file.name);
  if (!isHeic) return file;
  const { default: heic2any } = await import("heic2any");
  const converted = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.94 });
  return Array.isArray(converted) ? converted[0] : converted;
}

async function loadBitmap(file: File | Blob) {
  const blob = file instanceof File ? await normalizeInput(file) : file;
  return createImageBitmap(blob, { imageOrientation: "from-image" });
}

function makeCanvas(bitmap: ImageBitmap, width: number, height: number, crop = false, whiteBackground = false) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) throw new Error("Canvas is not supported by this browser.");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  if (whiteBackground) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  if (crop) {
    const sourceRatio = bitmap.width / bitmap.height;
    const targetRatio = width / height;
    let sx = 0, sy = 0, sw = bitmap.width, sh = bitmap.height;
    if (sourceRatio > targetRatio) { sw = bitmap.height * targetRatio; sx = (bitmap.width - sw) / 2; }
    else { sh = bitmap.width / targetRatio; sy = (bitmap.height - sh) / 2; }
    ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  } else {
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  }
  return canvas;
}

export async function compressToTarget(file: File, targetBytes: number, onProgress?: (value: number) => void, outputFormat: OutputFormat | "original" = "original"): Promise<ProcessResult> {
  const browserEncodableInput = (["image/jpeg", "image/png", "image/webp"] as string[]).includes(file.type);
  const type: OutputFormat = outputFormat === "original"
    ? (file.type === "image/png" ? "image/png" : file.type === "image/webp" ? "image/webp" : "image/jpeg")
    : outputFormat;
  if (file.size <= targetBytes && browserEncodableInput && (outputFormat === "original" || outputFormat === file.type)) {
    return { blob: file, width: 0, height: 0, quality: 1 };
  }
  const bitmap = await loadBitmap(file);
  let width = bitmap.width;
  let height = bitmap.height;
  let best: Blob | null = null;
  let bestQuality = 0.82;

  // PNG encoding is lossless: browsers ignore the quality argument. Search the
  // pixel scale directly so the result lands as close as possible below target.
  if (type === "image/png") {
    const fullSize = await canvasBlob(makeCanvas(bitmap, bitmap.width, bitmap.height), type);
    onProgress?.(12);
    if (fullSize.size <= targetBytes) {
      bitmap.close();
      onProgress?.(100);
      return { blob: fullSize, width, height };
    }

    let lowScale = 0;
    let highScale = 1;
    let bestWidth = 0;
    let bestHeight = 0;
    for (let step = 0; step < 15; step++) {
      const scale = (lowScale + highScale) / 2;
      const candidateWidth = Math.max(1, Math.round(bitmap.width * scale));
      const candidateHeight = Math.max(1, Math.round(bitmap.height * scale));
      const candidate = await canvasBlob(makeCanvas(bitmap, candidateWidth, candidateHeight), type);
      if (candidate.size <= targetBytes) {
        if (!best || candidate.size > best.size) {
          best = candidate;
          bestWidth = candidateWidth;
          bestHeight = candidateHeight;
        }
        lowScale = scale;
      } else {
        highScale = scale;
      }
      onProgress?.(Math.min(96, 16 + step * 5));
    }
    bitmap.close();
    if (!best) throw new Error("This PNG cannot reach that target while remaining a valid image. Try a larger target or choose JPG/WebP.");
    onProgress?.(100);
    return { blob: best, width: bestWidth, height: bestHeight };
  }

  for (let scalePass = 0; scalePass < 8; scalePass++) {
    const canvas = makeCanvas(bitmap, width, height, false, type === "image/jpeg");
    let low = 0.05;
    let high = 0.96;
    for (let step = 0; step < 9; step++) {
      const quality = (low + high) / 2;
      const candidate = await canvasBlob(canvas, type, quality);
      if (candidate.size <= targetBytes) {
        if (!best || candidate.size > best.size) { best = candidate; bestQuality = quality; }
        low = quality;
      } else high = quality;
      onProgress?.(Math.min(94, 8 + scalePass * 11 + step));
    }
    if (best) break;
    const ratio = Math.max(0.55, Math.sqrt(targetBytes / Math.max(file.size, 1)) * 0.94);
    width = Math.max(160, Math.round(width * ratio));
    height = Math.max(160, Math.round(height * ratio));
  }
  bitmap.close();
  if (!best) throw new Error("This image cannot reach that target without becoming extremely small. Try a larger target.");
  onProgress?.(100);
  return { blob: best, width, height, quality: bestQuality };
}

export async function transformImage(file: File, options: { width?: number; height?: number; format?: OutputFormat; quality?: number; crop?: boolean }): Promise<ProcessResult> {
  const bitmap = await loadBitmap(file);
  const width = options.width ?? bitmap.width;
  const height = options.height ?? bitmap.height;
  const type = options.format ?? (file.type as OutputFormat) ?? "image/jpeg";
  const canvas = makeCanvas(bitmap, width, height, options.crop, type === "image/jpeg");
  const blob = await canvasBlob(canvas, type, options.quality ?? 0.9);
  bitmap.close();
  return { blob, width: canvas.width, height: canvas.height, quality: options.quality };
}

export function extensionFor(type: string) {
  if (type.includes("png")) return "png";
  if (type.includes("webp")) return "webp";
  return "jpg";
}

export function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
