import type { ReactNode } from "react";

interface Props {
  label: string;
  children: ReactNode;
  className?: string;
}

export function Section({ label, children, className = "" }: Props) {
  return (
    <section className={`space-y-2.5 ${className}`}>
      <h2 className="text-xs font-medium uppercase tracking-wider text-muted">{label}</h2>
      {children}
    </section>
  );
}
