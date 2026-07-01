import React from "react";
import { GitCompareArrows } from "lucide-react";
import { Section } from "./ui.jsx";

export default function CoreTension({ tension }) {
  return (
    <Section title="Core Tension" icon={GitCompareArrows}>
      <div className="rounded-2xl border border-fuchsia-200/20 bg-fuchsia-200/10 p-4">
        <h3 className="text-xl font-black text-fuchsia-50">{tension.title}</h3>
        <p className="mt-2 text-base leading-8 text-slate-100">{tension.text}</p>
      </div>
    </Section>
  );
}
