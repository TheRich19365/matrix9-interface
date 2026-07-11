import React, { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Copy, Download, Heart, RefreshCw, Sparkles, Wand2 } from "lucide-react";
import { appVersion } from "./data/appVersion.js";
import { contactLinks } from "./data/contactLinks.js";
import { exportSizes } from "./data/exportConfig.js";
import { analyzeMatrix } from "./lib/analyzeMatrix.js";
import { buildPosterPrompt } from "./lib/buildPosterPrompt.js";
import { buildCurrentCycle, getBangkokToday, shiftMonth } from "./lib/currentCycle.js";
import { formatBirthDateDisplayLines } from "./lib/dateDisplay.js";
import { cleanDigits, validateBirthDate } from "./lib/validateBirthDate.js";
import { generateMatrixReading } from "./lib/generateMatrixReading.js";
import CurrentCyclePanel from "./components/CurrentCyclePanel.jsx";
import LivingMatrix from "./components/LivingMatrix.jsx";
import PatternLines from "./components/PatternLines.jsx";
import DominantTrio from "./components/DominantTrio.jsx";
import HiddenPotential from "./components/HiddenPotential.jsx";
import CoreTension from "./components/CoreTension.jsx";
import ActivationKeys from "./components/ActivationKeys.jsx";
import AppHeader from "./components/AppHeader.jsx";
import EcosystemFooter from "./components/EcosystemFooter.jsx";
import ResultConversationSection from "./components/ResultConversationSection.jsx";
import SoulSignatureFooter from "./components/SoulSignatureFooter.jsx";
import SocialExport from "./components/export/SocialExport.jsx";
import StoryExport from "./components/export/StoryExport.jsx";
import FullReportExport from "./components/export/FullReportExport.jsx";
import { Chip, Section } from "./components/ui.jsx";

const emptyForm = { name: "", day: "", month: "", year: "", yearType: "BE" };

function BeingArchitecturePanel({ reading }) {
  const being = reading.symbolicResult.beingArchitecture;
  return (
    <Section title="Being Architecture — Cosmic Archetype" eyebrow="Symbolic Reflection Layer" icon={Sparkles}>
      <p className="mb-4 text-slate-300">
        พลังต้นแบบที่สอดคล้องกับโครงสร้างพลังงาน ไม่ใช่การระบุชาติกำเนิดจริง และไม่แทนที่การอ่าน Core Matrix หลัก
      </p>
      <article className="rounded-3xl border border-fuchsia-200/20 bg-fuchsia-200/10 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-100">PRIMARY CORE ENERGY</p>
        <h3 className="mt-2 text-3xl font-black">{being.primary.name}</h3>
        <p className="mt-1 text-sm font-semibold text-amber-100">{being.primary.title}</p>
        <div className="mt-3 flex flex-wrap gap-2">{being.primary.keywords.slice(0, 4).map((keyword) => <Chip key={keyword} tone="purple">{keyword}</Chip>)}</div>
        <p className="mt-3 leading-7 text-slate-100">{being.primary.shortMeaning}</p>
      </article>
      <details className="mt-4 rounded-2xl border border-white/10 bg-slate-950/45 p-4">
        <summary className="cursor-pointer text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100 focus:outline-none focus:ring-4 focus:ring-cyan-200/25">ดูพลังสนับสนุนและการเชื่อมโยงกับโลก</summary>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ["SUPPORTING STAR RESONANCE", being.supporting],
            ["EARTH INTEGRATION PATH", being.earthIntegration]
          ].map(([title, item]) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-100">{title}</p>
              <h3 className="mt-2 text-xl font-bold">{item.name}</h3>
              {item.gate && <p className="mt-1 text-xs font-semibold text-amber-100">Gate {item.gate} · แนวทางเชื่อมพลังสู่ชีวิตจริง</p>}
              <p className="mt-1 text-xs text-fuchsia-100">{item.keywords.slice(0, 4).join(" · ")}</p>
              <p className="mt-2 leading-7 text-slate-200">{item.shortMeaning || item.meaning}</p>
              {item.evidence?.length ? <p className="mt-2 text-xs leading-5 text-slate-400">Evidence: {item.evidence.slice(0, 3).join(" · ")}</p> : null}
            </article>
          ))}
        </div>
      </details>
    </Section>
  );
}

