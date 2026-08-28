import { useEffect, useState } from "react";

const ERROR_MS = 1200;

export type CopyButtonProps = {
  value: string;
  resetMs?: number;
  className?: string;
  "aria-label"?: string;
  onCopied?: () => void;
  onCopyError?: () => void;
};

async function copyToClipboard(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export function CopyButton({
  value,
  resetMs = 1400,
  className,
  "aria-label": ariaLabel = "Copy to clipboard",
  onCopied,
  onCopyError,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), resetMs);
    return () => window.clearTimeout(id);
  }, [copied, resetMs]);

  useEffect(() => {
    if (!error) return;
    const id = window.setTimeout(() => setError(false), ERROR_MS);
    return () => window.clearTimeout(id);
  }, [error]);

  function handleCopy() {
    if (copied || error) return;
    setCopied(true);
    void copyToClipboard(value).then((ok) => {
      if (!ok) {
        setCopied(false);
        setError(true);
        onCopyError?.();
        return;
      }
      onCopied?.();
    });
  }

  const liveMessage = copied ? "Copied" : error ? "Copy failed" : "";

  return (
    <button
      type="button"
      className={["copy-btn", className].filter(Boolean).join(" ")}
      aria-label={copied ? "Copied" : error ? "Copy failed" : ariaLabel}
      data-copied={copied ? "" : undefined}
      data-error={error ? "" : undefined}
      onClick={handleCopy}
    >
      <span className="sr-only" aria-live="polite">
        {liveMessage}
      </span>

      <svg
        className="copy-btn__icon"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          className="copy-btn__rect copy-btn__rect--back"
          x={8}
          y={3}
          width={12}
          height={12}
          rx={2}
          ry={2}
        />
        <rect
          className="copy-btn__rect copy-btn__rect--front"
          x={3}
          y={8}
          width={12}
          height={12}
          rx={2}
          ry={2}
        />
        <path
          className="copy-btn__check"
          pathLength={1}
          d="M7.75 12.25l2.75 2.75 5.75-6.25"
          stroke="#ffffff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </button>
  );
}
