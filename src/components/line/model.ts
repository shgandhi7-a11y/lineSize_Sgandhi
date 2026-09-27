import type { FittingId, RoughnessId } from "@/lib/calc/fluids";
import type { ItemKind, ValveStyle } from "@/lib/calc/loop";
import { pipeSize, type ScheduleId } from "@/lib/calc/pipes";
import type { SolveMode } from "@/lib/calc/liquid";
import type { PumpMode } from "@/lib/calc/pump";
import type { DiamUnit, GasFlowUnit, LengthUnit, LiquidFlowUnit, PressureUnit } from "@/lib/calc/units";

export type LiquidState = {
  mode: SolveMode;
  fluidId: string;
  density: number;
  viscCp: number;
  pvapKpa: number;
  flowValue: number;
  flowUnit: LiquidFlowUnit;
  diamValue: number;
  diamUnit: DiamUnit;
  lengthValue: number;
  lengthUnit: LengthUnit;
  elevValue: number;
  elevUnit: LengthUnit;
  roughId: RoughnessId;
  roughMm: number;
  p1: number;
  p2: number;
  pUnit: PressureUnit;
  service: string;
  nps: string;
  schedule: ScheduleId;
  fittings: Partial<Record<FittingId, number>>;
  patmBar: number;
  etaMachine: number;
  etaMotor: number;
  hours: number;
  load: number;
  tariff: number;
  currency: string;
  pipeCost100: number;
  pipeExp: number;
  capitalCharge: number;
  sheetNote: string;
};

export type GasState = {
  mode: SolveMode;
  fluidId: string;
  mw: number;
  sg: number;
  viscCp: number;
  gamma: number;
  z: number;
  tempC: number;
  flowValue: number;
  flowUnit: GasFlowUnit;
  diamValue: number;
  diamUnit: DiamUnit;
  lengthValue: number;
  lengthUnit: LengthUnit;
  elevValue: number;
  elevUnit: LengthUnit;
  roughId: RoughnessId;
  roughMm: number;
  p1: number;
  p2: number;
  pUnit: PressureUnit;
  nps: string;
  schedule: ScheduleId;
  fittings: Partial<Record<FittingId, number>>;
  patmBar: number;
  etaMachine: number;
  etaMotor: number;
  hours: number;
  load: number;
  tariff: number;
  currency: string;
  pipeCost100: number;
  pipeExp: number;
  capitalCharge: number;
  sheetNote: string;
};

export type PumpState = {
  mode: PumpMode;
  density: number;
  flowValue: number;
  flowUnit: LiquidFlowUnit;
  ps: number;
  pd: number;
  pUnit: PressureUnit;
  nozzleElev: number;
  suctionMm: number;
  dischargeMm: number;
  staticLift: number;
  frictionHead: number;
  sourceP: number;
  destP: number;
  etaPump: number;
  etaMotor: number;
  hours: number;
  load: number;
  tariff: number;
  currency: string;
  pvapKpa: number;
  npshr: number;
  patmBar: number;
  sheetNote: string;
};

export type LoopItem = {
  id: string;
  kind: ItemKind;
  tag: string;
  lengthM: number;
  nps: string;
  schedule: ScheduleId;
  elevM: number;
  fittings: Partial<Record<FittingId, number>>;
  dpClean: number;
  foulFactor: number;
  valveKind: string;
  qty: number;
  valveStyle: ValveStyle;
  fl: number;
  minDp: number;
};

export type LoopState = {
  name: string;
  service: string;
  fluidId: string;
  density: number;
  viscCp: number;
  pvapKpa: number;
  pcKpa: number;
  tempC: number;
  flowValue: number;
  flowUnit: LiquidFlowUnit;
  pUnit: PressureUnit;
  sourceName: string;
  sourceP: number;
  sourceElev: number;
  destName: string;
  destP: number;
  destElev: number;
  patmBar: number;
  roughMm: number;
  pumpMode: "size" | "given";
  givenDp: number;
  curve: "flat" | "centrifugal";
  etaPump: number;
  etaMotor: number;
  npshr: number;
  hours: number;
  load: number;
  tariff: number;
  currency: string;
  items: LoopItem[];
  sheetNote: string;
};

