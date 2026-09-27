import type { DesignAlt } from "@/lib/calc/criteria";
import type { GasEval } from "@/lib/calc/gas";
import type { LiquidEval, SolveMode } from "@/lib/calc/liquid";
import { SERVICE_BANDS } from "@/lib/calc/liquid";
import { FITTINGS, GAS_FLUIDS, LIQUID_FLUIDS, ROUGHNESS, type FittingId } from "@/lib/calc/fluids";
import { musd, num, pressureUnitLabel } from "@/lib/calc/format";
import { ITEM_KINDS, type LoopEval } from "@/lib/calc/loop";
import { annualSplit, type Optimum } from "@/lib/calc/optimum";
import type { PumpEval } from "@/lib/calc/pump";
import { pipeSize, scheduleLabel, type ScheduleId } from "@/lib/calc/pipes";
import {
  BAR_PA,
  GAS_FLOW_UNITS,
  kgSToGasFlow,
  LENGTH_UNITS,
  LIQUID_FLOW_UNITS,
  liquidFlowToM3s,
  m3sToLiquidFlow,
  mToLength,
  paToPressure,
  specificGasConstant,
  type LengthUnit,
} from "@/lib/calc/units";
import type { GasState, LiquidState, LoopState, PumpState } from "./model";
import type { SketchInput } from "./sketch";

export type SheetRow = { k: string; v: string };
export type SheetSection = { title: string; rows: SheetRow[] };
export type SheetTable = { title: string; headers: string[]; rows: string[][] };

