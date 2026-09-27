import { ATM_BAR, BAR_PA, G } from "./units";

export type PumpMode = "nozzle" | "system";

export type PumpRequest = {
  mode: PumpMode;
  rho: number;
  flowM3s: number;
  psGaugePa: number;
  pdGaugePa: number;
  nozzleElevM: number;
  suctionM: number;
  dischargeM: number;
  staticLiftM: number;
  frictionHeadM: number;
  sourceGaugePa: number;
  destGaugePa: number;
  etaPump: number;
  etaMotor: number;
  hours: number;
  load: number;
  tariff: number;
  pvapPa: number;
  npshrM: number;
  patmPa: number;
};

export type PumpEval = {
  ok: boolean;
  message: string;
  tdhM: number;
  staticM: number;
  pressureM: number;
  frictionM: number;
  velocityM: number;
  vs: number;
  vd: number;
  hydraulicW: number;
  shaftW: number;
  electricW: number;
  annualKwh: number;
  annualCost: number;
  specificKwhM3: number;
  npshaM: number;
  npshMarginM: number;
};

export function solvePump(req: PumpRequest): PumpEval {
  const blank: PumpEval = {
    ok: false,
    message: "",
    tdhM: 0,
    staticM: 0,
    pressureM: 0,
    frictionM: 0,
    velocityM: 0,
    vs: 0,
    vd: 0,
    hydraulicW: 0,
    shaftW: 0,
    electricW: 0,
    annualKwh: 0,
    annualCost: 0,
    specificKwhM3: 0,
    npshaM: 0,
    npshMarginM: 0,
  };
  if (!(req.rho > 0)) return { ...blank, message: "Density must be positive." };
  if (!(req.flowM3s > 0)) return { ...blank, message: "Flow must be positive." };
  if (!(req.etaPump > 0) || !(req.etaMotor > 0) || req.etaPump > 100 || req.etaMotor > 100) {
    return { ...blank, message: "Efficiencies must be between 0 and 100%." };
  }
  const q = req.flowM3s;
  const area = (d: number) => (d > 0 ? (Math.PI * d * d) / 4 : 0);
  const vs = area(req.suctionM) > 0 ? q / area(req.suctionM) : 0;
  const vd = area(req.dischargeM) > 0 ? q / area(req.dischargeM) : 0;
  let staticM = 0;
  let pressureM = 0;
  let frictionM = 0;
  let velocityM = 0;
  let tdh = 0;
  if (req.mode === "nozzle") {
    pressureM = (req.pdGaugePa - req.psGaugePa) / (req.rho * G);
    staticM = req.nozzleElevM;
    velocityM = (vd * vd - vs * vs) / (2 * G);
    frictionM = 0;
    tdh = pressureM + staticM + velocityM;
  } else {
    staticM = req.staticLiftM;
    frictionM = req.frictionHeadM;
    pressureM = (req.destGaugePa - req.sourceGaugePa) / (req.rho * G);
    velocityM = 0;
    tdh = staticM + frictionM + pressureM;
  }
  const hydraulicW = req.rho * G * q * tdh;
  const shaftW = hydraulicW / (req.etaPump / 100);
  const electricW = shaftW / (req.etaMotor / 100);
  const duty = Math.min(1.5, Math.max(0, req.load / 100));
  const annualKwh = (electricW / 1000) * Math.max(0, req.hours) * duty;
  const annualCost = annualKwh * Math.max(0, req.tariff);
  const specificKwhM3 = q > 0 ? electricW / 1000 / (q * 3600) : 0;
  const psAbs = req.psGaugePa + req.patmPa;
  const npshaM = (psAbs - req.pvapPa) / (req.rho * G) + (vs * vs) / (2 * G);
  const npshMarginM = npshaM - req.npshrM;
  return {
    ok: true,
    message: tdh <= 0 ? "Head is zero or negative — this is not a pump duty (pressure recovery or downhill)." : "",
    tdhM: tdh,
    staticM,
    pressureM,
    frictionM,
    velocityM,
    vs,
    vd,
    hydraulicW,
    shaftW,
    electricW,
    annualKwh,
    annualCost,
    specificKwhM3,
    npshaM,
    npshMarginM,
  };
}

export function pumpFlowVariants(
  req: PumpRequest,
  factors: number[],
): { factor: number; flowM3s: number; tdhM: number; electricW: number; annualCost: number }[] {
  return factors.map((factor) => {
    if (req.mode === "nozzle") {
      const ev = solvePump({ ...req, flowM3s: req.flowM3s * factor });
      return { factor, flowM3s: req.flowM3s * factor, tdhM: ev.tdhM, electricW: ev.electricW, annualCost: ev.annualCost };
    }
    const friction = req.frictionHeadM * factor * factor;
    const ev = solvePump({ ...req, flowM3s: req.flowM3s * factor, frictionHeadM: friction });
    return { factor, flowM3s: req.flowM3s * factor, tdhM: ev.tdhM, electricW: ev.electricW, annualCost: ev.annualCost };
  });
}

export const DEFAULT_PATM_PA = ATM_BAR * BAR_PA;
