import React from "react";
import { exportSizes } from "../../data/exportConfig.js";
import { timelineMood } from "../../data/symbolicLayers.js";
import {
  ExportBeingArchitecture,
  ExportBirthSignature,
  ExportDominantHidden,
  ExportFooter,
  ExportHeader,
  ExportMatrixGrid,
  ExportReflectionQuote,
  ExportShell
} from "./ExportShared.jsx";

export default function StoryExport({ analysis, reading, exportRef }) {
  return (
    <ExportShell exportRef={exportRef} size={exportSizes["Story 9:16"]} className="p-12">
      <ExportHeader analysis={analysis} compactHeader />
      <div className="mt-6 rounded-[1.6rem] border border-cyan-100/20 bg-cyan-200/10 p-5">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-100">Core Journey Mode</p>
        <p className="mt-2 text-4xl font-black">{reading.timeline}</p>
        <p className="mt-2 text-lg leading-8 text-slate-100">{timelineMood[reading.timeline]}</p>
      </div>
      <div className="mt-5 grid gap-5">
        <ExportBeingArchitecture reading={reading} mode="story" />
        <ExportMatrixGrid analysis={analysis} />
        <ExportDominantHidden analysis={analysis} />
        <ExportBirthSignature reading={reading} variant="medium" />
        <ExportReflectionQuote reading={reading} large />
      </div>
      <ExportFooter />
    </ExportShell>
  );
}
