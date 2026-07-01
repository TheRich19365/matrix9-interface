import { getGate } from "../data/gates.js";

export const patternLineDefinitions = [
  { id: "identity-flow", type: "Horizontal", numbers: [1, 2, 3], name: "Identity Flow", meaning: "ตัวตน → ความรู้สึก → การแสดงออก" },
  { id: "human-foundation", type: "Horizontal", numbers: [4, 5, 6], name: "Human Foundation", meaning: "โครงสร้าง → แก่นกลาง → ความสัมพันธ์" },
  { id: "impact-path", type: "Horizontal", numbers: [7, 8, 9], name: "Impact Path", meaning: "ปัญญา → พลังโลกจริง → ภารกิจ" },
  { id: "inner-growth", type: "Vertical", numbers: [1, 4, 7], name: "Inner Growth", meaning: "แรงเริ่มต้น → รากฐาน → ปัญญา" },
  { id: "emotional-power", type: "Vertical", numbers: [2, 5, 8], name: "Emotional Power", meaning: "ความรู้สึก → สมดุล → อำนาจ" },
  { id: "creative-contribution", type: "Vertical", numbers: [3, 6, 9], name: "Creative Contribution", meaning: "การสื่อสาร → ความสัมพันธ์ → การส่งต่อ" },
  { id: "soul-direction", type: "Diagonal", numbers: [1, 5, 9], name: "Soul Direction", meaning: "ตัวตน → แก่นกลาง → ภารกิจ" },
  { id: "insight-channel", type: "Diagonal", numbers: [3, 5, 7], name: "Insight Channel", meaning: "การแสดงออก → การประสาน → ปัญญาภายใน" }
];

// Rule: Active = all 3 gates present, Partial = 1-2 gates present, Dormant = no gates present.
export function getPatternLineStatus(activeCount) {
  if (activeCount === 3) return "Active";
  if (activeCount > 0) return "Partial";
  return "Dormant";
}

export function analyzePatternLines(analysis) {
  return patternLineDefinitions.map((line) => {
    const activeNumbers = line.numbers.filter((number) => analysis.counts[number] > 0);
    const status = getPatternLineStatus(activeNumbers.length);
    return {
      ...line,
      gates: line.numbers.map(getGate),
      activeNumbers,
      status,
      summary: status === "Active"
        ? `${line.name} เปิดครบทั้งสามจุด พลังนี้มีแนวโน้มไหลเป็นเส้นทางที่เห็นได้ชัด`
        : status === "Partial"
          ? `${line.name} เปิดบางส่วน ชวนเติมพื้นที่ที่ยังเงียบเพื่อให้พลังไหลครบขึ้น`
          : `${line.name} ยังอยู่ในโหมด Dormant เป็นแนวพัฒนาที่ค่อย ๆ ปลุกได้`
    };
  });
}
