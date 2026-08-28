import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import { CopyButton } from "./CopyButton";

interface Props {
  badgeUrl: string;
  markdown: string;
}

function CopyRow({ label, value, ariaLabel }: { label: string; value: string; ariaLabel: string }) {
  return (
    <div className="flex items-center gap-3">
      <CopyButton value={value} aria-label={ariaLabel} />
      <span className="text-sm text-subtle">{label}</span>
    </div>
  );
}

export function BadgePreview({ badgeUrl, markdown }: Props) {
  const [loading, setLoading] = useState(true);
  const previewSrc = useMemo(
    () => `${badgeUrl}${badgeUrl.includes("?") ? "&" : "?"}_=${Date.now()}`,
    [badgeUrl],
  );

  return (
    <div className="animate-in animate-in-delay-2 space-y-4">
      <div className="relative overflow-hidden rounded-xl border border-border bg-surface-raised p-5 glow-green">
        <div className="relative flex min-h-45 items-center justify-center">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="h-6 w-6 rounded-full border-2 border-border border-t-senegal-green"
                style={{ animation: "spin 0.7s linear infinite" }}
              />
            </div>
          )}
          <img
            key={previewSrc}
            src={previewSrc}
            alt="GitHub streak badge preview"
            onLoad={() => setLoading(false)}
            onLoadStart={() => setLoading(true)}
            className={`max-w-full transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <CopyRow label="Copy URL" value={badgeUrl} ariaLabel="Copy badge URL" />
        <CopyRow label="Copy Markdown" value={markdown} ariaLabel="Copy markdown snippet" />
        <a
          href={badgeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-2 rounded-xl bg-senegal-green px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Open
        </a>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted">Markdown</p>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4">
          <pre className="min-w-0 flex-1 overflow-x-auto text-xs leading-relaxed text-subtle">
            <code>{markdown}</code>
          </pre>
          <CopyButton value={markdown} aria-label="Copy markdown snippet" />
        </div>
      </div>
    </div>
  );
}
