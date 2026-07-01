import React from "react";
import { Star } from "lucide-react";

export function Section({ title, eyebrow, icon: Icon = Star, children, className = "" }) {
  return (
    <section className={`rounded-[1.4rem] border border-white/10 bg-white/[0.065] p-5 shadow-aura backdrop-blur-xl ${className}`}>
      <div className="mb-3 flex items-center gap-2 text-amber-100">
        <Icon className="h-4 w-4" />
        <div>
          {eyebrow && <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-cyan-100">{eyebrow}</p>}
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">{title}</h2>
        </div>
      </div>
      <div className="text-sm leading-7 text-slate-200">{children}</div>
    </section>
  );
}

export function Chip({ children, tone = "gold", className = "" }) {
  const tones = {
    gold: "border-amber-200/30 bg-amber-200/10 text-amber-100",
    cyan: "border-cyan-200/30 bg-cyan-200/10 text-cyan-100",
    purple: "border-fuchsia-200/30 bg-fuchsia-200/10 text-fuchsia-100",
    slate: "border-white/15 bg-white/[0.06] text-slate-200"
  };
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]} ${className}`}>{children}</span>;
}

export function compact(text = "", max = 150) {
  return text.length > max ? `${text.slice(0, max).trim()}...` : text;
}
