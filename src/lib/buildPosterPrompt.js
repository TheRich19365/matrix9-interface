function gateList(numbers) {
  return numbers?.length ? numbers.join(", ") : "-";
}

function formatGateCounts(analysis) {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => `${number}: ${analysis.counts[number] || 0}`).join(" | ");
}

function formatActivationKeys(keys) {
  return keys.slice(0, 3).map((key, index) => `${index + 1}. ${key}`).join("\n");
}

function formatSacred(reading, includeSacredResonance) {
  if (!includeSacredResonance) {
    return "Sacred Resonance: disabled. Do not add any deity, divine figure, lineage, or spiritual portrait.";
  }
  const sacred = reading.symbolicResult?.sacredResonance;
  const items = [sacred?.primary, ...(sacred?.supporting || [])].filter(Boolean);
  if (!items.length) return "Sacred Resonance: enabled, but no current sacred resonance selected. Do not add any deity.";
  return [
    "Sacred Resonance: enabled as optional symbolic inspiration only.",
    `Use only these current results: ${items.map((item) => item.name).join(", ")}.`,
    "Represent them through subtle symbolic emblems or light motifs by default, not literal deity portraits."
  ].join("\n");
}

export function buildPosterPrompt({ analysis, reading, includeSacredResonance = false }) {
  const being = reading.symbolicResult?.beingArchitecture || reading.being;
  const primaryBeing = being.primary;
  const supportingBeing = being.supporting;
  const earthIntegration = being.earthIntegration || reading.being?.earth;

  return [
    "Generate the final image directly. Do not only explain, summarize, or describe the design.",
    "Create a premium vertical Soul of Love MATRIX 9 — LIVING SOUL MAP poster.",
    "",
    "CURRENT RESULT DATA",
    `Name: ${analysis.name || "Unnamed Soul"}`,
    `Birth display: public-safe signature only. Do not print the full birth date.`,
    `Life Path: ${analysis.lifePath}`,
    `Core Journey Mode: ${reading.timeline}`,
    `Dominant Gates: ${gateList(analysis.dominant)}`,
    `Hidden Gates: ${gateList(analysis.missing)}`,
    `Hidden Potential 0 count: ${analysis.zeroCount}`,
    `Matrix 9 counts: ${formatGateCounts(analysis)}`,
    "",
    "BEING ARCHITECTURE — COSMIC ARCHETYPE",
    `Primary Core Energy: ${primaryBeing.name}`,
    `Title: ${primaryBeing.title}`,
    `Keywords: ${primaryBeing.keywords.slice(0, 4).join(", ")}`,
    `Meaning: ${primaryBeing.shortMeaning || primaryBeing.meaning}`,
    `Supporting Resonance: ${supportingBeing.name} — ${supportingBeing.title}`,
    `Earth Integration: ${earthIntegration.name} — ${earthIntegration.title}`,
    "",
    formatSacred(reading, includeSacredResonance),
    "",
    "POSTER STRUCTURE",
    "Top: Soul of Love / Matrix 9 Living Soul Map / display name.",
    "Center: clean 3x3 Matrix grid, Gate numbers 1-9, visible counts, dominant gates glowing softly.",
    "Near center: Being Architecture as the main symbolic archetype signature. Use the exact Primary Core Energy name above.",
    "Lower section: concise Birth Signature, Core Tension, and exactly 3 ACTIVATION KEYS.",
    "Footer: Win Soul of Love signature.",
    "",
    "3 ACTIVATION KEYS",
    formatActivationKeys(reading.activationKeys),
    "",
    "VISUAL STYLE",
    "Dark cosmic premium infographic, smoked glass, refined champagne gold, pearl glow, cyan and violet aura accents, elegant sacred geometry, readable Thai/English typography, luxury spiritual-tech dashboard, clean vertical poster, not cluttered.",
    "",
    "STRICT GUARDRAILS",
    "Core Matrix is primary. Being Architecture is the main symbolic archetype layer.",
    "Do not add any deity, lineage, archetype, number, or reading not present in the supplied current result.",
    "Do not invent extra gates, extra activation keys, guardian deities, starseed claims, or deterministic fortune telling.",
    "Use soft symbolic language only. This is for self-awareness and growth, not fixed destiny.",
    "Do not print the full birth date on the public poster.",
    "Do not write 7 activation keys. The poster must say exactly: 3 ACTIVATION KEYS."
  ].join("\n");
}
