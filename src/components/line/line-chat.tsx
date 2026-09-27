import { useState } from "react";
import { askLine } from "@/lib/line-ask";
import type { GasState, LiquidState, LoopState, PumpState, TabId } from "./model";
import { defaultCost, sizeLine, type CostState } from "@/lib/calc/optimize";

type Msg = { role: "user" | "assistant"; content: string };

export function caseBrief(
  tab: TabId,
  liquid: LiquidState,
  gas: GasState,
  pump: PumpState,
  loop: LoopState,
  cost: CostState = defaultCost(),
): string {
  if (tab === "cost") {
    const run = sizeLine(cost);
    const best = run.best;
    return [
      "Lifecycle cost screen.",
      `${run.fluid.name}, ${run.material.name}, Sch ${cost.schedule}.`,
      `Flow ${cost.flowM3h} m3/h, ${cost.tempC} C, inlet ${cost.pBar} bar, length ${cost.lengthKm} km.`,
      `Life ${cost.years} y, efficiency ${cost.efficiencyPct}%, tariff ${cost.tariff} USD/kWh, discount ${cost.discountPct}%.`,
      `Density ${run.rho.toFixed(2)} kg/m3.`,
      best
        ? `Optimized NPS ${best.nps}, velocity ${best.velocityMs.toFixed(2)} m/s, drop ${best.dpBarPerKm.toFixed(2)} bar/km, ${Math.round(best.totalPerKm)} USD/km.`
        : "No size passed the velocity and pressure-drop limits.",
    ].join(" ");
  }
  if (tab === "gas") {
    return [
      "Gas line.",
      `Solve for ${gas.mode}.`,
      `Fluid ${gas.fluidId}, MW ${gas.mw}, SG ${gas.sg}, μ ${gas.viscCp} cP, k ${gas.gamma}, Z ${gas.z}, T ${gas.tempC} °C.`,
      `Flow ${gas.flowValue} ${gas.flowUnit}.`,
      `ID ${gas.diamValue} ${gas.diamUnit}, NPS ${gas.nps} Sch ${gas.schedule}, ε ${gas.roughMm} mm.`,
      `Length ${gas.lengthValue} ${gas.lengthUnit}, elevation ${gas.elevValue} ${gas.elevUnit}.`,
      `Inlet ${gas.p1} ${gas.pUnit}, outlet ${gas.p2} ${gas.pUnit}.`,
      `Machine ${gas.etaMachine}%, motor ${gas.etaMotor}%.`,
    ].join(" ");
  }
  if (tab === "pump") {
    return [
      "Pump check.",
      `Mode ${pump.mode}. Density ${pump.density} kg/m³.`,
      `Flow ${pump.flowValue} ${pump.flowUnit}.`,
      `Suction ${pump.ps} ${pump.pUnit}, discharge ${pump.pd} ${pump.pUnit}.`,
      `Nozzle rise ${pump.nozzleElev} m, static lift ${pump.staticLift} m, friction head ${pump.frictionHead} m.`,
      `Source ${pump.sourceP} ${pump.pUnit}, destination ${pump.destP} ${pump.pUnit}.`,
      `Suction bore ${pump.suctionMm} mm, discharge bore ${pump.dischargeMm} mm.`,
      `Pump ${pump.etaPump}%, motor ${pump.etaMotor}%, NPSHr ${pump.npshr} m, Pvap ${pump.pvapKpa} kPa, Patm ${pump.patmBar} bar.`,
    ].join(" ");
  }
  if (tab === "loop") {
    const items = loop.items
      .map((item) => `${item.tag} ${item.kind} NPS ${item.nps} ${item.lengthM} m ΔPclean ${item.dpClean}`)
      .join("; ");
    return [
      `Hydraulic loop ${loop.name}, service ${loop.service}.`,
      `Fluid ${loop.fluidId}, ρ ${loop.density} kg/m³, μ ${loop.viscCp} cP, T ${loop.tempC} °C, Pvap ${loop.pvapKpa} kPa.`,
      `Flow ${loop.flowValue} ${loop.flowUnit}.`,
      `From ${loop.sourceName} ${loop.sourceP} ${loop.pUnit} at ${loop.sourceElev} m to ${loop.destName} ${loop.destP} ${loop.pUnit} at ${loop.destElev} m.`,
      `Pump ${loop.pumpMode}, given ΔP ${loop.givenDp} ${loop.pUnit}, curve ${loop.curve}, η ${loop.etaPump}%, NPSHr ${loop.npshr} m.`,
      `Items: ${items}.`,
    ].join(" ");
  }
  if (tab === "saved") return "Saved cases list. No single line is open.";
  return [
    "Liquid line.",
    `Solve for ${liquid.mode}. Fluid ${liquid.fluidId}, ρ ${liquid.density} kg/m³, μ ${liquid.viscCp} cP, Pvap ${liquid.pvapKpa} kPa.`,
    `Flow ${liquid.flowValue} ${liquid.flowUnit}.`,
    `ID ${liquid.diamValue} ${liquid.diamUnit}, NPS ${liquid.nps} Sch ${liquid.schedule}, ε ${liquid.roughMm} mm, service ${liquid.service}.`,
    `Length ${liquid.lengthValue} ${liquid.lengthUnit}, elevation ${liquid.elevValue} ${liquid.elevUnit}.`,
    `Inlet ${liquid.p1} ${liquid.pUnit}, other pressure ${liquid.p2} ${liquid.pUnit}.`,
    `Machine ${liquid.etaMachine}%, motor ${liquid.etaMotor}%, tariff ${liquid.tariff} USD/kWh. Money is MUSD. CapEx is one time. OpEx is per year.`,
  ].join(" ");
}

