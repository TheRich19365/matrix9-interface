import {
  beingScoringProfiles,
  beingSelectionRules,
  deityDb,
  earthIntegrationPaths,
  getBeingById,
  timelineMood
} from "../data/symbolicLayers.js";
import { gates, getGate, getGateStatus, matrixOrder } from "../data/gates.js";
import { analyzePatternLines } from "./patternLines.js";

function autoTimeline(analysis) {
  const d = analysis.dominant;
  if (analysis.missing.length >= 4) return "Transformation";
  if (d.includes(7) || analysis.zeroCount >= 1) return "Awakening";
  if (d.includes(2) || d.includes(9)) return "Healing";
  if (d.includes(8) || analysis.missing.includes(8)) return "Career Focus";
  if (d.includes(6) || analysis.missing.includes(6)) return "Relationship Focus";
  if (d.includes(5)) return "Growth";
  if (d.includes(1) || analysis.missing.includes(1)) return "Rebuilding";
  if (d.includes(3)) return "Spiritual Exploration";
  return "Calm";
}

function primaryNumbers(analysis) {
  return analysis.dominant.length ? analysis.dominant : [analysis.lifePath].filter(Boolean);
}

function gateText(numbers, key) {
  return numbers.map((number) => gates[number]?.[key]).filter(Boolean).join(" / ");
}

const gateHumanRoles = {
  1: "ผู้ริเริ่ม",
  2: "ผู้รับรู้อารมณ์",
  3: "ผู้สื่อสาร",
  4: "ผู้วางรากฐาน",
  5: "ผู้แสวงหาอิสรภาพ",
  6: "ผู้ดูแลความสัมพันธ์",
  7: "ผู้มองลึก",
  8: "ผู้สร้างผลลัพธ์",
  9: "ผู้ส่งต่อความหมาย"
};

function selectSacred(analysis) {
  const primaryScore = new Map();
  const supportScore = new Map();
  const add = (map, deity, amount) => map.set(deity.id, { ...deity, score: (map.get(deity.id)?.score || 0) + amount });
  deityDb.forEach((deity) => {
    if (analysis.dominant.some((n) => deity.mappedNumbers.includes(n))) add(primaryScore, deity, 5);
    if (deity.mappedNumbers.includes(analysis.lifePath)) add(primaryScore, deity, 2);
    if (analysis.missing.some((n) => deity.mappedNumbers.includes(n))) add(supportScore, deity, 0.8);
  });
  const primary = [...primaryScore.values()].sort((a, b) => b.score - a.score)[0] || null;
  const supporting = [...supportScore.values()]
    .filter((item) => item.id !== primary?.id)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);
  return {
    enabled: false,
    primary,
    supporting,
    sourceLabel: "Sacred Resonance — Optional Symbolic Layer",
    items: [primary, ...supporting].filter(Boolean)
  };
}

function gateLabel(number) {
  return `Gate ${number}${gates[number]?.name ? ` ${gates[number].name}` : ""}`;
}

function uniqueEvidence(evidence) {
  return [...new Set(evidence.filter(Boolean))];
}

function createScoreMap() {
  return new Map(
    beingScoringProfiles.stableOrder.map((id, index) => [
      id,
      { id, score: 0, evidence: [], order: index }
    ])
  );
}

function addBeingScore(scores, id, amount, evidence) {
  if (!id || !scores.has(id) || amount <= 0) return;
  const current = scores.get(id);
  current.score += amount;
  if (evidence) current.evidence.push(evidence);
}

function toScoredBeing(entry) {
  const base = getBeingById(entry.id);
  return {
    ...base,
    score: Number(entry.score.toFixed(1)),
    evidence: uniqueEvidence(entry.evidence)
  };
}

