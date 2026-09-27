export function parseNum(s: string): number | null {
  const t = s.trim().replace(/\s/g, "");
  const normalized = t.includes(".") ? t.replace(/,/g, "") : t.replace(",", ".");
  if (normalized === "" || normalized === "-" || normalized === "." || normalized === "-.") return null;
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

export function formatEditable(n: number): string {
  if (!Number.isFinite(n)) return "";
  const ax = Math.abs(n);
  if (ax !== 0 && (ax < 1e-4 || ax >= 1e7)) return n.toExponential(3);
  const digits = ax >= 1000 ? 2 : ax >= 1 ? 4 : 6;
  return String(Number(n.toFixed(digits)));
}

export function num(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  const ax = Math.abs(n);
  if (ax !== 0 && ax < 0.001) return n.toExponential(2);
  const d = ax >= 1000 ? 1 : ax >= 100 ? 1 : ax >= 10 ? 2 : digits;
  return n.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: 0 });
}

export function musd(usd: number): string {
  if (!Number.isFinite(usd)) return "—";
  const m = usd / 1e6;
  const abs = Math.abs(m);
  const digits = abs >= 100 ? 1 : abs >= 10 ? 2 : abs >= 0.01 ? 3 : 4;
  return `${m.toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: Math.min(2, digits) })} MUSD`;
}

export function pressureUnitLabel(unit: string): string {
  if (unit === "kgcm2") return "kg/cm²";
  return unit;
}
