import { Hono } from "hono";
import { getStreakData, getTotalContributions, getUserInfo } from "./github/client";
import { calculateStreak } from "./streak/calculator";
import { SENEGAL } from "./svg/palette";
import { renderSVG } from "./svg/render";

const app = new Hono();

app.get("/streak/:username", async (c) => {
  const username = c.req.param("username");
  const hideGraph = c.req.query("hide_graph") === "true";

  try {
    const [days, userInfo, totalLifetime] = await Promise.all([
      getStreakData(username),
      getUserInfo(username),
      getTotalContributions(username),
    ]);

    const streak = calculateStreak(days, totalLifetime, userInfo.createdAt);
    const svg = renderSVG(streak, !hideGraph);

    return c.text(svg, 200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
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
      { "Content-Type": "image/svg+xml" },
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

export default app;
