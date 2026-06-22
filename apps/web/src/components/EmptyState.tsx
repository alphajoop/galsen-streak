export function EmptyState() {
  return (
    <div className="animate-in flex flex-col items-center py-20 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-raised text-2xl ring-1 ring-border">
        🔥
      </div>
      <h2 className="text-sm font-medium text-subtle">Enter a username to preview</h2>
      <p className="mt-1.5 max-w-xs text-xs text-muted">
        Your streak badge will appear here with the Senegal theme
      </p>
    </div>
  );
}
