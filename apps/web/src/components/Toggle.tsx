interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

export function Toggle({ checked, onChange, label, description }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="group flex w-full items-center justify-between gap-4 rounded-xl border border-border bg-surface-raised px-4 py-3.5 text-left transition-all duration-200 hover:border-border-hover active:scale-[0.995]"
    >
      <div className="min-w-0">
        <span className="block text-sm font-medium text-white">{label}</span>
        {description && <span className="mt-0.5 block text-xs text-muted">{description}</span>}
      </div>

      <div
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${checked ? "bg-senegal-green" : "bg-surface-overlay"}`}
      >
        <div
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? "translate-x-6" : "translate-x-1"}`}
          style={{ transitionTimingFunction: "var(--ease-spring)" }}
        />
      </div>
    </button>
  );
}
