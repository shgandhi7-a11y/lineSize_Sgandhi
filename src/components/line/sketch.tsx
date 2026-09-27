export type SketchInput = {
  scene: "plant" | "line" | "pump" | "pid";
  driver: "pump" | "compressor";
  showDriver: boolean;
  broken: boolean;
  lengthLabel: string;
  elevLabel: string;
  boreLabel: string;
  flowLabel: string;
  powerLabel: string;
  fromTitle: string;
  toTitle: string;
  fromPressure: string;
  toPressure: string;
  elevM: number;
  idMm: number;
  odMm: number | null;
  valves: number;
  pressures: number[];
  plate: { k: string; v: string }[] | null;
  pid?: { tag: string; kind: string; note: string }[];
};

const FONT = "IBM Plex Mono, ui-monospace, monospace";

function visualRise(elevM: number): number {
  if (!Number.isFinite(elevM) || Math.abs(elevM) < 0.05) return 0;
  const mag = Math.min(52, 16 + Math.log10(1 + Math.abs(elevM)) * 16);
  return Math.sign(elevM) * mag;
}

function groundY(x: number, rise: number): number {
  const t = Math.min(1, Math.max(0, x / 760));
  const s = t * t * (3 - 2 * t);
  return 214 - rise * s;
}

function PolyPipe({ pts, weight = 5 }: { pts: { x: number; y: number }[]; weight?: number }) {
  if (pts.length < 2) return null;
  const upper: string[] = [];
  const lower: string[] = [];
  const mid: string[] = [];
  for (let i = 0; i < pts.length; i++) {
    const prev = pts[Math.max(0, i - 1)];
    const next = pts[Math.min(pts.length - 1, i + 1)];
    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = (-dy / len) * weight;
    const ny = (dx / len) * weight;
    upper.push(`${(pts[i].x + nx).toFixed(1)},${(pts[i].y + ny).toFixed(1)}`);
    lower.push(`${(pts[i].x - nx).toFixed(1)},${(pts[i].y - ny).toFixed(1)}`);
    mid.push(`${pts[i].x.toFixed(1)},${pts[i].y.toFixed(1)}`);
  }
  return (
    <g>
      <polyline points={upper.join(" ")} fill="none" className="stroke-ink" strokeWidth={1.4} />
      <polyline points={lower.join(" ")} fill="none" className="stroke-ink" strokeWidth={1.4} />
      <polyline points={mid.join(" ")} fill="none" className="stroke-accent" strokeWidth={1.7} />
    </g>
  );
}

function FlowArrow({ pts }: { pts: { x: number; y: number }[] }) {
  if (pts.length < 2) return null;
  const i = Math.min(pts.length - 2, Math.floor(pts.length * 0.62));
  const a = pts[i];
  const b = pts[i + 1];
  const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
  return <polygon points="-9,-5 8,0 -9,5" transform={`translate(${a.x},${a.y}) rotate(${ang})`} className="fill-accent" />;
}

function Valve({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <polygon points="-8,0 0,-7 0,0" className="fill-surface stroke-ink" strokeWidth={1.2} />
      <polygon points="8,0 0,7 0,0" className="fill-surface stroke-ink" strokeWidth={1.2} />
      <line x1={0} y1={0} x2={0} y2={-16} className="stroke-ink" strokeWidth={1.3} />
      <circle cx={0} cy={-20} r={5} className="fill-surface stroke-ink" strokeWidth={1.2} />
    </g>
  );
}

function BoreCut({ idMm, odMm }: { idMm: number; odMm: number | null }) {
  const id = Math.max(idMm, 1);
  const od = odMm && odMm > id ? odMm : id * 1.12;
  const rOut = 16;
  const rIn = Math.max(7, rOut * (id / od));
  return (
    <g transform="translate(36,40)">
      <circle r={rOut} className="fill-inset stroke-ink" strokeWidth={1.3} />
      <circle r={rIn} className="fill-bg stroke-accent" strokeWidth={1.3} />
      <text y={32} textAnchor="middle" fontSize={12} fontFamily={FONT} className="fill-muted">
        Bore
      </text>
    </g>
  );
}

function Spark({ values }: { values: number[] }) {
  const finite = values.filter((n) => Number.isFinite(n));
  if (finite.length < 2) return null;
  const min = Math.min(...finite);
  const max = Math.max(...finite);
  const span = max - min || 1;
  const x = 250;
  const y = 16;
  const w = 220;
  const h = 46;
  const d = values
    .map((p, i) => {
      const px = x + (w * i) / (values.length - 1);
      const py = y + 16 + (h - 16) * (1 - (p - min) / span);
      return `${i === 0 ? "M" : "L"}${px.toFixed(1)},${py.toFixed(1)}`;
    })
    .join(" ");
  return (
    <g>
      <text x={x} y={y + 8} fontSize={12} fontFamily={FONT} className="fill-muted">
        Pressure along the line
      </text>
      <path d={d} fill="none" className="stroke-accent" strokeWidth={1.7} />
    </g>
  );
}

