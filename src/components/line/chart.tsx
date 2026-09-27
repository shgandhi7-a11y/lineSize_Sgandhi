import { useEffect, useState } from "react";

export function PressureChart({
  points,
  xLabel,
}: {
  points: { x: number; p: number }[];
  xLabel: string;
}) {
  const [lib, setLib] = useState<typeof import("recharts") | null>(null);

  useEffect(() => {
    let live = true;
    void import("recharts").then((mod) => {
      if (live) setLib(mod);
    });
    return () => {
      live = false;
    };
  }, []);

  if (points.length < 2) return null;

  return (
    <div className="rounded-lg border border-line bg-surface p-3">
      <p className="mb-2 text-xs font-medium tracking-wide text-muted uppercase">Pressure along the line</p>
      <div className="h-48">
        {lib ? (
          <lib.ResponsiveContainer width="100%" height="100%">
            <lib.LineChart data={points} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <lib.CartesianGrid stroke="var(--color-line)" vertical={false} />
              <lib.XAxis
                dataKey="x"
                tick={{ fill: "var(--color-muted)", fontSize: 12 }}
                tickFormatter={(v: number) => String(Math.round(v * 10) / 10)}
                stroke="var(--color-line)"
              />
              <lib.YAxis
                tick={{ fill: "var(--color-muted)", fontSize: 12 }}
                width={44}
                stroke="var(--color-line)"
                tickFormatter={(v: number) => String(Math.round(v * 10) / 10)}
              />
              <lib.Tooltip
                formatter={(value) => {
                  const n = typeof value === "number" ? value : Number(value);
                  return [`${Number.isFinite(n) ? n.toFixed(2) : "—"} gauge`, "Pressure"];
                }}
                labelFormatter={(label) => `${label} ${xLabel}`}
                contentStyle={{
                  background: "var(--color-ink)",
                  border: "none",
                  borderRadius: 8,
                  color: "var(--color-on-ink)",
                  fontSize: 12,
                }}
              />
              <lib.Line
                type="monotone"
                dataKey="p"
                stroke="var(--color-accent)"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </lib.LineChart>
          </lib.ResponsiveContainer>
        ) : (
          <div className="h-full rounded-md bg-inset" />
        )}
      </div>
      <p className="mt-1 text-xs text-muted">
        Distance ({xLabel}) · gauge pressure in the selected unit
      </p>
    </div>
  );
}
