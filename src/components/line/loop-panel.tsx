import { useMemo, useState } from "react";
import { FittingsBlock, SaveBar } from "./blocks";
import { Datasheet } from "./datasheet";
import { CorrectButton } from "./correct-button";
import { DesignCost } from "./design-cost";
import { NumField, Sel } from "./fields";
import { makeLoopSheet } from "./make-sheet";
import { newLoopItem, type LoopItem, type LoopState } from "./model";
import { PidSketch } from "./pid-sketch";
import { FITTINGS, LIQUID_FLUIDS, sumK, type FittingId } from "@/lib/calc/fluids";
import { asWall, correctLiquid, liquidCandidates, loopLimits, threeDesigns } from "@/lib/calc/criteria";
import { annualSplit } from "@/lib/calc/optimum";
import { num, pressureUnitLabel } from "@/lib/calc/format";
import { evalLoop, ITEM_KINDS, type ItemKind, type LoopItemSi, type LoopRequest } from "@/lib/calc/loop";
import { NPS_OPTIONS, pipeSize, schedulesFor, type ScheduleId } from "@/lib/calc/pipes";
import {
  LIQUID_FLOW_UNITS,
  PRESSURE_UNITS,
  liquidFlowToM3s,
  m3sToLiquidFlow,
  paToPressure,
  pressureToPa,
  type LiquidFlowUnit,
  type PressureUnit,
} from "@/lib/calc/units";

const PC_KPA: Record<string, number> = {
  water25: 22064,
  water40: 22064,
  seawater: 23000,
  methanol: 8090,
  benzene: 4890,
  meg: 8200,
  vcm: 5590,
  gasoline: 4100,
  naphtha: 3800,
};

const VALVE_KINDS = [
  { id: "gate", label: "Gate" },
  { id: "globe", label: "Globe" },
  { id: "ball", label: "Ball" },
  { id: "butterfly", label: "Butterfly" },
  { id: "plug", label: "Plug" },
];

function toRequest(state: LoopState): LoopRequest {
  const p = (value: number) => pressureToPa(value, state.pUnit);
  const items: LoopItemSi[] = state.items.map((item) => ({
    id: item.id,
    kind: item.kind,
    tag: item.tag,
    lengthM: item.lengthM,
    nps: item.nps,
    schedule: item.schedule,
    elevM: item.elevM,
    fittings: item.fittings,
    dpCleanPa: p(item.dpClean),
    foulFactor: item.foulFactor,
    valveKind: item.valveKind,
    qty: item.qty,
    valveStyle: item.valveStyle,
    fl: item.fl,
    minDpPa: p(item.minDp),
  }));
  return {
    rho: state.density,
    mu: state.viscCp * 0.001,
    pvapPa: state.pvapKpa * 1000,
    pcPa: state.pcKpa * 1000,
    flowM3s: liquidFlowToM3s(state.flowValue, state.flowUnit, state.density),
    patmPa: state.patmBar * 1e5,
    roughM: state.roughMm / 1000,
    sourcePPa: p(state.sourceP),
    destPPa: p(state.destP),
    sourceElevM: state.sourceElev,
    destElevM: state.destElev,
    pumpMode: state.pumpMode,
    givenDpPa: p(state.givenDp),
    curve: state.curve,
    etaPumpPct: state.etaPump,
    etaMotorPct: state.etaMotor,
    npshrM: state.npshr,
    items,
  };
}

