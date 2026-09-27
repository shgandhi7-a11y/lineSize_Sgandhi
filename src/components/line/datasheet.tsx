import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { sheetPlainText, type SheetModel } from "./make-sheet";
import { PidSketch } from "./pid-sketch";
import { buildSheetPdf, captureSketchPng, downloadPdf, pdfBlob, pdfFileName } from "./sheet-pdf";
import { LineSketch } from "./sketch";

export function Datasheet({
  model,
  onClose,
  onUserNote,
}: {
  model: SheetModel;
  onClose: () => void;
  onUserNote?: (note: string) => void;
}) {
  const [note, setNote] = useState("Download PDF saves an A4 file. Share sends that same file.");
  const [userNote, setUserNote] = useState(model.userNote);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.body.classList.add("print-sheet");
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("print-sheet");
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  function current(): SheetModel {
    return { ...model, userNote };
  }

  async function copyText() {
    try {
      await navigator.clipboard.writeText(sheetPlainText(current()));
      setNote("Data sheet copied.");
    } catch {
      setNote("Copy is blocked in this view. Download the PDF instead.");
    }
  }

  async function build(): Promise<{ bytes: Uint8Array; name: string } | null> {
    setBusy(true);
    setNote("Preparing the A4 PDF…");
    try {
      const sketch = await captureSketchPng();
      const bytes = await buildSheetPdf(current(), sketch);
      return { bytes, name: pdfFileName(model.lineName) };
    } catch {
      setNote("The PDF could not be built. Try again.");
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function onDownload() {
    const made = await build();
    if (!made) return;
    downloadPdf(made.bytes, made.name);
    setNote(`Saved ${made.name}.`);
  }

  async function onShare() {
    const made = await build();
    if (!made) return;
    const file = new File([pdfBlob(made.bytes)], made.name, { type: "application/pdf" });
    if (typeof navigator.share === "function" && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
      try {
        await navigator.share({ files: [file], title: `${model.lineName} — Pipesize App V0` });
        setNote(`Shared ${made.name}.`);
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }
    downloadPdf(made.bytes, made.name);
    setNote(`Saved ${made.name}. Share was not available, so the PDF was downloaded.`);
  }

  const sheet = (
    <div className="datasheet">
      <div className="sheet-toolbar">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-2">
          <button type="button" className="h-11 rounded-md border border-on-ink-dim px-3 text-sm text-on-ink" onClick={onClose}>
            Close
          </button>
          <p className="min-w-0 flex-1 text-sm text-on-ink">A4 data sheet</p>
          <button type="button" className="h-11 rounded-md border border-on-ink-dim px-3 text-sm text-on-ink" onClick={() => void copyText()} disabled={busy}>
            Copy
          </button>
          <button type="button" className="h-11 rounded-md border border-on-ink-dim px-3 text-sm text-on-ink" onClick={() => void onShare()} disabled={busy}>
            Share
          </button>
          <button
            type="button"
            className="h-11 rounded-md bg-accent px-3 text-sm font-medium text-accent-ink disabled:opacity-50"
            onClick={() => void onDownload()}
            disabled={busy}
          >
            {busy ? "Preparing…" : "Download PDF"}
          </button>
        </div>
        <p className="mx-auto mt-2 max-w-3xl text-xs text-on-ink-dim">{note}</p>
      </div>
      <div className="sheet-stage">
        <article className="sheet-page">
          <header className="border-2 border-ink">
            <div className="flex items-start justify-between gap-3 bg-ink px-3 py-2 text-on-ink">
              <div>
                <p className="text-xs tracking-widest">HYDRAULIC DATA SHEET</p>
                <h2 className="mt-1 text-lg font-semibold">{model.lineName}</h2>
              </div>
              <div className="text-right">
                <p className="font-mono text-xs">Pipesize App V0</p>
                <p className="text-xs">By Shital H Gandhi</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
              <TitleCell k="Service" v={model.service} />
              <TitleCell k="Fluid" v={model.fluid} />
              <TitleCell k="Document" v={`${model.docNo} · Rev A`} />
              <TitleCell k="Date" v={model.date} />
            </div>
          </header>

          <div className="sheet-kpis mt-3 grid grid-cols-2 gap-px overflow-hidden border border-ink bg-line sm:grid-cols-4">
            {model.kpis.map((row) => (
              <div key={row.k} className="bg-surface px-2 py-2">
                <p className="text-xs tracking-wide text-muted uppercase">{row.k}</p>
                <p className="mt-1 font-mono text-sm font-medium text-accent">{row.v}</p>
              </div>
            ))}
          </div>

          <figure className="mt-3 border border-ink">
            <div className="overflow-x-auto">
              <div className="min-w-[680px]">
                {model.sketch.scene === "pid" && model.sketch.pid ? (
                  <PidSketch nodes={model.sketch.pid} />
                ) : (
                  <LineSketch sketch={model.sketch} />
                )}
              </div>
            </div>
            <figcaption className="border-t border-ink px-3 py-2">
              <p className="text-sm font-medium text-ink">
                {model.sketch.fromTitle} {model.sketch.fromPressure} → {model.sketch.toTitle} {model.sketch.toPressure}
              </p>
              <p className="mt-1 font-mono text-xs text-muted">
                {model.sketch.boreLabel} · {model.sketch.flowLabel} · {model.sketch.lengthLabel} · {model.sketch.elevLabel} ·{" "}
                {model.sketch.powerLabel}
              </p>
            </figcaption>
          </figure>

          {model.sections.map((section) => (
            <section key={section.title} className="mt-3 border border-ink">
              <h3 className="bg-ink px-2 py-1 text-xs font-medium tracking-wide text-on-ink uppercase">{section.title}</h3>
              <dl>
                {section.rows.map((row) => (
                  <div key={`${section.title}-${row.k}`} className="grid grid-cols-2 gap-2 border-t border-line px-2 py-1 text-xs">
                    <dt className="text-muted">{row.k}</dt>
                    <dd className="text-right font-mono text-ink">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}

          {model.tables.map((table) => (
            <section key={table.title} className="mt-3 border border-ink">
              <h3 className="bg-ink px-2 py-1 text-xs font-medium tracking-wide text-on-ink uppercase">{table.title}</h3>
              {table.title === "Design alternates" ? <AltBars rows={table.rows} /> : null}
              <div className="grid grid-cols-4 gap-1 px-2 py-1 text-xs text-muted">
                {table.headers.slice(0, 4).map((header) => (
                  <span key={header}>{header}</span>
                ))}
              </div>
              <ul>
                {table.rows.map((row, rowIndex) => (
                  <li key={`${row[0]}-${rowIndex}`} className="border-t border-line px-2 py-1">
                    <div className="grid grid-cols-4 gap-1 font-mono text-xs text-ink">
                      {row.slice(0, 4).map((cell, index) => (
                        <span key={`${cell}-${index}`}>{cell}</span>
                      ))}
                    </div>
                    {row.length > 4 ? <p className="mt-1 text-xs text-muted">{row.slice(4).join(" · ")}</p> : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="mt-3 border border-ink">
            <h3 className="bg-ink px-2 py-1 text-xs font-medium tracking-wide text-on-ink uppercase">Notes</h3>
            <ol className="flex flex-col gap-1 px-3 py-2">
              {model.notes.map((line, index) => (
                <li key={line} className="text-xs text-ink">
                  {index + 1}. {line}
                </li>
              ))}
            </ol>
            <label className="block border-t border-line px-3 py-2">
              <span className="text-xs font-medium text-muted">Additional notes</span>
              <textarea
                className="mt-1 min-h-20 w-full rounded-md border border-line bg-surface px-2 py-2 text-sm text-ink outline-none focus:border-accent"
                value={userNote}
                placeholder="Project notes. They are printed on the data sheet."
                onChange={(event) => {
                  setUserNote(event.target.value);
                  onUserNote?.(event.target.value);
                }}
              />
            </label>
          </section>

          <footer className="mt-3 border-t-2 border-ink pt-2">
            <div className="grid grid-cols-3 gap-3 text-xs text-muted">
              <p>
                Prepared
                <span className="mt-4 block border-b border-ink" />
              </p>
              <p>
                Checked
                <span className="mt-4 block border-b border-ink" />
              </p>
              <p>
                Approved
                <span className="mt-4 block border-b border-ink" />
              </p>
            </div>
            <p className="mt-3 text-right text-xs text-muted">Pipesize App V0 · By Shital H Gandhi · Not issued for construction</p>
          </footer>
        </article>
      </div>
    </div>
  );

  return createPortal(sheet, document.body);
}

function AltBars({ rows }: { rows: string[][] }) {
  const values = rows.map((row) => Number(row[3]?.replace(/[^\d.]/g, "")) || 0);
  const max = Math.max(...values, 1);
  return (
    <div className="grid grid-cols-3 gap-2 border-b border-line px-2 py-3">
      {rows.slice(0, 3).map((row, index) => (
        <div key={`${row[0]}-${row[1]}`}>
          <div className="flex h-24 items-end">
            <div
              className={row[0] === "Optimum" ? "w-full bg-accent" : "w-full bg-[#8fb8b3]"}
              style={{ height: `${Math.max(12, (values[index]! / max) * 96)}px` }}
            />
          </div>
          <p className="mt-1 text-xs font-medium text-ink">{row[0]}</p>
          <p className="font-mono text-xs text-muted">NPS {row[1]}</p>
          <p className="font-mono text-xs text-ink">CapEx {row[2]}</p>
          <p className="font-mono text-xs text-ink">OpEx {row[3]}</p>
        </div>
      ))}
    </div>
  );
}

function TitleCell({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-surface px-2 py-1">
      <p className="text-xs text-muted">{k}</p>
      <p className="text-sm text-ink">{v}</p>
    </div>
  );
}
