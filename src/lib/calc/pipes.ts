export type ScheduleId = "10" | "STD" | "40" | "80";

export type PipeSize = {
  nps: string;
  dn: number;
  odMm: number;
  schedule: ScheduleId;
  wallMm: number;
  idMm: number;
};

type Row = {
  nps: string;
  dn: number;
  od: number;
  s10: number;
  s40: number;
  s80: number;
  std: number | null;
};

/** ASME B36.10M millimetre OD and wall. ID = OD − 2t, rounded to 0.01 mm. */
const BASE_ROWS: Row[] = [
  { nps: "1/2", dn: 15, od: 21.3, s10: 2.11, s40: 2.77, s80: 3.73, std: null },
  { nps: "3/4", dn: 20, od: 26.7, s10: 2.11, s40: 2.87, s80: 3.91, std: null },
  { nps: "1", dn: 25, od: 33.4, s10: 2.77, s40: 3.38, s80: 4.55, std: null },
  { nps: "1-1/4", dn: 32, od: 42.2, s10: 2.77, s40: 3.56, s80: 4.85, std: null },
  { nps: "1-1/2", dn: 40, od: 48.3, s10: 2.77, s40: 3.68, s80: 5.08, std: null },
  { nps: "2", dn: 50, od: 60.3, s10: 2.77, s40: 3.91, s80: 5.54, std: null },
  { nps: "2-1/2", dn: 65, od: 73.0, s10: 3.05, s40: 5.16, s80: 7.01, std: null },
  { nps: "3", dn: 80, od: 88.9, s10: 3.05, s40: 5.49, s80: 7.62, std: null },
  { nps: "3-1/2", dn: 90, od: 101.6, s10: 3.05, s40: 5.74, s80: 8.08, std: null },
  { nps: "4", dn: 100, od: 114.3, s10: 3.05, s40: 6.02, s80: 8.56, std: null },
  { nps: "5", dn: 125, od: 141.3, s10: 3.4, s40: 6.55, s80: 9.53, std: null },
  { nps: "6", dn: 150, od: 168.3, s10: 3.4, s40: 7.11, s80: 10.97, std: null },
  { nps: "8", dn: 200, od: 219.1, s10: 3.76, s40: 8.18, s80: 12.7, std: null },
  { nps: "10", dn: 250, od: 273.0, s10: 4.19, s40: 9.27, s80: 15.09, std: null },
  { nps: "12", dn: 300, od: 323.8, s10: 4.57, s40: 10.31, s80: 17.48, std: 9.53 },
  { nps: "14", dn: 350, od: 355.6, s10: 4.78, s40: 11.13, s80: 19.05, std: 9.53 },
  { nps: "16", dn: 400, od: 406.4, s10: 4.78, s40: 12.7, s80: 21.44, std: 9.53 },
  { nps: "18", dn: 450, od: 457.2, s10: 4.78, s40: 14.27, s80: 23.83, std: 9.53 },
  { nps: "20", dn: 500, od: 508.0, s10: 5.54, s40: 15.09, s80: 26.19, std: 9.53 },
  { nps: "24", dn: 600, od: 609.6, s10: 6.35, s40: 17.48, s80: 30.96, std: 9.53 },
];

/** NPS 24 Schedule 80 / Schedule 40, used so a screen wall stays thicker than Schedule 40. */
const SCH80_OVER_40 = 30.96 / 17.48;
/** NPS 48 Schedule 40 wall / OD. ASME stops at 48 in, so larger sizes follow this ratio. */
const LARGE_T_OVER_OD = 21.44 / 1219.2;

function like40(od: number): number {
  return Math.round(od * LARGE_T_OVER_OD * 100) / 100;
}

function like80(wall40: number): number {
  return Math.round(wall40 * SCH80_OVER_40 * 100) / 100;
}

