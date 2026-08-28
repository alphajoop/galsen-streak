import { Hono } from "hono";
import { getLifetimeContributions, getUserProfile } from "./github/client";
import { calculateStreak } from "./streak/calculator";
import { SENEGAL } from "./svg/palette";
import { renderSVG } from "./svg/render";

const app = new Hono();

app.get("/streak/:username", async (c) => {
  const username = c.req.param("username");
  const hideGraph = c.req.query("hide_graph") === "true";

  try {
    const profile = await getUserProfile(username);
    const totalLifetime = await getLifetimeContributions(username, profile.contributionYears);

    const streak = calculateStreak(profile.days, totalLifetime, profile.createdAt);
    const svg = renderSVG(streak, !hideGraph);

    return c.text(svg, 200, {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    });
  } catch (_error) {
    return c.text(
      `<svg width="495" height="80" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${SENEGAL.bg}" rx="12"/>
        <text x="20" y="45" fill="${SENEGAL.error}" font-family="sans-serif" font-size="16">
          User not found
        </text>
      </svg>`,
      404,
      { "Content-Type": "image/svg+xml; charset=utf-8" },
    );
  }
});

app.get("/", (c) => {
  return c.json({
    service: "Galsen Streak",
    version: "3.0",
    status: "online",
  });
});

const port = Number(process.env.PORT) || 3000;

export default {
  port,
  fetch: app.fetch,
};