function Plate({ rows, x }: { rows: { k: string; v: string }[]; x: number }) {
  const y = 16;
  const h = 22 + rows.length * 18;
  return (
    <g>
      <rect x={x} y={y} width={214} height={h} className="fill-surface stroke-ink" strokeWidth={1.2} />
      <text x={x + 10} y={y + 16} fontSize={11} fontFamily={FONT} className="fill-muted">
        DUTY PLATE
      </text>
      {rows.slice(0, 4).map((row, i) => (
        <g key={row.k}>
          <text x={x + 10} y={y + 36 + i * 18} fontSize={13} fontFamily={FONT} className="fill-muted">
            {row.k}
          </text>
          <text x={x + 204} y={y + 36 + i * 18} textAnchor="end" fontSize={13} fontFamily={FONT} className="fill-ink">
            {row.v}
          </text>
        </g>
      ))}
    </g>
  );
}

function Vessel({
  x,
  nozzleY,
  title,
  pressure,
  nozzle,
}: {
  x: number;
  nozzleY: number;
  title: string;
  pressure: string;
  nozzle: "left" | "right";
}) {
  const w = 48;
  const left = x - w / 2;
  const top = nozzleY - 58;
  const bot = nozzleY + 26;
  return (
    <g>
      <ellipse cx={x} cy={bot} rx={w / 2} ry={6} className="fill-inset stroke-ink" strokeWidth={1.2} />
      <rect x={left} y={top + 8} width={w} height={bot - top - 8} className="fill-surface stroke-ink" strokeWidth={1.2} />
      <ellipse cx={x} cy={top + 8} rx={w / 2} ry={7} className="fill-surface stroke-ink" strokeWidth={1.2} />
      <rect x={left + 1.5} y={nozzleY - 6} width={w - 3} height={bot - nozzleY - 2} className="fill-accent" opacity={0.18} />
      <line x1={left} y1={nozzleY - 6} x2={left + w} y2={nozzleY - 6} className="stroke-accent" strokeWidth={1.2} />
      <line
        x1={nozzle === "right" ? left + w : left - 16}
        y1={nozzleY}
        x2={nozzle === "right" ? left + w + 16 : left}
        y2={nozzleY}
        className="stroke-ink"
        strokeWidth={4}
      />
      <text x={x} y={top - 22} textAnchor="middle" fontSize={14} fontFamily={FONT} className="fill-ink">
        {pressure}
      </text>
      <text x={x} y={top - 8} textAnchor="middle" fontSize={12} fontFamily={FONT} className="fill-muted">
        {title}
      </text>
    </g>
  );
}

function PumpSet({ x, y, power }: { x: number; y: number; power: string }) {
  return (
    <g>
      <rect x={x - 62} y={y + 28} width={108} height={14} className="fill-inset stroke-ink" strokeWidth={1.2} />
      <rect x={x - 54} y={y - 16} width={40} height={32} rx={2} className="fill-surface stroke-ink" strokeWidth={1.2} />
      <line x1={x - 48} y1={y - 8} x2={x - 48} y2={y + 10} className="stroke-line" strokeWidth={1} />
      <line x1={x - 42} y1={y - 8} x2={x - 42} y2={y + 10} className="stroke-line" strokeWidth={1} />
      <line x1={x - 36} y1={y - 8} x2={x - 36} y2={y + 10} className="stroke-line" strokeWidth={1} />
      <rect x={x - 14} y={y - 4} width={12} height={8} className="fill-inset stroke-ink" strokeWidth={1} />
      <circle cx={x + 16} cy={y} r={18} className="fill-surface stroke-ink" strokeWidth={1.3} />
      <circle cx={x + 16} cy={y} r={6} className="fill-inset stroke-accent" strokeWidth={1.2} />
      <rect x={x + 28} y={y - 5} width={16} height={10} className="fill-surface stroke-ink" strokeWidth={1.2} />
      <text x={x - 8} y={y + 56} textAnchor="middle" fontSize={13} fontFamily={FONT} className="fill-ink">
        {power}
      </text>
      <text x={x - 8} y={y + 70} textAnchor="middle" fontSize={11} fontFamily={FONT} className="fill-muted">
        Pump
      </text>
    </g>
  );
}

