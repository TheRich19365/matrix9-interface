import React from "react";
import { getGateStatus } from "../data/gates.js";

export default function GateDetail({ gate, count }) {
  if (!gate) return null;
  const status = getGateStatus(count);
  return (
    <article className="rounded-[1.4rem] border border-amber-200/20 bg-slate-950/55 p-5 shadow-gold">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-100">Selected Gate</p>
          <h3 className="mt-1 text-2xl font-black">{gate.number} {gate.name}</h3>
          <p className="text-amber-100">{gate.thaiName}</p>
        </div>
        <span className="rounded-full border border-amber-200/30 bg-amber-200/10 px-3 py-1 text-xs font-bold text-amber-100">{status.label} · x{count}</span>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
          <h4 className="font-bold text-amber-100">Core Gift</h4>
          <p className="mt-2 text-sm leading-7 text-slate-200">{gate.coreGift}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
          <h4 className="font-bold text-fuchsia-100">Shadow Pattern</h4>
          <p className="mt-2 text-sm leading-7 text-slate-200">{gate.shadowPattern}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
          <h4 className="font-bold text-cyan-100">Story</h4>
          <p className="mt-2 text-sm leading-7 text-slate-200">{gate.story}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
          <h4 className="font-bold text-amber-100">Activation Key</h4>
          <p className="mt-2 text-sm leading-7 text-slate-200">{gate.activationKey}</p>
        </div>
      </div>
      <p className="mt-4 rounded-2xl border border-white/10 bg-slate-950/50 p-3 text-xs leading-6 text-slate-300">{status.description}</p>
    </article>
  );
}
