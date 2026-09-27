import { useMemo, useState } from "react";
import { FittingsBlock, PipeRow, RoughRow, SaveBar, VariantTable } from "./blocks";
import { Datasheet } from "./datasheet";
import { CorrectButton } from "./correct-button";
import { DesignCost } from "./design-cost";
import { asWall, correctGas, gasCandidates, gasVelocityCap, threeDesigns } from "@/lib/calc/criteria";
import { OptimumCard } from "./economics";
import { Metric, ModeBar, Notes, NumField, Sel } from "./fields";
import { PressureChart } from "./chart";
import { makeGasSheet } from "./make-sheet";
import type { GasState } from "./model";
import { GAS_FLUIDS, sumK, type RoughnessId } from "@/lib/calc/fluids";
import { evalGasAt, gasWarnings, solveGas } from "@/lib/calc/gas";
import { annualSplit, electricCompressorW, optimizeDiameter } from "@/lib/calc/optimum";
import type { SolveMode } from "@/lib/calc/liquid";
import { musd, num, pressureUnitLabel } from "@/lib/calc/format";
import { pipeSize, recommendBores, scheduleLabel, type ScheduleId } from "@/lib/calc/pipes";
import {
  BAR_PA,
  convertDiam,
  convertLength,
  convertPressure,
  diamToM,
  DIAM_UNITS,
  GAS_FLOW_UNITS,
  gasFlowToKgS,
  kgSToGasFlow,
  LENGTH_UNITS,
  lengthToM,
  mToDiam,
  papayZ,
  paToPressure,
  PRESSURE_UNITS,
  pressureToPa,
  type DiamUnit,
  type GasFlowUnit,
  type LengthUnit,
  type PressureUnit,
} from "@/lib/calc/units";

const HINT: Record<SolveMode, string> = {
  drop: "Flow, bore, length and inlet pressure. Outlet pressure is the result.",
  diameter: "Flow, length and both pressures. Minimum bore is the result.",
  flow: "Bore, length and both pressures. Capacity is the result.",
  length: "Flow, bore and both pressures. Reach is the result.",
};

