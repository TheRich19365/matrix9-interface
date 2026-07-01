import React from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
import { formatDisplayDate } from "../lib/dateDisplay.js";
import { Chip, Section } from "./ui.jsx";

const modeLabels = ["Year", "Month", "Day"];

function CycleNumberCard({ title, item, active }) {
  return (
    <article className={`rounded-2xl border p-4 ${active ? "border-amber-200/45 bg-amber-200/12 shadow-gold" : "border-white/10 bg-slate-950/45"}`}>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">{title}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-4xl font-black">{item.label}</p>
          <p className="mt-1 text-sm font-semibold text-amber-100">Gate {item.root} · {item.gate.name}</p>
        </div>
        {item.isMaster && <Chip tone="purple">Master Tone</Chip>}
      </div>
    </article>
  );
}

function ActivatedGateCard({ item }) {
  return (
    <article className="rounded-2xl border border-cyan-200/20 bg-cyan-200/10 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">{item.source} Activation</p>
      <h3 className="mt-2 text-2xl font-black">Gate {item.number} · {item.gate.name}</h3>
      <p className="mt-1 text-sm text-amber-100">{item.cycleStatus}</p>
      <p className="mt-2 text-sm leading-7 text-slate-200">{item.meaning}</p>
    </article>
  );
}

function MonthlyPulse({ pulse }) {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      <article className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 lg:col-span-2">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-100">Monthly Pulse</p>
        <h3 className="mt-2 text-xl font-black">{pulse.currentMonthTheme}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-200">{pulse.monthlyCoreTension}</p>
        <p className="mt-2 text-sm leading-7 text-cyan-100">Pattern Line: {pulse.activatedPatternLine.name} · {pulse.activatedPatternLine.cycleStatus}</p>
      </article>
      <article className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-100">One Practical Action</p>
        <p className="mt-2 text-sm leading-7 text-slate-100">{pulse.action}</p>
      </article>
      <article className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">Opportunity</p>
        <p className="mt-2 text-sm leading-7 text-slate-200">{pulse.opportunity}</p>
      </article>
      <article className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-fuchsia-100">What to Watch</p>
        <p className="mt-2 text-sm leading-7 text-slate-200">{pulse.watch}</p>
      </article>
      <article className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-100">Reflection Question</p>
        <p className="mt-2 text-sm leading-7 text-slate-200">{pulse.reflectionQuestion}</p>
      </article>
    </div>
  );
}

function DailySignal({ signal }) {
  return (
    <article className="rounded-2xl border border-fuchsia-200/20 bg-fuchsia-200/10 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-fuchsia-100">Daily Signal</p>
      <h3 className="mt-2 text-2xl font-black">Gate {signal.dailyGate.number} · {signal.dailyGate.gate.name}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-100">{signal.theme}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <p className="rounded-xl border border-white/10 bg-slate-950/35 p-3 text-sm leading-6 text-slate-200"><span className="font-bold text-cyan-100">Observe:</span> {signal.observe}</p>
        <p className="rounded-xl border border-white/10 bg-slate-950/35 p-3 text-sm leading-6 text-slate-200"><span className="font-bold text-amber-100">Action:</span> {signal.action}</p>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-400">Matrix 9 Daily Signal is personalized from birth data and selected date. It is separate from Soul of Love Daily Energy, which is a collective/general daily energy experience.</p>
    </article>
  );
}

export default function CurrentCyclePanel({ currentCycle, cycleMode, setCycleMode, selectedCycleDate, setSelectedCycleDate, goToday, shiftCycleMonth }) {
  const modeKey = cycleMode.toLowerCase();
  const activeGate = currentCycle.activatedGates[modeKey];
  return (
    <Section title="Current Cycle" eyebrow="พลังงานตามช่วงเวลา" icon={Clock3}>
      <div className="mb-4 rounded-2xl border border-white/10 bg-slate-950/45 p-4">
        <p className="text-sm leading-7 text-slate-300">Core Matrix คือ blueprint ถาวร ส่วน Current Cycle คือ energetic weather ของวันที่เลือก จึงไม่เปลี่ยนเลขเกิดหรือสถานะ natal เดิม</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-300">
          <CalendarDays className="h-4 w-4 text-cyan-100" />
          <span>Selected date: <b className="text-white">{formatDisplayDate(currentCycle.selectedDate)}</b></span>
          <span>Timezone: <b className="text-white">{currentCycle.timezone}</b></span>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {modeLabels.map((mode) => (
          <button key={mode} type="button" onClick={() => setCycleMode(mode)} className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] focus:outline-none focus:ring-4 focus:ring-cyan-200/25 ${cycleMode === mode ? "border-amber-200/50 bg-amber-200/15 text-amber-100" : "border-white/10 bg-white/[0.045] text-slate-300"}`}>{mode}</button>
        ))}
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-[auto_1fr_auto_auto]">
        <button type="button" onClick={() => shiftCycleMonth(-1)} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm font-semibold text-slate-100 focus:outline-none focus:ring-4 focus:ring-cyan-200/25"><ChevronLeft className="h-4 w-4" />Previous month</button>
        <input type="date" value={selectedCycleDate} onChange={(event) => setSelectedCycleDate(event.target.value)} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:ring-4 focus:ring-cyan-200/25" />
        <button type="button" onClick={goToday} className="rounded-2xl border border-cyan-200/20 bg-cyan-200/10 px-4 py-3 text-sm font-semibold text-cyan-100 focus:outline-none focus:ring-4 focus:ring-cyan-200/25">Current month</button>
        <button type="button" onClick={() => shiftCycleMonth(1)} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm font-semibold text-slate-100 focus:outline-none focus:ring-4 focus:ring-cyan-200/25">Next month<ChevronRight className="h-4 w-4" /></button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <CycleNumberCard title="Personal Year" item={currentCycle.personalYear} active={cycleMode === "Year"} />
        <CycleNumberCard title="Personal Month" item={currentCycle.personalMonth} active={cycleMode === "Month"} />
        <CycleNumberCard title="Personal Day" item={currentCycle.personalDay} active={cycleMode === "Day"} />
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
        <ActivatedGateCard item={activeGate} />
        <DailySignal signal={currentCycle.dailySignal} />
      </div>

      <div className="mt-4">
        <MonthlyPulse pulse={currentCycle.monthlyPulse} />
      </div>
    </Section>
  );
}
