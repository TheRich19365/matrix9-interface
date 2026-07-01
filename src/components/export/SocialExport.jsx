import React from "react";
import { exportSizes } from "../../data/exportConfig.js";
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

export default function SocialExport({ analysis, reading, exportRef }) {
  return (
    <ExportShell exportRef={exportRef} size={exportSizes["Social Post"]} className="p-12">
      <ExportHeader analysis={analysis} compactHeader />
      <div className="mt-6 grid gap-5">
        <ExportBeingArchitecture reading={reading} mode="social" />
        <ExportMatrixGrid analysis={analysis} social />
        <ExportDominantHidden analysis={analysis} />
        <ExportBirthSignature reading={reading} variant="short" />
        <ExportReflectionQuote reading={reading} large />
      </div>
      <ExportFooter />
    </ExportShell>
  );
}