function scoreBeingArchetypes(analysis, timeline) {
  const scores = createScoreMap();
  const { weights, affinityGates } = beingScoringProfiles;
  const hasDominant = (number) => analysis.dominant.includes(number);

  Object.entries(affinityGates).forEach(([id, numbers]) => {
    numbers.forEach((number) => {
      const count = analysis.counts[number] || 0;
      if (hasDominant(number)) {
        addBeingScore(scores, id, weights.dominantGate, `dominant ${gateLabel(number)}`);
        if (count >= 3) addBeingScore(scores, id, weights.amplifiedGate * (count - 2), `${gateLabel(number)} amplified x${count}`);
      } else if (count > 0) {
        addBeingScore(scores, id, weights.presentGate, `present ${gateLabel(number)}`);
      }
      if (analysis.lifePath === number) {
        addBeingScore(scores, id, weights.lifePath, `Life Path ${number}`);
      }
    });
  });

  beingSelectionRules.dominantCombos.forEach((rule) => {
    if (rule.numbers.every(hasDominant)) {
      rule.ids.forEach((id) => addBeingScore(scores, id, weights.dominantCombo, `dominant combo ${rule.numbers.map(gateLabel).join(" + ")}`));
    }
  });

  beingSelectionRules.zeroCombos.forEach((rule) => {
    if (rule.numbers.every(hasDominant) && analysis.zeroCount >= rule.minZeroCount) {
      rule.ids.forEach((id) => addBeingScore(scores, id, weights.zeroCombo, `Hidden Potential 0 with ${rule.numbers.map(gateLabel).join(" + ")}`));
    }
  });

  if (analysis.zeroCount >= 1) {
    ["arcturian", "mintakan"].forEach((id) => {
      const relevantGate = affinityGates[id]?.some((number) => analysis.counts[number] > 0 || analysis.lifePath === number);
      if (relevantGate) {
        addBeingScore(scores, id, weights.zeroRelevant + (analysis.zeroCount >= 2 ? 1 : 0), `Hidden Potential 0 count ${analysis.zeroCount}`);
      }
    });
  }

  (beingSelectionRules.timelineMap[timeline] || []).forEach((id) => {
    addBeingScore(scores, id, weights.timeline, `Core Journey Mode ${timeline}`);
  });

  return [...scores.values()]
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .map(toScoredBeing);
}

function findSupportingFallback(analysis, timeline, primaryId, ranked) {
  const lifePathId = beingSelectionRules.lifePathMap[analysis.lifePath];
  const candidates = [
    lifePathId,
    ...analysis.dominant.flatMap((number) =>
      Object.entries(beingScoringProfiles.affinityGates)
        .filter(([, gatesForBeing]) => gatesForBeing.includes(number))
        .map(([id]) => id)
    ),
    ...(beingSelectionRules.timelineMap[timeline] || []),
    beingSelectionRules.fallback.supporting
  ];
  const id = candidates.find((candidate) => candidate && candidate !== primaryId);
  const existing = ranked.find((item) => item.id === id);
  if (existing) return existing;
  return {
    ...getBeingById(id || beingSelectionRules.fallback.supporting),
    score: 0.5,
    evidence: [`secondary balance from Life Path ${analysis.lifePath} and current Matrix pattern`]
  };
}

function addEarthScore(scores, gate, amount, evidence) {
  if (!scores[gate] || amount <= 0) return;
  scores[gate].score += amount;
  if (evidence) scores[gate].evidence.push(evidence);
}

