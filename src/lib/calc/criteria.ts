import { evalGasAt } from "./gas";
import { evalLiquidAt, SERVICE_BANDS } from "./liquid";
import { COMMERCIAL_NPS } from "./pipes";
import { annualSplit, electricCompressorW, electricPumpW, type EconInput } from "./optimum";
import { pipeSize } from "./pipes";

export type WallSchedule = "40" | "80";

export type SizePick = {
  ok: boolean;
  note: string;
  nps: string;
  schedule: WallSchedule;
  idMm: number;
  velocity: number;
  dpBarPerKm: number;
};

type Candidate = SizePick & { annual: number; capex: number; opex: number; inBand: boolean };

const LIQUID_CAP: Record<string, { vMax: number; dp: number }> = {
  gasoline: { vMax: 2.5, dp: 2 },
  naphtha: { vMax: 2.2, dp: 1.8 },
  lightcrude: { vMax: 2.2, dp: 1.5 },
  medcrude: { vMax: 2, dp: 1.5 },
  diesel: { vMax: 2, dp: 1.5 },
};

const GAS_CAP: Record<string, number> = {
  ng: 25,
  methane: 25,
  ethane: 20,
  ethylene: 20,
  propane: 18,
  hydrogen: 15,
};

const NONE: SizePick = {
  ok: false,
  note: "No commercial size meets the velocity and pressure-drop limits.",
  nps: "",
  schedule: "40",
  idMm: 0,
  velocity: 0,
  dpBarPerKm: 0,
};

export function liquidLimits(fluidId: string, service: string): { vMin: number; vMax: number; dp: number } {
  const band = SERVICE_BANDS.find((item) => item.id === service) ?? SERVICE_BANDS[0]!;
  const cap = LIQUID_CAP[fluidId];
  const vMax = Math.min(band.max, cap?.vMax ?? band.max);
  const vMin = vMax + 1e-6 < band.min ? 0 : band.min;
  const dp = cap?.dp ?? (service === "suction" ? 1.2 : 2);
  return { vMin, vMax, dp };
}

export function loopLimits(fluidId: string): { vMin: number; vMax: number; dp: number } {
  return liquidLimits(fluidId, "process");
}

function choose(rows: Candidate[], schedulesTried: string): SizePick {
  const band = rows.filter((row) => row.inBand);
  const pool = band.length > 0 ? band : rows;
  if (pool.length === 0) return { ...NONE, note: `No size on Sch ${schedulesTried} meets the limits.` };
  const best = pool.reduce((a, b) => (b.annual < a.annual - 1e-6 ? b : a));
  const bandNote = best.inBand ? "Inside the sizing band." : "Under the caps. Nothing landed inside the preferred band.";
  return {
    ...best,
    ok: true,
    note: `NPS ${best.nps} Sch ${best.schedule}. ${best.velocity.toFixed(2)} m/s, ${best.dpBarPerKm.toFixed(2)} bar/km. ${bandNote}`,
  };
}

export type DesignAlt = {
  role: "Tighter" | "Optimum" | "Larger";
  nps: string;
  schedule: WallSchedule;
  idMm: number;
  velocity: number;
  dpBarPerKm: number;
  annual: number;
  capex: number;
  opex: number;
};

export function threeDesigns(rows: Candidate[]): DesignAlt[] {
  const pool = rows.filter((row) => row.ok).sort((a, b) => a.idMm - b.idMm);
  if (pool.length === 0) return [];
  const opt = pool.reduce((a, b) => (b.annual < a.annual - 1e-6 ? b : a));
  const at = pool.findIndex((row) => row.nps === opt.nps);
  const start = Math.max(0, Math.min(at - 1, pool.length - 3));
  const slice = pool.slice(start, start + 3);
  return slice.map((row) => ({
    role: row.nps === opt.nps ? "Optimum" : row.idMm < opt.idMm ? "Tighter" : "Larger",
    nps: row.nps,
    schedule: row.schedule,
    idMm: row.idMm,
    velocity: row.velocity,
    dpBarPerKm: row.dpBarPerKm,
    annual: row.annual,
    capex: row.capex,
    opex: row.opex,
  }));
}

