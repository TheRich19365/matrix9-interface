import React from "react";
import { Sparkles } from "lucide-react";
import { contactLinks } from "../data/contactLinks.js";
import { LineAction } from "./contactActions.jsx";

function ServiceCard({ tone, title, subtitle, energy, duration, children, topics, scope, primaryCta, onCopyLine, copied }) {
  const toneClass =
    tone === "deep"
      ? "border-amber-200/30 bg-gradient-to-br from-amber-200/15 via-fuchsia-300/10 to-slate-950/70"
      : "border-cyan-200/24 bg-gradient-to-br from-cyan-200/12 via-white/[0.055] to-slate-950/70";

  return (
    <article className={`rounded-[1.45rem] border p-5 shadow-aura backdrop-blur-xl ${toneClass}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">{subtitle}</p>
          <h3 className="mt-2 text-2xl font-black text-white">{title}</h3>
        </div>
        <div className="rounded-2xl border border-amber-200/30 bg-amber-200/10 px-4 py-2 text-right">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-amber-100">Energy Exchange</p>
          <p className="text-2xl font-black text-amber-50">{energy}</p>
          <p className="text-xs text-slate-300">{duration}</p>
        </div>
      </div>
      <div className="mt-4 text-sm leading-7 text-slate-200">{children}</div>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-100">เหมาะกับ</p>
          <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-200">
            {topics.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-fuchsia-100">ขอบเขต</p>
          <p className="mt-2 text-sm leading-7 text-slate-200">{scope}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <LineAction onCopyLine={onCopyLine} copied={copied}>{primaryCta}</LineAction>
      </div>
    </article>
  );
}

export default function ResultConversationSection({ onCopyLine, copied }) {
  return (
    <section className="rounded-[1.65rem] border border-white/10 bg-slate-950/62 p-5 shadow-aura backdrop-blur-xl sm:p-6">
      <div className="max-w-3xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-100">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Soul Signature Conversation
        </div>
        <h2 className="text-2xl font-black sm:text-3xl">อยากมองแผนที่นี้ให้ลึกขึ้นไหม?</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Matrix 9 สะท้อน pattern ชั้นแรกจากวันเกิดได้อย่างสวยงามอยู่แล้ว แต่บริบทชีวิตจริง ความสัมพันธ์ การตัดสินใจ
          และสถานการณ์ปัจจุบันมักต้องใช้การสนทนาเพื่อเชื่อมจุดต่าง ๆ เข้าด้วยกันอย่างละเมียดมากขึ้น
        </p>
        <p className="mt-2 text-sm leading-7 text-cyan-100">
          ติดต่อผ่าน LINE Official ก่อนเสมอ ไม่มีระบบชำระเงินบนเว็บไซต์นี้ รายละเอียดและเวลานัดหมายคุยกันหลังจากทักเข้ามา
          ที่ <span className="font-bold">{contactLinks.lineOa.id}</span>
        </p>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <ServiceCard
          title="Focused Conversation"
          subtitle="พูดคุยหนึ่งประเด็น"
          energy="444"
          duration="ประมาณ 30 นาที"
          topics={["ความรักหรือความสัมพันธ์", "งาน เงิน คุณค่า หรือการตัดสินใจ", "จุดติดขัดปัจจุบัน", "เริ่มโปรเจกต์หรือหนึ่งคำถามสำคัญ"]}
          scope="เน้นหนึ่งประเด็นหลัก คุยแบบกระชับ ไม่ใช่รายงานยาว และไม่ใช่การอ่านชีวิตทั้งหมด อาจใช้ Matrix 9, Destiny Matrix snapshot, ไพ่ หรือเครื่องมือเชิงสัญลักษณ์เท่าที่เหมาะกับบทสนทนา"
          primaryCta="พูดคุยหนึ่งประเด็นผ่าน LINE OA"
          onCopyLine={onCopyLine}
          copied={copied}
        >
          เหมาะกับช่วงที่มีคำถามหนึ่งข้อหรือ pattern หนึ่งเรื่องที่อยากมองให้ชัดขึ้น เป็นบทสนทนาระหว่างมนุษย์จริง
          เพื่อช่วยเรียบเรียงความรู้สึก ทางเลือก และทิศทางต่อไปโดยไม่ฟันธงแทนคุณ
        </ServiceCard>
        <ServiceCard
          tone="deep"
          title="Destiny Matrix Deep Talk"
          subtitle="บทสนทนาเชิงลึก"
          energy="777"
          duration="ประมาณ 45-60 นาที"
          topics={["pattern ซ้ำในชีวิต", "จุดติดขัดและศักยภาพที่ยังไม่ถูกใช้", "บริบทส่วนตัว ความสัมพันธ์ งาน หรือธุรกิจ", "ทิศทางพัฒนาแบบลึกและเป็นรูปธรรม"]}
          scope="ใช้ Destiny Matrix เป็นฐานหลัก ร่วมกับ Matrix 9, ไพ่, AI-assisted organization/comparison และเครื่องมือเชิงสัญลักษณ์เมื่อเหมาะสม AI เป็นตัวช่วยจัดระบบ ส่วน Win เป็นผู้ฟัง ตีความ เชื่อมโยง ตั้งคำถาม และถือพื้นที่สนทนา"
          primaryCta="เปิดบทสนทนาเชิงลึกผ่าน LINE OA"
          onCopyLine={onCopyLine}
          copied={copied}
        >
          เหมาะกับคนที่อยากมองภาพใหญ่ของตัวเองอย่างมีบริบท ไม่ใช่แค่ตัวเลขเดี่ยว ๆ แต่เป็นการชวนดูเส้นทาง
          บทเรียน พลังที่ใช้บ่อย และพื้นที่ที่อาจเติบโตต่อได้อย่างนุ่มนวล
        </ServiceCard>
      </div>
    </section>
  );
}
