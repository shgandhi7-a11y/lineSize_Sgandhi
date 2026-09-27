import { COMMERCIAL_NPS, pipeSize, type ScheduleId } from "./pipes";

export type UnitSystem = "metric" | "imperial";
export type OptSchedule = "40" | "80";
export type FluidGroup = "refinery" | "ngl" | "gas" | "chemical";
export type FluidPhase = "liquid" | "gas";

export type OptFluid = {
  id: string;
  name: string;
  group: FluidGroup;
  phase: FluidPhase;
  /** Liquid density. Ignored for gas. */
  density: number;
  /** g/mol. Used for gas density. */
  mw: number;
  /** Pa·s */
  mu: number;
  vMax: number;
  dpMaxBarPerKm: number;
  corrosive?: boolean;
  embrittle?: boolean;
};

export type OptMaterial = {
  id: string;
  name: string;
  density: number;
  costPerKg: number;
  installPerKm: number;
  roughMm: number;
};

export type CostState = {
  fluidId: string;
  materialId: string;
  schedule: OptSchedule;
  units: UnitSystem;
  flowM3h: number;
  tempC: number;
  pBar: number;
  lengthKm: number;
  years: number;
  efficiencyPct: number;
  tariff: number;
  discountPct: number;
};

export type RowFlag = "flow" | "deliver" | "velocity" | "friction" | "both" | "pass" | "optimized" | "oversized";

export type SizeRow = {
  nps: string;
  idMm: number;
  velocityMs: number;
  re: number;
  dpBarPerKm: number;
  capexPerKm: number;
  opexPerKmYear: number;
  totalPerKm: number;
  flag: RowFlag;
};

export type SizeRun = {
  fluid: OptFluid;
  material: OptMaterial;
  rho: number;
  rows: SizeRow[];
  best: SizeRow | null;
  warnings: string[];
};

const R = 8.314462618;
const Z_GAS = 0.9;
const HOURS = 8760;

export const FLUIDS: OptFluid[] = [
  { id: "gasoline", name: "Gasoline", group: "refinery", phase: "liquid", density: 740, mw: 100, mu: 0.0006, vMax: 2.5, dpMaxBarPerKm: 2 },
  { id: "naphtha", name: "Naphtha", group: "refinery", phase: "liquid", density: 700, mw: 100, mu: 0.0005, vMax: 2.2, dpMaxBarPerKm: 1.8 },
  { id: "fueloil", name: "Fuel oil (heavy)", group: "refinery", phase: "liquid", density: 890, mw: 300, mu: 0.05, vMax: 1.5, dpMaxBarPerKm: 3.5 },
  { id: "crude", name: "Crude oil (medium)", group: "refinery", phase: "liquid", density: 860, mw: 250, mu: 0.01, vMax: 2, dpMaxBarPerKm: 1.5 },
  { id: "ngl", name: "NGL mix (liquid)", group: "ngl", phase: "liquid", density: 500, mw: 44, mu: 0.00015, vMax: 1.8, dpMaxBarPerKm: 1.2 },
  { id: "propaneL", name: "Propane (liquid)", group: "ngl", phase: "liquid", density: 493, mw: 44.1, mu: 0.00011, vMax: 1.5, dpMaxBarPerKm: 1 },
  { id: "c1", name: "C1 Methane", group: "gas", phase: "gas", density: 0, mw: 16.04, mu: 1.1e-5, vMax: 25, dpMaxBarPerKm: 1 },
  { id: "c2", name: "C2 Ethane", group: "gas", phase: "gas", density: 0, mw: 30.07, mu: 9.4e-6, vMax: 20, dpMaxBarPerKm: 1 },
  { id: "c3", name: "C3 Propane", group: "gas", phase: "gas", density: 0, mw: 44.1, mu: 8.2e-6, vMax: 18, dpMaxBarPerKm: 1 },
  { id: "c4", name: "C4 Butane", group: "gas", phase: "gas", density: 0, mw: 58.12, mu: 7.5e-6, vMax: 18, dpMaxBarPerKm: 1 },
  { id: "c5", name: "C5 Pentane", group: "gas", phase: "gas", density: 0, mw: 72.15, mu: 6.8e-6, vMax: 18, dpMaxBarPerKm: 1 },
  { id: "c6", name: "C6 Hexane", group: "gas", phase: "gas", density: 0, mw: 86.18, mu: 6.5e-6, vMax: 16, dpMaxBarPerKm: 1 },
  { id: "c7", name: "C7 Heptane", group: "gas", phase: "gas", density: 0, mw: 100.21, mu: 6.2e-6, vMax: 16, dpMaxBarPerKm: 1 },
  { id: "c8", name: "C8 Octane", group: "gas", phase: "gas", density: 0, mw: 114.23, mu: 6e-6, vMax: 15, dpMaxBarPerKm: 1 },
  { id: "c9", name: "C9 Nonane", group: "gas", phase: "gas", density: 0, mw: 128.26, mu: 5.8e-6, vMax: 15, dpMaxBarPerKm: 1 },
  { id: "c10", name: "C10 Decane", group: "gas", phase: "gas", density: 0, mw: 142.29, mu: 5.6e-6, vMax: 15, dpMaxBarPerKm: 1 },
  { id: "ethylene", name: "Ethylene", group: "gas", phase: "gas", density: 0, mw: 28.05, mu: 1.03e-5, vMax: 20, dpMaxBarPerKm: 1 },
  { id: "propylene", name: "Propylene", group: "gas", phase: "gas", density: 0, mw: 42.08, mu: 8.7e-6, vMax: 18, dpMaxBarPerKm: 1 },
  { id: "h2so4", name: "Sulfuric acid 98%", group: "chemical", phase: "liquid", density: 1840, mw: 98, mu: 0.025, vMax: 1.2, dpMaxBarPerKm: 4, corrosive: true },
  { id: "naoh", name: "Caustic soda 50%", group: "chemical", phase: "liquid", density: 1520, mw: 40, mu: 0.05, vMax: 1.5, dpMaxBarPerKm: 2.5, corrosive: true },
  { id: "h2", name: "Hydrogen", group: "chemical", phase: "gas", density: 0, mw: 2.016, mu: 8.9e-6, vMax: 15, dpMaxBarPerKm: 1, embrittle: true },
];