export type TabId = "liquid" | "gas" | "pump" | "loop" | "cost" | "saved";

const nps4 = pipeSize("4", "40");
const nps8 = pipeSize("8", "40");
const nps6 = pipeSize("6", "40");

export const defaultLiquid = (): LiquidState => ({
  mode: "drop",
  fluidId: "water25",
  density: 997,
  viscCp: 0.89,
  pvapKpa: 3.17,
  flowValue: 40,
  flowUnit: "m3h",
  diamValue: nps4?.idMm ?? 102.3,
  diamUnit: "mm",
  lengthValue: 180,
  lengthUnit: "m",
  elevValue: 8,
  elevUnit: "m",
  roughId: "cs",
  roughMm: 0.046,
  p1: 6,
  p2: 4,
  pUnit: "bar",
  service: "process",
  nps: "4",
  schedule: "40",
  fittings: { elbow90lr: 2, gate: 1 },
  patmBar: 1.01325,
  etaMachine: 75,
  etaMotor: 95,
  hours: 8000,
  load: 100,
  tariff: 0.08,
  currency: "USD",
  pipeCost100: 250,
  pipeExp: 1.25,
  capitalCharge: 0.2,
  sheetNote: "",
});

export const defaultGas = (): GasState => ({
  mode: "drop",
  fluidId: "ng",
  mw: 18.82,
  sg: 0.65,
  viscCp: 0.012,
  gamma: 1.27,
  z: 0.9,
  tempC: 35,
  flowValue: 25000,
  flowUnit: "nm3h",
  diamValue: nps8?.idMm ?? 202.7,
  diamUnit: "mm",
  lengthValue: 5,
  lengthUnit: "km",
  elevValue: 0,
  elevUnit: "m",
  roughId: "cs",
  roughMm: 0.046,
  p1: 25,
  p2: 18,
  pUnit: "bar",
  nps: "8",
  schedule: "40",
  fittings: {},
  patmBar: 1.01325,
  etaMachine: 75,
  etaMotor: 95,
  hours: 8000,
  load: 100,
  tariff: 0.08,
  currency: "USD",
  pipeCost100: 250,
  pipeExp: 1.25,
  capitalCharge: 0.2,
  sheetNote: "",
});

export const defaultPump = (): PumpState => ({
  mode: "system",
  density: 997,
  flowValue: 40,
  flowUnit: "m3h",
  ps: 1.2,
  pd: 5.8,
  pUnit: "bar",
  nozzleElev: 0.4,
  suctionMm: nps6?.idMm ?? 154,
  dischargeMm: nps4?.idMm ?? 102.3,
  staticLift: 8,
  frictionHead: 12,
  sourceP: 0,
  destP: 0,
  etaPump: 75,
  etaMotor: 95,
  hours: 8000,
  load: 100,
  tariff: 0.08,
  currency: "USD",
  pvapKpa: 3.17,
  npshr: 3.5,
  patmBar: 1.01325,
  sheetNote: "",
});

function loopItem(partial: Partial<LoopItem> & Pick<LoopItem, "id" | "kind" | "tag">): LoopItem {
  return {
    lengthM: 0,
    nps: "4",
    schedule: "40",
    elevM: 0,
    fittings: {},
    dpClean: 0,
    foulFactor: 1,
    valveKind: "gate",
    qty: 1,
    valveStyle: "globe",
    fl: 0.9,
    minDp: 1,
    ...partial,
  };
}

