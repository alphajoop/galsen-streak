import { useMemo, useState } from "react";
import { BadgePreview } from "./components/BadgePreview";
import { Controls } from "./components/Controls";
import { buildBadgeConfig } from "./lib/badge";
import type { BadgeParams } from "./types";

const DEFAULT: BadgeParams = {
  username: "",
  theme: "senegal",
  hide_graph: false,
};

export default function App() {
  const [params, setParams] = useState<BadgeParams>(DEFAULT);
  const [loading, setLoading] = useState(false);

  const config = useMemo(() => buildBadgeConfig(params), [params]);

  return (
    <main className="max-w-xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">🔥 Galsen Streak</h1>

      <Controls
        value={params}
        onChange={(v) => {
          setLoading(true);
          setParams(v);
        }}
      />

      {params.username && (
        <BadgePreview config={config} loading={loading} onLoad={() => setLoading(false)} />
      )}
    </main>
  );
}
