import { sumK, type FittingId } from "./fluids";
import { evalLiquidAt } from "./liquid";
import { electricPumpW } from "./optimum";
import { pipeSize, type ScheduleId } from "./pipes";
import { BAR_PA, G } from "./units";

export type ItemKind =
  | "pipe"
  | "valve"
  | "check"
  | "strainer"
  | "exchanger"
  | "meter"
  | "orifice"
  | "mixer"
  | "pump"
  | "control";

export type ValveStyle = "globe" | "ball";

/** SI item. Display units stay in the panel. */
export type LoopItemSi = {
  id: string;
  kind: ItemKind;
  tag: string;
  lengthM: number;
  nps: string;
  schedule: ScheduleId;
  elevM: number;
  fittings: Partial<Record<FittingId, number>>;
  dpCleanPa: number;
  foulFactor: number;
  valveKind: string;
  qty: number;
  valveStyle: ValveStyle;
  fl: number;
  minDpPa: number;
};

export type LoopRequest = {
  rho: number;
  mu: number;
  pvapPa: number;
  pcPa: number;
  flowM3s: number;
  patmPa: number;
  roughM: number;
  sourcePPa: number;
  destPPa: number;
  sourceElevM: number;
  destElevM: number;
  pumpMode: "size" | "given";
  givenDpPa: number;
  curve: "flat" | "centrifugal";
  etaPumpPct: number;
  etaMotorPct: number;
  npshrM: number;
  items: LoopItemSi[];
};

export type ItemResult = {
  id: string;
  tag: string;
  kind: ItemKind;
  pInPa: number;
  pOutPa: number;
  dpPa: number;
  dynamicPa: number;
  elevM: number;
  velocity: number;
  idMm: number;
};

export type ValveSizing = {
  kv: number;
  cv: number;
  choked: boolean;
  dpChokePa: number;
  sg: number;
};

export type ValveResult = ValveSizing & {
  tag: string;
  dpPa: number;
  p1Pa: number;
  p2Pa: number;
  authority: number;
  style: ValveStyle;
  nps: string;
  ratedCv: number;
  travel: number;
  fl: number;
  short: boolean;
};

export type LoopCase = {
  name: string;
  flowFrac: number;
  fouled: boolean;
  pumpDpPa: number;
  valveDpPa: number;
  kvNeed: number;
  pumpKW: number;
  delivers: boolean;
};

export type LoopEval = {
  ok: boolean;
  message: string;
  pumpDpPa: number;
  pumpHeadM: number;
  pumpKW: number;
  hydraulicKW: number;
  npshaM: number;
  npshMarginM: number;
  staticPa: number;
  dynamicPa: number;
  valve: ValveResult | null;
  items: ItemResult[];
  cases: LoopCase[];
  warnings: string[];
  hasPump: boolean;
  delivers: boolean;
};

const VALVE_K: Record<string, number> = {
  gate: 0.17,
  globe: 10,
  ball: 0.05,
  butterfly: 0.45,
  plug: 0.9,
  check: 2,
};

/** Typical full-open Cv. A screen, not a vendor catalog. */
const CATALOG: Record<ValveStyle, { nps: string; cv: number }[]> = {
  globe: [
    { nps: "1", cv: 12 },
    { nps: "1-1/2", cv: 28 },
    { nps: "2", cv: 46 },
    { nps: "3", cv: 110 },
    { nps: "4", cv: 195 },
    { nps: "6", cv: 450 },
    { nps: "8", cv: 780 },
    { nps: "10", cv: 1200 },
    { nps: "12", cv: 1800 },
  ],
  ball: [
    { nps: "1", cv: 45 },
    { nps: "1-1/2", cv: 90 },
    { nps: "2", cv: 160 },
    { nps: "3", cv: 370 },
    { nps: "4", cv: 650 },
    { nps: "6", cv: 1400 },
    { nps: "8", cv: 2500 },
    { nps: "10", cv: 3900 },
    { nps: "12", cv: 5500 },
  ],
};

const RANGEABILITY = 50;
const DESIGN_TRAVEL = 0.7;

export const ITEM_KINDS: { id: ItemKind; label: string }[] = [
  { id: "pipe", label: "Pipe" },
  { id: "pump", label: "Pump" },
  { id: "control", label: "Control valve" },
  { id: "valve", label: "Isolation valve" },
  { id: "check", label: "Check valve" },
  { id: "strainer", label: "Strainer" },
  { id: "exchanger", label: "Exchanger" },
  { id: "meter", label: "Flow element" },
  { id: "orifice", label: "Restriction orifice" },
  { id: "mixer", label: "Static mixer" },
];

