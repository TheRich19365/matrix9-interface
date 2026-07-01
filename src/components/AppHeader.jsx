import React from "react";
import { contactLinks } from "../data/contactLinks.js";
import { EmailAction, ExternalContactLink, LineAction } from "./contactActions.jsx";

export default function AppHeader({ onCopyLine, copied }) {
  return (
    <nav className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-3 shadow-aura backdrop-blur-xl" aria-label="Soul of Love navigation">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-200/35 bg-gradient-to-br from-amber-200/20 via-white/[0.06] to-cyan-200/10 text-sm font-black text-amber-100 shadow-gold">
            M9
          </div>
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-cyan-100">MATRIX 9</p>
            <h2 className="text-base font-black leading-tight text-white">Living Soul Map</h2>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <LineAction onCopyLine={onCopyLine} copied={copied} className="px-3">LINE OA</LineAction>
          <EmailAction className="px-3" />
          <ExternalContactLink href={contactLinks.portfolio.url}>{contactLinks.portfolio.label}</ExternalContactLink>
        </div>
      </div>
    </nav>
  );
}
