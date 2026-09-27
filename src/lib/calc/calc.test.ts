import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { darcyFriction } from "./friction.ts";
import { evalGasAt, solveGas } from "./gas.ts";
import { evalLiquidAt, solveLiquid } from "./liquid.ts";
import { solvePump } from "./pump.ts";
import { expm1Over, gasDensity, gasFlowToKgS, papayZ } from "./units.ts";
import { electricCompressorW, electricPumpW, optimizeDiameter, sinnottCarbonSteelM } from "./optimum.ts";
import { G, specificGasConstant } from "./units.ts";
import { evalLoop, selectValveBody, sizeLiquidValve, type LoopItemSi } from "./loop.ts";

describe("friction", () => {
  it("matches laminar 64/Re", () => {
    const f = darcyFriction(1000, 0);
    assert.ok(Math.abs(f - 0.064) / 0.064 < 0.02, `f=${f}`);
  });

  it("is near Blasius for smooth turbulent flow", () => {
    const re = 1e5;
    const f = darcyFriction(re, 0);
    const blasius = 0.316 / re ** 0.25;
    assert.ok(Math.abs(f - blasius) / blasius < 0.08, `f=${f} blasius=${blasius}`);
  });
});

describe("liquid", () => {
  it("adds elevation as rho g dz and friction as Darcy", () => {
    const rho = 1000;
    const d = 0.1;
    const q = 0.01;
    const l = 100;
    const mu = 0.001;
    const ev = evalLiquidAt({
      rho,
      mu,
      flowM3s: q,
      diameterM: d,
      lengthM: l,
      elevM: 10,
      roughnessM: 0,
      kMinor: 0,
      p1GaugePa: 5e5,
    });
    assert.equal(ev.ok, true);
    const area = Math.PI * d * d / 4;
    const v = q / area;
    const re = (rho * v * d) / mu;
    const f = darcyFriction(re, 0);
    const dpF = f * (l / d) * rho * v * v / 2;
    assert.ok(Math.abs(ev.dpFrictionPa - dpF) < 1);
    assert.ok(Math.abs(ev.dpStaticPa - rho * G * 10) < 1);
    assert.ok(Math.abs(ev.dpTotalPa - (dpF + rho * G * 10)) < 1);
  });

  it("solves a diameter that meets the allowed drop", () => {
    const known = evalLiquidAt({
      rho: 1000,
      mu: 0.001,
      flowM3s: 0.02,
      diameterM: 0.15,
      lengthM: 400,
      elevM: 5,
      roughnessM: 4.6e-5,
      kMinor: 1.2,
      p1GaugePa: 8e5,
    });
    const solved = solveLiquid({
      mode: "diameter",
      rho: 1000,
      mu: 0.001,
      flowM3s: 0.02,
      diameterM: 0.05,
      lengthM: 400,
      elevM: 5,
      roughnessM: 4.6e-5,
      kMinor: 1.2,
      p1GaugePa: 8e5,
      p2GaugePa: known.p2GaugePa,
    });
    assert.equal(solved.ok, true);
    assert.ok(Math.abs(solved.diameterM - 0.15) < 0.002, `D=${solved.diameterM}`);
  });
});

describe("gas", () => {
  it("recovers the horizontal isothermal balance", () => {
    const d = 0.2;
    const m = 2;
    const l = 1000;
    const z = 0.9;
    const tK = 300;
    const mw = 16.04;
    const mu = 1.1e-5;
    const p1 = 5e6;
    const ev = evalGasAt({
      mw,
      mu,
      z,
      tK,
      gamma: 1.3,
      massKgS: m,
      diameterM: d,
      lengthM: l,
      elevM: 0,
      roughnessM: 4.6e-5,
      kMinor: 0,
      p1AbsPa: p1,
    });
    assert.equal(ev.ok, true);
    const area = Math.PI * d * d / 4;
    const g = m / area;
    const beta = z * (8.314462618 / (mw / 1000)) * tK;
    const fTerm = ev.friction * (l / d) * g * g * beta;
    const p2 = Math.sqrt(p1 * p1 - fTerm);
    assert.ok(Math.abs(ev.p2AbsPa - p2) / p2 < 1e-6);
    assert.ok(Math.abs(expm1Over(0) - 1) < 1e-9);
  });

  it("drops outlet pressure when the line goes uphill", () => {
    const base = {
      mw: 18.8,
      mu: 1.2e-5,
      z: 0.9,
      tK: 310,
      gamma: 1.27,
      massKgS: 8,
      diameterM: 0.25,
      lengthM: 8000,
      roughnessM: 4.6e-5,
      kMinor: 0,
      p1AbsPa: 4e6,
    };
    const flat = evalGasAt({ ...base, elevM: 0 });
    const up = evalGasAt({ ...base, elevM: 200 });
    assert.equal(flat.ok, true);
    assert.equal(up.ok, true);
    assert.ok(up.p2AbsPa < flat.p2AbsPa);
  });

  it("round-trips length", () => {
    const ev = evalGasAt({
      mw: 18.82,
      mu: 1.2e-5,
      z: 0.9,
      tK: 308,
      gamma: 1.27,
      massKgS: 6,
      diameterM: 0.2,
      lengthM: 5000,
      elevM: 20,
      roughnessM: 4.6e-5,
      kMinor: 0.5,
      p1AbsPa: 2.6e6,
    });
    assert.equal(ev.ok, true);
    const solved = solveGas({
      mode: "length",
      mw: 18.82,
      mu: 1.2e-5,
      z: 0.9,
      tK: 308,
      gamma: 1.27,
      massKgS: 6,
      diameterM: 0.2,
      lengthM: 1,
      elevM: 20,
      roughnessM: 4.6e-5,
      kMinor: 0.5,
      p1AbsPa: 2.6e6,
      p2AbsPa: ev.p2AbsPa,
    });
    assert.equal(solved.ok, true);
    assert.ok(Math.abs(solved.lengthM - 5000) / 5000 < 0.01, `L=${solved.lengthM}`);
  });
});