const FAIL = (message: string): LoopEval => ({
  ok: false,
  message,
  pumpDpPa: 0,
  pumpHeadM: 0,
  pumpKW: 0,
  hydraulicKW: 0,
  npshaM: 0,
  npshMarginM: 0,
  staticPa: 0,
  dynamicPa: 0,
  valve: null,
  items: [],
  cases: [],
  warnings: [],
  hasPump: false,
  delivers: false,
});

function boreM(nps: string, schedule: ScheduleId): { idM: number; idMm: number } {
  const size = pipeSize(nps, schedule) ?? pipeSize(nps, "40") ?? pipeSize("4", "40");
  const idMm = size?.idMm ?? 102.26;
  return { idM: idMm / 1000, idMm };
}

type Part = { dynamicPa: number; elevPa: number; velocity: number; idMm: number };

function partOf(item: LoopItemSi, q: number, qDesign: number, fouled: boolean, rho: number, mu: number, roughM: number): Part {
  const elevPa = rho * G * item.elevM;
  const { idM, idMm } = boreM(item.nps, item.schedule);
  if (item.kind === "pump" || item.kind === "control") {
    return { dynamicPa: 0, elevPa, velocity: 0, idMm };
  }
  if (item.kind === "pipe") {
    const ev = evalLiquidAt({
      rho,
      mu,
      flowM3s: q,
      diameterM: idM,
      lengthM: Math.max(0, item.lengthM),
      elevM: item.elevM,
      roughnessM: roughM,
      kMinor: sumK(item.fittings),
      p1GaugePa: 0,
    });
    if (!ev.ok) return { dynamicPa: 0, elevPa, velocity: 0, idMm };
    return { dynamicPa: ev.dpFrictionPa + ev.dpMinorPa, elevPa: ev.dpStaticPa, velocity: ev.velocity, idMm };
  }
  if (item.kind === "valve" || item.kind === "check") {
    const kUnit = item.kind === "check" ? VALVE_K.check : VALVE_K[item.valveKind] ?? 0.2;
    const k = kUnit * Math.max(1, item.qty);
    const area = (Math.PI * idM * idM) / 4;
    const velocity = area > 0 ? q / area : 0;
    const dynamicPa = k * rho * velocity * velocity * 0.5;
    return { dynamicPa, elevPa, velocity, idMm };
  }
  const factor = fouled ? Math.max(0, item.foulFactor) : 1;
  const scale = qDesign > 0 ? (q / qDesign) ** 2 : 1;
  const area = (Math.PI * idM * idM) / 4;
  const velocity = area > 0 ? q / area : 0;
  return { dynamicPa: Math.max(0, item.dpCleanPa) * factor * scale, elevPa, velocity, idMm };
}

/** Liquid control-valve screen, IEC 60534 with Fp = 1. Kv is m³/h and bar. */
export function sizeLiquidValve(input: {
  qM3h: number;
  dpPa: number;
  rho: number;
  p1GaugePa: number;
  patmPa: number;
  pvapPa: number;
  pcPa: number;
  fl: number;
}): ValveSizing {
  const sg = input.rho > 0 ? input.rho / 998 : 1;
  const dpBar = input.dpPa / BAR_PA;
  const p1AbsBar = (input.p1GaugePa + input.patmPa) / BAR_PA;
  const pvBar = Math.max(0, input.pvapPa) / BAR_PA;
  const pcBar = Math.max(0, input.pcPa) / BAR_PA;
  let ff = 0.96;
  if (pcBar > 0 && pvBar > 0 && pvBar < pcBar) ff = 0.96 - 0.28 * Math.sqrt(pvBar / pcBar);
  const fl = input.fl > 0 ? input.fl : 0.9;
  const dpChokeBar = fl ** 2 * Math.max(0, p1AbsBar - ff * pvBar);
  const choked = dpChokeBar > 0 && dpBar > dpChokeBar + 1e-6;
  const used = choked ? dpChokeBar : dpBar;
  if (!(used > 0) || !(sg > 0) || !(input.qM3h > 0)) {
    return { kv: 0, cv: 0, choked, dpChokePa: dpChokeBar * BAR_PA, sg };
  }
  let kv = input.qM3h * Math.sqrt(sg / used);
  if (choked) kv /= fl;
  return { kv, cv: kv / 0.865, choked, dpChokePa: dpChokeBar * BAR_PA, sg };
}

export function selectValveBody(style: ValveStyle, cvDesign: number): { nps: string; ratedCv: number; travel: number; short: boolean } {
  const table = CATALOG[style];
  const fraction = RANGEABILITY ** (DESIGN_TRAVEL - 1);
  const need = cvDesign > 0 ? cvDesign / fraction : 0;
  const found = table.find((row) => row.cv + 1e-6 >= need) ?? table[table.length - 1];
  const travel = cvDesign > 0 && found.cv > 0 ? 1 + Math.log(cvDesign / found.cv) / Math.log(RANGEABILITY) : 0;
  return { nps: found.nps, ratedCv: found.cv, travel, short: found.cv + 1e-6 < need };
}

