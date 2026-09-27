import { useEffect, useState } from "react";
import { Bookmark, CircleDollarSign, Droplets, Gauge, Waypoints, Wind } from "lucide-react";
import { GasPanel } from "./gas-panel";
import { LiquidPanel } from "./liquid-panel";
import { LoopPanel } from "./loop-panel";
import {
  CASES_KEY,
  defaultGas,
  defaultLiquid,
  defaultLoop,
  defaultPump,
  DRAFT_KEY,
  newLoopItem,
  type GasState,
  type LiquidState,
  type LoopState,
  type PumpState,
  type SavedCase,
  type TabId,
} from "./model";
import { PumpPanel } from "./pump-panel";
import { OptimizePanel } from "./optimize-panel";
import { defaultCost, type CostState } from "@/lib/calc/optimize";
import { LineChat, caseBrief } from "./line-chat";
import { m3sToLiquidFlow } from "@/lib/calc/units";

const TABS: { id: TabId; label: string; icon: typeof Droplets }[] = [
  { id: "liquid", label: "Liquid", icon: Droplets },
  { id: "gas", label: "Gas", icon: Wind },
  { id: "pump", label: "Pump", icon: Gauge },
  { id: "loop", label: "Loop", icon: Waypoints },
  { id: "cost", label: "Cost", icon: CircleDollarSign },
  { id: "saved", label: "Saved", icon: Bookmark },
];

function asUsd<T extends { currency?: string; tariff?: number; pipeCost100?: number }>(row: T): T {
  if (row.currency !== "AED") return row;
  const rate = 3.6725;
  return {
    ...row,
    currency: "USD",
    tariff: (row.tariff ?? 0) / rate,
    ...(typeof row.pipeCost100 === "number" ? { pipeCost100: row.pipeCost100 / rate } : {}),
  };
}

function merge<T>(base: T, raw: unknown): T {
  if (!raw || typeof raw !== "object") return base;
  return { ...base, ...(raw as T) };
}

function mergeLoop(raw: LoopState): LoopState {
  const base = defaultLoop();
  const merged = merge(base, raw);
  if (!Array.isArray(raw.items) || raw.items.length === 0) return { ...merged, items: base.items };
  return {
    ...merged,
    items: raw.items.map((item) => ({ ...newLoopItem(item.kind), ...item })),
  };
}

