import type { EconInput } from "@/lib/calc/optimum";
import type { PipeSize } from "@/lib/calc/pipes";
import { scheduleLabel } from "@/lib/calc/pipes";
import { num } from "@/lib/calc/format";
import { NumField } from "./fields";

export function OptimumCard({
  driver,
  currency,
  currentMm,
  currentKw,
  currentDetail,
  optimumMm,
  optimumKw,
  optimumDetail,
  hint,
  optimumVelocity,
  edge,
  sinnottMm,
  ratio,
  standard,
  onUseMm,
  onUsePipe,
  econ,
  onEcon,
}: {
  driver: "pump" | "compressor";
  currency: string;
  currentMm: number;
  currentKw: number;
  currentDetail: string;
  optimumMm: number | null;
  optimumKw: number | null;
  optimumDetail: string;
  hint?: string;
  optimumVelocity: number | null;
  edge: "low" | "high" | null;
  sinnottMm?: number;
  ratio?: number;
  standard: PipeSize | null;
  onUseMm: (mm: number) => void;
  onUsePipe: (nps: string, schedule: PipeSize["schedule"]) => void;
  econ: EconInput & { currency: string };
  onEcon: (patch: Partial<EconInput & { currency: string }>) => void;
}) {
  const name = driver === "pump" ? "Pump" : "Compressor";
  return (
    <section className="rounded-lg border border-line bg-surface p-4">
      <p className="text-xs font-medium tracking-wide text-muted uppercase">Optimum bore and {name.toLowerCase()} power</p>
      <div className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line">
        <div className="bg-surface px-3 py-3">
          <p className="text-xs text-muted">This bore</p>
          <p className="mt-1 font-mono text-lg font-medium text-ink tabular-nums">{num(currentMm, 1)} mm</p>
          <p className="mt-1 font-mono text-sm text-accent tabular-nums">{num(currentKw)} kW</p>
          <p className="mt-1 text-xs text-muted">{currentDetail}</p>
        </div>
        <div className="bg-inset px-3 py-3">
          <p className="text-xs text-muted">Economic bore</p>
          <p className="mt-1 font-mono text-lg font-medium text-ink tabular-nums">
            {optimumMm == null ? "—" : `${num(optimumMm, 1)} mm`}
          </p>
          <p className="mt-1 font-mono text-sm text-accent tabular-nums">
            {optimumKw == null ? "—" : `${num(optimumKw)} kW`}
          </p>
          <p className="mt-1 text-xs text-muted">{optimumDetail}</p>
        </div>
      </div>
      {hint ? <p className="mt-2 text-xs text-muted">{hint}</p> : null}
      {optimumVelocity != null ? (
        <p className="mt-2 text-xs text-muted">
          At the economic bore the velocity is {num(optimumVelocity)} m/s
          {driver === "compressor" ? " at the outlet" : ""}. CapEx is the one-time pipe cost. OpEx is electricity per year. Both are MUSD.
        </p>
      ) : null}
      {edge === "low" ? (
        <p className="mt-2 text-sm text-warn">
          The cheapest bore is at the bottom of the search. Power is cheap relative to pipe — lower the pipe price or raise the tariff if that is not what you meant.
        </p>
      ) : null}
      {edge === "high" ? (
        <p className="mt-2 text-sm text-warn">
          The cheapest bore is above 1.2 m. Electricity dominates — check the tariff, the hours, and the pipe price.
        </p>
      ) : null}
      {sinnottMm != null && Number.isFinite(sinnottMm) ? (
        <p className="mt-2 text-xs text-muted">
          Textbook carbon-steel screen (Towler and Sinnott, turbulent pumped liquids): {num(sinnottMm, 0)} mm. It ignores
          your tariff. Not for gas, slurry, or alloy pipe.
        </p>
      ) : null}
      {ratio != null && ratio > 1 ? (
        <p className="mt-2 text-xs text-muted">
          Compressor pressure ratio {num(ratio, 2)} — line inlet over line outlet. Isentropic head, suction temperature equal to the line temperature.
        </p>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-2">
        {optimumMm != null ? (
          <button
            type="button"
            className="h-11 rounded-md bg-accent px-3 text-sm font-medium text-accent-ink"
            onClick={() => onUseMm(optimumMm)}
          >
            Use economic bore
          </button>
        ) : null}
        {standard ? (
          <button
            type="button"
            className="h-11 rounded-md border border-accent px-3 text-sm font-medium text-accent"
            onClick={() => onUsePipe(standard.nps, standard.schedule)}
          >
            Use NPS {standard.nps} {scheduleLabel(standard.nps, standard.schedule)}
          </button>
        ) : null}
      </div>
      {standard ? (
        <p className="mt-2 text-xs text-muted">
          Next standard ID {num(standard.idMm, 1)} mm, which is on or above the economic bore.
        </p>
      ) : null}

      <details className="mt-3 rounded-md border border-line">
        <summary className="min-h-11 cursor-pointer px-3 py-3 text-sm font-medium text-ink">
          Cost basis · {num(econ.tariff, 3)} USD/kWh · {econ.etaMachine}% {driver === "pump" ? "pump" : "isentropic"}
        </summary>
        <div className="grid grid-cols-1 gap-3 px-3 pb-3 sm:grid-cols-2">
          <NumField
            label={driver === "pump" ? "Pump efficiency" : "Isentropic efficiency"}
            value={econ.etaMachine}
            onChange={(etaMachine) => onEcon({ etaMachine })}
            suffix="%"
          />
          <NumField
            label="Motor efficiency"
            value={econ.etaMotor}
            onChange={(etaMotor) => onEcon({ etaMotor })}
            suffix="%"
          />
          <NumField label="Hours per year" value={econ.hours} onChange={(hours) => onEcon({ hours })} suffix="h" />
          <NumField label="Duty factor" value={econ.load} onChange={(load) => onEcon({ load })} suffix="%" />
          <NumField
            label="Tariff"
            value={econ.tariff}
            onChange={(tariff) => onEcon({ tariff })}
            suffix="USD/kWh"
          />
          <NumField
            label="Installed pipe at 100 mm"
            value={econ.pipeCost100}
            onChange={(pipeCost100) => onEcon({ pipeCost100 })}
            suffix="USD/m"
          />
          <NumField
            label="Pipe cost exponent"
            value={econ.pipeExp}
            onChange={(pipeExp) => onEcon({ pipeExp })}
            suffix="—"
          />
          <NumField
            label="Annual capital charge"
            value={econ.capitalCharge * 100}
            onChange={(pct) => onEcon({ capitalCharge: pct / 100 })}
            suffix="%"
          />
        </div>
      </details>
    </section>
  );
}