function curveFactor(curve: "flat" | "centrifugal", frac: number): number {
  if (curve === "flat") return 1;
  const q = Math.max(0, frac);
  return 1.12 - 0.12 * q * q;
}

export function evalLoop(req: LoopRequest): LoopEval {
  const { rho, mu, flowM3s: qd } = req;
  if (!(rho > 0) || !(mu > 0)) return FAIL("Density and viscosity must be positive.");
  if (!(qd > 0)) return FAIL("Flow must be positive.");
  if (!req.items.length) return FAIL("Add pipe or equipment to the loop.");
  const hasPump = req.items.some((item) => item.kind === "pump");
  const valveItem = req.items.find((item) => item.kind === "control") ?? null;

  const fixedAt = (q: number, fouled: boolean) => {
    let dynamic = 0;
    let elev = 0;
    const parts = new Map<string, Part>();
    for (const item of req.items) {
      const part = partOf(item, q, qd, fouled, rho, mu, req.roughM);
      parts.set(item.id, part);
      elev += part.elevPa;
      if (item.kind !== "pump" && item.kind !== "control") dynamic += part.dynamicPa;
    }
    return { dynamic, elev, parts, total: dynamic + elev };
  };

  const design = fixedAt(qd, true);
  const alloc = valveItem ? Math.max(0, valveItem.minDpPa) : 0;
  let pumpDp = 0;
  let valveDp = 0;
  if (hasPump && req.pumpMode === "size") {
    pumpDp = req.destPPa - req.sourcePPa + design.total + alloc;
    valveDp = alloc;
    if (pumpDp < 0) {
      pumpDp = 0;
      valveDp = valveItem ? req.sourcePPa - req.destPPa - design.total : 0;
    }
  } else if (hasPump && req.pumpMode === "given") {
    pumpDp = req.givenDpPa;
    valveDp = valveItem ? req.sourcePPa + pumpDp - req.destPPa - design.total : 0;
  } else {
    pumpDp = 0;
    valveDp = valveItem ? req.sourcePPa - req.destPPa - design.total : 0;
  }

  const delivers = !valveItem || valveDp >= -200;
  let p = req.sourcePPa;
  let suctionP = req.sourcePPa;
  let suctionV = 0;
  let seenPump = false;
  const items: ItemResult[] = [];
  for (const item of req.items) {
    const part = design.parts.get(item.id) ?? { dynamicPa: 0, elevPa: 0, velocity: 0, idMm: 0 };
    let drop = part.dynamicPa + part.elevPa;
    if (item.kind === "pump") drop = -pumpDp + part.elevPa;
    if (item.kind === "control") drop = Math.max(0, valveDp) + part.elevPa;
    const pIn = p;
    const pOut = p - drop;
    if (!seenPump && item.kind !== "pump") {
      suctionP = pOut;
      if (part.velocity > 0) suctionV = part.velocity;
    }
    if (item.kind === "pump") seenPump = true;
    items.push({
      id: item.id,
      tag: item.tag,
      kind: item.kind,
      pInPa: pIn,
      pOutPa: pOut,
      dpPa: pIn - pOut,
      dynamicPa: item.kind === "control" ? Math.max(0, valveDp) : item.kind === "pump" ? -pumpDp : part.dynamicPa,
      elevM: item.elevM,
      velocity: part.velocity,
      idMm: part.idMm,
    });
    p = pOut;
  }

  const valveRow = valveItem ? items.find((row) => row.id === valveItem.id) ?? null : null;
  let valve: ValveResult | null = null;
  if (valveItem && valveRow && valveDp > 200) {
    const sized = sizeLiquidValve({
      qM3h: qd * 3600,
      dpPa: valveDp,
      rho,
      p1GaugePa: valveRow.pInPa,
      patmPa: req.patmPa,
      pvapPa: req.pvapPa,
      pcPa: req.pcPa,
      fl: valveItem.fl,
    });
    const body = selectValveBody(valveItem.valveStyle, sized.cv);
    const denom = valveDp + design.dynamic;
    valve = {
      ...sized,
      tag: valveItem.tag,
      dpPa: valveDp,
      p1Pa: valveRow.pInPa,
      p2Pa: valveRow.pOutPa,
      authority: denom > 0 ? valveDp / denom : 0,
      style: valveItem.valveStyle,
      nps: body.nps,
      ratedCv: body.ratedCv,
      travel: body.travel,
      fl: valveItem.fl > 0 ? valveItem.fl : 0.9,
      short: body.short,
    };
  }

  const headM = pumpDp > 0 ? pumpDp / (rho * G) : 0;
  const hydraulicW = pumpDp > 0 ? rho * G * qd * headM : 0;
  const electricW = electricPumpW(rho, qd, headM, req.etaPumpPct, req.etaMotorPct);
  const npshaM = seenPump ? (suctionP + req.patmPa - req.pvapPa) / (rho * G) + (suctionV * suctionV) / (2 * G) : 0;
  const npshMarginM = seenPump ? npshaM - req.npshrM : 0;

  const caseOf = (name: string, frac: number, fouled: boolean): LoopCase => {
    const q = qd * frac;
    const fixed = fixedAt(q, fouled);
    const pDp = hasPump ? pumpDp * curveFactor(req.curve, frac) : 0;
    const vDp = valveItem ? req.sourcePPa + pDp - req.destPPa - fixed.total : 0;
    const kw = pDp > 0 ? electricPumpW(rho, q, pDp / (rho * G), req.etaPumpPct, req.etaMotorPct) / 1000 : 0;
    let kvNeed = 0;
    if (valveItem && vDp > 200) {
      const rowP1 = valve?.p1Pa ?? req.sourcePPa;
      kvNeed = sizeLiquidValve({
        qM3h: q * 3600,
        dpPa: vDp,
        rho,
        p1GaugePa: rowP1,
        patmPa: req.patmPa,
        pvapPa: req.pvapPa,
        pcPa: req.pcPa,
        fl: valveItem.fl,
      }).kv;
    }
    return {
      name,
      flowFrac: frac,
      fouled,
      pumpDpPa: pDp,
      valveDpPa: vDp,
      kvNeed,
      pumpKW: kw,
      delivers: !valveItem || vDp >= -200,
    };
  };

  const cases = [
    caseOf("100% fouled", 1, true),
    caseOf("100% clean", 1, false),
    caseOf("120% fouled", 1.2, true),
    caseOf("140% fouled", 1.4, true),
    caseOf("60% clean", 0.6, false),
  ];

  const warnings: string[] = [];
  if (hasPump && req.pumpMode === "size" && pumpDp <= 0) {
    warnings.push("The source pressure covers the destination without a pump. Pump differential is zero.");
  }
  if (valveItem && valveDp < -200) {
    warnings.push("The control valve has no positive drop. The pump head, or the source pressure, does not cover this loop.");
  } else if (valveItem && alloc > 0 && valveDp + 500 < alloc && req.pumpMode === "given") {
    warnings.push("Valve drop is below the minimum set on the control valve.");
  }
  if (valve?.choked) warnings.push("The control valve is in choked liquid flow at the design drop. Confirm the size with the vendor.");
  if (valve && valve.authority < 0.25) warnings.push("Valve authority is under 0.25. Equal percentage is the usual choice. Most of the drop is in the line, not the valve.");
  if (valve && valve.authority > 0.75) warnings.push("Valve authority is above 0.75. The valve is taking most of the dynamic drop.");
  if (valve?.short) warnings.push("Design Cv is above the largest body in the screening table. Use a larger valve or a higher design drop.");
  const maxCase = cases.find((row) => row.name === "140% fouled");
  if (valveItem && maxCase && !maxCase.delivers) {
    warnings.push("At 140% flow, fouled, the residual valve drop is gone. Destination pressure will not hold.");
  } else if (valve && maxCase && maxCase.kvNeed > valve.ratedCv) {
    warnings.push("At 140% flow the required Cv is above the screened full-open Cv.");
  }
  if (seenPump && npshMarginM < 0) warnings.push(`NPSHa is ${Math.abs(npshMarginM).toFixed(1)} m below NPSHr on the fouled suction.`);
  const rise = req.items.reduce((sum, item) => sum + item.elevM, 0);
  if (Math.abs(rise - (req.destElevM - req.sourceElevM)) > 0.5) {
    warnings.push("Item rises do not match destination elevation minus source elevation. Static head uses the sum of the item rises.");
  }
  if (!(req.pcPa > 0)) warnings.push("Critical pressure is not set. The choke check uses a liquid critical-pressure factor of 0.96.");
  for (const row of items) {
    if (row.kind === "pipe" && row.velocity > 4.5) {
      warnings.push(`${row.tag} velocity is ${row.velocity.toFixed(1)} m/s. That is high for an ordinary process liquid.`);
      break;
    }
  }

  return {
    ok: true,
    message: "",
    pumpDpPa: pumpDp,
    pumpHeadM: headM,
    pumpKW: Number.isFinite(electricW) ? electricW / 1000 : 0,
    hydraulicKW: hydraulicW / 1000,
    npshaM,
    npshMarginM,
    staticPa: design.elev,
    dynamicPa: design.dynamic,
    valve,
    items,
    cases,
    warnings: warnings.slice(0, 6),
    hasPump,
    delivers,
  };
}
