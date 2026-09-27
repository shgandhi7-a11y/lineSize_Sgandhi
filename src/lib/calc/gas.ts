import { darcyFriction, regimeOf, type Regime } from "./friction";
import { expm1Over, G, specificGasConstant } from "./units";
import type { SolveMode } from "./liquid";

export type GasEval = {
  ok: boolean;
  message: string;
  diameterM: number;
  massKgS: number;
  lengthM: number;
  friction: number;
  re: number;
  regime: Regime;
  kMinor: number;
  p1AbsPa: number;
  p2AbsPa: number;
  dpPa: number;
  rhoIn: number;
  rhoOut: number;
  rhoMean: number;
  vIn: number;
  vOut: number;
  machOut: number;
  sonic: number;
  erosional: number;
  beta: number;
  profile: { xM: number; pAbsPa: number }[];
};

export type GasRequest = {
  mode: SolveMode;
  mw: number;
  mu: number;
  z: number;
  tK: number;
  gamma: number;
  massKgS: number;
  diameterM: number;
  lengthM: number;
  elevM: number;
  roughnessM: number;
  kMinor: number;
  p1AbsPa: number;
  p2AbsPa: number;
};

const FAIL = (message: string): GasEval => ({
  ok: false,
  message,
  diameterM: 0,
  massKgS: 0,
  lengthM: 0,
  friction: 0,
  re: 0,
  regime: "turbulent",
  kMinor: 0,
  p1AbsPa: 0,
  p2AbsPa: 0,
  dpPa: 0,
  rhoIn: 0,
  rhoOut: 0,
  rhoMean: 0,
  vIn: 0,
  vOut: 0,
  machOut: 0,
  sonic: 0,
  erosional: 0,
  beta: 0,
  profile: [],
});

function betaOf(z: number, mw: number, tK: number): number {
  return z * specificGasConstant(mw) * tK;
}

/**
 * Isothermal compressible Darcy with elevation.
 * P1² − P2² e^s = (f L/D + K) G² β (e^s − 1)/s
 * s = 2 g Δz / β, β = Z R_specific T, G = mass flux.
 * Kinetic-energy change is neglected (screening model, not for choked flow).
 */
