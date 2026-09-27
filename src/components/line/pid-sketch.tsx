const FONT = "IBM Plex Sans, sans-serif";

export type PidNode = { tag: string; kind: string; note: string };

function shortTag(tag: string): string {
  return tag.length > 12 ? `${tag.slice(0, 11)}…` : tag;
}

function SymbolMark({ kind }: { kind: string }) {
  if (kind === "source" || kind === "dest") {
    const tall = kind === "dest";
    return (
      <g>
        <rect x={-16} y={tall ? -62 : -48} width={32} height={tall ? 108 : 84} rx={8} className="fill-surface stroke-ink" strokeWidth={1.4} />
        <line x1={-16} y1={8} x2={16} y2={8} className="stroke-accent" strokeWidth={1.2} />
      </g>
    );
  }
  if (kind === "pump") {
    return (
      <g>
        <circle r={18} className="fill-surface stroke-ink" strokeWidth={1.4} />
        <path d="M -6 8 L 10 0 L -6 -8 Z" className="fill-accent stroke-none" />
      </g>
    );
  }
  if (kind === "control" || kind === "valve") {
    return (
      <g>
        {kind === "control" ? (
          <>
            <line x1={0} y1={-14} x2={0} y2={-36} className="stroke-ink" strokeWidth={1.2} />
            <rect x={-12} y={-52} width={24} height={16} className="fill-surface stroke-ink" strokeWidth={1.2} />
          </>
        ) : null}
        <path d="M -16 0 L 0 -12 L 0 12 Z M 16 0 L 0 -12 L 0 12 Z" className="fill-surface stroke-ink" strokeWidth={1.3} />
      </g>
    );
  }
  if (kind === "check") {
    return (
      <g>
        <path d="M -14 10 L 6 0 L -14 -10 Z" className="fill-surface stroke-ink" strokeWidth={1.3} />
        <line x1={10} y1={-12} x2={10} y2={12} className="stroke-ink" strokeWidth={1.6} />
      </g>
    );
  }
  if (kind === "strainer") {
    return (
      <g>
        <rect x={-14} y={-14} width={28} height={28} className="fill-surface stroke-ink" strokeWidth={1.3} />
        <path d="M -8 10 L 8 -10 M -2 12 L 12 -4 M -12 4 L 2 -12" className="stroke-accent" strokeWidth={1} />
      </g>
    );
  }
  if (kind === "exchanger") {
    return (
      <g>
        <circle r={18} className="fill-surface stroke-ink" strokeWidth={1.4} />
        <path d="M -10 -10 L 10 10 M -10 10 L 10 -10" className="stroke-accent" strokeWidth={1.3} />
      </g>
    );
  }
  if (kind === "meter") {
    return (
      <g>
        <circle r={14} className="fill-surface stroke-ink" strokeWidth={1.4} />
        <text y={4} textAnchor="middle" fontSize={10} fontFamily={FONT} className="fill-ink">
          FE
        </text>
      </g>
    );
  }
  if (kind === "orifice") {
    return (
      <g>
        <line x1={-4} y1={-16} x2={-4} y2={16} className="stroke-ink" strokeWidth={2} />
        <line x1={4} y1={-16} x2={4} y2={16} className="stroke-ink" strokeWidth={2} />
      </g>
    );
  }
  return (
    <g>
      <rect x={-16} y={-12} width={32} height={24} className="fill-surface stroke-ink" strokeWidth={1.3} />
      <path d="M -10 0 L -4 6 L 2 -6 L 10 0" className="stroke-accent" fill="none" strokeWidth={1.2} />
    </g>
  );
}

export function PidSketch({ nodes }: { nodes: PidNode[] }) {
  const list = nodes.length >= 2 ? nodes : [
    { tag: "Source", kind: "source", note: "" },
    { tag: "Destination", kind: "dest", note: "" },
  ];
  const n = list.length;
  const y = 156;
  const xAt = (index: number) => 46 + (index * (760 - 92)) / Math.max(1, n - 1);
  return (
    <svg viewBox="0 0 760 300" role="img" aria-label="P and ID hydraulic loop" className="h-auto w-full">
      <rect width="760" height="300" className="fill-inset" />
      <line x1={28} y1={y} x2={732} y2={y} className="stroke-accent" strokeWidth={3} />
      {list.map((node, index) => {
        const x = xAt(index);
        return (
          <g key={`${node.kind}-${node.tag}-${index}`} transform={`translate(${x} ${y})`}>
            <rect x={-22} y={-20} width={44} height={40} className="fill-inset stroke-none" />
            <SymbolMark kind={node.kind} />
            <text y={-78} textAnchor="middle" fontSize={12} fontFamily={FONT} className="fill-ink">
              {shortTag(node.tag)}
            </text>
            <text y={48} textAnchor="middle" fontSize={11} fontFamily={FONT} className="fill-muted">
              {node.note}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
