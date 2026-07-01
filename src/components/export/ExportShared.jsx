import React from "react";
import { getGate, getGateStatus, matrixOrder } from "../../data/gates.js";
import { formatBirthDateDisplayLines } from "../../lib/dateDisplay.js";
import { compact } from "../ui.jsx";

const statusClasses = {
  Hidden: "border-white/12 bg-white/[0.035] text-slate-300",
  Seed: "border-cyan-100/30 bg-cyan-200/10 text-cyan-50",
  Active: "border-amber-100/45 bg-amber-200/12 text-amber-50",
  Amplified: "border-fuchsia-100/45 bg-fuchsia-200/14 text-fuchsia-50",
  Dominant: "border-amber-100/70 bg-gradient-to-br from-amber-200/24 via-fuchsia-300/16 to-cyan-300/14 text-white"
};

const statusGlow = {
  Hidden: "shadow-none opacity-70",
  Seed: "shadow-[0_0_18px_rgba(125,211,252,0.14)]",
  Active: "shadow-[0_0_24px_rgba(251,191,36,0.16)]",
  Amplified: "shadow-[0_0_28px_rgba(217,70,239,0.18)]",
  Dominant: "shadow-[0_0_38px_rgba(251,191,36,0.28)]"
};

export function ExportShell({ exportRef, size, children, className = "" }) {
  return (
    <div className="pointer-events-none fixed -left-[10000px] top-0 bg-[#05030f]" id={`export-${size.slug}`} style={{ width: size.width }}>
      <section
        ref={exportRef}
        className={`relative overflow-hidden border border-amber-200/25 bg-[#070513] text-white ${className}`}
        style={{
          width: size.width,
          height: size.height,
          minHeight: size.minHeight,
          fontFamily: "'Noto Sans Thai', 'Leelawadee UI', Tahoma, sans-serif",
          backgroundImage:
            "radial-gradient(circle at 18% 5%, rgba(168,85,247,.22), transparent 30%), radial-gradient(circle at 85% 12%, rgba(34,211,238,.16), transparent 28%), radial-gradient(circle at 50% 100%, rgba(245,158,11,.13), transparent 35%)"
        }}
      >
        <div className="pointer-events-none absolute inset-8 rounded-[2.2rem] border border-amber-100/20" />
        <div className="pointer-events-none absolute left-12 right-12 top-12 h-px bg-gradient-to-r from-transparent via-amber-100/55 to-transparent" />
        <div className="pointer-events-none absolute bottom-12 left-12 right-12 h-px bg-gradient-to-r from-transparent via-cyan-100/35 to-transparent" />
        <div className="pointer-events-none absolute right-10 top-10 h-24 w-24 rounded-full border border-amber-100/20" />
        <div className="pointer-events-none absolute -left-20 top-48 h-72 w-72 rounded-full border border-cyan-100/10" />
        <div className="pointer-events-none absolute bottom-36 right-12 text-amber-100/25">✦</div>
        {children}
      </section>
    </div>
  );
}

export function ExportHeader({ analysis, privateDetails = false, eyebrow = "MATRIX 9 LIVING SOUL MAP", compactHeader = false }) {
  const dateLines = formatBirthDateDisplayLines(analysis);
  return (
    <header className="relative border-b border-white/10 pb-5">
      <p className="text-sm font-black uppercase tracking-[0.28em] text-amber-200">{eyebrow}</p>
      <div className="mt-3 flex items-end justify-between gap-5">
        <div>
          <h2 className={`${compactHeader ? "text-4xl" : "text-5xl"} font-black leading-tight text-white`}>{analysis.name || "Unnamed Soul"}</h2>
          <p className="mt-2 text-xl font-semibold text-cyan-100">Life Path {analysis.lifePath}</p>
        </div>
        <div className="rounded-2xl border border-amber-200/30 bg-amber-200/10 px-4 py-3 text-right">
          <p className="text-xs uppercase tracking-[0.18em] text-amber-100">Birth Signature</p>
          <p className="mt-1 text-lg font-black">Private Core Map</p>
        </div>
      </div>
      {privateDetails && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-sm leading-6 text-slate-200">
          <p>{dateLines.input}</p>
          <p>{dateLines.canonical}</p>
          <p className="text-amber-100">Private Full Report: birth date is included only in this private export.</p>
        </div>
      )}
    </header>
  );
}

export function ExportGateCard({ analysis, number, social = false }) {
  const gate = getGate(number);
  const count = analysis.counts[number] || 0;
  const status = getGateStatus(count);
  const isCenter = number === 5;
  return (
    <article className={`relative min-h-[126px] rounded-[1.35rem] border p-3 ${statusClasses[status.label]} ${statusGlow[status.label]} ${isCenter ? "ring-2 ring-amber-100/25" : ""}`} style={{ backgroundImage: `linear-gradient(135deg, rgba(255,255,255,.035), rgba(255,255,255,0)), radial-gradient(circle at 15% 10%, rgba(251,191,36,.12), transparent 42%)` }}>
      <div className="pointer-events-none absolute inset-2 rounded-[1rem] border border-white/5" />
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className={`${social ? "text-4xl" : "text-5xl"} font-black leading-none`}>{number}</p>
          <p className="mt-2 text-[0.68rem] font-black uppercase tracking-[0.12em] text-amber-100">{gate.name}</p>
        </div>
        <div className="rounded-full border border-white/15 bg-slate-950/45 px-2 py-1 text-[0.66rem] font-bold text-cyan-50">x{count}</div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="rounded-full border border-white/10 bg-white/[0.06] px-2 py-1 text-[0.62rem] font-bold uppercase tracking-[0.08em]">{status.short}</span>
        <span className="text-[0.62rem] text-slate-300">{gate.keyword}</span>
      </div>
      <div className="pointer-events-none absolute bottom-2 right-3 text-lg text-white/20">{isCenter ? "✦" : "◇"}</div>
    </article>
  );
}