function largeRows(): Row[] {
  const asme: { nps: string; od: number; s10: number; s40: number }[] = [
    { nps: "26", od: 660.4, s10: 7.92, s40: 12.7 },
    { nps: "30", od: 762.0, s10: 7.92, s40: 15.88 },
    { nps: "32", od: 812.8, s10: 7.92, s40: 17.48 },
    { nps: "36", od: 914.4, s10: 7.92, s40: 19.05 },
    { nps: "42", od: 1066.8, s10: 12.7, s40: 21.44 },
    { nps: "48", od: 1219.2, s10: 12.7, s40: 21.44 },
  ];
  const custom = [50, 60, 72, 84, 100, 120, 150, 200];
  const rows: Row[] = asme.map((size) => ({
    nps: size.nps,
    dn: Number(size.nps) * 25,
    od: size.od,
    s10: size.s10,
    s40: size.s40,
    s80: like80(size.s40),
    std: 9.53,
  }));
  for (const nps of custom) {
    const od = Math.round(nps * 25.4 * 10) / 10;
    const s40 = like40(od);
    rows.push({
      nps: String(nps),
      dn: nps * 25,
      od,
      s10: Math.round(s40 * (12.7 / 21.44) * 100) / 100,
      s40,
      s80: like80(s40),
      std: null,
    });
  }
  return rows;
}

const ROWS: Row[] = [...BASE_ROWS, ...largeRows()];

function idOf(od: number, wall: number): number {
  return Math.round((od - 2 * wall) * 100) / 100;
}

function npsInch(nps: string): number {
  if (nps === "1/2") return 0.5;
  if (nps === "3/4") return 0.75;
  if (nps === "1-1/4") return 1.25;
  if (nps === "1-1/2") return 1.5;
  if (nps === "2-1/2") return 2.5;
  if (nps === "3-1/2") return 3.5;
  return Number(nps);
}

/** ASME B36.10 lists Schedule 40 for these sizes above NPS 24. */
const ASME_SCH40 = new Set(["32", "36", "42", "48"]);

export function scheduleLabel(nps: string, schedule: ScheduleId): string {
  const n = npsInch(nps);
  if (schedule === "10") return "Sch 10";
  if (schedule === "STD") return "STD";
  if (schedule === "40") {
    if (n > 24 && !ASME_SCH40.has(nps)) return "Sch 40 screen";
    return n <= 10 ? "Sch 40 / STD" : "Sch 40";
  }
  if (n > 24) return "Sch 80 screen";
  return n <= 8 ? "Sch 80 / XS" : "Sch 80";
}

export function schedulesFor(nps: string): ScheduleId[] {
  const row = ROWS.find((r) => r.nps === nps);
  if (!row) return ["40"];
  return row.std == null ? ["10", "40", "80"] : ["10", "STD", "40", "80"];
}

export const NPS_OPTIONS = ROWS.map((r) => r.nps);

/** NPS 1 and larger, including line sizes past 24 in. */
export const COMMERCIAL_NPS = ROWS.map((r) => r.nps).filter((nps) => npsInch(nps) >= 1);

export function pipeSize(nps: string, schedule: ScheduleId): PipeSize | null {
  const row = ROWS.find((r) => r.nps === nps);
  if (!row) return null;
  const wall =
    schedule === "10" ? row.s10 : schedule === "40" ? row.s40 : schedule === "80" ? row.s80 : row.std;
  if (wall == null) return null;
  return {
    nps: row.nps,
    dn: row.dn,
    odMm: row.od,
    schedule,
    wallMm: wall,
    idMm: idOf(row.od, wall),
  };
}

export function allPipes(): PipeSize[] {
  const out: PipeSize[] = [];
  for (const row of ROWS) {
    for (const schedule of schedulesFor(row.nps)) {
      const size = pipeSize(row.nps, schedule);
      if (size) out.push(size);
    }
  }
  return out;
}

/** Smallest pipe in each common schedule whose ID meets the required bore. */
export function recommendBores(minIdMm: number): PipeSize[] {
  const picks: PipeSize[] = [];
  for (const schedule of ["10", "STD", "40", "80"] as ScheduleId[]) {
    let best: PipeSize | null = null;
    for (const row of ROWS) {
      if (!schedulesFor(row.nps).includes(schedule)) continue;
      const size = pipeSize(row.nps, schedule);
      if (!size || size.idMm + 0.02 < minIdMm) continue;
      if (!best || size.idMm < best.idMm) best = size;
    }
    if (best && !picks.some((p) => p.nps === best.nps && Math.abs(p.idMm - best.idMm) < 0.05)) {
      picks.push(best);
    }
  }
  return picks;
}
