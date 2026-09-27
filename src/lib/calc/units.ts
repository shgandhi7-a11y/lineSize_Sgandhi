export const G = 9.80665;
export const R_UNIV = 8.314462618;
export const BAR_PA = 1e5;
export const ATM_BAR = 1.01325;
export const PSI_PA = 6894.757293168;
export const KGCM2_PA = 98066.5;

export type PressureUnit = "bar" | "kPa" | "psi" | "kgcm2";
export type DiamUnit = "mm" | "in";
export type LengthUnit = "m" | "km" | "ft";
export type LiquidFlowUnit = "m3h" | "ls" | "lmin" | "m3s" | "gpm" | "bblh" | "kgh";
export type GasFlowUnit = "nm3h" | "sm3h" | "mmscfd" | "kgh" | "th" | "am3h";

export const PRESSURE_UNITS: { id: PressureUnit; label: string }[] = [
  { id: "bar", label: "bar" },
  { id: "kPa", label: "kPa" },
  { id: "psi", label: "psi" },
  { id: "kgcm2", label: "kg/cm²" },
];

export const DIAM_UNITS: { id: DiamUnit; label: string }[] = [
  { id: "mm", label: "mm" },
  { id: "in", label: "in" },
];

export const LENGTH_UNITS: { id: LengthUnit; label: string }[] = [
  { id: "m", label: "m" },
  { id: "km", label: "km" },
  { id: "ft", label: "ft" },
];

export const LIQUID_FLOW_UNITS: { id: LiquidFlowUnit; label: string }[] = [
  { id: "m3h", label: "m³/h" },
  { id: "ls", label: "L/s" },
  { id: "lmin", label: "L/min" },
  { id: "m3s", label: "m³/s" },
  { id: "gpm", label: "gpm" },
  { id: "bblh", label: "bbl/h" },
  { id: "kgh", label: "kg/h" },
];

export const GAS_FLOW_UNITS: { id: GasFlowUnit; label: string }[] = [
  { id: "nm3h", label: "Nm³/h" },
  { id: "sm3h", label: "Sm³/h" },
  { id: "mmscfd", label: "MMSCFD" },
  { id: "kgh", label: "kg/h" },
  { id: "th", label: "t/h" },
  { id: "am3h", label: "am³/h" },
];

export function pressureToPa(value: number, unit: PressureUnit): number {
  switch (unit) {
    case "bar":
      return value * BAR_PA;
    case "kPa":
      return value * 1e3;
    case "psi":
      return value * PSI_PA;
    case "kgcm2":
      return value * KGCM2_PA;
  }
}

export function paToPressure(pa: number, unit: PressureUnit): number {
  switch (unit) {
    case "bar":
      return pa / BAR_PA;
    case "kPa":
      return pa / 1e3;
    case "psi":
      return pa / PSI_PA;
    case "kgcm2":
      return pa / KGCM2_PA;
  }
}

export function diamToM(value: number, unit: DiamUnit): number {
  return unit === "mm" ? value / 1000 : value * 0.0254;
}

export function mToDiam(m: number, unit: DiamUnit): number {
  return unit === "mm" ? m * 1000 : m / 0.0254;
}

export function lengthToM(value: number, unit: LengthUnit): number {
  switch (unit) {
    case "m":
      return value;
    case "km":
      return value * 1000;
    case "ft":
      return value * 0.3048;
  }
}

export function mToLength(m: number, unit: LengthUnit): number {
  switch (unit) {
    case "m":
      return m;
    case "km":
      return m / 1000;
    case "ft":
      return m / 0.3048;
  }
}

export function convertPressure(value: number, from: PressureUnit, to: PressureUnit): number {
  return paToPressure(pressureToPa(value, from), to);
}

export function convertDiam(value: number, from: DiamUnit, to: DiamUnit): number {
  return mToDiam(diamToM(value, from), to);
}

export function convertLength(value: number, from: LengthUnit, to: LengthUnit): number {
  return mToLength(lengthToM(value, from), to);
}