describe("pump", () => {
  it("computes hydraulic power as rho g Q H", () => {
    const ev = solvePump({
      mode: "system",
      rho: 1000,
      flowM3s: 0.01,
      psGaugePa: 0,
      pdGaugePa: 0,
      nozzleElevM: 0,
      suctionM: 0.15,
      dischargeM: 0.1,
      staticLiftM: 20,
      frictionHeadM: 20,
      sourceGaugePa: 0,
      destGaugePa: 0,
      etaPump: 80,
      etaMotor: 100,
      hours: 1000,
      load: 100,
      tariff: 0.3,
      pvapPa: 3000,
      npshrM: 3,
      patmPa: 101325,
    });
    assert.equal(ev.ok, true);
    assert.ok(Math.abs(ev.tdhM - 40) < 1e-9);
    const hyd = 1000 * G * 0.01 * 40;
    assert.ok(Math.abs(ev.hydraulicW - hyd) < 0.01);
    assert.ok(Math.abs(ev.shaftW - hyd / 0.8) < 0.01);
    assert.ok(Math.abs(ev.annualKwh - (ev.electricW / 1000) * 1000) < 0.01);
  });
});

describe("optimum and drivers", () => {
  it("uses the small-pipe Sinnott equation under 225 mm", () => {
    const mass = 10;
    const rho = 1000;
    const expected = 0.664 * mass ** 0.51 * rho ** -0.36;
    assert.ok(expected <= 0.225);
    assert.ok(Math.abs(sinnottCarbonSteelM(mass, rho) - expected) < 1e-12);
  });

  it("switches to the large-pipe Sinnott equation above 225 mm", () => {
    const mass = 100;
    const rho = 1000;
    const small = 0.664 * mass ** 0.51 * rho ** -0.36;
    assert.ok(small > 0.225);
    const expected = 0.534 * mass ** 0.43 * rho ** -0.3;
    assert.ok(Math.abs(sinnottCarbonSteelM(mass, rho) - expected) < 1e-12);
  });

  it("pump electric power is rho g Q H over efficiencies", () => {
    const watts = electricPumpW(1000, 0.01, 40, 80, 100);
    assert.ok(Math.abs(watts - (1000 * G * 0.01 * 40) / 0.8) < 0.01);
    assert.equal(electricPumpW(1000, 0.01, 0, 80, 100), 0);
  });

  it("compressor power matches the isentropic expression", () => {
    const got = electricCompressorW({
      massKgS: 2,
      z: 0.9,
      gamma: 1.3,
      mw: 18,
      tK: 300,
      pSuctionPa: 2e6,
      pDischargePa: 3e6,
      etaIsentropicPct: 75,
      etaDriverPct: 100,
    });
    const ratio = 1.5;
    const specific =
      0.9 * (1.3 / 0.3) * specificGasConstant(18) * 300 * (ratio ** ((1.3 - 1) / 1.3) - 1);
    assert.equal(got.ok, true);
    assert.ok(Math.abs(got.powerW - (2 * specific) / 0.75) / got.powerW < 1e-9);
  });

  it("spends diameter when electricity is the costly part", () => {
    const econ = {
      etaMachine: 100,
      etaMotor: 100,
      hours: 8000,
      load: 100,
      pipeExp: 1.2,
      capitalCharge: 0.2,
    };
    const powerAt = (d: number) => 2e5 / d ** 4;
    const powerDear = optimizeDiameter(200, { ...econ, tariff: 2, pipeCost100: 20 }, powerAt);
    const pipeDear = optimizeDiameter(200, { ...econ, tariff: 0.02, pipeCost100: 4000 }, powerAt);
    assert.ok(powerDear && pipeDear);
    assert.ok(powerDear.diameterM > pipeDear.diameterM);
  });
});

