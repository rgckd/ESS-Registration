// Kept in sync with heart-comm-db's scripts/import-es15-tamil.mjs so phone
// numbers entered via this app normalize the same way as historically
// imported spreadsheet data does.

export function normalizeEmail(raw: string): string | null {
  const trimmed = raw?.trim().toLowerCase();
  return trimmed ? trimmed : null;
}

// Best-effort E.164 normalization for the country codes seen in this data
// (India, Sri Lanka). Anything it can't confidently place is left null and
// the caller is expected to flag the person `needs_review` rather than
// guess at a possibly-wrong number.
export function normalizePhone(raw: string | null | undefined): string | null {
  if (raw === null || raw === undefined || raw === "") return null;
  const s = String(raw).trim().replace(/[\s\-()]/g, "");
  if (s.startsWith("+")) {
    return /^\+[1-9]\d{7,14}$/.test(s) ? s : null;
  }
  if (/^\d+$/.test(s)) {
    if (s.length === 10 && /^[6-9]/.test(s)) return "+91" + s;
    if (s.startsWith("91") && s.length === 12) return "+" + s;
    if (s.startsWith("94") && s.length === 11) return "+" + s;
  }
  return null;
}
