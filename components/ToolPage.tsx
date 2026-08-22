import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ToolWorkbench } from "./ToolWorkbench";
import { AdSlot } from "./AdSlot";
import { ToolLinks } from "./ToolLinks";

type Mode = "resize" | "passport" | "jpg" | "png" | "webp" | "pdf";

export function ToolPage({ mode, eyebrow, title, accent, description, benefits, children }: { mode: Mode; eyebrow: string; title: string; accent: string; description: string; benefits: string[]; children: React.ReactNode }) {
  return <>
    <section className="container-shell pb-10 pt-14 text-center sm:pt-20"><p className="eyebrow">{eyebrow}</p><h1 className="display mx-auto mt-4 max-w-4xl text-4xl leading-tight sm:text-6xl">{title} <span className="text-moss">{accent}</span></h1><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">{description}</p></section>
    <div className="container-shell"><ToolWorkbench mode={mode} /></div>
    <div className="container-shell mt-10"><AdSlot /></div>
    <section className="container-shell mt-20"><div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-[1fr_.75fr]"><article className="prose-pix">{children}</article><aside><div className="sticky top-8 rounded-3xl bg-ink p-7 text-white"><p className="eyebrow !text-mint">Good to know</p><ul className="mt-5 space-y-4">{benefits.map((benefit) => <li className="flex gap-3 text-sm leading-6 text-white/75" key={benefit}><CheckCircle2 className="mt-0.5 shrink-0 text-coral" size={18} />{benefit}</li>)}</ul><Link href="/privacy-policy" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-mint">How privacy works <ArrowRight size={15} /></Link></div></aside></div></section>
    <section className="container-shell mt-20"><p className="eyebrow">Keep editing</p><h2 className="display mt-2 text-3xl">More free image tools</h2><div className="mt-6"><ToolLinks /></div></section>
  </>;
}
