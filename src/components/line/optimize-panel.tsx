import { useMemo, type ReactNode } from "react";
import { musd } from "@/lib/calc/format";
import {
  FLUIDS,
  GROUP_LABEL,
  MATERIALS,
  sizeLine,
  type CostState,
  type FluidGroup,
  type RowFlag,
  type SizeRow,
} from "@/lib/calc/optimize";

const GROUPS: FluidGroup[] = ["refinery", "ngl", "gas", "chemical"];

const FLAG: Record<RowFlag, string> = {
  flow: "Enter a flow",
  deliver: "Failed: will not deliver",
  velocity: "Failed: velocity",
  friction: "Failed: friction",
  both: "Failed: velocity and friction",
  pass: "Pass",
  optimized: "Optimized",
  oversized: "Oversized",
};

const M3H_TO_GPM = 4.4028678;
const BAR_TO_PSI = 14.5037738;
const KM_TO_MI = 0.621371;
const MS_TO_FTS = 3.2808399;
const BARKM_TO_PSI100 = 0.44207;

function num(n: number, digits: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

export function OptimizePanel({ state, setState }: { state: CostState; setState: (next: CostState) => void }) {
  const run = useMemo(() => sizeLine(state), [state]);
  const metric = state.units === "metric";
  const patch = (part: Partial<CostState>) => setState({ ...state, ...part });
  const best = run.best;
  const maxTotal = Math.max(...run.rows.map((row) => row.totalPerKm), 1);

  function velocity(ms: number): string {
    return metric ? `${num(ms, 2)} m/s` : `${num(ms * MS_TO_FTS, 2)} ft/s`;
  }
  function drop(barKm: number): string {
    return metric ? `${num(barKm, 2)} bar/km` : `${num(barKm * BARKM_TO_PSI100, 2)} psi/100ft`;
  }

  return (
    <div className="grid items-start gap-4 lg:grid-cols-[320px_1fr]">
      <form className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-4" onSubmit={(event) => event.preventDefault()}>
        <div className="grid grid-cols-2 gap-1 rounded-md bg-inset p-1">
          {(["metric", "imperial"] as const).map((unit) => (
            <button
              key={unit}
              type="button"
              aria-pressed={state.units === unit}
              className={
                "min-h-11 rounded-sm text-sm font-medium " +
                (state.units === unit ? "bg-accent text-accent-ink" : "text-muted")
              }
              onClick={() => patch({ units: unit })}
            >
              {unit === "metric" ? "Metric" : "Imperial"}
            </button>
          ))}
        </div>

        <Field label="Fluid">
          <select className={selectClass} value={state.fluidId} onChange={(event) => patch({ fluidId: event.target.value })}>
            {GROUPS.map((group) => (
              <optgroup key={group} label={GROUP_LABEL[group]}>
                {FLUIDS.filter((fluid) => fluid.group === group).map((fluid) => (
                  <option key={fluid.id} value={fluid.id}>
                    {fluid.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </Field>
        <Field label="Material">
          <select className={selectClass} value={state.materialId} onChange={(event) => patch({ materialId: event.target.value })}>
            {MATERIALS.map((material) => (
              <option key={material.id} value={material.id}>
                {material.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Wall">
          <select
            className={selectClass}
            value={state.schedule}
            onChange={(event) => patch({ schedule: event.target.value === "80" ? "80" : "40" })}
          >
            <option value="40">Schedule 40</option>
            <option value="80">Schedule 80</option>
          </select>
        </Field>

        <SliderField
          label={metric ? "Flow, m³/h" : "Flow, gpm"}
          min={0}
          max={metric ? 500 : 2200}
          step={metric ? 1 : 5}
          value={metric ? state.flowM3h : state.flowM3h * M3H_TO_GPM}
          onChange={(value) => patch({ flowM3h: metric ? value : value / M3H_TO_GPM })}
        />
        <SliderField
          label={metric ? "Temperature, °C" : "Temperature, °F"}
          min={metric ? -20 : -4}
          max={metric ? 200 : 392}
          step={1}
          value={metric ? state.tempC : (state.tempC * 9) / 5 + 32}
          onChange={(value) => patch({ tempC: metric ? value : ((value - 32) * 5) / 9 })}
        />
        <SliderField
          label={metric ? "Inlet pressure, bar" : "Inlet pressure, psi"}
          min={metric ? 0.5 : 7}
          max={metric ? 80 : 1160}
          step={metric ? 0.5 : 5}
          value={metric ? state.pBar : state.pBar * BAR_TO_PSI}
          onChange={(value) => patch({ pBar: metric ? value : value / BAR_TO_PSI })}
        />
        <SliderField
          label={metric ? "Length, km" : "Length, miles"}
          min={metric ? 0.1 : 0.1}
          max={metric ? 100 : 62}
          step={metric ? 0.1 : 0.1}
          value={metric ? state.lengthKm : state.lengthKm * KM_TO_MI}
          onChange={(value) => patch({ lengthKm: metric ? value : value / KM_TO_MI })}
        />
        <div className="grid grid-cols-2 gap-3">
          <SliderField label="Life, years" min={1} max={40} step={1} value={state.years} onChange={(years) => patch({ years })} />
          <SliderField
            label="Efficiency, %"
            min={20}
            max={95}
            step={1}
            value={state.efficiencyPct}
            onChange={(efficiencyPct) => patch({ efficiencyPct })}
          />
          <SliderField
            label="Power, USD/kWh"
            min={0.02}
            max={0.5}
            step={0.01}
            value={state.tariff}
            onChange={(tariff) => patch({ tariff })}
          />
          <SliderField
            label="Discount, %"
            min={0}
            max={20}
            step={0.5}
            value={state.discountPct}
            onChange={(discountPct) => patch({ discountPct })}
          />
        </div>
        <p className="text-xs text-muted">Pumping power is charged for 8,760 h/y. CapEx is one-time installed pipe in MUSD per km. OpEx is electricity in MUSD per km per year. No scrap credit.</p>
      </form>

      <div className="flex min-w-0 flex-col gap-4">
        <section className="rounded-lg border border-line border-l-4 border-l-accent bg-surface p-4">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">Optimized selection</p>
          {best ? (
            <>
              <p className="mt-1 text-3xl font-semibold text-ink">NPS {best.nps}</p>
              <p className="mt-1 font-mono text-lg text-accent tabular-nums">{musd(best.totalPerKm)} /km</p>
              <p className="mt-1 text-sm text-muted">
                {velocity(best.velocityMs)} · {drop(best.dpBarPerKm)} · {run.material.name}, Sch {state.schedule}
              </p>
              <p className="mt-2 text-sm text-ink">
                This is the passing size with the lowest {state.years}-year cost. A larger bore saves power and spends more steel. A smaller bore does the opposite, or breaks a limit.
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-ink">No size passes the velocity and pressure-drop limits. Raise the bore, cut the flow, or change the fluid limits.</p>
          )}
          <div className="mt-3 flex flex-col gap-2">
            {run.warnings.map((warning) => (
              <p key={warning} className="rounded-md bg-warn-bg px-3 py-2 text-sm text-warn">
                {warning}
              </p>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-line bg-surface p-4">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">CapEx against discounted power</p>
          <CostBars rows={run.rows} maxTotal={maxTotal} />
          <p className="mt-2 text-xs text-muted">Teal is one-time installed pipe. Amber is the present value of electricity, not a yearly cost. The shortest stack is the economic bore. Figures are MUSD.</p>
        </section>

        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="bg-inset text-xs text-muted">
              <tr>
                <th className="px-3 py-2 font-medium">NPS</th>
                <th className="px-3 py-2 font-medium">Velocity</th>
                <th className="px-3 py-2 font-medium">Reynolds</th>
                <th className="px-3 py-2 font-medium">{metric ? "ΔP, bar/km" : "ΔP, psi/100ft"}</th>
                <th className="px-3 py-2 font-medium">CapEx, MUSD/km</th>
                <th className="px-3 py-2 font-medium">OpEx, MUSD/km·yr</th>
                <th className="px-3 py-2 font-medium">CapEx + PV, MUSD/km</th>
                <th className="px-3 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {run.rows.map((row) => (
                <tr key={row.nps} className={row.flag === "optimized" ? "bg-ok-bg" : "border-t border-line bg-surface"}>
                  <td className="px-3 py-2 font-medium">{row.nps}</td>
                  <td className="px-3 py-2 font-mono tabular-nums">{row.flag === "flow" || row.flag === "deliver" ? "—" : velocity(row.velocityMs)}</td>
                  <td className="px-3 py-2 font-mono tabular-nums">{row.flag === "flow" || row.flag === "deliver" ? "—" : num(row.re, 0)}</td>
                  <td className="px-3 py-2 font-mono tabular-nums">
                    {row.flag === "flow" || row.flag === "deliver" ? "—" : metric ? num(row.dpBarPerKm, 2) : num(row.dpBarPerKm * BARKM_TO_PSI100, 2)}
                  </td>
                  <td className="px-3 py-2 font-mono tabular-nums">{musd(row.capexPerKm)}</td>
                  <td className="px-3 py-2 font-mono tabular-nums">{row.flag === "flow" ? "—" : musd(row.opexPerKmYear)}</td>
                  <td className="px-3 py-2 font-mono tabular-nums">{row.flag === "flow" ? "—" : musd(row.totalPerKm)}</td>
                  <td className={"px-3 py-2 " + flagClass(row.flag)}>{FLAG[row.flag]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted">
          Liquids use Darcy–Weisbach and Swamee–Jain. Gases use isothermal compressible flow with Z = 0.9, and the velocity check is at the downstream end. Density on this case is {num(run.rho, run.fluid.phase === "gas" ? 2 : 0)} kg/m³. Sizes run through NPS 200. Above NPS 24, a Schedule 80 wall, and any Schedule 40 ASME does not list, is scaled from the NPS 24 schedule. HDPE uses that bore as a screen, not an SDR.
        </p>
      </div>
    </div>
  );
}

function flagClass(flag: RowFlag): string {
  if (flag === "optimized") return "font-medium text-ok";
  if (flag === "oversized") return "text-warn";
  if (flag === "pass") return "text-ink";
  return "text-danger";
}

function CostBars({ rows, maxTotal }: { rows: SizeRow[]; maxTotal: number }) {
  const w = 720;
  const h = 260;
  const pad = 16;
  const gap = 2;
  const slot = (w - pad * 2) / rows.length;
  const bw = Math.max(slot - gap, 2);
  const base = h - 56;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 h-64 w-full" role="img" aria-label="Capital cost and discounted power for each pipe size">
      {rows.map((row, index) => {
        const x = pad + index * slot;
        const capH = (row.capexPerKm / maxTotal) * (base - 8);
        const opH = (Math.max(row.totalPerKm - row.capexPerKm, 0) / maxTotal) * (base - 8);
        const yOp = base - capH - opH;
        const on = row.flag === "optimized";
        return (
          <g key={row.nps}>
            <rect x={x} y={yOp} width={bw} height={Math.max(opH, 0)} fill={on ? "#c4841d" : "#e2c48a"} />
            <rect x={x} y={base - capH} width={bw} height={Math.max(capH, 0)} fill={on ? "#0c6b62" : "#8fb8b3"} />
            <text
              x={x + bw / 2}
              y={base + 10}
              textAnchor="end"
              fontSize="8"
              fill="#5c6d7e"
              transform={`rotate(-65 ${x + bw / 2} ${base + 10})`}
            >
              {row.nps}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const selectClass = "h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-accent";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}

function SliderField({
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}) {
  const shown = Number.isFinite(value) ? value : min;
  return (
    <label className="block">
      <span className="mb-1 flex items-center justify-between gap-2 text-xs font-medium text-muted">
        {label}
        <input
          inputMode="decimal"
          className="h-9 w-24 rounded-md border border-line bg-surface px-2 text-right font-mono text-sm text-ink outline-none focus:border-accent"
          value={Number(shown.toFixed(step < 1 ? 2 : 1))}
          onChange={(event) => {
            const next = Number(event.target.value);
            if (Number.isFinite(next)) onChange(next);
          }}
        />
      </span>
      <input
        type="range"
        className="h-11 w-full accent-[#0c6b62]"
        min={min}
        max={max}
        step={step}
        value={Math.min(max, Math.max(min, shown))}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
