import React from "react";
import { KeyRound } from "lucide-react";
import { Section } from "./ui.jsx";

export default function ActivationKeys({ keys }) {
  return (
    <Section title="Three Activation Keys" icon={KeyRound}>
      <div className="grid gap-3 md:grid-cols-3">
        {keys.map((key, index) => (
          <article key={key} className="rounded-2xl border border-amber-200/20 bg-amber-200/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-100">Key {index + 1}</p>
            <p className="mt-2 text-sm leading-7 text-slate-100">{key}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
