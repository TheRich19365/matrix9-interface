import { matrixOrder } from "../data/gates.js";
import { normalizeBirthInput, validateBirthDate } from "./validateBirthDate.js";

export function reduceDigit(total) {
  let n = Number(total) || 0;
  while (n > 9) n = String(n).split("").reduce((sum, digit) => sum + Number(digit), 0);
  return n;
}

export function analyzeMatrix(form) {
  const validation = validateBirthDate(form);
  const normalized = validation.valid ? validation.normalized : normalizeBirthInput(form);
  const { day, month, year, adYear, hasDate } = normalized;
  const digits = validation.valid ? `${day}${month}${adYear}`.split("").map(Number) : [];
  const counts = Array(10).fill(0);
  digits.forEach((digit) => {
    counts[digit] += 1;
  });
  return {
    name: form.name.trim(),
    yearType: form.yearType,
    birthDate: hasDate ? `${day}/${month}/${year}` : "",
    canonicalBirthDate: validation.valid ? `${day}/${month}/${adYear}` : "",
    counts,
    dominant: matrixOrder.filter((number) => counts[number] >= 2),
    missing: matrixOrder.filter((number) => counts[number] === 0),
    zeroCount: counts[0],
    lifePath: validation.valid ? reduceDigit(digits.reduce((sum, digit) => sum + digit, 0)) : 0,
    hasDate: validation.valid,
    validation
  };
}