export const GROUP_LABEL: Record<FluidGroup, string> = {
  refinery: "Refinery liquids",
  ngl: "NGL and liquid alkanes",
  gas: "C1–C10 and olefin gas",
  chemical: "Industrial chemicals",
};

export const MATERIALS: OptMaterial[] = [
  { id: "cs", name: "Carbon steel", density: 7850, costPerKg: 2.5, installPerKm: 15000, roughMm: 0.045 },
  { id: "ss", name: "Stainless 316", density: 8000, costPerKg: 6, installPerKm: 25000, roughMm: 0.015 },
  { id: "ptfe", name: "PTFE-lined steel", density: 7900, costPerKg: 11.5, installPerKm: 40000, roughMm: 0.005 },
  { id: "hdpe", name: "HDPE", density: 950, costPerKg: 2.2, installPerKm: 6000, roughMm: 0.007 },
];

export function defaultCost(): CostState {
  return {
    fluidId: "crude",
    materialId: "cs",
    schedule: "40",
    units: "metric",
    flowM3h: 80,
    tempC: 40,
    pBar: 10,
    lengthKm: 5,
    years: 20,
    efficiencyPct: 75,
    tariff: 0.12,
    discountPct: 8,
  };
}

export function fluidById(id: string): OptFluid {
  return FLUIDS.find((f) => f.id === id) ?? FLUIDS[3]!;
}

export function materialById(id: string): OptMaterial {
  return MATERIALS.find((m) => m.id === id) ?? MATERIALS[0]!;
}

/** Swamee–Jain. Laminar branch avoids the turbulent fit below Re 2300. */
export function swameeJain(re: number, epsM: number, dM: number): number {
  if (!(re > 0) || !(dM > 0)) return 0;
  if (re < 2300) return 64 / re;
  const term = epsM / (3.7 * dM) + 5.74 / re ** 0.9;
  if (!(term > 0)) return 0.02;
  const log = Math.log10(term);
  if (!(log < 0)) return 0.02;
  return 0.25 / log ** 2;
}

export function gasDensity(mw: number, pBar: number, tempC: number): number {
  const p = Math.max(pBar, 0) * 1e5;
  const t = Math.max(tempC + 273.15, 1);
  const mwKg = Math.max(mw, 0.1) / 1000;
  return (p * mwKg) / (Z_GAS * R * t);
}

function annuity(ratePct: number, years: number): number {
  const n = Math.max(years, 0);
  const i = ratePct / 100;
  if (n === 0) return 0;
  if (!(i > 0)) return n;
  return (1 - (1 + i) ** -n) / i;
}

function metalCapex(odMm: number, idMm: number, material: OptMaterial): number {
  const od = odMm / 1000;
  const id = idMm / 1000;
  const area = (Math.PI / 4) * (od * od - id * id);
  const kgPerKm = Math.max(area, 0) * 1000 * material.density;
  return kgPerKm * material.costPerKg + material.installPerKm;
}

