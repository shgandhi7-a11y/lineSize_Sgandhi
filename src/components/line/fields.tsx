import { useEffect, useId, useState } from "react";
import { formatEditable, parseNum } from "@/lib/calc/format";

export function NumField({
  label,
  value,
  onChange,
  suffix,
  options,
  option,
  onOption,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  suffix?: string;
  options?: { id: string; label: string }[];
  option?: string;
  onOption?: (id: string) => void;
}) {
  const id = useId();
  const [text, setText] = useState(() => formatEditable(value));
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (!focus) setText(formatEditable(value));
  }, [value, focus]);

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-muted">
        {label}
      </label>
      <div className="flex h-11 overflow-hidden rounded-md border border-line bg-surface focus-within:border-accent">
        <input
          id={id}
          inputMode="decimal"
          className="w-full min-w-0 bg-transparent px-3 font-mono text-sm text-ink tabular-nums outline-none"
          value={text}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            setFocus(false);
            const n = parseNum(text);
            if (n == null) setText(formatEditable(value));
            else {
              onChange(n);
              setText(formatEditable(n));
            }
          }}
          onChange={(e) => {
            setText(e.target.value);
            const n = parseNum(e.target.value);
            if (n != null) onChange(n);
          }}
        />
        {options && onOption ? (
          <select
            aria-label={`${label} unit`}
            className="max-w-24 border-l border-line bg-inset px-2 text-xs text-ink outline-none"
            value={option}
            onChange={(e) => onOption(e.target.value)}
          >
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        ) : suffix ? (
          <span className="flex items-center border-l border-line bg-inset px-2 text-xs text-muted">{suffix}</span>
        ) : null}
      </div>
    </div>
  );
}

export function Sel({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (id: string) => void;
  options: { id: string; label: string }[];
}) {
  const id = useId();
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-muted">
        {label}
      </label>
      <select
        id={id}
        className="h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-accent"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ModeBar({
  value,
  onChange,
  hint,
}: {
  value: string;
  onChange: (id: "drop" | "diameter" | "flow" | "length") => void;
  hint: string;
}) {
  const modes = [
    { id: "drop" as const, label: "Drop" },
    { id: "diameter" as const, label: "Bore" },
    { id: "flow" as const, label: "Flow" },
    { id: "length" as const, label: "Length" },
  ];
  return (
    <div>
      <div className="grid grid-cols-4 gap-1 rounded-md bg-inset p-1">
        {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={value === m.id}
            className={
              "min-h-11 rounded-sm text-sm font-medium " +
              (value === m.id ? "bg-accent text-accent-ink" : "text-muted")
            }
            onClick={() => onChange(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted">{hint}</p>
    </div>
  );
}

export function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface px-3 py-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-1 font-mono text-base font-medium text-ink tabular-nums">{value}</dd>
    </div>
  );
}

export function Notes({ items, danger }: { items: string[]; danger?: boolean }) {
  if (!items.length) return null;
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <p
          key={item}
          className={
            "rounded-md px-3 py-2 text-sm " +
            (danger ? "bg-danger-bg text-danger" : "bg-warn-bg text-warn")
          }
        >
          {item}
        </p>
      ))}
    </div>
  );
}