export function LineApp() {
  const [tab, setTab] = useState<TabId>("liquid");
  const [liquid, setLiquid] = useState<LiquidState>(defaultLiquid);
  const [gas, setGas] = useState<GasState>(defaultGas);
  const [pump, setPump] = useState<PumpState>(defaultPump);
  const [loop, setLoop] = useState<LoopState>(defaultLoop);
  const [cost, setCost] = useState<CostState>(defaultCost);
  const [cases, setCases] = useState<SavedCase[]>([]);
  const [note, setNote] = useState("");
  const [ready, setReady] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  useEffect(() => {
    try {
      const draft = localStorage.getItem(DRAFT_KEY);
      if (draft) {
        const parsed = JSON.parse(draft) as {
          tab?: TabId;
          liquid?: LiquidState;
          gas?: GasState;
          pump?: PumpState;
          loop?: LoopState;
          cost?: CostState;
        };
        if (parsed.liquid) setLiquid(asUsd(merge(defaultLiquid(), parsed.liquid)));
        if (parsed.gas) setGas(asUsd(merge(defaultGas(), parsed.gas)));
        if (parsed.pump) setPump(asUsd(merge(defaultPump(), parsed.pump)));
        if (parsed.loop) setLoop(asUsd(mergeLoop(parsed.loop)));
        if (parsed.cost) setCost(merge(defaultCost(), parsed.cost));
        if (parsed.tab && TABS.some((t) => t.id === parsed.tab)) setTab(parsed.tab);
      }
      const saved = localStorage.getItem(CASES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as SavedCase[];
        if (Array.isArray(parsed)) {
          setCases(
            parsed.slice(0, 40).map((item) => ({
              ...item,
              ...(item.liquid ? { liquid: asUsd(item.liquid) } : {}),
              ...(item.gas ? { gas: asUsd(item.gas) } : {}),
              ...(item.pump ? { pump: asUsd(item.pump) } : {}),
              ...(item.loop ? { loop: asUsd(item.loop) } : {}),
            })),
          );
        }
      }
    } catch {
      /* keep the worked example */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ tab, liquid, gas, pump, loop, cost }));
  }, [ready, tab, liquid, gas, pump, loop, cost]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(CASES_KEY, JSON.stringify(cases));
  }, [ready, cases]);

  function saveCase(kind: SavedCase["kind"], name: string, summary: string) {
    const entry: SavedCase = {
      id: crypto.randomUUID(),
      name,
      kind,
      at: Date.now(),
      summary,
      liquid: kind === "liquid" ? liquid : undefined,
      gas: kind === "gas" ? gas : undefined,
      pump: kind === "pump" ? pump : undefined,
      loop: kind === "loop" ? loop : undefined,
    };
    setCases((list) => [entry, ...list].slice(0, 40));
    setTab("saved");
  }

  function resetExample() {
    if (tab === "liquid") setLiquid(defaultLiquid());
    else if (tab === "gas") setGas(defaultGas());
    else if (tab === "pump") {
      setPump(defaultPump());
      setNote("");
    } else if (tab === "loop") setLoop(defaultLoop());
    else if (tab === "cost") setCost(defaultCost());
  }

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="bg-ink text-on-ink">
        <div className="mx-auto flex max-w-5xl items-start justify-between gap-3 px-4 py-4">
          <div>
            <p className="font-mono text-xs tracking-widest text-on-ink-dim">FIELD HYDRAULICS</p>
            <h1 className="text-2xl font-semibold">LineSpec</h1>
            <p className="mt-1 text-sm text-on-ink-dim">Line, gas, pump, and a P&ID hydraulic loop.</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <p className="font-mono text-xs text-on-ink">Pipesize App V0</p>
              <p className="text-xs text-on-ink-dim">By Shital H Gandhi</p>
            </div>
            {tab !== "saved" ? (
              <button
                type="button"
                className="h-11 shrink-0 rounded-md border border-on-ink-dim px-3 text-sm text-on-ink"
                onClick={resetExample}
              >
                Example
              </button>
            ) : null}
            <a
              href="/LineSpec.apk"
              download="LineSpec.apk"
              className="inline-flex h-11 items-center rounded-md bg-accent px-3 text-sm font-semibold text-accent-ink"
            >
              LineSpec.apk
            </a>
          </div>
        </div>
      </header>

      <nav className="sticky top-0 z-20 border-b border-line bg-surface">
        <div className="mx-auto grid max-w-5xl grid-cols-6">
          {TABS.map((item) => {
            const Icon = item.icon;
            const on = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={on}
                className={
                  "flex min-h-12 flex-col items-center justify-center gap-1 text-xs font-medium " +
                  (on ? "text-accent" : "text-muted")
                }
                onClick={() => setTab(item.id)}
              >
                <Icon className="size-4" aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-4 py-4 pb-16">
        {tab === "liquid" ? (
          <LiquidPanel
            state={liquid}
            setState={setLiquid}
            onSave={(name, summary) => saveCase("liquid", name, summary)}
            onUsePump={(friction, elev, density, flow, pvap) => {
              setPump((p) => ({
                ...p,
                mode: "system",
                density,
                pvapKpa: pvap,
                staticLift: elev,
                frictionHead: friction,
                sourceP: 0,
                destP: 0,
                flowValue: m3sToLiquidFlow(flow, p.flowUnit, density),
              }));
              setNote("Friction head and elevation came from the liquid line. Set tank pressures if they are not both open to atmosphere.");
              setTab("pump");
            }}
          />
        ) : null}
        {tab === "gas" ? (
          <GasPanel state={gas} setState={setGas} onSave={(name, summary) => saveCase("gas", name, summary)} />
        ) : null}
        {tab === "pump" ? (
          <PumpPanel
            state={pump}
            setState={setPump}
            note={note}
            onSave={(name, summary) => saveCase("pump", name, summary)}
          />
        ) : null}
        {tab === "loop" ? (
          <LoopPanel state={loop} setState={setLoop} onSave={(name, summary) => saveCase("loop", name, summary)} />
        ) : null}
        {tab === "cost" ? <OptimizePanel state={cost} setState={setCost} /> : null}
        {tab === "saved" ? (
          <SavedList
            cases={cases}
            pendingDelete={pendingDelete}
            onPending={setPendingDelete}
            onDelete={(id) => setCases((list) => list.filter((c) => c.id !== id))}
            onLoad={(entry) => {
              if (entry.kind === "liquid" && entry.liquid) {
                setLiquid(merge(defaultLiquid(), entry.liquid));
                setTab("liquid");
              } else if (entry.kind === "gas" && entry.gas) {
                setGas(merge(defaultGas(), entry.gas));
                setTab("gas");
              } else if (entry.kind === "pump" && entry.pump) {
                setPump(merge(defaultPump(), entry.pump));
                setNote("");
                setTab("pump");
              } else if (entry.kind === "loop" && entry.loop) {
                setLoop(mergeLoop(entry.loop));
                setTab("loop");
              }
            }}
          />
        ) : null}
      </main>
      <LineChat brief={caseBrief(tab, liquid, gas, pump, loop, cost)} />
    </div>
  );
}

function SavedList({
  cases,
  pendingDelete,
  onPending,
  onDelete,
  onLoad,
}: {
  cases: SavedCase[];
  pendingDelete: string | null;
  onPending: (id: string | null) => void;
  onDelete: (id: string) => void;
  onLoad: (entry: SavedCase) => void;
}) {
  if (!cases.length) {
    return (
      <div className="rounded-lg border border-line bg-surface p-6">
        <h2 className="text-lg font-semibold">Nothing saved yet</h2>
        <p className="mt-2 text-sm text-muted">
          Run a liquid, gas, pump or loop case and tap Save. It stays on this phone, together with whatever you last had open.
        </p>
      </div>
    );
  }
  return (
    <ul className="flex flex-col gap-3">
      {cases.map((entry) => (
        <li key={entry.id} className="rounded-lg border border-line bg-surface p-4">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">{entry.kind}</p>
          <h2 className="mt-1 text-base font-semibold">{entry.name}</h2>
          <p className="mt-1 text-sm text-muted">{entry.summary}</p>
          <p className="mt-1 text-xs text-muted">
            {new Date(entry.at).toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="h-11 rounded-md bg-accent px-4 text-sm font-medium text-accent-ink"
              onClick={() => onLoad(entry)}
            >
              Open
            </button>
            {pendingDelete === entry.id ? (
              <button
                type="button"
                className="h-11 rounded-md bg-danger-bg px-4 text-sm font-medium text-danger"
                onClick={() => {
                  onDelete(entry.id);
                  onPending(null);
                }}
              >
                Confirm delete
              </button>
            ) : (
              <button
                type="button"
                className="h-11 rounded-md border border-line px-4 text-sm text-ink"
                onClick={() => onPending(entry.id)}
              >
                Delete
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
