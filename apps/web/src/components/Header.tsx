import { GithubIcon } from "./BrandIcon";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="senegal-stripe h-0.5" />

      <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-overlay text-lg ring-1 ring-border">
            🇸🇳
          </div>
          <div>
            <h1 className="text-[15px] font-semibold tracking-tight">Galsen Streak</h1>
            <p className="text-xs text-muted">GitHub streak badge</p>
          </div>
        </div>

        <a
          href="https://github.com/alphajoop/galsen-streak"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg p-2 text-subtle transition-colors duration-200 hover:bg-surface-overlay hover:text-white active:scale-[0.97]"
          aria-label="View source on GitHub"
        >
          <GithubIcon className="h-[18px] w-[18px]" />
        </a>
      </div>
    </header>
  );
}
