import { darcyFriction, regimeOf, type Regime } from "./friction";
import { G } from "./units";

export type SolveMode = "drop" | "diameter" | "flow" | "length";

export type LiquidEval = {
  ok: boolean;
  message: string;
  diameterM: number;
  flowM3s: number;
  lengthM: number;
  velocity: number;
  re: number;
  friction: number;
  regime: Regime;
  kMinor: number;
  dpFrictionPa: number;
  dpMinorPa: number;
  dpStaticPa: number;
  dpTotalPa: number;
  headFrictionM: number;
  headMinorM: number;
  headStaticM: number;
  headTotalM: number;
  p2GaugePa: number;
  profile: { xM: number; pGaugePa: number }[];
};

export type LiquidRequest = {
  mode: SolveMode;
  rho: number;
  mu: number;
  flowM3s: number;
  diameterM: number;
  lengthM: number;
  elevM: number;
  roughnessM: number;
  kMinor: number;
  p1GaugePa: number;
  p2GaugePa: number;
};

const FAIL = (message: string): LiquidEval => ({
  ok: false,
  message,
  diameterM: 0,
  flowM3s: 0,
  lengthM: 0,
  velocity: 0,
  re: 0,
  friction: 0,
  regime: "turbulent",
  kMinor: 0,
  dpFrictionPa: 0,
  dpMinorPa: 0,
  dpStaticPa: 0,
  dpTotalPa: 0,
  headFrictionM: 0,
  headMinorM: 0,
  headStaticM: 0,
  headTotalM: 0,
  p2GaugePa: 0,
  profile: [],
});

export function evalLiquidAt(input: {
  rho: number;
  mu: number;
  flowM3s: number;
  diameterM: number;
  lengthM: number;
  elevM: number;
  roughnessM: number;
  kMinor: number;
  p1GaugePa: number;
}): LiquidEval {
  const { rho, mu, flowM3s: q, diameterM: d, lengthM: l, elevM, roughnessM, kMinor, p1GaugePa } = input;
  if (!(rho > 0) || !(mu > 0)) return FAIL("Density and viscosity must be positive.");
  if (!(q > 0)) return FAIL("Flow must be positive.");
  if (!(d > 0)) return FAIL("Diameter must be positive.");
  if (!(l >= 0)) return FAIL("Length cannot be negative.");
  const area = Math.PI * d * d / 4;
  const velocity = q / area;
  const re = (rho * velocity * d) / mu;
  const friction = darcyFriction(re, roughnessM / d);
  if (!Number.isFinite(friction) || friction <= 0) return FAIL("Friction factor did not converge.");
  const dyn = (rho * velocity * velocity) / 2;
  const dpFrictionPa = friction * (l / d) * dyn;
  const dpMinorPa = kMinor * dyn;
  const dpStaticPa = rho * G * elevM;
  const dpTotalPa = dpFrictionPa + dpMinorPa + dpStaticPa;
  const head = (pa: number) => pa / (rho * G);
  const steps = 24;
  const profile: { xM: number; pGaugePa: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (l * i) / steps;
    const kAt = l > 0 ? kMinor * (x / l) : 0;
    const dp = friction * (x / d) * dyn + kAt * dyn + rho * G * (l > 0 ? (elevM * x) / l : 0);
    profile.push({ xM: x, pGaugePa: p1GaugePa - dp });
  }
  return {
    ok: true,
    message: "",
    diameterM: d,
    flowM3s: q,
    lengthM: l,
    velocity,
    re,
    friction,
    regime: regimeOf(re),
    kMinor,
    dpFrictionPa,
    dpMinorPa,
    dpStaticPa,
    dpTotalPa,
    headFrictionM: head(dpFrictionPa),
    headMinorM: head(dpMinorPa),
    headStaticM: elevM,
    headTotalM: head(dpTotalPa),
    p2GaugePa: p1GaugePa - dpTotalPa,
    profile,
  };
}

function solveDiameter(req: LiquidRequest): LiquidEval {
  const target = req.p1GaugePa - req.p2GaugePa;
  const staticPa = req.rho * G * req.elevM;
  if (target <= staticPa + 1) {
    return FAIL("Available pressure does not cover the elevation head. Friction would have to be negative.");
  }
  const at = (d: number) =>
    evalLiquidAt({ ...req, diameterM: d, flowM3s: req.flowM3s, lengthM: req.lengthM });
  let lo = 0.008;
  let hi = 2.5;
  const hiEval = at(hi);
  if (!hiEval.ok) return hiEval;
  if (hiEval.dpTotalPa > target) {
    return FAIL("Even a 2.5 m bore exceeds the allowed pressure drop. Check flow, length or pressures.");
  }
  for (let i = 0; i < 56; i++) {
    const mid = (lo + hi) / 2;
    const ev = at(mid);
    if (!ev.ok || ev.dpTotalPa > target) lo = mid;
    else hi = mid;
  }
  return at(hi);
}

