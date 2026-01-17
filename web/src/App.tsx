import { BarChart3, ExternalLink, Flame, Github, Palette } from "lucide-react";
import { useMemo, useState } from "react";
import { CopyButton } from "./components/CopyButton";
import { EmptyState } from "./components/EmptyState";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { ThemeCard } from "./components/ThemeCard";
import { Toggle } from "./components/Toggle";
import { API_BASE, THEMES } from "./constants/themes";

export default function App() {
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState("senegal");
  const [showGraph, setShowGraph] = useState(true);
  const [loading, setLoading] = useState(false);

  const usernameError =
    username && !/^[a-zA-Z0-9-]{1,39}$/.test(username) ? "Invalid GitHub username" : "";

  const badgeUrl = useMemo(() => {
    if (!username || usernameError) return "";
    const params = new URLSearchParams({
      theme,
      hide_graph: String(!showGraph),
    });
    return `${API_BASE}/streak/${username}?${params}`;
  }, [username, theme, showGraph, usernameError]);

  const markdown = `![GitHub Streak](${badgeUrl})`;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        {/* Username Input */}
        <section className="space-y-3">
          <label
            htmlFor="username"
            className="flex items-center gap-2 text-sm font-medium text-zinc-400"
          >
            <Github className="w-4 h-4" />
            GitHub Username
          </label>
          <Input
            id="username"
            icon={Github}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="torvalds"
            error={usernameError}
          />
        </section>

        {/* Theme Selection */}
        <section className="space-y-3">
          <label
            htmlFor="theme"
            className="flex items-center gap-2 text-sm font-medium text-zinc-400"
          >
            <Palette className="w-4 h-4" />
            Choose Theme
          </label>
          <div id="theme" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {THEMES.map((t) => (
              <ThemeCard
                key={t.value}
                theme={t}
                selected={theme === t.value}
                onClick={() => setTheme(t.value)}
              />
            ))}
          </div>
        </section>

        {/* Options */}
        <section className="space-y-3">
          <label
            htmlFor="options"
            className="flex items-center gap-2 text-sm font-medium text-zinc-400"
          >
            <BarChart3 className="w-4 h-4" />
            Display Options
          </label>
          <Toggle checked={showGraph} onChange={setShowGraph} label="Show contribution graph" />
        </section>

        {/* Preview */}
        {badgeUrl && (
          <section className="space-y-4">
            <label
              htmlFor="preview"
              className="flex items-center gap-2 text-sm font-medium text-zinc-400"
            >
              <Flame className="w-4 h-4" />
              Preview
            </label>

            <div
              id="preview"
              className="relative rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-zinc-800/10 via-transparent to-transparent" />

              <div className="relative flex items-center justify-center min-h-[200px]">
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
                  </div>
                )}

                <img
                  src={badgeUrl}
                  alt="GitHub Streak Badge"
                  onLoad={() => setLoading(false)}
                  onLoadStart={() => setLoading(true)}
                  className={`max-w-full h-auto transition-opacity ${loading ? "opacity-0" : "opacity-100"}`}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <CopyButton text={badgeUrl} label="Copy URL" />
              <CopyButton text={markdown} label="Copy Markdown" />
              <a
                href={badgeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-lg transition-all text-sm font-medium flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open
              </a>
            </div>

            {/* Code Preview */}
            <div className="space-y-2">
              <p className="text-xs text-zinc-500">Markdown</p>
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                <code className="text-xs text-zinc-300 font-mono break-all">{markdown}</code>
              </div>
            </div>
          </section>
        )}

        {/* Empty State */}
        {!username && <EmptyState />}
      </main>

      <Footer />
    </div>
  );
}
