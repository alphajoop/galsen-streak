import type { LucideIcon } from "lucide-react";
import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  error?: string;
}

export function Input({ icon: Icon, error, className = "", ...props }: Props) {
  return (
    <div className="space-y-1.5">
      <div className="relative">
        <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
          <Icon className="h-4 w-4" />
        </div>
        <input
          {...props}
          className={`w-full rounded-xl border bg-surface-raised py-3 pl-10 pr-4 text-[15px] text-white outline-none transition-all duration-200 placeholder:text-muted/60
            focus:border-senegal-green/50 focus:ring-2 focus:ring-senegal-green/20
            ${error ? "border-senegal-red/50" : "border-border hover:border-border-hover"}
            ${className}`}
        />
      </div>
      {error && (
        <p className="pl-1 text-xs text-senegal-red" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
