import { useMemo, useState } from "react";
import { BadgePreview } from "./components/BadgePreview";
import { GithubIcon } from "./components/BrandIcon";
import { EmptyState } from "./components/EmptyState";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { Section } from "./components/Section";
import { Toggle } from "./components/Toggle";
import { API_BASE, GITHUB_USERNAME_PATTERN } from "./constants/config";

export default function App() {
  const [username, setUsername] = useState("");
  const [showGraph, setShowGraph] = useState(true);

  const usernameError =
    username && !GITHUB_USERNAME_PATTERN.test(username) ? "Invalid GitHub username" : "";

  const badgeUrl = useMemo(() => {
    if (!username || usernameError) return "";
    const params = new URLSearchParams({ hide_graph: String(!showGraph) });
    return `${API_BASE}/streak/${username}?${params}`;
  }, [username, showGraph, usernameError]);

  const markdown = `![Galsen Streak](${badgeUrl})`;

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-2xl space-y-8 px-5 py-10">
        <div className="animate-in space-y-1">
          <p className="text-2xl font-semibold tracking-tight">Your streak, à la sénégalaise</p>
          <p className="text-sm text-muted">
            Generate a GitHub streak badge with Senegal colors for your README.
          </p>
        </div>

        <Section label="Username" className="animate-in animate-in-delay-1">
          <Input
            id="username"
            icon={GithubIcon}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="torvalds"
            error={usernameError}
            autoComplete="off"
            spellCheck={false}
          />
        </Section>

        <Section label="Options" className="animate-in animate-in-delay-2">
          <Toggle
            checked={showGraph}
            onChange={setShowGraph}
            label="Contribution graph"
            description="Show activity over the last 30 days"
          />
        </Section>

        {badgeUrl ? <BadgePreview badgeUrl={badgeUrl} markdown={markdown} /> : <EmptyState />}
      </main>

      <Footer />
    </div>
  );
}
