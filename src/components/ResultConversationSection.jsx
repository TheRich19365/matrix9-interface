import React from "react";
import { Sparkles } from "lucide-react";
import { contactLinks } from "../data/contactLinks.js";
import { LineAction } from "./contactActions.jsx";

function ServiceCard({
  tone,
  badge,
  thaiTitle,
  englishTitle,
  price,
  duration,
  description,
  topics,
  scope,
  primaryCta,
  onCopyLine,
  copied,
}) {
  const toneClass =
    tone === "premium"
      ? "border-amber-100/40 bg-gradient-to-br from-amber-100/18 via-cyan-100/10 to-slate-950/72"
      : tone === "deep"
      ? "border-amber-200/30 bg-gradient-to-br from-amber-200/15 via-fuchsia-300/10 to-slate-950/70"
      : "border-cyan-200/24 bg-gradient-to-br from-cyan-200/12 via-white/[0.055] to-slate-950/70";

  return (
    <article className={`rounded-[1.45rem] border p-5 shadow-aura backdrop-blur-xl ${toneClass}`}>
      <div>
        {badge ? (
          <span className="mb-3 inline-flex rounded-full border border-amber-100/35 bg-amber-100/10 px-3 py-1 text-[0.68rem] font-bold tracking-[0.08em] text-amber-50">
            {badge}
          </span>
        ) : null}
        <h3 className="text-2xl font-black leading-tight text-white">{thaiTitle}</h3>
        <p className="mt-1 text-sm font-semibold text-cyan-100">{englishTitle}</p>
        <div className="mt-4 rounded-2xl border border-amber-200/30 bg-amber-200/10 px-4 py-3">
          <p className="text-sm font-bold text-amber-50">ค่าพลังงานแลกเปลี่ยน {price}</p>
          <p className="mt-1 text-xs text-slate-300">{duration}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-200">{description}</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-xs font-bold tracking-[0.12em] text-amber-100">เหมาะกับ</p>
          <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-200">
            {topics.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-amber-100" aria-hidden="true">-</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-xs font-bold tracking-[0.12em] text-fuchsia-100">ขอบเขต</p>
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
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <ServiceCard
          thaiTitle="คุยให้ชัดในหนึ่งเรื่อง"
          englishTitle="Focused Clarity Session"
          price="444 THB"
          duration="ประมาณ 30 นาที"
          description="เหมาะสำหรับช่วงที่มีคำถามหนึ่งข้อ หรือมีเรื่องหนึ่งที่อยากมองให้ชัดขึ้น ผ่านการพูดคุยเพื่อช่วยเรียบเรียงความรู้สึก ทางเลือก และทิศทางต่อไป โดยไม่ฟันธงหรือตัดสินใจแทนคุณ"
          topics={["ความรักและความสัมพันธ์", "งาน การเงิน คุณค่า และการตัดสินใจ", "จุดติดขัดที่กำลังเผชิญ", "การเริ่มโปรเจกต์หรือคำถามสำคัญหนึ่งเรื่อง"]}
          scope="โฟกัสหนึ่งประเด็นหลัก คุยแบบกระชับและตรงจุด อาจใช้ Matrix 9, Destiny Matrix Snapshot, ไพ่ หรือเครื่องมือเชิงสัญลักษณ์ตามความเหมาะสม"
          primaryCta="พูดคุยหนึ่งประเด็นผ่าน LINE OA"
          onCopyLine={onCopyLine}
          copied={copied}
        />
        <ServiceCard
          tone="deep"
          badge="แนะนำ · สมดุลที่สุด"
          thaiTitle="อ่านภาพชีวิตเชิงลึก"
          englishTitle="Destiny Matrix Deep Talk"
          price="777 THB"
          duration="ประมาณ 45-60 นาที"
          description="เหมาะสำหรับคนที่อยากมองภาพใหญ่ของตัวเองอย่างมีบริบท ไม่ใช่เพียงตัวเลขเดี่ยว ๆ แต่เป็นการชวนดูเส้นทาง บทเรียน รูปแบบที่เกิดซ้ำ และศักยภาพที่ยังไม่ได้ถูกใช้อย่างเต็มที่"
          topics={["pattern ที่เกิดซ้ำในชีวิต", "จุดติดขัดและศักยภาพที่ยังไม่ถูกใช้", "ความสัมพันธ์ งาน ธุรกิจ หรือทิศทางชีวิต", "การพัฒนาตัวเองแบบลึกและเป็นรูปธรรม"]}
          scope="ใช้ Destiny Matrix เป็นฐานหลัก ร่วมกับ Matrix 9 ไพ่ และเครื่องมือเชิงสัญลักษณ์ตามความเหมาะสม เพื่อช่วยให้เห็นความเชื่อมโยงของหลายมิติในชีวิตได้ชัดขึ้น"
          primaryCta="เปิดบทสนทนาเชิงลึกผ่าน LINE OA"
          onCopyLine={onCopyLine}
          copied={copied}
        />
        <ServiceCard
          tone="premium"
          thaiTitle="อ่านภาพรวมชีวิตแบบบูรณาการ"
          englishTitle="Integrated Soul Reading"
          price="1,111 THB"
          duration="ประมาณ 75-90 นาที"
          description="เหมาะสำหรับคนที่ต้องการมองภาพรวมของชีวิตหลายมิติพร้อมกัน ทั้งตัวตน พลังงาน ความสัมพันธ์ งาน การเงิน จังหวะการตัดสินใจ และสิ่งที่กำลังเปลี่ยนผ่านอยู่ในปัจจุบัน เป็นการอ่านเชิงลึกที่นำข้อมูลจากหลายระบบมาเชื่อมกัน เพื่อช่วยให้เห็นว่าแต่ละส่วนของชีวิตสัมพันธ์กันอย่างไร และมีจุดใดที่ควรกลับมาจัดวางใหม่ให้ชัดเจนขึ้น"
          topics={[
            "ช่วงเปลี่ยนผ่านครั้งสำคัญ",
            "การตัดสินใจที่เกี่ยวข้องหลายด้าน",
            "งาน เงิน ความสัมพันธ์ และภารกิจชีวิตที่เชื่อมโยงกัน",
            "pattern ที่เกิดซ้ำและต้องการมองถึงต้นเหตุ",
            "การเริ่มต้นโปรเจกต์ ธุรกิจ ความสัมพันธ์ หรือเส้นทางใหม่",
            "ผู้ที่ต้องการภาพรวมพร้อมแนวทางปฏิบัติเป็นขั้นตอน",
          ]}
          scope="ใช้ Matrix 9, Destiny Matrix, Daily Energy, Thai Wisdom, ไพ่ และเครื่องมือเชิงสัญลักษณ์ตามความเหมาะสม เพื่อเชื่อมข้อมูลหลายด้านให้กลายเป็นภาพรวมที่เข้าใจง่ายและนำไปใช้ต่อได้จริง การอ่านนี้ไม่ใช่การฟันธงชะตาชีวิต ไม่ใช่คำแนะนำทางการแพทย์ และไม่ตัดสินใจแทนผู้ใช้"
          primaryCta="อ่านภาพรวมชีวิตผ่าน LINE OA"
          onCopyLine={onCopyLine}
          copied={copied}
        />
      </div>
      <div className="mt-5 rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4 text-sm leading-7 text-slate-300">
        <p>
          ทุกแพ็กเกจเป็นการสนทนาระหว่างมนุษย์จริง โดย Win Soul of Love เป็นผู้ฟัง ตั้งคำถาม ตีความ
          และเชื่อมโยงข้อมูลตามบริบทชีวิตของแต่ละบุคคล เครื่องมือดิจิทัลและ AI ใช้เพื่อช่วยจัดระบบข้อมูลเท่านั้น
          ไม่ได้ทำหน้าที่ตัดสินใจหรือฟันธงแทนคุณ
        </p>
        <p className="mt-2 text-cyan-100">
          ติดต่อผ่าน LINE Official ก่อนเสมอ ไม่มีระบบชำระเงินบนเว็บไซต์นี้ รายละเอียดและเวลานัดหมายพูดคุยกันหลังจากทักเข้ามาที่{" "}
          <span className="font-bold">{contactLinks.lineOa.id}</span>
        </p>
      </div>
    </section>
  );
}