function scoreEarthIntegrationPath(analysis, timeline, patternLines) {
  const scores = Object.fromEntries(
    Object.values(earthIntegrationPaths).map((path) => [
      path.gate,
      { ...path, score: 0, evidence: [] }
    ])
  );

  [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((gate) => {
    const count = analysis.counts[gate] || 0;
    if (analysis.missing.includes(gate)) addEarthScore(scores, gate, 14, `hidden ${gateLabel(gate)}`);
    else if (count === 1) addEarthScore(scores, gate, 6, `${gateLabel(gate)} is present as Seed`);
  });

  patternLines.forEach((line) => {
    if (line.status === "Active") return;
    line.numbers.forEach((gate) => {
      const count = analysis.counts[gate] || 0;
      if (line.status === "Dormant") addEarthScore(scores, gate, count === 0 ? 4 : 1, `Dormant line: ${line.name}`);
      if (line.status === "Partial" && count <= 1) addEarthScore(scores, gate, count === 0 ? 3 : 1.5, `Partial line: ${line.name}`);
    });
  });

  const has = (number) => (analysis.counts[number] || 0) > 0;
  const missing = (number) => analysis.missing.includes(number);
  [
    { gate: 4, test: () => has(5) && missing(4), evidence: "Core Tension: freedom needs structure" },
    { gate: 3, test: () => has(2) && missing(3), evidence: "Core Tension: feeling needs expression" },
    { gate: 6, test: () => has(8) && missing(6), evidence: "Core Tension: results need relational care" },
    { gate: 1, test: () => has(7) && missing(1), evidence: "Core Tension: inner wisdom needs initiative" },
    { gate: 4, test: () => has(9) && missing(4), evidence: "Core Tension: purpose needs foundation" }
  ].forEach((rule) => {
    if (rule.test()) addEarthScore(scores, rule.gate, 5, rule.evidence);
  });

  const timelineIntegration = {
    Healing: [2, 6],
    Growth: [5, 3],
    Transformation: [5, 8],
    "Career Focus": [8, 4],
    "Relationship Focus": [6, 2],
    Awakening: [7, 3],
    Rebuilding: [4, 1],
    "Spiritual Exploration": [7, 9],
    Calm: [4, 2]
  };
  (timelineIntegration[timeline] || []).forEach((gate) => addEarthScore(scores, gate, 1, `Core Journey Mode ${timeline}`));

  const selected = Object.values(scores).sort((a, b) => b.score - a.score || a.gate - b.gate)[0] || earthIntegrationPaths[4];
  return {
    ...selected,
    score: Number(selected.score.toFixed(1)),
    evidence: uniqueEvidence(selected.evidence.length ? selected.evidence : ["lowest practical integration need in current Matrix"])
  };
}

function selectBeing(analysis, timeline, patternLines) {
  const rankedArchetypes = scoreBeingArchetypes(analysis, timeline);
  const primary = rankedArchetypes[0] || {
    ...getBeingById(beingSelectionRules.fallback.primary),
    score: 0,
    evidence: ["stable fallback because no symbolic archetype scored"]
  };
  const supporting = rankedArchetypes.find((item) => item.id !== primary.id) || findSupportingFallback(analysis, timeline, primary.id, rankedArchetypes);
  const earthIntegration = scoreEarthIntegrationPath(analysis, timeline, patternLines);
  return { primary, supporting, earthIntegration, rankedArchetypes };
}

function makeSymbolicResult(analysis, timeline, patternLines) {
  const beingArchitecture = selectBeing(analysis, timeline, patternLines);
  const sacredResonance = selectSacred(analysis);
  return { beingArchitecture, sacredResonance };
}

function makeQuote(nums, analysis, timeline) {
  const a = nums[0] || analysis.lifePath || 1;
  const b = nums[1] || analysis.lifePath || a;
  if ([2, 9].some((n) => nums.includes(n))) return `ฉันอ่าน pattern ของตัวเองผ่านความเมตตา และให้หัวใจเติบโตในจังหวะ ${timeline}`;
  if ([1, 8].every((n) => nums.includes(n))) return "ฉันใช้พลังตัวตน ความกล้า และวินัยภายในเพื่อสร้างเส้นทางของตัวเอง";
  if ([3, 5].some((n) => nums.includes(n))) return "ฉันใช้เสียง ความคิดสร้างสรรค์ และอิสระเป็นพลังนำทางชีวิต";
  if (nums.includes(7) || analysis.zeroCount) return "ฉันฟังเสียงภายในมากขึ้น และเติบโตผ่านการเข้าใจตัวเอง";
  return `ฉันกำลังเรียนรู้การบาลานซ์ระหว่างพลังเลข ${a} และบทเรียนของเลข ${b} อย่างอ่อนโยน`;
}

function getDominantTrio(analysis) {
  return matrixOrder
    .map((number) => ({ gate: getGate(number), count: analysis.counts[number], status: getGateStatus(analysis.counts[number]) }))
    .sort((a, b) => b.count - a.count || a.gate.number - b.gate.number)
    .slice(0, 3);
}

function getHiddenGates(analysis) {
  return matrixOrder.filter((number) => analysis.counts[number] === 0).map((number) => ({ gate: getGate(number), status: getGateStatus(0) })).slice(0, 4);
}

function createCoreTension(analysis) {
  const has = (n) => analysis.counts[n] > 0;
  const missing = (n) => analysis.missing.includes(n);
  const rules = [
    { test: () => has(5) && missing(4), title: "อิสระ vs โครงสร้าง", text: "มีพลังขยับและปรับตัว แต่ชีวิตอาจชวนสร้างระบบที่รองรับอิสระให้มั่นคงขึ้น" },
    { test: () => has(2) && missing(3), title: "รับรู้มาก vs พูดออกไป", text: "หัวใจรับรู้ละเอียด แต่บทเรียนคือการถ่ายทอดความต้องการให้ชัดโดยไม่ต้องรอให้อีกฝ่ายเดา" },
    { test: () => has(8) && missing(6), title: "ผลลัพธ์ vs การดูแลใจ", text: "พลังสร้างผลลัพธ์เด่น แต่ควรให้พื้นที่กับความสัมพันธ์และความอ่อนโยนไม่แพ้เป้าหมาย" },
    { test: () => has(7) && missing(1), title: "เข้าใจลึก vs ลงมือเริ่ม", text: "มีปัญญาภายในสูง แต่การเริ่มก้าวเล็ก ๆ จะทำให้ความเข้าใจกลายเป็นชีวิตจริง" },
    { test: () => has(9) && missing(4), title: "ภาพใหญ่ vs รากฐาน", text: "มองเห็นความหมายและสิ่งที่อยากส่งต่อ แต่ควรวางรากฐานเพื่อไม่ให้ภารกิจใหญ่เกินกำลัง" },
    { test: () => has(1) && has(2), title: "ตัวตน vs หัวใจ", text: "มีทั้งแรงนำและความอ่อนไหว บทเรียนคือบาลานซ์การเลือกตัวเองกับการรับรู้ความรู้สึกของคนรอบข้าง" }
  ];
  return rules.find((rule) => rule.test()) || { title: "แกนพลังหลัก", text: "Matrix นี้ชวนสังเกตว่าพลังเด่นและพลังที่ยังเงียบกำลังขอให้คุณใช้ชีวิตอย่างสมดุลขึ้น" };
}

function createActivationKeys(analysis, patternLines, coreTension) {
  const dominant = getDominantTrio(analysis).filter((item) => item.count > 0);
  const hidden = getHiddenGates(analysis);
  const activeLine = patternLines.find((line) => line.status === "Active") || patternLines.find((line) => line.status === "Partial");
  return [
    dominant[0] ? `${dominant[0].gate.name}: ${dominant[0].gate.activationKey}` : "เริ่มจากหนึ่งการกระทำเล็ก ๆ ที่ทำให้คุณรู้สึกเป็นตัวเองมากขึ้น",
    hidden[0] ? `${hidden[0].gate.name}: ลองเปิดพื้นที่ของ ${hidden[0].gate.keyword} ผ่านการฝึกเล็ก ๆ ที่ไม่กดดันตัวเอง` : "รักษาสมดุลของพลังเด่น โดยไม่ต้องพิสูจน์ตัวเองกับทุกสถานการณ์",
    activeLine ? `${activeLine.name}: ใช้เส้น ${activeLine.meaning} เป็นจุดสังเกต แล้วเลือกหนึ่งการกระทำที่ทำให้พลังไหลครบขึ้น` : `${coreTension.title}: สังเกตแรงดึงนี้โดยไม่ตัดสิน แล้วเลือกทางที่ทำให้หัวใจเบาขึ้น`
  ];
}

export function generateMatrixReading(analysis) {
  const timeline = autoTimeline(analysis);
  const nums = primaryNumbers(analysis);
  const missingText = analysis.missing.map((n) => gates[n]?.core).filter(Boolean).slice(0, 2).join(" และ ");
  const zeroText = analysis.zeroCount ? ` มีเลข 0 จำนวน ${analysis.zeroCount} ตัว สะท้อนพื้นที่ว่าง ศักยภาพซ่อนเร้น และการค้นหาความหมายภายใน` : "";
  const patternLines = analyzePatternLines(analysis);
  const dominantTrio = getDominantTrio(analysis);
  const hiddenGates = getHiddenGates(analysis);
  const coreTension = createCoreTension(analysis);
  const symbolicResult = makeSymbolicResult(analysis, timeline, patternLines);
  const sacred = symbolicResult.sacredResonance.items;
  const being = {
    primary: symbolicResult.beingArchitecture.primary,
    supporting: symbolicResult.beingArchitecture.supporting,
    earth: symbolicResult.beingArchitecture.earthIntegration
  };
  const colors = [...new Set([...nums.map((n) => gates[n]?.accent?.split(" x ")[0]), ...(timeline === "Healing" ? ["Moon Pearl"] : []), ...(timeline === "Career Focus" ? ["Champagne Gold"] : [])].filter(Boolean))].slice(0, 4);
  const luckyNumbers = [...new Set([...analysis.dominant, analysis.lifePath])].filter(Boolean);
  const activationKeys = createActivationKeys(analysis, patternLines, coreTension);
  const topGateNames = dominantTrio.filter((item) => item.count > 0).map((item) => `${item.gate.number} ${item.gate.name}`).join(", ") || `Life Path ${analysis.lifePath}`;
  const topGateMeaning = dominantTrio
    .filter((item) => item.count > 0)
    .map((item) => item.gate.core)
    .filter(Boolean)
    .slice(0, 2)
    .join(" และ ");
  const hiddenGateNames = hiddenGates.map((item) => `${item.gate.number} ${item.gate.name}`).join(", ") || "ไม่มี Gate ที่ขาด";
  const birthSignatureParts = [
    `ภาพรวมของ Matrix นี้สะท้อนแนวโน้มที่ใช้พลังผ่าน ${topGateMeaning || gateText(nums, "core") || "การค่อย ๆ เข้าใจจังหวะของตัวเอง"} เป็นแกนหลัก`,
    `Gate ที่เด่นคือ ${topGateNames}; ส่วนพื้นที่ที่ชวนฝึกเพิ่มคือ ${hiddenGateNames}`,
    `Life Path ${analysis.lifePath || "-"} ทำหน้าที่เป็นทิศทางการเดินทางภายในของชุดตัวเลขนี้`
  ];
  if (analysis.zeroCount) {
    birthSignatureParts.push(`เลข 0 จำนวน ${analysis.zeroCount} ตัวสะท้อนพื้นที่ว่าง ศักยภาพซ่อนเร้น และการค้นหาความหมายที่ยังค่อย ๆ เปิดเผย`);
  }
  const birthSignatureCore = topGateMeaning || gateText(nums, "core") || "การค่อย ๆ เข้าใจจังหวะของตัวเอง";
  const topGateRoles = dominantTrio
    .filter((item) => item.count > 0)
    .map((item) => gateHumanRoles[item.gate.number])
    .filter(Boolean)
    .slice(0, 3)
    .join(" ");
  const birthSignatureMedium = [
    `พลังหลักของชุดนี้สะท้อนบทบาท ${topGateRoles || "ผู้ค่อย ๆ เปิดพลังของตัวเอง"}`,
    `Gate เด่น: ${topGateNames}`,
    `Life Path ${analysis.lifePath || "-"} คือจังหวะนำทางภายใน${analysis.zeroCount ? ` พร้อมพลัง 0 ที่ชวนฟังพื้นที่ว่างในใจ` : ""}`
  ].join(" ");
  const birthSignatureShort = `พลังหลักสะท้อนบทบาท ${topGateRoles || "ผู้ค่อย ๆ เปิดพลังของตัวเอง"} โดยมี Life Path ${analysis.lifePath || "-"} เป็นจังหวะนำทาง`;

  return {
    timeline,
    symbolicResult,
    sacred,
    being,
    colors,
    luckyNumbers,
    patternLines,
    dominantTrio,
    hiddenGates,
    coreTension,
    activationKeys,
    birthSignature: birthSignatureParts.join(" "),
    birthSignatureFull: birthSignatureParts.join(" "),
    birthSignatureMedium,
    birthSignatureShort,
    personality: `pattern ที่เห็นได้เด่นคือ ${gateText(nums, "core") || "พลังที่ค่อย ๆ เปิดเผยตามจังหวะชีวิต"} โดย Life Path ${analysis.lifePath || "-"} เติมโทนการเดินทางเฉพาะตัว${zeroText}`,
    emotional: `ด้านอารมณ์สะท้อน ${gateText(nums, "love") || "ความต้องการเข้าใจตัวเองอย่างอ่อนโยน"}${missingText ? ` ขณะเดียวกันเลขที่ขาดชวนฝึกเรื่อง ${missingText}` : ""}`,
    spiritual: `พลังจิตวิญญาณของชุดนี้ชวนใช้ ${gateText(nums, "core")} เป็นประตูสู่การเติบโต โดย Core Journey Mode คือ ${timeline} - ${timelineMood[timeline]}`,
    relationshipPattern: `ความสัมพันธ์มีแนวโน้มเด่นที่ ${gateText(nums, "love")} ใช้การสื่อสารที่นุ่มและขอบเขตที่จริงใจจะช่วยให้หัวใจปลอดภัยขึ้น`,
    workPattern: `เส้นงานและงานสร้างสรรค์สะท้อน ${gateText(nums, "career")} หากจัดพลังให้เป็นระบบ จะเห็นทิศทางที่ชัดและใช้พรสวรรค์ได้ดีขึ้น`,
    moneyPattern: `Money & Power อ่านได้จาก ${gateText(nums, "money")} ${analysis.missing.includes(8) ? "เลข 8 ที่ขาดชวนสร้างความมั่นใจและโครงสร้างการเงินให้ชัดขึ้น" : ""} ${analysis.missing.includes(4) ? "เลข 4 ที่ขาดชวนเสริมวินัย แผน และการติดตามรายจ่าย" : ""}`,
    shadow: `ด้านเงาไม่ได้หมายถึงสิ่งไม่ดี แต่คือ pattern ที่อาจเด่นขึ้นเมื่อเหนื่อย กดดัน หรือใช้พลังไม่สมดุล: ${gateText(nums, "shadowPattern") || "อาจรู้สึกหลุดจากศูนย์กลางของตัวเอง"} ${analysis.zeroCount >= 2 ? "เลข 0 หลายตัวอาจทำให้มีช่วงค้นหาความหมายหรือรู้สึกว่างภายในได้ง่าย" : ""}`,
    growth: `${gateText(nums, "growth") || "กลับมาฟังตัวเองทีละก้าว"} สำหรับโหมด ${timeline} ให้ใช้พลังนี้อย่างอ่อนโยนและลงมือในสิ่งเล็กที่ทำได้จริงวันนี้`,
    quote: makeQuote(nums, analysis, timeline)
  };
}

export { timelineMood };
