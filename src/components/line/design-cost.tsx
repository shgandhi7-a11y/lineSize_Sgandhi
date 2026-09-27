import type { DesignAlt } from "@/lib/calc/criteria";
import { musd } from "@/lib/calc/format";

export function DesignCost({
  currentCapex,
  currentOpex,
  currentLabel,
  alts,
  onUse,
}: {
  currentCapex: number | null;
  currentOpex: number | null;
  currentLabel: string;
  alts: DesignAlt[];
  onUse: (alt: DesignAlt) => void;
}) {
  const max = Math.max(currentCapex ?? 0, ...alts.map((alt) => alt.capex), 1);
  return (
    <section className="rounded-lg border border-line bg-surface p-3">
      <p className="text-xs font-medium tracking-wide text-muted uppercase">Design cost</p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div>
          <p className="text-xs text-muted">CapEx, one time</p>
          <p className="mt-1 font-mono text-xl font-semibold text-ink tabular-nums">{currentCapex == null ? "—" : musd(currentCapex)}</p>
        </div>
        <div>
          <p className="text-xs text-muted">OpEx</p>
          <p className="mt-1 font-mono text-xl font-semibold text-ink tabular-nums">
            {currentOpex == null ? "—" : `${musd(currentOpex)}/yr`}
          </p>
        </div>
      </div>
      <p className="mt-1 text-sm text-muted">{currentLabel}</p>
      {alts.length > 0 ? (
        <ul className="mt-3 flex flex-col gap-2">
          {alts.map((alt) => (
            <li key={`${alt.role}-${alt.nps}`} className="rounded-md border border-line p-2">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className={"text-sm font-medium " + (alt.role === "Optimum" ? "text-accent" : "text-ink")}>
                    {alt.role} · NPS {alt.nps}
                  </p>
                  <p className="font-mono text-xs text-muted">
                    CapEx {musd(alt.capex)} · OpEx {musd(alt.opex)}/yr
                  </p>
                  <p className="font-mono text-xs text-muted">
                    {alt.velocity.toFixed(2)} m/s · {alt.dpBarPerKm.toFixed(2)} bar/km
                  </p>
                </div>
                <button
                  type="button"
                  className="h-11 shrink-0 rounded-md border border-accent px-3 text-sm font-medium text-accent"
                  onClick={() => onUse(alt)}
                >
                  Use
                </button>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-sm bg-inset">
                <div
                  className={alt.role === "Optimum" ? "h-full bg-accent" : "h-full bg-[#8fb8b3]"}
                  style={{ width: `${Math.max(8, (alt.capex / max) * 100)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-muted">No size from 1 in to 200 in meets the limits, so there is no alternate to price.</p>
      )}
    </section>
  );
}
