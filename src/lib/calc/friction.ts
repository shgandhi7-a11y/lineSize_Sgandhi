/** Darcy friction factor, Churchill (1977). Valid from laminar through rough turbulent. */
export function darcyFriction(re: number, relRough: number): number {
  if (!Number.isFinite(re) || re <= 0) return Number.NaN;
  const rr = Math.max(0, relRough);
  const arg = (7 / re) ** 0.9 + 0.27 * rr;
  const safe = arg > 0 ? arg : 1e-18;
  const a = (2.457 * Math.log(1 / safe)) ** 16;
  const b = (37530 / re) ** 16;
  return 8 * ((8 / re) ** 12 + 1 / (a + b) ** 1.5) ** (1 / 12);
}

export type Regime = "laminar" | "transitional" | "turbulent";

export function regimeOf(re: number): Regime {
  if (re < 2300) return "laminar";
  if (re < 4000) return "transitional";
  return "turbulent";
}
