import type { LucideIcon } from "lucide-react";
import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  error?: string;
}

export function Input({ icon: Icon, error, ...props }: Props) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
        <Icon className="w-5 h-5" />
      </div>
      <input
        {...props}
        className={`w-full pl-10 pr-4 py-3 bg-zinc-900/50 border rounded-xl outline-none transition-all
          placeholder:text-zinc-600 text-white
          focus:bg-zinc-900 focus:border-zinc-600
          ${error ? "border-red-500/50 focus:border-red-500" : "border-zinc-800 hover:border-zinc-700"}`}
      />
      {error && <p className="text-xs text-red-400 mt-1.5 ml-1">{error}</p>}
    </div>
  );
}