export function LoopPanel({
  state,
  setState,
  onSave,
}: {
  state: LoopState;
  setState: (next: LoopState) => void;
  onSave: (name: string, summary: string) => void;
}) {
  const [sheet, setSheet] = useState<ReturnType<typeof makeLoopSheet> | null>(null);
  const [hint, setHint] = useState("");
  const [optNote, setOptNote] = useState("Sets every pipe run to the cheapest NPS inside 1–3 m/s and under the pressure-drop limit.");
  const result = useMemo(() => evalLoop(toRequest(state)), [state]);
  const unit = pressureUnitLabel(state.pUnit);
  const patch = (partial: Partial<LoopState>) => setState({ ...state, ...partial });
  const show = (pa: number) => `${num(paToPressure(pa, state.pUnit))} ${unit}`;
  const loopEcon = {
    etaMachine: state.etaPump,
    etaMotor: state.etaMotor,
    hours: state.hours,
    load: state.load,
    tariff: state.tariff,
    pipeCost100: 250,
    pipeExp: 1.25,
    capitalCharge: 0.2,
  };
  const loopAlts = useMemo(() => {
    const pipes = state.items.filter((item) => item.kind === "pipe");
    if (pipes.length === 0) return [];
    const limits = loopLimits(state.fluidId);
    const flowM3s = liquidFlowToM3s(state.flowValue, state.flowUnit, state.density);
    const lengthM = Math.max(
      pipes.reduce((sum, item) => sum + item.lengthM, 0),
      1,
    );
    const screen = threeDesigns(
      liquidCandidates({
        rho: state.density,
        mu: state.viscCp * 0.001,
        flowM3s,
        lengthM,
        roughM: state.roughMm / 1000,
        kMinor: pipes.reduce((sum, item) => sum + sumK(item.fittings), 0),
        vMin: limits.vMin,
        vMax: limits.vMax,
        dpMaxBarPerKm: limits.dp,
        schedule: asWall(pipes[0]?.schedule ?? "40"),
        econ: loopEcon,
      }),
    );
    return screen.map((alt) => {
      const items = state.items.map((item) => (item.kind === "pipe" ? { ...item, nps: alt.nps, schedule: alt.schedule } : item));
      const marched = evalLoop(toRequest({ ...state, items }));
      let capex = alt.capex;
      let opex = alt.opex;
      let velocity = alt.velocity;
      if (marched.ok) {
        const duty = Math.min(1.5, Math.max(0, state.load / 100));
        opex = marched.pumpKW * state.hours * duty * state.tariff;
        capex = 0;
        for (const item of items) {
          if (item.kind !== "pipe") continue;
          const size = pipeSize(item.nps, item.schedule);
          if (!size) continue;
          capex += annualSplit(0, size.idMm / 1000, item.lengthM, loopEcon).pipeCapex;
        }
        const speeds = marched.items.filter((row) => row.kind === "pipe").map((row) => row.velocity);
        if (speeds.length) velocity = Math.max(...speeds);
      }
      return { ...alt, capex, opex, annual: opex, velocity };
    });
  }, [state]);
  const currentMoney = useMemo(() => {
    if (!result.ok) return null;
    const duty = Math.min(1.5, Math.max(0, state.load / 100));
    const opex = result.pumpKW * state.hours * duty * state.tariff;
    let capex = 0;
    for (const item of state.items) {
      if (item.kind !== "pipe") continue;
      const size = pipeSize(item.nps, item.schedule);
      if (!size) continue;
      capex += annualSplit(0, size.idMm / 1000, item.lengthM, loopEcon).pipeCapex;
    }
    return { capex, opex };
  }, [result, state]);

  function correctDesign() {
    const pipes = state.items.filter((item) => item.kind === "pipe");
    if (pipes.length === 0) {
      setOptNote("Add a pipe run first.");
      return;
    }
    const limits = loopLimits(state.fluidId);
    const flowM3s = liquidFlowToM3s(state.flowValue, state.flowUnit, state.density);
    const econ = {
      etaMachine: state.etaPump,
      etaMotor: state.etaMotor,
      hours: state.hours,
      load: state.load,
      tariff: state.tariff,
      pipeCost100: 250,
      pipeExp: 1.25,
      capitalCharge: 0.2,
    };
    const notes: string[] = [];
    const items = state.items.map((item) => {
      if (item.kind !== "pipe") return item;
      const pick = correctLiquid({
        rho: state.density,
        mu: state.viscCp * 0.001,
        flowM3s,
        lengthM: Math.max(item.lengthM, 1),
        roughM: state.roughMm / 1000,
        kMinor: sumK(item.fittings),
        vMin: limits.vMin,
        vMax: limits.vMax,
        dpMaxBarPerKm: limits.dp,
        schedule: asWall(item.schedule),
        econ,
      });
      if (!pick.ok) {
        notes.push(`${item.tag}: no passing size`);
        return item;
      }
      notes.push(`${item.tag} NPS ${pick.nps}`);
      return { ...item, nps: pick.nps, schedule: pick.schedule };
    });
    setOptNote(notes.join(" · "));
    patch({ items });
  }

  function setItem(id: string, partial: Partial<LoopItem>) {
    if (partial.kind === "pump" && state.items.some((item) => item.kind === "pump" && item.id !== id)) {
      setHint("This loop already has a pump.");
      return;
    }
    if (partial.kind === "control" && state.items.some((item) => item.kind === "control" && item.id !== id)) {
      setHint("This loop already has a control valve.");
      return;
    }
    setHint("");
    patch({ items: state.items.map((item) => (item.id === id ? { ...item, ...partial } : item)) });
  }

  function add(kind: ItemKind) {
    if (kind === "pump" && state.items.some((item) => item.kind === "pump")) {
      setHint("This loop already has a pump.");
      return;
    }
    if (kind === "control" && state.items.some((item) => item.kind === "control")) {
      setHint("This loop already has a control valve.");
      return;
    }
    setHint("");
    patch({ items: [...state.items, newLoopItem(kind)] });
  }

  function move(id: string, dir: -1 | 1) {
    const index = state.items.findIndex((item) => item.id === id);
    const next = index + dir;
    if (index < 0 || next < 0 || next >= state.items.length) return;
    const items = state.items.slice();
    const [row] = items.splice(index, 1);
    items.splice(next, 0, row);
    patch({ items });
  }

  function onUnit(next: PressureUnit) {
    const conv = (value: number) => paToPressure(pressureToPa(value, state.pUnit), next);
    patch({
      pUnit: next,
      sourceP: conv(state.sourceP),
      destP: conv(state.destP),
      givenDp: conv(state.givenDp),
      items: state.items.map((item) => ({ ...item, dpClean: conv(item.dpClean), minDp: conv(item.minDp) })),
    });
  }

  const nodes = [
    { tag: state.sourceName || "Source", kind: "source", note: `${num(state.sourceP)} ${unit}` },
    ...state.items
      .filter((item) => item.kind !== "pipe")
      .map((item) => {
        const row = result.items.find((entry) => entry.id === item.id);
        const note =
          item.kind === "pump"
            ? result.ok
              ? show(result.pumpDpPa)
              : ""
            : item.kind === "control" && result.valve
              ? `Cv ${num(result.valve.cv, 0)}`
              : row
                ? show(Math.abs(row.dynamicPa))
                : "";
        return { tag: item.tag || item.kind, kind: item.kind, note };
      }),
    { tag: state.destName || "Destination", kind: "dest", note: `${num(state.destP)} ${unit}` },
  ];

  const summary = result.ok
    ? `${result.hasPump ? show(result.pumpDpPa) : "No pump"} · Cv ${result.valve ? num(result.valve.cv, 1) : "—"} · ${num(result.pumpKW)} kW`
    : result.message;

  return (
    <div className="flex flex-col gap-4">
      <div className="sticky top-12 z-10 -mx-4 bg-bg px-4 py-2">
        <section className="rounded-lg border border-line border-l-4 border-l-accent bg-surface p-4">
          {result.ok ? (
            <>
              <p className="text-xs font-medium tracking-wide text-muted uppercase">Pump differential</p>
              <p className="mt-1 font-mono text-4xl font-semibold text-accent tabular-nums">
                {result.hasPump ? num(paToPressure(result.pumpDpPa, state.pUnit)) : "—"}
                <span className="ml-2 text-lg text-ink">{result.hasPump ? unit : ""}</span>
              </p>
              <p className="mt-1 text-sm text-muted">
                {result.valve
                  ? `${result.valve.tag} Cv ${num(result.valve.cv, 1)} · Kv ${num(result.valve.kv, 1)} · drop ${show(result.valve.dpPa)} · NPS ${result.valve.nps}`
                  : "No positive control-valve drop"}
                {" · "}
                {num(result.pumpKW)} kW · head {num(result.pumpHeadM)} m
              </p>
            </>
          ) : (
            <p className="text-sm text-danger">{result.message}</p>
          )}
        </section>
      </div>

      <DesignCost
        currentCapex={currentMoney?.capex ?? null}
        currentOpex={currentMoney?.opex ?? null}
        currentLabel="This loop. Use sets every pipe run."
        alts={loopAlts}
        onUse={(alt) => {
          patch({
            items: state.items.map((item) => (item.kind === "pipe" ? { ...item, nps: alt.nps, schedule: alt.schedule } : item)),
          });
        }}
      />

      <CorrectButton note={optNote} onClick={correctDesign} />

      <button
        type="button"
        className="h-11 rounded-md bg-accent text-sm font-medium text-accent-ink disabled:opacity-50"
        disabled={!result.ok}
        onClick={() => result.ok && setSheet(makeLoopSheet({ state, result, alts: loopAlts }))}
      >
        Export PDF
      </button>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="min-w-0 sm:col-span-2">
          <span className="mb-1 block text-xs font-medium text-muted">Line</span>
          <input
            className="h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-accent"
            value={state.name}
            onChange={(event) => patch({ name: event.target.value })}
          />
        </label>
        <label className="min-w-0">
          <span className="mb-1 block text-xs font-medium text-muted">Service</span>
          <input
            className="h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-accent"
            value={state.service}
            onChange={(event) => patch({ service: event.target.value })}
          />
        </label>
        <Sel
          label="Fluid"
          value={state.fluidId}
          onChange={(id) => {
            const fluid = LIQUID_FLUIDS.find((row) => row.id === id);
            if (!fluid) return;
            patch({
              fluidId: id,
              density: fluid.density,
              viscCp: fluid.viscCp,
              pvapKpa: fluid.pvapKpa,
              pcKpa: PC_KPA[id] ?? state.pcKpa,
            });
          }}
          options={LIQUID_FLUIDS.map((fluid) => ({ id: fluid.id, label: fluid.label }))}
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
            patch({ flowUnit, flowValue: m3sToLiquidFlow(q, flowUnit, state.density) });
          }}
        />
        <NumField label="Temperature" value={state.tempC} onChange={(tempC) => patch({ tempC })} suffix="°C" />
        <NumField label="Atmosphere" value={state.patmBar} onChange={(patmBar) => patch({ patmBar })} suffix="bar abs" />
      </div>
      <p className="text-xs text-muted">Atmosphere is absolute. Line pressures below are gauge, in the unit you pick.</p>
      <div className="grid grid-cols-2 gap-1 rounded-md bg-inset p-1">
        {PRESSURE_UNITS.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={state.pUnit === option.id}
            className={"min-h-11 rounded-sm text-sm font-medium " + (state.pUnit === option.id ? "bg-accent text-accent-ink" : "text-muted")}
            onClick={() => onUnit(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <NumField label="Density" value={state.density} onChange={(density) => patch({ density, fluidId: "customL" })} suffix="kg/m³" />
        <NumField label="Viscosity" value={state.viscCp} onChange={(viscCp) => patch({ viscCp, fluidId: "customL" })} suffix="cP" />
        <NumField label="Vapour pressure" value={state.pvapKpa} onChange={(pvapKpa) => patch({ pvapKpa, fluidId: "customL" })} suffix="kPa abs" />
        <NumField label="Critical pressure" value={state.pcKpa} onChange={(pcKpa) => patch({ pcKpa })} suffix="kPa abs" />
        <NumField label="Roughness" value={state.roughMm} onChange={(roughMm) => patch({ roughMm })} suffix="mm" />
      </div>

      <section className="rounded-lg border border-line bg-surface p-3">
        <h2 className="text-sm font-medium text-ink">Ends</h2>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <TextField label="Source" value={state.sourceName} onChange={(sourceName) => patch({ sourceName })} />
          <TextField label="Destination" value={state.destName} onChange={(destName) => patch({ destName })} />
          <NumField label="Source pressure" value={state.sourceP} onChange={(sourceP) => patch({ sourceP })} suffix={`${unit} g`} />
          <NumField label="Destination pressure" value={state.destP} onChange={(destP) => patch({ destP })} suffix={`${unit} g`} />
          <NumField label="Source elevation" value={state.sourceElev} onChange={(sourceElev) => patch({ sourceElev })} suffix="m" />
          <NumField label="Destination elevation" value={state.destElev} onChange={(destElev) => patch({ destElev })} suffix="m" />
        </div>
      </section>

      <section className="rounded-lg border border-line bg-surface p-3">
        <h2 className="text-sm font-medium text-ink">Pump basis</h2>
        <div className="mt-3 grid grid-cols-2 gap-1 rounded-md bg-inset p-1">
          {(
            [
              ["size", "Size the pump"],
              ["given", "Given head"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={state.pumpMode === id}
              className={"min-h-11 rounded-sm text-sm font-medium " + (state.pumpMode === id ? "bg-accent text-accent-ink" : "text-muted")}
              onClick={() => patch({ pumpMode: id })}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">
          Size uses fouled equipment and the control-valve drop you enter. Given head keeps that differential and the valve takes what is left.
        </p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {state.pumpMode === "given" ? (
            <NumField label="Pump differential" value={state.givenDp} onChange={(givenDp) => patch({ givenDp })} suffix={unit} />
          ) : null}
          <Sel
            label="Head curve"
            value={state.curve}
            onChange={(id) => patch({ curve: id as LoopState["curve"] })}
            options={[
              { id: "centrifugal", label: "Centrifugal screen" },
              { id: "flat", label: "Flat head" },
            ]}
          />
          <NumField label="Pump efficiency" value={state.etaPump} onChange={(etaPump) => patch({ etaPump })} suffix="%" />
          <NumField label="Motor efficiency" value={state.etaMotor} onChange={(etaMotor) => patch({ etaMotor })} suffix="%" />
          <NumField label="NPSHr" value={state.npshr} onChange={(npshr) => patch({ npshr })} suffix="m" />
          <NumField label="Running hours" value={state.hours} onChange={(hours) => patch({ hours })} suffix="h/y" />
          <NumField label="Tariff" value={state.tariff} onChange={(tariff) => patch({ tariff })} suffix="USD/kWh" />
        </div>
        {result.ok && result.hasPump ? (
          <p className={"mt-3 font-mono text-sm " + (result.npshMarginM < 0 ? "text-danger" : "text-ink")}>
            NPSHa {num(result.npshaM)} m · margin {num(result.npshMarginM)} m · {num(result.pumpKW * state.hours * (state.load / 100), 0)} kWh/y
          </p>
        ) : null}
      </section>

      <section className="overflow-hidden rounded-lg border border-line bg-surface">
        <div className="border-b border-line px-3 py-2">
          <h2 className="text-sm font-medium text-ink">P&ID loop</h2>
          <p className="text-xs text-muted">Symbols follow the equipment order. Pipe runs are the line between them.</p>
        </div>
        <PidSketch nodes={nodes} />
      </section>

      <div className="flex flex-col gap-3">
        {state.items.map((item, index) => {
          const row = result.items.find((entry) => entry.id === item.id);
          return (
            <ItemEditor
              key={item.id}
              item={item}
              index={index}
              count={state.items.length}
              unit={unit}
              dp={row ? show(row.dpPa) : "—"}
              velocity={row && row.velocity > 0 ? `${num(row.velocity)} m/s` : ""}
              outlet={row ? show(row.pOutPa) : ""}
              onChange={(partial) => setItem(item.id, partial)}
              onMove={(dir) => move(item.id, dir)}
              onRemove={() => patch({ items: state.items.filter((entry) => entry.id !== item.id) })}
            />
          );
        })}
      </div>

      <div>
        <p className="text-xs font-medium text-muted">Add to the loop</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {ITEM_KINDS.map((kind) => (
            <button
              key={kind.id}
              type="button"
              className="h-11 rounded-md border border-line bg-surface px-3 text-sm text-ink"
              onClick={() => add(kind.id)}
            >
              {kind.label}
            </button>
          ))}
        </div>
        {hint ? <p className="mt-2 text-xs text-danger">{hint}</p> : null}
      </div>

      {result.ok ? (
        <section className="rounded-lg border border-line bg-surface p-3">
          <h2 className="text-sm font-medium text-ink">Cases</h2>
          <p className="mt-1 text-xs text-muted">Same pump differential, scaled by the head curve. Fouled equipment uses the fouling factor.</p>
          <div className="mt-2 grid grid-cols-4 gap-1 text-xs text-muted">
            <span>Case</span>
            <span className="text-right">Valve ΔP</span>
            <span className="text-right">Kv</span>
            <span className="text-right">Dest.</span>
          </div>
          <ul>
            {result.cases.map((row) => (
              <li key={row.name} className="grid grid-cols-4 gap-1 border-t border-line py-2 font-mono text-xs text-ink">
                <span>{row.name}</span>
                <span className="text-right">{show(row.valveDpPa)}</span>
                <span className="text-right">{row.kvNeed > 0 ? num(row.kvNeed, 1) : "—"}</span>
                <span className={"text-right " + (row.delivers ? "" : "text-danger")}>{row.delivers ? "Holds" : "Short"}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {result.warnings.length ? (
        <ul className="flex flex-col gap-1">
          {result.warnings.map((warning) => (
            <li key={warning} className="text-xs text-danger">
              {warning}
            </li>
          ))}
        </ul>
      ) : null}

      <SaveBar name={state.name} onName={(name) => patch({ name })} onSave={() => onSave(state.name.trim() || "Hydraulic loop", summary)} />
      {sheet ? (
        <Datasheet
          model={sheet}
          onClose={() => setSheet(null)}
          onUserNote={(sheetNote) => patch({ sheetNote })}
        />
      ) : null}
    </div>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="min-w-0">
      <span className="mb-1 block text-xs font-medium text-muted">{label}</span>
      <input
        className="h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-accent"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function ItemEditor({
  item,
  index,
  count,
  unit,
  dp,
  velocity,
  outlet,
  onChange,
  onMove,
  onRemove,
}: {
  item: LoopItem;
  index: number;
  count: number;
  unit: string;
  dp: string;
  velocity: string;
  outlet: string;
  onChange: (partial: Partial<LoopItem>) => void;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
}) {
  const schedules = schedulesFor(item.nps);
  return (
    <article className="rounded-lg border border-line bg-surface p-3">
      <div className="flex items-start justify-between gap-2">
        <p className="font-mono text-xs text-muted">
          {index + 1} · {dp}
          {velocity ? ` · ${velocity}` : ""}
          {outlet ? ` · out ${outlet}` : ""}
        </p>
        <div className="flex gap-1">
          <button type="button" className="h-11 w-11 rounded-md bg-inset text-ink" onClick={() => onMove(-1)} disabled={index === 0} aria-label="Move up">
            ↑
          </button>
          <button
            type="button"
            className="h-11 w-11 rounded-md bg-inset text-ink"
            onClick={() => onMove(1)}
            disabled={index === count - 1}
            aria-label="Move down"
          >
            ↓
          </button>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <TextField label="Tag" value={item.tag} onChange={(tag) => onChange({ tag })} />
        <Sel
          label="Item"
          value={item.kind}
          onChange={(id) => onChange({ kind: id as ItemKind })}
          options={ITEM_KINDS.map((kind) => ({ id: kind.id, label: kind.label }))}
        />
        {item.kind === "pipe" ? (
          <>
            <NumField label="Length" value={item.lengthM} onChange={(lengthM) => onChange({ lengthM })} suffix="m" />
            <NumField label="Rise" value={item.elevM} onChange={(elevM) => onChange({ elevM })} suffix="m" />
          </>
        ) : null}
        {item.kind !== "pump" ? (
          <>
            <Sel
              label="NPS"
              value={item.nps}
              onChange={(nps) => onChange({ nps, schedule: schedulesFor(nps).includes(item.schedule) ? item.schedule : "40" })}
              options={NPS_OPTIONS.map((nps) => ({ id: nps, label: `NPS ${nps}` }))}
            />
            <Sel
              label="Schedule"
              value={item.schedule}
              onChange={(id) => onChange({ schedule: id as ScheduleId })}
              options={schedules.map((id) => ({ id, label: id === "40" ? "Sch 40 / STD" : id === "80" ? "Sch 80" : id === "10" ? "Sch 10" : "STD" }))}
            />
          </>
        ) : null}
        {item.kind === "valve" ? (
          <>
            <Sel label="Valve" value={item.valveKind} onChange={(valveKind) => onChange({ valveKind })} options={VALVE_KINDS} />
            <NumField label="Quantity" value={item.qty} onChange={(qty) => onChange({ qty })} />
          </>
        ) : null}
        {item.kind === "check" ? <NumField label="Quantity" value={item.qty} onChange={(qty) => onChange({ qty })} /> : null}
        {item.kind === "strainer" || item.kind === "exchanger" || item.kind === "meter" || item.kind === "orifice" || item.kind === "mixer" ? (
          <>
            <NumField label="Clean drop" value={item.dpClean} onChange={(dpClean) => onChange({ dpClean })} suffix={unit} />
            <NumField label="Fouling factor" value={item.foulFactor} onChange={(foulFactor) => onChange({ foulFactor })} suffix="×" />
          </>
        ) : null}
        {item.kind === "control" ? (
          <>
            <Sel
              label="Style"
              value={item.valveStyle}
              onChange={(id) => onChange({ valveStyle: id as LoopItem["valveStyle"] })}
              options={[
                { id: "globe", label: "Globe" },
                { id: "ball", label: "Segment ball" },
              ]}
            />
            <NumField label="Design drop" value={item.minDp} onChange={(minDp) => onChange({ minDp })} suffix={unit} />
            <NumField label="Fl" value={item.fl} onChange={(fl) => onChange({ fl })} />
          </>
        ) : null}
      </div>
      {item.kind === "pipe" ? (
        <div className="mt-3">
          <FittingsBlock counts={item.fittings} onChange={(fittings: Partial<Record<FittingId, number>>) => onChange({ fittings })} />
        </div>
      ) : null}
      {item.kind === "valve" ? (
        <p className="mt-2 text-xs text-muted">
          Full-open K {FITTINGS.find((fit) => fit.id === item.valveKind)?.k ?? "—"} each. Turbulent screen, not Crane 2K/3K.
        </p>
      ) : null}
      <button type="button" className="mt-3 h-11 rounded-md border border-line px-3 text-sm text-ink" onClick={onRemove}>
        Remove
      </button>
    </article>
  );
}
