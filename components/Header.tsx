import Link from "next/link";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="border-b border-line/80 bg-cream/80 backdrop-blur-md">
      <div className="container-shell flex h-20 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex" aria-label="Primary navigation">
          <Link className="transition hover:text-moss" href="/#sizes">Target sizes</Link>
          <Link className="transition hover:text-moss" href="/#formats">Formats</Link>
          <Link className="transition hover:text-moss" href="/check">Check size</Link>
          <Link className="transition hover:text-moss" href="/guides">Guides</Link>
          <Link className="transition hover:text-moss" href="/about">About</Link>
        </nav>
        <Link href="/#compress" className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-moss">
          Compress now
        </Link>
      </div>
    </header>
  );
}
