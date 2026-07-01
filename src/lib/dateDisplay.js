export function formatEraLabel(yearType) {
  return yearType === "BE" ? "พ.ศ." : "ค.ศ.";
}

export function formatInputBirthDateDisplay(analysis) {
  if (!analysis?.birthDate) return "-";
  return `${analysis.birthDate} ${formatEraLabel(analysis.yearType)}`;
}

export function formatCanonicalBirthDateDisplay(analysis) {
  if (!analysis?.canonicalBirthDate) return "-";
  return `${analysis.canonicalBirthDate} ค.ศ.`;
}

export function formatBirthDateDisplayLines(analysis) {
  return {
    input: `วันเกิดที่กรอก: ${formatInputBirthDateDisplay(analysis)}`,
    canonical: `วันคำนวณภายใน: ${formatCanonicalBirthDateDisplay(analysis)}`
  };
}

export function formatDisplayDate(dateString) {
  if (!dateString) return "-";
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString);
  if (!match) return dateString;
  return `${match[3]}/${match[2]}/${match[1]} ค.ศ.`;
}