function solveFlow(req: LiquidRequest): LiquidEval {
  const target = req.p1GaugePa - req.p2GaugePa;
  const at = (q: number) =>
    evalLiquidAt({ ...req, flowM3s: q, diameterM: req.diameterM, lengthM: req.lengthM });
  let lo = 1e-6;
  let hi = 2;
  let guard = 0;
  while (guard < 20) {
    const ev = at(hi);
    if (!ev.ok) return ev;
    if (ev.dpTotalPa >= target) break;
    hi *= 2;
    guard += 1;
    if (hi > 100) return FAIL("Allowed pressure drop is not reached even at a very high flow.");
  }
  for (let i = 0; i < 56; i++) {
    const mid = (lo + hi) / 2;
    const ev = at(mid);
    if (!ev.ok || ev.dpTotalPa > target) hi = mid;
    else lo = mid;
  }
  return at(lo);
}

function solveLength(req: LiquidRequest): LiquidEval {
  const probe = evalLiquidAt({ ...req, lengthM: 1 });
  if (!probe.ok) return probe;
  const target = req.p1GaugePa - req.p2GaugePa;
  const dyn = (req.rho * probe.velocity * probe.velocity) / 2;
  const staticPa = req.rho * G * req.elevM;
  const available = target - staticPa;
  if (available <= 0) {
    return FAIL("Elevation head already uses the full pressure difference.");
  }
  const group = available / dyn - req.kMinor;
  if (group <= 0) return FAIL("Fitting losses alone exceed the pressure left after elevation.");
  const lengthM = (group * req.diameterM) / probe.friction;
  return evalLiquidAt({ ...req, lengthM });
}

export function solveLiquid(req: LiquidRequest): LiquidEval {
  if (!(req.rho > 0) || !(req.mu > 0)) return FAIL("Density and viscosity must be positive.");
  if (req.mode === "drop") {
    return evalLiquidAt({
      rho: req.rho,
      mu: req.mu,
      flowM3s: req.flowM3s,
      diameterM: req.diameterM,
      lengthM: req.lengthM,
      elevM: req.elevM,
      roughnessM: req.roughnessM,
      kMinor: req.kMinor,
      p1GaugePa: req.p1GaugePa,
    });
  }
  if (!(req.lengthM > 0) && req.mode !== "length") return FAIL("Length must be positive.");
  if (req.mode === "diameter") {
    if (!(req.flowM3s > 0)) return FAIL("Flow must be positive.");
    return solveDiameter(req);
  }
  if (req.mode === "flow") {
    if (!(req.diameterM > 0)) return FAIL("Diameter must be positive.");
    return solveFlow(req);
  }
  if (!(req.flowM3s > 0) || !(req.diameterM > 0)) return FAIL("Flow and diameter must be positive.");
  return solveLength(req);
}

export type ServiceBand = { id: string; label: string; min: number; max: number };

export const SERVICE_BANDS: ServiceBand[] = [
  { id: "process", label: "Process liquid", min: 1, max: 3 },
  { id: "suction", label: "Pump suction", min: 0.6, max: 1.5 },
  { id: "discharge", label: "Pump discharge", min: 1.5, max: 3.5 },
];

export function liquidWarnings(ev: LiquidEval, serviceId: string): string[] {
  if (!ev.ok) return [];
  const notes: string[] = [];
  const band = SERVICE_BANDS.find((s) => s.id === serviceId) ?? SERVICE_BANDS[0];
  if (ev.velocity < band.min) {
    notes.push(`Velocity ${ev.velocity.toFixed(2)} m/s is below the ${band.label.toLowerCase()} band (${band.min}–${band.max} m/s).`);
  } else if (ev.velocity > band.max) {
    notes.push(`Velocity ${ev.velocity.toFixed(2)} m/s is above the ${band.label.toLowerCase()} band (${band.min}–${band.max} m/s).`);
  }
  if (ev.regime === "laminar") notes.push("Laminar flow. Friction is 64/Re; do not use turbulent rules of thumb.");
  if (ev.regime === "transitional") notes.push("Transitional Reynolds number. Friction is less certain here.");
  if (ev.p2GaugePa < -2e4) notes.push("Outlet pressure is below atmospheric. Check for vacuum or a siphon break.");
  return notes;
}