export type SheetModel = {
  lineName: string;
  service: string;
  fluid: string;
  date: string;
  docNo: string;
  userNote: string;
  kpis: SheetRow[];
  sections: SheetSection[];
  tables: SheetTable[];
  notes: string[];
  sketch: SketchInput;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function today(): string {
  const d = new Date();
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function labelOf(list: { id: string; label: string }[], id: string): string {
  return list.find((item) => item.id === id)?.label ?? id;
}

function sci(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const ax = Math.abs(n);
  if (ax !== 0 && (ax >= 10000 || ax < 0.01)) return n.toExponential(2);
  return num(n, 3);
}

function signed(m: number, unit: LengthUnit): string {
  const shown = mToLength(m, unit);
  const sign = shown > 0 ? "+" : "";
  return `${sign}${num(shown)} ${labelOf(LENGTH_UNITS, unit)}`;
}

function fittingBits(counts: Partial<Record<FittingId, number>>): { text: string; valves: number } {
  const parts: string[] = [];
  let valves = 0;
  for (const fit of FITTINGS) {
    const n = counts[fit.id] ?? 0;
    if (n <= 0) continue;
    parts.push(`${n} × ${fit.label}`);
    if (fit.id === "gate" || fit.id === "globe" || fit.id === "ball" || fit.id === "check" || fit.id === "butterfly") {
      valves += n;
    }
  }
  return { text: parts.join(", ") || "None", valves };
}

function selectedPipe(nps: string, schedule: ScheduleId, mode: SolveMode, idMm: number): { line: string; odMm: number | null } {
  if (mode === "diameter") return { line: "Solved minimum bore", odMm: null };
  const size = pipeSize(nps, schedule);
  if (!size) return { line: "Custom bore", odMm: null };
  const mismatch = Math.abs(size.idMm - idMm) > 0.15;
  return {
    line: `NPS ${size.nps} · ${scheduleLabel(size.nps, size.schedule)}${mismatch ? " · diameter edited" : ""}`,
    odMm: mismatch ? null : size.odMm,
  };
}

function commercialSection(
  diameterM: number,
  powerW: number,
  lengthM: number,
  state: LiquidState | GasState,
  optimum: Optimum | null,
  sinnottMm: number | null,
): SheetSection {
  const rows: SheetRow[] = [];
  const add = (label: string, d: number, w: number) => {
    const split = annualSplit(w, d, lengthM, {
      etaMachine: state.etaMachine,
      etaMotor: state.etaMotor,
      hours: state.hours,
      load: state.load,
      tariff: state.tariff,
      pipeCost100: state.pipeCost100,
      pipeExp: state.pipeExp,
      capitalCharge: state.capitalCharge,
    });
    rows.push(
      { k: `${label} CapEx, one time`, v: musd(split.pipeCapex) },
      { k: `${label} OpEx`, v: `${musd(split.energyAnnual)}/yr` },
      { k: `${label} power`, v: `${num(w / 1000)} kW` },
    );
  };
  add("Selected", diameterM, powerW);
  if (optimum) add("Economic", optimum.diameterM, optimum.powerW);
  if (sinnottMm != null && Number.isFinite(sinnottMm)) {
    rows.push({ k: "Sinnott carbon-steel screen", v: `${num(sinnottMm, 0)} mm` });
  }
  return { title: "Commercial screen", rows };
}

function flowTable(title: string, variants: { headers: string[]; rows: string[][] } | null): SheetTable[] {
  if (!variants || !variants.rows.length) return [];
  return [{ title, headers: variants.headers, rows: variants.rows }];
}

function altTable(alts: DesignAlt[] | undefined): SheetTable[] {
  if (!alts || alts.length === 0) return [];
  return [
    {
      title: "Design alternates",
      headers: ["Case", "NPS", "CapEx", "OpEx"],
      rows: alts.map((alt) => [
        alt.role,
        alt.nps,
        musd(alt.capex),
        `${musd(alt.opex)}/yr`,
        `${alt.velocity.toFixed(2)} m/s`,
        `Sch ${alt.schedule}`,
      ]),
    },
  ];
}

export function makeLiquidSheet(input: {
  name: string;
  state: LiquidState;
  result: LiquidEval;
  k: number;
  pumpW: number;
  optimum: Optimum | null;
  sinnottMm: number | null;
  warnings: string[];
  variants: { headers: string[]; rows: string[][] } | null;
  alts?: DesignAlt[];
}): SheetModel {
  const { state, result } = input;
  const unit = pressureUnitLabel(state.pUnit);
  const p = (pa: number) => `${num(paToPressure(pa, state.pUnit))} ${unit}`;
  const idMm = result.diameterM * 1000;
  const pipe = selectedPipe(state.nps, state.schedule, state.mode, idMm);
  const fits = fittingBits(state.fittings);
  const rough = ROUGHNESS.find((row) => row.id === state.roughId);
  const band = SERVICE_BANDS.find((row) => row.id === state.service) ?? SERVICE_BANDS[0];
  const fluid = LIQUID_FLUIDS.find((row) => row.id === state.fluidId)?.label ?? "Liquid";
  const flow = `${num(m3sToLiquidFlow(result.flowM3s, state.flowUnit, state.density))} ${labelOf(LIQUID_FLOW_UNITS, state.flowUnit)}`;
  const lengthLabel = `${num(mToLength(result.lengthM, state.lengthUnit))} ${labelOf(LENGTH_UNITS, state.lengthUnit)}`;
  const elevLabel = signed(result.headStaticM, state.elevUnit);
  const scene = result.lengthM >= 800 ? "line" : "plant";
  return {
    lineName: input.name.trim() || "Liquid line",
    service: "Liquid line",
    fluid,
    date: today(),
    docNo: "DS-LIQ",
    userNote: state.sheetNote,
    kpis: [
      { k: "Pressure drop", v: p(result.dpTotalPa) },
      { k: "Outlet", v: p(result.p2GaugePa) },
      { k: "Velocity", v: `${num(result.velocity)} m/s` },
      { k: "Pump", v: `${num(input.pumpW / 1000)} kW` },
    ],
    sections: [
      {
        title: "1  Process properties",
        rows: [
          { k: "Fluid", v: fluid },
          { k: "Flow", v: flow },
          { k: "Mass flow", v: `${num(result.flowM3s * state.density * 3600)} kg/h` },
          { k: "Density", v: `${num(state.density, 1)} kg/m³` },
          { k: "Viscosity", v: `${num(state.viscCp, 3)} cP` },
          { k: "Vapour pressure", v: `${num(state.pvapKpa, 2)} kPa abs` },
        ],
      },
      {
        title: "2  Line data",
        rows: [
          { k: "Pipe", v: pipe.line },
          { k: "Inside diameter", v: `${num(idMm, 2)} mm` },
          { k: "Outside diameter", v: pipe.odMm ? `${num(pipe.odMm, 1)} mm` : "—" },
          { k: "Length", v: `${lengthLabel} (${num(result.lengthM)} m)` },
          { k: "Elevation", v: `${elevLabel} (${num(result.headStaticM)} m)` },
          { k: "Inlet, gauge", v: `${num(state.p1)} ${unit}` },
          { k: "Roughness", v: `${rough?.label ?? "Custom"} · ${num(state.roughMm, 3)} mm` },
          { k: "Fittings", v: fits.text },
          { k: "Fitting loss coefficient", v: num(input.k, 2) },
          { k: "Velocity band", v: `${band.label} ${band.min}–${band.max} m/s` },
        ],
      },
      {
        title: "3  Hydraulic results",
        rows: [
          { k: "Pressure drop", v: p(result.dpTotalPa) },
          { k: "Outlet, gauge", v: p(result.p2GaugePa) },
          { k: "Velocity", v: `${num(result.velocity)} m/s` },
          { k: "Reynolds number", v: sci(result.re) },
          { k: "Darcy friction factor", v: result.friction.toFixed(4) },
          { k: "Flow regime", v: result.regime },
          { k: "Friction drop", v: p(result.dpFrictionPa) },
          { k: "Fittings drop", v: p(result.dpMinorPa) },
          { k: "Elevation drop", v: p(result.dpStaticPa) },
          { k: "Total head", v: `${num(result.headTotalM)} m` },
          { k: "Pump electric power", v: `${num(input.pumpW / 1000)} kW` },
          { k: "Pump efficiency", v: `${num(state.etaMachine, 0)}%` },
          { k: "Motor efficiency", v: `${num(state.etaMotor, 0)}%` },
          { k: "Duty", v: `${num(state.hours, 0)} h/y · ${num(state.load, 0)}% · ${num(state.tariff, 3)} USD/kWh` },
        ],
      },
      commercialSection(result.diameterM, input.pumpW, result.lengthM, state, input.optimum, input.sinnottMm),
    ],
    tables: [...altTable(input.alts), ...flowTable("4  Flow cases", input.variants)],
    notes: [
      "Darcy–Weisbach line. Friction factor is Churchill (1977). Pump power is the electric power for the whole line, including lift and fittings.",
      "Three design alternates are the tighter passing size, the lowest annual cost, and one size larger. Cost is pipe charge plus power.",
      "The sketch shows how the line sits. Vertical scale is stretched. A break in the pipe means the drawing is not to length.",
      "Sinnott bore, where shown, is the Towler and Sinnott carbon-steel liquid screen. It ignores the tariff. Not for gas, slurry or alloy pipe.",
      ...input.warnings.slice(0, 3),
      "Properties are the values entered for this case. Screening study. Not issued for construction.",
    ],
    sketch: {
      scene,
      driver: "pump",
      showDriver: input.pumpW > 50,
      broken: scene === "line" || result.lengthM >= 40,
      lengthLabel,
      elevLabel,
      boreLabel: pipe.odMm ? `${pipe.line} · ID ${num(idMm, 1)} mm` : `ID ${num(idMm, 1)} mm`,
      flowLabel: flow,
      powerLabel: `${num(input.pumpW / 1000)} kW`,
      fromTitle: scene === "line" ? "Inlet" : "Source",
      toTitle: scene === "line" ? "Delivery" : "Destination",
      fromPressure: `${num(state.p1)} ${unit}`,
      toPressure: p(result.p2GaugePa),
      elevM: result.headStaticM,
      idMm,
      odMm: pipe.odMm,
      valves: fits.valves > 0 ? 1 : 0,
      pressures: result.profile.map((pt) => paToPressure(pt.pGaugePa, state.pUnit)),
      plate: null,
    },
  };
}

export function makeGasSheet(input: {
  name: string;
  state: GasState;
  result: GasEval;
  k: number;
  elevM: number;
  compressorW: number;
  ratio: number;
  optimum: Optimum | null;
  warnings: string[];
  variants: { headers: string[]; rows: string[][] } | null;
  alts?: DesignAlt[];
}): SheetModel {
  const { state, result } = input;
  const unit = pressureUnitLabel(state.pUnit);
  const atm = state.patmBar * BAR_PA;
  const gauge = (abs: number) => `${num(paToPressure(abs - atm, state.pUnit))} ${unit}`;
  const idMm = result.diameterM * 1000;
  const pipe = selectedPipe(state.nps, state.schedule, state.mode, idMm);
  const fits = fittingBits(state.fittings);
  const rough = ROUGHNESS.find((row) => row.id === state.roughId);
  const tK = state.tempC + 273.15;
  const gasR = specificGasConstant(state.mw);
  const flow = `${num(kgSToGasFlow(result.massKgS, state.flowUnit, state.mw, tK, state.z, result.p1AbsPa))} ${labelOf(GAS_FLOW_UNITS, state.flowUnit)}`;
  const lengthLabel = `${num(mToLength(result.lengthM, state.lengthUnit))} ${labelOf(LENGTH_UNITS, state.lengthUnit)}`;
  const elevLabel = signed(input.elevM, state.elevUnit);
  const scene = result.lengthM >= 800 ? "line" : "plant";
  const ratio = input.ratio > 1 ? input.ratio : result.p2AbsPa > 0 ? result.p1AbsPa / result.p2AbsPa : 0;
  const fluid = GAS_FLUIDS.find((row) => row.id === state.fluidId)?.label ?? "Gas";
  return {
    lineName: input.name.trim() || "Gas line",
    service: "Gas line",
    fluid,
    date: today(),
    docNo: "DS-GAS",
    userNote: state.sheetNote,
    kpis: [
      { k: "Outlet", v: gauge(result.p2AbsPa) },
      { k: "Drop", v: `${num(paToPressure(result.dpPa, state.pUnit))} ${unit}` },
      { k: "Outlet velocity", v: `${num(result.vOut)} m/s` },
      { k: "Compressor", v: `${num(input.compressorW / 1000)} kW` },
    ],
    sections: [
      {
        title: "1  Process properties",
        rows: [
          { k: "Fluid", v: fluid },
          { k: "Flow", v: flow },
          { k: "Mass flow", v: `${num(result.massKgS * 3600)} kg/h` },
          { k: "Molecular weight", v: num(state.mw, 2) },
          { k: "Specific gravity", v: num(state.sg, 3) },
          { k: "Temperature", v: `${num(state.tempC, 1)} °C` },
          { k: "Compressibility Z", v: num(state.z, 3) },
          { k: "Isentropic exponent", v: num(state.gamma, 3) },
          { k: "Viscosity", v: `${num(state.viscCp, 4)} cP` },
          { k: "Specific gas constant", v: `${num(gasR, 1)} J/kg·K` },
        ],
      },
      {
        title: "2  Line data",
        rows: [
          { k: "Pipe", v: pipe.line },
          { k: "Inside diameter", v: `${num(idMm, 2)} mm` },
          { k: "Outside diameter", v: pipe.odMm ? `${num(pipe.odMm, 1)} mm` : "—" },
          { k: "Length", v: `${lengthLabel} (${num(result.lengthM)} m)` },
          { k: "Elevation", v: `${elevLabel} (${num(input.elevM)} m)` },
          { k: "Inlet, gauge", v: `${num(state.p1)} ${unit}` },
          { k: "Atmosphere", v: `${num(state.patmBar, 3)} bar abs` },
          { k: "Roughness", v: `${rough?.label ?? "Custom"} · ${num(state.roughMm, 3)} mm` },
          { k: "Fittings", v: fits.text },
          { k: "Fitting loss coefficient", v: num(input.k, 2) },
        ],
      },
      {
        title: "3  Hydraulic results",
        rows: [
          { k: "Outlet, gauge", v: gauge(result.p2AbsPa) },
          { k: "Pressure drop", v: `${num(paToPressure(result.dpPa, state.pUnit))} ${unit}` },
          { k: "Inlet density", v: `${num(result.rhoIn, 2)} kg/m³` },
          { k: "Outlet density", v: `${num(result.rhoOut, 2)} kg/m³` },
          { k: "Inlet velocity", v: `${num(result.vIn)} m/s` },
          { k: "Outlet velocity", v: `${num(result.vOut)} m/s` },
          { k: "Outlet Mach", v: num(result.machOut, 3) },
          { k: "Erosional velocity", v: `${num(result.erosional)} m/s` },
          { k: "Reynolds number", v: sci(result.re) },
          { k: "Darcy friction factor", v: result.friction.toFixed(4) },
          { k: "Flow regime", v: result.regime },
          { k: "Compressor electric power", v: `${num(input.compressorW / 1000)} kW` },
          { k: "Pressure ratio", v: ratio > 1 ? num(ratio, 3) : "1 or less" },
          { k: "Isentropic efficiency", v: `${num(state.etaMachine, 0)}%` },
          { k: "Driver efficiency", v: `${num(state.etaMotor, 0)}%` },
        ],
      },
      commercialSection(result.diameterM, input.compressorW, result.lengthM, state, input.optimum, null),
    ],
    tables: [...altTable(input.alts), ...flowTable("4  Flow cases", input.variants)],
    notes: [
      "Isothermal gas line with elevation. Kinetic energy is neglected. Not for choked flow. Compressibility is the value entered.",
      "Compressor power is the electric power to restore line outlet pressure to line inlet pressure. Suction temperature is the line temperature.",
      "Three design alternates are the tighter passing size, the lowest annual cost, and one size larger.",
      "Erosional velocity is the API RP 14E screen with c = 100.",
      "The sketch shows the station, the run, and delivery. Vertical scale is stretched. A break means the drawing is not to length.",
      ...input.warnings.slice(0, 3),
      "Screening study. Not issued for construction.",
    ],
    sketch: {
      scene,
      driver: "compressor",
      showDriver: input.compressorW > 50,
      broken: true,
      lengthLabel,
      elevLabel,
      boreLabel: pipe.odMm ? `${pipe.line} · ID ${num(idMm, 1)} mm` : `ID ${num(idMm, 1)} mm`,
      flowLabel: flow,
      powerLabel: `${num(input.compressorW / 1000)} kW`,
      fromTitle: "Inlet",
      toTitle: "Delivery",
      fromPressure: `${num(state.p1)} ${unit}`,
      toPressure: gauge(result.p2AbsPa),
      elevM: input.elevM,
      idMm,
      odMm: pipe.odMm,
      valves: fits.valves > 0 ? 1 : 0,
      pressures: result.profile.map((pt) => paToPressure(pt.pAbsPa - atm, state.pUnit)),
      plate: null,
    },
  };
}

export function makePumpSheet(input: {
  name: string;
  state: PumpState;
  result: PumpEval;
  flowM3s: number;
  variants: { headers: string[]; rows: string[][] } | null;
}): SheetModel {
  const { state, result } = input;
  const unit = pressureUnitLabel(state.pUnit);
  const flow = `${num(m3sToLiquidFlow(input.flowM3s, state.flowUnit, state.density))} ${labelOf(LIQUID_FLOW_UNITS, state.flowUnit)}`;
  const elevM = state.mode === "nozzle" ? state.nozzleElev : state.staticLift;
  const fromP = state.mode === "nozzle" ? state.ps : state.sourceP;
  const toP = state.mode === "nozzle" ? state.pd : state.destP;
  const headRows: SheetRow[] =
    state.mode === "nozzle"
      ? [
          { k: "Pressure head", v: `${num(result.pressureM)} m` },
          { k: "Nozzle elevation", v: `${num(result.staticM)} m` },
          { k: "Velocity head", v: `${num(result.velocityM, 3)} m` },
        ]
      : [
          { k: "Static lift", v: `${num(result.staticM)} m` },
          { k: "Friction head", v: `${num(result.frictionM)} m` },
          { k: "Tank pressure head", v: `${num(result.pressureM)} m` },
        ];
  const warnings = [
    result.message,
    result.npshMarginM < 0 ? `NPSHa is ${num(Math.abs(result.npshMarginM))} m below NPSHr.` : "",
  ].filter(Boolean);
  return {
    lineName: input.name.trim() || "Pump duty",
    service: state.mode === "nozzle" ? "Pump · nozzle gauges" : "Pump · system head",
    fluid: `${num(state.density, 0)} kg/m³`,
    date: today(),
    docNo: "DS-PMP",
    userNote: state.sheetNote,
    kpis: [
      { k: "Total head", v: `${num(result.tdhM)} m` },
      { k: "Electric", v: `${num(result.electricW / 1000)} kW` },
      { k: "NPSHa", v: `${num(result.npshaM)} m` },
      { k: "Annual", v: `${musd(result.annualCost)}/yr` },
    ],
    sections: [
      {
        title: "1  Duty data",
        rows: [
          { k: "Flow", v: flow },
          { k: "Density", v: `${num(state.density, 1)} kg/m³` },
          { k: "Suction inside diameter", v: `${num(state.suctionMm, 1)} mm` },
          { k: "Discharge inside diameter", v: `${num(state.dischargeMm, 1)} mm` },
          { k: state.mode === "nozzle" ? "Suction gauge" : "Source gauge", v: `${num(fromP)} ${unit}` },
          { k: state.mode === "nozzle" ? "Discharge gauge" : "Destination gauge", v: `${num(toP)} ${unit}` },
          { k: "Elevation", v: `${elevM > 0 ? "+" : ""}${num(elevM)} m` },
          { k: "Pump efficiency", v: `${num(state.etaPump, 0)}%` },
          { k: "Motor efficiency", v: `${num(state.etaMotor, 0)}%` },
          { k: "Duty", v: `${num(state.hours, 0)} h/y · ${num(state.load, 0)}% · ${num(state.tariff, 3)} USD/kWh` },
          { k: "Vapour pressure", v: `${num(state.pvapKpa, 2)} kPa abs` },
          { k: "NPSHr", v: `${num(state.npshr)} m` },
          { k: "Atmosphere", v: `${num(state.patmBar, 3)} bar abs` },
        ],
      },
      {
        title: "2  Pump results",
        rows: [
          ...headRows,
          { k: "Total dynamic head", v: `${num(result.tdhM)} m` },
          { k: "Hydraulic power", v: `${num(result.hydraulicW / 1000)} kW` },
          { k: "Shaft power", v: `${num(result.shaftW / 1000)} kW` },
          { k: "Electric power", v: `${num(result.electricW / 1000)} kW` },
          { k: "NPSHa", v: `${num(result.npshaM)} m` },
          { k: "NPSH margin", v: `${num(result.npshMarginM)} m` },
          { k: "Suction velocity", v: `${num(result.vs)} m/s` },
          { k: "Discharge velocity", v: `${num(result.vd)} m/s` },
          { k: "Specific energy", v: `${num(result.specificKwhM3, 3)} kWh/m³` },
          { k: "Annual energy", v: `${num(result.annualKwh, 0)} kWh` },
          { k: "OpEx", v: `${musd(result.annualCost)}/yr` },
        ],
      },
    ],
    tables: flowTable("3  Duty cases", input.variants),
    notes: [
      state.mode === "nozzle"
        ? "Head is from the nozzle gauges, the elevation between nozzles, and the velocity head."
        : "Head is static lift, friction head, and the tank pressures.",
      "Electric power is hydraulic power divided by pump efficiency and motor efficiency.",
      "The sketch is the pump set between suction and discharge. It is not a scale drawing.",
      ...warnings,
      "Screening study. Not issued for construction. Confirm NPSH with the pump vendor.",
    ],
    sketch: {
      scene: "pump",
      driver: "pump",
      showDriver: result.tdhM > 0,
      broken: false,
      lengthLabel: flow,
      elevLabel: `${elevM > 0 ? "+" : ""}${num(elevM)} m`,
      boreLabel: `Suction ${num(state.suctionMm, 0)} mm · discharge ${num(state.dischargeMm, 0)} mm`,
      flowLabel: flow,
      powerLabel: `${num(result.electricW / 1000)} kW`,
      fromTitle: "Suction",
      toTitle: "Discharge",
      fromPressure: `${num(fromP)} ${unit}`,
      toPressure: `${num(toP)} ${unit}`,
      elevM,
      idMm: state.dischargeMm,
      odMm: null,
      valves: 1,
      pressures: [],
      plate: [
        { k: "TDH", v: `${num(result.tdhM)} m` },
        { k: "Electric", v: `${num(result.electricW / 1000)} kW` },
        { k: "NPSHa", v: `${num(result.npshaM)} m` },
        { k: "Flow", v: flow },
      ],
    },
  };
}

export function makeLoopSheet(input: { state: LoopState; result: LoopEval; alts?: DesignAlt[] }): SheetModel {
  const { state, result } = input;
  const unit = pressureUnitLabel(state.pUnit);
  const showP = (pa: number) => `${num(paToPressure(pa, state.pUnit))} ${unit}`;
  const fluid = LIQUID_FLUIDS.find((row) => row.id === state.fluidId)?.label ?? "Liquid";
  const flow = `${num(state.flowValue)} ${labelOf(LIQUID_FLOW_UNITS, state.flowUnit)}`;
  const mass = liquidFlowToM3s(state.flowValue, state.flowUnit, state.density) * state.density * 3600;
  const kindLabel = (kind: string) => ITEM_KINDS.find((row) => row.id === kind)?.label ?? kind;
  const byId = new Map(result.items.map((row) => [row.id, row]));
  const equipment = state.items.map((item) => {
    const row = byId.get(item.id);
    const fits = item.kind === "pipe" ? fittingBits(item.fittings) : null;
    const size =
      item.kind === "pump"
        ? "Duty machine"
        : item.kind === "control"
          ? result.valve
            ? `${result.valve.style} NPS ${result.valve.nps}`
            : item.valveStyle
          : `NPS ${item.nps} ${scheduleLabel(item.nps, item.schedule)}`;
    const data =
      item.kind === "pipe"
        ? `${num(item.lengthM)} m · elev ${item.elevM > 0 ? "+" : ""}${num(item.elevM)} m · ${num(row?.velocity ?? 0)} m/s · ${fits?.text ?? "No fittings"}`
        : item.kind === "control"
          ? `Design drop ${num(item.minDp)} ${unit} · Fl ${num(item.fl, 2)}`
          : item.kind === "pump"
            ? state.pumpMode === "size"
              ? "Sized to hold destination pressure"
              : `Given differential ${num(state.givenDp)} ${unit}`
            : item.kind === "check"
              ? `Swing check · qty ${num(item.qty, 0)}`
              : item.kind === "valve"
                ? `${item.valveKind} · qty ${num(item.qty, 0)}`
                : `Clean ${num(item.dpClean)} ${unit} · fouling ×${num(item.foulFactor, 1)}`;
    return [item.tag, kindLabel(item.kind), row ? showP(row.dpPa) : "—", row ? showP(row.pOutPa) : "—", `${size}. ${data}`];
  });
  const pid = [
    { tag: state.sourceName, kind: "source", note: `${num(state.sourceP)} ${unit}` },
    ...state.items
      .filter((item) => item.kind !== "pipe")
      .map((item) => {
        const row = byId.get(item.id);
        const note =
          item.kind === "pump"
            ? showP(result.pumpDpPa)
            : item.kind === "control" && result.valve
              ? `Cv ${num(result.valve.cv, 0)}`
              : row
                ? showP(Math.abs(row.dynamicPa))
                : "";
        return { tag: item.tag, kind: item.kind, note };
      }),
    { tag: state.destName, kind: "dest", note: `${num(state.destP)} ${unit}` },
  ];
  const annualKwh = result.pumpKW * state.hours * Math.min(1.5, Math.max(0, state.load / 100));
  const valveRows: SheetRow[] = result.valve
    ? [
        { k: "Tag", v: result.valve.tag },
        { k: "Style", v: result.valve.style === "globe" ? "Globe, equal percentage" : "Segment ball, equal percentage" },
        { k: "Inlet pressure", v: showP(result.valve.p1Pa) },
        { k: "Outlet pressure", v: showP(result.valve.p2Pa) },
        { k: "Differential", v: showP(result.valve.dpPa) },
        { k: "Kv", v: num(result.valve.kv, 1) },
        { k: "Cv", v: num(result.valve.cv, 1) },
        { k: "Screened body", v: `NPS ${result.valve.nps}` },
        { k: "Full-open Cv, screen", v: num(result.valve.ratedCv, 0) },
        { k: "Design travel", v: `${num(result.valve.travel * 100, 0)}%` },
        { k: "Authority", v: num(result.valve.authority, 2) },
        { k: "Liquid pressure recovery Fl", v: num(result.valve.fl, 2) },
        { k: "Choked", v: result.valve.choked ? "Yes" : "No" },
        { k: "Specific gravity", v: num(result.valve.sg, 3) },
      ]
    : [{ k: "Control valve", v: "Not in this loop, or the drop is not positive." }];
  const pipeM = state.items.reduce((sum, item) => sum + (item.kind === "pipe" ? item.lengthM : 0), 0);
  return {
    lineName: state.name.trim() || "Hydraulic loop",
    service: state.service.trim() || "Hydraulic loop",
    fluid,
    date: today(),
    docNo: "DS-LOOP",
    userNote: state.sheetNote,
    kpis: [
      { k: "Pump differential", v: result.hasPump ? showP(result.pumpDpPa) : "No pump" },
      { k: "Control valve Cv", v: result.valve ? num(result.valve.cv, 1) : "—" },
      { k: "Valve drop", v: result.valve ? showP(result.valve.dpPa) : "—" },
      { k: "Pump electric", v: `${num(result.pumpKW)} kW` },
    ],
    sections: [
      {
        title: "1  Process properties",
        rows: [
          { k: "Fluid", v: fluid },
          { k: "Temperature", v: `${num(state.tempC, 1)} °C` },
          { k: "Flow", v: flow },
          { k: "Mass flow", v: `${num(mass, 0)} kg/h` },
          { k: "Density", v: `${num(state.density, 1)} kg/m³` },
          { k: "Viscosity", v: `${num(state.viscCp, 3)} cP` },
          { k: "Vapour pressure", v: `${num(state.pvapKpa, 2)} kPa abs` },
          { k: "Critical pressure", v: state.pcKpa > 0 ? `${num(state.pcKpa, 0)} kPa abs` : "Not set" },
          { k: "Specific gravity", v: num(state.density / 998, 3) },
          { k: "Atmosphere", v: `${num(state.patmBar, 3)} bar abs` },
        ],
      },
      {
        title: "2  Boundaries",
        rows: [
          { k: "Source", v: state.sourceName },
          { k: "Source pressure", v: `${num(state.sourceP)} ${unit} g` },
          { k: "Source elevation", v: `${num(state.sourceElev)} m` },
          { k: "Destination", v: state.destName },
          { k: "Destination pressure", v: `${num(state.destP)} ${unit} g` },
          { k: "Destination elevation", v: `${num(state.destElev)} m` },
          { k: "Sum of item rises", v: `${num(state.items.reduce((sum, item) => sum + item.elevM, 0))} m` },
          { k: "Pipe roughness", v: `${num(state.roughMm, 3)} mm` },
          { k: "Static drop, fouled design", v: showP(result.staticPa) },
          { k: "Dynamic drop, fouled design", v: showP(result.dynamicPa) },
        ],
      },
      {
        title: "3  Pump data",
        rows: [
          { k: "Tag", v: state.items.find((item) => item.kind === "pump")?.tag ?? "None" },
          { k: "Basis", v: !result.hasPump ? "No pump in the loop" : state.pumpMode === "size" ? "Sized on fouled design flow" : "Given differential" },
          { k: "Head curve", v: state.curve === "flat" ? "Flat" : "Centrifugal screen, shutoff about 12% above design" },
          { k: "Differential", v: result.hasPump ? showP(result.pumpDpPa) : "—" },
          { k: "Head", v: result.hasPump ? `${num(result.pumpHeadM)} m` : "—" },
          { k: "Hydraulic power", v: `${num(result.hydraulicKW)} kW` },
          { k: "Electric power", v: `${num(result.pumpKW)} kW` },
          { k: "Pump efficiency", v: `${num(state.etaPump, 0)}%` },
          { k: "Motor efficiency", v: `${num(state.etaMotor, 0)}%` },
          { k: "NPSHa, fouled suction", v: result.hasPump ? `${num(result.npshaM)} m` : "—" },
          { k: "NPSHr", v: `${num(state.npshr)} m` },
          { k: "NPSH margin", v: result.hasPump ? `${num(result.npshMarginM)} m` : "—" },
          { k: "Annual energy", v: `${num(annualKwh, 0)} kWh · OpEx ${musd(annualKwh * state.tariff)}/yr` },
        ],
      },
      { title: "4  Control valve", rows: valveRows },
    ],
    tables: [
      ...altTable(input.alts),
      {
        title: "5  Equipment and line items",
        headers: ["Tag", "Item", "ΔP", "P out", "Data"],
        rows: equipment,
      },
      {
        title: "6  Operating cases",
        headers: ["Case", "Valve drop", "Pump kW", "Holds dest."],
        rows: result.cases.map((row) => [
          row.name,
          showP(row.valveDpPa),
          num(row.pumpKW),
          row.delivers ? "Yes" : "No",
          `Pump differential ${showP(row.pumpDpPa)}`,
          row.kvNeed > 0 ? `Kv ${num(row.kvNeed, 1)}` : "Kv not sized",
        ]),
      },
    ],
    notes: [
      "Pump, when sized, holds the destination pressure with fouled equipment and the control-valve drop entered on the valve.",
      "Three design alternates resize every pipe run. Cost is pipe charge plus pump electricity on that bore.",
      "Control-valve Cv is a liquid screen with piping factor 1. Body size places the design point near 70% travel on an equal-percentage valve with rangeability 50. Full-open Cv values are typical, not a catalog.",
      "Clean and fouled cases keep the same pump differential. A centrifugal curve is a screen: design head at rated flow, about 12% higher at shutoff.",
      "The sketch is a P&ID of the loop, not a scale plot plan. Pipe runs are the line between the symbols.",
      ...result.warnings.slice(0, 4),
      "Screening study. Not issued for construction.",
    ],
    sketch: {
      scene: "pid",
      driver: "pump",
      showDriver: result.pumpKW > 0.05,
      broken: false,
      lengthLabel: `${num(pipeM, 0)} m of pipe`,
      elevLabel: `${num(state.destElev - state.sourceElev)} m nozzles`,
      boreLabel: result.valve ? `FV NPS ${result.valve.nps} · Cv ${num(result.valve.cv, 1)}` : "No control valve",
      flowLabel: flow,
      powerLabel: `${num(result.pumpKW)} kW`,
      fromTitle: state.sourceName,
      toTitle: state.destName,
      fromPressure: `${num(state.sourceP)} ${unit}`,
      toPressure: `${num(state.destP)} ${unit}`,
      elevM: state.destElev - state.sourceElev,
      idMm: 0,
      odMm: null,
      valves: result.valve ? 1 : 0,
      pressures: [],
      plate: null,
      pid,
    },
  };
}

export function sheetPlainText(model: SheetModel): string {
  const notes = [...model.notes];
  if (model.userNote.trim()) notes.push(model.userNote.trim());
  return [
    "Pipesize App V0",
    "By Shital H Gandhi",
    "Hydraulic data sheet",
    model.lineName,
    `${model.service} · ${model.fluid} · ${model.docNo} · Rev A · ${model.date}`,
    "",
    ...model.kpis.map((row) => `${row.k}: ${row.v}`),
    "",
    ...model.sections.flatMap((section) => [section.title, ...section.rows.map((row) => `${row.k}: ${row.v}`), ""]),
    ...model.tables.flatMap((table) => [table.title, table.headers.join(" | "), ...table.rows.map((row) => row.join(" | ")), ""]),
    "Notes",
    ...notes.map((line, index) => `${index + 1}. ${line}`),
  ].join("\n");
}
