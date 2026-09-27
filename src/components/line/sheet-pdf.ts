import type { PDFFont } from "pdf-lib";
import type { SheetModel } from "./make-sheet";

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 32;
const BOTTOM = 40;

const FALLBACK: Record<string, string> = {
  "ṁ": "m",
  "⁻": "-",
  Δ: "D",
  μ: "u",
  ρ: "r",
  η: "n",
  π: "pi",
  Σ: "S",
};

function sanitize(font: PDFFont, text: string): string {
  const known = new Set(font.getCharacterSet());
  let out = "";
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    if (cp != null && known.has(cp)) out += ch;
    else out += FALLBACK[ch] ?? "";
  }
  return out;
}

function wrap(font: PDFFont, text: string, size: number, maxWidth: number): string[] {
  const clean = sanitize(font, text).replace(/\s+/g, " ").trim();
  if (!clean) return [];
  const lines: string[] = [];
  let line = "";
  const pushWord = (word: string) => {
    if (font.widthOfTextAtSize(word, size) <= maxWidth) {
      line = word;
      return;
    }
    let chunk = "";
    for (const ch of word) {
      const trial = chunk + ch;
      if (font.widthOfTextAtSize(trial, size) <= maxWidth) chunk = trial;
      else {
        if (chunk) lines.push(chunk);
        chunk = ch;
      }
    }
    line = chunk;
  };
  for (const word of clean.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= maxWidth) line = next;
    else {
      if (line) lines.push(line);
      line = "";
      pushWord(word);
    }
  }
  if (line) lines.push(line);
  return lines;
}

export function pdfFileName(lineName: string): string {
  const slug = lineName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `Pipesize-${slug || "line"}.pdf`;
}

