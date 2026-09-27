import { useMemo, useState } from "react";
import { FittingsBlock, PipeRow, RoughRow, SaveBar, VariantTable } from "./blocks";
import { Datasheet } from "./datasheet";
import { CorrectButton } from "./correct-button";
import { DesignCost } from "./design-cost";
import { asWall, correctLiquid, liquidCandidates, liquidLimits, threeDesigns } from "@/lib/calc/criteria";
import { OptimumCard } from "./economics";
import { Metric, ModeBar, Notes, NumField, Sel } from "./fields";
import { PressureChart } from "./chart";
import { makeLiquidSheet } from "./make-sheet";
import type { LiquidState } from "./model";
import { LIQUID_FLUIDS, sumK, type RoughnessId } from "@/lib/calc/fluids";
import { evalLiquidAt, liquidWarnings, SERVICE_BANDS, solveLiquid, type SolveMode } from "@/lib/calc/liquid";
import { num, musd, pressureUnitLabel } from "@/lib/calc/format";
import { pipeSize, recommendBores, scheduleLabel, type ScheduleId } from "@/lib/calc/pipes";
import {
  annualSplit,
  electricPumpW,
  optimizeDiameter,
  sinnottCarbonSteelM,
} from "@/lib/calc/optimum";
import {
  convertDiam,
  convertLength,
  convertPressure,
  diamToM,
  DIAM_UNITS,
  LENGTH_UNITS,
  lengthToM,
  LIQUID_FLOW_UNITS,
  liquidFlowToM3s,
  m3sToLiquidFlow,
  mToDiam,
  paToPressure,
  PRESSURE_UNITS,
  pressureToPa,
  type DiamUnit,
  type LengthUnit,
  type LiquidFlowUnit,
  type PressureUnit,
} from "@/lib/calc/units";

const HINT: Record<SolveMode, string> = {
  drop: "Flow, bore and length are known. Pressure drop is the result.",
  diameter: "Flow, length and the two pressures are known. Bore is the result.",
  flow: "Bore, length and the two pressures are known. Flow is the result.",
  length: "Flow, bore and the two pressures are known. Length is the result.",
};

