import React from "react";
import { contactLinks } from "../../data/contactLinks.js";
import { exportSizes } from "../../data/exportConfig.js";
import { timelineMood } from "../../data/symbolicLayers.js";
import {
  ExportActivationKeys,
  ExportBeingArchitecture,
  ExportBirthSignature,
  ExportDominantHidden,
  ExportFooter,
  ExportHeader,
  ExportMatrixGrid,
  ExportReflectionQuote,
  ExportShell,
  ExportTextSection
} from "./ExportShared.jsx";

function PatternLineSummary({ reading }) {
  const active = reading.patternLines.filter((line) => line.status === "Active");
  const partial = reading.patternLines.filter((line) => line.status === "Partial");
  return (
    <ExportTextSection title="Pattern Lines Summary">
      <p>Active: {active.map((line) => line.name).join(", ") || "-"}</p>
      <p>Partial: {partial.map((line) => line.name).join(", ") || "-"}</p>
    </ExportTextSection>
  );
}

function ExportContactFooter() {
  return (
    <ExportTextSection title="Win Soul of Love">
      <p>LINE Official: {contactLinks.lineOa.id}</p>
      <p>Email: {contactLinks.email.address}</p>
      <p>Portfolio Hub: {contactLinks.portfolio.url}</p>
    </ExportTextSection>
  );
}

export default function FullReportExport({ analysis, reading, exportRef, includeSacredResonance }) {
  const sacred = reading.symbolicResult.sacredResonance;
  const sacredItems = [sacred.primary, ...sacred.supporting].filter(Boolean);
  return (
    <ExportShell exportRef={exportRef} size={exportSizes["Full Report"]} className="p-12">
      <ExportHeader analysis={analysis} privateDetails />
      <div className="mt-6 grid gap-5">
        <ExportTextSection title="Core Journey Mode">
          <p className="text-2xl font-black">{reading.timeline}</p>
          <p>{timelineMood[reading.timeline]}</p>
          <p className="mt-2 text-sm text-slate-300">Stable pattern derived from the Core Matrix, not the selected monthly energy.</p>
        </ExportTextSection>
        <ExportBeingArchitecture reading={reading} mode="full" />
        <ExportMatrixGrid analysis={analysis} />
        <ExportDominantHidden analysis={analysis} />
        <ExportBirthSignature reading={reading} variant="full" />
        <ExportTextSection title="Core Tension">
          <p className="text-xl font-black text-amber-100">{reading.coreTension.title}</p>
          <p>{reading.coreTension.text}</p>
        </ExportTextSection>
        <PatternLineSummary reading={reading} />
        <ExportTextSection title="Relationship Pattern">{reading.relationshipPattern}</ExportTextSection>
        <ExportTextSection title="Work & Creative Pattern">{reading.workPattern}</ExportTextSection>
        <ExportTextSection title="Money & Power Pattern">{reading.moneyPattern}</ExportTextSection>
        <ExportTextSection title="Growth Direction">{reading.growth}</ExportTextSection>
        <ExportTextSection title="Personality Overview">{reading.personality}</ExportTextSection>
        <ExportTextSection title="Emotional Pattern">{reading.emotional}</ExportTextSection>
        <ExportTextSection title="Spiritual Pattern">{reading.spiritual}</ExportTextSection>
        <ExportTextSection title="Shadow Side">{reading.shadow}</ExportTextSection>
        <ExportActivationKeys reading={reading} />
        {includeSacredResonance && sacredItems.length > 0 && (
          <ExportTextSection title="Sacred Resonance — Optional Symbolic Layer">
            <p>{sacredItems.map((item) => item.name).join(", ")}</p>
            <p className="mt-2 text-slate-200">ใช้เป็นแรงบันดาลใจในการทำความดีและการเติบโตภายใน ไม่ใช่การระบุเทพประจำตัว</p>
          </ExportTextSection>
        )}
        <ExportReflectionQuote reading={reading} />
        <ExportContactFooter />
      </div>
      <ExportFooter />
    </ExportShell>
  );
}
