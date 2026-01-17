import { Flame, Github } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Galsen Streak</h1>
            <p className="text-xs text-zinc-500">GitHub Streak Badge Generator</p>
          </div>
        </div>

        <a
          href="https://github.com/alphajoop/galsen-streak"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-zinc-900 rounded-lg transition-colors"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>
    </header>
  );
}
