import type { BadgeConfig, BadgeParams } from "../types";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export function buildBadgeConfig(params: BadgeParams): BadgeConfig {
  const query = new URLSearchParams({
    theme: params.theme,
    hide_graph: String(params.hide_graph),
  });

  const url = `${API_BASE}/streak/${params.username}?${query.toString()}`;

  return {
    ...params,
    url,
    markdown: `![GitHub Streak](${url})`,
  };
}