export default function App() {
  const [form, setForm] = useState(emptyForm);
  const [analysis, setAnalysis] = useState(null);
  const [validationMessage, setValidationMessage] = useState("");
  const [exportSize, setExportSize] = useState("Social Post");
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState("");
  const [includeSacredInPrompt, setIncludeSacredInPrompt] = useState(false);
  const [selectedCycleDate, setSelectedCycleDate] = useState(getBangkokToday);
  const [cycleMode, setCycleMode] = useState("Month");
  const socialRef = useRef(null);
  const storyRef = useRef(null);
  const fullRef = useRef(null);
  const reading = useMemo(() => (analysis?.hasDate ? generateMatrixReading(analysis) : null), [analysis]);
  const currentCycle = useMemo(() => (analysis?.hasDate ? buildCurrentCycle(analysis, selectedCycleDate, cycleMode) : null), [analysis, selectedCycleDate, cycleMode]);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    if (validationMessage) setValidationMessage("");
  }

  function generate(event) {
    event.preventDefault();
    const validation = validateBirthDate(form);
    if (!validation.valid) {
      setValidationMessage(validation.message);
      return;
    }
    setValidationMessage("");
    setAnalysis(analyzeMatrix(form));
    setIncludeSacredInPrompt(false);
  }

  function clear() {
    setForm(emptyForm);
    setAnalysis(null);
    setValidationMessage("");
    setIncludeSacredInPrompt(false);
  }

  function goCycleToday() {
    setSelectedCycleDate(getBangkokToday());
  }

  function shiftCycleMonth(delta) {
    setSelectedCycleDate((current) => shiftMonth(current, delta));
  }

  const summary = useMemo(() => {
    if (!analysis || !reading) return "";
    const being = reading.symbolicResult.beingArchitecture;
    const sacred = reading.symbolicResult.sacredResonance;
    const sacredItems = [sacred.primary, ...sacred.supporting].filter(Boolean);
    const dateLines = formatBirthDateDisplayLines(analysis);
    const lines = [
      `Matrix 9 Interface: ${analysis.name || "-"}`,
      "",
      "CORE MATRIX",
      dateLines.input,
      dateLines.canonical,
      `Dominant Gates: ${analysis.dominant.join(", ") || "-"}`,
      `Hidden/Missing Gates: ${analysis.missing.join(", ") || "-"}`,
      `Hidden Potential 0: ${analysis.zeroCount}`,
      `Life Path: ${analysis.lifePath}`,
      `Core Journey Mode: ${reading.timeline}`,
      "",
      "CURRENT CYCLE",
      `Selected date: ${currentCycle?.selectedDate || "-"}`,
      `Timezone: ${currentCycle?.timezone || "Asia/Bangkok"}`,
      `Personal Year: ${currentCycle?.personalYear.label || "-"} / Gate ${currentCycle?.personalYear.root || "-"}`,
      `Personal Month: ${currentCycle?.personalMonth.label || "-"} / Gate ${currentCycle?.personalMonth.root || "-"}`,
      `Personal Day: ${currentCycle?.personalDay.label || "-"} / Gate ${currentCycle?.personalDay.root || "-"}`,
      `Monthly Pulse: ${currentCycle?.monthlyPulse.currentMonthTheme || "-"}`,
      `Daily Signal: ${currentCycle?.dailySignal.theme || "-"}`,
      "",
      "BEING ARCHITECTURE — COSMIC ARCHETYPE",
      `Primary: ${being.primary.name} — ${being.primary.title}`,
      `Keywords: ${being.primary.keywords.slice(0, 4).join(", ")}`,
      `Meaning: ${being.primary.shortMeaning}`,
      `Primary Evidence: ${being.primary.evidence?.join(" | ") || "-"}`,
      `Supporting Star Resonance: ${being.supporting.name} — ${being.supporting.title}`,
      `Supporting Evidence: ${being.supporting.evidence?.join(" | ") || "-"}`,
      `Earth Integration Path: Gate ${being.earthIntegration.gate || "-"} — ${being.earthIntegration.title}`,
      `Earth Integration Meaning: ${being.earthIntegration.shortMeaning || being.earthIntegration.meaning}`,
      `Earth Integration Evidence: ${being.earthIntegration.evidence?.join(" | ") || "-"}`
    ];
    if (includeSacredInPrompt && sacredItems.length) {
      lines.push("", "SACRED RESONANCE — OPTIONAL SYMBOLIC LAYER", sacredItems.map((item) => `${item.name}: ${item.meaning}`).join("\n"));
    }
    lines.push(
      "",
      `Birth Signature: ${reading.birthSignature}`,
      `Core Tension: ${reading.coreTension.title} - ${reading.coreTension.text}`,
      `Relationship: ${reading.relationshipPattern}`,
      `Work & Creative: ${reading.workPattern}`,
      `Money & Power: ${reading.moneyPattern}`,
      `Growth Direction: ${reading.growth}`,
      `3 Activation Keys: ${reading.activationKeys.slice(0, 3).join(" | ")}`,
      `Quote: ${reading.quote}`,
      "",
      "CONTACT",
      `LINE Official: ${contactLinks.lineOa.id}`,
      `Email: ${contactLinks.email.address}`,
      `Portfolio: ${contactLinks.portfolio.url}`,
      `Facebook: ${contactLinks.facebook.url}`,
      `Instagram: ${contactLinks.instagram.url}`,
      `Suno Music: ${contactLinks.suno.url}`,
      `YouTube Music: ${contactLinks.youtube.url}`
    );
    return lines.join("\n");
  }, [analysis, reading, currentCycle, includeSacredInPrompt]);

  async function copyText(text, type) {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(type);
    window.setTimeout(() => setCopied(""), 1600);
  }

  function copyLineId() {
    return copyText(contactLinks.lineOa.id, "line");
  }

  async function exportPng() {
    if (!analysis || !reading) return;
    const ref = { "Social Post": socialRef, "Story 9:16": storyRef, "Full Report": fullRef }[exportSize];
    const target = ref?.current;
    if (!target) return;
    setExporting(true);
    try {
      if (document.fonts?.ready) await document.fonts.ready;
      const canvas = await html2canvas(target, {
        backgroundColor: "#05030f",
        scale: 2,
        useCORS: true,
        width: target.scrollWidth,
        height: target.scrollHeight,
        windowWidth: target.scrollWidth,
        windowHeight: target.scrollHeight
      });
      const link = document.createElement("a");
      const slug = exportSizes[exportSize].slug;
      const safeName = (analysis.name || "matrix9").replace(/[^a-z0-9ก-๙_-]+/gi, "-");
      link.download = `matrix9-${safeName}-${slug}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setExporting(false);
    }
  }

  const posterPrompt = analysis && reading ? buildPosterPrompt({ analysis, reading, includeSacredResonance: includeSacredInPrompt }) : "";
  const dateLines = analysis ? formatBirthDateDisplayLines(analysis) : null;

  return (
    <main className="min-h-screen overflow-hidden bg-[#05030f] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(139,92,246,0.26),transparent_30%),radial-gradient(circle_at_85%_16%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_50%_92%,rgba(245,158,11,0.17),transparent_32%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
      </div>
      {analysis && reading && (
        <>
          <SocialExport analysis={analysis} reading={reading} exportRef={socialRef} />
          <StoryExport analysis={analysis} reading={reading} exportRef={storyRef} />
          <FullReportExport analysis={analysis} reading={reading} exportRef={fullRef} includeSacredResonance={includeSacredInPrompt} />
        </>
      )}
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <AppHeader onCopyLine={copyLineId} copied={copied === "line"} />
        <header className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 shadow-aura backdrop-blur-xl sm:p-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-200/10 px-3 py-1 text-xs font-semibold text-amber-100"><Sparkles className="h-3.5 w-3.5" />{appVersion.experienceName} · {appVersion.shortVersion}</div>
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">Matrix 9 Interface</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">กรอกวันเดือนปีเกิดเพื่อสร้าง Matrix 9 Interface ระบบนี้เป็นการอ่านเชิงสัญลักษณ์และพฤติกรรม เพื่อการเข้าใจตัวเอง ไม่ใช่การฟันธงชะตาชีวิต</p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <form onSubmit={generate} className="rounded-[1.6rem] border border-white/10 bg-white/[0.065] p-5 shadow-aura backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-2 text-amber-100"><Wand2 className="h-5 w-5" /><h2 className="text-lg font-semibold">Birth Matrix Input</h2></div>
            <label className="mb-4 block"><span className="mb-2 block text-sm text-slate-300">Name</span><input value={form.name} onChange={(event) => update("name", event.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none ring-cyan-300/40 transition focus:border-cyan-200/60 focus:ring-4" /></label>
            <div className="grid grid-cols-3 gap-3">
              {[["day", "Day", 2], ["month", "Month", 2], ["year", "Year", 4]].map(([field, label, max]) => (
                <label key={field}><span className="mb-2 block text-sm text-slate-300">{label}</span><input inputMode="numeric" maxLength={max} value={form[field]} onChange={(event) => update(field, cleanDigits(event.target.value, max))} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-3 text-center outline-none ring-cyan-300/40 transition focus:border-cyan-200/60 focus:ring-4" /></label>
              ))}
            </div>
            <label className="mt-4 block"><span className="mb-2 block text-sm text-slate-300">Year type</span><select value={form.yearType} onChange={(event) => update("yearType", event.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none ring-cyan-300/40 transition focus:border-cyan-200/60 focus:ring-4"><option value="BE">BE - Buddhist Era</option><option value="AD">AD - Common Era</option></select></label>
            <p className="mt-3 rounded-2xl border border-white/10 bg-slate-950/45 p-3 text-xs leading-6 text-slate-300">ข้อมูลวันเกิดจะถูกประมวลผลภายในเบราว์เซอร์ของคุณ และไม่มีการจัดเก็บไว้บนเซิร์ฟเวอร์</p>
            {validationMessage && <div className="mt-4 rounded-2xl border border-red-300/25 bg-red-400/10 p-4 text-sm font-semibold text-red-100">{validationMessage}</div>}
            {!analysis && !validationMessage && <div className="mt-4 rounded-2xl border border-cyan-200/20 bg-cyan-200/10 p-4 text-sm font-semibold text-cyan-100">กรอกวันเดือนปีเกิดเพื่อสร้าง Matrix 9 Interface</div>}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-300 to-cyan-200 px-4 py-3 text-sm font-bold text-slate-950 shadow-gold focus:outline-none focus:ring-4 focus:ring-amber-200/40"><Sparkles className="h-4 w-4" />Generate</button>
              <button type="button" onClick={clear} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-fuchsia-200/30 bg-fuchsia-200/10 px-4 py-3 text-sm font-semibold text-fuchsia-100 focus:outline-none focus:ring-4 focus:ring-fuchsia-200/25"><RefreshCw className="h-4 w-4" />Clear Form</button>
              {analysis && reading && (
                <>
                  <label className="block rounded-2xl border border-white/10 bg-slate-950/55 p-3 sm:col-span-2">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">Export size</span>
                    <select value={exportSize} onChange={(event) => setExportSize(event.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-cyan-200/25">{Object.keys(exportSizes).map((size) => <option key={size}>{size}</option>)}</select>
                  </label>
                  <label className="flex items-start gap-3 rounded-2xl border border-amber-200/20 bg-amber-200/10 p-3 text-sm text-amber-50 sm:col-span-2">
                    <input type="checkbox" checked={includeSacredInPrompt} onChange={(event) => setIncludeSacredInPrompt(event.target.checked)} className="mt-1 h-4 w-4 accent-amber-300" />
                    <span>Include Sacred Resonance in copied image prompt</span>
                  </label>
                  <button type="button" onClick={exportPng} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-200/35 bg-amber-200/10 px-4 py-3 text-sm font-semibold text-amber-100 focus:outline-none focus:ring-4 focus:ring-amber-200/25"><Download className="h-4 w-4" />{exporting ? "Exporting" : "Export PNG"}</button>
                  <button type="button" onClick={() => copyText(summary, "summary")} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-200/30 bg-cyan-200/10 px-4 py-3 text-sm font-semibold text-cyan-100 focus:outline-none focus:ring-4 focus:ring-cyan-200/25"><Copy className="h-4 w-4" />{copied === "summary" ? "Copied" : "Copy Summary"}</button>
                  <button type="button" onClick={() => copyText(posterPrompt, "prompt")} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-fuchsia-200/30 bg-fuchsia-200/10 px-4 py-3 text-sm font-semibold text-fuchsia-100 focus:outline-none focus:ring-4 focus:ring-fuchsia-200/25 sm:col-span-2"><Copy className="h-4 w-4" />{copied === "prompt" ? "Prompt Copied" : "Copy Image Prompt"}</button>
                </>
              )}
            </div>
          </form>

          {analysis && reading ? (
            <section className="rounded-[1.6rem] border border-white/10 bg-slate-950/60 p-5 shadow-aura backdrop-blur-xl">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-400">Personal Symbolic Personality Interface</p>
                  <h2 className="text-2xl font-bold">{analysis.name || "Unnamed Soul"}</h2>
                  <p className="text-sm text-amber-100">{dateLines.input}</p>
                  <p className="mt-1 text-xs text-cyan-100">{dateLines.canonical}</p>
                  <p className="mt-1 text-xs text-amber-100">Core Journey Mode: {reading.timeline}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-300">ระบบแปลงปี พ.ศ. เป็น ค.ศ. ภายในเพื่อให้การวิเคราะห์มีมาตรฐานเดียวกัน</p>
                  <p className="mt-1 text-xs leading-5 text-slate-300">Core Journey Mode เป็น pattern คงที่จาก Core Matrix ไม่ใช่พลังประจำเดือนหรือพลังตามวันที่เลือก</p>
                </div>
                <Chip tone="gold">Life Path {analysis.lifePath}</Chip>
              </div>
              <Section title="Birth Signature" className="shadow-none">{reading.birthSignature}</Section>
            </section>
          ) : (
            <section className="rounded-[1.6rem] border border-white/10 bg-slate-950/60 p-5 shadow-aura backdrop-blur-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100">Ready when you are</p>
              <h2 className="mt-3 text-2xl font-black">{appVersion.experienceName}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">ผลลัพธ์จะปรากฏหลังจากกด Generate เท่านั้น การแก้ไขฟอร์มหลังสร้างผลลัพธ์จะไม่เปลี่ยนผลที่แสดงจนกว่าจะกด Generate ใหม่</p>
            </section>
          )}
        </section>

        {analysis && reading && (
          <>
            {currentCycle && <CurrentCyclePanel currentCycle={currentCycle} cycleMode={cycleMode} setCycleMode={setCycleMode} selectedCycleDate={selectedCycleDate} setSelectedCycleDate={setSelectedCycleDate} goToday={goCycleToday} shiftCycleMonth={shiftCycleMonth} />}
            <BeingArchitecturePanel reading={reading} />
            <Section title="Your Living Matrix" eyebrow="Core Matrix"><LivingMatrix analysis={analysis} /></Section>
            <PatternLines lines={reading.patternLines} />
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Section title="Dominant Gates">{analysis.dominant.length ? analysis.dominant.map((number) => <Chip key={number}>{number} · {analysis.counts[number]}x</Chip>) : <Chip>สมดุล</Chip>}</Section>
              <Section title="Hidden Gates">{analysis.missing.length ? analysis.missing.map((number) => <Chip key={number} tone="purple">{number}</Chip>) : <Chip tone="purple">ไม่มีช่องว่าง</Chip>}</Section>
              <Section title="Lucky Colors">{reading.colors.map((color) => <Chip key={color} tone="cyan">{color}</Chip>)}</Section>
              <Section title="Lucky Numbers">{reading.luckyNumbers.map((number) => <Chip key={number}>{number}</Chip>)}</Section>
            </section>
            <DominantTrio items={reading.dominantTrio} />
            <HiddenPotential analysis={analysis} hiddenGates={reading.hiddenGates} />
            <CoreTension tension={reading.coreTension} />
            <section className="grid gap-4 lg:grid-cols-2">
              <Section title="Relationship Pattern">{reading.relationshipPattern}</Section>
              <Section title="Work & Creative Pattern">{reading.workPattern}</Section>
              <Section title="Money & Power Pattern">{reading.moneyPattern}</Section>
              <Section title="Growth Direction">{reading.growth}</Section>
              <Section title="Personality Overview">{reading.personality}</Section>
              <Section title="Emotional Pattern">{reading.emotional}</Section>
              <Section title="Spiritual Pattern">{reading.spiritual}</Section>
              <Section title="Shadow Side">{reading.shadow}</Section>
            </section>
            <ActivationKeys keys={reading.activationKeys.slice(0, 3)} />
            <details className="rounded-[1.4rem] border border-white/10 bg-white/[0.05] p-5 shadow-aura backdrop-blur-xl">
              <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-amber-100 focus:outline-none focus:ring-4 focus:ring-amber-200/25"><Heart className="h-4 w-4" />เปิดชั้นพลังเชิงสัญลักษณ์เพิ่มเติม</summary>
              <h2 className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-amber-100">Sacred Resonance · Optional Symbolic Layer</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">พลังสิ่งศักดิ์สิทธิ์ที่สอดคล้อง ใช้เป็นแรงบันดาลใจในการทำความดีและการเติบโตภายใน ไม่ใช่การระบุเทพประจำตัว และจะไม่ถูกใส่ใน Image Prompt เว้นแต่เปิดตัวเลือกด้านบน</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {reading.sacred.length ? reading.sacred.map((item) => (
                  <article key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-200">{item.meaning}</p>
                    <p className="mt-2 text-xs text-cyan-100">Practice: {item.practice}</p>
                  </article>
                )) : <p>ยังไม่พบพลังสิ่งศักดิ์สิทธิ์เด่นจากชุดตัวเลขนี้</p>}
              </div>
            </details>
            <section className="rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-amber-200/12 via-fuchsia-300/10 to-cyan-300/10 p-5 shadow-aura backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-2 text-amber-100"><Sparkles className="h-4 w-4" /><h2 className="text-sm font-semibold uppercase tracking-[0.22em]">Reflection Quote</h2></div>
              <blockquote className="text-xl font-semibold leading-9">“{reading.quote}”</blockquote>
            </section>
            <ResultConversationSection onCopyLine={copyLineId} copied={copied === "line"} />
          </>
        )}
        <SoulSignatureFooter />
        <EcosystemFooter />
      </div>
    </main>
  );
}
