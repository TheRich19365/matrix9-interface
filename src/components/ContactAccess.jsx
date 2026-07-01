import React from "react";
import { MessageCircle } from "lucide-react";
import { contactLinks } from "../data/contactLinks.js";
import { EmailAction, LineAction, SupportEmailAction } from "./contactActions.jsx";

export default function ContactAccess({ onCopyLine, copied }) {
  return (
    <section className="rounded-[1.35rem] border border-amber-200/18 bg-gradient-to-r from-amber-200/10 via-white/[0.045] to-cyan-200/10 p-4 shadow-aura backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-amber-100">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-[0.18em]">Focused Conversation</p>
          </div>
          <h2 className="text-lg font-black">ต้องการสอบถามหรือนัดพูดคุยกับ Win Soul of Love?</h2>
          <p className="mt-1 text-sm leading-6 text-slate-300">
            ทัก LINE Official ได้ที่ <span className="font-bold text-cyan-100">{contactLinks.lineOa.id}</span> เพื่อสอบถามรายละเอียดก่อนนัดหมาย
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <LineAction onCopyLine={onCopyLine} copied={copied}>คัดลอก LINE ID</LineAction>
          <EmailAction />
        </div>
      </div>
      <div className="mt-3 border-t border-white/10 pt-3">
        <SupportEmailAction className="min-h-9 px-3 py-1.5 text-xs">
          พบปัญหาการใช้งาน? แจ้งปัญหาผ่านอีเมล
        </SupportEmailAction>
      </div>
    </section>
  );
}
