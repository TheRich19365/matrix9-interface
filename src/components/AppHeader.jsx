import React from "react";
import { contactLinks } from "../data/contactLinks.js";
import { EmailAction, ExternalContactLink, LineAction } from "./contactActions.jsx";

export default function AppHeader({ onCopyLine, copied }) {
  return (
    <nav className="rounded-[1.25rem] border border-white/10 bg-slate-950/60 p-2.5 shadow-aura backdrop-blur-xl sm:p-3" aria-label="Soul of Love navigation">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-2xl border border-amber-200/35 bg-gradient-to-br from-amber-200/20 via-white/[0.06] to-cyan-200/10 text-xs font-black text-amber-100 shadow-gold sm:h-12 sm:w-12 sm:text-sm">
            M9
          </div>
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-cyan-100 sm:text-[0.68rem]">MATRIX 9</p>
            <h2 className="text-sm font-black leading-tight text-white sm:text-base">Living Soul Map</h2>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-slate-400">Soul of Love Ecosystem</p>
          <div className="flex flex-wrap items-center gap-1.5 sm:justify-end sm:gap-2">
            <ExternalContactLink href={contactLinks.portfolio.url} className="min-h-10 px-3 py-1.5 text-xs sm:text-sm">{contactLinks.portfolio.label}</ExternalContactLink>
            <ExternalContactLink href={contactLinks.dailyEnergy.url} className="min-h-10 px-3 py-1.5 text-xs sm:text-sm">{contactLinks.dailyEnergy.label}</ExternalContactLink>
            <ExternalContactLink href={contactLinks.thaiWisdom.url} className="min-h-10 px-3 py-1.5 text-xs sm:text-sm">{contactLinks.thaiWisdom.label}</ExternalContactLink>
            <LineAction onCopyLine={onCopyLine} copied={copied} className="min-h-10 px-3 py-1.5 text-xs sm:min-h-11 sm:text-sm">LINE OA</LineAction>
            <EmailAction className="min-h-10 px-3 py-1.5 text-xs sm:min-h-11 sm:text-sm" />
          </div>
          <p className="text-[0.68rem] leading-4 text-slate-500">สำรวจเครื่องมืออื่นในจักรวาล Soul of Love</p>
        </div>
      </div>
    </nav>
  );
}