function CompressorSet({ x, y, power }: { x: number; y: number; power: string }) {
  return (
    <g>
      <rect x={x - 78} y={y + 22} width={132} height={14} className="fill-inset stroke-ink" strokeWidth={1.2} />
      <rect x={x - 70} y={y - 18} width={48} height={36} rx={2} className="fill-surface stroke-ink" strokeWidth={1.2} />
      <rect x={x - 16} y={y - 14} width={52} height={28} rx={10} className="fill-surface stroke-ink" strokeWidth={1.2} />
      <line x1={x - 4} y1={y - 14} x2={x - 4} y2={y + 14} className="stroke-line" strokeWidth={1} />
      <line x1={x + 8} y1={y - 14} x2={x + 8} y2={y + 14} className="stroke-line" strokeWidth={1} />
      <line x1={x + 20} y1={y - 14} x2={x + 20} y2={y + 14} className="stroke-line" strokeWidth={1} />
      <rect x={x + 36} y={y - 6} width={18} height={12} className="fill-surface stroke-ink" strokeWidth={1.2} />
      <text x={x - 8} y={y + 52} textAnchor="middle" fontSize={13} fontFamily={FONT} className="fill-ink">
        {power}
      </text>
      <text x={x - 8} y={y + 66} textAnchor="middle" fontSize={11} fontFamily={FONT} className="fill-muted">
        Compressor
      </text>
    </g>
  );
}

function Supports({ pts, groundAt }: { pts: { x: number; y: number }[]; groundAt: (x: number) => number }) {
  const picks = [0.28, 0.5, 0.72];
  return (
    <g>
      {picks.map((t) => {
        const i = Math.min(pts.length - 1, Math.max(0, Math.round((pts.length - 1) * t)));
        const p = pts[i];
        if (!p) return null;
        const gy = groundAt(p.x);
        return (
          <g key={t}>
            <line x1={p.x} y1={p.y + 6} x2={p.x} y2={gy} className="stroke-ink" strokeWidth={1.4} />
            <line x1={p.x - 8} y1={p.y + 6} x2={p.x + 8} y2={p.y + 6} className="stroke-ink" strokeWidth={1.4} />
            <line x1={p.x - 7} y1={gy} x2={p.x + 7} y2={gy} className="stroke-ink" strokeWidth={1.3} />
          </g>
        );
      })}
    </g>
  );
}

function splitRun(pts: { x: number; y: number }[], broken: boolean) {
  if (!broken || pts.length < 6) return { left: pts, right: [] as { x: number; y: number }[], gap: null as { x: number; y: number } | null };
  const mid = Math.floor(pts.length / 2);
  const left = pts.slice(0, mid - 1);
  const right = pts.slice(mid + 1);
  const gap = pts[mid];
  return { left, right, gap };
}

