import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import { CopyButton } from "./CopyButton";

interface Props {
  badgeUrl: string;
  markdown: string;
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
        <div className="relative flex min-h-[180px] items-center justify-center">
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

      <div className="flex gap-2">
        <CopyButton text={badgeUrl} label="Copy URL" />
        <CopyButton text={markdown} label="Copy Markdown" />
        <a
          href={badgeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl bg-senegal-green px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Open
        </a>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted">Markdown</p>
        <pre className="overflow-x-auto rounded-xl border border-border bg-surface p-4 text-xs leading-relaxed text-subtle">
          <code>{markdown}</code>
        </pre>
      </div>
    </div>
  );
}
