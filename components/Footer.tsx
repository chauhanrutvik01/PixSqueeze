import Link from "next/link";
import { Logo } from "./Logo";
import { AnalyticsSettingsButton } from "./GoogleAnalytics";
import { sizeSlugs, toolLinks } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-white/70">
      <div className="container-shell grid gap-12 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">Fast, thoughtful image tools that work locally in your browser. Your files stay yours.</p>
        </div>
        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-ink">Popular sizes</h2>
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-600">
            {sizeSlugs.slice(0, 8).map((size) => <Link className="hover:text-moss" key={size} href={`/compress-image-to-${size}`}>{size.toUpperCase()}</Link>)}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-ink">Explore</h2>
          <div className="mt-4 grid gap-2 text-sm text-slate-600">
            {toolLinks.slice(0, 3).map((tool) => <Link className="hover:text-moss" key={tool.href} href={tool.href}>{tool.label}</Link>)}
            <Link className="hover:text-moss" href="/privacy-policy">Privacy policy</Link>
            <AnalyticsSettingsButton />
            <Link className="hover:text-moss" href="/terms-of-use">Terms of use</Link>
            <Link className="hover:text-moss" href="/contact">Contact</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-line py-6 text-center text-xs text-slate-500">© {new Date().getFullYear()} PixSqueeze. Built for smaller files and calmer uploads.</div>
    </footer>
  );
}