export function LiquidPanel({
  state,
  setState,
  onSave,
  onUsePump,
}: {
  state: LiquidState;
  setState: (next: LiquidState | ((s: LiquidState) => LiquidState)) => void;
  onSave: (name: string, summary: string) => void;
  onUsePump: (headFrictionM: number, elevM: number, density: number, flowM3s: number, pvapKpa: number) => void;
}) {
  const [name, setName] = useState("Water line");
  const [sheet, setSheet] = useState<ReturnType<typeof makeLiquidSheet> | null>(null);
  const [optNote, setOptNote] = useState("Sets the bore to the cheapest NPS that stays inside the velocity band and under the pressure-drop limit.");
  const k = sumK(state.fittings);
  const result = useMemo(() => {
    return solveLiquid({
      mode: state.mode,
      rho: state.density,
      mu: state.viscCp * 0.001,
      flowM3s: liquidFlowToM3s(state.flowValue, state.flowUnit, state.density),
      diameterM: diamToM(state.diamValue, state.diamUnit),
      lengthM: lengthToM(state.lengthValue, state.lengthUnit),
      elevM: lengthToM(state.elevValue, state.elevUnit),
      roughnessM: state.roughMm / 1000,
      kMinor: k,
      p1GaugePa: pressureToPa(state.p1, state.pUnit),
      p2GaugePa: pressureToPa(state.p2, state.pUnit),
    });
  }, [state, k]);

  const unit = pressureUnitLabel(state.pUnit);
  const warnings = result.ok ? liquidWarnings(result, state.service) : [];
  const long = result.ok && result.lengthM >= 2000;
  const chart =
    result.ok
      ? result.profile.map((pt) => ({
          x: long ? pt.xM / 1000 : pt.xM,
          p: paToPressure(pt.pGaugePa, state.pUnit),
        }))
      : [];

  const variants = useMemo(() => {
    if (!result.ok) return [];
    return [0.6, 0.8, 1, 1.2, 1.4].map((factor) => {
      const ev = evalLiquidAt({
        rho: state.density,
        mu: state.viscCp * 0.001,
        flowM3s: result.flowM3s * factor,
        diameterM: result.diameterM,
        lengthM: result.lengthM,
        elevM: lengthToM(state.elevValue, state.elevUnit),
        roughnessM: state.roughMm / 1000,
        kMinor: k,
        p1GaugePa: pressureToPa(state.p1, state.pUnit),
      });
      return { factor, ev };
    });
  }, [result, state, k]);

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
      rho: state.density,
      mu: state.viscCp * 0.001,
      flowM3s: result.flowM3s,
      lengthM: result.lengthM,
      elevM: lengthToM(state.elevValue, state.elevUnit),
      roughnessM: state.roughMm / 1000,
      kMinor: k,
      p1GaugePa: pressureToPa(state.p1, state.pUnit),
    };
    const powerAt = (diameterM: number) => {
      const ev = evalLiquidAt({ ...common, diameterM });
      if (!ev.ok) return null;
      const watts = electricPumpW(state.density, result.flowM3s, ev.headTotalM, state.etaMachine, state.etaMotor);
      return Number.isFinite(watts) ? watts : null;
    };
    const currentW = powerAt(result.diameterM) ?? 0;
    const opt = optimizeDiameter(result.lengthM, econ, powerAt);
    const atOpt = opt ? evalLiquidAt({ ...common, diameterM: opt.diameterM }) : null;
    return {
      currentW,
      opt,
      velocity: atOpt?.ok ? atOpt.velocity : null,
      sinnottM: sinnottCarbonSteelM(result.flowM3s * state.density, state.density),
    };
  }, [result, state, k, econ]);

  const limits = liquidLimits(state.fluidId, state.service);
  const alts = threeDesigns(
    liquidCandidates({
      rho: state.density,
      mu: state.viscCp * 0.001,
      flowM3s: liquidFlowToM3s(state.flowValue, state.flowUnit, state.density),
      lengthM: lengthToM(state.lengthValue, state.lengthUnit),
      roughM: state.roughMm / 1000,
      kMinor: k,
      vMin: limits.vMin,
      vMax: limits.vMax,
      dpMaxBarPerKm: limits.dp,
      schedule: asWall(state.schedule),
      econ,
    }),
  );
  const currentSplit = result.ok && sized ? annualSplit(sized.currentW, result.diameterM, result.lengthM, econ) : null;

  function patch(p: Partial<LiquidState>) {
    setState((s) => ({ ...s, ...p }));
  }

  function pickPipe(nps: string, schedule: ScheduleId) {
    const size = pipeSize(nps, schedule);
    if (!size) return;
    setState((s) => ({
      ...s,
      nps,
      schedule,
      diamValue: mToDiam(size.idMm / 1000, s.diamUnit),
    }));
  }

  function correctDesign() {
    const limits = liquidLimits(state.fluidId, state.service);
    const flowM3s = liquidFlowToM3s(state.flowValue, state.flowUnit, state.density);
    const pick = correctLiquid({
      rho: state.density,
      mu: state.viscCp * 0.001,
      flowM3s,
      lengthM: lengthToM(state.lengthValue, state.lengthUnit),
      roughM: state.roughMm / 1000,
      kMinor: k,
      vMin: limits.vMin,
      vMax: limits.vMax,
      dpMaxBarPerKm: limits.dp,
      schedule: asWall(state.schedule),
      econ,
    });
    setOptNote(pick.note);
    if (!pick.ok) return;
    pickPipe(pick.nps, pick.schedule);
    patch({ mode: "drop" });
  }

  function openSheet() {
    if (!result.ok || !sized) return;
    setSheet(
      makeLiquidSheet({
        name,
        state,
        result,
        k,
        pumpW: sized.currentW,
        optimum: sized.opt,
        sinnottMm: Number.isFinite(sized.sinnottM) ? sized.sinnottM * 1000 : null,
        warnings,
        alts,
        variants: {
          headers: ["Flow", "ΔP", "Outlet", "m/s"],
          rows: variants.map((v) =>
            v.ev.ok
              ? [
                  num(m3sToLiquidFlow(v.ev.flowM3s, state.flowUnit, state.density)),
                  num(paToPressure(v.ev.dpTotalPa, state.pUnit)),
                  num(paToPressure(v.ev.p2GaugePa, state.pUnit)),
                  num(v.ev.velocity),
                ]
              : ["—", "—", "—", "—"],
          ),
        },
      }),
    );
  }

  const summary = result.ok
    ? `${num(paToPressure(result.dpTotalPa, state.pUnit), 2)} ${unit} drop · ${num(result.velocity)} m/s · ${num(result.headTotalM)} m head`
    : result.message;

  return (
    <div className="flex flex-col gap-4">
      <div className="sticky top-12 z-10 -mx-4 bg-bg px-4 py-2">
        <section className="rounded-lg border border-line border-l-4 border-l-accent bg-surface p-4">
          {result.ok ? (
            <>
              <p className="text-xs font-medium tracking-wide text-muted uppercase">
                {state.mode === "diameter"
                  ? "Required bore"
                  : state.mode === "flow"
                    ? "Capacity"
                    : state.mode === "length"
                      ? "Length"
                      : "Pressure drop"}
              </p>
              <p className="mt-1 font-mono text-4xl font-semibold text-accent tabular-nums">
                {state.mode === "diameter"
                  ? num(result.diameterM * 1000, 1)
                  : state.mode === "flow"
                    ? num(m3sToLiquidFlow(result.flowM3s, state.flowUnit, state.density))
                    : state.mode === "length"
                      ? num(result.lengthM)
                      : num(paToPressure(result.dpTotalPa, state.pUnit))}
                <span className="ml-2 text-lg text-ink">
                  {state.mode === "diameter"
                    ? "mm"
                    : state.mode === "flow"
                      ? LIQUID_FLOW_UNITS.find((u) => u.id === state.flowUnit)?.label
                      : state.mode === "length"
                        ? "m"
                        : unit}
                </span>
              </p>
              <p className="mt-1 text-sm text-muted">
                Outlet {num(paToPressure(result.p2GaugePa, state.pUnit))} {unit} · pump{" "}
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
          label="Fluid"
          value={state.fluidId}
          onChange={(id) => {
            const fluid = LIQUID_FLUIDS.find((f) => f.id === id);
            if (!fluid) return;
            patch({ fluidId: id, density: fluid.density, viscCp: fluid.viscCp, pvapKpa: fluid.pvapKpa });
            setName(fluid.label);
          }}
          options={LIQUID_FLUIDS.map((f) => ({ id: f.id, label: f.label }))}
        />
        <Sel
          label="Velocity band"
          value={state.service}
          onChange={(service) => patch({ service })}
          options={SERVICE_BANDS.map((s) => ({ id: s.id, label: `${s.label} ${s.min}–${s.max} m/s` }))}
        />
        <NumField
          label="Flow"
          value={state.flowValue}
          onChange={(flowValue) => patch({ flowValue })}
          options={LIQUID_FLOW_UNITS}
          option={state.flowUnit}
          onOption={(id) => {
            const flowUnit = id as LiquidFlowUnit;
            const q = liquidFlowToM3s(state.flowValue, state.flowUnit, state.density);
            const flowValue = m3sToLiquidFlow(q, flowUnit, state.density);
            patch({ flowUnit, flowValue: Number.isFinite(flowValue) ? flowValue : state.flowValue });
          }}
        />
        <NumField label="Density" value={state.density} onChange={(density) => patch({ density, fluidId: "customL" })} suffix="kg/m³" />
        <NumField label="Viscosity" value={state.viscCp} onChange={(viscCp) => patch({ viscCp, fluidId: "customL" })} suffix="cP" />
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
          label="Inlet pressure"
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
          <NumField label="Outlet pressure" value={state.p2} onChange={(p2) => patch({ p2 })} suffix={unit} />
        ) : null}
      </div>

      {state.mode !== "diameter" ? (
        <>
          <PipeRow nps={state.nps} schedule={state.schedule} onPick={pickPipe} />
          <p className="text-xs text-muted">
            Picking a schedule writes the ASME B36.10M bore into the diameter. Positive elevation is uphill, outlet above inlet.
          </p>
        </>
      ) : (
        <p className="text-xs text-muted">Positive elevation is uphill, outlet above inlet. Bore below is the minimum inside diameter.</p>
      )}

      {result.ok ? (
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
          <Metric label="Velocity" value={`${num(result.velocity)} m/s`} />
          <Metric label="Reynolds" value={result.re >= 10000 ? result.re.toExponential(2) : num(result.re, 0)} />
          <Metric label="Friction f" value={result.friction.toFixed(4)} />
          <Metric label="Regime" value={result.regime} />
          <Metric label="Friction head" value={`${num(result.headFrictionM + result.headMinorM)} m`} />
          <Metric label="Static head" value={`${num(result.headStaticM)} m`} />
          <Metric label="Minor ΔP" value={`${num(paToPressure(result.dpMinorPa, state.pUnit))} ${unit}`} />
          <Metric label="Mass flow" value={`${num(result.flowM3s * state.density * 3600)} kg/h`} />
          <Metric label="Velocity head" value={`${num(result.velocity ** 2 / (2 * 9.80665), 3)} m`} />
        </dl>
      ) : null}

      <Notes items={warnings} />

      {result.ok && sized ? (
        <OptimumCard
          driver="pump"
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
          hint={
            result.headTotalM > 0 && result.headStaticM > 0.45 * result.headTotalM
              ? "Elevation is most of the head. A larger bore only cuts friction, so the cheapest pipe stays near this size."
              : undefined
          }
          optimumVelocity={sized.velocity}
          edge={sized.opt?.edge ?? null}
          sinnottMm={sized.sinnottM * 1000}
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

      {bores.length > 0 ? (
        <div className="rounded-lg border border-line bg-surface p-3">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">Next standard bores</p>
          <ul className="mt-2 flex flex-col gap-2">
            {bores.map((pipe) => {
              const ev = evalLiquidAt({
                rho: state.density,
                mu: state.viscCp * 0.001,
                flowM3s: result.flowM3s,
                diameterM: pipe.idMm / 1000,
                lengthM: result.lengthM,
                elevM: lengthToM(state.elevValue, state.elevUnit),
                roughnessM: state.roughMm / 1000,
                kMinor: k,
                p1GaugePa: pressureToPa(state.p1, state.pUnit),
              });
              return (
                <li key={`${pipe.nps}-${pipe.schedule}`} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink">
                      NPS {pipe.nps} · {scheduleLabel(pipe.nps, pipe.schedule)}
                    </p>
                    <p className="text-xs text-muted">
                      ID {num(pipe.idMm, 2)} mm
                      {ev.ok
                        ? ` · ${num(paToPressure(ev.dpTotalPa, state.pUnit))} ${unit} · ${num(ev.velocity)} m/s`
                        : ""}
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
          note="Same bore, length and elevation. Flow from 60% to 140% of this case."
          headers={["Flow", "ΔP", "Outlet", "m/s"]}
          rows={variants.map((v) => ({
            key: String(v.factor),
            active: v.factor === 1,
            cells: v.ev.ok
              ? [
                  num(m3sToLiquidFlow(v.ev.flowM3s, state.flowUnit, state.density)),
                  num(paToPressure(v.ev.dpTotalPa, state.pUnit)),
                  num(paToPressure(v.ev.p2GaugePa, state.pUnit)),
                  num(v.ev.velocity),
                ]
              : ["—", "—", "—", "—"],
          }))}
        />
      ) : null}

      <RoughRow roughId={state.roughId} onChange={(roughId: RoughnessId, roughMm) => patch({ roughId, roughMm })} />
      <FittingsBlock counts={state.fittings} onChange={(fittings) => patch({ fittings })} />

      <div className="flex flex-col gap-2">
        <button
          type="button"
          className="h-11 rounded-md bg-accent text-sm font-medium text-accent-ink disabled:opacity-50"
          disabled={!result.ok || !sized}
          onClick={openSheet}
        >
          Export PDF
        </button>
        <button
          type="button"
          className="h-11 rounded-md border border-accent text-sm font-medium text-accent"
          disabled={!result.ok}
          onClick={() => {
            if (!result.ok) return;
            onUsePump(
              result.headFrictionM + result.headMinorM,
              result.headStaticM,
              state.density,
              result.flowM3s,
              state.pvapKpa,
            );
          }}
        >
          Send head to pump
        </button>
        <SaveBar
          name={name}
          onName={setName}
          onSave={() => onSave(name.trim() || "Liquid case", summary)}
        />
      </div>
      {sheet ? (
        <Datasheet model={sheet} onClose={() => setSheet(null)} onUserNote={(sheetNote) => patch({ sheetNote })} />
      ) : null}

      <p className="text-xs text-muted">
        Darcy–Weisbach with the Churchill friction factor. Pump kW is ρgQH for the whole line, including elevation.
        The economic bore minimises pipe capital charge plus electricity. Library properties are reference values.
      </p>
    </div>
  );
}
