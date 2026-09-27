import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, n as require_react_dom, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Droplets, i as Gauge, n as Waypoints, o as Bookmark, t as Wind } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Z1NANJGH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var LIQUID_FLUIDS = [
	{
		id: "water25",
		label: "Water 25°C",
		density: 997,
		viscCp: .89,
		pvapKpa: 3.17,
		note: "25°C"
	},
	{
		id: "water40",
		label: "Water 40°C",
		density: 992,
		viscCp: .65,
		pvapKpa: 7.38,
		note: "40°C"
	},
	{
		id: "seawater",
		label: "Seawater",
		density: 1025,
		viscCp: 1.08,
		pvapKpa: 2.3,
		note: "approx 20°C"
	},
	{
		id: "diesel",
		label: "Diesel",
		density: 840,
		viscCp: 3.5,
		pvapKpa: .1,
		note: "approx 15°C"
	},
	{
		id: "gasoline",
		label: "Gasoline",
		density: 740,
		viscCp: .55,
		pvapKpa: 50,
		note: "approx"
	},
	{
		id: "naphtha",
		label: "Naphtha",
		density: 720,
		viscCp: .4,
		pvapKpa: 40,
		note: "approx"
	},
	{
		id: "lightcrude",
		label: "Light crude",
		density: 820,
		viscCp: 5,
		pvapKpa: 20,
		note: "approx"
	},
	{
		id: "medcrude",
		label: "Medium crude",
		density: 880,
		viscCp: 25,
		pvapKpa: 8,
		note: "approx"
	},
	{
		id: "methanol",
		label: "Methanol",
		density: 792,
		viscCp: .59,
		pvapKpa: 12.9,
		note: "20°C"
	},
	{
		id: "meg",
		label: "MEG (pure)",
		density: 1113,
		viscCp: 16,
		pvapKpa: .01,
		note: "approx 25°C"
	},
	{
		id: "benzene",
		label: "Benzene",
		density: 879,
		viscCp: .65,
		pvapKpa: 10,
		note: "20°C"
	},
	{
		id: "vcm",
		label: "VCM liquid",
		density: 911,
		viscCp: .19,
		pvapKpa: 337,
		note: "20°C, VP ~3.37 bar"
	},
	{
		id: "customL",
		label: "Custom liquid",
		density: 997,
		viscCp: 1,
		pvapKpa: 3,
		note: "edit properties"
	}
];
var GAS_FLUIDS = [
	{
		id: "ng",
		label: "Natural gas 0.65",
		mw: 18.82,
		sg: .65,
		viscCp: .012,
		gamma: 1.27,
		z: .9,
		note: "sweet dry, edit Z"
	},
	{
		id: "methane",
		label: "Methane",
		mw: 16.04,
		sg: .554,
		viscCp: .011,
		gamma: 1.31,
		z: .95,
		note: "low P screening"
	},
	{
		id: "ethane",
		label: "Ethane",
		mw: 30.07,
		sg: 1.038,
		viscCp: .0092,
		gamma: 1.19,
		z: .9,
		note: ""
	},
	{
		id: "ethylene",
		label: "Ethylene",
		mw: 28.05,
		sg: .968,
		viscCp: .01,
		gamma: 1.24,
		z: .92,
		note: ""
	},
	{
		id: "propane",
		label: "Propane gas",
		mw: 44.1,
		sg: 1.522,
		viscCp: .008,
		gamma: 1.13,
		z: .85,
		note: ""
	},
	{
		id: "hydrogen",
		label: "Hydrogen",
		mw: 2.016,
		sg: .07,
		viscCp: .0089,
		gamma: 1.41,
		z: 1.01,
		note: "Z often > 1"
	},
	{
		id: "nitrogen",
		label: "Nitrogen",
		mw: 28.01,
		sg: .967,
		viscCp: .0176,
		gamma: 1.4,
		z: .99,
		note: ""
	},
	{
		id: "air",
		label: "Air",
		mw: 28.96,
		sg: 1,
		viscCp: .018,
		gamma: 1.4,
		z: 1,
		note: ""
	},
	{
		id: "co2",
		label: "CO₂",
		mw: 44.01,
		sg: 1.519,
		viscCp: .015,
		gamma: 1.29,
		z: .8,
		note: "Z sensitive"
	},
	{
		id: "ammonia",
		label: "Ammonia gas",
		mw: 17.03,
		sg: .588,
		viscCp: .01,
		gamma: 1.31,
		z: .95,
		note: ""
	},
	{
		id: "vcmg",
		label: "VCM gas",
		mw: 62.5,
		sg: 2.16,
		viscCp: .011,
		gamma: 1.2,
		z: .9,
		note: "approx"
	},
	{
		id: "customG",
		label: "Custom gas",
		mw: 20,
		sg: .7,
		viscCp: .012,
		gamma: 1.3,
		z: .95,
		note: ""
	}
];
var ROUGHNESS = [
	{
		id: "drawn",
		label: "Drawn tube",
		mm: .0015
	},
	{
		id: "ss",
		label: "Stainless",
		mm: .015
	},
	{
		id: "plastic",
		label: "HDPE / GRE",
		mm: .007
	},
	{
		id: "cs",
		label: "Commercial steel",
		mm: .046
	},
	{
		id: "galv",
		label: "Galvanized",
		mm: .15
	},
	{
		id: "iron",
		label: "Cast iron",
		mm: .26
	}
];
var FITTINGS = [
	{
		id: "elbow90lr",
		label: "90° elbow LR",
		k: .45
	},
	{
		id: "elbow90sr",
		label: "90° elbow SR",
		k: .75
	},
	{
		id: "elbow45",
		label: "45° elbow",
		k: .35
	},
	{
		id: "teeRun",
		label: "Tee, through",
		k: .4
	},
	{
		id: "teeBranch",
		label: "Tee, branch",
		k: 1
	},
	{
		id: "gate",
		label: "Gate valve",
		k: .17
	},
	{
		id: "globe",
		label: "Globe valve",
		k: 10
	},
	{
		id: "ball",
		label: "Ball valve",
		k: .05
	},
	{
		id: "check",
		label: "Swing check",
		k: 2
	},
	{
		id: "butterfly",
		label: "Butterfly",
		k: .45
	},
	{
		id: "entrance",
		label: "Sharp entrance",
		k: .5
	},
	{
		id: "exit",
		label: "Exit",
		k: 1
	}
];
function sumK(counts) {
	return FITTINGS.reduce((sum, fit) => sum + (counts[fit.id] ?? 0) * fit.k, 0);
}
/** ASME B36.10M millimetre OD and wall. ID = OD − 2t, rounded to 0.01 mm. */
var ROWS = [
	{
		nps: "1/2",
		dn: 15,
		od: 21.3,
		s10: 2.11,
		s40: 2.77,
		s80: 3.73,
		std: null
	},
	{
		nps: "3/4",
		dn: 20,
		od: 26.7,
		s10: 2.11,
		s40: 2.87,
		s80: 3.91,
		std: null
	},
	{
		nps: "1",
		dn: 25,
		od: 33.4,
		s10: 2.77,
		s40: 3.38,
		s80: 4.55,
		std: null
	},
	{
		nps: "1-1/4",
		dn: 32,
		od: 42.2,
		s10: 2.77,
		s40: 3.56,
		s80: 4.85,
		std: null
	},
	{
		nps: "1-1/2",
		dn: 40,
		od: 48.3,
		s10: 2.77,
		s40: 3.68,
		s80: 5.08,
		std: null
	},
	{
		nps: "2",
		dn: 50,
		od: 60.3,
		s10: 2.77,
		s40: 3.91,
		s80: 5.54,
		std: null
	},
	{
		nps: "2-1/2",
		dn: 65,
		od: 73,
		s10: 3.05,
		s40: 5.16,
		s80: 7.01,
		std: null
	},
	{
		nps: "3",
		dn: 80,
		od: 88.9,
		s10: 3.05,
		s40: 5.49,
		s80: 7.62,
		std: null
	},
	{
		nps: "3-1/2",
		dn: 90,
		od: 101.6,
		s10: 3.05,
		s40: 5.74,
		s80: 8.08,
		std: null
	},
	{
		nps: "4",
		dn: 100,
		od: 114.3,
		s10: 3.05,
		s40: 6.02,
		s80: 8.56,
		std: null
	},
	{
		nps: "5",
		dn: 125,
		od: 141.3,
		s10: 3.4,
		s40: 6.55,
		s80: 9.53,
		std: null
	},
	{
		nps: "6",
		dn: 150,
		od: 168.3,
		s10: 3.4,
		s40: 7.11,
		s80: 10.97,
		std: null
	},
	{
		nps: "8",
		dn: 200,
		od: 219.1,
		s10: 3.76,
		s40: 8.18,
		s80: 12.7,
		std: null
	},
	{
		nps: "10",
		dn: 250,
		od: 273,
		s10: 4.19,
		s40: 9.27,
		s80: 15.09,
		std: null
	},
	{
		nps: "12",
		dn: 300,
		od: 323.8,
		s10: 4.57,
		s40: 10.31,
		s80: 17.48,
		std: 9.53
	},
	{
		nps: "14",
		dn: 350,
		od: 355.6,
		s10: 4.78,
		s40: 11.13,
		s80: 19.05,
		std: 9.53
	},
	{
		nps: "16",
		dn: 400,
		od: 406.4,
		s10: 4.78,
		s40: 12.7,
		s80: 21.44,
		std: 9.53
	},
	{
		nps: "18",
		dn: 450,
		od: 457.2,
		s10: 4.78,
		s40: 14.27,
		s80: 23.83,
		std: 9.53
	},
	{
		nps: "20",
		dn: 500,
		od: 508,
		s10: 5.54,
		s40: 15.09,
		s80: 26.19,
		std: 9.53
	},
	{
		nps: "24",
		dn: 600,
		od: 609.6,
		s10: 6.35,
		s40: 17.48,
		s80: 30.96,
		std: 9.53
	}
];
function idOf(od, wall) {
	return Math.round((od - 2 * wall) * 100) / 100;
}
function npsInch(nps) {
	if (nps === "1/2") return .5;
	if (nps === "3/4") return .75;
	if (nps === "1-1/4") return 1.25;
	if (nps === "1-1/2") return 1.5;
	if (nps === "2-1/2") return 2.5;
	if (nps === "3-1/2") return 3.5;
	return Number(nps);
}
function scheduleLabel(nps, schedule) {
	const n = npsInch(nps);
	if (schedule === "10") return "Sch 10";
	if (schedule === "STD") return "STD";
	if (schedule === "40") return n <= 10 ? "Sch 40 / STD" : "Sch 40";
	return n <= 8 ? "Sch 80 / XS" : "Sch 80";
}
function schedulesFor(nps) {
	const row = ROWS.find((r) => r.nps === nps);
	if (!row) return ["40"];
	return row.std == null ? [
		"10",
		"40",
		"80"
	] : [
		"10",
		"STD",
		"40",
		"80"
	];
}
var NPS_OPTIONS = ROWS.map((r) => r.nps);
function pipeSize(nps, schedule) {
	const row = ROWS.find((r) => r.nps === nps);
	if (!row) return null;
	const wall = schedule === "10" ? row.s10 : schedule === "40" ? row.s40 : schedule === "80" ? row.s80 : row.std;
	if (wall == null) return null;
	return {
		nps: row.nps,
		dn: row.dn,
		odMm: row.od,
		schedule,
		wallMm: wall,
		idMm: idOf(row.od, wall)
	};
}
/** Smallest pipe in each common schedule whose ID meets the required bore. */
function recommendBores(minIdMm) {
	const picks = [];
	for (const schedule of [
		"10",
		"STD",
		"40",
		"80"
	]) {
		let best = null;
		for (const row of ROWS) {
			if (!schedulesFor(row.nps).includes(schedule)) continue;
			const size = pipeSize(row.nps, schedule);
			if (!size || size.idMm + .02 < minIdMm) continue;
			if (!best || size.idMm < best.idMm) best = size;
		}
		if (best && !picks.some((p) => p.nps === best.nps && Math.abs(p.idMm - best.idMm) < .05)) picks.push(best);
	}
	return picks;
}
function parseNum(s) {
	const t = s.trim().replace(/\s/g, "");
	const normalized = t.includes(".") ? t.replace(/,/g, "") : t.replace(",", ".");
	if (normalized === "" || normalized === "-" || normalized === "." || normalized === "-.") return null;
	const n = Number(normalized);
	return Number.isFinite(n) ? n : null;
}
function formatEditable(n) {
	if (!Number.isFinite(n)) return "";
	const ax = Math.abs(n);
	if (ax !== 0 && (ax < 1e-4 || ax >= 1e7)) return n.toExponential(3);
	const digits = ax >= 1e3 ? 2 : ax >= 1 ? 4 : 6;
	return String(Number(n.toFixed(digits)));
}
function num(n, digits = 2) {
	if (!Number.isFinite(n)) return "—";
	const ax = Math.abs(n);
	if (ax !== 0 && ax < .001) return n.toExponential(2);
	const d = ax >= 1e3 ? 1 : ax >= 100 ? 1 : ax >= 10 ? 2 : digits;
	return n.toLocaleString("en-US", {
		maximumFractionDigits: d,
		minimumFractionDigits: 0
	});
}
function pressureUnitLabel(unit) {
	if (unit === "kgcm2") return "kg/cm²";
	return unit;
}
function NumField({ label, value, onChange, suffix, options, option, onOption }) {
	const id = (0, import_react.useId)();
	const [text, setText] = (0, import_react.useState)(() => formatEditable(value));
	const [focus, setFocus] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!focus) setText(formatEditable(value));
	}, [value, focus]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: id,
			className: "mb-1 block text-xs font-medium text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-11 overflow-hidden rounded-md border border-line bg-surface focus-within:border-accent",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id,
				inputMode: "decimal",
				className: "w-full min-w-0 bg-transparent px-3 font-mono text-sm text-ink tabular-nums outline-none",
				value: text,
				onFocus: () => setFocus(true),
				onBlur: () => {
					setFocus(false);
					const n = parseNum(text);
					if (n == null) setText(formatEditable(value));
					else {
						onChange(n);
						setText(formatEditable(n));
					}
				},
				onChange: (e) => {
					setText(e.target.value);
					const n = parseNum(e.target.value);
					if (n != null) onChange(n);
				}
			}), options && onOption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				"aria-label": `${label} unit`,
				className: "max-w-24 border-l border-line bg-inset px-2 text-xs text-ink outline-none",
				value: option,
				onChange: (e) => onOption(e.target.value),
				children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: o.id,
					children: o.label
				}, o.id))
			}) : suffix ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex items-center border-l border-line bg-inset px-2 text-xs text-muted",
				children: suffix
			}) : null]
		})]
	});
}
function Sel({ label, value, onChange, options }) {
	const id = (0, import_react.useId)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: id,
			className: "mb-1 block text-xs font-medium text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			id,
			className: "h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-accent",
			value,
			onChange: (e) => onChange(e.target.value),
			children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: o.id,
				children: o.label
			}, o.id))
		})]
	});
}
function ModeBar({ value, onChange, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-4 gap-1 rounded-md bg-inset p-1",
		children: [
			{
				id: "drop",
				label: "Drop"
			},
			{
				id: "diameter",
				label: "Bore"
			},
			{
				id: "flow",
				label: "Flow"
			},
			{
				id: "length",
				label: "Length"
			}
		].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-pressed": value === m.id,
			className: "min-h-11 rounded-sm text-sm font-medium " + (value === m.id ? "bg-accent text-accent-ink" : "text-muted"),
			onClick: () => onChange(m.id),
			children: m.label
		}, m.id))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2 text-xs text-muted",
		children: hint
	})] });
}
function Metric({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-surface px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-mono text-base font-medium text-ink tabular-nums",
			children: value
		})]
	});
}
function Notes({ items, danger }) {
	if (!items.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-2",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-md px-3 py-2 text-sm " + (danger ? "bg-danger-bg text-danger" : "bg-warn-bg text-warn"),
			children: item
		}, item))
	});
}
function PipeRow({ nps, schedule, onPick }) {
	const schedules = schedulesFor(nps);
	const safe = schedules.includes(schedule) ? schedule : schedules[0];
	const size = pipeSize(nps, safe);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-2 gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sel, {
			label: "Standard pipe",
			value: nps,
			onChange: (id) => {
				const next = schedulesFor(id);
				onPick(id, next.includes(schedule) ? schedule : next.includes("40") ? "40" : next[0]);
			},
			options: NPS_OPTIONS.map((id) => ({
				id,
				label: `NPS ${id}`
			}))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sel, {
			label: size ? `ID ${num(size.idMm, 2)} mm` : "Schedule",
			value: safe,
			onChange: (id) => onPick(nps, id),
			options: schedules.map((id) => ({
				id,
				label: scheduleLabel(nps, id)
			}))
		})]
	});
}
function RoughRow({ roughId, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sel, {
		label: "Pipe roughness",
		value: roughId,
		onChange: (id) => {
			const row = ROUGHNESS.find((r) => r.id === id);
			if (row) onChange(row.id, row.mm);
		},
		options: ROUGHNESS.map((r) => ({
			id: r.id,
			label: `${r.label} · ${r.mm} mm`
		}))
	});
}
function FittingsBlock({ counts, onChange }) {
	const k = sumK(counts);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "rounded-lg border border-line bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
			className: "min-h-11 cursor-pointer px-4 py-3 text-sm font-medium text-ink",
			children: [
				"Fittings · ΣK ",
				num(k, 2),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-xs font-normal text-muted",
					children: "Turbulent loss coefficients for screening. Not Crane 2K/3K."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-1 px-3 pb-3",
			children: FITTINGS.map((fit) => {
				const count = counts[fit.id] ?? 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm text-ink",
						children: [fit.label, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [" · K ", fit.k]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 w-11 rounded-md bg-inset text-lg text-ink",
								onClick: () => onChange({
									...counts,
									[fit.id]: Math.max(0, count - 1)
								}),
								"aria-label": `Fewer ${fit.label}`,
								children: "−"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-8 text-center font-mono text-sm tabular-nums",
								children: count
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 w-11 rounded-md bg-inset text-lg text-ink",
								onClick: () => onChange({
									...counts,
									[fit.id]: count + 1
								}),
								"aria-label": `More ${fit.label}`,
								children: "+"
							})
						]
					})]
				}, fit.id);
			})
		})]
	});
}
function SaveBar({ name, onName, onSave }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				"aria-label": "Case name",
				className: "h-11 min-w-0 flex-1 rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-accent",
				value: name,
				onChange: (e) => onName(e.target.value)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "h-11 shrink-0 rounded-md bg-accent px-4 text-sm font-medium text-accent-ink",
				onClick: onSave,
				children: "Save"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: "Saved on this phone. The working case is kept automatically too."
		})]
	});
}
function VariantTable({ title, note, headers, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-line bg-surface p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide text-muted uppercase",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 mb-2 text-xs text-muted",
				children: note
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-1 px-1 text-xs text-muted",
				children: headers.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: i === 0 ? "text-left" : "text-right",
					children: h
				}, h))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "grid grid-cols-4 gap-1 border-t border-line px-1 py-2 font-mono text-xs tabular-nums " + (row.active ? "bg-inset text-ink" : "text-ink"),
				children: row.cells.map((cell, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: i === 0 ? "text-left" : "text-right",
					children: cell
				}, headers[i]))
			}, row.key)) })
		]
	});
}
/** Darcy friction factor, Churchill (1977). Valid from laminar through rough turbulent. */
function darcyFriction(re, relRough) {
	if (!Number.isFinite(re) || re <= 0) return NaN;
	const rr = Math.max(0, relRough);
	const arg = (7 / re) ** .9 + .27 * rr;
	const a = (2.457 * Math.log(1 / (arg > 0 ? arg : 1e-18))) ** 16;
	const b = (37530 / re) ** 16;
	return 8 * ((8 / re) ** 12 + 1 / (a + b) ** 1.5) ** (1 / 12);
}
function regimeOf(re) {
	if (re < 2300) return "laminar";
	if (re < 4e3) return "transitional";
	return "turbulent";
}
var G = 9.80665;
var R_UNIV = 8.314462618;
var BAR_PA = 1e5;
var ATM_BAR = 1.01325;
var PSI_PA = 6894.757293168;
var KGCM2_PA = 98066.5;
var PRESSURE_UNITS = [
	{
		id: "bar",
		label: "bar"
	},
	{
		id: "kPa",
		label: "kPa"
	},
	{
		id: "psi",
		label: "psi"
	},
	{
		id: "kgcm2",
		label: "kg/cm²"
	}
];
var DIAM_UNITS = [{
	id: "mm",
	label: "mm"
}, {
	id: "in",
	label: "in"
}];
var LENGTH_UNITS = [
	{
		id: "m",
		label: "m"
	},
	{
		id: "km",
		label: "km"
	},
	{
		id: "ft",
		label: "ft"
	}
];
var LIQUID_FLOW_UNITS = [
	{
		id: "m3h",
		label: "m³/h"
	},
	{
		id: "ls",
		label: "L/s"
	},
	{
		id: "lmin",
		label: "L/min"
	},
	{
		id: "m3s",
		label: "m³/s"
	},
	{
		id: "gpm",
		label: "gpm"
	},
	{
		id: "bblh",
		label: "bbl/h"
	},
	{
		id: "kgh",
		label: "kg/h"
	}
];
var GAS_FLOW_UNITS = [
	{
		id: "nm3h",
		label: "Nm³/h"
	},
	{
		id: "sm3h",
		label: "Sm³/h"
	},
	{
		id: "mmscfd",
		label: "MMSCFD"
	},
	{
		id: "kgh",
		label: "kg/h"
	},
	{
		id: "th",
		label: "t/h"
	},
	{
		id: "am3h",
		label: "am³/h"
	}
];
function pressureToPa(value, unit) {
	switch (unit) {
		case "bar": return value * BAR_PA;
		case "kPa": return value * 1e3;
		case "psi": return value * PSI_PA;
		case "kgcm2": return value * KGCM2_PA;
	}
}
function paToPressure(pa, unit) {
	switch (unit) {
		case "bar": return pa / BAR_PA;
		case "kPa": return pa / 1e3;
		case "psi": return pa / PSI_PA;
		case "kgcm2": return pa / KGCM2_PA;
	}
}
function diamToM(value, unit) {
	return unit === "mm" ? value / 1e3 : value * .0254;
}
function mToDiam(m, unit) {
	return unit === "mm" ? m * 1e3 : m / .0254;
}
function lengthToM(value, unit) {
	switch (unit) {
		case "m": return value;
		case "km": return value * 1e3;
		case "ft": return value * .3048;
	}
}
function mToLength(m, unit) {
	switch (unit) {
		case "m": return m;
		case "km": return m / 1e3;
		case "ft": return m / .3048;
	}
}
function convertPressure(value, from, to) {
	return paToPressure(pressureToPa(value, from), to);
}
function convertDiam(value, from, to) {
	return mToDiam(diamToM(value, from), to);
}
function convertLength(value, from, to) {
	return mToLength(lengthToM(value, from), to);
}
function liquidFlowToM3s(value, unit, rho) {
	switch (unit) {
		case "m3h": return value / 3600;
		case "ls": return value / 1e3;
		case "lmin": return value / 6e4;
		case "m3s": return value;
		case "gpm": return value * .003785411784 / 60;
		case "bblh": return value * .158987294928 / 3600;
		case "kgh": return rho > 0 ? value / 3600 / rho : NaN;
	}
}
function m3sToLiquidFlow(q, unit, rho) {
	switch (unit) {
		case "m3h": return q * 3600;
		case "ls": return q * 1e3;
		case "lmin": return q * 6e4;
		case "m3s": return q;
		case "gpm": return q * 60 / .003785411784;
		case "bblh": return q * 3600 / .158987294928;
		case "kgh": return q * 3600 * rho;
	}
}
var TN = 273.15;
var PN = ATM_BAR * BAR_PA;
var TS = 288.15;
var TSCF = 28 * (5 / 9) + 273.15;
var PSCF = 14.696 * PSI_PA;
function gasDensity(pPa, tK, mw, z) {
	if (pPa <= 0 || tK <= 0 || mw <= 0 || z <= 0) return NaN;
	return pPa * (mw / 1e3) / (z * R_UNIV * tK);
}
function gasFlowToKgS(value, unit, mw, tK, z, pInPa) {
	switch (unit) {
		case "kgh": return value / 3600;
		case "th": return value * 1e3 / 3600;
		case "nm3h": return value / 3600 * gasDensity(PN, TN, mw, 1);
		case "sm3h": return value / 3600 * gasDensity(PN, TS, mw, 1);
		case "mmscfd": return value * 1e6 * .028316846592 / 86400 * gasDensity(PSCF, TSCF, mw, 1);
		case "am3h": return value / 3600 * gasDensity(pInPa, tK, mw, z);
	}
}
function kgSToGasFlow(kgs, unit, mw, tK, z, pInPa) {
	switch (unit) {
		case "kgh": return kgs * 3600;
		case "th": return kgs * 3600 / 1e3;
		case "nm3h": return kgs / gasDensity(PN, TN, mw, 1) * 3600;
		case "sm3h": return kgs / gasDensity(PN, TS, mw, 1) * 3600;
		case "mmscfd": return kgs / gasDensity(PSCF, TSCF, mw, 1) * 86400 / 28316.846592;
		case "am3h": return kgs / gasDensity(pInPa, tK, mw, z) * 3600;
	}
}
function specificGasConstant(mw) {
	return R_UNIV / (mw / 1e3);
}
/** (e^s − 1) / s, with a stable limit of 1 at s = 0. */
function expm1Over(s) {
	if (Math.abs(s) < 1e-4) return 1 + s / 2 + s * s / 6 + s * s * s / 24;
	return Math.expm1(s) / s;
}
/**
* Papay compressibility for sweet dry natural gas.
* Pseudocriticals: Standing. Valid as a screening estimate only.
*/
function papayZ(pPa, tK, sg) {
	if (sg <= 0 || tK <= 0 || pPa <= 0) return NaN;
	const tpcR = 169.2 + 349.5 * sg - 74 * sg * sg;
	const ppcPsia = 756.8 - 131 * sg - 3.6 * sg * sg;
	const tpr = tK * 1.8 / tpcR;
	const ppr = pPa / PSI_PA / ppcPsia;
	if (tpr <= 0) return NaN;
	const z = 1 - 3.52 * ppr / 10 ** (.9813 * tpr) + .274 * ppr * ppr / 10 ** (.8157 * tpr);
	return Math.min(1.6, Math.max(.2, z));
}
var FAIL$2 = (message) => ({
	ok: false,
	message,
	diameterM: 0,
	flowM3s: 0,
	lengthM: 0,
	velocity: 0,
	re: 0,
	friction: 0,
	regime: "turbulent",
	kMinor: 0,
	dpFrictionPa: 0,
	dpMinorPa: 0,
	dpStaticPa: 0,
	dpTotalPa: 0,
	headFrictionM: 0,
	headMinorM: 0,
	headStaticM: 0,
	headTotalM: 0,
	p2GaugePa: 0,
	profile: []
});
function evalLiquidAt(input) {
	const { rho, mu, flowM3s: q, diameterM: d, lengthM: l, elevM, roughnessM, kMinor, p1GaugePa } = input;
	if (!(rho > 0) || !(mu > 0)) return FAIL$2("Density and viscosity must be positive.");
	if (!(q > 0)) return FAIL$2("Flow must be positive.");
	if (!(d > 0)) return FAIL$2("Diameter must be positive.");
	if (!(l >= 0)) return FAIL$2("Length cannot be negative.");
	const velocity = q / (Math.PI * d * d / 4);
	const re = rho * velocity * d / mu;
	const friction = darcyFriction(re, roughnessM / d);
	if (!Number.isFinite(friction) || friction <= 0) return FAIL$2("Friction factor did not converge.");
	const dyn = rho * velocity * velocity / 2;
	const dpFrictionPa = friction * (l / d) * dyn;
	const dpMinorPa = kMinor * dyn;
	const dpStaticPa = rho * G * elevM;
	const dpTotalPa = dpFrictionPa + dpMinorPa + dpStaticPa;
	const head = (pa) => pa / (rho * G);
	const steps = 24;
	const profile = [];
	for (let i = 0; i <= steps; i++) {
		const x = l * i / steps;
		const kAt = l > 0 ? kMinor * (x / l) : 0;
		const dp = friction * (x / d) * dyn + kAt * dyn + rho * G * (l > 0 ? elevM * x / l : 0);
		profile.push({
			xM: x,
			pGaugePa: p1GaugePa - dp
		});
	}
	return {
		ok: true,
		message: "",
		diameterM: d,
		flowM3s: q,
		lengthM: l,
		velocity,
		re,
		friction,
		regime: regimeOf(re),
		kMinor,
		dpFrictionPa,
		dpMinorPa,
		dpStaticPa,
		dpTotalPa,
		headFrictionM: head(dpFrictionPa),
		headMinorM: head(dpMinorPa),
		headStaticM: elevM,
		headTotalM: head(dpTotalPa),
		p2GaugePa: p1GaugePa - dpTotalPa,
		profile
	};
}
function solveDiameter$1(req) {
	const target = req.p1GaugePa - req.p2GaugePa;
	if (target <= req.rho * 9.80665 * req.elevM + 1) return FAIL$2("Available pressure does not cover the elevation head. Friction would have to be negative.");
	const at = (d) => evalLiquidAt({
		...req,
		diameterM: d,
		flowM3s: req.flowM3s,
		lengthM: req.lengthM
	});
	let lo = .008;
	let hi = 2.5;
	const hiEval = at(hi);
	if (!hiEval.ok) return hiEval;
	if (hiEval.dpTotalPa > target) return FAIL$2("Even a 2.5 m bore exceeds the allowed pressure drop. Check flow, length or pressures.");
	for (let i = 0; i < 56; i++) {
		const mid = (lo + hi) / 2;
		const ev = at(mid);
		if (!ev.ok || ev.dpTotalPa > target) lo = mid;
		else hi = mid;
	}
	return at(hi);
}
function solveFlow$1(req) {
	const target = req.p1GaugePa - req.p2GaugePa;
	const at = (q) => evalLiquidAt({
		...req,
		flowM3s: q,
		diameterM: req.diameterM,
		lengthM: req.lengthM
	});
	let lo = 1e-6;
	let hi = 2;
	let guard = 0;
	while (guard < 20) {
		const ev = at(hi);
		if (!ev.ok) return ev;
		if (ev.dpTotalPa >= target) break;
		hi *= 2;
		guard += 1;
		if (hi > 100) return FAIL$2("Allowed pressure drop is not reached even at a very high flow.");
	}
	for (let i = 0; i < 56; i++) {
		const mid = (lo + hi) / 2;
		const ev = at(mid);
		if (!ev.ok || ev.dpTotalPa > target) hi = mid;
		else lo = mid;
	}
	return at(lo);
}
function solveLength$1(req) {
	const probe = evalLiquidAt({
		...req,
		lengthM: 1
	});
	if (!probe.ok) return probe;
	const target = req.p1GaugePa - req.p2GaugePa;
	const dyn = req.rho * probe.velocity * probe.velocity / 2;
	const available = target - req.rho * G * req.elevM;
	if (available <= 0) return FAIL$2("Elevation head already uses the full pressure difference.");
	const group = available / dyn - req.kMinor;
	if (group <= 0) return FAIL$2("Fitting losses alone exceed the pressure left after elevation.");
	const lengthM = group * req.diameterM / probe.friction;
	return evalLiquidAt({
		...req,
		lengthM
	});
}
function solveLiquid(req) {
	if (!(req.rho > 0) || !(req.mu > 0)) return FAIL$2("Density and viscosity must be positive.");
	if (req.mode === "drop") return evalLiquidAt({
		rho: req.rho,
		mu: req.mu,
		flowM3s: req.flowM3s,
		diameterM: req.diameterM,
		lengthM: req.lengthM,
		elevM: req.elevM,
		roughnessM: req.roughnessM,
		kMinor: req.kMinor,
		p1GaugePa: req.p1GaugePa
	});
	if (!(req.lengthM > 0) && req.mode !== "length") return FAIL$2("Length must be positive.");
	if (req.mode === "diameter") {
		if (!(req.flowM3s > 0)) return FAIL$2("Flow must be positive.");
		return solveDiameter$1(req);
	}
	if (req.mode === "flow") {
		if (!(req.diameterM > 0)) return FAIL$2("Diameter must be positive.");
		return solveFlow$1(req);
	}
	if (!(req.flowM3s > 0) || !(req.diameterM > 0)) return FAIL$2("Flow and diameter must be positive.");
	return solveLength$1(req);
}
var SERVICE_BANDS = [
	{
		id: "process",
		label: "Process liquid",
		min: 1,
		max: 3
	},
	{
		id: "suction",
		label: "Pump suction",
		min: .6,
		max: 1.5
	},
	{
		id: "discharge",
		label: "Pump discharge",
		min: 1.5,
		max: 3.5
	}
];
function liquidWarnings(ev, serviceId) {
	if (!ev.ok) return [];
	const notes = [];
	const band = SERVICE_BANDS.find((s) => s.id === serviceId) ?? SERVICE_BANDS[0];
	if (ev.velocity < band.min) notes.push(`Velocity ${ev.velocity.toFixed(2)} m/s is below the ${band.label.toLowerCase()} band (${band.min}–${band.max} m/s).`);
	else if (ev.velocity > band.max) notes.push(`Velocity ${ev.velocity.toFixed(2)} m/s is above the ${band.label.toLowerCase()} band (${band.min}–${band.max} m/s).`);
	if (ev.regime === "laminar") notes.push("Laminar flow. Friction is 64/Re; do not use turbulent rules of thumb.");
	if (ev.regime === "transitional") notes.push("Transitional Reynolds number. Friction is less certain here.");
	if (ev.p2GaugePa < -2e4) notes.push("Outlet pressure is below atmospheric. Check for vacuum or a siphon break.");
	return notes;
}
/** Installed cost per metre. cost100 is the price at 100 mm inside diameter. */
function pipeCostPerM(diameterM, cost100, exponent) {
	if (!(diameterM > 0) || !(cost100 >= 0) || !Number.isFinite(exponent)) return 0;
	return cost100 * (diameterM * 1e3 / 100) ** exponent;
}
function annualSplit(powerW, diameterM, lengthM, econ) {
	const duty = Math.min(1.5, Math.max(0, econ.load / 100));
	const energyAnnual = Math.max(0, powerW) / 1e3 * Math.max(0, econ.hours) * duty * Math.max(0, econ.tariff);
	const pipeAnnual = pipeCostPerM(diameterM, Math.max(0, econ.pipeCost100), econ.pipeExp) * Math.max(0, lengthM) * Math.max(0, econ.capitalCharge);
	return {
		pipeAnnual,
		energyAnnual,
		totalAnnual: pipeAnnual + energyAnnual
	};
}
/** Electric power to pump a liquid through a line of this total head. Watts. */
function electricPumpW(rho, flowM3s, headM, etaPumpPct, etaMotorPct) {
	if (!(rho > 0) || !(flowM3s > 0) || !(headM > 0)) return 0;
	if (!(etaPumpPct > 0) || !(etaMotorPct > 0)) return NaN;
	return rho * G * flowM3s * headM / (etaPumpPct / 100) / (etaMotorPct / 100);
}
/**
* Electric power for an isentropic compressor.
* Suction and discharge are absolute. Returns 0 when the ratio is 1 or less.
*/
function electricCompressorW(input) {
	const { massKgS, z, gamma, mw, tK, pSuctionPa, pDischargePa, etaIsentropicPct, etaDriverPct } = input;
	if (!(massKgS > 0) || !(z > 0) || !(gamma > 1.01) || !(mw > 1) || !(tK > 0)) return {
		ok: false,
		powerW: 0,
		ratio: 0
	};
	if (!(etaIsentropicPct > 0) || !(etaDriverPct > 0) || !(pSuctionPa > 0) || !(pDischargePa > 0)) return {
		ok: false,
		powerW: 0,
		ratio: 0
	};
	const ratio = pDischargePa / pSuctionPa;
	if (ratio <= 1) return {
		ok: true,
		powerW: 0,
		ratio
	};
	const exponent = (gamma - 1) / gamma;
	const powerW = massKgS * (z * (gamma / (gamma - 1)) * specificGasConstant(mw) * tK * (ratio ** exponent - 1)) / (etaIsentropicPct / 100) / (etaDriverPct / 100);
	return {
		ok: Number.isFinite(powerW),
		powerW,
		ratio
	};
}
/**
* Towler & Sinnott carbon-steel screen for in-plant pumped liquids, turbulent flow.
* Diameter in metres. G in kg/s, density in kg/m³.
* Viscosity is already folded into the constant (about 0.1–10 cP). Not for gas or alloy pipe.
*/
function sinnottCarbonSteelM(massKgS, rho) {
	if (!(massKgS > 0) || !(rho > 0)) return NaN;
	const small = .664 * massKgS ** .51 * rho ** -.36;
	if (small <= .225) return small;
	return .534 * massKgS ** .43 * rho ** -.3;
}
/**
* Diameter that minimises pipe capital charge plus driver energy.
* powerAt returns electric watts, or null if that bore cannot pass the flow.
*/
function optimizeDiameter(lengthM, econ, powerAt) {
	const lo = .025;
	const hi = 1.2;
	const coarse = [];
	const steps = 48;
	for (let i = 0; i <= steps; i++) {
		const d = lo * (hi / lo) ** (i / steps);
		const powerW = powerAt(d);
		if (powerW == null || !Number.isFinite(powerW)) continue;
		coarse.push({
			d,
			powerW,
			total: annualSplit(powerW, d, lengthM, econ).totalAnnual
		});
	}
	if (!coarse.length) return null;
	let best = coarse[0];
	for (const point of coarse) if (point.total < best.total) best = point;
	const idx = coarse.indexOf(best);
	const left = coarse[Math.max(0, idx - 1)].d;
	const right = coarse[Math.min(coarse.length - 1, idx + 1)].d;
	for (let i = 0; i <= 20; i++) {
		const d = left + (right - left) * i / 20;
		const powerW = powerAt(d);
		if (powerW == null || !Number.isFinite(powerW)) continue;
		const total = annualSplit(powerW, d, lengthM, econ).totalAnnual;
		if (total < best.total) best = {
			d,
			powerW,
			total
		};
	}
	const edge = best.d <= lo * 1.04 ? "low" : best.d >= hi * .96 ? "high" : null;
	return {
		diameterM: best.d,
		powerW: best.powerW,
		annual: annualSplit(best.powerW, best.d, lengthM, econ),
		edge
	};
}
var VALVE_K = {
	gate: .17,
	globe: 10,
	ball: .05,
	butterfly: .45,
	plug: .9,
	check: 2
};
/** Typical full-open Cv. A screen, not a vendor catalog. */
var CATALOG = {
	globe: [
		{
			nps: "1",
			cv: 12
		},
		{
			nps: "1-1/2",
			cv: 28
		},
		{
			nps: "2",
			cv: 46
		},
		{
			nps: "3",
			cv: 110
		},
		{
			nps: "4",
			cv: 195
		},
		{
			nps: "6",
			cv: 450
		},
		{
			nps: "8",
			cv: 780
		},
		{
			nps: "10",
			cv: 1200
		},
		{
			nps: "12",
			cv: 1800
		}
	],
	ball: [
		{
			nps: "1",
			cv: 45
		},
		{
			nps: "1-1/2",
			cv: 90
		},
		{
			nps: "2",
			cv: 160
		},
		{
			nps: "3",
			cv: 370
		},
		{
			nps: "4",
			cv: 650
		},
		{
			nps: "6",
			cv: 1400
		},
		{
			nps: "8",
			cv: 2500
		},
		{
			nps: "10",
			cv: 3900
		},
		{
			nps: "12",
			cv: 5500
		}
	]
};
var RANGEABILITY = 50;
var ITEM_KINDS = [
	{
		id: "pipe",
		label: "Pipe"
	},
	{
		id: "pump",
		label: "Pump"
	},
	{
		id: "control",
		label: "Control valve"
	},
	{
		id: "valve",
		label: "Isolation valve"
	},
	{
		id: "check",
		label: "Check valve"
	},
	{
		id: "strainer",
		label: "Strainer"
	},
	{
		id: "exchanger",
		label: "Exchanger"
	},
	{
		id: "meter",
		label: "Flow element"
	},
	{
		id: "orifice",
		label: "Restriction orifice"
	},
	{
		id: "mixer",
		label: "Static mixer"
	}
];
var FAIL$1 = (message) => ({
	ok: false,
	message,
	pumpDpPa: 0,
	pumpHeadM: 0,
	pumpKW: 0,
	hydraulicKW: 0,
	npshaM: 0,
	npshMarginM: 0,
	staticPa: 0,
	dynamicPa: 0,
	valve: null,
	items: [],
	cases: [],
	warnings: [],
	hasPump: false,
	delivers: false
});
function boreM(nps, schedule) {
	const idMm = (pipeSize(nps, schedule) ?? pipeSize(nps, "40") ?? pipeSize("4", "40"))?.idMm ?? 102.26;
	return {
		idM: idMm / 1e3,
		idMm
	};
}
function partOf(item, q, qDesign, fouled, rho, mu, roughM) {
	const elevPa = rho * G * item.elevM;
	const { idM, idMm } = boreM(item.nps, item.schedule);
	if (item.kind === "pump" || item.kind === "control") return {
		dynamicPa: 0,
		elevPa,
		velocity: 0,
		idMm
	};
	if (item.kind === "pipe") {
		const ev = evalLiquidAt({
			rho,
			mu,
			flowM3s: q,
			diameterM: idM,
			lengthM: Math.max(0, item.lengthM),
			elevM: item.elevM,
			roughnessM: roughM,
			kMinor: sumK(item.fittings),
			p1GaugePa: 0
		});
		if (!ev.ok) return {
			dynamicPa: 0,
			elevPa,
			velocity: 0,
			idMm
		};
		return {
			dynamicPa: ev.dpFrictionPa + ev.dpMinorPa,
			elevPa: ev.dpStaticPa,
			velocity: ev.velocity,
			idMm
		};
	}
	if (item.kind === "valve" || item.kind === "check") {
		const k = (item.kind === "check" ? VALVE_K.check : VALVE_K[item.valveKind] ?? .2) * Math.max(1, item.qty);
		const area = Math.PI * idM * idM / 4;
		const velocity = area > 0 ? q / area : 0;
		return {
			dynamicPa: k * rho * velocity * velocity * .5,
			elevPa,
			velocity,
			idMm
		};
	}
	const factor = fouled ? Math.max(0, item.foulFactor) : 1;
	const scale = qDesign > 0 ? (q / qDesign) ** 2 : 1;
	const area = Math.PI * idM * idM / 4;
	const velocity = area > 0 ? q / area : 0;
	return {
		dynamicPa: Math.max(0, item.dpCleanPa) * factor * scale,
		elevPa,
		velocity,
		idMm
	};
}
/** Liquid control-valve screen, IEC 60534 with Fp = 1. Kv is m³/h and bar. */
function sizeLiquidValve(input) {
	const sg = input.rho > 0 ? input.rho / 998 : 1;
	const dpBar = input.dpPa / BAR_PA;
	const p1AbsBar = (input.p1GaugePa + input.patmPa) / BAR_PA;
	const pvBar = Math.max(0, input.pvapPa) / BAR_PA;
	const pcBar = Math.max(0, input.pcPa) / BAR_PA;
	let ff = .96;
	if (pcBar > 0 && pvBar > 0 && pvBar < pcBar) ff = .96 - .28 * Math.sqrt(pvBar / pcBar);
	const fl = input.fl > 0 ? input.fl : .9;
	const dpChokeBar = fl ** 2 * Math.max(0, p1AbsBar - ff * pvBar);
	const choked = dpChokeBar > 0 && dpBar > dpChokeBar + 1e-6;
	const used = choked ? dpChokeBar : dpBar;
	if (!(used > 0) || !(sg > 0) || !(input.qM3h > 0)) return {
		kv: 0,
		cv: 0,
		choked,
		dpChokePa: dpChokeBar * BAR_PA,
		sg
	};
	let kv = input.qM3h * Math.sqrt(sg / used);
	if (choked) kv /= fl;
	return {
		kv,
		cv: kv / .865,
		choked,
		dpChokePa: dpChokeBar * BAR_PA,
		sg
	};
}
function selectValveBody(style, cvDesign) {
	const table = CATALOG[style];
	const need = cvDesign > 0 ? cvDesign / RANGEABILITY ** -.30000000000000004 : 0;
	const found = table.find((row) => row.cv + 1e-6 >= need) ?? table[table.length - 1];
	const travel = cvDesign > 0 && found.cv > 0 ? 1 + Math.log(cvDesign / found.cv) / Math.log(RANGEABILITY) : 0;
	return {
		nps: found.nps,
		ratedCv: found.cv,
		travel,
		short: found.cv + 1e-6 < need
	};
}
function curveFactor(curve, frac) {
	if (curve === "flat") return 1;
	const q = Math.max(0, frac);
	return 1.12 - .12 * q * q;
}
function evalLoop(req) {
	const { rho, mu, flowM3s: qd } = req;
	if (!(rho > 0) || !(mu > 0)) return FAIL$1("Density and viscosity must be positive.");
	if (!(qd > 0)) return FAIL$1("Flow must be positive.");
	if (!req.items.length) return FAIL$1("Add pipe or equipment to the loop.");
	const hasPump = req.items.some((item) => item.kind === "pump");
	const valveItem = req.items.find((item) => item.kind === "control") ?? null;
	const fixedAt = (q, fouled) => {
		let dynamic = 0;
		let elev = 0;
		const parts = /* @__PURE__ */ new Map();
		for (const item of req.items) {
			const part = partOf(item, q, qd, fouled, rho, mu, req.roughM);
			parts.set(item.id, part);
			elev += part.elevPa;
			if (item.kind !== "pump" && item.kind !== "control") dynamic += part.dynamicPa;
		}
		return {
			dynamic,
			elev,
			parts,
			total: dynamic + elev
		};
	};
	const design = fixedAt(qd, true);
	const alloc = valveItem ? Math.max(0, valveItem.minDpPa) : 0;
	let pumpDp = 0;
	let valveDp = 0;
	if (hasPump && req.pumpMode === "size") {
		pumpDp = req.destPPa - req.sourcePPa + design.total + alloc;
		valveDp = alloc;
		if (pumpDp < 0) {
			pumpDp = 0;
			valveDp = valveItem ? req.sourcePPa - req.destPPa - design.total : 0;
		}
	} else if (hasPump && req.pumpMode === "given") {
		pumpDp = req.givenDpPa;
		valveDp = valveItem ? req.sourcePPa + pumpDp - req.destPPa - design.total : 0;
	} else {
		pumpDp = 0;
		valveDp = valveItem ? req.sourcePPa - req.destPPa - design.total : 0;
	}
	const delivers = !valveItem || valveDp >= -200;
	let p = req.sourcePPa;
	let suctionP = req.sourcePPa;
	let suctionV = 0;
	let seenPump = false;
	const items = [];
	for (const item of req.items) {
		const part = design.parts.get(item.id) ?? {
			dynamicPa: 0,
			elevPa: 0,
			velocity: 0,
			idMm: 0
		};
		let drop = part.dynamicPa + part.elevPa;
		if (item.kind === "pump") drop = -pumpDp + part.elevPa;
		if (item.kind === "control") drop = Math.max(0, valveDp) + part.elevPa;
		const pIn = p;
		const pOut = p - drop;
		if (!seenPump && item.kind !== "pump") {
			suctionP = pOut;
			if (part.velocity > 0) suctionV = part.velocity;
		}
		if (item.kind === "pump") seenPump = true;
		items.push({
			id: item.id,
			tag: item.tag,
			kind: item.kind,
			pInPa: pIn,
			pOutPa: pOut,
			dpPa: pIn - pOut,
			dynamicPa: item.kind === "control" ? Math.max(0, valveDp) : item.kind === "pump" ? -pumpDp : part.dynamicPa,
			elevM: item.elevM,
			velocity: part.velocity,
			idMm: part.idMm
		});
		p = pOut;
	}
	const valveRow = valveItem ? items.find((row) => row.id === valveItem.id) ?? null : null;
	let valve = null;
	if (valveItem && valveRow && valveDp > 200) {
		const sized = sizeLiquidValve({
			qM3h: qd * 3600,
			dpPa: valveDp,
			rho,
			p1GaugePa: valveRow.pInPa,
			patmPa: req.patmPa,
			pvapPa: req.pvapPa,
			pcPa: req.pcPa,
			fl: valveItem.fl
		});
		const body = selectValveBody(valveItem.valveStyle, sized.cv);
		const denom = valveDp + design.dynamic;
		valve = {
			...sized,
			tag: valveItem.tag,
			dpPa: valveDp,
			p1Pa: valveRow.pInPa,
			p2Pa: valveRow.pOutPa,
			authority: denom > 0 ? valveDp / denom : 0,
			style: valveItem.valveStyle,
			nps: body.nps,
			ratedCv: body.ratedCv,
			travel: body.travel,
			fl: valveItem.fl > 0 ? valveItem.fl : .9,
			short: body.short
		};
	}
	const headM = pumpDp > 0 ? pumpDp / (rho * G) : 0;
	const hydraulicW = pumpDp > 0 ? rho * G * qd * headM : 0;
	const electricW = electricPumpW(rho, qd, headM, req.etaPumpPct, req.etaMotorPct);
	const npshaM = seenPump ? (suctionP + req.patmPa - req.pvapPa) / (rho * G) + suctionV * suctionV / (2 * G) : 0;
	const npshMarginM = seenPump ? npshaM - req.npshrM : 0;
	const caseOf = (name, frac, fouled) => {
		const q = qd * frac;
		const fixed = fixedAt(q, fouled);
		const pDp = hasPump ? pumpDp * curveFactor(req.curve, frac) : 0;
		const vDp = valveItem ? req.sourcePPa + pDp - req.destPPa - fixed.total : 0;
		const kw = pDp > 0 ? electricPumpW(rho, q, pDp / (rho * G), req.etaPumpPct, req.etaMotorPct) / 1e3 : 0;
		let kvNeed = 0;
		if (valveItem && vDp > 200) {
			const rowP1 = valve?.p1Pa ?? req.sourcePPa;
			kvNeed = sizeLiquidValve({
				qM3h: q * 3600,
				dpPa: vDp,
				rho,
				p1GaugePa: rowP1,
				patmPa: req.patmPa,
				pvapPa: req.pvapPa,
				pcPa: req.pcPa,
				fl: valveItem.fl
			}).kv;
		}
		return {
			name,
			flowFrac: frac,
			fouled,
			pumpDpPa: pDp,
			valveDpPa: vDp,
			kvNeed,
			pumpKW: kw,
			delivers: !valveItem || vDp >= -200
		};
	};
	const cases = [
		caseOf("100% fouled", 1, true),
		caseOf("100% clean", 1, false),
		caseOf("120% fouled", 1.2, true),
		caseOf("140% fouled", 1.4, true),
		caseOf("60% clean", .6, false)
	];
	const warnings = [];
	if (hasPump && req.pumpMode === "size" && pumpDp <= 0) warnings.push("The source pressure covers the destination without a pump. Pump differential is zero.");
	if (valveItem && valveDp < -200) warnings.push("The control valve has no positive drop. The pump head, or the source pressure, does not cover this loop.");
	else if (valveItem && alloc > 0 && valveDp + 500 < alloc && req.pumpMode === "given") warnings.push("Valve drop is below the minimum set on the control valve.");
	if (valve?.choked) warnings.push("The control valve is in choked liquid flow at the design drop. Confirm the size with the vendor.");
	if (valve && valve.authority < .25) warnings.push("Valve authority is under 0.25. Equal percentage is the usual choice. Most of the drop is in the line, not the valve.");
	if (valve && valve.authority > .75) warnings.push("Valve authority is above 0.75. The valve is taking most of the dynamic drop.");
	if (valve?.short) warnings.push("Design Cv is above the largest body in the screening table. Use a larger valve or a higher design drop.");
	const maxCase = cases.find((row) => row.name === "140% fouled");
	if (valveItem && maxCase && !maxCase.delivers) warnings.push("At 140% flow, fouled, the residual valve drop is gone. Destination pressure will not hold.");
	else if (valve && maxCase && maxCase.kvNeed > valve.ratedCv) warnings.push("At 140% flow the required Cv is above the screened full-open Cv.");
	if (seenPump && npshMarginM < 0) warnings.push(`NPSHa is ${Math.abs(npshMarginM).toFixed(1)} m below NPSHr on the fouled suction.`);
	const rise = req.items.reduce((sum, item) => sum + item.elevM, 0);
	if (Math.abs(rise - (req.destElevM - req.sourceElevM)) > .5) warnings.push("Item rises do not match destination elevation minus source elevation. Static head uses the sum of the item rises.");
	if (!(req.pcPa > 0)) warnings.push("Critical pressure is not set. The choke check uses a liquid critical-pressure factor of 0.96.");
	for (const row of items) if (row.kind === "pipe" && row.velocity > 4.5) {
		warnings.push(`${row.tag} velocity is ${row.velocity.toFixed(1)} m/s. That is high for an ordinary process liquid.`);
		break;
	}
	return {
		ok: true,
		message: "",
		pumpDpPa: pumpDp,
		pumpHeadM: headM,
		pumpKW: Number.isFinite(electricW) ? electricW / 1e3 : 0,
		hydraulicKW: hydraulicW / 1e3,
		npshaM,
		npshMarginM,
		staticPa: design.elev,
		dynamicPa: design.dynamic,
		valve,
		items,
		cases,
		warnings: warnings.slice(0, 6),
		hasPump,
		delivers
	};
}
var MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];
function today() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}
function labelOf(list, id) {
	return list.find((item) => item.id === id)?.label ?? id;
}
function sci(n) {
	if (!Number.isFinite(n)) return "—";
	const ax = Math.abs(n);
	if (ax !== 0 && (ax >= 1e4 || ax < .01)) return n.toExponential(2);
	return num(n, 3);
}
function signed(m, unit) {
	const shown = mToLength(m, unit);
	return `${shown > 0 ? "+" : ""}${num(shown)} ${labelOf(LENGTH_UNITS, unit)}`;
}
function fittingBits(counts) {
	const parts = [];
	let valves = 0;
	for (const fit of FITTINGS) {
		const n = counts[fit.id] ?? 0;
		if (n <= 0) continue;
		parts.push(`${n} × ${fit.label}`);
		if (fit.id === "gate" || fit.id === "globe" || fit.id === "ball" || fit.id === "check" || fit.id === "butterfly") valves += n;
	}
	return {
		text: parts.join(", ") || "None",
		valves
	};
}
function selectedPipe(nps, schedule, mode, idMm) {
	if (mode === "diameter") return {
		line: "Solved minimum bore",
		odMm: null
	};
	const size = pipeSize(nps, schedule);
	if (!size) return {
		line: "Custom bore",
		odMm: null
	};
	const mismatch = Math.abs(size.idMm - idMm) > .15;
	return {
		line: `NPS ${size.nps} · ${scheduleLabel(size.nps, size.schedule)}${mismatch ? " · diameter edited" : ""}`,
		odMm: mismatch ? null : size.odMm
	};
}
function commercialSection(diameterM, powerW, lengthM, state, optimum, sinnottMm) {
	const rows = [];
	const add = (label, d, w) => {
		const split = annualSplit(w, d, lengthM, {
			etaMachine: state.etaMachine,
			etaMotor: state.etaMotor,
			hours: state.hours,
			load: state.load,
			tariff: state.tariff,
			pipeCost100: state.pipeCost100,
			pipeExp: state.pipeExp,
			capitalCharge: state.capitalCharge
		});
		rows.push({
			k: `${label} bore`,
			v: `${num(d * 1e3, 1)} mm`
		}, {
			k: `${label} power`,
			v: `${num(w / 1e3)} kW`
		}, {
			k: `${label} annual cost`,
			v: `${num(split.totalAnnual, 0)} ${state.currency}/y`
		}, {
			k: `${label} pipe charge`,
			v: `${num(split.pipeAnnual, 0)} ${state.currency}/y`
		}, {
			k: `${label} power charge`,
			v: `${num(split.energyAnnual, 0)} ${state.currency}/y`
		});
	};
	add("Selected", diameterM, powerW);
	if (optimum) add("Economic", optimum.diameterM, optimum.powerW);
	if (sinnottMm != null && Number.isFinite(sinnottMm)) rows.push({
		k: "Sinnott carbon-steel screen",
		v: `${num(sinnottMm, 0)} mm`
	});
	return {
		title: "Commercial screen",
		rows
	};
}
function flowTable(title, variants) {
	if (!variants || !variants.rows.length) return [];
	return [{
		title,
		headers: variants.headers,
		rows: variants.rows
	}];
}
function makeLiquidSheet(input) {
	const { state, result } = input;
	const unit = pressureUnitLabel(state.pUnit);
	const p = (pa) => `${num(paToPressure(pa, state.pUnit))} ${unit}`;
	const idMm = result.diameterM * 1e3;
	const pipe = selectedPipe(state.nps, state.schedule, state.mode, idMm);
	const fits = fittingBits(state.fittings);
	const rough = ROUGHNESS.find((row) => row.id === state.roughId);
	const band = SERVICE_BANDS.find((row) => row.id === state.service) ?? SERVICE_BANDS[0];
	const fluid = LIQUID_FLUIDS.find((row) => row.id === state.fluidId)?.label ?? "Liquid";
	const flow = `${num(m3sToLiquidFlow(result.flowM3s, state.flowUnit, state.density))} ${labelOf(LIQUID_FLOW_UNITS, state.flowUnit)}`;
	const lengthLabel = `${num(mToLength(result.lengthM, state.lengthUnit))} ${labelOf(LENGTH_UNITS, state.lengthUnit)}`;
	const elevLabel = signed(result.headStaticM, state.elevUnit);
	const scene = result.lengthM >= 800 ? "line" : "plant";
	return {
		lineName: input.name.trim() || "Liquid line",
		service: "Liquid line",
		fluid,
		date: today(),
		docNo: "DS-LIQ",
		userNote: state.sheetNote,
		kpis: [
			{
				k: "Pressure drop",
				v: p(result.dpTotalPa)
			},
			{
				k: "Outlet",
				v: p(result.p2GaugePa)
			},
			{
				k: "Velocity",
				v: `${num(result.velocity)} m/s`
			},
			{
				k: "Pump",
				v: `${num(input.pumpW / 1e3)} kW`
			}
		],
		sections: [
			{
				title: "1  Process properties",
				rows: [
					{
						k: "Fluid",
						v: fluid
					},
					{
						k: "Flow",
						v: flow
					},
					{
						k: "Mass flow",
						v: `${num(result.flowM3s * state.density * 3600)} kg/h`
					},
					{
						k: "Density",
						v: `${num(state.density, 1)} kg/m³`
					},
					{
						k: "Viscosity",
						v: `${num(state.viscCp, 3)} cP`
					},
					{
						k: "Vapour pressure",
						v: `${num(state.pvapKpa, 2)} kPa abs`
					}
				]
			},
			{
				title: "2  Line data",
				rows: [
					{
						k: "Pipe",
						v: pipe.line
					},
					{
						k: "Inside diameter",
						v: `${num(idMm, 2)} mm`
					},
					{
						k: "Outside diameter",
						v: pipe.odMm ? `${num(pipe.odMm, 1)} mm` : "—"
					},
					{
						k: "Length",
						v: `${lengthLabel} (${num(result.lengthM)} m)`
					},
					{
						k: "Elevation",
						v: `${elevLabel} (${num(result.headStaticM)} m)`
					},
					{
						k: "Inlet, gauge",
						v: `${num(state.p1)} ${unit}`
					},
					{
						k: "Roughness",
						v: `${rough?.label ?? "Custom"} · ${num(state.roughMm, 3)} mm`
					},
					{
						k: "Fittings",
						v: fits.text
					},
					{
						k: "Fitting loss coefficient",
						v: num(input.k, 2)
					},
					{
						k: "Velocity band",
						v: `${band.label} ${band.min}–${band.max} m/s`
					}
				]
			},
			{
				title: "3  Hydraulic results",
				rows: [
					{
						k: "Pressure drop",
						v: p(result.dpTotalPa)
					},
					{
						k: "Outlet, gauge",
						v: p(result.p2GaugePa)
					},
					{
						k: "Velocity",
						v: `${num(result.velocity)} m/s`
					},
					{
						k: "Reynolds number",
						v: sci(result.re)
					},
					{
						k: "Darcy friction factor",
						v: result.friction.toFixed(4)
					},
					{
						k: "Flow regime",
						v: result.regime
					},
					{
						k: "Friction drop",
						v: p(result.dpFrictionPa)
					},
					{
						k: "Fittings drop",
						v: p(result.dpMinorPa)
					},
					{
						k: "Elevation drop",
						v: p(result.dpStaticPa)
					},
					{
						k: "Total head",
						v: `${num(result.headTotalM)} m`
					},
					{
						k: "Pump electric power",
						v: `${num(input.pumpW / 1e3)} kW`
					},
					{
						k: "Pump efficiency",
						v: `${num(state.etaMachine, 0)}%`
					},
					{
						k: "Motor efficiency",
						v: `${num(state.etaMotor, 0)}%`
					},
					{
						k: "Duty",
						v: `${num(state.hours, 0)} h/y · ${num(state.load, 0)}% · ${num(state.tariff, 2)} ${state.currency}/kWh`
					}
				]
			},
			commercialSection(result.diameterM, input.pumpW, result.lengthM, state, input.optimum, input.sinnottMm)
		],
		tables: flowTable("4  Flow cases", input.variants),
		notes: [
			"Darcy–Weisbach line. Friction factor is Churchill (1977). Pump power is the electric power for the whole line, including lift and fittings.",
			"The sketch shows how the line sits. Vertical scale is stretched. A break in the pipe means the drawing is not to length.",
			"Sinnott bore, where shown, is the Towler and Sinnott carbon-steel liquid screen. It ignores the tariff. Not for gas, slurry or alloy pipe.",
			...input.warnings.slice(0, 3),
			"Properties are the values entered for this case. Screening study. Not issued for construction."
		],
		sketch: {
			scene,
			driver: "pump",
			showDriver: input.pumpW > 50,
			broken: scene === "line" || result.lengthM >= 40,
			lengthLabel,
			elevLabel,
			boreLabel: pipe.odMm ? `${pipe.line} · ID ${num(idMm, 1)} mm` : `ID ${num(idMm, 1)} mm`,
			flowLabel: flow,
			powerLabel: `${num(input.pumpW / 1e3)} kW`,
			fromTitle: scene === "line" ? "Inlet" : "Source",
			toTitle: scene === "line" ? "Delivery" : "Destination",
			fromPressure: `${num(state.p1)} ${unit}`,
			toPressure: p(result.p2GaugePa),
			elevM: result.headStaticM,
			idMm,
			odMm: pipe.odMm,
			valves: fits.valves > 0 ? 1 : 0,
			pressures: result.profile.map((pt) => paToPressure(pt.pGaugePa, state.pUnit)),
			plate: null
		}
	};
}
function makeGasSheet(input) {
	const { state, result } = input;
	const unit = pressureUnitLabel(state.pUnit);
	const patm = state.patmBar * BAR_PA;
	const pGauge = (abs) => `${num(paToPressure(abs - patm, state.pUnit))} ${unit}`;
	const idMm = result.diameterM * 1e3;
	const pipe = selectedPipe(state.nps, state.schedule, state.mode, idMm);
	const fits = fittingBits(state.fittings);
	const rough = ROUGHNESS.find((row) => row.id === state.roughId);
	const tK = state.tempC + 273.15;
	const rs = specificGasConstant(state.mw);
	const flow = `${num(kgSToGasFlow(result.massKgS, state.flowUnit, state.mw, tK, state.z, result.p1AbsPa))} ${labelOf(GAS_FLOW_UNITS, state.flowUnit)}`;
	const lengthLabel = `${num(mToLength(result.lengthM, state.lengthUnit))} ${labelOf(LENGTH_UNITS, state.lengthUnit)}`;
	const elevLabel = signed(input.elevM, state.elevUnit);
	const scene = result.lengthM >= 800 ? "line" : "plant";
	const ratio = input.ratio > 1 ? input.ratio : result.p2AbsPa > 0 ? result.p1AbsPa / result.p2AbsPa : 0;
	const fluid = GAS_FLUIDS.find((row) => row.id === state.fluidId)?.label ?? "Gas";
	return {
		lineName: input.name.trim() || "Gas line",
		service: "Gas line",
		fluid,
		date: today(),
		docNo: "DS-GAS",
		userNote: state.sheetNote,
		kpis: [
			{
				k: "Outlet",
				v: pGauge(result.p2AbsPa)
			},
			{
				k: "Drop",
				v: `${num(paToPressure(result.dpPa, state.pUnit))} ${unit}`
			},
			{
				k: "Outlet velocity",
				v: `${num(result.vOut)} m/s`
			},
			{
				k: "Compressor",
				v: `${num(input.compressorW / 1e3)} kW`
			}
		],
		sections: [
			{
				title: "1  Process properties",
				rows: [
					{
						k: "Fluid",
						v: fluid
					},
					{
						k: "Flow",
						v: flow
					},
					{
						k: "Mass flow",
						v: `${num(result.massKgS * 3600)} kg/h`
					},
					{
						k: "Molecular weight",
						v: num(state.mw, 2)
					},
					{
						k: "Specific gravity",
						v: num(state.sg, 3)
					},
					{
						k: "Temperature",
						v: `${num(state.tempC, 1)} °C`
					},
					{
						k: "Compressibility Z",
						v: num(state.z, 3)
					},
					{
						k: "Isentropic exponent",
						v: num(state.gamma, 3)
					},
					{
						k: "Viscosity",
						v: `${num(state.viscCp, 4)} cP`
					},
					{
						k: "Specific gas constant",
						v: `${num(rs, 1)} J/kg·K`
					}
				]
			},
			{
				title: "2  Line data",
				rows: [
					{
						k: "Pipe",
						v: pipe.line
					},
					{
						k: "Inside diameter",
						v: `${num(idMm, 2)} mm`
					},
					{
						k: "Outside diameter",
						v: pipe.odMm ? `${num(pipe.odMm, 1)} mm` : "—"
					},
					{
						k: "Length",
						v: `${lengthLabel} (${num(result.lengthM)} m)`
					},
					{
						k: "Elevation",
						v: `${elevLabel} (${num(input.elevM)} m)`
					},
					{
						k: "Inlet, gauge",
						v: `${num(state.p1)} ${unit}`
					},
					{
						k: "Atmosphere",
						v: `${num(state.patmBar, 3)} bar abs`
					},
					{
						k: "Roughness",
						v: `${rough?.label ?? "Custom"} · ${num(state.roughMm, 3)} mm`
					},
					{
						k: "Fittings",
						v: fits.text
					},
					{
						k: "Fitting loss coefficient",
						v: num(input.k, 2)
					}
				]
			},
			{
				title: "3  Hydraulic results",
				rows: [
					{
						k: "Outlet, gauge",
						v: pGauge(result.p2AbsPa)
					},
					{
						k: "Pressure drop",
						v: `${num(paToPressure(result.dpPa, state.pUnit))} ${unit}`
					},
					{
						k: "Inlet density",
						v: `${num(result.rhoIn, 2)} kg/m³`
					},
					{
						k: "Outlet density",
						v: `${num(result.rhoOut, 2)} kg/m³`
					},
					{
						k: "Inlet velocity",
						v: `${num(result.vIn)} m/s`
					},
					{
						k: "Outlet velocity",
						v: `${num(result.vOut)} m/s`
					},
					{
						k: "Outlet Mach",
						v: num(result.machOut, 3)
					},
					{
						k: "Erosional velocity",
						v: `${num(result.erosional)} m/s`
					},
					{
						k: "Reynolds number",
						v: sci(result.re)
					},
					{
						k: "Darcy friction factor",
						v: result.friction.toFixed(4)
					},
					{
						k: "Flow regime",
						v: result.regime
					},
					{
						k: "Compressor electric power",
						v: `${num(input.compressorW / 1e3)} kW`
					},
					{
						k: "Pressure ratio",
						v: ratio > 1 ? num(ratio, 3) : "1 or less"
					},
					{
						k: "Isentropic efficiency",
						v: `${num(state.etaMachine, 0)}%`
					},
					{
						k: "Driver efficiency",
						v: `${num(state.etaMotor, 0)}%`
					}
				]
			},
			commercialSection(result.diameterM, input.compressorW, result.lengthM, state, input.optimum, null)
		],
		tables: flowTable("4  Flow cases", input.variants),
		notes: [
			"Isothermal gas line with elevation. Kinetic energy is neglected. Not for choked flow. Compressibility is the value entered.",
			"Compressor power is the electric power to restore line outlet pressure to line inlet pressure. Suction temperature is the line temperature.",
			"Erosional velocity is the API RP 14E screen with c = 100.",
			"The sketch shows the station, the run, and delivery. Vertical scale is stretched. A break means the drawing is not to length.",
			...input.warnings.slice(0, 3),
			"Screening study. Not issued for construction."
		],
		sketch: {
			scene,
			driver: "compressor",
			showDriver: input.compressorW > 50,
			broken: true,
			lengthLabel,
			elevLabel,
			boreLabel: pipe.odMm ? `${pipe.line} · ID ${num(idMm, 1)} mm` : `ID ${num(idMm, 1)} mm`,
			flowLabel: flow,
			powerLabel: `${num(input.compressorW / 1e3)} kW`,
			fromTitle: "Inlet",
			toTitle: "Delivery",
			fromPressure: `${num(state.p1)} ${unit}`,
			toPressure: pGauge(result.p2AbsPa),
			elevM: input.elevM,
			idMm,
			odMm: pipe.odMm,
			valves: fits.valves > 0 ? 1 : 0,
			pressures: result.profile.map((pt) => paToPressure(pt.pAbsPa - patm, state.pUnit)),
			plate: null
		}
	};
}
function makePumpSheet(input) {
	const { state, result } = input;
	const unit = pressureUnitLabel(state.pUnit);
	const flow = `${num(m3sToLiquidFlow(input.flowM3s, state.flowUnit, state.density))} ${labelOf(LIQUID_FLOW_UNITS, state.flowUnit)}`;
	const elevM = state.mode === "nozzle" ? state.nozzleElev : state.staticLift;
	const fromP = state.mode === "nozzle" ? state.ps : state.sourceP;
	const toP = state.mode === "nozzle" ? state.pd : state.destP;
	const headRows = state.mode === "nozzle" ? [
		{
			k: "Pressure head",
			v: `${num(result.pressureM)} m`
		},
		{
			k: "Nozzle elevation",
			v: `${num(result.staticM)} m`
		},
		{
			k: "Velocity head",
			v: `${num(result.velocityM, 3)} m`
		}
	] : [
		{
			k: "Static lift",
			v: `${num(result.staticM)} m`
		},
		{
			k: "Friction head",
			v: `${num(result.frictionM)} m`
		},
		{
			k: "Tank pressure head",
			v: `${num(result.pressureM)} m`
		}
	];
	const warnings = [result.message, result.npshMarginM < 0 ? `NPSHa is ${num(Math.abs(result.npshMarginM))} m below NPSHr.` : ""].filter(Boolean);
	return {
		lineName: input.name.trim() || "Pump duty",
		service: state.mode === "nozzle" ? "Pump · nozzle gauges" : "Pump · system head",
		fluid: `${num(state.density, 0)} kg/m³`,
		date: today(),
		docNo: "DS-PMP",
		userNote: state.sheetNote,
		kpis: [
			{
				k: "Total head",
				v: `${num(result.tdhM)} m`
			},
			{
				k: "Electric",
				v: `${num(result.electricW / 1e3)} kW`
			},
			{
				k: "NPSHa",
				v: `${num(result.npshaM)} m`
			},
			{
				k: "Annual",
				v: `${num(result.annualCost, 0)} ${state.currency}`
			}
		],
		sections: [{
			title: "1  Duty data",
			rows: [
				{
					k: "Flow",
					v: flow
				},
				{
					k: "Density",
					v: `${num(state.density, 1)} kg/m³`
				},
				{
					k: "Suction inside diameter",
					v: `${num(state.suctionMm, 1)} mm`
				},
				{
					k: "Discharge inside diameter",
					v: `${num(state.dischargeMm, 1)} mm`
				},
				{
					k: state.mode === "nozzle" ? "Suction gauge" : "Source gauge",
					v: `${num(fromP)} ${unit}`
				},
				{
					k: state.mode === "nozzle" ? "Discharge gauge" : "Destination gauge",
					v: `${num(toP)} ${unit}`
				},
				{
					k: "Elevation",
					v: `${elevM > 0 ? "+" : ""}${num(elevM)} m`
				},
				{
					k: "Pump efficiency",
					v: `${num(state.etaPump, 0)}%`
				},
				{
					k: "Motor efficiency",
					v: `${num(state.etaMotor, 0)}%`
				},
				{
					k: "Duty",
					v: `${num(state.hours, 0)} h/y · ${num(state.load, 0)}% · ${num(state.tariff, 2)} ${state.currency}/kWh`
				},
				{
					k: "Vapour pressure",
					v: `${num(state.pvapKpa, 2)} kPa abs`
				},
				{
					k: "NPSHr",
					v: `${num(state.npshr)} m`
				},
				{
					k: "Atmosphere",
					v: `${num(state.patmBar, 3)} bar abs`
				}
			]
		}, {
			title: "2  Pump results",
			rows: [
				...headRows,
				{
					k: "Total dynamic head",
					v: `${num(result.tdhM)} m`
				},
				{
					k: "Hydraulic power",
					v: `${num(result.hydraulicW / 1e3)} kW`
				},
				{
					k: "Shaft power",
					v: `${num(result.shaftW / 1e3)} kW`
				},
				{
					k: "Electric power",
					v: `${num(result.electricW / 1e3)} kW`
				},
				{
					k: "NPSHa",
					v: `${num(result.npshaM)} m`
				},
				{
					k: "NPSH margin",
					v: `${num(result.npshMarginM)} m`
				},
				{
					k: "Suction velocity",
					v: `${num(result.vs)} m/s`
				},
				{
					k: "Discharge velocity",
					v: `${num(result.vd)} m/s`
				},
				{
					k: "Specific energy",
					v: `${num(result.specificKwhM3, 3)} kWh/m³`
				},
				{
					k: "Annual energy",
					v: `${num(result.annualKwh, 0)} kWh`
				},
				{
					k: "Annual cost",
					v: `${num(result.annualCost, 0)} ${state.currency}`
				}
			]
		}],
		tables: flowTable("3  Duty cases", input.variants),
		notes: [
			state.mode === "nozzle" ? "Head is from the nozzle gauges, the elevation between nozzles, and the velocity head." : "Head is static lift, friction head, and the tank pressures.",
			"Electric power is hydraulic power divided by pump efficiency and motor efficiency.",
			"The sketch is the pump set between suction and discharge. It is not a scale drawing.",
			...warnings,
			"Screening study. Not issued for construction. Confirm NPSH with the pump vendor."
		],
		sketch: {
			scene: "pump",
			driver: "pump",
			showDriver: result.tdhM > 0,
			broken: false,
			lengthLabel: flow,
			elevLabel: `${elevM > 0 ? "+" : ""}${num(elevM)} m`,
			boreLabel: `Suction ${num(state.suctionMm, 0)} mm · discharge ${num(state.dischargeMm, 0)} mm`,
			flowLabel: flow,
			powerLabel: `${num(result.electricW / 1e3)} kW`,
			fromTitle: "Suction",
			toTitle: "Discharge",
			fromPressure: `${num(fromP)} ${unit}`,
			toPressure: `${num(toP)} ${unit}`,
			elevM,
			idMm: state.dischargeMm,
			odMm: null,
			valves: 1,
			pressures: [],
			plate: [
				{
					k: "TDH",
					v: `${num(result.tdhM)} m`
				},
				{
					k: "Electric",
					v: `${num(result.electricW / 1e3)} kW`
				},
				{
					k: "NPSHa",
					v: `${num(result.npshaM)} m`
				},
				{
					k: "Flow",
					v: flow
				}
			]
		}
	};
}
function makeLoopSheet(input) {
	const { state, result } = input;
	const unit = pressureUnitLabel(state.pUnit);
	const showP = (pa) => `${num(paToPressure(pa, state.pUnit))} ${unit}`;
	const fluid = LIQUID_FLUIDS.find((row) => row.id === state.fluidId)?.label ?? "Liquid";
	const flow = `${num(state.flowValue)} ${labelOf(LIQUID_FLOW_UNITS, state.flowUnit)}`;
	const mass = liquidFlowToM3s(state.flowValue, state.flowUnit, state.density) * state.density * 3600;
	const kindLabel = (kind) => ITEM_KINDS.find((row) => row.id === kind)?.label ?? kind;
	const byId = new Map(result.items.map((row) => [row.id, row]));
	const equipment = state.items.map((item) => {
		const row = byId.get(item.id);
		const fits = item.kind === "pipe" ? fittingBits(item.fittings) : null;
		const size = item.kind === "pump" ? "Duty machine" : item.kind === "control" ? result.valve ? `${result.valve.style} NPS ${result.valve.nps}` : item.valveStyle : `NPS ${item.nps} ${scheduleLabel(item.nps, item.schedule)}`;
		const data = item.kind === "pipe" ? `${num(item.lengthM)} m · elev ${item.elevM > 0 ? "+" : ""}${num(item.elevM)} m · ${num(row?.velocity ?? 0)} m/s · ${fits?.text ?? "No fittings"}` : item.kind === "control" ? `Design drop ${num(item.minDp)} ${unit} · Fl ${num(item.fl, 2)}` : item.kind === "pump" ? state.pumpMode === "size" ? "Sized to hold destination pressure" : `Given differential ${num(state.givenDp)} ${unit}` : item.kind === "check" ? `Swing check · qty ${num(item.qty, 0)}` : item.kind === "valve" ? `${item.valveKind} · qty ${num(item.qty, 0)}` : `Clean ${num(item.dpClean)} ${unit} · fouling ×${num(item.foulFactor, 1)}`;
		return [
			item.tag,
			kindLabel(item.kind),
			row ? showP(row.dpPa) : "—",
			row ? showP(row.pOutPa) : "—",
			`${size}. ${data}`
		];
	});
	const pid = [
		{
			tag: state.sourceName,
			kind: "source",
			note: `${num(state.sourceP)} ${unit}`
		},
		...state.items.filter((item) => item.kind !== "pipe").map((item) => {
			const row = byId.get(item.id);
			const note = item.kind === "pump" ? showP(result.pumpDpPa) : item.kind === "control" && result.valve ? `Cv ${num(result.valve.cv, 0)}` : row ? showP(Math.abs(row.dynamicPa)) : "";
			return {
				tag: item.tag,
				kind: item.kind,
				note
			};
		}),
		{
			tag: state.destName,
			kind: "dest",
			note: `${num(state.destP)} ${unit}`
		}
	];
	const annualKwh = result.pumpKW * state.hours * Math.min(1.5, Math.max(0, state.load / 100));
	const valveRows = result.valve ? [
		{
			k: "Tag",
			v: result.valve.tag
		},
		{
			k: "Style",
			v: result.valve.style === "globe" ? "Globe, equal percentage" : "Segment ball, equal percentage"
		},
		{
			k: "Inlet pressure",
			v: showP(result.valve.p1Pa)
		},
		{
			k: "Outlet pressure",
			v: showP(result.valve.p2Pa)
		},
		{
			k: "Differential",
			v: showP(result.valve.dpPa)
		},
		{
			k: "Kv",
			v: num(result.valve.kv, 1)
		},
		{
			k: "Cv",
			v: num(result.valve.cv, 1)
		},
		{
			k: "Screened body",
			v: `NPS ${result.valve.nps}`
		},
		{
			k: "Full-open Cv, screen",
			v: num(result.valve.ratedCv, 0)
		},
		{
			k: "Design travel",
			v: `${num(result.valve.travel * 100, 0)}%`
		},
		{
			k: "Authority",
			v: num(result.valve.authority, 2)
		},
		{
			k: "Liquid pressure recovery Fl",
			v: num(result.valve.fl, 2)
		},
		{
			k: "Choked",
			v: result.valve.choked ? "Yes" : "No"
		},
		{
			k: "Specific gravity",
			v: num(result.valve.sg, 3)
		}
	] : [{
		k: "Control valve",
		v: "Not in this loop, or the drop is not positive."
	}];
	return {
		lineName: state.name.trim() || "Hydraulic loop",
		service: state.service.trim() || "Hydraulic loop",
		fluid,
		date: today(),
		docNo: "DS-LOOP",
		userNote: state.sheetNote,
		kpis: [
			{
				k: "Pump differential",
				v: result.hasPump ? showP(result.pumpDpPa) : "No pump"
			},
			{
				k: "Control valve Cv",
				v: result.valve ? num(result.valve.cv, 1) : "—"
			},
			{
				k: "Valve drop",
				v: result.valve ? showP(result.valve.dpPa) : "—"
			},
			{
				k: "Pump electric",
				v: `${num(result.pumpKW)} kW`
			}
		],
		sections: [
			{
				title: "1  Process properties",
				rows: [
					{
						k: "Fluid",
						v: fluid
					},
					{
						k: "Temperature",
						v: `${num(state.tempC, 1)} °C`
					},
					{
						k: "Flow",
						v: flow
					},
					{
						k: "Mass flow",
						v: `${num(mass, 0)} kg/h`
					},
					{
						k: "Density",
						v: `${num(state.density, 1)} kg/m³`
					},
					{
						k: "Viscosity",
						v: `${num(state.viscCp, 3)} cP`
					},
					{
						k: "Vapour pressure",
						v: `${num(state.pvapKpa, 2)} kPa abs`
					},
					{
						k: "Critical pressure",
						v: state.pcKpa > 0 ? `${num(state.pcKpa, 0)} kPa abs` : "Not set"
					},
					{
						k: "Specific gravity",
						v: num(state.density / 998, 3)
					},
					{
						k: "Atmosphere",
						v: `${num(state.patmBar, 3)} bar abs`
					}
				]
			},
			{
				title: "2  Boundaries",
				rows: [
					{
						k: "Source",
						v: state.sourceName
					},
					{
						k: "Source pressure",
						v: `${num(state.sourceP)} ${unit} g`
					},
					{
						k: "Source elevation",
						v: `${num(state.sourceElev)} m`
					},
					{
						k: "Destination",
						v: state.destName
					},
					{
						k: "Destination pressure",
						v: `${num(state.destP)} ${unit} g`
					},
					{
						k: "Destination elevation",
						v: `${num(state.destElev)} m`
					},
					{
						k: "Sum of item rises",
						v: `${num(state.items.reduce((sum, item) => sum + item.elevM, 0))} m`
					},
					{
						k: "Pipe roughness",
						v: `${num(state.roughMm, 3)} mm`
					},
					{
						k: "Static drop, fouled design",
						v: showP(result.staticPa)
					},
					{
						k: "Dynamic drop, fouled design",
						v: showP(result.dynamicPa)
					}
				]
			},
			{
				title: "3  Pump data",
				rows: [
					{
						k: "Tag",
						v: state.items.find((item) => item.kind === "pump")?.tag ?? "None"
					},
					{
						k: "Basis",
						v: !result.hasPump ? "No pump in the loop" : state.pumpMode === "size" ? "Sized on fouled design flow" : "Given differential"
					},
					{
						k: "Head curve",
						v: state.curve === "flat" ? "Flat" : "Centrifugal screen, shutoff about 12% above design"
					},
					{
						k: "Differential",
						v: result.hasPump ? showP(result.pumpDpPa) : "—"
					},
					{
						k: "Head",
						v: result.hasPump ? `${num(result.pumpHeadM)} m` : "—"
					},
					{
						k: "Hydraulic power",
						v: `${num(result.hydraulicKW)} kW`
					},
					{
						k: "Electric power",
						v: `${num(result.pumpKW)} kW`
					},
					{
						k: "Pump efficiency",
						v: `${num(state.etaPump, 0)}%`
					},
					{
						k: "Motor efficiency",
						v: `${num(state.etaMotor, 0)}%`
					},
					{
						k: "NPSHa, fouled suction",
						v: result.hasPump ? `${num(result.npshaM)} m` : "—"
					},
					{
						k: "NPSHr",
						v: `${num(state.npshr)} m`
					},
					{
						k: "NPSH margin",
						v: result.hasPump ? `${num(result.npshMarginM)} m` : "—"
					},
					{
						k: "Annual energy",
						v: `${num(annualKwh, 0)} kWh · ${num(annualKwh * state.tariff, 0)} ${state.currency}`
					}
				]
			},
			{
				title: "4  Control valve",
				rows: valveRows
			}
		],
		tables: [{
			title: "5  Equipment and line items",
			headers: [
				"Tag",
				"Item",
				"ΔP",
				"P out",
				"Data"
			],
			rows: equipment
		}, {
			title: "6  Operating cases",
			headers: [
				"Case",
				"Valve drop",
				"Pump kW",
				"Holds dest."
			],
			rows: result.cases.map((row) => [
				row.name,
				showP(row.valveDpPa),
				num(row.pumpKW),
				row.delivers ? "Yes" : "No",
				`Pump differential ${showP(row.pumpDpPa)}`,
				row.kvNeed > 0 ? `Kv ${num(row.kvNeed, 1)}` : "Kv not sized"
			])
		}],
		notes: [
			"Pump, when sized, holds the destination pressure with fouled equipment and the control-valve drop entered on the valve.",
			"Control-valve Cv is a liquid screen with piping factor 1. Body size places the design point near 70% travel on an equal-percentage valve with rangeability 50. Full-open Cv values are typical, not a catalog.",
			"Clean and fouled cases keep the same pump differential. A centrifugal curve is a screen: design head at rated flow, about 12% higher at shutoff.",
			"The sketch is a P&ID of the loop, not a scale plot plan. Pipe runs are the line between the symbols.",
			...result.warnings.slice(0, 4),
			"Screening study. Not issued for construction."
		],
		sketch: {
			scene: "pid",
			driver: "pump",
			showDriver: result.pumpKW > .05,
			broken: false,
			lengthLabel: `${num(state.items.reduce((sum, item) => sum + (item.kind === "pipe" ? item.lengthM : 0), 0), 0)} m of pipe`,
			elevLabel: `${num(state.destElev - state.sourceElev)} m nozzles`,
			boreLabel: result.valve ? `FV NPS ${result.valve.nps} · Cv ${num(result.valve.cv, 1)}` : "No control valve",
			flowLabel: flow,
			powerLabel: `${num(result.pumpKW)} kW`,
			fromTitle: state.sourceName,
			toTitle: state.destName,
			fromPressure: `${num(state.sourceP)} ${unit}`,
			toPressure: `${num(state.destP)} ${unit}`,
			elevM: state.destElev - state.sourceElev,
			idMm: result.valve ? 0 : 0,
			odMm: null,
			valves: result.valve ? 1 : 0,
			pressures: [],
			plate: null,
			pid
		}
	};
}
function sheetPlainText(model) {
	const notes = [...model.notes];
	if (model.userNote.trim()) notes.push(model.userNote.trim());
	return [
		"Pipesize App V0",
		"By Shital H Gandhi",
		"Hydraulic data sheet",
		model.lineName,
		`${model.service} · ${model.fluid} · ${model.docNo} · Rev A · ${model.date}`,
		"",
		...model.kpis.map((row) => `${row.k}: ${row.v}`),
		"",
		...model.sections.flatMap((section) => [
			section.title,
			...section.rows.map((row) => `${row.k}: ${row.v}`),
			""
		]),
		...model.tables.flatMap((table) => [
			table.title,
			table.headers.join(" | "),
			...table.rows.map((row) => row.join(" | ")),
			""
		]),
		"Notes",
		...notes.map((note, index) => `${index + 1}. ${note}`)
	].join("\n");
}
var FONT$1 = "IBM Plex Sans, sans-serif";
function shortTag(tag) {
	return tag.length > 12 ? `${tag.slice(0, 11)}…` : tag;
}
function SymbolMark({ kind }) {
	if (kind === "source" || kind === "dest") {
		const tall = kind === "dest";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: -16,
			y: tall ? -62 : -48,
			width: 32,
			height: tall ? 108 : 84,
			rx: 8,
			className: "fill-surface stroke-ink",
			strokeWidth: 1.4
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: -16,
			y1: 8,
			x2: 16,
			y2: 8,
			className: "stroke-accent",
			strokeWidth: 1.2
		})] });
	}
	if (kind === "pump") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		r: 18,
		className: "fill-surface stroke-ink",
		strokeWidth: 1.4
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		d: "M -6 8 L 10 0 L -6 -8 Z",
		className: "fill-accent stroke-none"
	})] });
	if (kind === "control" || kind === "valve") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [kind === "control" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
		x1: 0,
		y1: -14,
		x2: 0,
		y2: -36,
		className: "stroke-ink",
		strokeWidth: 1.2
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x: -12,
		y: -52,
		width: 24,
		height: 16,
		className: "fill-surface stroke-ink",
		strokeWidth: 1.2
	})] }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		d: "M -16 0 L 0 -12 L 0 12 Z M 16 0 L 0 -12 L 0 12 Z",
		className: "fill-surface stroke-ink",
		strokeWidth: 1.3
	})] });
	if (kind === "check") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		d: "M -14 10 L 6 0 L -14 -10 Z",
		className: "fill-surface stroke-ink",
		strokeWidth: 1.3
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
		x1: 10,
		y1: -12,
		x2: 10,
		y2: 12,
		className: "stroke-ink",
		strokeWidth: 1.6
	})] });
	if (kind === "strainer") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x: -14,
		y: -14,
		width: 28,
		height: 28,
		className: "fill-surface stroke-ink",
		strokeWidth: 1.3
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		d: "M -8 10 L 8 -10 M -2 12 L 12 -4 M -12 4 L 2 -12",
		className: "stroke-accent",
		strokeWidth: 1
	})] });
	if (kind === "exchanger") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		r: 18,
		className: "fill-surface stroke-ink",
		strokeWidth: 1.4
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		d: "M -10 -10 L 10 10 M -10 10 L 10 -10",
		className: "stroke-accent",
		strokeWidth: 1.3
	})] });
	if (kind === "meter") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		r: 14,
		className: "fill-surface stroke-ink",
		strokeWidth: 1.4
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
		y: 4,
		textAnchor: "middle",
		fontSize: 10,
		fontFamily: FONT$1,
		className: "fill-ink",
		children: "FE"
	})] });
	if (kind === "orifice") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
		x1: -4,
		y1: -16,
		x2: -4,
		y2: 16,
		className: "stroke-ink",
		strokeWidth: 2
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
		x1: 4,
		y1: -16,
		x2: 4,
		y2: 16,
		className: "stroke-ink",
		strokeWidth: 2
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x: -16,
		y: -12,
		width: 32,
		height: 24,
		className: "fill-surface stroke-ink",
		strokeWidth: 1.3
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		d: "M -10 0 L -4 6 L 2 -6 L 10 0",
		className: "stroke-accent",
		fill: "none",
		strokeWidth: 1.2
	})] });
}
function PidSketch({ nodes }) {
	const list = nodes.length >= 2 ? nodes : [{
		tag: "Source",
		kind: "source",
		note: ""
	}, {
		tag: "Destination",
		kind: "dest",
		note: ""
	}];
	const n = list.length;
	const y = 156;
	const xAt = (index) => 46 + index * 668 / Math.max(1, n - 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 760 300",
		role: "img",
		"aria-label": "P and ID hydraulic loop",
		className: "h-auto w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "760",
				height: "300",
				className: "fill-inset"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: 28,
				y1: y,
				x2: 732,
				y2: y,
				className: "stroke-accent",
				strokeWidth: 3
			}),
			list.map((node, index) => {
				const x = xAt(index);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					transform: `translate(${x} ${y})`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: -22,
							y: -20,
							width: 44,
							height: 40,
							className: "fill-inset stroke-none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SymbolMark, { kind: node.kind }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							y: -78,
							textAnchor: "middle",
							fontSize: 12,
							fontFamily: FONT$1,
							className: "fill-ink",
							children: shortTag(node.tag)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							y: 48,
							textAnchor: "middle",
							fontSize: 11,
							fontFamily: FONT$1,
							className: "fill-muted",
							children: node.note
						})
					]
				}, `${node.kind}-${node.tag}-${index}`);
			})
		]
	});
}
var PAGE_W = 595.28;
var PAGE_H = 841.89;
var MARGIN = 32;
var BOTTOM = 40;
var FALLBACK = {
	"ṁ": "m",
	"⁻": "-",
	Δ: "D",
	μ: "u",
	ρ: "r",
	η: "n",
	π: "pi",
	Σ: "S"
};
function sanitize(font, text) {
	const known = new Set(font.getCharacterSet());
	let out = "";
	for (const ch of text) {
		const cp = ch.codePointAt(0);
		if (cp != null && known.has(cp)) out += ch;
		else out += FALLBACK[ch] ?? "";
	}
	return out;
}
function wrap(font, text, size, maxWidth) {
	const clean = sanitize(font, text).replace(/\s+/g, " ").trim();
	if (!clean) return [];
	const lines = [];
	let line = "";
	const pushWord = (word) => {
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
function pdfFileName(lineName) {
	return `Pipesize-${lineName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "line"}.pdf`;
}
async function captureSketchPng() {
	const svg = document.querySelector(".sheet-page svg");
	if (!(svg instanceof SVGSVGElement)) return null;
	const clone = svg.cloneNode(true);
	paintSvg(svg, clone);
	clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	clone.setAttribute("width", "1520");
	clone.setAttribute("height", "600");
	const xml = new XMLSerializer().serializeToString(clone);
	const url = URL.createObjectURL(new Blob([xml], { type: "image/svg+xml;charset=utf-8" }));
	try {
		const img = new Image();
		await new Promise((resolve, reject) => {
			img.onload = () => resolve();
			img.onerror = () => reject(/* @__PURE__ */ new Error("sketch"));
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
		const blob = await new Promise((resolve) => canvas.toBlob((value) => resolve(value), "image/png"));
		if (!blob) return null;
		return new Uint8Array(await blob.arrayBuffer());
	} catch {
		return null;
	} finally {
		URL.revokeObjectURL(url);
	}
}
function paintSvg(source, clone) {
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
	for (let i = 0; i < from.length; i++) if (to[i]) paintSvg(from[i], to[i]);
}
async function fontBytes(file) {
	const response = await fetch(file);
	if (!response.ok) throw new Error(`Font ${file} did not load.`);
	return response.arrayBuffer();
}
async function buildSheetPdf(model, sketchPng) {
	const { PDFDocument, rgb } = await import("../_libs/pdf-lib.mjs").then((n) => n.t);
	const fontkitModule = await import("../_libs/pako+pdf-lib__fontkit.mjs").then((n) => n.t);
	const fontkit = fontkitModule.default ?? fontkitModule;
	const doc = await PDFDocument.create();
	doc.registerFontkit(fontkit);
	const [sansBuf, semiBuf] = await Promise.all([fontBytes("/fonts/IBMPlexSans-Regular.ttf"), fontBytes("/fonts/IBMPlexSans-SemiBold.ttf")]);
	const sans = await doc.embedFont(sansBuf, { subset: true });
	const semi = await doc.embedFont(semiBuf, { subset: true });
	const ink = rgb(16 / 255, 32 / 255, 51 / 255);
	const muted = rgb(92 / 255, 109 / 255, 126 / 255);
	const accent = rgb(12 / 255, 107 / 255, 98 / 255);
	const line = rgb(211 / 255, 222 / 255, 230 / 255);
	const paper = rgb(247 / 255, 250 / 255, 251 / 255);
	const sky = rgb(230 / 255, 238 / 255, 241 / 255);
	const width = 531.28;
	let page = doc.addPage([PAGE_W, PAGE_H]);
	let y = 809.89;
	const newPage = () => {
		page = doc.addPage([PAGE_W, PAGE_H]);
		y = 809.89;
	};
	const ensure = (height) => {
		if (y - height < BOTTOM) newPage();
	};
	const text = (value, x, baseline, size, font, tint) => {
		const clean = sanitize(font, value);
		if (!clean) return;
		page.drawText(clean, {
			x,
			y: baseline,
			size,
			font,
			color: tint
		});
	};
	const paragraph = (value, size = 8) => {
		const lines = wrap(sans, value, size, width);
		ensure(lines.length * (size + 3) + 2);
		for (const row of lines) {
			text(row, MARGIN, y, size, sans, muted);
			y -= size + 3;
		}
		y -= 2;
	};
	const blockH = 54;
	page.drawRectangle({
		x: MARGIN,
		y: y - blockH,
		width,
		height: blockH,
		borderWidth: 1.1,
		borderColor: ink
	});
	page.drawRectangle({
		x: MARGIN,
		y: y - 16,
		width,
		height: 16,
		color: ink
	});
	text("HYDRAULIC DATA SHEET", 40, y - 11, 8, semi, paper);
	const brand = "Pipesize App V0";
	text(brand, 555.28 - semi.widthOfTextAtSize(brand, 8), y - 11, 8, semi, paper);
	text(model.lineName, 40, y - 32, 12, semi, ink);
	const credit = "By Shital H Gandhi";
	text(credit, 555.28 - sans.widthOfTextAtSize(credit, 8), y - 30, 8, sans, ink);
	text(`${model.docNo}   ·   Rev A   ·   ${model.date}`, 40, y - 46, 8, sans, muted);
	const serviceLine = `${model.service}   ·   ${model.fluid}`;
	text(serviceLine, 555.28 - sans.widthOfTextAtSize(sanitize(sans, serviceLine), 8), y - 46, 8, sans, muted);
	y -= 64;
	const boxW = width / Math.max(1, model.kpis.length);
	const boxH = 32;
	ensure(40);
	model.kpis.forEach((kpi, index) => {
		const x = MARGIN + index * boxW;
		page.drawRectangle({
			x,
			y: y - boxH,
			width: boxW,
			height: boxH,
			borderWidth: .6,
			borderColor: line,
			color: paper
		});
		page.drawRectangle({
			x,
			y: y - 2,
			width: boxW,
			height: 2,
			color: accent
		});
		text(kpi.k, x + 6, y - 12, 7, sans, muted);
		text(kpi.v, x + 6, y - 25, 10, semi, accent);
	});
	y -= 42;
	if (sketchPng) {
		const imgH = Math.min(168, width * (300 / 760));
		ensure(196);
		const image = await doc.embedPng(sketchPng);
		page.drawRectangle({
			x: MARGIN,
			y: y - imgH,
			width,
			height: imgH,
			borderWidth: .6,
			borderColor: line,
			color: sky
		});
		page.drawImage(image, {
			x: MARGIN,
			y: y - imgH,
			width,
			height: imgH
		});
		y -= 174;
	}
	const sketch = model.sketch;
	paragraph(`${sketch.fromTitle} ${sketch.fromPressure}  →  ${sketch.toTitle} ${sketch.toPressure}.  ${sketch.boreLabel}.  ${sketch.flowLabel}.  ${sketch.lengthLabel}.  ${sketch.elevLabel}.  ${sketch.powerLabel}.`);
	const band = (label) => {
		ensure(16);
		page.drawRectangle({
			x: MARGIN,
			y: y - 13,
			width,
			height: 14,
			color: ink
		});
		text(label, 38, y - 9, 8, semi, paper);
		y -= 13;
	};
	const fieldRow = (k, v) => {
		const labelLines = wrap(sans, k, 8, width * .4 - 10);
		const valueLines = wrap(sans, v, 8, width * .58 - 10);
		const h = Math.max(labelLines.length, valueLines.length, 1) * 11 + 4;
		ensure(h);
		page.drawRectangle({
			x: MARGIN,
			y: y - h,
			width,
			height: h,
			borderWidth: .4,
			borderColor: line,
			color: paper
		});
		page.drawLine({
			start: {
				x: 255.1376,
				y
			},
			end: {
				x: 255.1376,
				y: y - h
			},
			thickness: .4,
			color: line
		});
		labelLines.forEach((row, index) => text(row, 36, y - 11 - index * 11, 8, sans, muted));
		valueLines.forEach((row, index) => text(row, 259.1376, y - 11 - index * 11, 8, sans, ink));
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
		const drawCells = (cells, strong) => {
			const wrapped = cells.slice(0, cols).map((cell) => wrap(strong ? semi : sans, cell, 7, colW - 6));
			const h = Math.max(1, ...wrapped.map((lines) => lines.length)) * 9 + 4;
			ensure(h);
			page.drawRectangle({
				x: MARGIN,
				y: y - h,
				width,
				height: h,
				borderWidth: .4,
				borderColor: line,
				color: strong ? sky : paper
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
		for (const line of model.userNote.split(/\n+/)) if (line.trim()) notes.push(line.trim());
	}
	band("Notes");
	notes.forEach((item, index) => paragraph(`${index + 1}.  ${item}`, 8));
	ensure(42);
	y -= 8;
	page.drawLine({
		start: {
			x: MARGIN,
			y
		},
		end: {
			x: 563.28,
			y
		},
		thickness: 1,
		color: ink
	});
	y -= 14;
	const slots = [
		"Prepared",
		"Checked",
		"Approved"
	];
	const slotW = width / 3;
	slots.forEach((slot, index) => {
		const x = MARGIN + index * slotW;
		text(slot, x, y, 8, sans, muted);
		page.drawLine({
			start: {
				x: x + 52,
				y: y - 1
			},
			end: {
				x: x + slotW - 12,
				y: y - 1
			},
			thickness: .6,
			color: ink
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
			color: muted
		});
	});
	doc.setTitle(`${model.lineName} — Pipesize App V0`);
	doc.setAuthor("Shital H Gandhi");
	doc.setSubject("Hydraulic data sheet");
	return doc.save();
}
function pdfBlob(bytes) {
	const copy = new Uint8Array(bytes.byteLength);
	copy.set(bytes);
	const buffer = copy.buffer.slice(0);
	return new Blob([buffer], { type: "application/pdf" });
}
function downloadPdf(bytes, fileName) {
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
var FONT = "IBM Plex Mono, ui-monospace, monospace";
function visualRise(elevM) {
	if (!Number.isFinite(elevM) || Math.abs(elevM) < .05) return 0;
	const mag = Math.min(52, 16 + Math.log10(1 + Math.abs(elevM)) * 16);
	return Math.sign(elevM) * mag;
}
function groundY(x, rise) {
	const t = Math.min(1, Math.max(0, x / 760));
	return 214 - rise * (t * t * (3 - 2 * t));
}
function PolyPipe({ pts, weight = 5 }) {
	if (pts.length < 2) return null;
	const upper = [];
	const lower = [];
	const mid = [];
	for (let i = 0; i < pts.length; i++) {
		const prev = pts[Math.max(0, i - 1)];
		const next = pts[Math.min(pts.length - 1, i + 1)];
		const dx = next.x - prev.x;
		const dy = next.y - prev.y;
		const len = Math.hypot(dx, dy) || 1;
		const nx = -dy / len * weight;
		const ny = dx / len * weight;
		upper.push(`${(pts[i].x + nx).toFixed(1)},${(pts[i].y + ny).toFixed(1)}`);
		lower.push(`${(pts[i].x - nx).toFixed(1)},${(pts[i].y - ny).toFixed(1)}`);
		mid.push(`${pts[i].x.toFixed(1)},${pts[i].y.toFixed(1)}`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
			points: upper.join(" "),
			fill: "none",
			className: "stroke-ink",
			strokeWidth: 1.4
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
			points: lower.join(" "),
			fill: "none",
			className: "stroke-ink",
			strokeWidth: 1.4
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
			points: mid.join(" "),
			fill: "none",
			className: "stroke-accent",
			strokeWidth: 1.7
		})
	] });
}
function FlowArrow({ pts }) {
	if (pts.length < 2) return null;
	const i = Math.min(pts.length - 2, Math.floor(pts.length * .62));
	const a = pts[i];
	const b = pts[i + 1];
	const ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
		points: "-9,-5 8,0 -9,5",
		transform: `translate(${a.x},${a.y}) rotate(${ang})`,
		className: "fill-accent"
	});
}
function Valve({ x, y }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		transform: `translate(${x},${y})`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "-8,0 0,-7 0,0",
				className: "fill-surface stroke-ink",
				strokeWidth: 1.2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "8,0 0,7 0,0",
				className: "fill-surface stroke-ink",
				strokeWidth: 1.2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: 0,
				y1: 0,
				x2: 0,
				y2: -16,
				className: "stroke-ink",
				strokeWidth: 1.3
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: 0,
				cy: -20,
				r: 5,
				className: "fill-surface stroke-ink",
				strokeWidth: 1.2
			})
		]
	});
}
function BoreCut({ idMm, odMm }) {
	const id = Math.max(idMm, 1);
	const od = odMm && odMm > id ? odMm : id * 1.12;
	const rOut = 16;
	const rIn = Math.max(7, rOut * (id / od));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		transform: "translate(36,40)",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				r: rOut,
				className: "fill-inset stroke-ink",
				strokeWidth: 1.3
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				r: rIn,
				className: "fill-bg stroke-accent",
				strokeWidth: 1.3
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				y: 32,
				textAnchor: "middle",
				fontSize: 12,
				fontFamily: FONT,
				className: "fill-muted",
				children: "Bore"
			})
		]
	});
}
function Spark({ values }) {
	const finite = values.filter((n) => Number.isFinite(n));
	if (finite.length < 2) return null;
	const min = Math.min(...finite);
	const span = Math.max(...finite) - min || 1;
	const x = 250;
	const w = 220;
	const d = values.map((p, i) => {
		const px = x + w * i / (values.length - 1);
		const py = 32 + 30 * (1 - (p - min) / span);
		return `${i === 0 ? "M" : "L"}${px.toFixed(1)},${py.toFixed(1)}`;
	}).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
		x,
		y: 24,
		fontSize: 12,
		fontFamily: FONT,
		className: "fill-muted",
		children: "Pressure along the line"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		d,
		fill: "none",
		className: "stroke-accent",
		strokeWidth: 1.7
	})] });
}
function Plate({ rows, x }) {
	const y = 16;
	const h = 22 + rows.length * 18;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x,
			y,
			width: 214,
			height: h,
			className: "fill-surface stroke-ink",
			strokeWidth: 1.2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: x + 10,
			y: 32,
			fontSize: 11,
			fontFamily: FONT,
			className: "fill-muted",
			children: "DUTY PLATE"
		}),
		rows.slice(0, 4).map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: x + 10,
			y: 52 + i * 18,
			fontSize: 13,
			fontFamily: FONT,
			className: "fill-muted",
			children: row.k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: x + 204,
			y: 52 + i * 18,
			textAnchor: "end",
			fontSize: 13,
			fontFamily: FONT,
			className: "fill-ink",
			children: row.v
		})] }, row.k))
	] });
}
function Vessel({ x, nozzleY, title, pressure, nozzle }) {
	const w = 48;
	const left = x - w / 2;
	const top = nozzleY - 58;
	const bot = nozzleY + 26;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: x,
			cy: bot,
			rx: w / 2,
			ry: 6,
			className: "fill-inset stroke-ink",
			strokeWidth: 1.2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: left,
			y: top + 8,
			width: w,
			height: bot - top - 8,
			className: "fill-surface stroke-ink",
			strokeWidth: 1.2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: x,
			cy: top + 8,
			rx: w / 2,
			ry: 7,
			className: "fill-surface stroke-ink",
			strokeWidth: 1.2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: left + 1.5,
			y: nozzleY - 6,
			width: 45,
			height: bot - nozzleY - 2,
			className: "fill-accent",
			opacity: .18
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: left,
			y1: nozzleY - 6,
			x2: left + w,
			y2: nozzleY - 6,
			className: "stroke-accent",
			strokeWidth: 1.2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: nozzle === "right" ? left + w : left - 16,
			y1: nozzleY,
			x2: nozzle === "right" ? left + w + 16 : left,
			y2: nozzleY,
			className: "stroke-ink",
			strokeWidth: 4
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x,
			y: top - 22,
			textAnchor: "middle",
			fontSize: 14,
			fontFamily: FONT,
			className: "fill-ink",
			children: pressure
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x,
			y: top - 8,
			textAnchor: "middle",
			fontSize: 12,
			fontFamily: FONT,
			className: "fill-muted",
			children: title
		})
	] });
}
function PumpSet({ x, y, power }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: x - 62,
			y: y + 28,
			width: 108,
			height: 14,
			className: "fill-inset stroke-ink",
			strokeWidth: 1.2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: x - 54,
			y: y - 16,
			width: 40,
			height: 32,
			rx: 2,
			className: "fill-surface stroke-ink",
			strokeWidth: 1.2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: x - 48,
			y1: y - 8,
			x2: x - 48,
			y2: y + 10,
			className: "stroke-line",
			strokeWidth: 1
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: x - 42,
			y1: y - 8,
			x2: x - 42,
			y2: y + 10,
			className: "stroke-line",
			strokeWidth: 1
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: x - 36,
			y1: y - 8,
			x2: x - 36,
			y2: y + 10,
			className: "stroke-line",
			strokeWidth: 1
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: x - 14,
			y: y - 4,
			width: 12,
			height: 8,
			className: "fill-inset stroke-ink",
			strokeWidth: 1
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: x + 16,
			cy: y,
			r: 18,
			className: "fill-surface stroke-ink",
			strokeWidth: 1.3
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: x + 16,
			cy: y,
			r: 6,
			className: "fill-inset stroke-accent",
			strokeWidth: 1.2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: x + 28,
			y: y - 5,
			width: 16,
			height: 10,
			className: "fill-surface stroke-ink",
			strokeWidth: 1.2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: x - 8,
			y: y + 56,
			textAnchor: "middle",
			fontSize: 13,
			fontFamily: FONT,
			className: "fill-ink",
			children: power
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: x - 8,
			y: y + 70,
			textAnchor: "middle",
			fontSize: 11,
			fontFamily: FONT,
			className: "fill-muted",
			children: "Pump"
		})
	] });
}
function CompressorSet({ x, y, power }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: x - 78,
			y: y + 22,
			width: 132,
			height: 14,
			className: "fill-inset stroke-ink",
			strokeWidth: 1.2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: x - 70,
			y: y - 18,
			width: 48,
			height: 36,
			rx: 2,
			className: "fill-surface stroke-ink",
			strokeWidth: 1.2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: x - 16,
			y: y - 14,
			width: 52,
			height: 28,
			rx: 10,
			className: "fill-surface stroke-ink",
			strokeWidth: 1.2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: x - 4,
			y1: y - 14,
			x2: x - 4,
			y2: y + 14,
			className: "stroke-line",
			strokeWidth: 1
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: x + 8,
			y1: y - 14,
			x2: x + 8,
			y2: y + 14,
			className: "stroke-line",
			strokeWidth: 1
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: x + 20,
			y1: y - 14,
			x2: x + 20,
			y2: y + 14,
			className: "stroke-line",
			strokeWidth: 1
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: x + 36,
			y: y - 6,
			width: 18,
			height: 12,
			className: "fill-surface stroke-ink",
			strokeWidth: 1.2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: x - 8,
			y: y + 52,
			textAnchor: "middle",
			fontSize: 13,
			fontFamily: FONT,
			className: "fill-ink",
			children: power
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: x - 8,
			y: y + 66,
			textAnchor: "middle",
			fontSize: 11,
			fontFamily: FONT,
			className: "fill-muted",
			children: "Compressor"
		})
	] });
}
function Supports({ pts, groundAt }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { children: [
		.28,
		.5,
		.72
	].map((t) => {
		const p = pts[Math.min(pts.length - 1, Math.max(0, Math.round((pts.length - 1) * t)))];
		if (!p) return null;
		const gy = groundAt(p.x);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: p.x,
				y1: p.y + 6,
				x2: p.x,
				y2: gy,
				className: "stroke-ink",
				strokeWidth: 1.4
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: p.x - 8,
				y1: p.y + 6,
				x2: p.x + 8,
				y2: p.y + 6,
				className: "stroke-ink",
				strokeWidth: 1.4
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: p.x - 7,
				y1: gy,
				x2: p.x + 7,
				y2: gy,
				className: "stroke-ink",
				strokeWidth: 1.3
			})
		] }, t);
	}) });
}
function splitRun(pts, broken) {
	if (!broken || pts.length < 6) return {
		left: pts,
		right: [],
		gap: null
	};
	const mid = Math.floor(pts.length / 2);
	return {
		left: pts.slice(0, mid - 1),
		right: pts.slice(mid + 1),
		gap: pts[mid]
	};
}
function LineSketch({ sketch }) {
	const rise = visualRise(sketch.elevM);
	const lineScene = sketch.scene === "line";
	const yStart = lineScene ? groundY(150, rise) - 22 : 168;
	const yEnd = lineScene ? groundY(700, rise) - 22 : 168 - rise;
	const x1 = sketch.scene === "pump" ? 230 : lineScene ? 168 : 230;
	const x2 = sketch.scene === "pump" ? 650 : 640;
	const samples = lineScene ? 28 : sketch.broken ? 12 : 2;
	const pts = [];
	for (let i = 0; i < samples; i++) {
		const t = i / (samples - 1);
		const x = x1 + (x2 - x1) * t;
		const y = lineScene ? groundY(x, rise) - 22 : yStart + (yEnd - yStart) * t;
		pts.push({
			x,
			y
		});
	}
	const { left, right, gap } = splitRun(pts, sketch.broken);
	const groundAt = (x) => lineScene ? groundY(x, rise) : 246;
	const valveAt = left.length > 2 ? left[Math.floor(left.length * .55)] : pts[0];
	const stationRoof = groundY(78, rise) - 92;
	const caption = sketch.scene === "line" ? "Above-ground line. Grade follows the elevation change." : "Equipment at grade. The pipe run is shortened.";
	const terrain = [];
	for (let i = 0; i <= 30; i++) terrain.push({
		x: 760 * i / 30,
		y: groundY(760 * i / 30, rise)
	});
	const terrainD = lineScene ? `M0,300 ${terrain.map((p) => `L${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")} L760,300 Z` : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 760 300",
		role: "img",
		className: "block h-auto w-full",
		"aria-label": `Installation elevation. ${caption}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: 760,
				height: 300,
				className: "fill-bg"
			}),
			lineScene ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: terrainD,
				className: "fill-inset stroke-ink",
				strokeWidth: 1.2
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 0,
				y: 246,
				width: 760,
				height: 54,
				className: "fill-inset"
			}),
			!lineScene ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: 0,
				y1: 246,
				x2: 760,
				y2: 246,
				className: "stroke-ink",
				strokeWidth: 1.2
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoreCut, {
				idMm: sketch.idMm,
				odMm: sketch.odMm
			}),
			sketch.plate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plate, {
				rows: sketch.plate,
				x: 248
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spark, { values: sketch.pressures }),
			lineScene ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: 24,
					y: groundY(78, rise) - 74,
					width: 112,
					height: 74,
					className: "fill-surface stroke-ink",
					strokeWidth: 1.3
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: `24,${groundY(78, rise) - 74} 80,${groundY(78, rise) - 92} 136,${groundY(78, rise) - 74}`,
					className: "fill-inset stroke-ink",
					strokeWidth: 1.2
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: 40,
					y: groundY(78, rise) - 36,
					width: 18,
					height: 36,
					className: "fill-bg stroke-ink",
					strokeWidth: 1
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: 80,
					y: stationRoof - 34,
					textAnchor: "middle",
					fontSize: 12,
					fontFamily: FONT,
					className: "fill-muted",
					children: sketch.driver === "compressor" ? "Compressor station" : "Pump station"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: 80,
					y: stationRoof - 18,
					textAnchor: "middle",
					fontSize: 14,
					fontFamily: FONT,
					className: "fill-ink",
					children: sketch.fromPressure
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: 80,
					y: stationRoof - 4,
					textAnchor: "middle",
					fontSize: 12,
					fontFamily: FONT,
					className: "fill-ink",
					children: sketch.powerLabel
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vessel, {
				x: 62,
				nozzleY: yStart,
				title: sketch.fromTitle,
				pressure: sketch.fromPressure,
				nozzle: "right"
			}),
			!lineScene && sketch.showDriver && sketch.driver === "pump" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PumpSet, {
				x: 168,
				y: yStart,
				power: sketch.powerLabel
			}) : null,
			!lineScene && sketch.showDriver && sketch.driver === "compressor" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompressorSet, {
				x: 156,
				y: yStart,
				power: sketch.powerLabel
			}) : null,
			!lineScene && !sketch.showDriver ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 150,
				y: yStart + 36,
				fontSize: 12,
				fontFamily: FONT,
				className: "fill-muted",
				children: "No driver"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Supports, {
				pts: gap ? pts.filter((p) => Math.abs(p.x - gap.x) > 30) : pts,
				groundAt
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolyPipe, { pts: left }),
			right.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolyPipe, { pts: right }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowArrow, { pts: right.length > 1 ? right : left }),
			sketch.valves > 0 && valveAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Valve, {
				x: valveAt.x,
				y: valveAt.y
			}) : null,
			gap ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: gap.x - 16,
					y1: gap.y - 14,
					x2: gap.x - 4,
					y2: gap.y + 14,
					className: "stroke-ink",
					strokeWidth: 1.3
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: gap.x + 4,
					y1: gap.y - 14,
					x2: gap.x + 16,
					y2: gap.y + 14,
					className: "stroke-ink",
					strokeWidth: 1.3
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: gap.x,
					y: gap.y - 22,
					textAnchor: "middle",
					fontSize: 13,
					fontFamily: FONT,
					className: "fill-ink",
					children: sketch.lengthLabel
				})
			] }) : null,
			lineScene ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: 688,
					y: groundY(710, rise) - 58,
					width: 36,
					height: 58,
					className: "fill-surface stroke-ink",
					strokeWidth: 1.2
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: 706,
					cy: groundY(710, rise) - 58,
					rx: 18,
					ry: 6,
					className: "fill-surface stroke-ink",
					strokeWidth: 1.2
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: 706,
					y: groundY(710, rise) - 70,
					textAnchor: "middle",
					fontSize: 12,
					fontFamily: FONT,
					className: "fill-muted",
					children: sketch.toTitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: 706,
					y: groundY(710, rise) - 86,
					textAnchor: "middle",
					fontSize: 13,
					fontFamily: FONT,
					className: "fill-ink",
					children: sketch.toPressure
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vessel, {
				x: 706,
				nozzleY: yEnd,
				title: sketch.toTitle,
				pressure: sketch.toPressure,
				nozzle: "left"
			}), yEnd + 32 < 246 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 688,
				y: yEnd + 32,
				width: 36,
				height: 246 - (yEnd + 32),
				className: "fill-inset stroke-ink",
				strokeWidth: 1
			}) : null] }),
			Math.abs(rise) > 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: 748,
				y1: lineScene ? groundY(40, rise) : yStart,
				x2: 748,
				y2: lineScene ? groundY(720, rise) : yEnd,
				className: "stroke-muted",
				strokeWidth: 1
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 742,
				y: ((lineScene ? groundY(40, rise) : yStart) + (lineScene ? groundY(720, rise) : yEnd)) / 2,
				textAnchor: "end",
				fontSize: 12,
				fontFamily: FONT,
				className: "fill-muted",
				children: sketch.elevLabel
			})] }) : !lineScene ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
				x: 24,
				y: 286,
				fontSize: 12,
				fontFamily: FONT,
				className: "fill-muted",
				children: ["Level · ", sketch.elevLabel]
			}) : null
		]
	});
}
function Datasheet({ model, onClose, onUserNote }) {
	const [note, setNote] = (0, import_react.useState)("Download PDF saves an A4 file. Share sends that same file.");
	const [userNote, setUserNote] = (0, import_react.useState)(model.userNote);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		document.body.classList.add("print-sheet");
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.classList.remove("print-sheet");
			document.body.style.overflow = previous;
			window.removeEventListener("keydown", onKey);
		};
	}, [onClose]);
	function current() {
		return {
			...model,
			userNote
		};
	}
	async function copyText() {
		try {
			await navigator.clipboard.writeText(sheetPlainText(current()));
			setNote("Data sheet copied.");
		} catch {
			setNote("Copy is blocked in this view. Download the PDF instead.");
		}
	}
	async function build() {
		setBusy(true);
		setNote("Preparing the A4 PDF…");
		try {
			const sketch = await captureSketchPng();
			return {
				bytes: await buildSheetPdf(current(), sketch),
				name: pdfFileName(model.lineName)
			};
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
		if (typeof navigator.share === "function" && (!navigator.canShare || navigator.canShare({ files: [file] }))) try {
			await navigator.share({
				files: [file],
				title: `${model.lineName} — Pipesize App V0`
			});
			setNote(`Shared ${made.name}.`);
			return;
		} catch (err) {
			if (err instanceof DOMException && err.name === "AbortError") return;
		}
		downloadPdf(made.bytes, made.name);
		setNote(`Saved ${made.name}. Share was not available, so the PDF was downloaded.`);
	}
	const sheet = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "datasheet",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sheet-toolbar",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-3xl flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 rounded-md border border-on-ink-dim px-3 text-sm text-on-ink",
						onClick: onClose,
						children: "Close"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "min-w-0 flex-1 text-sm text-on-ink",
						children: "A4 data sheet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 rounded-md border border-on-ink-dim px-3 text-sm text-on-ink",
						onClick: () => void copyText(),
						disabled: busy,
						children: "Copy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 rounded-md border border-on-ink-dim px-3 text-sm text-on-ink",
						onClick: () => void onShare(),
						disabled: busy,
						children: "Share"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 rounded-md bg-accent px-3 text-sm font-medium text-accent-ink disabled:opacity-50",
						onClick: () => void onDownload(),
						disabled: busy,
						children: busy ? "Preparing…" : "Download PDF"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-2 max-w-3xl text-xs text-on-ink-dim",
				children: note
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sheet-stage",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "sheet-page",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "border-2 border-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3 bg-ink px-3 py-2 text-on-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-widest",
								children: "HYDRAULIC DATA SHEET"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-lg font-semibold",
								children: model.lineName
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xs",
									children: "Pipesize App V0"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs",
									children: "By Shital H Gandhi"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-px bg-line sm:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleCell, {
									k: "Service",
									v: model.service
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleCell, {
									k: "Fluid",
									v: model.fluid
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleCell, {
									k: "Document",
									v: `${model.docNo} · Rev A`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleCell, {
									k: "Date",
									v: model.date
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sheet-kpis mt-3 grid grid-cols-2 gap-px overflow-hidden border border-ink bg-line sm:grid-cols-4",
						children: model.kpis.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-surface px-2 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-wide text-muted uppercase",
								children: row.k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-sm font-medium text-accent",
								children: row.v
							})]
						}, row.k))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "mt-3 border border-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sketch-scroll overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "sketch-wide",
								children: model.sketch.scene === "pid" && model.sketch.pid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PidSketch, { nodes: model.sketch.pid }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineSketch, { sketch: model.sketch })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
							className: "border-t border-ink px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-medium text-ink",
								children: [
									model.sketch.fromTitle,
									" ",
									model.sketch.fromPressure,
									" → ",
									model.sketch.toTitle,
									" ",
									model.sketch.toPressure
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono text-xs text-muted",
								children: [
									model.sketch.boreLabel,
									" · ",
									model.sketch.flowLabel,
									" · ",
									model.sketch.lengthLabel,
									" · ",
									model.sketch.elevLabel,
									" ·",
									" ",
									model.sketch.powerLabel
								]
							})]
						})]
					}),
					model.sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-3 border border-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "bg-ink px-2 py-1 text-xs font-medium tracking-wide text-on-ink uppercase",
							children: section.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", { children: section.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2 border-t border-line px-2 py-1 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: row.k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-right font-mono text-ink",
								children: row.v
							})]
						}, `${section.title}-${row.k}`)) })]
					}, section.title)),
					model.tables.map((table) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-3 border border-ink",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "bg-ink px-2 py-1 text-xs font-medium tracking-wide text-on-ink uppercase",
								children: table.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-4 gap-1 px-2 py-1 text-xs text-muted",
								children: table.headers.slice(0, 4).map((header) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: header }, header))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: table.rows.map((row, rowIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "border-t border-line px-2 py-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-4 gap-1 font-mono text-xs text-ink",
									children: row.slice(0, 4).map((cell, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cell }, `${cell}-${index}`))
								}), row.length > 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted",
									children: row.slice(4).join(" · ")
								}) : null]
							}, `${row[0]}-${rowIndex}`)) })
						]
					}, table.title)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-3 border border-ink",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "bg-ink px-2 py-1 text-xs font-medium tracking-wide text-on-ink uppercase",
								children: "Notes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "flex flex-col gap-1 px-3 py-2",
								children: model.notes.map((line, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "text-xs text-ink",
									children: [
										index + 1,
										". ",
										line
									]
								}, line))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block border-t border-line px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium text-muted",
									children: "Additional notes"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									className: "mt-1 min-h-20 w-full rounded-md border border-line bg-surface px-2 py-2 text-sm text-ink outline-none focus:border-accent",
									value: userNote,
									placeholder: "Project notes. They are printed on the data sheet.",
									onChange: (event) => {
										setUserNote(event.target.value);
										onUserNote?.(event.target.value);
									}
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "mt-3 border-t-2 border-ink pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-3 text-xs text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Prepared", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-4 block border-b border-ink" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Checked", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-4 block border-b border-ink" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Approved", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-4 block border-b border-ink" })] })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-right text-xs text-muted",
							children: "Pipesize App V0 · By Shital H Gandhi · Not issued for construction"
						})]
					})
				]
			})
		})]
	});
	return (0, import_react_dom.createPortal)(sheet, document.body);
}
function TitleCell({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-surface px-2 py-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-ink",
			children: v
		})]
	});
}
function OptimumCard({ driver, currency, currentMm, currentKw, currentDetail, optimumMm, optimumKw, optimumDetail, hint, optimumVelocity, edge, sinnottMm, ratio, standard, onUseMm, onUsePipe, econ, onEcon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-lg border border-line bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs font-medium tracking-wide text-muted uppercase",
				children: [
					"Optimum bore and ",
					(driver === "pump" ? "Pump" : "Compressor").toLowerCase(),
					" power"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-surface px-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "This bore"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-lg font-medium text-ink tabular-nums",
							children: [num(currentMm, 1), " mm"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-sm text-accent tabular-nums",
							children: [num(currentKw), " kW"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: currentDetail
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-inset px-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Economic bore"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-lg font-medium text-ink tabular-nums",
							children: optimumMm == null ? "—" : `${num(optimumMm, 1)} mm`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-sm text-accent tabular-nums",
							children: optimumKw == null ? "—" : `${num(optimumKw)} kW`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: optimumDetail
						})
					]
				})]
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted",
				children: hint
			}) : null,
			optimumVelocity != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-muted",
				children: [
					"At the economic bore the velocity is ",
					num(optimumVelocity),
					" m/s",
					driver === "compressor" ? " at the outlet" : "",
					". The money line is pipe charge plus electricity."
				]
			}) : null,
			edge === "low" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-warn",
				children: "The cheapest bore is at the bottom of the search. Power is cheap relative to pipe — lower the pipe price or raise the tariff if that is not what you meant."
			}) : null,
			edge === "high" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-warn",
				children: "The cheapest bore is above 1.2 m. Electricity dominates — check the tariff, the hours, and the pipe price."
			}) : null,
			sinnottMm != null && Number.isFinite(sinnottMm) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-muted",
				children: [
					"Textbook carbon-steel screen (Towler and Sinnott, turbulent pumped liquids): ",
					num(sinnottMm, 0),
					" mm. It ignores your tariff. Not for gas, slurry, or alloy pipe."
				]
			}) : null,
			ratio != null && ratio > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-muted",
				children: [
					"Compressor pressure ratio ",
					num(ratio, 2),
					" — line inlet over line outlet. Isentropic head, suction temperature equal to the line temperature."
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [optimumMm != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 rounded-md bg-accent px-3 text-sm font-medium text-accent-ink",
					onClick: () => onUseMm(optimumMm),
					children: "Use economic bore"
				}) : null, standard ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "h-11 rounded-md border border-accent px-3 text-sm font-medium text-accent",
					onClick: () => onUsePipe(standard.nps, standard.schedule),
					children: [
						"Use NPS ",
						standard.nps,
						" ",
						scheduleLabel(standard.nps, standard.schedule)
					]
				}) : null]
			}),
			standard ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-muted",
				children: [
					"Next standard ID ",
					num(standard.idMm, 1),
					" mm, which is on or above the economic bore."
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "mt-3 rounded-md border border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
					className: "min-h-11 cursor-pointer px-3 py-3 text-sm font-medium text-ink",
					children: [
						"Cost basis · ",
						num(econ.tariff, 2),
						" ",
						currency,
						"/kWh · ",
						econ.etaMachine,
						"% ",
						driver === "pump" ? "pump" : "isentropic"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-3 px-3 pb-3 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: driver === "pump" ? "Pump efficiency" : "Isentropic efficiency",
							value: econ.etaMachine,
							onChange: (etaMachine) => onEcon({ etaMachine }),
							suffix: "%"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: "Motor efficiency",
							value: econ.etaMotor,
							onChange: (etaMotor) => onEcon({ etaMotor }),
							suffix: "%"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: "Hours per year",
							value: econ.hours,
							onChange: (hours) => onEcon({ hours }),
							suffix: "h"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: "Duty factor",
							value: econ.load,
							onChange: (load) => onEcon({ load }),
							suffix: "%"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: "Tariff",
							value: econ.tariff,
							onChange: (tariff) => onEcon({ tariff }),
							suffix: `${currency}/kWh`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sel, {
							label: "Currency",
							value: econ.currency,
							onChange: (currency) => onEcon({ currency }),
							options: [
								"AED",
								"USD",
								"INR",
								"EUR"
							].map((id) => ({
								id,
								label: id
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: "Installed pipe at 100 mm",
							value: econ.pipeCost100,
							onChange: (pipeCost100) => onEcon({ pipeCost100 }),
							suffix: `${currency}/m`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: "Pipe cost exponent",
							value: econ.pipeExp,
							onChange: (pipeExp) => onEcon({ pipeExp }),
							suffix: "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: "Annual capital charge",
							value: econ.capitalCharge * 100,
							onChange: (pct) => onEcon({ capitalCharge: pct / 100 }),
							suffix: "%"
						})
					]
				})]
			})
		]
	});
}
function PressureChart({ points, xLabel }) {
	const [lib, setLib] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let live = true;
		import("../_libs/recharts+[...].mjs").then((n) => n.t).then((mod) => {
			if (live) setLib(mod);
		});
		return () => {
			live = false;
		};
	}, []);
	if (points.length < 2) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-line bg-surface p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-medium tracking-wide text-muted uppercase",
				children: "Pressure along the line"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-48",
				children: lib ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(lib.ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(lib.LineChart, {
						data: points,
						margin: {
							top: 8,
							right: 8,
							left: 0,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(lib.CartesianGrid, {
								stroke: "var(--color-line)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(lib.XAxis, {
								dataKey: "x",
								tick: {
									fill: "var(--color-muted)",
									fontSize: 12
								},
								tickFormatter: (v) => String(Math.round(v * 10) / 10),
								stroke: "var(--color-line)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(lib.YAxis, {
								tick: {
									fill: "var(--color-muted)",
									fontSize: 12
								},
								width: 44,
								stroke: "var(--color-line)",
								tickFormatter: (v) => String(Math.round(v * 10) / 10)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(lib.Tooltip, {
								formatter: (value) => {
									const n = typeof value === "number" ? value : Number(value);
									return [`${Number.isFinite(n) ? n.toFixed(2) : "—"} gauge`, "Pressure"];
								},
								labelFormatter: (label) => `${label} ${xLabel}`,
								contentStyle: {
									background: "var(--color-ink)",
									border: "none",
									borderRadius: 8,
									color: "var(--color-on-ink)",
									fontSize: 12
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(lib.Line, {
								type: "monotone",
								dataKey: "p",
								stroke: "var(--color-accent)",
								strokeWidth: 2,
								dot: false,
								isAnimationActive: false
							})
						]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full rounded-md bg-inset" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-muted",
				children: [
					"Distance (",
					xLabel,
					") · gauge pressure in the selected unit"
				]
			})
		]
	});
}
var FAIL = (message) => ({
	ok: false,
	message,
	diameterM: 0,
	massKgS: 0,
	lengthM: 0,
	friction: 0,
	re: 0,
	regime: "turbulent",
	kMinor: 0,
	p1AbsPa: 0,
	p2AbsPa: 0,
	dpPa: 0,
	rhoIn: 0,
	rhoOut: 0,
	rhoMean: 0,
	vIn: 0,
	vOut: 0,
	machOut: 0,
	sonic: 0,
	erosional: 0,
	beta: 0,
	profile: []
});
function betaOf(z, mw, tK) {
	return z * specificGasConstant(mw) * tK;
}
/**
* Isothermal compressible Darcy with elevation.
* P1² − P2² e^s = (f L/D + K) G² β (e^s − 1)/s
* s = 2 g Δz / β, β = Z R_specific T, G = mass flux.
* Kinetic-energy change is neglected (screening model, not for choked flow).
*/
function evalGasAt(input) {
	const { mw, mu, z, tK, gamma, massKgS: m, diameterM: d, lengthM: l, elevM, roughnessM, kMinor, p1AbsPa: p1 } = input;
	if (!(mw > 1) || !(mu > 0) || !(z > 0) || !(tK > 150)) return FAIL("Molecular weight, viscosity, Z and temperature must be physical.");
	if (!(m > 0) || !(d > 0) || !(l >= 0) || !(p1 > 0)) return FAIL("Flow, diameter, length and inlet pressure must be positive. Use absolute pressure.");
	if (!(gamma > 1)) return FAIL("Heat capacity ratio k must be greater than 1.");
	const gFlux = m / (Math.PI * d * d / 4);
	const re = gFlux * d / mu;
	const friction = darcyFriction(re, roughnessM / d);
	if (!Number.isFinite(friction) || friction <= 0) return FAIL("Friction factor did not converge.");
	const beta = betaOf(z, mw, tK);
	const s = 2 * G * elevM / beta;
	const phi = expm1Over(s);
	const fTerm = (friction * (l / d) + kMinor) * gFlux * gFlux * beta * phi;
	const p2sq = (p1 * p1 - fTerm) / Math.exp(s);
	const limited = p2sq <= 0;
	const p2 = limited ? 0 : Math.sqrt(p2sq);
	const rho = (p) => p > 0 ? p / beta : 0;
	const rhoIn = rho(p1);
	const rhoOut = rho(p2);
	const rhoMean = rho(p1 > 0 && p2 > 0 ? 2 / 3 * ((p1 * p1 + p1 * p2 + p2 * p2) / (p1 + p2)) : p1 / 2);
	const vIn = rhoIn > 0 ? gFlux / rhoIn : 0;
	const vOut = rhoOut > 0 ? gFlux / rhoOut : Number.POSITIVE_INFINITY;
	const sonic = Math.sqrt(gamma * beta);
	const machOut = sonic > 0 && Number.isFinite(vOut) ? vOut / sonic : Number.POSITIVE_INFINITY;
	const erosional = rhoOut > 0 ? 122 / Math.sqrt(rhoOut) : 0;
	const steps = 24;
	const profile = [];
	for (let i = 0; i <= steps; i++) {
		const x = l > 0 ? l * i / steps : 0;
		const sx = l > 0 ? s * (x / l) : 0;
		const kx = l > 0 ? kMinor * (x / l) : 0;
		const fx = (friction * (x / d) + kx) * gFlux * gFlux * beta * expm1Over(sx);
		const inside = (p1 * p1 - fx) / Math.exp(sx);
		profile.push({
			xM: x,
			pAbsPa: inside > 0 ? Math.sqrt(inside) : 0
		});
	}
	return {
		ok: !limited,
		message: limited ? "Inlet pressure cannot push this flow through the line. Outlet would fall to vacuum — increase pressure or bore, or shorten the line." : "",
		diameterM: d,
		massKgS: m,
		lengthM: l,
		friction,
		re,
		regime: regimeOf(re),
		kMinor,
		p1AbsPa: p1,
		p2AbsPa: p2,
		dpPa: p1 - p2,
		rhoIn,
		rhoOut,
		rhoMean,
		vIn,
		vOut: Number.isFinite(vOut) ? vOut : 0,
		machOut: Number.isFinite(machOut) ? machOut : 0,
		sonic,
		erosional,
		beta,
		profile
	};
}
function withFixed(req, patch) {
	return evalGasAt({
		mw: req.mw,
		mu: req.mu,
		z: req.z,
		tK: req.tK,
		gamma: req.gamma,
		massKgS: patch.massKgS ?? req.massKgS,
		diameterM: patch.diameterM ?? req.diameterM,
		lengthM: patch.lengthM ?? req.lengthM,
		elevM: req.elevM,
		roughnessM: req.roughnessM,
		kMinor: req.kMinor,
		p1AbsPa: req.p1AbsPa
	});
}
function solveDiameter(req) {
	const at = (d) => withFixed(req, { diameterM: d });
	let lo = .015;
	let hi = 2.5;
	const top = at(hi);
	if (top.ok && top.p2AbsPa > req.p2AbsPa && hi >= 2.5 && top.p2AbsPa < req.p1AbsPa) {}
	if (!at(hi).ok || at(hi).p2AbsPa < req.p2AbsPa) return FAIL("A 2.5 m bore still misses the required outlet pressure.");
	if (at(lo).ok && at(lo).p2AbsPa >= req.p2AbsPa) return FAIL("Even a 15 mm bore meets the outlet pressure. The line is oversized for this drop.");
	for (let i = 0; i < 58; i++) {
		const mid = (lo + hi) / 2;
		const ev = at(mid);
		if (ev.ok && ev.p2AbsPa >= req.p2AbsPa) hi = mid;
		else lo = mid;
	}
	return at(hi);
}
function solveFlow(req) {
	const at = (m) => withFixed(req, { massKgS: m });
	let lo = 1e-4;
	let hi = 5;
	let guard = 0;
	while (guard < 24) {
		const ev = at(hi);
		if (!ev.ok || ev.p2AbsPa < req.p2AbsPa) break;
		hi *= 2;
		guard += 1;
		if (hi > 5e4) return FAIL("Outlet pressure is still met at an extreme flow. Check the pressures.");
	}
	if (at(lo).ok && at(lo).p2AbsPa < req.p2AbsPa) return FAIL("Even a tiny flow misses the outlet pressure.");
	for (let i = 0; i < 58; i++) {
		const mid = (lo + hi) / 2;
		const ev = at(mid);
		if (ev.ok && ev.p2AbsPa >= req.p2AbsPa) lo = mid;
		else hi = mid;
	}
	return at(lo);
}
function solveLength(req) {
	const probe = withFixed(req, {
		lengthM: 0,
		kMinor: 0
	});
	if (!probe.ok && probe.message.includes("positive")) return probe;
	const area = Math.PI * req.diameterM * req.diameterM / 4;
	const gFlux = req.massKgS / area;
	const friction = darcyFriction(gFlux * req.diameterM / req.mu, req.roughnessM / req.diameterM);
	const beta = betaOf(req.z, req.mw, req.tK);
	const s = 2 * G * req.elevM / beta;
	const phi = expm1Over(s);
	const rhs = req.p1AbsPa ** 2 - req.p2AbsPa ** 2 * Math.exp(s);
	if (rhs <= 0) return FAIL("Outlet pressure is too high for this inlet and elevation.");
	const lengthTerm = rhs / (gFlux * gFlux * beta * phi) - req.kMinor;
	if (lengthTerm <= 0) return FAIL("Fitting losses alone exceed the available pressure ratio.");
	const lengthM = lengthTerm * req.diameterM / friction;
	if (!(lengthM > 0) || !Number.isFinite(lengthM)) return FAIL("Length did not solve.");
	return withFixed(req, { lengthM });
}
function solveGas(req) {
	if (!(req.p1AbsPa > req.p2AbsPa) && req.mode !== "drop" && req.elevM >= 0) {}
	if (req.mode !== "drop" && !(req.p2AbsPa > 0)) return FAIL("Outlet pressure must be positive absolute.");
	if (req.mode !== "drop" && req.p2AbsPa >= req.p1AbsPa && req.elevM >= -1) {
		if (req.elevM >= 0) return FAIL("Outlet pressure must be below inlet on a level or uphill line.");
	}
	if (req.mode === "drop") return withFixed(req, {});
	if (req.mode === "diameter") {
		if (!(req.massKgS > 0) || !(req.lengthM > 0)) return FAIL("Flow and length must be positive.");
		return solveDiameter(req);
	}
	if (req.mode === "flow") {
		if (!(req.diameterM > 0) || !(req.lengthM > 0)) return FAIL("Diameter and length must be positive.");
		return solveFlow(req);
	}
	if (!(req.massKgS > 0) || !(req.diameterM > 0)) return FAIL("Flow and diameter must be positive.");
	return solveLength(req);
}
function gasWarnings(ev) {
	if (!ev.ok && ev.p2AbsPa === 0) return [ev.message];
	if (!ev.ok) return [];
	const notes = [];
	if (ev.machOut > .6) notes.push("Outlet Mach is above 0.6. The isothermal model is only a screen this close to sonic velocity.");
	else if (ev.machOut > .3) notes.push("Outlet Mach is above 0.3. Expansion is no longer gentle — confirm Z and the pressure profile.");
	if (ev.erosional > 0 && ev.vOut > ev.erosional) notes.push(`Outlet velocity ${ev.vOut.toFixed(1)} m/s exceeds the API RP 14E erosional screen (c = 100, about ${ev.erosional.toFixed(1)} m/s).`);
	if (ev.p1AbsPa > 0 && ev.dpPa / ev.p1AbsPa > .4) notes.push("Pressure drop is more than 40% of inlet. Re-estimate Z at the average pressure.");
	if (ev.regime !== "turbulent") notes.push("Reynolds number is not fully turbulent. Unusual for a gas line — check viscosity and bore.");
	return notes;
}
var HINT$1 = {
	drop: "Flow, bore, length and inlet pressure. Outlet pressure is the result.",
	diameter: "Flow, length and both pressures. Minimum bore is the result.",
	flow: "Bore, length and both pressures. Capacity is the result.",
	length: "Flow, bore and both pressures. Reach is the result."
};
function GasPanel({ state, setState, onSave }) {
	const [name, setName] = (0, import_react.useState)("Natural gas line");
	const [sheet, setSheet] = (0, import_react.useState)(null);
	const k = sumK(state.fittings);
	const tK = state.tempC + 273.15;
	const p1Abs = pressureToPa(state.p1, state.pUnit) + state.patmBar * BAR_PA;
	const p2Abs = pressureToPa(state.p2, state.pUnit) + state.patmBar * BAR_PA;
	const result = (0, import_react.useMemo)(() => {
		return solveGas({
			mode: state.mode,
			mw: state.mw,
			mu: state.viscCp * .001,
			z: state.z,
			tK,
			gamma: state.gamma,
			massKgS: gasFlowToKgS(state.flowValue, state.flowUnit, state.mw, tK, state.z, p1Abs),
			diameterM: diamToM(state.diamValue, state.diamUnit),
			lengthM: lengthToM(state.lengthValue, state.lengthUnit),
			elevM: lengthToM(state.elevValue, state.elevUnit),
			roughnessM: state.roughMm / 1e3,
			kMinor: k,
			p1AbsPa: p1Abs,
			p2AbsPa: p2Abs
		});
	}, [
		state,
		k,
		tK,
		p1Abs,
		p2Abs
	]);
	const unit = pressureUnitLabel(state.pUnit);
	const warnings = result.ok ? gasWarnings(result) : [];
	const long = result.lengthM >= 2e3;
	const chart = result.profile.filter((pt) => pt.pAbsPa > 0 || pt.xM === 0).map((pt) => ({
		x: long ? pt.xM / 1e3 : pt.xM,
		p: paToPressure(pt.pAbsPa - state.patmBar * BAR_PA, state.pUnit)
	}));
	const variants = (0, import_react.useMemo)(() => {
		if (!result.ok) return [];
		return [
			.6,
			.8,
			1,
			1.2,
			1.4
		].map((factor) => {
			return {
				factor,
				ev: evalGasAt({
					mw: state.mw,
					mu: state.viscCp * .001,
					z: state.z,
					tK,
					gamma: state.gamma,
					massKgS: result.massKgS * factor,
					diameterM: result.diameterM,
					lengthM: result.lengthM,
					elevM: lengthToM(state.elevValue, state.elevUnit),
					roughnessM: state.roughMm / 1e3,
					kMinor: k,
					p1AbsPa: p1Abs
				})
			};
		});
	}, [
		result,
		state,
		k,
		tK,
		p1Abs
	]);
	const bores = result.ok && state.mode === "diameter" ? recommendBores(result.diameterM * 1e3) : [];
	const econ = {
		etaMachine: state.etaMachine,
		etaMotor: state.etaMotor,
		hours: state.hours,
		load: state.load,
		tariff: state.tariff,
		pipeCost100: state.pipeCost100,
		pipeExp: state.pipeExp,
		capitalCharge: state.capitalCharge
	};
	const sized = (0, import_react.useMemo)(() => {
		if (!result.ok) return null;
		const common = {
			mw: state.mw,
			mu: state.viscCp * .001,
			z: state.z,
			tK,
			gamma: state.gamma,
			massKgS: result.massKgS,
			lengthM: result.lengthM,
			elevM: lengthToM(state.elevValue, state.elevUnit),
			roughnessM: state.roughMm / 1e3,
			kMinor: k,
			p1AbsPa: p1Abs
		};
		const powerAt = (diameterM) => {
			const ev = evalGasAt({
				...common,
				diameterM
			});
			if (!ev.ok || !(ev.p2AbsPa > 0)) return null;
			const comp = electricCompressorW({
				massKgS: result.massKgS,
				z: state.z,
				gamma: state.gamma,
				mw: state.mw,
				tK,
				pSuctionPa: ev.p2AbsPa,
				pDischargePa: p1Abs,
				etaIsentropicPct: state.etaMachine,
				etaDriverPct: state.etaMotor
			});
			return comp.ok ? comp.powerW : null;
		};
		const current = electricCompressorW({
			massKgS: result.massKgS,
			z: state.z,
			gamma: state.gamma,
			mw: state.mw,
			tK,
			pSuctionPa: result.p2AbsPa,
			pDischargePa: p1Abs,
			etaIsentropicPct: state.etaMachine,
			etaDriverPct: state.etaMotor
		});
		const opt = optimizeDiameter(result.lengthM, econ, powerAt);
		const atOpt = opt ? evalGasAt({
			...common,
			diameterM: opt.diameterM
		}) : null;
		return {
			currentW: current.ok ? current.powerW : 0,
			ratio: current.ratio,
			opt,
			velocity: atOpt?.ok ? atOpt.vOut : null
		};
	}, [
		result,
		state,
		k,
		tK,
		p1Abs,
		econ
	]);
	function patch(p) {
		setState((s) => ({
			...s,
			...p
		}));
	}
	function pickPipe(nps, schedule) {
		const size = pipeSize(nps, schedule);
		if (!size) return;
		setState((s) => ({
			...s,
			nps,
			schedule,
			diamValue: mToDiam(size.idMm / 1e3, s.diamUnit)
		}));
	}
	function flowText(kgs) {
		return num(kgSToGasFlow(kgs, state.flowUnit, state.mw, tK, state.z, p1Abs));
	}
	function openSheet() {
		if (!result.ok || !sized) return;
		setSheet(makeGasSheet({
			name,
			state,
			result,
			k,
			elevM: lengthToM(state.elevValue, state.elevUnit),
			compressorW: sized.currentW,
			ratio: sized.ratio,
			optimum: sized.opt,
			warnings,
			variants: {
				headers: [
					"Flow",
					"P2",
					"ΔP",
					"m/s"
				],
				rows: variants.map((v) => v.ev.ok ? [
					flowText(v.ev.massKgS),
					num(gauge(v.ev.p2AbsPa)),
					num(paToPressure(v.ev.dpPa, state.pUnit)),
					num(v.ev.vOut)
				] : [
					flowText(result.massKgS * v.factor),
					"vacuum",
					"—",
					"—"
				])
			}
		}));
	}
	const gauge = (abs) => paToPressure(abs - state.patmBar * BAR_PA, state.pUnit);
	const summary = result.ok ? `P2 ${num(gauge(result.p2AbsPa))} ${unit} · ${num(result.vOut)} m/s out · Mach ${num(result.machOut, 2)}` : result.message;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-12 z-10 -mx-4 bg-bg px-4 py-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "rounded-lg border border-line border-l-4 border-l-accent bg-surface p-4",
					children: result.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wide text-muted uppercase",
							children: state.mode === "drop" ? "Outlet pressure" : state.mode === "diameter" ? "Required bore" : state.mode === "flow" ? "Capacity" : "Length"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-4xl font-semibold text-accent tabular-nums",
							children: [state.mode === "drop" ? num(gauge(result.p2AbsPa)) : state.mode === "diameter" ? num(result.diameterM * 1e3, 1) : state.mode === "flow" ? flowText(result.massKgS) : num(result.lengthM), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-lg text-ink",
								children: state.mode === "drop" ? unit : state.mode === "diameter" ? "mm" : state.mode === "flow" ? GAS_FLOW_UNITS.find((u) => u.id === state.flowUnit)?.label : "m"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								"Drop ",
								num(paToPressure(result.dpPa, state.pUnit)),
								" ",
								unit,
								" · compressor",
								" ",
								sized ? num(sized.currentW / 1e3) : "—",
								" kW",
								sized?.opt ? ` · optimum ${num(sized.opt.diameterM * 1e3, 0)} mm` : ""
							]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: result.message
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "h-11 rounded-md bg-accent text-sm font-medium text-accent-ink disabled:opacity-50",
				disabled: !result.ok || !sized,
				onClick: openSheet,
				children: "Export PDF"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeBar, {
				value: state.mode,
				onChange: (mode) => patch({ mode }),
				hint: HINT$1[state.mode]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sel, {
						label: "Gas",
						value: state.fluidId,
						onChange: (id) => {
							const fluid = GAS_FLUIDS.find((f) => f.id === id);
							if (!fluid) return;
							patch({
								fluidId: id,
								mw: fluid.mw,
								sg: fluid.sg,
								viscCp: fluid.viscCp,
								gamma: fluid.gamma,
								z: fluid.z
							});
							setName(fluid.label);
						},
						options: GAS_FLUIDS.map((f) => ({
							id: f.id,
							label: f.label
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Temperature",
						value: state.tempC,
						onChange: (tempC) => patch({ tempC }),
						suffix: "°C"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Flow",
						value: state.flowValue,
						onChange: (flowValue) => patch({ flowValue }),
						options: GAS_FLOW_UNITS,
						option: state.flowUnit,
						onOption: (id) => {
							const flowUnit = id;
							const flowValue = kgSToGasFlow(gasFlowToKgS(state.flowValue, state.flowUnit, state.mw, tK, state.z, p1Abs), flowUnit, state.mw, tK, state.z, p1Abs);
							patch({
								flowUnit,
								flowValue: Number.isFinite(flowValue) ? flowValue : state.flowValue
							});
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Molecular weight",
						value: state.mw,
						onChange: (mw) => patch({
							mw,
							fluidId: "customG"
						}),
						suffix: "g/mol"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Compressibility Z",
						value: state.z,
						onChange: (z) => patch({ z }),
						suffix: "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Viscosity",
						value: state.viscCp,
						onChange: (viscCp) => patch({
							viscCp,
							fluidId: "customG"
						}),
						suffix: "cP"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Ratio k = Cp/Cv",
						value: state.gamma,
						onChange: (gamma) => patch({ gamma }),
						suffix: "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Specific gravity",
						value: state.sg,
						onChange: (sg) => patch({ sg }),
						suffix: "air = 1"
					}),
					state.mode !== "diameter" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Inside diameter",
						value: state.diamValue,
						onChange: (diamValue) => patch({ diamValue }),
						options: DIAM_UNITS,
						option: state.diamUnit,
						onOption: (id) => {
							const diamUnit = id;
							patch({
								diamUnit,
								diamValue: convertDiam(state.diamValue, state.diamUnit, diamUnit)
							});
						}
					}) : null,
					state.mode !== "length" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Length",
						value: state.lengthValue,
						onChange: (lengthValue) => patch({ lengthValue }),
						options: LENGTH_UNITS,
						option: state.lengthUnit,
						onOption: (id) => {
							const lengthUnit = id;
							patch({
								lengthUnit,
								lengthValue: convertLength(state.lengthValue, state.lengthUnit, lengthUnit)
							});
						}
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Elevation rise",
						value: state.elevValue,
						onChange: (elevValue) => patch({ elevValue }),
						options: LENGTH_UNITS,
						option: state.elevUnit,
						onOption: (id) => {
							const elevUnit = id;
							patch({
								elevUnit,
								elevValue: convertLength(state.elevValue, state.elevUnit, elevUnit)
							});
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Inlet pressure, gauge",
						value: state.p1,
						onChange: (p1) => patch({ p1 }),
						options: PRESSURE_UNITS,
						option: state.pUnit,
						onOption: (id) => {
							const pUnit = id;
							patch({
								pUnit,
								p1: convertPressure(state.p1, state.pUnit, pUnit),
								p2: convertPressure(state.p2, state.pUnit, pUnit)
							});
						}
					}),
					state.mode !== "drop" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Outlet pressure, gauge",
						value: state.p2,
						onChange: (p2) => patch({ p2 }),
						suffix: unit
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 rounded-md border border-line bg-surface px-3 text-sm text-ink",
					onClick: () => {
						const z = papayZ(state.mode === "drop" ? p1Abs * .85 : (p1Abs + p2Abs) / 2, tK, state.sg);
						if (Number.isFinite(z)) patch({ z: Math.round(z * 1e3) / 1e3 });
					},
					children: "Estimate Z"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Papay / Standing, sweet dry gas only. Check it before you use it."
				})]
			}),
			state.mode !== "diameter" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PipeRow, {
				nps: state.nps,
				schedule: state.schedule,
				onPick: pickPipe
			}) : null,
			result.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Inlet velocity",
						value: `${num(result.vIn)} m/s`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Outlet velocity",
						value: `${num(result.vOut)} m/s`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Outlet Mach",
						value: num(result.machOut, 3)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Erosional",
						value: `${num(result.erosional)} m/s`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Density in",
						value: `${num(result.rhoIn)} kg/m³`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Density out",
						value: `${num(result.rhoOut)} kg/m³`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Reynolds",
						value: result.re >= 1e4 ? result.re.toExponential(2) : num(result.re, 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Friction f",
						value: result.friction.toFixed(4)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Mass flow",
						value: `${num(result.massKgS * 3600)} kg/h`
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notes, { items: warnings }),
			result.ok && sized ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimumCard, {
				driver: "compressor",
				currency: state.currency,
				currentMm: result.diameterM * 1e3,
				currentKw: sized.currentW / 1e3,
				currentDetail: (() => {
					const split = annualSplit(sized.currentW, result.diameterM, result.lengthM, econ);
					return `${num(split.totalAnnual, 0)} ${state.currency}/y · ${num(split.pipeAnnual, 0)} pipe · ${num(split.energyAnnual, 0)} power`;
				})(),
				optimumMm: sized.opt ? sized.opt.diameterM * 1e3 : null,
				optimumKw: sized.opt ? sized.opt.powerW / 1e3 : null,
				optimumDetail: sized.opt ? `${num(sized.opt.annual.totalAnnual, 0)} ${state.currency}/y · ${num(sized.opt.annual.pipeAnnual, 0)} pipe · ${num(sized.opt.annual.energyAnnual, 0)} power` : "—",
				optimumVelocity: sized.velocity,
				edge: sized.opt?.edge ?? null,
				ratio: sized.ratio,
				standard: sized.opt ? recommendBores(sized.opt.diameterM * 1e3).reduce((best, pipe) => !best || pipe.idMm < best.idMm ? pipe : best, null) : null,
				onUseMm: (mm) => {
					setState((s) => ({
						...s,
						mode: "drop",
						diamValue: mToDiam(mm / 1e3, s.diamUnit)
					}));
				},
				onUsePipe: (nps, schedule) => {
					pickPipe(nps, schedule);
					patch({ mode: "drop" });
				},
				econ: {
					...econ,
					currency: state.currency
				},
				onEcon: (partial) => patch(partial)
			}) : null,
			bores.length > 0 && result.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-line bg-surface p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted uppercase",
					children: "Next standard bores"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 flex flex-col gap-2",
					children: bores.map((pipe) => {
						const ev = evalGasAt({
							mw: state.mw,
							mu: state.viscCp * .001,
							z: state.z,
							tK,
							gamma: state.gamma,
							massKgS: result.massKgS,
							diameterM: pipe.idMm / 1e3,
							lengthM: result.lengthM,
							elevM: lengthToM(state.elevValue, state.elevUnit),
							roughnessM: state.roughMm / 1e3,
							kMinor: k,
							p1AbsPa: p1Abs
						});
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-medium text-ink",
								children: [
									"NPS ",
									pipe.nps,
									" · ",
									scheduleLabel(pipe.nps, pipe.schedule)
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									"ID ",
									num(pipe.idMm, 2),
									" mm",
									ev.ok ? ` · P2 ${num(gauge(ev.p2AbsPa))} ${unit} · ${num(ev.vOut)} m/s` : ""
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 shrink-0 rounded-md border border-accent px-3 text-sm font-medium text-accent",
								onClick: () => {
									pickPipe(pipe.nps, pipe.schedule);
									patch({ mode: "drop" });
								},
								children: "Use"
							})]
						}, `${pipe.nps}-${pipe.schedule}`);
					})
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PressureChart, {
				points: chart,
				xLabel: long ? "km" : "m"
			}),
			variants.some((v) => v.ev.ok) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VariantTable, {
				title: "Pressure variants",
				note: "Same line. Outlet gauge pressure as flow moves from 60% to 140%.",
				headers: [
					"Flow",
					"P2",
					"ΔP",
					"m/s"
				],
				rows: variants.map((v) => ({
					key: String(v.factor),
					active: v.factor === 1,
					cells: v.ev.ok ? [
						flowText(v.ev.massKgS),
						num(gauge(v.ev.p2AbsPa)),
						num(paToPressure(v.ev.dpPa, state.pUnit)),
						num(v.ev.vOut)
					] : [
						flowText(result.massKgS * v.factor),
						"vacuum",
						"—",
						"—"
					]
				}))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoughRow, {
				roughId: state.roughId,
				onChange: (roughId, roughMm) => patch({
					roughId,
					roughMm
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FittingsBlock, {
				counts: state.fittings,
				onChange: (fittings) => patch({ fittings })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
				label: "Atmosphere",
				value: state.patmBar,
				onChange: (patmBar) => patch({ patmBar }),
				suffix: "bar abs"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveBar, {
				name,
				onName: setName,
				onSave: () => onSave(name.trim() || "Gas case", summary)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "h-11 rounded-md bg-accent text-sm font-medium text-accent-ink disabled:opacity-50",
				disabled: !result.ok || !sized,
				onClick: openSheet,
				children: "Export PDF"
			}),
			sheet ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Datasheet, {
				model: sheet,
				onClose: () => setSheet(null),
				onUserNote: (sheetNote) => patch({ sheetNote })
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Isothermal compressible Darcy–Weisbach. Compressor kW is the isentropic power to lift the outlet pressure back to the inlet. The economic bore minimises pipe capital charge plus that electricity. Nm³ is 0°C and 1.01325 bar. Erosional velocity is the API RP 14E screen with c = 100, not a project limit."
			})
		]
	});
}
var HINT = {
	drop: "Flow, bore and length are known. Pressure drop is the result.",
	diameter: "Flow, length and the two pressures are known. Bore is the result.",
	flow: "Bore, length and the two pressures are known. Flow is the result.",
	length: "Flow, bore and the two pressures are known. Length is the result."
};
function LiquidPanel({ state, setState, onSave, onUsePump }) {
	const [name, setName] = (0, import_react.useState)("Water line");
	const [sheet, setSheet] = (0, import_react.useState)(null);
	const k = sumK(state.fittings);
	const result = (0, import_react.useMemo)(() => {
		return solveLiquid({
			mode: state.mode,
			rho: state.density,
			mu: state.viscCp * .001,
			flowM3s: liquidFlowToM3s(state.flowValue, state.flowUnit, state.density),
			diameterM: diamToM(state.diamValue, state.diamUnit),
			lengthM: lengthToM(state.lengthValue, state.lengthUnit),
			elevM: lengthToM(state.elevValue, state.elevUnit),
			roughnessM: state.roughMm / 1e3,
			kMinor: k,
			p1GaugePa: pressureToPa(state.p1, state.pUnit),
			p2GaugePa: pressureToPa(state.p2, state.pUnit)
		});
	}, [state, k]);
	const unit = pressureUnitLabel(state.pUnit);
	const warnings = result.ok ? liquidWarnings(result, state.service) : [];
	const long = result.ok && result.lengthM >= 2e3;
	const chart = result.ok ? result.profile.map((pt) => ({
		x: long ? pt.xM / 1e3 : pt.xM,
		p: paToPressure(pt.pGaugePa, state.pUnit)
	})) : [];
	const variants = (0, import_react.useMemo)(() => {
		if (!result.ok) return [];
		return [
			.6,
			.8,
			1,
			1.2,
			1.4
		].map((factor) => {
			return {
				factor,
				ev: evalLiquidAt({
					rho: state.density,
					mu: state.viscCp * .001,
					flowM3s: result.flowM3s * factor,
					diameterM: result.diameterM,
					lengthM: result.lengthM,
					elevM: lengthToM(state.elevValue, state.elevUnit),
					roughnessM: state.roughMm / 1e3,
					kMinor: k,
					p1GaugePa: pressureToPa(state.p1, state.pUnit)
				})
			};
		});
	}, [
		result,
		state,
		k
	]);
	const bores = result.ok && state.mode === "diameter" ? recommendBores(result.diameterM * 1e3) : [];
	const econ = {
		etaMachine: state.etaMachine,
		etaMotor: state.etaMotor,
		hours: state.hours,
		load: state.load,
		tariff: state.tariff,
		pipeCost100: state.pipeCost100,
		pipeExp: state.pipeExp,
		capitalCharge: state.capitalCharge
	};
	const sized = (0, import_react.useMemo)(() => {
		if (!result.ok) return null;
		const common = {
			rho: state.density,
			mu: state.viscCp * .001,
			flowM3s: result.flowM3s,
			lengthM: result.lengthM,
			elevM: lengthToM(state.elevValue, state.elevUnit),
			roughnessM: state.roughMm / 1e3,
			kMinor: k,
			p1GaugePa: pressureToPa(state.p1, state.pUnit)
		};
		const powerAt = (diameterM) => {
			const ev = evalLiquidAt({
				...common,
				diameterM
			});
			if (!ev.ok) return null;
			const watts = electricPumpW(state.density, result.flowM3s, ev.headTotalM, state.etaMachine, state.etaMotor);
			return Number.isFinite(watts) ? watts : null;
		};
		const currentW = powerAt(result.diameterM) ?? 0;
		const opt = optimizeDiameter(result.lengthM, econ, powerAt);
		const atOpt = opt ? evalLiquidAt({
			...common,
			diameterM: opt.diameterM
		}) : null;
		return {
			currentW,
			opt,
			velocity: atOpt?.ok ? atOpt.velocity : null,
			sinnottM: sinnottCarbonSteelM(result.flowM3s * state.density, state.density)
		};
	}, [
		result,
		state,
		k,
		econ
	]);
	function patch(p) {
		setState((s) => ({
			...s,
			...p
		}));
	}
	function pickPipe(nps, schedule) {
		const size = pipeSize(nps, schedule);
		if (!size) return;
		setState((s) => ({
			...s,
			nps,
			schedule,
			diamValue: mToDiam(size.idMm / 1e3, s.diamUnit)
		}));
	}
	function openSheet() {
		if (!result.ok || !sized) return;
		setSheet(makeLiquidSheet({
			name,
			state,
			result,
			k,
			pumpW: sized.currentW,
			optimum: sized.opt,
			sinnottMm: Number.isFinite(sized.sinnottM) ? sized.sinnottM * 1e3 : null,
			warnings,
			variants: {
				headers: [
					"Flow",
					"ΔP",
					"Outlet",
					"m/s"
				],
				rows: variants.map((v) => v.ev.ok ? [
					num(m3sToLiquidFlow(v.ev.flowM3s, state.flowUnit, state.density)),
					num(paToPressure(v.ev.dpTotalPa, state.pUnit)),
					num(paToPressure(v.ev.p2GaugePa, state.pUnit)),
					num(v.ev.velocity)
				] : [
					"—",
					"—",
					"—",
					"—"
				])
			}
		}));
	}
	const summary = result.ok ? `${num(paToPressure(result.dpTotalPa, state.pUnit), 2)} ${unit} drop · ${num(result.velocity)} m/s · ${num(result.headTotalM)} m head` : result.message;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-12 z-10 -mx-4 bg-bg px-4 py-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "rounded-lg border border-line border-l-4 border-l-accent bg-surface p-4",
					children: result.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wide text-muted uppercase",
							children: state.mode === "diameter" ? "Required bore" : state.mode === "flow" ? "Capacity" : state.mode === "length" ? "Length" : "Pressure drop"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-4xl font-semibold text-accent tabular-nums",
							children: [state.mode === "diameter" ? num(result.diameterM * 1e3, 1) : state.mode === "flow" ? num(m3sToLiquidFlow(result.flowM3s, state.flowUnit, state.density)) : state.mode === "length" ? num(result.lengthM) : num(paToPressure(result.dpTotalPa, state.pUnit)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-lg text-ink",
								children: state.mode === "diameter" ? "mm" : state.mode === "flow" ? LIQUID_FLOW_UNITS.find((u) => u.id === state.flowUnit)?.label : state.mode === "length" ? "m" : unit
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								"Outlet ",
								num(paToPressure(result.p2GaugePa, state.pUnit)),
								" ",
								unit,
								" · pump",
								" ",
								sized ? num(sized.currentW / 1e3) : "—",
								" kW",
								sized?.opt ? ` · optimum ${num(sized.opt.diameterM * 1e3, 0)} mm` : ""
							]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: result.message
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "h-11 rounded-md bg-accent text-sm font-medium text-accent-ink disabled:opacity-50",
				disabled: !result.ok || !sized,
				onClick: openSheet,
				children: "Export PDF"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeBar, {
				value: state.mode,
				onChange: (mode) => patch({ mode }),
				hint: HINT[state.mode]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sel, {
						label: "Fluid",
						value: state.fluidId,
						onChange: (id) => {
							const fluid = LIQUID_FLUIDS.find((f) => f.id === id);
							if (!fluid) return;
							patch({
								fluidId: id,
								density: fluid.density,
								viscCp: fluid.viscCp,
								pvapKpa: fluid.pvapKpa
							});
							setName(fluid.label);
						},
						options: LIQUID_FLUIDS.map((f) => ({
							id: f.id,
							label: f.label
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sel, {
						label: "Velocity band",
						value: state.service,
						onChange: (service) => patch({ service }),
						options: SERVICE_BANDS.map((s) => ({
							id: s.id,
							label: `${s.label} ${s.min}–${s.max} m/s`
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Flow",
						value: state.flowValue,
						onChange: (flowValue) => patch({ flowValue }),
						options: LIQUID_FLOW_UNITS,
						option: state.flowUnit,
						onOption: (id) => {
							const flowUnit = id;
							const flowValue = m3sToLiquidFlow(liquidFlowToM3s(state.flowValue, state.flowUnit, state.density), flowUnit, state.density);
							patch({
								flowUnit,
								flowValue: Number.isFinite(flowValue) ? flowValue : state.flowValue
							});
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Density",
						value: state.density,
						onChange: (density) => patch({
							density,
							fluidId: "customL"
						}),
						suffix: "kg/m³"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Viscosity",
						value: state.viscCp,
						onChange: (viscCp) => patch({
							viscCp,
							fluidId: "customL"
						}),
						suffix: "cP"
					}),
					state.mode !== "diameter" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Inside diameter",
						value: state.diamValue,
						onChange: (diamValue) => patch({ diamValue }),
						options: DIAM_UNITS,
						option: state.diamUnit,
						onOption: (id) => {
							const diamUnit = id;
							patch({
								diamUnit,
								diamValue: convertDiam(state.diamValue, state.diamUnit, diamUnit)
							});
						}
					}) : null,
					state.mode !== "length" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Length",
						value: state.lengthValue,
						onChange: (lengthValue) => patch({ lengthValue }),
						options: LENGTH_UNITS,
						option: state.lengthUnit,
						onOption: (id) => {
							const lengthUnit = id;
							patch({
								lengthUnit,
								lengthValue: convertLength(state.lengthValue, state.lengthUnit, lengthUnit)
							});
						}
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Elevation rise",
						value: state.elevValue,
						onChange: (elevValue) => patch({ elevValue }),
						options: LENGTH_UNITS,
						option: state.elevUnit,
						onOption: (id) => {
							const elevUnit = id;
							patch({
								elevUnit,
								elevValue: convertLength(state.elevValue, state.elevUnit, elevUnit)
							});
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Inlet pressure",
						value: state.p1,
						onChange: (p1) => patch({ p1 }),
						options: PRESSURE_UNITS,
						option: state.pUnit,
						onOption: (id) => {
							const pUnit = id;
							patch({
								pUnit,
								p1: convertPressure(state.p1, state.pUnit, pUnit),
								p2: convertPressure(state.p2, state.pUnit, pUnit)
							});
						}
					}),
					state.mode !== "drop" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Outlet pressure",
						value: state.p2,
						onChange: (p2) => patch({ p2 }),
						suffix: unit
					}) : null
				]
			}),
			state.mode !== "diameter" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PipeRow, {
				nps: state.nps,
				schedule: state.schedule,
				onPick: pickPipe
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Picking a schedule writes the ASME B36.10M bore into the diameter. Positive elevation is uphill, outlet above inlet."
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Positive elevation is uphill, outlet above inlet. Bore below is the minimum inside diameter."
			}),
			result.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Velocity",
						value: `${num(result.velocity)} m/s`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Reynolds",
						value: result.re >= 1e4 ? result.re.toExponential(2) : num(result.re, 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Friction f",
						value: result.friction.toFixed(4)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Regime",
						value: result.regime
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Friction head",
						value: `${num(result.headFrictionM + result.headMinorM)} m`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Static head",
						value: `${num(result.headStaticM)} m`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Minor ΔP",
						value: `${num(paToPressure(result.dpMinorPa, state.pUnit))} ${unit}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Mass flow",
						value: `${num(result.flowM3s * state.density * 3600)} kg/h`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Velocity head",
						value: `${num(result.velocity ** 2 / 19.6133, 3)} m`
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notes, { items: warnings }),
			result.ok && sized ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimumCard, {
				driver: "pump",
				currency: state.currency,
				currentMm: result.diameterM * 1e3,
				currentKw: sized.currentW / 1e3,
				currentDetail: (() => {
					const split = annualSplit(sized.currentW, result.diameterM, result.lengthM, econ);
					return `${num(split.totalAnnual, 0)} ${state.currency}/y · ${num(split.pipeAnnual, 0)} pipe · ${num(split.energyAnnual, 0)} power`;
				})(),
				optimumMm: sized.opt ? sized.opt.diameterM * 1e3 : null,
				optimumKw: sized.opt ? sized.opt.powerW / 1e3 : null,
				optimumDetail: sized.opt ? `${num(sized.opt.annual.totalAnnual, 0)} ${state.currency}/y · ${num(sized.opt.annual.pipeAnnual, 0)} pipe · ${num(sized.opt.annual.energyAnnual, 0)} power` : "—",
				hint: result.headTotalM > 0 && result.headStaticM > .45 * result.headTotalM ? "Elevation is most of the head. A larger bore only cuts friction, so the cheapest pipe stays near this size." : void 0,
				optimumVelocity: sized.velocity,
				edge: sized.opt?.edge ?? null,
				sinnottMm: sized.sinnottM * 1e3,
				standard: sized.opt ? recommendBores(sized.opt.diameterM * 1e3).reduce((best, pipe) => !best || pipe.idMm < best.idMm ? pipe : best, null) : null,
				onUseMm: (mm) => {
					setState((s) => ({
						...s,
						mode: "drop",
						diamValue: mToDiam(mm / 1e3, s.diamUnit)
					}));
				},
				onUsePipe: (nps, schedule) => {
					pickPipe(nps, schedule);
					patch({ mode: "drop" });
				},
				econ: {
					...econ,
					currency: state.currency
				},
				onEcon: (partial) => patch(partial)
			}) : null,
			bores.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-line bg-surface p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted uppercase",
					children: "Next standard bores"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 flex flex-col gap-2",
					children: bores.map((pipe) => {
						const ev = evalLiquidAt({
							rho: state.density,
							mu: state.viscCp * .001,
							flowM3s: result.flowM3s,
							diameterM: pipe.idMm / 1e3,
							lengthM: result.lengthM,
							elevM: lengthToM(state.elevValue, state.elevUnit),
							roughnessM: state.roughMm / 1e3,
							kMinor: k,
							p1GaugePa: pressureToPa(state.p1, state.pUnit)
						});
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-medium text-ink",
									children: [
										"NPS ",
										pipe.nps,
										" · ",
										scheduleLabel(pipe.nps, pipe.schedule)
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										"ID ",
										num(pipe.idMm, 2),
										" mm",
										ev.ok ? ` · ${num(paToPressure(ev.dpTotalPa, state.pUnit))} ${unit} · ${num(ev.velocity)} m/s` : ""
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 shrink-0 rounded-md border border-accent px-3 text-sm font-medium text-accent",
								onClick: () => {
									pickPipe(pipe.nps, pipe.schedule);
									patch({ mode: "drop" });
								},
								children: "Use"
							})]
						}, `${pipe.nps}-${pipe.schedule}`);
					})
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PressureChart, {
				points: chart,
				xLabel: long ? "km" : "m"
			}),
			variants.some((v) => v.ev.ok) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VariantTable, {
				title: "Pressure variants",
				note: "Same bore, length and elevation. Flow from 60% to 140% of this case.",
				headers: [
					"Flow",
					"ΔP",
					"Outlet",
					"m/s"
				],
				rows: variants.map((v) => ({
					key: String(v.factor),
					active: v.factor === 1,
					cells: v.ev.ok ? [
						num(m3sToLiquidFlow(v.ev.flowM3s, state.flowUnit, state.density)),
						num(paToPressure(v.ev.dpTotalPa, state.pUnit)),
						num(paToPressure(v.ev.p2GaugePa, state.pUnit)),
						num(v.ev.velocity)
					] : [
						"—",
						"—",
						"—",
						"—"
					]
				}))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoughRow, {
				roughId: state.roughId,
				onChange: (roughId, roughMm) => patch({
					roughId,
					roughMm
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FittingsBlock, {
				counts: state.fittings,
				onChange: (fittings) => patch({ fittings })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 rounded-md bg-accent text-sm font-medium text-accent-ink disabled:opacity-50",
						disabled: !result.ok || !sized,
						onClick: openSheet,
						children: "Export PDF"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 rounded-md border border-accent text-sm font-medium text-accent",
						disabled: !result.ok,
						onClick: () => {
							if (!result.ok) return;
							onUsePump(result.headFrictionM + result.headMinorM, result.headStaticM, state.density, result.flowM3s, state.pvapKpa);
						},
						children: "Send head to pump"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveBar, {
						name,
						onName: setName,
						onSave: () => onSave(name.trim() || "Liquid case", summary)
					})
				]
			}),
			sheet ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Datasheet, {
				model: sheet,
				onClose: () => setSheet(null),
				onUserNote: (sheetNote) => patch({ sheetNote })
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Darcy–Weisbach with the Churchill friction factor. Pump kW is ρgQH for the whole line, including elevation. The economic bore minimises pipe capital charge plus electricity. Library properties are reference values."
			})
		]
	});
}
var nps4 = pipeSize("4", "40");
var nps8 = pipeSize("8", "40");
var nps6 = pipeSize("6", "40");
var defaultLiquid = () => ({
	mode: "drop",
	fluidId: "water25",
	density: 997,
	viscCp: .89,
	pvapKpa: 3.17,
	flowValue: 40,
	flowUnit: "m3h",
	diamValue: nps4?.idMm ?? 102.3,
	diamUnit: "mm",
	lengthValue: 180,
	lengthUnit: "m",
	elevValue: 8,
	elevUnit: "m",
	roughId: "cs",
	roughMm: .046,
	p1: 6,
	p2: 4,
	pUnit: "bar",
	service: "process",
	nps: "4",
	schedule: "40",
	fittings: {
		elbow90lr: 2,
		gate: 1
	},
	patmBar: 1.01325,
	etaMachine: 75,
	etaMotor: 95,
	hours: 8e3,
	load: 100,
	tariff: .29,
	currency: "AED",
	pipeCost100: 250,
	pipeExp: 1.25,
	capitalCharge: .2,
	sheetNote: ""
});
var defaultGas = () => ({
	mode: "drop",
	fluidId: "ng",
	mw: 18.82,
	sg: .65,
	viscCp: .012,
	gamma: 1.27,
	z: .9,
	tempC: 35,
	flowValue: 25e3,
	flowUnit: "nm3h",
	diamValue: nps8?.idMm ?? 202.7,
	diamUnit: "mm",
	lengthValue: 5,
	lengthUnit: "km",
	elevValue: 0,
	elevUnit: "m",
	roughId: "cs",
	roughMm: .046,
	p1: 25,
	p2: 18,
	pUnit: "bar",
	nps: "8",
	schedule: "40",
	fittings: {},
	patmBar: 1.01325,
	etaMachine: 75,
	etaMotor: 95,
	hours: 8e3,
	load: 100,
	tariff: .29,
	currency: "AED",
	pipeCost100: 250,
	pipeExp: 1.25,
	capitalCharge: .2,
	sheetNote: ""
});
var defaultPump = () => ({
	mode: "system",
	density: 997,
	flowValue: 40,
	flowUnit: "m3h",
	ps: 1.2,
	pd: 5.8,
	pUnit: "bar",
	nozzleElev: .4,
	suctionMm: nps6?.idMm ?? 154,
	dischargeMm: nps4?.idMm ?? 102.3,
	staticLift: 8,
	frictionHead: 12,
	sourceP: 0,
	destP: 0,
	etaPump: 75,
	etaMotor: 95,
	hours: 8e3,
	load: 100,
	tariff: .29,
	currency: "AED",
	pvapKpa: 3.17,
	npshr: 3.5,
	patmBar: 1.01325,
	sheetNote: ""
});
function loopItem(partial) {
	return {
		lengthM: 0,
		nps: "4",
		schedule: "40",
		elevM: 0,
		fittings: {},
		dpClean: 0,
		foulFactor: 1,
		valveKind: "gate",
		qty: 1,
		valveStyle: "globe",
		fl: .9,
		minDp: 1,
		...partial
	};
}
function newLoopItem(kind) {
	const tag = kind === "pump" ? "P-201" : kind === "control" ? "FV-201" : kind === "check" ? "CH-201" : kind === "strainer" ? "ST-201" : kind === "exchanger" ? "E-201" : kind === "meter" ? "FE-201" : kind === "orifice" ? "RO-201" : kind === "mixer" ? "MX-201" : kind === "valve" ? "HV-201" : "Pipe";
	return loopItem({
		id: crypto.randomUUID(),
		kind,
		tag,
		lengthM: kind === "pipe" ? 25 : 0,
		nps: kind === "pipe" ? "4" : "3",
		dpClean: kind === "exchanger" ? .45 : kind === "strainer" ? .08 : kind === "meter" || kind === "orifice" ? .25 : kind === "mixer" ? .15 : 0,
		foulFactor: kind === "strainer" ? 3 : kind === "exchanger" ? 1.6 : 1,
		valveKind: kind === "check" ? "check" : "gate",
		minDp: 1
	});
}
var defaultLoop = () => ({
	name: "T-101 to C-201 feed",
	service: "Column feed",
	fluidId: "methanol",
	density: 792,
	viscCp: .59,
	pvapKpa: 12.9,
	pcKpa: 8090,
	tempC: 25,
	flowValue: 40,
	flowUnit: "m3h",
	pUnit: "bar",
	sourceName: "T-101",
	sourceP: .05,
	sourceElev: 1.5,
	destName: "C-201",
	destP: 4,
	destElev: 22,
	patmBar: 1.01325,
	roughMm: .046,
	pumpMode: "size",
	givenDp: 6,
	curve: "centrifugal",
	etaPump: 72,
	etaMotor: 95,
	npshr: 2.5,
	hours: 8e3,
	load: 100,
	tariff: .29,
	currency: "AED",
	sheetNote: "",
	items: [
		loopItem({
			id: "suction",
			kind: "pipe",
			tag: "6\"-P-1401",
			lengthM: 8,
			nps: "6",
			elevM: -1.5,
			fittings: {
				entrance: 1,
				elbow90lr: 2,
				gate: 1
			}
		}),
		loopItem({
			id: "st",
			kind: "strainer",
			tag: "ST-101",
			nps: "6",
			dpClean: .05,
			foulFactor: 2
		}),
		loopItem({
			id: "pump",
			kind: "pump",
			tag: "P-101",
			nps: "4"
		}),
		loopItem({
			id: "to-fe",
			kind: "pipe",
			tag: "4\"-P-1402",
			lengthM: 6,
			nps: "4",
			fittings: {
				elbow90lr: 2,
				gate: 1
			}
		}),
		loopItem({
			id: "fe",
			kind: "meter",
			tag: "FE-201",
			nps: "4",
			dpClean: .25
		}),
		loopItem({
			id: "rack",
			kind: "pipe",
			tag: "4\"-P-1403",
			lengthM: 45,
			nps: "4",
			elevM: 20.5,
			fittings: {
				elbow90lr: 6,
				gate: 2,
				ball: 1
			}
		}),
		loopItem({
			id: "fv",
			kind: "control",
			tag: "FV-201",
			nps: "4",
			valveStyle: "globe",
			fl: .9,
			minDp: 1.5
		}),
		loopItem({
			id: "to-e",
			kind: "pipe",
			tag: "4\"-P-1404",
			lengthM: 12,
			nps: "4",
			elevM: 1.5,
			fittings: { elbow90lr: 3 }
		}),
		loopItem({
			id: "e",
			kind: "exchanger",
			tag: "E-201",
			nps: "4",
			dpClean: .35,
			foulFactor: 1.5
		}),
		loopItem({
			id: "ch",
			kind: "check",
			tag: "CH-201",
			nps: "4"
		}),
		loopItem({
			id: "nozzle",
			kind: "pipe",
			tag: "4\"-P-1405",
			lengthM: 6,
			nps: "4",
			fittings: {
				elbow90lr: 1,
				exit: 1
			}
		})
	]
});
var DRAFT_KEY = "linespec.draft.v1";
var CASES_KEY = "linespec.cases.v1";
var PC_KPA = {
	water25: 22064,
	water40: 22064,
	seawater: 23e3,
	methanol: 8090,
	benzene: 4890,
	meg: 8200,
	vcm: 5590,
	gasoline: 4100,
	naphtha: 3800
};
var VALVE_KINDS = [
	{
		id: "gate",
		label: "Gate"
	},
	{
		id: "globe",
		label: "Globe"
	},
	{
		id: "ball",
		label: "Ball"
	},
	{
		id: "butterfly",
		label: "Butterfly"
	},
	{
		id: "plug",
		label: "Plug"
	}
];
function toRequest(state) {
	const p = (value) => pressureToPa(value, state.pUnit);
	const items = state.items.map((item) => ({
		id: item.id,
		kind: item.kind,
		tag: item.tag,
		lengthM: item.lengthM,
		nps: item.nps,
		schedule: item.schedule,
		elevM: item.elevM,
		fittings: item.fittings,
		dpCleanPa: p(item.dpClean),
		foulFactor: item.foulFactor,
		valveKind: item.valveKind,
		qty: item.qty,
		valveStyle: item.valveStyle,
		fl: item.fl,
		minDpPa: p(item.minDp)
	}));
	return {
		rho: state.density,
		mu: state.viscCp * .001,
		pvapPa: state.pvapKpa * 1e3,
		pcPa: state.pcKpa * 1e3,
		flowM3s: liquidFlowToM3s(state.flowValue, state.flowUnit, state.density),
		patmPa: state.patmBar * 1e5,
		roughM: state.roughMm / 1e3,
		sourcePPa: p(state.sourceP),
		destPPa: p(state.destP),
		sourceElevM: state.sourceElev,
		destElevM: state.destElev,
		pumpMode: state.pumpMode,
		givenDpPa: p(state.givenDp),
		curve: state.curve,
		etaPumpPct: state.etaPump,
		etaMotorPct: state.etaMotor,
		npshrM: state.npshr,
		items
	};
}
function LoopPanel({ state, setState, onSave }) {
	const [sheet, setSheet] = (0, import_react.useState)(null);
	const [hint, setHint] = (0, import_react.useState)("");
	const result = (0, import_react.useMemo)(() => evalLoop(toRequest(state)), [state]);
	const unit = pressureUnitLabel(state.pUnit);
	const patch = (partial) => setState({
		...state,
		...partial
	});
	const show = (pa) => `${num(paToPressure(pa, state.pUnit))} ${unit}`;
	function setItem(id, partial) {
		if (partial.kind === "pump" && state.items.some((item) => item.kind === "pump" && item.id !== id)) {
			setHint("This loop already has a pump.");
			return;
		}
		if (partial.kind === "control" && state.items.some((item) => item.kind === "control" && item.id !== id)) {
			setHint("This loop already has a control valve.");
			return;
		}
		setHint("");
		patch({ items: state.items.map((item) => item.id === id ? {
			...item,
			...partial
		} : item) });
	}
	function add(kind) {
		if (kind === "pump" && state.items.some((item) => item.kind === "pump")) {
			setHint("This loop already has a pump.");
			return;
		}
		if (kind === "control" && state.items.some((item) => item.kind === "control")) {
			setHint("This loop already has a control valve.");
			return;
		}
		setHint("");
		patch({ items: [...state.items, newLoopItem(kind)] });
	}
	function move(id, dir) {
		const index = state.items.findIndex((item) => item.id === id);
		const next = index + dir;
		if (index < 0 || next < 0 || next >= state.items.length) return;
		const items = state.items.slice();
		const [row] = items.splice(index, 1);
		items.splice(next, 0, row);
		patch({ items });
	}
	function onUnit(next) {
		const conv = (value) => paToPressure(pressureToPa(value, state.pUnit), next);
		patch({
			pUnit: next,
			sourceP: conv(state.sourceP),
			destP: conv(state.destP),
			givenDp: conv(state.givenDp),
			items: state.items.map((item) => ({
				...item,
				dpClean: conv(item.dpClean),
				minDp: conv(item.minDp)
			}))
		});
	}
	const nodes = [
		{
			tag: state.sourceName || "Source",
			kind: "source",
			note: `${num(state.sourceP)} ${unit}`
		},
		...state.items.filter((item) => item.kind !== "pipe").map((item) => {
			const row = result.items.find((entry) => entry.id === item.id);
			const note = item.kind === "pump" ? result.ok ? show(result.pumpDpPa) : "" : item.kind === "control" && result.valve ? `Cv ${num(result.valve.cv, 0)}` : row ? show(Math.abs(row.dynamicPa)) : "";
			return {
				tag: item.tag || item.kind,
				kind: item.kind,
				note
			};
		}),
		{
			tag: state.destName || "Destination",
			kind: "dest",
			note: `${num(state.destP)} ${unit}`
		}
	];
	const summary = result.ok ? `${result.hasPump ? show(result.pumpDpPa) : "No pump"} · Cv ${result.valve ? num(result.valve.cv, 1) : "—"} · ${num(result.pumpKW)} kW` : result.message;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-12 z-10 -mx-4 bg-bg px-4 py-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "rounded-lg border border-line border-l-4 border-l-accent bg-surface p-4",
					children: result.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wide text-muted uppercase",
							children: "Pump differential"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-4xl font-semibold text-accent tabular-nums",
							children: [result.hasPump ? num(paToPressure(result.pumpDpPa, state.pUnit)) : "—", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-lg text-ink",
								children: result.hasPump ? unit : ""
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								result.valve ? `${result.valve.tag} Cv ${num(result.valve.cv, 1)} · Kv ${num(result.valve.kv, 1)} · drop ${show(result.valve.dpPa)} · NPS ${result.valve.nps}` : "No positive control-valve drop",
								" · ",
								num(result.pumpKW),
								" kW · head ",
								num(result.pumpHeadM),
								" m"
							]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: result.message
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "h-11 rounded-md bg-accent text-sm font-medium text-accent-ink disabled:opacity-50",
				disabled: !result.ok,
				onClick: () => result.ok && setSheet(makeLoopSheet({
					state,
					result
				})),
				children: "Export PDF"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "min-w-0 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block text-xs font-medium text-muted",
							children: "Line"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-accent",
							value: state.name,
							onChange: (event) => patch({ name: event.target.value })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block text-xs font-medium text-muted",
							children: "Service"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-accent",
							value: state.service,
							onChange: (event) => patch({ service: event.target.value })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sel, {
						label: "Fluid",
						value: state.fluidId,
						onChange: (id) => {
							const fluid = LIQUID_FLUIDS.find((row) => row.id === id);
							if (!fluid) return;
							patch({
								fluidId: id,
								density: fluid.density,
								viscCp: fluid.viscCp,
								pvapKpa: fluid.pvapKpa,
								pcKpa: PC_KPA[id] ?? state.pcKpa
							});
						},
						options: LIQUID_FLUIDS.map((fluid) => ({
							id: fluid.id,
							label: fluid.label
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Flow",
						value: state.flowValue,
						onChange: (flowValue) => patch({ flowValue }),
						options: LIQUID_FLOW_UNITS,
						option: state.flowUnit,
						onOption: (id) => {
							const flowUnit = id;
							const q = liquidFlowToM3s(state.flowValue, state.flowUnit, state.density);
							patch({
								flowUnit,
								flowValue: m3sToLiquidFlow(q, flowUnit, state.density)
							});
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Temperature",
						value: state.tempC,
						onChange: (tempC) => patch({ tempC }),
						suffix: "°C"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Atmosphere",
						value: state.patmBar,
						onChange: (patmBar) => patch({ patmBar }),
						suffix: "bar abs"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Atmosphere is absolute. Line pressures below are gauge, in the unit you pick."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-1 rounded-md bg-inset p-1",
				children: PRESSURE_UNITS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": state.pUnit === option.id,
					className: "min-h-11 rounded-sm text-sm font-medium " + (state.pUnit === option.id ? "bg-accent text-accent-ink" : "text-muted"),
					onClick: () => onUnit(option.id),
					children: option.label
				}, option.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Density",
						value: state.density,
						onChange: (density) => patch({
							density,
							fluidId: "customL"
						}),
						suffix: "kg/m³"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Viscosity",
						value: state.viscCp,
						onChange: (viscCp) => patch({
							viscCp,
							fluidId: "customL"
						}),
						suffix: "cP"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Vapour pressure",
						value: state.pvapKpa,
						onChange: (pvapKpa) => patch({
							pvapKpa,
							fluidId: "customL"
						}),
						suffix: "kPa abs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Critical pressure",
						value: state.pcKpa,
						onChange: (pcKpa) => patch({ pcKpa }),
						suffix: "kPa abs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Roughness",
						value: state.roughMm,
						onChange: (roughMm) => patch({ roughMm }),
						suffix: "mm"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-line bg-surface p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium text-ink",
					children: "Ends"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Source",
							value: state.sourceName,
							onChange: (sourceName) => patch({ sourceName })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Destination",
							value: state.destName,
							onChange: (destName) => patch({ destName })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: "Source pressure",
							value: state.sourceP,
							onChange: (sourceP) => patch({ sourceP }),
							suffix: `${unit} g`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: "Destination pressure",
							value: state.destP,
							onChange: (destP) => patch({ destP }),
							suffix: `${unit} g`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: "Source elevation",
							value: state.sourceElev,
							onChange: (sourceElev) => patch({ sourceElev }),
							suffix: "m"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: "Destination elevation",
							value: state.destElev,
							onChange: (destElev) => patch({ destElev }),
							suffix: "m"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-line bg-surface p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium text-ink",
						children: "Pump basis"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-2 gap-1 rounded-md bg-inset p-1",
						children: [["size", "Size the pump"], ["given", "Given head"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": state.pumpMode === id,
							className: "min-h-11 rounded-sm text-sm font-medium " + (state.pumpMode === id ? "bg-accent text-accent-ink" : "text-muted"),
							onClick: () => patch({ pumpMode: id }),
							children: label
						}, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: "Size uses fouled equipment and the control-valve drop you enter. Given head keeps that differential and the valve takes what is left."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2",
						children: [
							state.pumpMode === "given" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "Pump differential",
								value: state.givenDp,
								onChange: (givenDp) => patch({ givenDp }),
								suffix: unit
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sel, {
								label: "Head curve",
								value: state.curve,
								onChange: (id) => patch({ curve: id }),
								options: [{
									id: "centrifugal",
									label: "Centrifugal screen"
								}, {
									id: "flat",
									label: "Flat head"
								}]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "Pump efficiency",
								value: state.etaPump,
								onChange: (etaPump) => patch({ etaPump }),
								suffix: "%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "Motor efficiency",
								value: state.etaMotor,
								onChange: (etaMotor) => patch({ etaMotor }),
								suffix: "%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "NPSHr",
								value: state.npshr,
								onChange: (npshr) => patch({ npshr }),
								suffix: "m"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "Running hours",
								value: state.hours,
								onChange: (hours) => patch({ hours }),
								suffix: "h/y"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "Tariff",
								value: state.tariff,
								onChange: (tariff) => patch({ tariff }),
								suffix: `${state.currency}/kWh`
							})
						]
					}),
					result.ok && result.hasPump ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 font-mono text-sm " + (result.npshMarginM < 0 ? "text-danger" : "text-ink"),
						children: [
							"NPSHa ",
							num(result.npshaM),
							" m · margin ",
							num(result.npshMarginM),
							" m · ",
							num(result.pumpKW * state.hours * (state.load / 100), 0),
							" kWh/y"
						]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overflow-hidden rounded-lg border border-line bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-line px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium text-ink",
						children: "P&ID loop"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Symbols follow the equipment order. Pipe runs are the line between them."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PidSketch, { nodes })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3",
				children: state.items.map((item, index) => {
					const row = result.items.find((entry) => entry.id === item.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemEditor, {
						item,
						index,
						count: state.items.length,
						unit,
						dp: row ? show(row.dpPa) : "—",
						velocity: row && row.velocity > 0 ? `${num(row.velocity)} m/s` : "",
						outlet: row ? show(row.pOutPa) : "",
						onChange: (partial) => setItem(item.id, partial),
						onMove: (dir) => move(item.id, dir),
						onRemove: () => patch({ items: state.items.filter((entry) => entry.id !== item.id) })
					}, item.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium text-muted",
					children: "Add to the loop"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: ITEM_KINDS.map((kind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 rounded-md border border-line bg-surface px-3 text-sm text-ink",
						onClick: () => add(kind.id),
						children: kind.label
					}, kind.id))
				}),
				hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-danger",
					children: hint
				}) : null
			] }),
			result.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-line bg-surface p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium text-ink",
						children: "Cases"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Same pump differential, scaled by the head curve. Fouled equipment uses the fouling factor."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 grid grid-cols-4 gap-1 text-xs text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Case" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right",
								children: "Valve ΔP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right",
								children: "Kv"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right",
								children: "Dest."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: result.cases.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-4 gap-1 border-t border-line py-2 font-mono text-xs text-ink",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right",
								children: show(row.valveDpPa)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right",
								children: row.kvNeed > 0 ? num(row.kvNeed, 1) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right " + (row.delivers ? "" : "text-danger"),
								children: row.delivers ? "Holds" : "Short"
							})
						]
					}, row.name)) })
				]
			}) : null,
			result.warnings.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-1",
				children: result.warnings.map((warning) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-xs text-danger",
					children: warning
				}, warning))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveBar, {
				name: state.name,
				onName: (name) => patch({ name }),
				onSave: () => onSave(state.name.trim() || "Hydraulic loop", summary)
			}),
			sheet ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Datasheet, {
				model: sheet,
				onClose: () => setSheet(null),
				onUserNote: (sheetNote) => patch({ sheetNote })
			}) : null
		]
	});
}
function TextField({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-xs font-medium text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			className: "h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-accent",
			value,
			onChange: (event) => onChange(event.target.value)
		})]
	});
}
function ItemEditor({ item, index, count, unit, dp, velocity, outlet, onChange, onMove, onRemove }) {
	const schedules = schedulesFor(item.nps);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-lg border border-line bg-surface p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs text-muted",
					children: [
						index + 1,
						" · ",
						dp,
						velocity ? ` · ${velocity}` : "",
						outlet ? ` · out ${outlet}` : ""
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 w-11 rounded-md bg-inset text-ink",
						onClick: () => onMove(-1),
						disabled: index === 0,
						"aria-label": "Move up",
						children: "↑"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 w-11 rounded-md bg-inset text-ink",
						onClick: () => onMove(1),
						disabled: index === count - 1,
						"aria-label": "Move down",
						children: "↓"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Tag",
						value: item.tag,
						onChange: (tag) => onChange({ tag })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sel, {
						label: "Item",
						value: item.kind,
						onChange: (id) => onChange({ kind: id }),
						options: ITEM_KINDS.map((kind) => ({
							id: kind.id,
							label: kind.label
						}))
					}),
					item.kind === "pipe" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Length",
						value: item.lengthM,
						onChange: (lengthM) => onChange({ lengthM }),
						suffix: "m"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Rise",
						value: item.elevM,
						onChange: (elevM) => onChange({ elevM }),
						suffix: "m"
					})] }) : null,
					item.kind !== "pump" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sel, {
						label: "NPS",
						value: item.nps,
						onChange: (nps) => onChange({
							nps,
							schedule: schedulesFor(nps).includes(item.schedule) ? item.schedule : "40"
						}),
						options: NPS_OPTIONS.map((nps) => ({
							id: nps,
							label: `NPS ${nps}`
						}))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sel, {
						label: "Schedule",
						value: item.schedule,
						onChange: (id) => onChange({ schedule: id }),
						options: schedules.map((id) => ({
							id,
							label: id === "40" ? "Sch 40 / STD" : id === "80" ? "Sch 80" : id === "10" ? "Sch 10" : "STD"
						}))
					})] }) : null,
					item.kind === "valve" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sel, {
						label: "Valve",
						value: item.valveKind,
						onChange: (valveKind) => onChange({ valveKind }),
						options: VALVE_KINDS
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Quantity",
						value: item.qty,
						onChange: (qty) => onChange({ qty })
					})] }) : null,
					item.kind === "check" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Quantity",
						value: item.qty,
						onChange: (qty) => onChange({ qty })
					}) : null,
					item.kind === "strainer" || item.kind === "exchanger" || item.kind === "meter" || item.kind === "orifice" || item.kind === "mixer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Clean drop",
						value: item.dpClean,
						onChange: (dpClean) => onChange({ dpClean }),
						suffix: unit
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Fouling factor",
						value: item.foulFactor,
						onChange: (foulFactor) => onChange({ foulFactor }),
						suffix: "×"
					})] }) : null,
					item.kind === "control" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sel, {
							label: "Style",
							value: item.valveStyle,
							onChange: (id) => onChange({ valveStyle: id }),
							options: [{
								id: "globe",
								label: "Globe"
							}, {
								id: "ball",
								label: "Segment ball"
							}]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: "Design drop",
							value: item.minDp,
							onChange: (minDp) => onChange({ minDp }),
							suffix: unit
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: "Fl",
							value: item.fl,
							onChange: (fl) => onChange({ fl })
						})
					] }) : null
				]
			}),
			item.kind === "pipe" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FittingsBlock, {
					counts: item.fittings,
					onChange: (fittings) => onChange({ fittings })
				})
			}) : null,
			item.kind === "valve" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-muted",
				children: [
					"Full-open K ",
					FITTINGS.find((fit) => fit.id === item.valveKind)?.k ?? "—",
					" each. Turbulent screen, not Crane 2K/3K."
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 h-11 rounded-md border border-line px-3 text-sm text-ink",
				onClick: onRemove,
				children: "Remove"
			})
		]
	});
}
function solvePump(req) {
	const blank = {
		ok: false,
		message: "",
		tdhM: 0,
		staticM: 0,
		pressureM: 0,
		frictionM: 0,
		velocityM: 0,
		vs: 0,
		vd: 0,
		hydraulicW: 0,
		shaftW: 0,
		electricW: 0,
		annualKwh: 0,
		annualCost: 0,
		specificKwhM3: 0,
		npshaM: 0,
		npshMarginM: 0
	};
	if (!(req.rho > 0)) return {
		...blank,
		message: "Density must be positive."
	};
	if (!(req.flowM3s > 0)) return {
		...blank,
		message: "Flow must be positive."
	};
	if (!(req.etaPump > 0) || !(req.etaMotor > 0) || req.etaPump > 100 || req.etaMotor > 100) return {
		...blank,
		message: "Efficiencies must be between 0 and 100%."
	};
	const q = req.flowM3s;
	const area = (d) => d > 0 ? Math.PI * d * d / 4 : 0;
	const vs = area(req.suctionM) > 0 ? q / area(req.suctionM) : 0;
	const vd = area(req.dischargeM) > 0 ? q / area(req.dischargeM) : 0;
	let staticM = 0;
	let pressureM = 0;
	let frictionM = 0;
	let velocityM = 0;
	let tdh = 0;
	if (req.mode === "nozzle") {
		pressureM = (req.pdGaugePa - req.psGaugePa) / (req.rho * G);
		staticM = req.nozzleElevM;
		velocityM = (vd * vd - vs * vs) / (2 * G);
		frictionM = 0;
		tdh = pressureM + staticM + velocityM;
	} else {
		staticM = req.staticLiftM;
		frictionM = req.frictionHeadM;
		pressureM = (req.destGaugePa - req.sourceGaugePa) / (req.rho * G);
		velocityM = 0;
		tdh = staticM + frictionM + pressureM;
	}
	const hydraulicW = req.rho * G * q * tdh;
	const shaftW = hydraulicW / (req.etaPump / 100);
	const electricW = shaftW / (req.etaMotor / 100);
	const duty = Math.min(1.5, Math.max(0, req.load / 100));
	const annualKwh = electricW / 1e3 * Math.max(0, req.hours) * duty;
	const annualCost = annualKwh * Math.max(0, req.tariff);
	const specificKwhM3 = q > 0 ? electricW / 1e3 / (q * 3600) : 0;
	const npshaM = (req.psGaugePa + req.patmPa - req.pvapPa) / (req.rho * G) + vs * vs / (2 * G);
	const npshMarginM = npshaM - req.npshrM;
	return {
		ok: true,
		message: tdh <= 0 ? "Head is zero or negative — this is not a pump duty (pressure recovery or downhill)." : "",
		tdhM: tdh,
		staticM,
		pressureM,
		frictionM,
		velocityM,
		vs,
		vd,
		hydraulicW,
		shaftW,
		electricW,
		annualKwh,
		annualCost,
		specificKwhM3,
		npshaM,
		npshMarginM
	};
}
function pumpFlowVariants(req, factors) {
	return factors.map((factor) => {
		if (req.mode === "nozzle") {
			const ev = solvePump({
				...req,
				flowM3s: req.flowM3s * factor
			});
			return {
				factor,
				flowM3s: req.flowM3s * factor,
				tdhM: ev.tdhM,
				electricW: ev.electricW,
				annualCost: ev.annualCost
			};
		}
		const friction = req.frictionHeadM * factor * factor;
		const ev = solvePump({
			...req,
			flowM3s: req.flowM3s * factor,
			frictionHeadM: friction
		});
		return {
			factor,
			flowM3s: req.flowM3s * factor,
			tdhM: ev.tdhM,
			electricW: ev.electricW,
			annualCost: ev.annualCost
		};
	});
}
ATM_BAR * BAR_PA;
function PumpPanel({ state, setState, note, onSave }) {
	const [name, setName] = (0, import_react.useState)("Pump duty");
	const [sheet, setSheet] = (0, import_react.useState)(null);
	const unit = pressureUnitLabel(state.pUnit);
	const q = liquidFlowToM3s(state.flowValue, state.flowUnit, state.density);
	const result = (0, import_react.useMemo)(() => {
		return solvePump({
			mode: state.mode,
			rho: state.density,
			flowM3s: q,
			psGaugePa: pressureToPa(state.ps, state.pUnit),
			pdGaugePa: pressureToPa(state.pd, state.pUnit),
			nozzleElevM: state.nozzleElev,
			suctionM: state.suctionMm / 1e3,
			dischargeM: state.dischargeMm / 1e3,
			staticLiftM: state.staticLift,
			frictionHeadM: state.frictionHead,
			sourceGaugePa: pressureToPa(state.sourceP, state.pUnit),
			destGaugePa: pressureToPa(state.destP, state.pUnit),
			etaPump: state.etaPump,
			etaMotor: state.etaMotor,
			hours: state.hours,
			load: state.load,
			tariff: state.tariff,
			pvapPa: state.pvapKpa * 1e3,
			npshrM: state.npshr,
			patmPa: state.patmBar * BAR_PA
		});
	}, [state, q]);
	const variants = (0, import_react.useMemo)(() => {
		if (!result.ok || state.mode !== "system") return [];
		return pumpFlowVariants({
			mode: state.mode,
			rho: state.density,
			flowM3s: q,
			psGaugePa: pressureToPa(state.ps, state.pUnit),
			pdGaugePa: pressureToPa(state.pd, state.pUnit),
			nozzleElevM: state.nozzleElev,
			suctionM: state.suctionMm / 1e3,
			dischargeM: state.dischargeMm / 1e3,
			staticLiftM: state.staticLift,
			frictionHeadM: state.frictionHead,
			sourceGaugePa: pressureToPa(state.sourceP, state.pUnit),
			destGaugePa: pressureToPa(state.destP, state.pUnit),
			etaPump: state.etaPump,
			etaMotor: state.etaMotor,
			hours: state.hours,
			load: state.load,
			tariff: state.tariff,
			pvapPa: state.pvapKpa * 1e3,
			npshrM: state.npshr,
			patmPa: state.patmBar * BAR_PA
		}, [
			.6,
			.8,
			1,
			1.2,
			1.4
		]);
	}, [
		state,
		q,
		result.ok
	]);
	function patch(p) {
		setState((s) => ({
			...s,
			...p
		}));
	}
	const summary = result.ok ? `${num(result.tdhM)} m head · ${num(result.electricW / 1e3)} kW · ${num(result.annualCost, 0)} ${state.currency}/y` : result.message;
	function openSheet() {
		if (!result.ok) return;
		setSheet(makePumpSheet({
			name,
			state,
			result,
			flowM3s: q,
			variants: variants.length > 0 ? {
				headers: [
					"Flow",
					"Head m",
					"kW",
					state.currency
				],
				rows: variants.map((v) => [
					num(m3sToLiquidFlow(v.flowM3s, state.flowUnit, state.density)),
					num(v.tdhM),
					num(v.electricW / 1e3),
					num(v.annualCost, 0)
				])
			} : null
		}));
	}
	const npshBad = result.ok && result.npshMarginM < 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-12 z-10 -mx-4 bg-bg px-4 py-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "rounded-lg border border-line border-l-4 border-l-accent bg-surface p-4",
					children: result.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wide text-muted uppercase",
							children: "Total head"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-4xl font-semibold text-accent tabular-nums",
							children: [num(result.tdhM), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-lg text-ink",
								children: "m"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								num(result.electricW / 1e3),
								" kW electrical · ",
								num(result.annualCost, 0),
								" ",
								state.currency,
								" / year"
							]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: result.message
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "h-11 rounded-md bg-accent text-sm font-medium text-accent-ink disabled:opacity-50",
				disabled: !result.ok,
				onClick: openSheet,
				children: "Export PDF"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-1 rounded-md bg-inset p-1",
				children: [["system", "From heads"], ["nozzle", "From gauges"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": state.mode === id,
					className: "min-h-11 rounded-sm text-sm font-medium " + (state.mode === id ? "bg-accent text-accent-ink" : "text-muted"),
					onClick: () => patch({ mode: id }),
					children: label
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: state.mode === "system" ? "Static lift, friction head and tank pressures. Friction head scales with flow squared in the variants." : "Suction and discharge gauge pressures at the nozzles, plus the elevation between those nozzles."
			}),
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-md bg-ok-bg px-3 py-2 text-sm text-ok",
				children: note
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Flow",
						value: state.flowValue,
						onChange: (flowValue) => patch({ flowValue }),
						options: LIQUID_FLOW_UNITS,
						option: state.flowUnit,
						onOption: (id) => {
							const flowUnit = id;
							const flowValue = m3sToLiquidFlow(liquidFlowToM3s(state.flowValue, state.flowUnit, state.density), flowUnit, state.density);
							patch({
								flowUnit,
								flowValue: Number.isFinite(flowValue) ? flowValue : state.flowValue
							});
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Density",
						value: state.density,
						onChange: (density) => patch({ density }),
						suffix: "kg/m³"
					}),
					state.mode === "system" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: "Static lift",
							value: state.staticLift,
							onChange: (staticLift) => patch({ staticLift }),
							suffix: "m"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: "Friction head",
							value: state.frictionHead,
							onChange: (frictionHead) => patch({ frictionHead }),
							suffix: "m"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: "Source tank, gauge",
							value: state.sourceP,
							onChange: (sourceP) => patch({ sourceP }),
							options: PRESSURE_UNITS,
							option: state.pUnit,
							onOption: (id) => {
								const pUnit = id;
								patch({
									pUnit,
									sourceP: convertPressure(state.sourceP, state.pUnit, pUnit),
									destP: convertPressure(state.destP, state.pUnit, pUnit),
									ps: convertPressure(state.ps, state.pUnit, pUnit),
									pd: convertPressure(state.pd, state.pUnit, pUnit)
								});
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: "Destination tank, gauge",
							value: state.destP,
							onChange: (destP) => patch({ destP }),
							suffix: unit
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: "Suction gauge",
							value: state.ps,
							onChange: (ps) => patch({ ps }),
							options: PRESSURE_UNITS,
							option: state.pUnit,
							onOption: (id) => {
								const pUnit = id;
								patch({
									pUnit,
									ps: convertPressure(state.ps, state.pUnit, pUnit),
									pd: convertPressure(state.pd, state.pUnit, pUnit),
									sourceP: convertPressure(state.sourceP, state.pUnit, pUnit),
									destP: convertPressure(state.destP, state.pUnit, pUnit)
								});
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: "Discharge gauge",
							value: state.pd,
							onChange: (pd) => patch({ pd }),
							suffix: unit
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: "Discharge nozzle above suction",
							value: state.nozzleElev,
							onChange: (nozzleElev) => patch({ nozzleElev }),
							suffix: "m"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: "Suction bore",
							value: state.suctionMm,
							onChange: (suctionMm) => patch({ suctionMm }),
							suffix: "mm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
							label: "Discharge bore",
							value: state.dischargeMm,
							onChange: (dischargeMm) => patch({ dischargeMm }),
							suffix: "mm"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Pump efficiency",
						value: state.etaPump,
						onChange: (etaPump) => patch({ etaPump }),
						suffix: "%"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Motor efficiency",
						value: state.etaMotor,
						onChange: (etaMotor) => patch({ etaMotor }),
						suffix: "%"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Hours per year",
						value: state.hours,
						onChange: (hours) => patch({ hours }),
						suffix: "h"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Duty factor",
						value: state.load,
						onChange: (load) => patch({ load }),
						suffix: "%"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
						label: "Tariff",
						value: state.tariff,
						onChange: (tariff) => patch({ tariff }),
						suffix: `${state.currency}/kWh`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sel, {
						label: "Currency",
						value: state.currency,
						onChange: (currency) => patch({ currency }),
						options: [
							"AED",
							"USD",
							"INR",
							"EUR"
						].map((id) => ({
							id,
							label: id
						}))
					})
				]
			}),
			result.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Static head",
						value: `${num(result.staticM)} m`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Pressure head",
						value: `${num(result.pressureM)} m`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Friction head",
						value: `${num(result.frictionM)} m`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Velocity head",
						value: `${num(result.velocityM, 3)} m`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Hydraulic",
						value: `${num(result.hydraulicW / 1e3)} kW`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Shaft",
						value: `${num(result.shaftW / 1e3)} kW`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Electrical",
						value: `${num(result.electricW / 1e3)} kW`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Annual energy",
						value: `${num(result.annualKwh, 0)} kWh`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Specific energy",
						value: `${num(result.specificKwhM3, 3)} kWh/m³`
					})
				]
			}) : null,
			result.ok && result.message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notes, { items: [result.message] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border p-4 " + (npshBad ? "border-danger bg-danger-bg" : "border-line bg-surface"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-wide text-muted uppercase",
						children: "NPSH and vapour pressure"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2",
						children: [
							state.mode === "system" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "Suction gauge",
								value: state.ps,
								onChange: (ps) => patch({ ps }),
								suffix: unit
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "Vapour pressure",
								value: state.pvapKpa,
								onChange: (pvapKpa) => patch({ pvapKpa }),
								suffix: "kPa abs"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "NPSHr",
								value: state.npshr,
								onChange: (npshr) => patch({ npshr }),
								suffix: "m"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "Atmosphere",
								value: state.patmBar,
								onChange: (patmBar) => patch({ patmBar }),
								suffix: "bar abs"
							})
						]
					}),
					result.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 font-mono text-lg tabular-nums " + (npshBad ? "text-danger" : "text-ink"),
						children: [
							"NPSHa ",
							num(result.npshaM),
							" m · margin ",
							num(result.npshMarginM),
							" m"
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: "NPSHa = (Psuction absolute − vapour pressure) / ρg + suction velocity head. Gauge is at the nozzle centerline."
					})
				]
			}),
			variants.length > 0 && result.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VariantTable, {
				title: "Head and energy variants",
				note: "Static and tank head stay put. Friction head follows flow squared. Duty factor stays as entered.",
				headers: [
					"Flow",
					"Head m",
					"kW",
					state.currency
				],
				rows: variants.map((v) => ({
					key: String(v.factor),
					active: v.factor === 1,
					cells: [
						num(m3sToLiquidFlow(v.flowM3s, state.flowUnit, state.density)),
						num(v.tdhM),
						num(v.electricW / 1e3),
						num(v.annualCost, 0)
					]
				}))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "h-11 rounded-md bg-accent text-sm font-medium text-accent-ink disabled:opacity-50",
				disabled: !result.ok,
				onClick: openSheet,
				children: "Export PDF"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveBar, {
				name,
				onName: setName,
				onSave: () => onSave(name.trim() || "Pump case", summary)
			}),
			sheet ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Datasheet, {
				model: sheet,
				onClose: () => setSheet(null),
				onUserNote: (sheetNote) => patch({ sheetNote })
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Hydraulic power is ρgQH. Shaft power divides by pump efficiency, electrical power by motor efficiency. Annual figures use hours × duty factor. Tariff is yours to edit — the 0.29 AED/kWh starter is not a published rate."
			})
		]
	});
}
var TABS = [
	{
		id: "liquid",
		label: "Liquid",
		icon: Droplets
	},
	{
		id: "gas",
		label: "Gas",
		icon: Wind
	},
	{
		id: "pump",
		label: "Pump",
		icon: Gauge
	},
	{
		id: "loop",
		label: "Loop",
		icon: Waypoints
	},
	{
		id: "saved",
		label: "Saved",
		icon: Bookmark
	}
];
function merge(base, raw) {
	if (!raw || typeof raw !== "object") return base;
	return {
		...base,
		...raw
	};
}
function mergeLoop(raw) {
	const base = defaultLoop();
	const merged = merge(base, raw);
	if (!Array.isArray(raw.items) || raw.items.length === 0) return {
		...merged,
		items: base.items
	};
	return {
		...merged,
		items: raw.items.map((item) => ({
			...newLoopItem(item.kind),
			...item
		}))
	};
}
function LineApp() {
	const [tab, setTab] = (0, import_react.useState)("liquid");
	const [liquid, setLiquid] = (0, import_react.useState)(defaultLiquid);
	const [gas, setGas] = (0, import_react.useState)(defaultGas);
	const [pump, setPump] = (0, import_react.useState)(defaultPump);
	const [loop, setLoop] = (0, import_react.useState)(defaultLoop);
	const [cases, setCases] = (0, import_react.useState)([]);
	const [note, setNote] = (0, import_react.useState)("");
	const [ready, setReady] = (0, import_react.useState)(false);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		try {
			const draft = localStorage.getItem(DRAFT_KEY);
			if (draft) {
				const parsed = JSON.parse(draft);
				if (parsed.liquid) setLiquid(merge(defaultLiquid(), parsed.liquid));
				if (parsed.gas) setGas(merge(defaultGas(), parsed.gas));
				if (parsed.pump) setPump(merge(defaultPump(), parsed.pump));
				if (parsed.loop) setLoop(mergeLoop(parsed.loop));
				if (parsed.tab && TABS.some((t) => t.id === parsed.tab)) setTab(parsed.tab);
			}
			const saved = localStorage.getItem(CASES_KEY);
			if (saved) {
				const parsed = JSON.parse(saved);
				if (Array.isArray(parsed)) setCases(parsed.slice(0, 40));
			}
		} catch {}
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		localStorage.setItem(DRAFT_KEY, JSON.stringify({
			tab,
			liquid,
			gas,
			pump,
			loop
		}));
	}, [
		ready,
		tab,
		liquid,
		gas,
		pump,
		loop
	]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		localStorage.setItem(CASES_KEY, JSON.stringify(cases));
	}, [ready, cases]);
	function saveCase(kind, name, summary) {
		const entry = {
			id: crypto.randomUUID(),
			name,
			kind,
			at: Date.now(),
			summary,
			liquid: kind === "liquid" ? liquid : void 0,
			gas: kind === "gas" ? gas : void 0,
			pump: kind === "pump" ? pump : void 0,
			loop: kind === "loop" ? loop : void 0
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
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "bg-ink text-on-ink",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-5xl items-start justify-between gap-3 px-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs tracking-widest text-on-ink-dim",
							children: "FIELD HYDRAULICS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-semibold",
							children: "LineSpec"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-on-ink-dim",
							children: "Line, gas, pump, and a P&ID hydraulic loop."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-on-ink",
								children: "Pipesize App V0"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-on-ink-dim",
								children: "By Shital H Gandhi"
							})]
						}), tab !== "saved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "h-11 shrink-0 rounded-md border border-on-ink-dim px-3 text-sm text-on-ink",
							onClick: resetExample,
							children: "Example"
						}) : null]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "sticky top-0 z-20 border-b border-line bg-surface",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid max-w-5xl grid-cols-5",
					children: TABS.map((item) => {
						const Icon = item.icon;
						const on = tab === item.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-pressed": on,
							className: "flex min-h-12 flex-col items-center justify-center gap-1 text-xs font-medium " + (on ? "text-accent" : "text-muted"),
							onClick: () => setTab(item.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-4",
								"aria-hidden": "true"
							}), item.label]
						}, item.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-5xl px-4 py-4 pb-16",
				children: [
					tab === "liquid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidPanel, {
						state: liquid,
						setState: setLiquid,
						onSave: (name, summary) => saveCase("liquid", name, summary),
						onUsePump: (friction, elev, density, flow, pvap) => {
							setPump((p) => ({
								...p,
								mode: "system",
								density,
								pvapKpa: pvap,
								staticLift: elev,
								frictionHead: friction,
								sourceP: 0,
								destP: 0,
								flowValue: m3sToLiquidFlow(flow, p.flowUnit, density)
							}));
							setNote("Friction head and elevation came from the liquid line. Set tank pressures if they are not both open to atmosphere.");
							setTab("pump");
						}
					}) : null,
					tab === "gas" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GasPanel, {
						state: gas,
						setState: setGas,
						onSave: (name, summary) => saveCase("gas", name, summary)
					}) : null,
					tab === "pump" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PumpPanel, {
						state: pump,
						setState: setPump,
						note,
						onSave: (name, summary) => saveCase("pump", name, summary)
					}) : null,
					tab === "loop" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoopPanel, {
						state: loop,
						setState: setLoop,
						onSave: (name, summary) => saveCase("loop", name, summary)
					}) : null,
					tab === "saved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavedList, {
						cases,
						pendingDelete,
						onPending: setPendingDelete,
						onDelete: (id) => setCases((list) => list.filter((c) => c.id !== id)),
						onLoad: (entry) => {
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
						}
					}) : null
				]
			})
		]
	});
}
function SavedList({ cases, pendingDelete, onPending, onDelete, onLoad }) {
	if (!cases.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-line bg-surface p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-lg font-semibold",
			children: "Nothing saved yet"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "Run a liquid, gas, pump or loop case and tap Save. It stays on this phone, together with whatever you last had open."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-col gap-3",
		children: cases.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "rounded-lg border border-line bg-surface p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted uppercase",
					children: entry.kind
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-base font-semibold",
					children: entry.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: entry.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: new Date(entry.at).toLocaleString(void 0, {
						month: "short",
						day: "numeric",
						hour: "2-digit",
						minute: "2-digit"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 rounded-md bg-accent px-4 text-sm font-medium text-accent-ink",
						onClick: () => onLoad(entry),
						children: "Open"
					}), pendingDelete === entry.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 rounded-md bg-danger-bg px-4 text-sm font-medium text-danger",
						onClick: () => {
							onDelete(entry.id);
							onPending(null);
						},
						children: "Confirm delete"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 rounded-md border border-line px-4 text-sm text-ink",
						onClick: () => onPending(entry.id),
						children: "Delete"
					})]
				})
			]
		}, entry.id))
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineApp, {});
}
//#endregion
export { Home as component };