export function sizeLine(state: CostState): SizeRun {
  const fluid = fluidById(state.fluidId);
  const material = materialById(state.materialId);
  const tempC = Number.isFinite(state.tempC) ? state.tempC : 25;
  const pBar = Number.isFinite(state.pBar) ? Math.max(state.pBar, 0) : 0;
  const rho = fluid.phase === "gas" ? gasDensity(fluid.mw, pBar, tempC) : fluid.density;
  const q = Number.isFinite(state.flowM3h) ? state.flowM3h / 3600 : 0;
  const lengthKm = Number.isFinite(state.lengthKm) ? state.lengthKm : 0;
  const lengthM = lengthKm * 1000;
  const eta = Math.min(100, Math.max(state.efficiencyPct, 0)) / 100;
  const years = Number.isFinite(state.years) ? state.years : 0;
  const factor = annuity(state.discountPct, years);
  const tariff = Number.isFinite(state.tariff) ? Math.max(state.tariff, 0) : 0;
  const schedule = state.schedule;
  const live = q > 1e-8 && lengthM > 1 && eta > 0 && pBar > 0 && rho > 0;

  const rough = material.roughMm / 1000;
  const preliminary: SizeRow[] = COMMERCIAL_NPS.map((nps) => {
    const pipe = pipeSize(nps, schedule as ScheduleId);
    const idMm = pipe?.idMm ?? 0;
    const odMm = pipe?.odMm ?? 0;
    const capexPerKm = metalCapex(odMm, idMm, material);
    const blank = (flag: RowFlag, velocity = 0, re = 0, dp = 0): SizeRow => ({
      nps,
      idMm,
      velocityMs: velocity,
      re,
      dpBarPerKm: dp,
      capexPerKm,
      opexPerKmYear: 0,
      totalPerKm: capexPerKm,
      flag,
    });
    if (!live || idMm <= 0) return blank("flow");

    const d = idMm / 1000;
    const area = (Math.PI / 4) * d * d;
    const vIn = q / area;
    const re = (rho * vIn * d) / fluid.mu;
    const f = swameeJain(re, rough, d);
    let velocity = vIn;
    let dpPa = 0;
    let deliver = true;

    if (fluid.phase === "liquid") {
      dpPa = f * (lengthM / d) * rho * vIn * vIn * 0.5;
      velocity = vIn;
    } else {
      const mDot = rho * q;
      const rhs = f * (lengthM / d) * (mDot / area) ** 2 * Z_GAS * (R / (fluid.mw / 1000)) * (tempC + 273.15);
      const p1 = pBar * 1e5;
      const p2sq = p1 * p1 - rhs;
      if (!(p2sq > 0)) {
        deliver = false;
        dpPa = p1;
        velocity = vIn;
      } else {
        const p2 = Math.sqrt(p2sq);
        dpPa = p1 - p2;
        velocity = Math.max(vIn, vIn * (p1 / p2));
      }
    }

    const dpBarPerKm = lengthKm > 0 ? dpPa / 1e5 / lengthKm : 0;
    const powerW = eta > 0 ? (dpPa * q) / eta : 0;
    const opexYear = (powerW / 1000) * HOURS * tariff;
    const opexPerKmYear = opexYear / lengthKm;
    const totalPerKm = capexPerKm + opexPerKmYear * factor;
    const tooFast = velocity > fluid.vMax + 1e-9;
    const tooMuchDp = dpBarPerKm > fluid.dpMaxBarPerKm + 1e-9;
    let flag: RowFlag = "pass";
    if (!deliver) flag = "deliver";
    else if (tooFast && tooMuchDp) flag = "both";
    else if (tooFast) flag = "velocity";
    else if (tooMuchDp) flag = "friction";
    return { nps, idMm, velocityMs: velocity, re, dpBarPerKm, capexPerKm, opexPerKmYear, totalPerKm, flag };
  });

  let best: SizeRow | null = null;
  for (const row of preliminary) {
    if (row.flag !== "pass") continue;
    if (!best || row.totalPerKm < best.totalPerKm - 1e-6 || (Math.abs(row.totalPerKm - best.totalPerKm) <= 1e-6 && row.idMm < best.idMm)) {
      best = row;
    }
  }
  const rows = preliminary.map((row) => {
    if (!best || row.flag !== "pass") return row;
    if (row.nps === best.nps) return { ...row, flag: "optimized" as const };
    if (row.idMm > best.idMm) return { ...row, flag: "oversized" as const };
    return row;
  });
  const crowned = rows.find((row) => row.flag === "optimized") ?? null;

  const warnings: string[] = [];
  if (material.id === "cs" && fluid.corrosive) {
    warnings.push(`${fluid.name} with carbon steel. Velocity alone does not protect the wall. Use lined or stainless pipe.`);
  }
  if (material.id === "cs" && fluid.embrittle) {
    warnings.push("Hydrogen on carbon steel. Keep the velocity cap and confirm the steel grade for embrittlement.");
  }
  if (material.id === "hdpe" && tempC > 60) {
    warnings.push("HDPE above 60°C is outside a normal pressure rating.");
  }
  if (material.id === "hdpe" && pBar > 10) {
    warnings.push("HDPE is screened on the steel bore. Check the SDR rating at this pressure.");
  }
  if (!live) warnings.push("Enter a flow, a length, an inlet pressure, and an efficiency above zero.");

  return { fluid, material, rho, rows, best: crowned, warnings };
}
