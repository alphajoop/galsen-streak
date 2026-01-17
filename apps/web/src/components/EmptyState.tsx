import { Github } from "lucide-react";

export function EmptyState() {
  return (
    <div className="text-center py-16 space-y-3">
      <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto">
        <Github className="w-8 h-8 text-zinc-600" />
      </div>
      <h3 className="text-lg font-semibold text-zinc-300">Get Started</h3>
      <p className="text-sm text-zinc-500 max-w-md mx-auto">
        Enter your GitHub username above to generate your personalized streak badge
      </p>
    </div>
  );
}