export function LineSketch({ sketch }: { sketch: SketchInput }) {
  const rise = visualRise(sketch.elevM);
  const lineScene = sketch.scene === "line";
  const yStart = lineScene ? groundY(150, rise) - 22 : 168;
  const yEnd = lineScene ? groundY(700, rise) - 22 : 168 - rise;
  const x1 = sketch.scene === "pump" ? 230 : lineScene ? 168 : 230;
  const x2 = sketch.scene === "pump" ? 650 : 640;
  const samples = lineScene ? 28 : sketch.broken ? 12 : 2;
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < samples; i++) {
    const t = i / (samples - 1);
    const x = x1 + (x2 - x1) * t;
    const y = lineScene ? groundY(x, rise) - 22 : yStart + (yEnd - yStart) * t;
    pts.push({ x, y });
  }
  const { left, right, gap } = splitRun(pts, sketch.broken);
  const groundAt = (x: number) => (lineScene ? groundY(x, rise) : 246);
  const valveAt = left.length > 2 ? left[Math.floor(left.length * 0.55)] : pts[0];
  const stationRoof = groundY(78, rise) - 92;
  const caption = sketch.scene === "line" ? "Above-ground line. Grade follows the elevation change." : "Equipment at grade. The pipe run is shortened.";

  const terrain: { x: number; y: number }[] = [];
  for (let i = 0; i <= 30; i++) terrain.push({ x: (760 * i) / 30, y: groundY((760 * i) / 30, rise) });
  const terrainD =
    lineScene
      ? `M0,300 ${terrain.map((p) => `L${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")} L760,300 Z`
      : "";

  return (
    <svg viewBox="0 0 760 300" role="img" className="block h-auto w-full" aria-label={`Installation elevation. ${caption}`}>
      <rect width={760} height={300} className="fill-bg" />
      {lineScene ? <path d={terrainD} className="fill-inset stroke-ink" strokeWidth={1.2} /> : <rect x={0} y={246} width={760} height={54} className="fill-inset" />}
      {!lineScene ? <line x1={0} y1={246} x2={760} y2={246} className="stroke-ink" strokeWidth={1.2} /> : null}
      <BoreCut idMm={sketch.idMm} odMm={sketch.odMm} />
      {sketch.plate ? <Plate rows={sketch.plate} x={248} /> : <Spark values={sketch.pressures} />}

      {lineScene ? (
        <g>
          <rect x={24} y={groundY(78, rise) - 74} width={112} height={74} className="fill-surface stroke-ink" strokeWidth={1.3} />
          <polygon
            points={`24,${groundY(78, rise) - 74} 80,${groundY(78, rise) - 92} 136,${groundY(78, rise) - 74}`}
            className="fill-inset stroke-ink"
            strokeWidth={1.2}
          />
          <rect x={40} y={groundY(78, rise) - 36} width={18} height={36} className="fill-bg stroke-ink" strokeWidth={1} />
          <text x={80} y={stationRoof - 34} textAnchor="middle" fontSize={12} fontFamily={FONT} className="fill-muted">
            {sketch.driver === "compressor" ? "Compressor station" : "Pump station"}
          </text>
          <text x={80} y={stationRoof - 18} textAnchor="middle" fontSize={14} fontFamily={FONT} className="fill-ink">
            {sketch.fromPressure}
          </text>
          <text x={80} y={stationRoof - 4} textAnchor="middle" fontSize={12} fontFamily={FONT} className="fill-ink">
            {sketch.powerLabel}
          </text>
        </g>
      ) : (
        <Vessel x={62} nozzleY={yStart} title={sketch.fromTitle} pressure={sketch.fromPressure} nozzle="right" />
      )}

      {!lineScene && sketch.showDriver && sketch.driver === "pump" ? <PumpSet x={168} y={yStart} power={sketch.powerLabel} /> : null}
      {!lineScene && sketch.showDriver && sketch.driver === "compressor" ? (
        <CompressorSet x={156} y={yStart} power={sketch.powerLabel} />
      ) : null}
      {!lineScene && !sketch.showDriver ? (
        <text x={150} y={yStart + 36} fontSize={12} fontFamily={FONT} className="fill-muted">
          No driver
        </text>
      ) : null}

      <Supports pts={gap ? pts.filter((p) => Math.abs(p.x - gap.x) > 30) : pts} groundAt={groundAt} />
      <PolyPipe pts={left} />
      {right.length > 1 ? <PolyPipe pts={right} /> : null}
      <FlowArrow pts={right.length > 1 ? right : left} />
      {sketch.valves > 0 && valveAt ? <Valve x={valveAt.x} y={valveAt.y} /> : null}
      {gap ? (
        <g>
          <line x1={gap.x - 16} y1={gap.y - 14} x2={gap.x - 4} y2={gap.y + 14} className="stroke-ink" strokeWidth={1.3} />
          <line x1={gap.x + 4} y1={gap.y - 14} x2={gap.x + 16} y2={gap.y + 14} className="stroke-ink" strokeWidth={1.3} />
          <text x={gap.x} y={gap.y - 22} textAnchor="middle" fontSize={13} fontFamily={FONT} className="fill-ink">
            {sketch.lengthLabel}
          </text>
        </g>
      ) : null}

      {lineScene ? (
        <g>
          <rect x={688} y={groundY(710, rise) - 58} width={36} height={58} className="fill-surface stroke-ink" strokeWidth={1.2} />
          <ellipse cx={706} cy={groundY(710, rise) - 58} rx={18} ry={6} className="fill-surface stroke-ink" strokeWidth={1.2} />
          <text x={706} y={groundY(710, rise) - 70} textAnchor="middle" fontSize={12} fontFamily={FONT} className="fill-muted">
            {sketch.toTitle}
          </text>
          <text x={706} y={groundY(710, rise) - 86} textAnchor="middle" fontSize={13} fontFamily={FONT} className="fill-ink">
            {sketch.toPressure}
          </text>
        </g>
      ) : (
        <g>
          <Vessel x={706} nozzleY={yEnd} title={sketch.toTitle} pressure={sketch.toPressure} nozzle="left" />
          {yEnd + 32 < 246 ? (
            <rect x={688} y={yEnd + 32} width={36} height={246 - (yEnd + 32)} className="fill-inset stroke-ink" strokeWidth={1} />
          ) : null}
        </g>
      )}

      {Math.abs(rise) > 2 ? (
        <g>
          <line x1={748} y1={lineScene ? groundY(40, rise) : yStart} x2={748} y2={lineScene ? groundY(720, rise) : yEnd} className="stroke-muted" strokeWidth={1} />
          <text
            x={742}
            y={((lineScene ? groundY(40, rise) : yStart) + (lineScene ? groundY(720, rise) : yEnd)) / 2}
            textAnchor="end"
            fontSize={12}
            fontFamily={FONT}
            className="fill-muted"
          >
            {sketch.elevLabel}
          </text>
        </g>
      ) : !lineScene ? (
        <text x={24} y={286} fontSize={12} fontFamily={FONT} className="fill-muted">
          Level · {sketch.elevLabel}
        </text>
      ) : null}
    </svg>
  );
}
