import { Check } from "lucide-react";

interface Theme {
  value: string;
  label: string;
  emoji: string;
  colors: string[];
}

interface Props {
  theme: Theme;
  selected: boolean;
  onClick: () => void;
}

export function ThemeCard({ theme, selected, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative p-4 rounded-xl border-2 transition-all group
        ${
          selected
            ? "border-zinc-600 bg-zinc-900/50"
            : "border-zinc-800 hover:border-zinc-700 bg-zinc-900/30"
        }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{theme.emoji}</span>
        <div className="text-left">
          <div className="font-semibold text-sm text-white">{theme.label}</div>
          <div className="text-xs text-zinc-500">{theme.value}</div>
        </div>
      </div>

      <div className="flex gap-1.5">
        {theme.colors.map((color, i) => (
          <div
            key={`color-${i}-${theme.value}`}
            className="h-2 flex-1 rounded-full"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {selected && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 text-black" />
        </div>
      )}
    </button>
  );
}
