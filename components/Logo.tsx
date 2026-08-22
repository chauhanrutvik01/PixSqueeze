import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="PixSqueeze home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink shadow-sm" aria-hidden="true">
        <span className="relative block h-4 w-4 rounded-[5px] border-2 border-mint">
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-coral" />
        </span>
      </span>
      <span className="text-lg font-extrabold tracking-[-0.03em]">Pix<span className="text-moss">Squeeze</span></span>
    </Link>
  );
}
