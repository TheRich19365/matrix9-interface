import React from "react";
import { Crown, Eye, Flame, Heart, MessagesSquare, Moon, Mountain, Sparkles, Star } from "lucide-react";

const iconMap = { Crown, Eye, Flame, Heart, MessagesSquare, Moon, Mountain, Sparkles, Star };

export default function GateCard({ gate, count, status, selected, onSelect }) {
  const Icon = iconMap[gate.symbol] || Star;
  const centerPulse = gate.number === 5 ? "motion-safe:animate-[gatePulse_7s_ease-in-out_infinite]" : "";
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-expanded={selected}
      className={`group min-h-[136px] rounded-3xl border p-3 text-left transition focus:outline-none focus:ring-4 focus:ring-cyan-200/30 ${status.tone} ${selected ? "ring-2 ring-amber-200/60" : ""} ${centerPulse}`}
    >
      <div className={`mb-3 rounded-2xl bg-gradient-to-br ${gate.color} p-3`}>
        <div className="flex items-start justify-between">
          <Icon className="h-6 w-6 text-amber-100" />
          <span className="rounded-full border border-white/15 bg-slate-950/40 px-2 py-0.5 text-xs">x{count}</span>
        </div>
        <div className="mt-3">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-slate-300">Gate {gate.number}</p>
          <h3 className="text-lg font-black leading-tight">{gate.name}</h3>
          <p className="mt-1 text-xs leading-5 text-slate-200">{gate.thaiName}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-slate-300">{gate.keyword}</span>
        <span className="rounded-full border border-white/15 bg-slate-950/40 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.12em]">{status.short}</span>
      </div>
    </button>
  );
}
