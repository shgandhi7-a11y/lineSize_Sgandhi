import { G, specificGasConstant } from "./units";

export type EconInput = {
  etaMachine: number;
  etaMotor: number;
  hours: number;
  load: number;
  tariff: number;
  pipeCost100: number;
  pipeExp: number;
  capitalCharge: number;
};

export type AnnualSplit = {
  pipeCapex: number;
  pipeAnnual: number;
  energyAnnual: number;
  totalAnnual: number;
};

/** Installed cost per metre. cost100 is the price at 100 mm inside diameter. */
export function pipeCostPerM(diameterM: number, cost100: number, exponent: number): number {
  if (!(diameterM > 0) || !(cost100 >= 0) || !Number.isFinite(exponent)) return 0;
  return cost100 * ((diameterM * 1000) / 100) ** exponent;
}

export function annualSplit(powerW: number, diameterM: number, lengthM: number, econ: EconInput): AnnualSplit {
  const duty = Math.min(1.5, Math.max(0, econ.load / 100));
  const energyAnnual = (Math.max(0, powerW) / 1000) * Math.max(0, econ.hours) * duty * Math.max(0, econ.tariff);
  const pipeCapex = pipeCostPerM(diameterM, Math.max(0, econ.pipeCost100), econ.pipeExp) * Math.max(0, lengthM);
  const pipeAnnual = pipeCapex * Math.max(0, econ.capitalCharge);
  return { pipeCapex, pipeAnnual, energyAnnual, totalAnnual: pipeAnnual + energyAnnual };
}

/** Electric power to pump a liquid through a line of this total head. Watts. */
export function electricPumpW(
  rho: number,
  flowM3s: number,
  headM: number,
  etaPumpPct: number,
  etaMotorPct: number,
): number {
  if (!(rho > 0) || !(flowM3s > 0) || !(headM > 0)) return 0;
  if (!(etaPumpPct > 0) || !(etaMotorPct > 0)) return Number.NaN;
  return (rho * G * flowM3s * headM) / (etaPumpPct / 100) / (etaMotorPct / 100);
}

/**
 * Electric power for an isentropic compressor.
 * Suction and discharge are absolute. Returns 0 when the ratio is 1 or less.
 */
export function electricCompressorW(input: {
  massKgS: number;
  z: number;
  gamma: number;
  mw: number;
  tK: number;
  pSuctionPa: number;
  pDischargePa: number;
  etaIsentropicPct: number;
  etaDriverPct: number;
}): { ok: boolean; powerW: number; ratio: number } {
  const { massKgS, z, gamma, mw, tK, pSuctionPa, pDischargePa, etaIsentropicPct, etaDriverPct } = input;
  if (!(massKgS > 0) || !(z > 0) || !(gamma > 1.01) || !(mw > 1) || !(tK > 0)) {
    return { ok: false, powerW: 0, ratio: 0 };
  }
  if (!(etaIsentropicPct > 0) || !(etaDriverPct > 0) || !(pSuctionPa > 0) || !(pDischargePa > 0)) {
    return { ok: false, powerW: 0, ratio: 0 };
  }
  const ratio = pDischargePa / pSuctionPa;
  if (ratio <= 1) return { ok: true, powerW: 0, ratio };
  const exponent = (gamma - 1) / gamma;
  const specific = z * (gamma / (gamma - 1)) * specificGasConstant(mw) * tK * (ratio ** exponent - 1);
  const powerW = (massKgS * specific) / (etaIsentropicPct / 100) / (etaDriverPct / 100);
  return { ok: Number.isFinite(powerW), powerW, ratio };
}

/**
 * Towler & Sinnott carbon-steel screen for in-plant pumped liquids, turbulent flow.
 * Diameter in metres. G in kg/s, density in kg/m³.
 * Viscosity is already folded into the constant (about 0.1–10 cP). Not for gas or alloy pipe.
 */
export function sinnottCarbonSteelM(massKgS: number, rho: number): number {
  if (!(massKgS > 0) || !(rho > 0)) return Number.NaN;
  const small = 0.664 * massKgS ** 0.51 * rho ** -0.36;
  if (small <= 0.225) return small;
  return 0.534 * massKgS ** 0.43 * rho ** -0.3;
}

export type Optimum = {
  diameterM: number;
  powerW: number;
  annual: AnnualSplit;
  edge: "low" | "high" | null;
};

/**
 * Diameter that minimises pipe capital charge plus driver energy.
 * powerAt returns electric watts, or null if that bore cannot pass the flow.
 */
export function optimizeDiameter(
  lengthM: number,
  econ: EconInput,
  powerAt: (diameterM: number) => number | null,
): Optimum | null {
  const lo = 0.025;
  const hi = 1.2;
  const coarse: { d: number; powerW: number; total: number }[] = [];
  const steps = 48;
  for (let i = 0; i <= steps; i++) {
    const d = lo * (hi / lo) ** (i / steps);
    const powerW = powerAt(d);
    if (powerW == null || !Number.isFinite(powerW)) continue;
    coarse.push({ d, powerW, total: annualSplit(powerW, d, lengthM, econ).totalAnnual });
  }
  if (!coarse.length) return null;
  let best = coarse[0];
  for (const point of coarse) {
    if (point.total < best.total) best = point;
  }
  const idx = coarse.indexOf(best);
  const left = coarse[Math.max(0, idx - 1)].d;
  const right = coarse[Math.min(coarse.length - 1, idx + 1)].d;
  for (let i = 0; i <= 20; i++) {
    const d = left + ((right - left) * i) / 20;
    const powerW = powerAt(d);
    if (powerW == null || !Number.isFinite(powerW)) continue;
    const total = annualSplit(powerW, d, lengthM, econ).totalAnnual;
    if (total < best.total) best = { d, powerW, total };
  }
  const edge = best.d <= lo * 1.04 ? "low" : best.d >= hi * 0.96 ? "high" : null;
  return {
    diameterM: best.d,
    powerW: best.powerW,
    annual: annualSplit(best.powerW, best.d, lengthM, econ),
    edge,
  };
}
