import { Loader2 } from "lucide-react";
import type { BadgeConfig } from "../types";

interface Props {
  config: BadgeConfig;
  loading: boolean;
  onLoad: () => void;
}

export function BadgePreview({ config, loading, onLoad }: Props) {
  return (
    <section className="border border-border rounded-xl p-4 space-y-3">
      <div className="relative w-full">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-border" />
          </div>
        )}

        <img
          src={config.url}
          alt="GitHub streak badge"
          onLoad={onLoad}
          className={`w-full transition-opacity ${loading ? "opacity-0" : "opacity-100"}`}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="px-3 py-1 text-sm rounded-md bg-accent text-black"
          onClick={() => navigator.clipboard.writeText(config.url)}
        >
          Copy URL
        </button>

        <button
          type="button"
          className="px-3 py-1 text-sm rounded-md border border-border"
          onClick={() => navigator.clipboard.writeText(config.markdown)}
        >
          Copy Markdown
        </button>
      </div>
    </section>
  );
}