export function GasPanel({
  state,
  setState,
  onSave,
}: {
  state: GasState;
  setState: (next: GasState | ((s: GasState) => GasState)) => void;
  onSave: (name: string, summary: string) => void;
}) {
  const [name, setName] = useState("Natural gas line");
  const [sheet, setSheet] = useState<ReturnType<typeof makeGasSheet> | null>(null);
  const [optNote, setOptNote] = useState("Sets the bore to the cheapest NPS under the gas velocity cap, the erosional screen, Mach 0.6, and 40% inlet pressure drop.");
  const k = sumK(state.fittings);
  const tK = state.tempC + 273.15;
  const p1Abs = pressureToPa(state.p1, state.pUnit) + state.patmBar * BAR_PA;
  const p2Abs = pressureToPa(state.p2, state.pUnit) + state.patmBar * BAR_PA;

  const result = useMemo(() => {
    return solveGas({
      mode: state.mode,
      mw: state.mw,
      mu: state.viscCp * 0.001,
      z: state.z,
      tK,
      gamma: state.gamma,
      massKgS: gasFlowToKgS(state.flowValue, state.flowUnit, state.mw, tK, state.z, p1Abs),
      diameterM: diamToM(state.diamValue, state.diamUnit),
      lengthM: lengthToM(state.lengthValue, state.lengthUnit),
      elevM: lengthToM(state.elevValue, state.elevUnit),
      roughnessM: state.roughMm / 1000,
      kMinor: k,
      p1AbsPa: p1Abs,
      p2AbsPa: p2Abs,
    });
  }, [state, k, tK, p1Abs, p2Abs]);

  const unit = pressureUnitLabel(state.pUnit);
  const warnings = result.ok ? gasWarnings(result) : [];
  const long = result.lengthM >= 2000;
  const chart = result.profile
    .filter((pt) => pt.pAbsPa > 0 || pt.xM === 0)
    .map((pt) => ({
      x: long ? pt.xM / 1000 : pt.xM,
      p: paToPressure(pt.pAbsPa - state.patmBar * BAR_PA, state.pUnit),
    }));

  const variants = useMemo(() => {
    if (!result.ok) return [];
    return [0.6, 0.8, 1, 1.2, 1.4].map((factor) => {
      const ev = evalGasAt({
        mw: state.mw,
        mu: state.viscCp * 0.001,
        z: state.z,
        tK,
        gamma: state.gamma,
        massKgS: result.massKgS * factor,
        diameterM: result.diameterM,
        lengthM: result.lengthM,
        elevM: lengthToM(state.elevValue, state.elevUnit),
        roughnessM: state.roughMm / 1000,
        kMinor: k,
        p1AbsPa: p1Abs,
      });
      return { factor, ev };
    });
  }, [result, state, k, tK, p1Abs]);

  const bores = result.ok && state.mode === "diameter" ? recommendBores(result.diameterM * 1000) : [];

  const econ = {
    etaMachine: state.etaMachine,
    etaMotor: state.etaMotor,
    hours: state.hours,
    load: state.load,
    tariff: state.tariff,
    pipeCost100: state.pipeCost100,
    pipeExp: state.pipeExp,
    capitalCharge: state.capitalCharge,
  };

  const sized = useMemo(() => {
    if (!result.ok) return null;
    const common = {
      mw: state.mw,
      mu: state.viscCp * 0.001,
      z: state.z,
      tK,
      gamma: state.gamma,
      massKgS: result.massKgS,
      lengthM: result.lengthM,
      elevM: lengthToM(state.elevValue, state.elevUnit),
      roughnessM: state.roughMm / 1000,
      kMinor: k,
      p1AbsPa: p1Abs,
    };
    const powerAt = (diameterM: number) => {
      const ev = evalGasAt({ ...common, diameterM });
      if (!ev.ok || !(ev.p2AbsPa > 0)) return null;
      const comp = electricCompressorW({
        massKgS: result.massKgS,
        z: state.z,
        gamma: state.gamma,
        mw: state.mw,
        tK,
        pSuctionPa: ev.p2AbsPa,
        pDischargePa: p1Abs,
        etaIsentropicPct: state.etaMachine,
        etaDriverPct: state.etaMotor,
      });
      return comp.ok ? comp.powerW : null;
    };
    const current = electricCompressorW({
      massKgS: result.massKgS,
      z: state.z,
      gamma: state.gamma,
      mw: state.mw,
      tK,
      pSuctionPa: result.p2AbsPa,
      pDischargePa: p1Abs,
      etaIsentropicPct: state.etaMachine,
      etaDriverPct: state.etaMotor,
    });
    const opt = optimizeDiameter(result.lengthM, econ, powerAt);
    const atOpt = opt ? evalGasAt({ ...common, diameterM: opt.diameterM }) : null;
    return {
      currentW: current.ok ? current.powerW : 0,
      ratio: current.ratio,
      opt,
      velocity: atOpt?.ok ? atOpt.vOut : null,
    };
  }, [result, state, k, tK, p1Abs, econ]);

  const gasMass = gasFlowToKgS(state.flowValue, state.flowUnit, state.mw, tK, state.z, p1Abs);
  const alts = threeDesigns(
    gasCandidates({
      mu: state.viscCp * 0.001,
      lengthM: lengthToM(state.lengthValue, state.lengthUnit),
      roughM: state.roughMm / 1000,
      kMinor: k,
      mw: state.mw,
      z: state.z,
      gamma: state.gamma,
      tK,
      p1AbsPa: p1Abs,
      massKgS: gasMass,
      vMax: gasVelocityCap(state.fluidId),
      schedule: asWall(state.schedule),
      econ,
    }),
  );
  const currentSplit = result.ok && sized ? annualSplit(sized.currentW, result.diameterM, result.lengthM, econ) : null;

  function patch(p: Partial<GasState>) {
    setState((s) => ({ ...s, ...p }));
  }

  function pickPipe(nps: string, schedule: ScheduleId) {
    const size = pipeSize(nps, schedule);
    if (!size) return;
    setState((s) => ({ ...s, nps, schedule, diamValue: mToDiam(size.idMm / 1000, s.diamUnit) }));
  }

  function correctDesign() {
    const massKgS = gasFlowToKgS(state.flowValue, state.flowUnit, state.mw, tK, state.z, p1Abs);
    const pick = correctGas({
      mu: state.viscCp * 0.001,
      lengthM: lengthToM(state.lengthValue, state.lengthUnit),
      roughM: state.roughMm / 1000,
      kMinor: k,
      mw: state.mw,
      z: state.z,
      gamma: state.gamma,
      tK,
      p1AbsPa: p1Abs,
      massKgS,
      vMax: gasVelocityCap(state.fluidId),
      schedule: asWall(state.schedule),
      econ,
    });
    setOptNote(pick.note);
    if (!pick.ok) return;
    pickPipe(pick.nps, pick.schedule);
    patch({ mode: "drop" });
  }

  function flowText(kgs: number): string {
    const shown = kgSToGasFlow(kgs, state.flowUnit, state.mw, tK, state.z, p1Abs);
    return num(shown);
  }

  function openSheet() {
    if (!result.ok || !sized) return;
    setSheet(
      makeGasSheet({
        name,
        state,
        result,
        k,
        elevM: lengthToM(state.elevValue, state.elevUnit),
        compressorW: sized.currentW,
        ratio: sized.ratio,
        optimum: sized.opt,
        warnings,
        alts,
        variants: {
          headers: ["Flow", "P2", "ΔP", "m/s"],
          rows: variants.map((v) =>
            v.ev.ok
              ? [
                  flowText(v.ev.massKgS),
                  num(gauge(v.ev.p2AbsPa)),
                  num(paToPressure(v.ev.dpPa, state.pUnit)),
                  num(v.ev.vOut),
                ]
              : [flowText(result.massKgS * v.factor), "vacuum", "—", "—"],
          ),
        },
      }),
    );
  }

  const gauge = (abs: number) => paToPressure(abs - state.patmBar * BAR_PA, state.pUnit);
  const summary = result.ok
    ? `P2 ${num(gauge(result.p2AbsPa))} ${unit} · ${num(result.vOut)} m/s out · Mach ${num(result.machOut, 2)}`
    : result.message;

  return (
    <div className="flex flex-col gap-4">
      <div className="sticky top-12 z-10 -mx-4 bg-bg px-4 py-2">
        <section className="rounded-lg border border-line border-l-4 border-l-accent bg-surface p-4">
          {result.ok ? (
            <>
              <p className="text-xs font-medium tracking-wide text-muted uppercase">
                {state.mode === "drop"
                  ? "Outlet pressure"
                  : state.mode === "diameter"
                    ? "Required bore"
                    : state.mode === "flow"
                      ? "Capacity"
                      : "Length"}
              </p>
              <p className="mt-1 font-mono text-4xl font-semibold text-accent tabular-nums">
                {state.mode === "drop"
                  ? num(gauge(result.p2AbsPa))
                  : state.mode === "diameter"
                    ? num(result.diameterM * 1000, 1)
                    : state.mode === "flow"
                      ? flowText(result.massKgS)
                      : num(result.lengthM)}
                <span className="ml-2 text-lg text-ink">
                  {state.mode === "drop"
                    ? unit
                    : state.mode === "diameter"
                      ? "mm"
                      : state.mode === "flow"
                        ? GAS_FLOW_UNITS.find((u) => u.id === state.flowUnit)?.label
                        : "m"}
                </span>
              </p>
              <p className="mt-1 text-sm text-muted">
                Drop {num(paToPressure(result.dpPa, state.pUnit))} {unit} · compressor{" "}
                {sized ? num(sized.currentW / 1000) : "—"} kW
                {sized?.opt ? ` · optimum ${num(sized.opt.diameterM * 1000, 0)} mm` : ""}
              </p>
            </>
          ) : (
            <p className="text-sm text-danger">{result.message}</p>
          )}
        </section>
      </div>

      <DesignCost
        currentCapex={currentSplit?.pipeCapex ?? null}
        currentOpex={currentSplit?.energyAnnual ?? null}
        currentLabel={result.ok ? `This design · NPS ${state.nps}` : "Enter a case that solves."}
        alts={alts}
        onUse={(alt) => {
          pickPipe(alt.nps, alt.schedule);
          patch({ mode: "drop" });
        }}
      />

      <CorrectButton note={optNote} onClick={correctDesign} />

      <button
        type="button"
        className="h-11 rounded-md bg-accent text-sm font-medium text-accent-ink disabled:opacity-50"
        disabled={!result.ok || !sized}
        onClick={openSheet}
      >
        Export PDF
      </button>

      <ModeBar value={state.mode} onChange={(mode) => patch({ mode })} hint={HINT[state.mode]} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Sel
          label="Gas"
          value={state.fluidId}
          onChange={(id) => {
            const fluid = GAS_FLUIDS.find((f) => f.id === id);
            if (!fluid) return;
            patch({
              fluidId: id,
              mw: fluid.mw,
              sg: fluid.sg,
              viscCp: fluid.viscCp,
              gamma: fluid.gamma,
              z: fluid.z,
            });
            setName(fluid.label);
          }}
          options={GAS_FLUIDS.map((f) => ({ id: f.id, label: f.label }))}
        />
        <NumField label="Temperature" value={state.tempC} onChange={(tempC) => patch({ tempC })} suffix="°C" />
        <NumField
          label="Flow"
          value={state.flowValue}
          onChange={(flowValue) => patch({ flowValue })}
          options={GAS_FLOW_UNITS}
          option={state.flowUnit}
          onOption={(id) => {
            const flowUnit = id as GasFlowUnit;
            const kgs = gasFlowToKgS(state.flowValue, state.flowUnit, state.mw, tK, state.z, p1Abs);
            const flowValue = kgSToGasFlow(kgs, flowUnit, state.mw, tK, state.z, p1Abs);
            patch({ flowUnit, flowValue: Number.isFinite(flowValue) ? flowValue : state.flowValue });
          }}
        />
        <NumField label="Molecular weight" value={state.mw} onChange={(mw) => patch({ mw, fluidId: "customG" })} suffix="g/mol" />
        <NumField label="Compressibility Z" value={state.z} onChange={(z) => patch({ z })} suffix="—" />
        <NumField label="Viscosity" value={state.viscCp} onChange={(viscCp) => patch({ viscCp, fluidId: "customG" })} suffix="cP" />
        <NumField label="Ratio k = Cp/Cv" value={state.gamma} onChange={(gamma) => patch({ gamma })} suffix="—" />
        <NumField label="Specific gravity" value={state.sg} onChange={(sg) => patch({ sg })} suffix="air = 1" />
        {state.mode !== "diameter" ? (
          <NumField
            label="Inside diameter"
            value={state.diamValue}
            onChange={(diamValue) => patch({ diamValue })}
            options={DIAM_UNITS}
            option={state.diamUnit}
            onOption={(id) => {
              const diamUnit = id as DiamUnit;
              patch({ diamUnit, diamValue: convertDiam(state.diamValue, state.diamUnit, diamUnit) });
            }}
          />
        ) : null}
        {state.mode !== "length" ? (
          <NumField
            label="Length"
            value={state.lengthValue}
            onChange={(lengthValue) => patch({ lengthValue })}
            options={LENGTH_UNITS}
            option={state.lengthUnit}
            onOption={(id) => {
              const lengthUnit = id as LengthUnit;
              patch({ lengthUnit, lengthValue: convertLength(state.lengthValue, state.lengthUnit, lengthUnit) });
            }}
          />
        ) : null}
        <NumField
          label="Elevation rise"
          value={state.elevValue}
          onChange={(elevValue) => patch({ elevValue })}
          options={LENGTH_UNITS}
          option={state.elevUnit}
          onOption={(id) => {
            const elevUnit = id as LengthUnit;
            patch({ elevUnit, elevValue: convertLength(state.elevValue, state.elevUnit, elevUnit) });
          }}
        />
        <NumField
          label="Inlet pressure, gauge"
          value={state.p1}
          onChange={(p1) => patch({ p1 })}
          options={PRESSURE_UNITS}
          option={state.pUnit}
          onOption={(id) => {
            const pUnit = id as PressureUnit;
            patch({
              pUnit,
              p1: convertPressure(state.p1, state.pUnit, pUnit),
              p2: convertPressure(state.p2, state.pUnit, pUnit),
            });
          }}
        />
        {state.mode !== "drop" ? (
          <NumField label="Outlet pressure, gauge" value={state.p2} onChange={(p2) => patch({ p2 })} suffix={unit} />
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="h-11 rounded-md border border-line bg-surface px-3 text-sm text-ink"
          onClick={() => {
            const mean = state.mode === "drop" ? p1Abs * 0.85 : (p1Abs + p2Abs) / 2;
            const z = papayZ(mean, tK, state.sg);
            if (Number.isFinite(z)) patch({ z: Math.round(z * 1000) / 1000 });
          }}
        >
          Estimate Z
        </button>
        <p className="text-xs text-muted">Papay / Standing, sweet dry gas only. Check it before you use it.</p>
      </div>

      {state.mode !== "diameter" ? <PipeRow nps={state.nps} schedule={state.schedule} onPick={pickPipe} /> : null}

      {result.ok ? (
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
          <Metric label="Inlet velocity" value={`${num(result.vIn)} m/s`} />
          <Metric label="Outlet velocity" value={`${num(result.vOut)} m/s`} />
          <Metric label="Outlet Mach" value={num(result.machOut, 3)} />
          <Metric label="Erosional" value={`${num(result.erosional)} m/s`} />
          <Metric label="Density in" value={`${num(result.rhoIn)} kg/m³`} />
          <Metric label="Density out" value={`${num(result.rhoOut)} kg/m³`} />
          <Metric label="Reynolds" value={result.re >= 10000 ? result.re.toExponential(2) : num(result.re, 0)} />
          <Metric label="Friction f" value={result.friction.toFixed(4)} />
          <Metric label="Mass flow" value={`${num(result.massKgS * 3600)} kg/h`} />
        </dl>
      ) : null}

      <Notes items={warnings} />

      {result.ok && sized ? (
        <OptimumCard
          driver="compressor"
          currency={state.currency}
          currentMm={result.diameterM * 1000}
          currentKw={sized.currentW / 1000}
          currentDetail={(() => {
            const split = annualSplit(sized.currentW, result.diameterM, result.lengthM, econ);
            return `CapEx ${musd(split.pipeCapex)} · OpEx ${musd(split.energyAnnual)}/yr`;
          })()}
          optimumMm={sized.opt ? sized.opt.diameterM * 1000 : null}
          optimumKw={sized.opt ? sized.opt.powerW / 1000 : null}
          optimumDetail={
            sized.opt
              ? `CapEx ${musd(sized.opt.annual.pipeCapex)} · OpEx ${musd(sized.opt.annual.energyAnnual)}/yr`
              : "—"
          }
          optimumVelocity={sized.velocity}
          edge={sized.opt?.edge ?? null}
          ratio={sized.ratio}
          standard={
            sized.opt
              ? recommendBores(sized.opt.diameterM * 1000).reduce<ReturnType<typeof recommendBores>[number] | null>(
                  (best, pipe) => (!best || pipe.idMm < best.idMm ? pipe : best),
                  null,
                )
              : null
          }
          onUseMm={(mm) => {
            setState((s) => ({ ...s, mode: "drop", diamValue: mToDiam(mm / 1000, s.diamUnit) }));
          }}
          onUsePipe={(nps, schedule) => {
            pickPipe(nps, schedule);
            patch({ mode: "drop" });
          }}
          econ={{ ...econ, currency: state.currency }}
          onEcon={(partial) => patch(partial)}
        />
      ) : null}

      {bores.length > 0 && result.ok ? (
        <div className="rounded-lg border border-line bg-surface p-3">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">Next standard bores</p>
          <ul className="mt-2 flex flex-col gap-2">
            {bores.map((pipe) => {
              const ev = evalGasAt({
                mw: state.mw,
                mu: state.viscCp * 0.001,
                z: state.z,
                tK,
                gamma: state.gamma,
                massKgS: result.massKgS,
                diameterM: pipe.idMm / 1000,
                lengthM: result.lengthM,
                elevM: lengthToM(state.elevValue, state.elevUnit),
                roughnessM: state.roughMm / 1000,
                kMinor: k,
                p1AbsPa: p1Abs,
              });
              return (
                <li key={`${pipe.nps}-${pipe.schedule}`} className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-ink">
                      NPS {pipe.nps} · {scheduleLabel(pipe.nps, pipe.schedule)}
                    </p>
                    <p className="text-xs text-muted">
                      ID {num(pipe.idMm, 2)} mm
                      {ev.ok ? ` · P2 ${num(gauge(ev.p2AbsPa))} ${unit} · ${num(ev.vOut)} m/s` : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="h-11 shrink-0 rounded-md border border-accent px-3 text-sm font-medium text-accent"
                    onClick={() => {
                      pickPipe(pipe.nps, pipe.schedule);
                      patch({ mode: "drop" });
                    }}
                  >
                    Use
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      <PressureChart points={chart} xLabel={long ? "km" : "m"} />

      {variants.some((v) => v.ev.ok) ? (
        <VariantTable
          title="Pressure variants"
          note="Same line. Outlet gauge pressure as flow moves from 60% to 140%."
          headers={["Flow", "P2", "ΔP", "m/s"]}
          rows={variants.map((v) => ({
            key: String(v.factor),
            active: v.factor === 1,
            cells: v.ev.ok
              ? [
                  flowText(v.ev.massKgS),
                  num(gauge(v.ev.p2AbsPa)),
                  num(paToPressure(v.ev.dpPa, state.pUnit)),
                  num(v.ev.vOut),
                ]
              : [flowText(result.massKgS * v.factor), "vacuum", "—", "—"],
          }))}
        />
      ) : null}

      <RoughRow roughId={state.roughId} onChange={(roughId: RoughnessId, roughMm) => patch({ roughId, roughMm })} />
      <FittingsBlock counts={state.fittings} onChange={(fittings) => patch({ fittings })} />
      <NumField
        label="Atmosphere"
        value={state.patmBar}
        onChange={(patmBar) => patch({ patmBar })}
        suffix="bar abs"
      />

      <SaveBar name={name} onName={setName} onSave={() => onSave(name.trim() || "Gas case", summary)} />
      <button
        type="button"
        className="h-11 rounded-md bg-accent text-sm font-medium text-accent-ink disabled:opacity-50"
        disabled={!result.ok || !sized}
        onClick={openSheet}
      >
        Export PDF
      </button>
      {sheet ? (
        <Datasheet model={sheet} onClose={() => setSheet(null)} onUserNote={(sheetNote) => patch({ sheetNote })} />
      ) : null}

      <p className="text-xs text-muted">
        Isothermal compressible Darcy–Weisbach. Compressor kW is the isentropic power to lift the outlet pressure back to the inlet. The economic bore minimises pipe capital charge plus that electricity. Nm³ is 0°C and 1.01325 bar. Erosional velocity is the API RP 14E screen with c = 100, not a project limit.
      </p>
    </div>
  );
}
