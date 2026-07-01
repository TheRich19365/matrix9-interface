export function cleanDigits(value, max) {
  return String(value || "").replace(/\D/g, "").slice(0, max);
}

export function normalizeBirthInput(form) {
  const rawDay = cleanDigits(form.day, 2);
  const rawMonth = cleanDigits(form.month, 2);
  const rawYear = cleanDigits(form.year, 4);
  const day = rawDay ? rawDay.padStart(2, "0") : "";
  const month = rawMonth ? rawMonth.padStart(2, "0") : "";
  const year = rawYear ? rawYear.padStart(4, "0") : "";
  const hasDate = Boolean(day && month && year);
  const adYearNumber = year ? (form.yearType === "BE" ? Number(year) - 543 : Number(year)) : 0;
  const adYear = year ? String(Math.max(adYearNumber, 0)).padStart(4, "0").slice(-4) : "";
  return { day, month, year, hasDate, adYearNumber, adYear };
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function validateBirthDate(form) {
  const normalized = normalizeBirthInput(form);
  if (!normalized.hasDate) return { valid: false, message: "กรุณากรอกวัน เดือน และปีเกิดให้ครบก่อนสร้าง Matrix", normalized };
  const day = Number(normalized.day);
  const month = Number(normalized.month);
  const adYear = Number(normalized.adYear);
  if (adYear < 1) return { valid: false, message: "ปีเกิดหลังแปลงเป็น ค.ศ. ต้องมากกว่า 0", normalized };
  if (month < 1 || month > 12) return { valid: false, message: "เดือนเกิดควรอยู่ระหว่าง 1 ถึง 12", normalized };
  const daysInMonth = [31, isLeapYear(adYear) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day < 1 || day > daysInMonth[month - 1]) return { valid: false, message: "วันเกิดไม่ตรงกับปฏิทินจริง ลองตรวจวันและเดือนอีกครั้ง", normalized };
  return { valid: true, message: "", normalized };
}