export function newLoopItem(kind: ItemKind): LoopItem {
  const tag =
    kind === "pump"
      ? "P-201"
      : kind === "control"
        ? "FV-201"
        : kind === "check"
          ? "CH-201"
          : kind === "strainer"
            ? "ST-201"
            : kind === "exchanger"
              ? "E-201"
              : kind === "meter"
                ? "FE-201"
                : kind === "orifice"
                  ? "RO-201"
                  : kind === "mixer"
                    ? "MX-201"
                    : kind === "valve"
                      ? "HV-201"
                      : "Pipe";
  return loopItem({
    id: crypto.randomUUID(),
    kind,
    tag,
    lengthM: kind === "pipe" ? 25 : 0,
    nps: kind === "pipe" ? "4" : "3",
    dpClean: kind === "exchanger" ? 0.45 : kind === "strainer" ? 0.08 : kind === "meter" || kind === "orifice" ? 0.25 : kind === "mixer" ? 0.15 : 0,
    foulFactor: kind === "strainer" ? 3 : kind === "exchanger" ? 1.6 : 1,
    valveKind: kind === "check" ? "check" : "gate",
    minDp: 1,
  });
}

export const defaultLoop = (): LoopState => ({
  name: "T-101 to C-201 feed",
  service: "Column feed",
  fluidId: "methanol",
  density: 792,
  viscCp: 0.59,
  pvapKpa: 12.9,
  pcKpa: 8090,
  tempC: 25,
  flowValue: 40,
  flowUnit: "m3h",
  pUnit: "bar",
  sourceName: "T-101",
  sourceP: 0.05,
  sourceElev: 1.5,
  destName: "C-201",
  destP: 4,
  destElev: 22,
  patmBar: 1.01325,
  roughMm: 0.046,
  pumpMode: "size",
  givenDp: 6,
  curve: "centrifugal",
  etaPump: 72,
  etaMotor: 95,
  npshr: 2.5,
  hours: 8000,
  load: 100,
  tariff: 0.08,
  currency: "USD",
  sheetNote: "",
  items: [
    loopItem({
      id: "suction",
      kind: "pipe",
      tag: "6\"-P-1401",
      lengthM: 8,
      nps: "6",
      elevM: -1.5,
      fittings: { entrance: 1, elbow90lr: 2, gate: 1 },
    }),
    loopItem({ id: "st", kind: "strainer", tag: "ST-101", nps: "6", dpClean: 0.05, foulFactor: 2 }),
    loopItem({ id: "pump", kind: "pump", tag: "P-101", nps: "4" }),
    loopItem({
      id: "to-fe",
      kind: "pipe",
      tag: "4\"-P-1402",
      lengthM: 6,
      nps: "4",
      fittings: { elbow90lr: 2, gate: 1 },
    }),
    loopItem({ id: "fe", kind: "meter", tag: "FE-201", nps: "4", dpClean: 0.25 }),
    loopItem({
      id: "rack",
      kind: "pipe",
      tag: "4\"-P-1403",
      lengthM: 45,
      nps: "4",
      elevM: 20.5,
      fittings: { elbow90lr: 6, gate: 2, ball: 1 },
    }),
    loopItem({ id: "fv", kind: "control", tag: "FV-201", nps: "4", valveStyle: "globe", fl: 0.9, minDp: 1.5 }),
    loopItem({
      id: "to-e",
      kind: "pipe",
      tag: "4\"-P-1404",
      lengthM: 12,
      nps: "4",
      elevM: 1.5,
      fittings: { elbow90lr: 3 },
    }),
    loopItem({ id: "e", kind: "exchanger", tag: "E-201", nps: "4", dpClean: 0.35, foulFactor: 1.5 }),
    loopItem({ id: "ch", kind: "check", tag: "CH-201", nps: "4" }),
    loopItem({
      id: "nozzle",
      kind: "pipe",
      tag: "4\"-P-1405",
      lengthM: 6,
      nps: "4",
      fittings: { elbow90lr: 1, exit: 1 },
    }),
  ],
});

export type SavedCase = {
  id: string;
  name: string;
  kind: "liquid" | "gas" | "pump" | "loop";
  at: number;
  summary: string;
  liquid?: LiquidState;
  gas?: GasState;
  pump?: PumpState;
  loop?: LoopState;
};

export const DRAFT_KEY = "linespec.draft.v1";
export const CASES_KEY = "linespec.cases.v1";