export function liquidCandidates(input: {
  rho: number;
  mu: number;
  flowM3s: number;
  lengthM: number;
  roughM: number;
  kMinor: number;
  vMin: number;
  vMax: number;
  dpMaxBarPerKm: number;
  schedule: WallSchedule;
  econ: EconInput;
}): Candidate[] {
  const rows: Candidate[] = [];
  for (const nps of COMMERCIAL_NPS) {
    const pipe = pipeSize(nps, input.schedule);
    if (!pipe) continue;
    const ev = evalLiquidAt({
      rho: input.rho,
      mu: input.mu,
      flowM3s: input.flowM3s,
      diameterM: pipe.idMm / 1000,
      lengthM: input.lengthM,
      elevM: 0,
      roughnessM: input.roughM,
      kMinor: input.kMinor,
      p1GaugePa: 0,
    });
    if (!ev.ok || !(input.lengthM > 0)) continue;
    const dpPa = ev.dpFrictionPa + ev.dpMinorPa;
    const dpBarPerKm = dpPa / 1e5 / (input.lengthM / 1000);
    const under = ev.velocity <= input.vMax + 1e-9 && dpBarPerKm <= input.dpMaxBarPerKm + 1e-9;
    if (!under) continue;
    const power = electricPumpW(input.rho, input.flowM3s, dpPa / (input.rho * 9.80665), input.econ.etaMachine, input.econ.etaMotor);
    if (!Number.isFinite(power)) continue;
    const split = annualSplit(power, pipe.idMm / 1000, input.lengthM, input.econ);
    rows.push({
      ok: true,
      note: "",
      nps,
      schedule: input.schedule,
      idMm: pipe.idMm,
      velocity: ev.velocity,
      dpBarPerKm,
      annual: split.totalAnnual,
      capex: split.pipeCapex,
      opex: split.energyAnnual,
      inBand: ev.velocity + 1e-9 >= input.vMin,
    });
  }
  return rows;
}

export function correctLiquid(input: Parameters<typeof liquidCandidates>[0]): SizePick {
  return choose(liquidCandidates(input), input.schedule);
}

export function gasCandidates(input: {
  mu: number;
  lengthM: number;
  roughM: number;
  kMinor: number;
  mw: number;
  z: number;
  gamma: number;
  tK: number;
  p1AbsPa: number;
  massKgS: number;
  vMax: number;
  schedule: WallSchedule;
  econ: EconInput;
}): Candidate[] {
  const rows: Candidate[] = [];
  for (const nps of COMMERCIAL_NPS) {
    const pipe = pipeSize(nps, input.schedule);
    if (!pipe) continue;
    const ev = evalGasAt({
      mw: input.mw,
      mu: input.mu,
      z: input.z,
      tK: input.tK,
      gamma: input.gamma,
      massKgS: input.massKgS,
      diameterM: pipe.idMm / 1000,
      lengthM: input.lengthM,
      elevM: 0,
      roughnessM: input.roughM,
      kMinor: input.kMinor,
      p1AbsPa: input.p1AbsPa,
    });
    if (!ev.ok || !(ev.p2AbsPa > 0) || !(input.lengthM > 0)) continue;
    const dpBarPerKm = ev.dpPa / 1e5 / (input.lengthM / 1000);
    const vCap = Math.min(input.vMax, ev.erosional > 0 ? ev.erosional : input.vMax);
    const dropOk = input.p1AbsPa > 0 && ev.dpPa / input.p1AbsPa <= 0.4 && dpBarPerKm <= 1;
    const speedOk = ev.vOut <= vCap + 1e-6 && ev.machOut <= 0.6;
    if (!dropOk || !speedOk) continue;
    const comp = electricCompressorW({
      massKgS: input.massKgS,
      z: input.z,
      gamma: input.gamma,
      mw: input.mw,
      tK: input.tK,
      pSuctionPa: ev.p2AbsPa,
      pDischargePa: input.p1AbsPa,
      etaIsentropicPct: input.econ.etaMachine,
      etaDriverPct: input.econ.etaMotor,
    });
    if (!comp.ok) continue;
    const split = annualSplit(comp.powerW, pipe.idMm / 1000, input.lengthM, input.econ);
    rows.push({
      ok: true,
      note: "",
      nps,
      schedule: input.schedule,
      idMm: pipe.idMm,
      velocity: ev.vOut,
      dpBarPerKm,
      annual: split.totalAnnual,
      capex: split.pipeCapex,
      opex: split.energyAnnual,
      inBand: true,
    });
  }
  return rows;
}

export function correctGas(input: Parameters<typeof gasCandidates>[0]): SizePick {
  return choose(gasCandidates(input), input.schedule);
}

export function gasVelocityCap(fluidId: string): number {
  return GAS_CAP[fluidId] ?? 20;
}

export function asWall(schedule: string): WallSchedule {
  return schedule === "80" ? "80" : "40";
}
