import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface Props {
  text: string;
  label: string;
}

export function CopyButton({ text, label }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-surface-raised px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:border-border-hover active:scale-[0.98]"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-senegal-green" />
          <span className="text-senegal-green">Copied</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5 text-muted" />
          {label}
        </>
      )}
    </button>
  );
}
