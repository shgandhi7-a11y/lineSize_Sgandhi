import assert from "node:assert/strict";
import test from "node:test";
import { defaultCost, gasDensity, sizeLine, swameeJain } from "./optimize.ts";

test("methane density at 10 bar and 25 C uses Z = 0.9", () => {
  const rho = gasDensity(16.04, 10, 25);
  assert.ok(Math.abs(rho - 7.19) < 0.05, String(rho));
});

test("swamee-jain is laminar at low Reynolds", () => {
  assert.ok(Math.abs(swameeJain(1000, 4.5e-5, 0.1) - 0.064) < 1e-9);
});

test("medium crude finds a passing economic size", () => {
  const run = sizeLine(defaultCost());
  assert.ok(run.best);
  assert.equal(run.best?.flag, "optimized");
  assert.ok(run.best!.velocityMs <= run.fluid.vMax);
  assert.ok(run.best!.dpBarPerKm <= run.fluid.dpMaxBarPerKm);
  assert.ok(run.rows.some((row) => row.flag === "velocity" || row.flag === "friction" || row.flag === "both" || row.flag === "oversized"));
});

test("zero flow does not crown a size", () => {
  const run = sizeLine({ ...defaultCost(), flowM3h: 0 });
  assert.equal(run.best, null);
  assert.ok(run.rows.every((row) => row.flag === "flow"));
});

test("carbon steel and sulfuric acid warns", () => {
  const run = sizeLine({ ...defaultCost(), fluidId: "h2so4", materialId: "cs" });
  assert.ok(run.warnings.some((line) => line.includes("carbon steel")));
});

test("schedule 80 bore is smaller than schedule 40", () => {
  const a = sizeLine({ ...defaultCost(), schedule: "40" });
  const b = sizeLine({ ...defaultCost(), schedule: "80" });
  const sixA = a.rows.find((row) => row.nps === "6")!;
  const sixB = b.rows.find((row) => row.nps === "6")!;
  assert.ok(sixB.idMm < sixA.idMm);
});
