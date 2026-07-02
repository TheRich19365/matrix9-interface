import React from "react";
import { Sparkles } from "lucide-react";

export default function SoulSignatureFooter() {
  return (
    <section className="rounded-[1.55rem] border border-white/10 bg-gradient-to-br from-slate-950/78 via-white/[0.045] to-amber-200/10 p-5 shadow-aura backdrop-blur-xl sm:p-6">
      <div className="max-w-3xl">
        <div className="mb-2 flex items-center gap-2 text-amber-100">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          <p className="text-xs font-bold uppercase tracking-[0.2em]">Soul Signature</p>
        </div>
        <h2 className="text-2xl font-black">Created by Win Soul of Love</h2>
        <p className="mt-2 text-sm leading-7 text-slate-300">Human insight supported by AI and symbolic systems.</p>
        <p className="mt-3 text-sm leading-7 text-cyan-100">
          พื้นที่สะท้อนตัวตนผ่าน Pattern การสนทนา ประสบการณ์ของมนุษย์ งานสร้างสรรค์
          และระบบ AI ที่ช่วยจัดระเบียบข้อมูล โดยไม่แทนที่การรับฟังและการตีความของมนุษย์
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Human Before Prediction", "Conversation Before Conclusion", "Pattern Before Judgment"].map((item) => (
            <span key={item} className="rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1 text-xs font-semibold text-amber-100">
              {item}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Matrix 9 · Living Soul Map</p>
      </div>
    </section>
  );
}
