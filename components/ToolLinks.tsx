import Link from "next/link";
import { ArrowUpRight, FileImage, FileStack, ScanLine, Scaling } from "lucide-react";
import { toolLinks } from "@/lib/site";

const icons = [Scaling, ScanLine, FileImage, FileImage, FileImage, FileStack];

export function ToolLinks() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {toolLinks.map((tool, index) => {
        const Icon = icons[index];
        return <Link key={tool.href} href={tool.href} className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-1 hover:border-moss hover:shadow-lg"><span className="grid h-11 w-11 place-items-center rounded-xl bg-mint text-moss"><Icon size={20} /></span><span className="flex-1 font-extrabold">{tool.label}</span><ArrowUpRight className="text-slate-300 transition group-hover:text-coral" size={18} /></Link>;
      })}
    </div>
  );
}
