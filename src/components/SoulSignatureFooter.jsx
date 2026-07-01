import React from "react";
import { Music2, Sparkles, Youtube } from "lucide-react";
import { contactLinks } from "../data/contactLinks.js";
import { ConfiguredExternalLink, CopyLineIdAction, EmailAction, ExternalContactLink, LineAction, SupportEmailAction } from "./contactActions.jsx";

export default function SoulSignatureFooter({ onCopyLine, copied }) {
  return (
    <footer className="rounded-[1.55rem] border border-white/10 bg-gradient-to-br from-slate-950/78 via-white/[0.045] to-amber-200/10 p-5 shadow-aura backdrop-blur-xl">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-2 flex items-center gap-2 text-amber-100">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-[0.2em]">Soul Signature</p>
          </div>
          <h2 className="text-2xl font-black">Created by Win Soul of Love</h2>
          <p className="mt-2 text-sm leading-7 text-slate-300">Human insight supported by AI and symbolic systems.</p>
          <p className="mt-1 text-sm leading-7 text-cyan-100">พื้นที่สะท้อนตัวตนผ่าน Pattern การสนทนา และประสบการณ์ของมนุษย์</p>
        </div>
        <div className="flex max-w-xl flex-wrap gap-2 lg:justify-end">
          <LineAction onCopyLine={onCopyLine} copied={copied}>LINE Official</LineAction>
          <CopyLineIdAction onCopyLine={onCopyLine} copied={copied} />
          <EmailAction />
          <ExternalContactLink href={contactLinks.portfolio.url}>{contactLinks.portfolio.label}</ExternalContactLink>
          <ExternalContactLink href={contactLinks.youtube.url}>
            <Youtube className="h-4 w-4" aria-hidden="true" />
            {contactLinks.youtube.label}
          </ExternalContactLink>
          <ExternalContactLink href={contactLinks.suno.url}>
            <Music2 className="h-4 w-4" aria-hidden="true" />
            {contactLinks.suno.label}
          </ExternalContactLink>
          <ConfiguredExternalLink item={contactLinks.facebook} disabledText="Facebook — Coming Soon" />
          <ConfiguredExternalLink item={contactLinks.instagram}>
            {contactLinks.instagram.label}
            <span className="text-xs text-slate-400">{contactLinks.instagram.handle}</span>
          </ConfiguredExternalLink>
        </div>
      </div>
      <div className="mt-4 border-t border-white/10 pt-4">
        <SupportEmailAction className="max-w-full text-xs">แจ้งปัญหาการใช้งาน Matrix 9</SupportEmailAction>
      </div>
    </footer>
  );
}