export function LineChat({ brief }: { brief: string }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    const history = messages;
    setMessages((list) => [...list, { role: "user", content: question }]);
    setDraft("");
    setError("");
    setBusy(true);
    try {
      const result = await askLine({ data: { question, brief, history } });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setMessages((list) => [...list, { role: "assistant", content: result.text }]);
    } catch {
      setError("Could not reach Grok.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="fixed right-4 bottom-4 z-30 h-12 rounded-full bg-accent px-4 text-sm font-semibold text-accent-ink shadow-lg"
        onClick={() => setOpen(true)}
      >
        Ask Grok
      </button>
      {open ? (
        <div className="fixed inset-0 z-40 flex flex-col bg-bg">
          <header className="flex items-center justify-between gap-3 bg-ink px-4 py-3 text-on-ink">
            <div>
              <p className="font-mono text-xs tracking-widest text-on-ink-dim">LINE SIZING</p>
              <h2 className="text-lg font-semibold">Ask Grok</h2>
            </div>
            <button
              type="button"
              className="h-11 rounded-md border border-on-ink-dim px-3 text-sm"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </header>
          <p className="border-b border-line bg-surface px-4 py-2 text-xs text-muted">
            Answers use the case on this screen. Grok is a check, not the datasheet.
          </p>
          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 ? (
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted">Ask about bore, drop, velocity, pump kW, or the loop.</p>
                {["Is this velocity acceptable?", "What limits the bore?", "Check the pump head."].map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className="h-11 rounded-md border border-line bg-surface px-3 text-left text-sm text-ink"
                    onClick={() => setDraft(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            ) : null}
            {messages.map((msg, index) => (
              <p
                key={index}
                className={
                  "max-w-[90%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm " +
                  (msg.role === "user"
                    ? "ml-auto bg-accent text-accent-ink"
                    : "mr-auto border border-line bg-surface text-ink")
                }
              >
                {msg.content}
              </p>
            ))}
            {busy ? <p className="text-sm text-muted">Reading the case…</p> : null}
            {error ? <p className="text-sm text-warn">{error}</p> : null}
          </div>
          <form
            className="flex gap-2 border-t border-line bg-surface px-4 py-3"
            onSubmit={(event) => {
              event.preventDefault();
              void send(draft);
            }}
          >
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask about this line"
              className="h-12 min-w-0 flex-1 rounded-md border border-line bg-bg px-3 text-sm text-ink outline-none focus:border-accent"
            />
            <button
              type="submit"
              disabled={busy || !draft.trim()}
              className="h-12 shrink-0 rounded-md bg-accent px-4 text-sm font-semibold text-accent-ink disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
