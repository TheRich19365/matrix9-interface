import React, { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import {
  Copy,
  Download,
  Heart,
  RefreshCw,
  Sparkles,
  Star,
  Wand2
} from "lucide-react";

const emptyForm = { name: "", day: "", month: "", year: "", yearType: "BE" };
const matrixOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const meanings = {
  1: "Identity / Leadership / ตัวตน",
  2: "Emotion / Relationship / อารมณ์",
  3: "Communication / Creativity / การสื่อสาร",
  4: "Stability / Discipline / ความมั่นคง",
  5: "Freedom / Change / อิสระ",
  6: "Love / Responsibility / ความรัก",
  7: "Wisdom / Spirituality / ปัญญา",
  8: "Power / Money / อำนาจ",
  9: "Compassion / Humanity / เมตตา",
  0: "Hidden Potential / Void Energy / ศักยภาพซ่อนเร้น"
};

const profiles = {
  1: {
    core: "ตัวตน ภาวะผู้นำ และการกำหนดทิศทางชีวิต",
    love: "ต้องการพื้นที่ให้เป็นตัวเองและสื่อสารความต้องการตรงอย่างอ่อนโยน",
    career: "เด่นกับงานริเริ่ม ตัดสินใจ วางทิศทาง หรือเป็นเจ้าของโปรเจกต์",
    money: "การเงินเติบโตเมื่อเชื่อมั่นในคุณค่าตัวเองและกล้าตั้งเป้าหมาย",
    shadow: "เมื่อเหนื่อยอาจแบกทุกอย่างเองหรืออยากควบคุมทิศทางมากเกินไป",
    growth: "ฝึกนำโดยรับฟัง และให้ความกล้าเดินคู่กับความนุ่มนวล",
    color: "Solar Gold"
  },
  2: {
    core: "ความรู้สึก ความสัมพันธ์ ความละเอียดอ่อน และความเห็นอกเห็นใจ",
    love: "รักเติบโตผ่านการรับฟัง ความไว้วางใจ และขอบเขตทางใจ",
    career: "เหมาะกับงานประสาน ดูแลลูกค้า ทีมเวิร์ก เยียวยา หรืออ่านใจคน",
    money: "รายได้มักเกี่ยวกับเครือข่าย ความสัมพันธ์ และความไว้วางใจ",
    shadow: "เมื่อกดดันอาจรับอารมณ์คนอื่นมากเกินหรือเกรงใจจนลืมตัวเอง",
    growth: "ตั้งขอบเขตโดยไม่ลดความเมตตาของหัวใจ",
    color: "Moon Pearl"
  },
  3: {
    core: "การสื่อสาร ความคิดสร้างสรรค์ ภาษา และการแสดงออก",
    love: "ต้องการบทสนทนาที่เปิดใจ มีอารมณ์ขัน และให้พื้นที่แสดงตัวตน",
    career: "เด่นกับคอนเทนต์ การขาย การสอน การพูด ดีไซน์ หรือ storytelling",
    money: "รายได้มากับไอเดีย ภาษา การนำเสนอ และงานสร้างสรรค์",
    shadow: "เมื่อเหนื่อยอาจฟุ้งหลายทาง พูดเร็ว หรือเก็บเรื่องจริงไว้หลังรอยยิ้ม",
    growth: "เลือกสารสำคัญหนึ่งเรื่องแล้วสื่อสารให้ชัด",
    color: "Amethyst Violet"
  },
  4: {
    core: "โครงสร้าง วินัย ความมั่นคง และการลงมืออย่างต่อเนื่อง",
    love: "รักต้องการความชัดเจน ความสม่ำเสมอ และความไว้ใจที่สร้างจากการกระทำ",
    career: "เหมาะกับงานระบบ ปฏิบัติการ บริหารรายละเอียด และสร้างฐานระยะยาว",
    money: "เงินมั่นคงเมื่อมีแผน งบประมาณ และวินัยที่จับต้องได้",
    shadow: "เมื่อกดดันอาจแข็งกับตัวเองหรือยึดวิธีเดิมมากเกินไป",
    growth: "วางระบบเล็ก ๆ ที่ทำซ้ำได้และไม่กดดันหัวใจ",
    color: "Emerald Ground"
  },
  5: {
    core: "อิสระ การเปลี่ยนแปลง การปรับตัว และประสบการณ์ใหม่",
    love: "รักต้องมีอากาศหายใจ ซื่อสัตย์ต่อความรู้สึก และไม่กักขังกัน",
    career: "เด่นกับงานที่เปลี่ยนเร็ว การตลาด เดินทาง ทดลอง หรือแก้สถานการณ์",
    money: "รายได้มาจากความยืดหยุ่น โอกาสใหม่ และการปรับตัวทันจังหวะ",
    shadow: "เมื่อเหนื่อยอาจหนีกรอบเร็วเกินหรือเริ่มหลายอย่างโดยไม่ปิดงาน",
    growth: "ใช้อิสระอย่างมีทิศทางและเลือกสนามที่อยากเติบโตจริง",
    color: "Cosmic Cyan"
  },
  6: {
    core: "ความรัก ความรับผิดชอบ การดูแล และคุณค่าภายใน",
    love: "รักลึกเมื่อมีการดูแลกันอย่างสมดุล ไม่ใช่คนหนึ่งแบกทั้งหมด",
    career: "เหมาะกับงานบริการ ความงาม บ้าน ครอบครัว การดูแล หรือสร้างประสบการณ์",
    money: "เงินดีขึ้นเมื่อคุณเห็นคุณค่าของงานดูแลและตั้งราคาอย่างอ่อนโยนแต่ชัด",
    shadow: "เมื่อกดดันอาจให้มากเกิน รู้สึกผิดง่าย หรืออยากให้ทุกอย่างสมบูรณ์แบบ",
    growth: "ดูแลตัวเองให้เป็นส่วนหนึ่งของความรับผิดชอบ",
    color: "Rose Gold"
  },
  7: {
    core: "ปัญญา การมองลึก จิตวิญญาณ และการฟังเสียงภายใน",
    love: "รักต้องมีพื้นที่เงียบ ความเข้าใจลึก และการไม่เร่งคำตอบทางใจ",
    career: "เด่นกับงานวิจัย วิเคราะห์ ที่ปรึกษา เทคโนโลยี หรือความรู้เฉพาะทาง",
    money: "รายได้เติบโตผ่านความเชี่ยวชาญ ความลึก และการแปลงความรู้เป็นคุณค่า",
    shadow: "เมื่อเหนื่อยอาจปิดตัว คิดมาก หรืออยู่ในหัวจนห่างจากความรู้สึก",
    growth: "ฟังเสียงภายในแล้วแปลงเป็นการกระทำเล็ก ๆ ในโลกจริง",
    color: "Indigo Purple"
  },
  8: {
    core: "อำนาจ การเงิน การบริหาร และความทะเยอทะยานอย่างมีวุฒิภาวะ",
    love: "รักต้องเคารพพลังของกันและกัน ไม่เปลี่ยนความสัมพันธ์เป็นสนามควบคุม",
    career: "เด่นกับธุรกิจ การบริหาร การเงิน กลยุทธ์ และการสร้างผลลัพธ์",
    money: "มีพลังจัดการเงินสูงเมื่อวางโครงสร้าง เป้าหมาย และขอบเขตการตัดสินใจ",
    shadow: "เมื่อกดดันอาจวัดคุณค่าตัวเองด้วยผลลัพธ์หรือควบคุมมากเกินไป",
    growth: "ใช้อำนาจเพื่อรับใช้ ไม่ใช่เพื่อพิสูจน์ตัวเอง",
    color: "Champagne Gold"
  },
  9: {
    core: "เมตตา มนุษยธรรม การให้ และการมองภาพใหญ่ของชีวิต",
    love: "รักอบอุ่นเมื่อให้ด้วยหัวใจที่มีขอบเขตและไม่ลืมความต้องการของตัวเอง",
    career: "เหมาะกับงานช่วยเหลือ สื่อสารกับสังคม ศิลปะ การสอน หรือสร้าง impact",
    money: "เงินไหลดีเมื่อคุณเชื่อมรายได้กับคุณค่าที่ช่วยผู้คนจริง",
    shadow: "เมื่อเหนื่อยอาจแบกโลก เศร้าแทนคนอื่น หรือให้จนพลังรั่ว",
    growth: "เมตตาต่อตัวเองให้เท่ากับที่เมตตาต่อคนอื่น",
    color: "Starlight White"
  }
};

const deityDb = [
  ["พระแม่กวนอิม", [2, 9], "พลังแห่งความเมตตา การเยียวยา และหัวใจที่อ่อนโยน", "สวดมนต์ ทำทาน หรือส่งความปรารถนาดีอย่างไม่ฝืนตัวเอง"],
  ["พระพิฆเนศ", [3, 5], "พลังเปิดทาง ปัญญา ความคิดสร้างสรรค์ และการสื่อสาร", "เขียนเป้าหมาย ขอพรด้วยการลงมือหนึ่งก้าวเล็ก ๆ"],
  ["พระศิวะ", [1, 7], "พลังเปลี่ยนผ่าน ปล่อยวาง และอำนาจภายใน", "นั่งนิ่ง หายใจลึก และปล่อยสิ่งที่หมดพลังแล้ว"],
  ["พระแม่ลักษมี", [6, 8], "พลังความอุดมสมบูรณ์ ความงาม คุณค่า และความมั่งคั่ง", "จัดพื้นที่การเงินและขอบคุณคุณค่าของตัวเอง"],
  ["หนุมาน", [4], "พลังปกป้อง ความกล้า ความภักดี และการลงมือจริง", "ขยับร่างกาย วางแผน และทำสิ่งที่รับปากไว้"],
  ["พระแม่สรัสวดี", [3], "พลังภาษา ศิลปะ การเรียนรู้ และปัญญาสร้างสรรค์", "อ่าน เขียน เรียนรู้ หรือถ่ายทอดความรู้ให้คนเข้าใจง่าย"],
  ["พระแม่ธรณี", [4], "พลังการหยั่งราก ความอดทน และการกลับสู่โลกจริง", "แตะพื้น ดื่มน้ำ จัดบ้าน หรืออยู่กับธรรมชาติ"],
  ["พระแม่ทุรคา", [8], "พลังความเข้มแข็ง การปกป้อง และการยืนหยัดในคุณค่า", "ตั้งขอบเขตและเลือกใช้พลังกับสิ่งที่สำคัญจริง"]
].map(([name, mappedNumbers, meaning, practice]) => ({ name, mappedNumbers, meaning, practice }));

const beingDb = {
  "Earth Seed": ["grounded, humanity, service", "ผู้ฝังรากแสงลงบนโลก ใช้พลังผ่านชีวิตจริง การดูแล และการทำประโยชน์ให้ผู้คน"],
  Sirius: ["wisdom, discipline, structure", "พลังของครูโบราณ ผู้ถือปัญญา ระบบ และความรับผิดชอบต่อความรู้"],
  Pleiadian: ["compassion, healing, softness", "พลังแห่งหัวใจ ความเมตตา การเยียวยา และความอ่อนโยน"],
  Arcturian: ["technology, spiritual intelligence", "พลังของนักออกแบบระบบ ผู้เชื่อมเทคโนโลยีกับจิตวิญญาณ"],
  Andromedan: ["freedom, expansion, exploration", "พลังของนักเดินทางอิสระ ผู้ขยายขอบเขตชีวิตและความคิด"],
  Lyran: ["creator, courage, origin fire", "พลังนักสร้างดั้งเดิม ความกล้า ตัวตน และไฟสร้างสรรค์"],
  Orion: ["strategy, shadow integration", "พลังนักกลยุทธ์ ผู้เรียนรู้จากเงา ความคิด และการเผชิญความจริง"],
  Venusian: ["beauty, harmony, love", "พลังแห่งความงาม ความรัก ศิลปะ และความกลมกลืน"],
  Mintakan: ["purity, emotional memory", "พลังของความบริสุทธิ์ ความทรงจำทางใจ และการสร้างบ้านภายใน"],
  Atlantean: ["power, knowledge, manifestation", "พลังของความรู้ อำนาจ การสร้าง และบทเรียนเรื่องความรับผิดชอบ"],
  "Avian / Blue Ray": ["vision, communication, messenger", "พลังของผู้ส่งสาร มุมมองสูง และการสื่อสารที่ทำให้คนเข้าใจง่าย"]
};

const timelineMood = {
  Calm: "ช่วงเวลาของการตั้งหลักอย่างนุ่มนวล",
  Growth: "ช่วงเวลาที่ชีวิตชวนให้ขยายและทดลอง",
  Transformation: "ช่วงเวลาแห่งการเปลี่ยนผ่านและการยกระดับภายใน",
  "Career Focus": "พลังงานกำลังมุ่งสู่เป้าหมายและความสำเร็จ",
  "Relationship Focus": "ช่วงเวลาของการสื่อสาร ขอบเขต และความไว้วางใจ",
  Healing: "ช่วงเวลาของการเยียวยาและกลับมารักตัวเอง",
  Awakening: "ช่วงเวลาที่เสียงภายในชัดขึ้น",
  Rebuilding: "ช่วงเวลาของการวางฐานใหม่",
  "Spiritual Exploration": "ช่วงเวลาของการสำรวจความหมายและสัญชาตญาณ"
};

const exportSizes = {
  "Social Post": { width: 1080, height: 1350, slug: "social" },
  "Story 9:16": { width: 1080, height: 1920, slug: "story" },
  "Full Report": { width: 1240, minHeight: 1600, slug: "full-report" }
};

function cleanDigits(value, max) {
  return String(value || "").replace(/\D/g, "").slice(0, max);
}

function reduceDigit(total) {
  let n = Number(total) || 0;
  while (n > 9) n = String(n).split("").reduce((sum, digit) => sum + Number(digit), 0);
  return n;
}

function analyze(form) {
  const rawDay = cleanDigits(form.day, 2);
  const rawMonth = cleanDigits(form.month, 2);
  const rawYear = cleanDigits(form.year, 4);
  const day = rawDay ? rawDay.padStart(2, "0") : "";
  const month = rawMonth ? rawMonth.padStart(2, "0") : "";
  const year = rawYear ? rawYear.padStart(4, "0") : "";
  const hasDate = Boolean(day && month && year);
  const adYearNumber = year ? (form.yearType === "BE" ? Number(year) - 543 : Number(year)) : 0;
  const adYear = year ? String(Math.max(adYearNumber, 0)).padStart(4, "0").slice(-4) : "";
  const digits = hasDate ? `${day}${month}${adYear}`.split("").map(Number) : [];
  const counts = Array(10).fill(0);
  digits.forEach((digit) => {
    counts[digit] += 1;
  });
  return {
    name: form.name.trim(),
    yearType: form.yearType,
    birthDate: hasDate ? `${day}/${month}/${year}` : "",
    canonicalBirthDate: hasDate ? `${day}/${month}/${adYear}` : "",
    counts,
    dominant: matrixOrder.filter((number) => counts[number] >= 2),
    missing: matrixOrder.filter((number) => counts[number] === 0),
    zeroCount: counts[0],
    lifePath: hasDate ? reduceDigit(digits.reduce((sum, digit) => sum + digit, 0)) : 0,
    hasDate
  };
}

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

function numberText(numbers, key) {
  return numbers.map((number) => profiles[number]?.[key]).filter(Boolean).join(" / ");
}

function selectSacred(analysis) {
  const score = new Map();
  const add = (deity, amount) => score.set(deity.name, { ...deity, score: (score.get(deity.name)?.score || 0) + amount });
  deityDb.forEach((deity) => {
    if (analysis.dominant.some((n) => deity.mappedNumbers.includes(n))) add(deity, 5);
    if (deity.mappedNumbers.includes(analysis.lifePath)) add(deity, 2);
    if (analysis.missing.some((n) => deity.mappedNumbers.includes(n))) add(deity, 0.8);
  });
  return [...score.values()].sort((a, b) => b.score - a.score).slice(0, 3);
}

function selectBeing(analysis, timeline) {
  const names = [];
  const has = (n) => analysis.dominant.includes(n);
  if (has(1) && has(8)) names.push("Lyran", "Orion");
  if (has(2) && has(9)) names.push("Pleiadian", "Venusian");
  if (has(3) && has(5)) names.push("Andromedan", "Avian / Blue Ray");
  if (has(4) && has(6)) names.push("Earth Seed");
  if (has(7) && analysis.zeroCount >= 1) names.push("Arcturian", "Mintakan");
  if (has(8) && has(9)) names.push("Atlantean", "Sirius");
  if (analysis.missing.includes(4) || analysis.missing.includes(6)) names.push("Earth Seed");
  const lifeMap = { 1: "Lyran", 2: "Pleiadian", 3: "Avian / Blue Ray", 4: "Earth Seed", 5: "Andromedan", 6: "Venusian", 7: "Arcturian", 8: "Atlantean", 9: "Sirius" };
  names.push(lifeMap[analysis.lifePath]);
  const timelineMap = {
    Healing: ["Pleiadian", "Venusian", "Earth Seed"],
    Transformation: ["Orion", "Atlantean", "Arcturian"],
    "Career Focus": ["Sirius", "Atlantean", "Orion"],
    "Relationship Focus": ["Venusian", "Pleiadian"],
    Awakening: ["Arcturian", "Sirius", "Mintakan"],
    Rebuilding: ["Earth Seed", "Sirius"],
    "Spiritual Exploration": ["Andromedan", "Arcturian", "Avian / Blue Ray"],
    Calm: ["Earth Seed"]
  };
  names.push(...(timelineMap[timeline] || []));
  const unique = [...new Set(names.filter(Boolean))];
  const toItem = (name) => ({ name, keywords: beingDb[name][0], meaning: beingDb[name][1] });
  return {
    primary: toItem(unique[0] || "Earth Seed"),
    supporting: toItem(unique[1] || "Sirius"),
    earth: toItem(unique.includes("Earth Seed") ? "Earth Seed" : "Earth Seed")
  };
}

function generateReading(analysis) {
  const timeline = autoTimeline(analysis);
  const nums = primaryNumbers(analysis);
  const missingText = analysis.missing.map((n) => profiles[n]?.core).filter(Boolean).slice(0, 2).join(" และ ");
  const zeroText = analysis.zeroCount ? ` มีเลข 0 จำนวน ${analysis.zeroCount} ตัว สะท้อนพื้นที่ว่าง ศักยภาพซ่อนเร้น และการค้นหาความหมายภายใน` : "";
  const sacred = selectSacred(analysis);
  const being = selectBeing(analysis, timeline);
  const colors = [...new Set([...nums.map((n) => profiles[n]?.color), ...(timeline === "Healing" ? ["Moon Pearl"] : []), ...(timeline === "Career Focus" ? ["Champagne Gold"] : [])].filter(Boolean))].slice(0, 4);
  const luckyNumbers = [...new Set([...analysis.dominant, analysis.lifePath])].filter(Boolean);

  return {
    timeline,
    sacred,
    being,
    colors,
    luckyNumbers,
    personality: `pattern ที่เห็นได้เด่นคือ ${numberText(nums, "core") || "พลังที่ค่อย ๆ เปิดเผยตามจังหวะชีวิต"} โดย Life Path ${analysis.lifePath || "-"} เติมโทนการเดินทางเฉพาะตัว${zeroText}`,
    emotional: `ด้านอารมณ์สะท้อน ${numberText(nums, "love") || "ความต้องการเข้าใจตัวเองอย่างอ่อนโยน"}${missingText ? ` ขณะเดียวกันเลขที่ขาดชวนฝึกเรื่อง ${missingText}` : ""}`,
    spiritual: `พลังจิตวิญญาณของชุดนี้ชวนใช้ ${numberText(nums, "core")} เป็นประตูสู่การเติบโต โดยโหมดปัจจุบันคือ ${timeline} - ${timelineMood[timeline]}`,
    love: `ความรักมีแนวโน้มเด่นที่ ${numberText(nums, "love")} ใช้การสื่อสารที่นุ่มและขอบเขตที่จริงใจจะช่วยให้หัวใจปลอดภัยขึ้น`,
    career: `เส้นงานสะท้อน ${numberText(nums, "career")} หากจัดพลังให้เป็นระบบ จะเห็นทิศทางที่ชัดและใช้พรสวรรค์ได้ดีขึ้น`,
    money: `การเงินอ่านได้จาก ${numberText(nums, "money")} ${analysis.missing.includes(8) ? "เลข 8 ที่ขาดชวนสร้างความมั่นใจและโครงสร้างการเงินให้ชัดขึ้น" : ""} ${analysis.missing.includes(4) ? "เลข 4 ที่ขาดชวนเสริมวินัย แผน และการติดตามรายจ่าย" : ""}`,
    shadow: `ด้านเงาไม่ได้หมายถึงสิ่งไม่ดี แต่คือ pattern ที่อาจเด่นขึ้นเมื่อเหนื่อย กดดัน หรือใช้พลังไม่สมดุล: ${numberText(nums, "shadow") || "อาจรู้สึกหลุดจากศูนย์กลางของตัวเอง"} ${analysis.zeroCount >= 2 ? "เลข 0 หลายตัวอาจทำให้มีช่วงค้นหาความหมายหรือรู้สึกว่างภายในได้ง่าย" : ""}`,
    growth: `${numberText(nums, "growth") || "กลับมาฟังตัวเองทีละก้าว"} สำหรับโหมด ${timeline} ให้ใช้พลังนี้อย่างอ่อนโยนและลงมือในสิ่งเล็กที่ทำได้จริงวันนี้`,
    quote: makeQuote(nums, analysis, timeline)
  };
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

function compact(text, max = 150) {
  return text.length > max ? `${text.slice(0, max).trim()}...` : text;
}

function Section({ title, icon: Icon = Star, children }) {
  return (
    <section className="rounded-[1.4rem] border border-white/10 bg-white/[0.065] p-5 shadow-aura backdrop-blur-xl">
      <div className="mb-3 flex items-center gap-2 text-amber-100">
        <Icon className="h-4 w-4" />
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">{title}</h2>
      </div>
      <div className="text-sm leading-7 text-slate-200">{children}</div>
    </section>
  );
}

function Chip({ children, tone = "gold" }) {
  const tones = {
    gold: "border-amber-200/30 bg-amber-200/10 text-amber-100",
    cyan: "border-cyan-200/30 bg-cyan-200/10 text-cyan-100",
    purple: "border-fuchsia-200/30 bg-fuchsia-200/10 text-fuchsia-100"
  };
  return <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

function MatrixGrid({ analysis }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {matrixOrder.map((number) => {
        const active = analysis.counts[number] > 0;
        return (
          <article key={number} className={`min-h-[112px] rounded-3xl border p-3 ${active ? "border-amber-200/40 bg-gradient-to-br from-amber-200/18 via-fuchsia-300/10 to-cyan-300/12 shadow-gold" : "border-white/10 bg-white/[0.035] opacity-70"}`}>
            <div className="flex items-start justify-between">
              <span className="text-3xl font-black">{number}</span>
              <span className="rounded-full border border-cyan-200/20 px-2 py-0.5 text-xs text-cyan-100">x{analysis.counts[number]}</span>
            </div>
            <p className="mt-3 text-[0.72rem] leading-5 text-slate-200">{meanings[number]}</p>
          </article>
        );
      })}
    </div>
  );
}

function ExportPoster({ analysis, reading, type, exportRef }) {
  const isStory = type === "Story 9:16";
  const isSocial = type === "Social Post";
  const size = exportSizes[type];
  const sections = [
    ["Personality Overview", reading.personality],
    ["Emotional Pattern", reading.emotional],
    ["Spiritual Pattern", reading.spiritual],
    ["Love", reading.love],
    ["Career", reading.career],
    ["Money", reading.money],
    ["Shadow Side", reading.shadow],
    ["Growth Advice", reading.growth]
  ];
  return (
    <div className="pointer-events-none fixed -left-[10000px] top-0 bg-[#05030f]" id={`export-${size.slug}`} style={{ width: size.width }}>
      <section ref={exportRef} className="overflow-hidden border border-amber-200/25 bg-[#080518] p-14 text-white shadow-aura" style={{ width: size.width, height: size.height, minHeight: size.minHeight, fontFamily: "'Noto Sans Thai', 'Leelawadee UI', Tahoma, sans-serif" }}>
        <div className="border-b border-white/10 pb-5">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-200">Matrix 9 Interface</p>
          <h2 className="mt-3 text-5xl font-black">{analysis.name || "Unnamed Soul"}</h2>
          <p className="mt-2 text-lg text-cyan-100">{analysis.birthDate} · {analysis.yearType} · Life Path {analysis.lifePath}</p>
          <p className="mt-1 text-sm text-amber-100">Internal calculation: {analysis.canonicalBirthDate} AD</p>
        </div>
        {isStory && (
          <div className="mt-5 rounded-3xl border border-cyan-200/20 bg-cyan-200/10 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-100">Timeline Mood</p>
            <p className="mt-2 text-2xl font-black">{reading.timeline}</p>
            <p className="mt-2 text-lg leading-8">{timelineMood[reading.timeline]}</p>
          </div>
        )}
        <div className="mt-5 grid grid-cols-3 gap-3">
          {matrixOrder.map((number) => (
            <div key={number} className="rounded-3xl border border-amber-200/25 bg-slate-950/80 p-3">
              <div className="flex justify-between">
                <span className="text-3xl font-black">{number}</span>
                <span className="text-sm text-cyan-100">x{analysis.counts[number]}</span>
              </div>
              <p className="mt-2 text-[0.7rem] leading-4 text-slate-300">{meanings[number]}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-3xl border border-amber-200/20 bg-amber-200/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-100">Dominant</p>
            <p className="mt-2 text-3xl font-black">{analysis.dominant.join(", ") || "-"}</p>
          </div>
          <div className="rounded-3xl border border-fuchsia-200/20 bg-fuchsia-200/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-fuchsia-100">Missing</p>
            <p className="mt-2 text-3xl font-black">{analysis.missing.join(", ") || "-"}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-3xl border border-cyan-200/15 bg-white/[0.045] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">Hidden Potential 0</p>
            <p className="mt-2 text-2xl font-black">x{analysis.zeroCount}</p>
          </div>
          <div className="rounded-3xl border border-cyan-200/20 bg-cyan-200/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">Lucky Colors</p>
            <div className="mt-2 flex flex-wrap gap-2">{reading.colors.map((c) => <Chip key={c} tone="cyan">{c}</Chip>)}</div>
          </div>
        </div>
        <div className="mt-4 rounded-3xl border border-amber-200/20 bg-gradient-to-br from-amber-200/12 via-fuchsia-300/10 to-white/[0.04] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-100">Main Sacred Resonance</p>
          <p className="mt-2 text-2xl font-black">{reading.sacred[0]?.name || "-"}</p>
          <p className="mt-1 text-sm leading-6 text-slate-200">{compact(reading.sacred[0]?.meaning || "ยังไม่พบพลังสิ่งศักดิ์สิทธิ์เด่นจากชุดตัวเลขนี้", 130)}</p>
        </div>
        <div className="mt-4 rounded-3xl border border-fuchsia-200/20 bg-fuchsia-200/10 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-fuchsia-100">Being Architecture</p>
          <p className="mt-2 text-2xl font-black">{reading.being.primary.name}</p>
          {!isSocial && <p className="mt-1 text-sm leading-6 text-slate-200">{compact(reading.being.primary.meaning, 140)}</p>}
        </div>
        {!isSocial && <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.065] p-5"><p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-100">Short Summary</p><p className="mt-2 text-lg leading-8">{compact(reading.personality, 240)}</p></div>}
        {!isSocial && !isStory && sections.map(([title, content]) => (
          <div key={title} className="mt-4 rounded-3xl border border-white/10 bg-white/[0.065] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-100">{title}</p>
            <p className="mt-2 text-base leading-8">{content}</p>
          </div>
        ))}
        <div className="mt-4 rounded-3xl border border-amber-200/20 bg-gradient-to-br from-amber-200/15 via-fuchsia-300/10 to-cyan-300/10 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-100">Reflection Quote</p>
          <p className="mt-2 text-2xl font-bold leading-[1.5]">“{compact(reading.quote, isSocial ? 150 : 210)}”</p>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [form, setForm] = useState(emptyForm);
  const [analysis, setAnalysis] = useState(null);
  const [exportSize, setExportSize] = useState("Social Post");
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState("");
  const socialRef = useRef(null);
  const storyRef = useRef(null);
  const fullRef = useRef(null);

  const reading = useMemo(() => (analysis?.hasDate ? generateReading(analysis) : null), [analysis]);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function generate(event) {
    event.preventDefault();
    setAnalysis(analyze(form));
  }

  function clear() {
    setForm(emptyForm);
    setAnalysis(null);
  }

  const summary = useMemo(() => {
    if (!analysis || !reading) return "";
    return [
      `Matrix 9 Interface: ${analysis.name || "-"}`,
      `Input birth date: ${analysis.birthDate} ${analysis.yearType}`,
      `Internal calculation: ${analysis.canonicalBirthDate} AD`,
      `Dominant: ${analysis.dominant.join(", ") || "-"}`,
      `Missing: ${analysis.missing.join(", ") || "-"}`,
      `Hidden Potential 0: ${analysis.zeroCount}`,
      `Life Path: ${analysis.lifePath}`,
      `Timeline Mode: ${reading.timeline}`,
      `Sacred Resonance: ${reading.sacred.map((item) => item.name).join(", ") || "-"}`,
      `Being Architecture: ${reading.being.primary.name}`,
      "",
      `Personality: ${reading.personality}`,
      `Love: ${reading.love}`,
      `Career: ${reading.career}`,
      `Money: ${reading.money}`,
      `Growth: ${reading.growth}`,
      `Quote: ${reading.quote}`
    ].join("\n");
  }, [analysis, reading]);

  async function copySummary() {
    if (!summary) return;
    await navigator.clipboard.writeText(summary);
    setCopied("summary");
    window.setTimeout(() => setCopied(""), 1600);
  }

  async function exportPng() {
    if (!analysis || !reading) return;
    const ref = { "Social Post": socialRef, "Story 9:16": storyRef, "Full Report": fullRef }[exportSize];
    const target = ref?.current;
    if (!target) return;
    setExporting(true);
    try {
      if (document.fonts?.ready) await document.fonts.ready;
      const canvas = await html2canvas(target, {
        backgroundColor: "#05030f",
        scale: 2,
        useCORS: true,
        width: target.scrollWidth,
        height: target.scrollHeight,
        windowWidth: target.scrollWidth,
        windowHeight: target.scrollHeight
      });
      const link = document.createElement("a");
      const slug = exportSizes[exportSize].slug;
      const safeName = (analysis.name || "matrix9").replace(/[^a-z0-9ก-๙_-]+/gi, "-");
      link.download = `matrix9-${safeName}-${slug}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setExporting(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#05030f] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(139,92,246,0.26),transparent_30%),radial-gradient(circle_at_85%_16%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_50%_92%,rgba(245,158,11,0.17),transparent_32%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
      </div>

      {analysis && reading && (
        <>
          <ExportPoster analysis={analysis} reading={reading} type="Social Post" exportRef={socialRef} />
          <ExportPoster analysis={analysis} reading={reading} type="Story 9:16" exportRef={storyRef} />
          <ExportPoster analysis={analysis} reading={reading} type="Full Report" exportRef={fullRef} />
        </>
      )}

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <header className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 shadow-aura backdrop-blur-xl sm:p-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-200/10 px-3 py-1 text-xs font-semibold text-amber-100">
            <Sparkles className="h-3.5 w-3.5" />
            Symbolic birth-date interface
          </div>
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">Matrix 9 Interface</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            กรอกวันเดือนปีเกิดเพื่อสร้าง Matrix 9 Interface ระบบนี้เป็นการอ่านเชิงสัญลักษณ์และพฤติกรรม เพื่อการเข้าใจตัวเอง ไม่ใช่การฟันธงชะตาชีวิต
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <form onSubmit={generate} className="rounded-[1.6rem] border border-white/10 bg-white/[0.065] p-5 shadow-aura backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-2 text-amber-100">
              <Wand2 className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Birth Matrix Input</h2>
            </div>
            <label className="mb-4 block">
              <span className="mb-2 block text-sm text-slate-300">Name</span>
              <input value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none ring-cyan-300/40 transition focus:border-cyan-200/60 focus:ring-4" />
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                ["day", "Day", 2],
                ["month", "Month", 2],
                ["year", "Year", 4]
              ].map(([field, label, max]) => (
                <label key={field}>
                  <span className="mb-2 block text-sm text-slate-300">{label}</span>
                  <input inputMode="numeric" maxLength={max} value={form[field]} onChange={(e) => update(field, cleanDigits(e.target.value, max))} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-3 text-center outline-none ring-cyan-300/40 transition focus:border-cyan-200/60 focus:ring-4" />
                </label>
              ))}
            </div>
            <label className="mt-4 block">
              <span className="mb-2 block text-sm text-slate-300">Year type</span>
              <select value={form.yearType} onChange={(e) => update("yearType", e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none ring-cyan-300/40 transition focus:border-cyan-200/60 focus:ring-4">
                <option value="BE">BE - Buddhist Era</option>
                <option value="AD">AD - Common Era</option>
              </select>
            </label>
            {!analysis && <div className="mt-4 rounded-2xl border border-cyan-200/20 bg-cyan-200/10 p-4 text-sm font-semibold text-cyan-100">กรอกวันเดือนปีเกิดเพื่อสร้าง Matrix 9 Interface</div>}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-300 to-cyan-200 px-4 py-3 text-sm font-bold text-slate-950 shadow-gold">
                <Sparkles className="h-4 w-4" />
                Generate
              </button>
              <button type="button" onClick={clear} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-fuchsia-200/30 bg-fuchsia-200/10 px-4 py-3 text-sm font-semibold text-fuchsia-100">
                <RefreshCw className="h-4 w-4" />
                Clear Form
              </button>
              {analysis && reading && (
                <>
                  <label className="block rounded-2xl border border-white/10 bg-slate-950/55 p-3 sm:col-span-2">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">Export size</span>
                    <select value={exportSize} onChange={(e) => setExportSize(e.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm outline-none">
                      {Object.keys(exportSizes).map((size) => <option key={size}>{size}</option>)}
                    </select>
                  </label>
                  <button type="button" onClick={exportPng} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-200/35 bg-amber-200/10 px-4 py-3 text-sm font-semibold text-amber-100">
                    <Download className="h-4 w-4" />
                    {exporting ? "Exporting" : "Export PNG"}
                  </button>
                  <button type="button" onClick={copySummary} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-200/30 bg-cyan-200/10 px-4 py-3 text-sm font-semibold text-cyan-100">
                    <Copy className="h-4 w-4" />
                    {copied === "summary" ? "Copied" : "Copy Summary"}
                  </button>
                </>
              )}
            </div>
          </form>

          {analysis && reading && (
            <section className="rounded-[1.6rem] border border-white/10 bg-slate-950/60 p-5 shadow-aura backdrop-blur-xl">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-400">Personal Symbolic Personality Interface</p>
                  <h2 className="text-2xl font-bold">{analysis.name || "Unnamed Soul"}</h2>
                  <p className="text-sm text-amber-100">{analysis.birthDate} · {analysis.yearType} · {reading.timeline}</p>
                  <p className="mt-1 text-xs text-cyan-100">Internal calculation: {analysis.canonicalBirthDate} AD</p>
                  <p className="mt-1 text-xs leading-5 text-slate-300">ระบบแปลงปี พ.ศ. เป็น ค.ศ. ภายในเพื่อให้การวิเคราะห์มีมาตรฐานเดียวกัน</p>
                </div>
                <Chip tone="gold">Life Path {analysis.lifePath}</Chip>
              </div>
              <MatrixGrid analysis={analysis} />
              <div className="mt-4 rounded-3xl border border-cyan-200/20 bg-cyan-200/10 p-4 shadow-cyan">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-cyan-100">Hidden Potential 0</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-200">{meanings[0]}</p>
                  </div>
                  <div className="text-3xl font-black">x{analysis.zeroCount}</div>
                </div>
              </div>
            </section>
          )}
        </section>

        {analysis && reading && (
          <>
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Section title="Dominant">{analysis.dominant.length ? analysis.dominant.map((n) => <Chip key={n}>{n} · {analysis.counts[n]}x</Chip>) : <Chip>สมดุล</Chip>}</Section>
              <Section title="Missing">{analysis.missing.length ? analysis.missing.map((n) => <Chip key={n} tone="purple">{n}</Chip>) : <Chip tone="purple">ไม่มีช่องว่าง</Chip>}</Section>
              <Section title="Lucky Colors">{reading.colors.map((c) => <Chip key={c} tone="cyan">{c}</Chip>)}</Section>
              <Section title="Lucky Numbers">{reading.luckyNumbers.map((n) => <Chip key={n}>{n}</Chip>)}</Section>
            </section>

            <Section title="Sacred Resonance" icon={Heart}>
              <p className="mb-4 text-amber-50">พลังสิ่งศักดิ์สิทธิ์ที่สอดคล้อง ใช้เป็นแรงบันดาลใจในการทำความดีและการเติบโตภายใน</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {reading.sacred.length ? reading.sacred.map((item) => (
                  <article key={item.name} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="mt-2">{item.meaning}</p>
                    <p className="mt-2 text-xs text-cyan-100">Practice: {item.practice}</p>
                  </article>
                )) : <p>ยังไม่พบพลังสิ่งศักดิ์สิทธิ์เด่นจากชุดตัวเลขนี้</p>}
              </div>
            </Section>

            <Section title="Being Architecture" icon={Sparkles}>
              <p className="mb-4 text-slate-300">พลังต้นแบบที่สอดคล้องกับโครงสร้างพลังงาน ไม่ใช่การระบุชาติกำเนิดจริง</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {[["Primary Core Energy", reading.being.primary], ["Supporting Star Resonance", reading.being.supporting], ["Earth Integration", reading.being.earth]].map(([title, item]) => (
                  <article key={title} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-cyan-100">{title}</p>
                    <h3 className="mt-2 text-xl font-bold">{item.name}</h3>
                    <p className="mt-1 text-xs text-fuchsia-100">{item.keywords}</p>
                    <p className="mt-2">{item.meaning}</p>
                  </article>
                ))}
              </div>
              <p className="mt-4 rounded-2xl border border-white/10 bg-slate-950/45 p-3 text-xs">ส่วนนี้เป็นการอ่านเชิงสัญลักษณ์และอาร์คิไทป์ ไม่ใช่การยืนยันว่าบุคคลมาจากกลุ่มดาวใดจริง</p>
            </Section>

            <section className="grid gap-4 lg:grid-cols-2">
              <Section title="Personality Overview">{reading.personality}</Section>
              <Section title="Emotional Pattern">{reading.emotional}</Section>
              <Section title="Spiritual Pattern">{reading.spiritual}</Section>
              <Section title="Love">{reading.love}</Section>
              <Section title="Career">{reading.career}</Section>
              <Section title="Money">{reading.money}</Section>
              <Section title="Growth Advice">{reading.growth}</Section>
              <Section title="Shadow Side">{reading.shadow}</Section>
            </section>

            <section className="rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-amber-200/12 via-fuchsia-300/10 to-cyan-300/10 p-5 shadow-aura backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-2 text-amber-100">
                <Sparkles className="h-4 w-4" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.22em]">Reflection Quote</h2>
              </div>
              <blockquote className="text-xl font-semibold leading-9">“{reading.quote}”</blockquote>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