export function ExportMatrixGrid({ analysis, social = false }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {matrixOrder.map((number) => <ExportGateCard key={number} analysis={analysis} number={number} social={social} />)}
    </div>
  );
}

export function ExportBeingArchitecture({ reading, mode = "full" }) {
  const being = reading.symbolicResult.beingArchitecture;
  if (mode === "social") {
    return (
      <section className="rounded-[1.6rem] border border-fuchsia-100/25 bg-fuchsia-200/10 p-5">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-fuchsia-100">Being Architecture</p>
        <h3 className="mt-2 text-4xl font-black">{being.primary.name}</h3>
        <p className="mt-1 text-lg font-semibold text-amber-100">{being.primary.title}</p>
        <p className="mt-2 text-sm font-semibold text-cyan-50">{being.primary.keywords.slice(0, 4).join(" · ")}</p>
      </section>
    );
  }

  if (mode === "story") {
    return (
      <section className="rounded-[1.6rem] border border-fuchsia-100/25 bg-fuchsia-200/10 p-5">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-fuchsia-100">Being Architecture — Cosmic Archetype</p>
        <h3 className="mt-2 text-4xl font-black">{being.primary.name}</h3>
        <p className="mt-1 text-lg font-semibold text-amber-100">{being.primary.title}</p>
        <p className="mt-3 text-lg leading-8 text-slate-100">{being.primary.shortMeaning}</p>
      </section>
    );
  }

  return (
    <section className="rounded-[1.6rem] border border-fuchsia-100/25 bg-fuchsia-200/10 p-6">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-fuchsia-100">Being Architecture — Cosmic Archetype</p>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {[
          ["Primary Core Energy", being.primary],
          ["Supporting Star Resonance", being.supporting],
          ["Earth Integration", being.earthIntegration]
        ].map(([label, item]) => (
          <article key={label} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cyan-100">{label}</p>
            <h3 className="mt-2 text-2xl font-black">{item.name}</h3>
            <p className="mt-1 text-sm text-amber-100">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">{item.keywords.slice(0, 4).join(" · ")}</p>
            <p className="mt-2 text-base leading-7 text-slate-100">{item.shortMeaning}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ExportDominantHidden({ analysis }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-[1.35rem] border border-amber-100/25 bg-amber-200/10 p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-100">Dominant Gates</p>
        <p className="mt-2 text-4xl font-black">{analysis.dominant.join(" · ") || "-"}</p>
      </div>
      <div className="rounded-[1.35rem] border border-cyan-100/20 bg-cyan-200/10 p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">Hidden Gates</p>
        <p className="mt-2 text-4xl font-black">{analysis.missing.join(" · ") || "-"}</p>
      </div>
    </div>
  );
}

export function ExportBirthSignature({ reading, variant = "full" }) {
  const text = variant === "short" ? reading.birthSignatureShort : variant === "medium" ? reading.birthSignatureMedium : reading.birthSignatureFull || reading.birthSignature;
  return (
    <section className="rounded-[1.45rem] border border-white/10 bg-white/[0.065] p-5">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-100">Birth Signature</p>
      <p className="mt-3 text-lg leading-8 text-slate-100">{text}</p>
    </section>
  );
}

export function ExportActivationKeys({ reading }) {
  return (
    <section className="rounded-[1.6rem] border border-cyan-100/20 bg-cyan-200/10 p-5">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-100">Three Activation Keys</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {reading.activationKeys.slice(0, 3).map((key, index) => (
          <article key={key} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-100">Key {index + 1}</p>
            <p className="mt-2 text-base leading-7 text-slate-100">{key}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ExportReflectionQuote({ reading, large = false }) {
  return (
    <section className="relative rounded-[1.6rem] border border-amber-100/35 bg-gradient-to-br from-amber-200/18 via-fuchsia-300/10 to-cyan-300/12 p-6">
      <div className="pointer-events-none absolute inset-3 rounded-[1.2rem] border border-white/10" />
      <div className="pointer-events-none absolute left-6 right-6 top-4 h-px bg-gradient-to-r from-transparent via-amber-100/40 to-transparent" />
      <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-100">Reflection Quote</p>
      <p className={`mt-3 font-bold leading-[1.5] ${large ? "text-4xl" : "text-2xl"}`}>“{compact(reading.quote, large ? 150 : 220)}”</p>
    </section>
  );
}

export function ExportFooter() {
  return (
    <footer className="mt-6 text-center">
      <div className="mx-auto mb-3 h-px w-56 bg-gradient-to-r from-transparent via-amber-100/50 to-transparent" />
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-100">Win Soul of Love · Living Soul Map</p>
      <p className="mt-1 text-[0.65rem] uppercase tracking-[0.24em] text-slate-400">Soul of Love Signature System</p>
    </footer>
  );
}

export function ExportTextSection({ title, children }) {
  return (
    <section className="rounded-[1.35rem] border border-white/10 bg-white/[0.06] p-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-100">{title}</p>
      <div className="mt-3 text-base leading-8 text-slate-100">{children}</div>
    </section>
  );
}
