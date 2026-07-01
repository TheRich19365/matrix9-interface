import React from "react";
import { EyeOff } from "lucide-react";
import { zeroMeaning } from "../data/gates.js";
import { Section } from "./ui.jsx";

export default function HiddenPotential({ analysis, hiddenGates }) {
  return (
    <Section title="Hidden Potential" icon={EyeOff}>
      <div className="grid gap-3 md:grid-cols-[0.7fr_1.3fr]">
        <article className="rounded-2xl border border-cyan-200/20 bg-cyan-200/10 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">Void Energy 0</p>
          <p className="mt-2 text-3xl font-black">x{analysis.zeroCount}</p>
          <p className="mt-2 text-sm leading-6 text-slate-200">{zeroMeaning.meaning}</p>
        </article>
        <div className="grid gap-3 sm:grid-cols-2">
          {hiddenGates.map(({ gate }) => (
            <article key={gate.number} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <h3 className="font-bold">{gate.number} {gate.name}</h3>
              <p className="mt-1 text-xs text-fuchsia-100">{gate.thaiName}</p>
              <p className="mt-2 text-sm leading-6">พลังที่ชีวิตกำลังชวนให้พัฒนา: {gate.keyword}</p>
            </article>
          ))}
          {!hiddenGates.length && <p className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">ไม่มี Gate ที่ขาดใน Matrix นี้ พลังแต่ละช่องมีเมล็ดพื้นฐานให้ใช้งาน</p>}
        </div>
      </div>
    </Section>
  );
}
