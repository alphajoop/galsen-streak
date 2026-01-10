import { Hono } from "hono";
import { getStreakData, getTotalContributions, getUserInfo } from "./github/client";
import { calculateStreak } from "./streak/calculator";
import { renderSVG } from "./svg/render";
import { THEMES } from "./svg/themes";

const app = new Hono();

app.get("/streak/:username", async (c) => {
  const username = c.req.param("username");
  const theme = c.req.query("theme") || "senegal";
  const hideGraph = c.req.query("hide_graph") === "true";

  try {
    // Récupération parallèle des données
    const [days, userInfo, totalLifetime] = await Promise.all([
      getStreakData(username),
      getUserInfo(username),
      getTotalContributions(username),
    ]);

    const streak = calculateStreak(days, totalLifetime, userInfo.createdAt);
    const svg = renderSVG(streak, theme, !hideGraph);

    return c.text(svg, 200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    });
  } catch (_error) {
    return c.text(
      `<svg width="495" height="80" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#0d1117" rx="12"/>
        <text x="20" y="45" fill="#f85149" font-family="sans-serif" font-size="16">
          ⚠️ Erreur: Utilisateur introuvable
        </text>
      </svg>`,
      404,
      { "Content-Type": "image/svg+xml" },
    );
  }
});

app.get("/themes", (c) => {
  return c.json({
    themes: Object.keys(THEMES),
    default: "senegal",
  });
});

app.get("/", (c) => {
  return c.json({
    service: "Galsen Streak",
    version: "2.1",
    status: "✅ Online",
  });
});

export default app;
