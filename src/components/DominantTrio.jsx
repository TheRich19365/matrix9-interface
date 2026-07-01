import React from "react";
import { Trophy } from "lucide-react";
import { Section } from "./ui.jsx";

export default function DominantTrio({ items }) {
  return (
    <Section title="Dominant Trio" icon={Trophy}>
      <div className="grid gap-3 md:grid-cols-3">
        {items.map(({ gate, count, status }) => (
          <article key={gate.number} className="rounded-2xl border border-amber-200/20 bg-slate-950/45 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-amber-100">Gate {gate.number} · x{count}</p>
            <h3 className="mt-2 text-xl font-black">{gate.name}</h3>
            <p className="mt-1 text-xs text-cyan-100">{status.label}</p>
            <p className="mt-3"><strong>Gift:</strong> {gate.coreGift}</p>
            <p className="mt-2"><strong>Balance:</strong> {gate.shadowPattern}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