describe("gas helpers", () => {
  it("methane normal density is about 0.72 kg/m3", () => {
    const rho = gasDensity(101325, 273.15, 16.04, 1);
    assert.ok(Math.abs(rho - 0.717) < 0.01, `rho=${rho}`);
  });

  it("converts Nm3/h to mass", () => {
    const kgs = gasFlowToKgS(3600, "nm3h", 16.04, 300, 1, 1e6);
    const rho = gasDensity(101325, 273.15, 16.04, 1);
    assert.ok(Math.abs(kgs - rho) < 1e-6);
  });

  it("estimates a plausible Z for sales gas", () => {
    const z = papayZ(5e6, 300, 0.65);
    assert.ok(z > 0.7 && z < 1.05, `z=${z}`);
  });
});

function loopItem(partial: Partial<LoopItemSi> & Pick<LoopItemSi, "id" | "kind">): LoopItemSi {
  return {
    tag: partial.id,
    lengthM: 0,
    nps: "4",
    schedule: "40",
    elevM: 0,
    fittings: {},
    dpCleanPa: 0,
    foulFactor: 1,
    valveKind: "gate",
    qty: 1,
    valveStyle: "globe",
    fl: 0.9,
    minDpPa: 1e5,
    ...partial,
  };
}

describe("loop", () => {
  it("sizes Kv as Q sqrt(SG/dP) and Cv as Kv/0.865", () => {
    const sized = sizeLiquidValve({
      qM3h: 10,
      dpPa: 1e5,
      rho: 998,
      p1GaugePa: 5e5,
      patmPa: 1.013e5,
      pvapPa: 3000,
      pcPa: 220e5,
      fl: 0.9,
    });
    assert.ok(!sized.choked);
    assert.ok(Math.abs(sized.kv - 10) < 0.05, `kv=${sized.kv}`);
    assert.ok(Math.abs(sized.cv - 10 / 0.865) < 0.05, `cv=${sized.cv}`);
  });

  it("flags choked liquid when the drop exceeds Fl²(P1 − Ff Pv)", () => {
    const sized = sizeLiquidValve({
      qM3h: 50,
      dpPa: 5e5,
      rho: 997,
      p1GaugePa: 1e5,
      patmPa: 1.013e5,
      pvapPa: 0.8e5,
      pcPa: 220e5,
      fl: 0.9,
    });
    assert.ok(sized.choked);
    assert.ok(sized.kv > 40 && sized.kv < 80, `kv=${sized.kv}`);
  });

  it("closes a sized pump on destination pressure and keeps the allocated valve drop", () => {
    const pipe = loopItem({ id: "line", kind: "pipe", lengthM: 80, elevM: 12, nps: "4" });
    const valve = loopItem({ id: "fv", kind: "control", tag: "FV-201", minDpPa: 1e5 });
    const pump = loopItem({ id: "p", kind: "pump", tag: "P-101" });
    const ev = evalLoop({
      rho: 1000,
      mu: 0.001,
      pvapPa: 3000,
      pcPa: 220e5,
      flowM3s: 0.01,
      patmPa: 1.01325e5,
      roughM: 4.6e-5,
      sourcePPa: 0,
      destPPa: 2e5,
      sourceElevM: 0,
      destElevM: 12,
      pumpMode: "size",
      givenDpPa: 0,
      curve: "flat",
      etaPumpPct: 75,
      etaMotorPct: 95,
      npshrM: 3,
      items: [pipe, pump, valve],
    });
    assert.ok(ev.ok, ev.message);
    assert.ok(ev.valve);
    assert.ok(Math.abs(ev.valve.dpPa - 1e5) < 500, `valve=${ev.valve.dpPa}`);
    const last = ev.items[ev.items.length - 1];
    assert.ok(Math.abs(last.pOutPa - 2e5) < 800, `pout=${last.pOutPa}`);
    assert.ok(ev.pumpHeadM > 12);
    assert.ok(ev.pumpKW > 0);
    const clean = ev.cases.find((row) => row.name === "100% clean");
    const fouled = ev.cases.find((row) => row.name === "100% fouled");
    assert.ok(clean && fouled);
    assert.ok(clean.valveDpPa + 1 >= fouled.valveDpPa);
    const body = selectValveBody("globe", ev.valve.cv);
    assert.ok(body.ratedCv >= ev.valve.cv);
  });

  it("reports a short pump when the given head cannot reach the destination", () => {
    const ev = evalLoop({
      rho: 1000,
      mu: 0.001,
      pvapPa: 3000,
      pcPa: 220e5,
      flowM3s: 0.01,
      patmPa: 1.01325e5,
      roughM: 4.6e-5,
      sourcePPa: 0,
      destPPa: 5e5,
      sourceElevM: 0,
      destElevM: 0,
      pumpMode: "given",
      givenDpPa: 0,
      curve: "flat",
      etaPumpPct: 75,
      etaMotorPct: 95,
      npshrM: 3,
      items: [
        loopItem({ id: "p", kind: "pump", tag: "P-101" }),
        loopItem({ id: "line", kind: "pipe", lengthM: 50 }),
        loopItem({ id: "fv", kind: "control", minDpPa: 0.5e5 }),
      ],
    });
    assert.ok(ev.ok);
    assert.equal(ev.delivers, false);
    assert.ok(ev.valve == null);
    assert.ok(ev.warnings.some((line) => line.includes("no positive drop")));
  });
});