export function liquidFlowToM3s(value: number, unit: LiquidFlowUnit, rho: number): number {
  switch (unit) {
    case "m3h":
      return value / 3600;
    case "ls":
      return value / 1000;
    case "lmin":
      return value / 60_000;
    case "m3s":
      return value;
    case "gpm":
      return (value * 0.003785411784) / 60;
    case "bblh":
      return (value * 0.158987294928) / 3600;
    case "kgh":
      return rho > 0 ? value / 3600 / rho : Number.NaN;
  }
}

export function m3sToLiquidFlow(q: number, unit: LiquidFlowUnit, rho: number): number {
  switch (unit) {
    case "m3h":
      return q * 3600;
    case "ls":
      return q * 1000;
    case "lmin":
      return q * 60_000;
    case "m3s":
      return q;
    case "gpm":
      return (q * 60) / 0.003785411784;
    case "bblh":
      return (q * 3600) / 0.158987294928;
    case "kgh":
      return q * 3600 * rho;
  }
}

const TN = 273.15;
const PN = ATM_BAR * BAR_PA;
const TS = 15 + 273.15;
const TSCF = (60 - 32) * (5 / 9) + 273.15;
const PSCF = 14.696 * PSI_PA;

export function gasDensity(pPa: number, tK: number, mw: number, z: number): number {
  if (pPa <= 0 || tK <= 0 || mw <= 0 || z <= 0) return Number.NaN;
  return (pPa * (mw / 1000)) / (z * R_UNIV * tK);
}

export function gasFlowToKgS(
  value: number,
  unit: GasFlowUnit,
  mw: number,
  tK: number,
  z: number,
  pInPa: number,
): number {
  switch (unit) {
    case "kgh":
      return value / 3600;
    case "th":
      return (value * 1000) / 3600;
    case "nm3h":
      return ((value / 3600) * gasDensity(PN, TN, mw, 1));
    case "sm3h":
      return ((value / 3600) * gasDensity(PN, TS, mw, 1));
    case "mmscfd": {
      const m3s = (value * 1e6 * 0.028316846592) / 86400;
      return m3s * gasDensity(PSCF, TSCF, mw, 1);
    }
    case "am3h":
      return (value / 3600) * gasDensity(pInPa, tK, mw, z);
  }
}

export function kgSToGasFlow(
  kgs: number,
  unit: GasFlowUnit,
  mw: number,
  tK: number,
  z: number,
  pInPa: number,
): number {
  switch (unit) {
    case "kgh":
      return kgs * 3600;
    case "th":
      return (kgs * 3600) / 1000;
    case "nm3h":
      return (kgs / gasDensity(PN, TN, mw, 1)) * 3600;
    case "sm3h":
      return (kgs / gasDensity(PN, TS, mw, 1)) * 3600;
    case "mmscfd": {
      const m3s = kgs / gasDensity(PSCF, TSCF, mw, 1);
      return (m3s * 86400) / (1e6 * 0.028316846592);
    }
    case "am3h":
      return (kgs / gasDensity(pInPa, tK, mw, z)) * 3600;
  }
}

export function specificGasConstant(mw: number): number {
  return R_UNIV / (mw / 1000);
}

/** (e^s − 1) / s, with a stable limit of 1 at s = 0. */
export function expm1Over(s: number): number {
  if (Math.abs(s) < 1e-4) {
    return 1 + s / 2 + (s * s) / 6 + (s * s * s) / 24;
  }
  return Math.expm1(s) / s;
}

/**
 * Papay compressibility for sweet dry natural gas.
 * Pseudocriticals: Standing. Valid as a screening estimate only.
 */
export function papayZ(pPa: number, tK: number, sg: number): number {
  if (sg <= 0 || tK <= 0 || pPa <= 0) return Number.NaN;
  const tpcR = 169.2 + 349.5 * sg - 74.0 * sg * sg;
  const ppcPsia = 756.8 - 131.0 * sg - 3.6 * sg * sg;
  const tpr = (tK * 1.8) / tpcR;
  const ppr = pPa / PSI_PA / ppcPsia;
  if (tpr <= 0) return Number.NaN;
  const z =
    1 -
    (3.52 * ppr) / 10 ** (0.9813 * tpr) +
    (0.274 * ppr * ppr) / 10 ** (0.8157 * tpr);
  return Math.min(1.6, Math.max(0.2, z));
}
