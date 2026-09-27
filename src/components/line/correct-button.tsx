export function CorrectButton({
  disabled,
  note,
  onClick,
}: {
  disabled?: boolean;
  note: string;
  onClick: () => void;
}) {
  return (
    <div className="rounded-lg border border-line bg-surface p-3">
      <button
        type="button"
        className="h-11 w-full rounded-md bg-accent text-sm font-medium text-accent-ink disabled:opacity-50"
        disabled={disabled}
        onClick={onClick}
      >
        Correct to optimum
      </button>
      <p className="mt-2 text-xs text-muted">{note}</p>
    </div>
  );
}
