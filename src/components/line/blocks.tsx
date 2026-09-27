import { FITTINGS, ROUGHNESS, sumK, type FittingId, type RoughnessId } from "@/lib/calc/fluids";
import { NPS_OPTIONS, pipeSize, scheduleLabel, schedulesFor, type ScheduleId } from "@/lib/calc/pipes";
import { num } from "@/lib/calc/format";
import { Sel } from "./fields";

export function PipeRow({
  nps,
  schedule,
  onPick,
}: {
  nps: string;
  schedule: ScheduleId;
  onPick: (nps: string, schedule: ScheduleId) => void;
}) {
  const schedules = schedulesFor(nps);
  const safe = schedules.includes(schedule) ? schedule : schedules[0];
  const size = pipeSize(nps, safe);
  return (
    <div className="grid grid-cols-2 gap-3">
      <Sel
        label="Standard pipe"
        value={nps}
        onChange={(id) => {
          const next = schedulesFor(id);
          const sch = next.includes(schedule) ? schedule : next.includes("40") ? "40" : next[0];
          onPick(id, sch);
        }}
        options={NPS_OPTIONS.map((id) => ({ id, label: `NPS ${id}` }))}
      />
      <Sel
        label={size ? `ID ${num(size.idMm, 2)} mm` : "Schedule"}
        value={safe}
        onChange={(id) => onPick(nps, id as ScheduleId)}
        options={schedules.map((id) => ({ id, label: scheduleLabel(nps, id) }))}
      />
    </div>
  );
}

export function RoughRow({
  roughId,
  onChange,
}: {
  roughId: RoughnessId;
  onChange: (id: RoughnessId, mm: number) => void;
}) {
  return (
    <Sel
      label="Pipe roughness"
      value={roughId}
      onChange={(id) => {
        const row = ROUGHNESS.find((r) => r.id === id);
        if (row) onChange(row.id, row.mm);
      }}
      options={ROUGHNESS.map((r) => ({ id: r.id, label: `${r.label} · ${r.mm} mm` }))}
    />
  );
}

export function FittingsBlock({
  counts,
  onChange,
}: {
  counts: Partial<Record<FittingId, number>>;
  onChange: (next: Partial<Record<FittingId, number>>) => void;
}) {
  const k = sumK(counts);
  return (
    <details className="rounded-lg border border-line bg-surface">
      <summary className="min-h-11 cursor-pointer px-4 py-3 text-sm font-medium text-ink">
        Fittings · ΣK {num(k, 2)}
        <span className="mt-1 block text-xs font-normal text-muted">
          Turbulent loss coefficients for screening. Not Crane 2K/3K.
        </span>
      </summary>
      <div className="flex flex-col gap-1 px-3 pb-3">
        {FITTINGS.map((fit) => {
          const count = counts[fit.id] ?? 0;
          return (
            <div key={fit.id} className="flex items-center justify-between gap-3">
              <span className="text-sm text-ink">
                {fit.label}
                <span className="text-muted"> · K {fit.k}</span>
              </span>
              <span className="flex items-center">
                <button
                  type="button"
                  className="h-11 w-11 rounded-md bg-inset text-lg text-ink"
                  onClick={() => onChange({ ...counts, [fit.id]: Math.max(0, count - 1) })}
                  aria-label={`Fewer ${fit.label}`}
                >
                  −
                </button>
                <span className="w-8 text-center font-mono text-sm tabular-nums">{count}</span>
                <button
                  type="button"
                  className="h-11 w-11 rounded-md bg-inset text-lg text-ink"
                  onClick={() => onChange({ ...counts, [fit.id]: count + 1 })}
                  aria-label={`More ${fit.label}`}
                >
                  +
                </button>
              </span>
            </div>
          );
        })}
      </div>
    </details>
  );
}

export function SaveBar({
  name,
  onName,
  onSave,
}: {
  name: string;
  onName: (v: string) => void;
  onSave: () => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          aria-label="Case name"
          className="h-11 min-w-0 flex-1 rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-accent"
          value={name}
          onChange={(e) => onName(e.target.value)}
        />
        <button
          type="button"
          className="h-11 shrink-0 rounded-md bg-accent px-4 text-sm font-medium text-accent-ink"
          onClick={onSave}
        >
          Save
        </button>
      </div>
      <p className="text-xs text-muted">Saved on this phone. The working case is kept automatically too.</p>
    </div>
  );
}

export function VariantTable({
  title,
  note,
  headers,
  rows,
}: {
  title: string;
  note: string;
  headers: string[];
  rows: { key: string; cells: string[]; active?: boolean }[];
}) {
  return (
    <div className="rounded-lg border border-line bg-surface p-3">
      <p className="text-xs font-medium tracking-wide text-muted uppercase">{title}</p>
      <p className="mt-1 mb-2 text-xs text-muted">{note}</p>
      <div className="grid grid-cols-4 gap-1 px-1 text-xs text-muted">
        {headers.map((h, i) => (
          <span key={h} className={i === 0 ? "text-left" : "text-right"}>
            {h}
          </span>
        ))}
      </div>
      <ul>
        {rows.map((row) => (
          <li
            key={row.key}
            className={
              "grid grid-cols-4 gap-1 border-t border-line px-1 py-2 font-mono text-xs tabular-nums " +
              (row.active ? "bg-inset text-ink" : "text-ink")
            }
          >
            {row.cells.map((cell, i) => (
              <span key={headers[i]} className={i === 0 ? "text-left" : "text-right"}>
                {cell}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