export function evalGasAt(input: {
  mw: number;
  mu: number;
  z: number;
  tK: number;
  gamma: number;
  massKgS: number;
  diameterM: number;
  lengthM: number;
  elevM: number;
  roughnessM: number;
  kMinor: number;
  p1AbsPa: number;
}): GasEval {
  const {
    mw, mu, z, tK, gamma, massKgS: m, diameterM: d, lengthM: l,
    elevM, roughnessM, kMinor, p1AbsPa: p1,
  } = input;
  if (!(mw > 1) || !(mu > 0) || !(z > 0) || !(tK > 150)) {
    return FAIL("Molecular weight, viscosity, Z and temperature must be physical.");
  }
  if (!(m > 0) || !(d > 0) || !(l >= 0) || !(p1 > 0)) {
    return FAIL("Flow, diameter, length and inlet pressure must be positive. Use absolute pressure.");
  }
  if (!(gamma > 1)) return FAIL("Heat capacity ratio k must be greater than 1.");
  const area = Math.PI * d * d / 4;
  const gFlux = m / area;
  const re = (gFlux * d) / mu;
  const friction = darcyFriction(re, roughnessM / d);
  if (!Number.isFinite(friction) || friction <= 0) return FAIL("Friction factor did not converge.");
  const beta = betaOf(z, mw, tK);
  const s = (2 * G * elevM) / beta;
  const phi = expm1Over(s);
  const resist = friction * (l / d) + kMinor;
  const fTerm = resist * gFlux * gFlux * beta * phi;
  const p2sq = (p1 * p1 - fTerm) / Math.exp(s);
  const limited = p2sq <= 0;
  const p2 = limited ? 0 : Math.sqrt(p2sq);
  const rho = (p: number) => (p > 0 ? p / beta : 0);
  const rhoIn = rho(p1);
  const rhoOut = rho(p2);
  const pMean =
    p1 > 0 && p2 > 0
      ? (2 / 3) * ((p1 * p1 + p1 * p2 + p2 * p2) / (p1 + p2))
      : p1 / 2;
  const rhoMean = rho(pMean);
  const vIn = rhoIn > 0 ? gFlux / rhoIn : 0;
  const vOut = rhoOut > 0 ? gFlux / rhoOut : Number.POSITIVE_INFINITY;
  const sonic = Math.sqrt(gamma * beta);
  const machOut = sonic > 0 && Number.isFinite(vOut) ? vOut / sonic : Number.POSITIVE_INFINITY;
  const erosional = rhoOut > 0 ? 122 / Math.sqrt(rhoOut) : 0;
  const steps = 24;
  const profile: { xM: number; pAbsPa: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = l > 0 ? (l * i) / steps : 0;
    const sx = l > 0 ? s * (x / l) : 0;
    const kx = l > 0 ? kMinor * (x / l) : 0;
    const rx = friction * (x / d) + kx;
    const fx = rx * gFlux * gFlux * beta * expm1Over(sx);
    const inside = (p1 * p1 - fx) / Math.exp(sx);
    profile.push({ xM: x, pAbsPa: inside > 0 ? Math.sqrt(inside) : 0 });
  }
  return {
    ok: !limited,
    message: limited
      ? "Inlet pressure cannot push this flow through the line. Outlet would fall to vacuum — increase pressure or bore, or shorten the line."
      : "",
    diameterM: d,
    massKgS: m,
    lengthM: l,
    friction,
    re,
    regime: regimeOf(re),
    kMinor,
    p1AbsPa: p1,
    p2AbsPa: p2,
    dpPa: p1 - p2,
    rhoIn,
    rhoOut,
    rhoMean,
    vIn,
    vOut: Number.isFinite(vOut) ? vOut : 0,
    machOut: Number.isFinite(machOut) ? machOut : 0,
    sonic,
    erosional,
    beta,
    profile,
  };
}

function withFixed(req: GasRequest, patch: Partial<GasRequest>): GasEval {
  return evalGasAt({
    mw: req.mw,
    mu: req.mu,
    z: req.z,
    tK: req.tK,
    gamma: req.gamma,
    massKgS: patch.massKgS ?? req.massKgS,
    diameterM: patch.diameterM ?? req.diameterM,
    lengthM: patch.lengthM ?? req.lengthM,
    elevM: req.elevM,
    roughnessM: req.roughnessM,
    kMinor: req.kMinor,
    p1AbsPa: req.p1AbsPa,
  });
}

function solveDiameter(req: GasRequest): GasEval {
  const at = (d: number) => withFixed(req, { diameterM: d });
  let lo = 0.015;
  let hi = 2.5;
  const top = at(hi);
  if (top.ok && top.p2AbsPa > req.p2AbsPa && hi >= 2.5 && top.p2AbsPa < req.p1AbsPa) {
    // continue; if even the largest bore is still below the required outlet, fail below
  }
  if (!at(hi).ok || at(hi).p2AbsPa < req.p2AbsPa) {
    return FAIL("A 2.5 m bore still misses the required outlet pressure.");
  }
  if (at(lo).ok && at(lo).p2AbsPa >= req.p2AbsPa) {
    return FAIL("Even a 15 mm bore meets the outlet pressure. The line is oversized for this drop.");
  }
  for (let i = 0; i < 58; i++) {
    const mid = (lo + hi) / 2;
    const ev = at(mid);
    if (ev.ok && ev.p2AbsPa >= req.p2AbsPa) hi = mid;
    else lo = mid;
  }
  return at(hi);
}

function solveFlow(req: GasRequest): GasEval {
  const at = (m: number) => withFixed(req, { massKgS: m });
  let lo = 1e-4;
  let hi = 5;
  let guard = 0;
  while (guard < 24) {
    const ev = at(hi);
    if (!ev.ok || ev.p2AbsPa < req.p2AbsPa) break;
    hi *= 2;
    guard += 1;
    if (hi > 5e4) return FAIL("Outlet pressure is still met at an extreme flow. Check the pressures.");
  }
  if (at(lo).ok && at(lo).p2AbsPa < req.p2AbsPa) {
    return FAIL("Even a tiny flow misses the outlet pressure.");
  }
  for (let i = 0; i < 58; i++) {
    const mid = (lo + hi) / 2;
    const ev = at(mid);
    if (ev.ok && ev.p2AbsPa >= req.p2AbsPa) lo = mid;
    else hi = mid;
  }
  return at(lo);
}

