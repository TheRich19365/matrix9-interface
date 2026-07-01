import { getGate, getGateStatus } from "../data/gates.js";
import { patternLineDefinitions } from "./patternLines.js";

export const DEFAULT_TIMEZONE = "Asia/Bangkok";
export const MASTER_NUMBERS = [11, 22, 33];

export function sumDigits(value) {
  return String(Math.abs(Number(value) || 0))
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);
}

function reduceToRoot(value) {
  let n = Number(value) || 0;
  while (n > 9) n = sumDigits(n);
  return n;
}

// Reduction rule: reduce by digit sums until the result is 1-9, unless the
// process resolves to 11, 22, or 33 first. Master values are preserved as tone
// metadata while their Gate-compatible root remains 2, 4, or 6.
export function reduceCycleNumber(value) {
  let n = Number(value) || 0;
  while (n > 9 && !MASTER_NUMBERS.includes(n)) {
    n = sumDigits(n);
  }
  const isMaster = MASTER_NUMBERS.includes(n);
  const root = isMaster ? reduceToRoot(n) : n;
  return {
    value: n,
    root,
    isMaster,
    label: isMaster ? `${n}/${root}` : String(root),
    gate: getGate(root)
  };
}

export function getBangkokToday() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: DEFAULT_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());
  const byType = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${byType.year}-${byType.month}-${byType.day}`;
}

export function parseISODate(dateString) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString || "");
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  return { year, month, day };
}

export function daysInMonth(year, month) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function shiftMonth(dateString, delta) {
  const parsed = parseISODate(dateString) || parseISODate(getBangkokToday());
  const target = new Date(Date.UTC(parsed.year, parsed.month - 1 + delta, 1));
  const year = target.getUTCFullYear();
  const month = target.getUTCMonth() + 1;
  const day = Math.min(parsed.day, daysInMonth(year, month));
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function calculatePersonalYear(analysis, selectedDate) {
  const parsed = parseISODate(selectedDate);
  const [birthDay, birthMonth] = analysis.canonicalBirthDate.split("/").map(Number);
  const birthDayRoot = reduceCycleNumber(birthDay).root;
  const birthMonthRoot = reduceCycleNumber(birthMonth).root;
  const currentYearRoot = reduceCycleNumber(sumDigits(parsed.year)).root;
  return reduceCycleNumber(birthDayRoot + birthMonthRoot + currentYearRoot);
}

export function calculatePersonalMonth(personalYear, selectedDate) {
  const parsed = parseISODate(selectedDate);
  return reduceCycleNumber(personalYear.root + parsed.month);
}

export function calculatePersonalDay(personalMonth, selectedDate) {
  const parsed = parseISODate(selectedDate);
  return reduceCycleNumber(personalMonth.root + parsed.day);
}

export function deriveCycleGateStatus(analysis, cycleNumber, source) {
  const gateNumber = cycleNumber.root;
  const natalCount = analysis.counts[gateNumber] || 0;
  const natalStatus = getGateStatus(natalCount);
  let cycleStatus = "Growth Activation";
  if (natalCount === 1) cycleStatus = "Temporarily Activated";
  if (natalCount >= 2 && natalCount <= 3) cycleStatus = "Amplified by Current Cycle";
  if (natalCount >= 4) cycleStatus = "High-Intensity Cycle";
  const meaning = {
    "Growth Activation": "พลังที่กำลังถูกกระตุ้นในพื้นที่ที่ Core Matrix ยังเงียบอยู่ จึงเป็นพื้นที่สำหรับการเติบโต",
    "Temporarily Activated": "พลังเมล็ดเดิมได้รับแรงหนุนชั่วคราวจากช่วงเวลา",
    "Amplified by Current Cycle": "พลังเดิมที่ทำงานอยู่แล้วได้รับแรงขยายจากช่วงเวลานี้",
    "High-Intensity Cycle": "พลังที่เข้มอยู่แล้วถูกเน้นมากขึ้น ควรใช้ด้วยความสมดุลและขอบเขต"
  }[cycleStatus];
  return {
    source,
    number: gateNumber,
    label: cycleNumber.label,
    isMaster: cycleNumber.isMaster,
    gate: getGate(gateNumber),
    natalCount,
    natalStatus,
    cycleStatus,
    meaning
  };
}

export function deriveCyclePatternLines(analysis, currentCycle, mode = "Month") {
  const cycleRoots = [currentCycle.personalYear.root];
  if (mode === "Month" || mode === "Day") cycleRoots.push(currentCycle.personalMonth.root);
  if (mode === "Day") cycleRoots.push(currentCycle.personalDay.root);
  const uniqueCycleRoots = [...new Set(cycleRoots)];

  return patternLineDefinitions.map((line) => {
    const natalPresent = line.numbers.filter((number) => analysis.counts[number] > 0);
    const cycleNumbers = uniqueCycleRoots.filter((number) => line.numbers.includes(number));
    const union = [...new Set([...natalPresent, ...cycleNumbers])];
    const natalActive = natalPresent.length === 3;
    let cycleStatus = "Resting";
    if (natalActive) cycleStatus = "Natal Active";
    else if (union.length === 3) cycleStatus = "Temporarily Completed";
    else if (cycleNumbers.length > 0) cycleStatus = "Cycle Supported";
    return {
      ...line,
      natalStatus: natalActive ? "Active" : natalPresent.length > 0 ? "Partial" : "Dormant",
      cycleStatus,
      cycleNumbers
    };
  });
}

function pickCycleLine(cyclePatternLines) {
  return cyclePatternLines.find((line) => line.cycleStatus === "Temporarily Completed")
    || cyclePatternLines.find((line) => line.cycleStatus === "Cycle Supported")
    || cyclePatternLines.find((line) => line.cycleStatus === "Natal Active")
    || cyclePatternLines[0];
}

export function generateMonthlyPulse(analysis, currentCycle) {
  const primary = currentCycle.activatedGates.month;
  const support = currentCycle.activatedGates.year;
  const line = pickCycleLine(currentCycle.cyclePatternLines.month);
  const isGrowth = primary.natalCount === 0;
  return {
    currentMonthTheme: `แนวโน้มของเดือนนี้ชวนให้ใช้พลัง ${primary.gate.name} (${primary.gate.keyword}) อย่างมีสติ`,
    primaryActivatedGate: primary,
    supportingYearGate: support,
    monthlyCoreTension: isGrowth
      ? `Gate ${primary.number} เป็นพื้นที่เติบโต เพราะใน Core Matrix ยังไม่ปรากฏชัด`
      : `Gate ${primary.number} เชื่อมกับพลังเดิมใน Core Matrix และชวนใช้ให้สมดุลขึ้น`,
    activatedPatternLine: line,
    opportunity: `โอกาสของเดือนนี้คือการนำ ${primary.gate.coreGift} มาใช้ในสิ่งที่จับต้องได้`,
    watch: `สิ่งที่ควรสังเกตคือ ${primary.gate.shadowPattern}`,
    action: primary.gate.activationKey,
    reflectionQuestion: `เดือนนี้ฉันจะใช้พลัง ${primary.gate.name} โดยไม่กดดันตัวเองได้อย่างไร`
  };
}

export function generateDailySignal(currentCycle) {
  const daily = currentCycle.activatedGates.day;
  const support = currentCycle.activatedGates.month;
  return {
    selectedDate: currentCycle.selectedDate,
    dailyGate: daily,
    supportingGate: support,
    theme: `วันนี้พลัง ${daily.gate.name} ชวนให้สังเกต ${daily.gate.keyword} ในจังหวะเล็ก ๆ ของชีวิต`,
    observe: daily.gate.shadowPattern,
    action: daily.gate.activationKey
  };
}

export function buildCurrentCycle(analysis, selectedDate = getBangkokToday(), mode = "Month") {
  const safeDate = parseISODate(selectedDate) ? selectedDate : getBangkokToday();
  const personalYear = calculatePersonalYear(analysis, safeDate);
  const personalMonth = calculatePersonalMonth(personalYear, safeDate);
  const personalDay = calculatePersonalDay(personalMonth, safeDate);
  const baseCycle = {
    selectedDate: safeDate,
    timezone: DEFAULT_TIMEZONE,
    mode,
    personalYear,
    personalMonth,
    personalDay,
    activatedGates: {
      year: deriveCycleGateStatus(analysis, personalYear, "Year"),
      month: deriveCycleGateStatus(analysis, personalMonth, "Month"),
      day: deriveCycleGateStatus(analysis, personalDay, "Day")
    }
  };
  const cyclePatternLines = {
    year: deriveCyclePatternLines(analysis, baseCycle, "Year"),
    month: deriveCyclePatternLines(analysis, baseCycle, "Month"),
    day: deriveCyclePatternLines(analysis, baseCycle, "Day")
  };
  const currentCycle = { ...baseCycle, cyclePatternLines };
  return {
    ...currentCycle,
    monthlyPulse: generateMonthlyPulse(analysis, currentCycle),
    dailySignal: generateDailySignal(currentCycle)
  };
}
