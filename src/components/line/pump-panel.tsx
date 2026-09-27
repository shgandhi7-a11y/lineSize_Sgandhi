import { useMemo, useState } from "react";
import { SaveBar, VariantTable } from "./blocks";
import { Datasheet } from "./datasheet";
import { Metric, Notes, NumField } from "./fields";
import { makePumpSheet } from "./make-sheet";
import type { PumpState } from "./model";
import { musd, num, pressureUnitLabel } from "@/lib/calc/format";
import { pumpFlowVariants, solvePump, type PumpMode } from "@/lib/calc/pump";
import {
  BAR_PA,
  LIQUID_FLOW_UNITS,
  PRESSURE_UNITS,
  convertPressure,
  liquidFlowToM3s,
  m3sToLiquidFlow,
  pressureToPa,
  type PressureUnit,
} from "@/lib/calc/units";

export function PumpPanel({
  state,
  setState,
  note,
  onSave,
}: {
  state: PumpState;
  setState: (next: PumpState) => void;
  note: string;
  onSave: (name: string, summary: string) => void;
}) {
  const [name, setName] = useState("Pump duty");
  const [sheet, setSheet] = useState<ReturnType<typeof makePumpSheet> | null>(null);
  const unit = pressureUnitLabel(state.pUnit);
  const q = liquidFlowToM3s(state.flowValue, state.flowUnit, state.density);
  const result = useMemo(
    () =>
      solvePump({
        mode: state.mode,
        rho: state.density,
        flowM3s: q,
        psGaugePa: pressureToPa(state.ps, state.pUnit),
        pdGaugePa: pressureToPa(state.pd, state.pUnit),
        nozzleElevM: state.nozzleElev,
        suctionM: state.suctionMm / 1000,
        dischargeM: state.dischargeMm / 1000,
        staticLiftM: state.staticLift,
        frictionHeadM: state.frictionHead,
        sourceGaugePa: pressureToPa(state.sourceP, state.pUnit),
        destGaugePa: pressureToPa(state.destP, state.pUnit),
        etaPump: state.etaPump,
        etaMotor: state.etaMotor,
        hours: state.hours,
        load: state.load,
        tariff: state.tariff,
        pvapPa: state.pvapKpa * 1000,
        npshrM: state.npshr,
        patmPa: state.patmBar * BAR_PA,
      }),
    [state, q],
  );
  const variants = useMemo(
    () =>
      !result.ok || state.mode !== "system"
        ? []
        : pumpFlowVariants(
            {
              mode: state.mode,
              rho: state.density,
              flowM3s: q,
              psGaugePa: pressureToPa(state.ps, state.pUnit),
              pdGaugePa: pressureToPa(state.pd, state.pUnit),
              nozzleElevM: state.nozzleElev,
              suctionM: state.suctionMm / 1000,
              dischargeM: state.dischargeMm / 1000,
              staticLiftM: state.staticLift,
              frictionHeadM: state.frictionHead,
              sourceGaugePa: pressureToPa(state.sourceP, state.pUnit),
              destGaugePa: pressureToPa(state.destP, state.pUnit),
              etaPump: state.etaPump,
              etaMotor: state.etaMotor,
              hours: state.hours,
              load: state.load,
              tariff: state.tariff,
              pvapPa: state.pvapKpa * 1000,
              npshrM: state.npshr,
              patmPa: state.patmBar * BAR_PA,
            },
            [0.6, 0.8, 1, 1.2, 1.4],
          ),
    [state, q, result.ok],
  );

  function patch(p: Partial<PumpState>) {
    setState({ ...state, ...p });
  }

  function setPressureUnit(next: string) {
    const unitNext = next as PressureUnit;
    patch({
      pUnit: unitNext,
      sourceP: convertPressure(state.sourceP, state.pUnit, unitNext),
      destP: convertPressure(state.destP, state.pUnit, unitNext),
      ps: convertPressure(state.ps, state.pUnit, unitNext),
      pd: convertPressure(state.pd, state.pUnit, unitNext),
    });
  }

  const summary = result.ok
    ? `${num(result.tdhM)} m head · ${num(result.electricW / 1000)} kW · OpEx ${musd(result.annualCost)}/yr`
    : result.message;

  function openSheet() {
    if (!result.ok) return;
    setSheet(
      makePumpSheet({
        name,
        state,
        result,
        flowM3s: q,
        variants:
          variants.length > 0
            ? {
                headers: ["Flow", "Head m", "kW", "OpEx"],
                rows: variants.map((v) => [
                  num(m3sToLiquidFlow(v.flowM3s, state.flowUnit, state.density)),
                  num(v.tdhM),
                  num(v.electricW / 1000),
                  `${musd(v.annualCost)}/yr`,
                ]),
              }
            : null,
      }),
    );
  }

  const npshBad = result.ok && result.npshMarginM < 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="sticky top-12 z-10 -mx-4 bg-bg px-4 py-2">
        <section className="rounded-lg border border-line border-l-4 border-l-accent bg-surface p-4">
          {result.ok ? (
            <>
              <p className="text-xs font-medium tracking-wide text-muted uppercase">Total head</p>
              <p className="mt-1 font-mono text-4xl font-semibold text-accent tabular-nums">
                {num(result.tdhM)}
                <span className="ml-2 text-lg text-ink">m</span>
              </p>
              <p className="mt-1 text-sm text-muted">
                {num(result.electricW / 1000)} kW electrical · OpEx {musd(result.annualCost)}/yr
              </p>
            </>
          ) : (
            <p className="text-sm text-danger">{result.message}</p>
          )}
        </section>
      </div>

      <div className="grid grid-cols-2 gap-1 rounded-md bg-inset p-1">
        {(
          [
            ["system", "From heads"],
            ["nozzle", "From gauges"],
          ] as [PumpMode, string][]
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={state.mode === id}
            className={"min-h-11 rounded-sm text-sm font-medium " + (state.mode === id ? "bg-accent text-accent-ink" : "text-muted")}
            onClick={() => patch({ mode: id })}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted">
        {state.mode === "system"
          ? "Static lift, friction head and tank pressures. Friction head scales with flow squared in the variants."
          : "Suction and discharge gauge pressures at the nozzles, plus the elevation between those nozzles."}
      </p>
      {note ? <p className="rounded-md bg-ok-bg px-3 py-2 text-sm text-ok">{note}</p> : null}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <NumField
          label="Flow"
          value={state.flowValue}
          onChange={(flowValue) => patch({ flowValue })}
          options={LIQUID_FLOW_UNITS.map((u) => ({ id: u.id, label: u.label }))}
          option={state.flowUnit}
          onOption={(next) => {
            const shown = m3sToLiquidFlow(q, next as PumpState["flowUnit"], state.density);
            patch({ flowUnit: next as PumpState["flowUnit"], flowValue: Number.isFinite(shown) ? shown : state.flowValue });
          }}
        />
        <NumField label="Density" value={state.density} onChange={(density) => patch({ density })} suffix="kg/m³" />
        {state.mode === "system" ? (
          <>
            <NumField label="Static lift" value={state.staticLift} onChange={(staticLift) => patch({ staticLift })} suffix="m" />
            <NumField label="Friction head" value={state.frictionHead} onChange={(frictionHead) => patch({ frictionHead })} suffix="m" />
            <NumField
              label="Source tank, gauge"
              value={state.sourceP}
              onChange={(sourceP) => patch({ sourceP })}
              options={PRESSURE_UNITS.map((u) => ({ id: u.id, label: u.label }))}
              option={state.pUnit}
              onOption={setPressureUnit}
            />
            <NumField label="Destination tank, gauge" value={state.destP} onChange={(destP) => patch({ destP })} suffix={unit} />
          </>
        ) : (
          <>
            <NumField
              label="Suction gauge"
              value={state.ps}
              onChange={(ps) => patch({ ps })}
              options={PRESSURE_UNITS.map((u) => ({ id: u.id, label: u.label }))}
              option={state.pUnit}
              onOption={setPressureUnit}
            />
            <NumField label="Discharge gauge" value={state.pd} onChange={(pd) => patch({ pd })} suffix={unit} />
            <NumField
              label="Discharge nozzle above suction"
              value={state.nozzleElev}
              onChange={(nozzleElev) => patch({ nozzleElev })}
              suffix="m"
            />
            <NumField label="Suction bore" value={state.suctionMm} onChange={(suctionMm) => patch({ suctionMm })} suffix="mm" />
            <NumField label="Discharge bore" value={state.dischargeMm} onChange={(dischargeMm) => patch({ dischargeMm })} suffix="mm" />
          </>
        )}
        <NumField label="Pump efficiency" value={state.etaPump} onChange={(etaPump) => patch({ etaPump })} suffix="%" />
        <NumField label="Motor efficiency" value={state.etaMotor} onChange={(etaMotor) => patch({ etaMotor })} suffix="%" />
        <NumField label="Hours per year" value={state.hours} onChange={(hours) => patch({ hours })} suffix="h" />
        <NumField label="Duty factor" value={state.load} onChange={(load) => patch({ load })} suffix="%" />
        <NumField label="Tariff" value={state.tariff} onChange={(tariff) => patch({ tariff })} suffix="USD/kWh" />
      </div>

      {result.ok ? (
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
          <Metric label="Static head" value={`${num(result.staticM)} m`} />
          <Metric label="Pressure head" value={`${num(result.pressureM)} m`} />
          <Metric label="Friction head" value={`${num(result.frictionM)} m`} />
          <Metric label="Velocity head" value={`${num(result.velocityM, 3)} m`} />
          <Metric label="Hydraulic" value={`${num(result.hydraulicW / 1000)} kW`} />
          <Metric label="Shaft" value={`${num(result.shaftW / 1000)} kW`} />
          <Metric label="Electrical" value={`${num(result.electricW / 1000)} kW`} />
          <Metric label="Annual energy" value={`${num(result.annualKwh, 0)} kWh`} />
          <Metric label="OpEx" value={`${musd(result.annualCost)}/yr`} />
          <Metric label="Specific energy" value={`${num(result.specificKwhM3, 3)} kWh/m³`} />
        </dl>
      ) : null}
      {result.ok && result.message ? <Notes items={[result.message]} /> : null}

      <div className={"rounded-lg border p-4 " + (npshBad ? "border-danger bg-danger-bg" : "border-line bg-surface")}>
        <p className="text-xs font-medium tracking-wide text-muted uppercase">NPSH and vapour pressure</p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {state.mode === "system" ? (
            <NumField label="Suction gauge" value={state.ps} onChange={(ps) => patch({ ps })} suffix={unit} />
          ) : null}
          <NumField label="Vapour pressure" value={state.pvapKpa} onChange={(pvapKpa) => patch({ pvapKpa })} suffix="kPa abs" />
          <NumField label="NPSHr" value={state.npshr} onChange={(npshr) => patch({ npshr })} suffix="m" />
          <NumField label="Atmosphere" value={state.patmBar} onChange={(patmBar) => patch({ patmBar })} suffix="bar abs" />
        </div>
        {result.ok ? (
          <p className={"mt-3 font-mono text-lg tabular-nums " + (npshBad ? "text-danger" : "text-ink")}>
            NPSHa {num(result.npshaM)} m · margin {num(result.npshMarginM)} m
          </p>
        ) : null}
        <p className="mt-2 text-xs text-muted">
          NPSHa = (Psuction absolute − vapour pressure) / ρg + suction velocity head. Gauge is at the nozzle centerline.
        </p>
      </div>

      {variants.length > 0 && result.ok ? (
        <VariantTable
          title="Head and energy variants"
          note="Static and tank head stay put. Friction head follows flow squared. OpEx is electricity only, in MUSD per year."
          headers={["Flow", "Head m", "kW", "OpEx"]}
          rows={variants.map((v) => ({
            key: String(v.factor),
            active: v.factor === 1,
            cells: [
              num(m3sToLiquidFlow(v.flowM3s, state.flowUnit, state.density)),
              num(v.tdhM),
              num(v.electricW / 1000),
              `${musd(v.annualCost)}/yr`,
            ],
          }))}
        />
      ) : null}

      <button
        type="button"
        className="h-11 rounded-md bg-accent text-sm font-medium text-accent-ink disabled:opacity-50"
        disabled={!result.ok}
        onClick={openSheet}
      >
        Export PDF
      </button>
      <SaveBar name={name} onName={setName} onSave={() => onSave(name.trim() || "Pump case", summary)} />
      {sheet ? <Datasheet model={sheet} onClose={() => setSheet(null)} onUserNote={(sheetNote) => patch({ sheetNote })} /> : null}
      <p className="text-xs text-muted">
        Hydraulic power is ρgQH. Shaft power divides by pump efficiency, electrical power by motor efficiency. OpEx is hours × duty × the USD tariff. CapEx is not priced on this tab.
      </p>
    </div>
  );
}