function solveLength(req: GasRequest): GasEval {
  const probe = withFixed(req, { lengthM: 0, kMinor: 0 });
  if (!probe.ok && probe.message.includes("positive")) return probe;
  const area = Math.PI * req.diameterM * req.diameterM / 4;
  const gFlux = req.massKgS / area;
  const re = (gFlux * req.diameterM) / req.mu;
  const friction = darcyFriction(re, req.roughnessM / req.diameterM);
  const beta = betaOf(req.z, req.mw, req.tK);
  const s = (2 * G * req.elevM) / beta;
  const phi = expm1Over(s);
  const rhs = req.p1AbsPa ** 2 - req.p2AbsPa ** 2 * Math.exp(s);
  if (rhs <= 0) return FAIL("Outlet pressure is too high for this inlet and elevation.");
  const resist = rhs / (gFlux * gFlux * beta * phi);
  const lengthTerm = resist - req.kMinor;
  if (lengthTerm <= 0) return FAIL("Fitting losses alone exceed the available pressure ratio.");
  const lengthM = (lengthTerm * req.diameterM) / friction;
  if (!(lengthM > 0) || !Number.isFinite(lengthM)) return FAIL("Length did not solve.");
  return withFixed(req, { lengthM });
}

export function solveGas(req: GasRequest): GasEval {
  if (!(req.p1AbsPa > req.p2AbsPa) && req.mode !== "drop" && req.elevM >= 0) {
    // downhill can allow P2 > P1; don't block that case
  }
  if (req.mode !== "drop" && !(req.p2AbsPa > 0)) return FAIL("Outlet pressure must be positive absolute.");
  if (req.mode !== "drop" && req.p2AbsPa >= req.p1AbsPa && req.elevM >= -1) {
    if (req.elevM >= 0) return FAIL("Outlet pressure must be below inlet on a level or uphill line.");
  }
  if (req.mode === "drop") return withFixed(req, {});
  if (req.mode === "diameter") {
    if (!(req.massKgS > 0) || !(req.lengthM > 0)) return FAIL("Flow and length must be positive.");
    return solveDiameter(req);
  }
  if (req.mode === "flow") {
    if (!(req.diameterM > 0) || !(req.lengthM > 0)) return FAIL("Diameter and length must be positive.");
    return solveFlow(req);
  }
  if (!(req.massKgS > 0) || !(req.diameterM > 0)) return FAIL("Flow and diameter must be positive.");
  return solveLength(req);
}

export function gasWarnings(ev: GasEval): string[] {
  if (!ev.ok && ev.p2AbsPa === 0) return [ev.message];
  if (!ev.ok) return [];
  const notes: string[] = [];
  if (ev.machOut > 0.6) {
    notes.push("Outlet Mach is above 0.6. The isothermal model is only a screen this close to sonic velocity.");
  } else if (ev.machOut > 0.3) {
    notes.push("Outlet Mach is above 0.3. Expansion is no longer gentle — confirm Z and the pressure profile.");
  }
  if (ev.erosional > 0 && ev.vOut > ev.erosional) {
    notes.push(
      `Outlet velocity ${ev.vOut.toFixed(1)} m/s exceeds the API RP 14E erosional screen (c = 100, about ${ev.erosional.toFixed(1)} m/s).`,
    );
  }
  if (ev.p1AbsPa > 0 && ev.dpPa / ev.p1AbsPa > 0.4) {
    notes.push("Pressure drop is more than 40% of inlet. Re-estimate Z at the average pressure.");
  }
  if (ev.regime !== "turbulent") notes.push("Reynolds number is not fully turbulent. Unusual for a gas line — check viscosity and bore.");
  return notes;
}
