import React, { useState } from "react";
import { getGate, getGateStatus, matrixOrder } from "../data/gates.js";
import GateCard from "./GateCard.jsx";
import GateDetail from "./GateDetail.jsx";
import { Chip } from "./ui.jsx";

export default function LivingMatrix({ analysis }) {
  const [selected, setSelected] = useState(5);
  const selectedGate = getGate(selected);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {matrixOrder.map((number) => {
          const gate = getGate(number);
          const count = analysis.counts[number];
          return <GateCard key={number} gate={gate} count={count} status={getGateStatus(count)} selected={selected === number} onSelect={() => setSelected(number)} />;
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Hidden", "Seed", "Active", "Amplified", "Dominant"].map((label) => <Chip key={label} tone={label === "Hidden" ? "slate" : "gold"}>{label}</Chip>)}
      </div>
      <GateDetail gate={selectedGate} count={analysis.counts[selected]} />
    </div>
  );
}
