import React from "react";
import { Network } from "lucide-react";
import { Section } from "./ui.jsx";

const tones = {
  Active: "border-amber-200/40 bg-amber-200/12 text-amber-50",
  Partial: "border-cyan-200/25 bg-cyan-200/10 text-cyan-50",
  Dormant: "border-white/10 bg-white/[0.035] text-slate-300"
};

export default function PatternLines({ lines }) {
  return (
    <Section title="Pattern Lines" icon={Network}>
      <p className="mb-4 text-slate-300">สถานะเส้นพลัง: Active = เปิดครบ 3 จุด, Partial = เปิดบางส่วน, Dormant = ยังไม่ปรากฏจากชุดตัวเลขนี้</p>
      <div className="grid gap-3 md:grid-cols-2">
        {lines.map((line) => (
          <article key={line.id} className={`rounded-2xl border p-4 ${tones[line.status]}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] opacity-75">{line.type}</p>
                <h3 className="mt-1 font-black">{line.name}</h3>
              </div>
              <span className="rounded-full border border-white/15 bg-slate-950/30 px-2 py-0.5 text-xs font-bold">{line.status}</span>
            </div>
            <p className="mt-2 text-sm">{line.numbers.join("-")} · {line.meaning}</p>
            <p className="mt-2 text-xs leading-6 opacity-85">{line.summary}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
