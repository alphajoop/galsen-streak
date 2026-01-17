import { BarChart3 } from "lucide-react";

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export function Toggle({ checked, onChange, label }: Props) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 p-3 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 transition-all group"
    >
      <div
        className={`relative w-11 h-6 rounded-full transition-colors ${checked ? "bg-green-500" : "bg-zinc-700"}`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`}
        />
      </div>
      <span className="text-sm text-zinc-300 flex items-center gap-2">
        <BarChart3 className="w-4 h-4" />
        {label}
      </span>
    </button>
  );
}