export async function captureSketchPng(): Promise<Uint8Array | null> {
  const svg = document.querySelector(".sheet-page svg");
  if (!(svg instanceof SVGSVGElement)) return null;
  const clone = svg.cloneNode(true) as SVGSVGElement;
  paintSvg(svg, clone);
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("width", "1520");
  clone.setAttribute("height", "600");
  const xml = new XMLSerializer().serializeToString(clone);
  const url = URL.createObjectURL(new Blob([xml], { type: "image/svg+xml;charset=utf-8" }));
  try {
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("sketch"));
      img.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = 1520;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "#e6eef1";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob((value) => resolve(value), "image/png"));
    if (!blob) return null;
    return new Uint8Array(await blob.arrayBuffer());
  } catch {
    return null;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function paintSvg(source: Element, clone: Element) {
  if (source instanceof SVGElement && clone instanceof SVGElement) {
    const style = getComputedStyle(source);
    const fill = style.fill;
    const stroke = style.stroke;
    if (fill && fill !== "none") clone.setAttribute("fill", fill);
    if (stroke && stroke !== "none") clone.setAttribute("stroke", stroke);
    if (style.strokeWidth && style.strokeWidth !== "0px") clone.setAttribute("stroke-width", style.strokeWidth);
    if (style.opacity && style.opacity !== "1") clone.setAttribute("opacity", style.opacity);
    if (source.tagName === "text") {
      clone.setAttribute("font-size", style.fontSize || "13px");
      clone.setAttribute("font-family", "sans-serif");
      const anchor = source.getAttribute("text-anchor");
      if (anchor) clone.setAttribute("text-anchor", anchor);
    }
    clone.removeAttribute("class");
  }
  const from = [...source.children];
  const to = [...clone.children];
  for (let i = 0; i < from.length; i++) {
    if (to[i]) paintSvg(from[i], to[i]);
  }
}

async function fontBytes(file: string): Promise<ArrayBuffer> {
  const response = await fetch(file);
  if (!response.ok) throw new Error(`Font ${file} did not load.`);
  return response.arrayBuffer();
}

export async function buildSheetPdf(model: SheetModel, sketchPng: Uint8Array | null): Promise<Uint8Array> {
  const { PDFDocument, rgb } = await import("pdf-lib");
  const fontkitModule = await import("@pdf-lib/fontkit");
  const fontkit = fontkitModule.default ?? fontkitModule;
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const [sansBuf, semiBuf] = await Promise.all([
    fontBytes("/fonts/IBMPlexSans-Regular.ttf"),
    fontBytes("/fonts/IBMPlexSans-SemiBold.ttf"),
  ]);
  const sans = await doc.embedFont(sansBuf, { subset: true });
  const semi = await doc.embedFont(semiBuf, { subset: true });
  const ink = rgb(16 / 255, 32 / 255, 51 / 255);
  const muted = rgb(92 / 255, 109 / 255, 126 / 255);
  const accent = rgb(12 / 255, 107 / 255, 98 / 255);
  const line = rgb(211 / 255, 222 / 255, 230 / 255);
  const paper = rgb(247 / 255, 250 / 255, 251 / 255);
  const sky = rgb(230 / 255, 238 / 255, 241 / 255);
  const width = PAGE_W - MARGIN * 2;

  let page = doc.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - MARGIN;

  const newPage = () => {
    page = doc.addPage([PAGE_W, PAGE_H]);
    y = PAGE_H - MARGIN;
  };
  const ensure = (height: number) => {
    if (y - height < BOTTOM) newPage();
  };
  const text = (value: string, x: number, baseline: number, size: number, font: PDFFont, tint: ReturnType<typeof rgb>) => {
    const clean = sanitize(font, value);
    if (!clean) return;
    page.drawText(clean, { x, y: baseline, size, font, color: tint });
  };
  const paragraph = (value: string, size = 8) => {
    const lines = wrap(sans, value, size, width);
    ensure(lines.length * (size + 3) + 2);
    for (const row of lines) {
      text(row, MARGIN, y, size, sans, muted);
      y -= size + 3;
    }
    y -= 2;
  };

  const blockH = 54;
  page.drawRectangle({ x: MARGIN, y: y - blockH, width, height: blockH, borderWidth: 1.1, borderColor: ink });
  page.drawRectangle({ x: MARGIN, y: y - 16, width, height: 16, color: ink });
  text("HYDRAULIC DATA SHEET", MARGIN + 8, y - 11, 8, semi, paper);
  const brand = "Pipesize App V0";
  text(brand, PAGE_W - MARGIN - 8 - semi.widthOfTextAtSize(brand, 8), y - 11, 8, semi, paper);
  text(model.lineName, MARGIN + 8, y - 32, 12, semi, ink);
  const credit = "By Shital H Gandhi";
  text(credit, PAGE_W - MARGIN - 8 - sans.widthOfTextAtSize(credit, 8), y - 30, 8, sans, ink);
  text(`${model.docNo}   ·   Rev A   ·   ${model.date}`, MARGIN + 8, y - 46, 8, sans, muted);
  const serviceLine = `${model.service}   ·   ${model.fluid}`;
  text(serviceLine, PAGE_W - MARGIN - 8 - sans.widthOfTextAtSize(sanitize(sans, serviceLine), 8), y - 46, 8, sans, muted);
  y -= blockH + 10;

  const boxW = width / Math.max(1, model.kpis.length);
  const boxH = 32;
  ensure(boxH + 8);
  model.kpis.forEach((kpi, index) => {
    const x = MARGIN + index * boxW;
    page.drawRectangle({ x, y: y - boxH, width: boxW, height: boxH, borderWidth: 0.6, borderColor: line, color: paper });
    page.drawRectangle({ x, y: y - 2, width: boxW, height: 2, color: accent });
    text(kpi.k, x + 6, y - 12, 7, sans, muted);
    text(kpi.v, x + 6, y - 25, 10, semi, accent);
  });
  y -= boxH + 10;

  if (sketchPng) {
    const imgH = Math.min(168, width * (300 / 760));
    ensure(imgH + 28);
    const image = await doc.embedPng(sketchPng);
    page.drawRectangle({ x: MARGIN, y: y - imgH, width, height: imgH, borderWidth: 0.6, borderColor: line, color: sky });
    page.drawImage(image, { x: MARGIN, y: y - imgH, width, height: imgH });
    y -= imgH + 6;
  }
  const sketch = model.sketch;
  paragraph(
    `${sketch.fromTitle} ${sketch.fromPressure}  →  ${sketch.toTitle} ${sketch.toPressure}.  ${sketch.boreLabel}.  ${sketch.flowLabel}.  ${sketch.lengthLabel}.  ${sketch.elevLabel}.  ${sketch.powerLabel}.`,
  );

  const band = (label: string) => {
    ensure(16);
    page.drawRectangle({ x: MARGIN, y: y - 13, width, height: 14, color: ink });
    text(label, MARGIN + 6, y - 9, 8, semi, paper);
    y -= 13;
  };
  const fieldRow = (k: string, v: string) => {
    const labelLines = wrap(sans, k, 8, width * 0.4 - 10);
    const valueLines = wrap(sans, v, 8, width * 0.58 - 10);
    const n = Math.max(labelLines.length, valueLines.length, 1);
    const h = n * 11 + 4;
    ensure(h);
    page.drawRectangle({ x: MARGIN, y: y - h, width, height: h, borderWidth: 0.4, borderColor: line, color: paper });
    page.drawLine({
      start: { x: MARGIN + width * 0.42, y },
      end: { x: MARGIN + width * 0.42, y: y - h },
      thickness: 0.4,
      color: line,
    });
    labelLines.forEach((row, index) => text(row, MARGIN + 4, y - 11 - index * 11, 8, sans, muted));
    valueLines.forEach((row, index) => text(row, MARGIN + width * 0.42 + 4, y - 11 - index * 11, 8, sans, ink));
    y -= h;
  };

  for (const section of model.sections) {
    y -= 8;
    band(section.title);
    for (const row of section.rows) fieldRow(row.k, row.v);
  }

  for (const table of model.tables) {
    y -= 8;
    band(table.title);
    const cols = Math.max(1, Math.min(4, table.headers.length));
    const colW = width / cols;
    const drawCells = (cells: string[], strong: boolean) => {
      const wrapped = cells.slice(0, cols).map((cell) => wrap(strong ? semi : sans, cell, 7, colW - 6));
      const n = Math.max(1, ...wrapped.map((lines) => lines.length));
      const h = n * 9 + 4;
      ensure(h);
      page.drawRectangle({
        x: MARGIN,
        y: y - h,
        width,
        height: h,
        borderWidth: 0.4,
        borderColor: line,
        color: strong ? sky : paper,
      });
      wrapped.forEach((lines, index) => {
        lines.forEach((row, lineIndex) => {
          text(row, MARGIN + index * colW + 3, y - 10 - lineIndex * 9, 7, strong ? semi : sans, strong ? muted : ink);
        });
      });
      y -= h;
    };
    drawCells(table.headers, true);
    for (const row of table.rows) {
      drawCells(row, false);
      const extra = row.slice(4).join(" · ");
      if (extra) paragraph(extra, 7);
    }
  }

  y -= 8;
  const notes = [...model.notes];
  if (model.userNote.trim()) {
    for (const line of model.userNote.split(/\n+/)) {
      if (line.trim()) notes.push(line.trim());
    }
  }
  band("Notes");
  notes.forEach((item, index) => paragraph(`${index + 1}.  ${item}`, 8));

  ensure(42);
  y -= 8;
  page.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE_W - MARGIN, y }, thickness: 1, color: ink });
  y -= 14;
  const slots = ["Prepared", "Checked", "Approved"];
  const slotW = width / 3;
  slots.forEach((slot, index) => {
    const x = MARGIN + index * slotW;
    text(slot, x, y, 8, sans, muted);
    page.drawLine({
      start: { x: x + 52, y: y - 1 },
      end: { x: x + slotW - 12, y: y - 1 },
      thickness: 0.6,
      color: ink,
    });
  });

  const pages = doc.getPages();
  pages.forEach((sheet, index) => {
    const footer = `Pipesize App V0  ·  By Shital H Gandhi  ·  not issued for construction  ·  ${index + 1} / ${pages.length}`;
    sheet.drawText(sanitize(sans, footer), {
      x: MARGIN,
      y: 22,
      size: 7,
      font: sans,
      color: muted,
    });
  });

  doc.setTitle(`${model.lineName} — Pipesize App V0`);
  doc.setAuthor("Shital H Gandhi");
  doc.setSubject("Hydraulic data sheet");
  return doc.save();
}

export function pdfBlob(bytes: Uint8Array): Blob {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  const buffer = copy.buffer.slice(0) as ArrayBuffer;
  return new Blob([buffer], { type: "application/pdf" });
}

export function downloadPdf(bytes: Uint8Array, fileName: string) {
  const blob = pdfBlob(bytes);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2500);
  return blob;
}
