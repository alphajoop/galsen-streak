import { format } from "date-fns";
import type { StreakResult } from "../streak/types";
import { type Palette, SENEGAL } from "./palette";

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";

function formatDate(dateString: string): string {
  return format(new Date(dateString), "MMMM d, yyyy");
}

function statusColor(status: StreakResult["streakStatus"], palette: Palette): string {
  switch (status) {
    case "active":
    case "grace-day":
      return palette.active;
    case "broken":
      return palette.error;
    default:
      return palette.error;
  }
}

export function renderSVG(streak: StreakResult, showGraph = true): string {
  const palette = SENEGAL;
  const { current, longest, totalLifetime, accountCreatedAt, graph, streakStatus } = streak;

  const maxValue = Math.max(...graph, 1);
  const normalizedGraph = graph.map((val) => (val / maxValue) * 40);
  const formattedDate = formatDate(accountCreatedAt);

  return `
<svg width="495" height="${showGraph ? "220" : "155"}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .title {
        font: 600 18px ${FONT};
        fill: ${palette.title};
        letter-spacing: -0.5px;
      }

      .stat-label {
        font: 600 11px ${FONT};
        fill: ${palette.subtext};
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .stat-value {
        font: 700 28px ${FONT};
        fill: ${palette.text};
      }

      .stat-unit {
        font: 400 14px ${FONT};
        fill: ${palette.subtext};
      }

      .fire-emoji { font-size: 22px; }

      .contributions-text {
        font: 600 12px ${FONT};
        fill: ${palette.text};
        letter-spacing: 0.3px;
      }

      .contributions-since {
        font: 400 9px ${FONT};
        fill: ${palette.subtext};
        letter-spacing: 0.2px;
      }

      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
      }

      .stat-card {
        animation: fadeInUp 0.6s ease-out forwards;
        opacity: 0;
      }

      .stat-card:nth-child(1) { animation-delay: 0.1s; }
      .stat-card:nth-child(2) { animation-delay: 0.2s; }
      .header-group { animation: slideInLeft 0.5s ease-out; }

      .graph-bar {
        animation: fadeInUp 0.8s ease-out forwards;
        opacity: 0;
        transform-origin: bottom;
      }
    </style>
  </defs>

  <rect width="100%" height="100%" rx="12" fill="${palette.bg}" />
  <rect x="0.75" y="0.75" width="493.5" height="${showGraph ? "218.5" : "153.5"}"
        rx="11.25" fill="none" stroke="${palette.border}"
        stroke-width="1.5" stroke-opacity="0.45"/>

  <g class="header-group">
    <text x="20" y="35" class="fire-emoji">🔥</text>
    <text x="50" y="38" class="title">Galsen Streak</text>

    <g transform="translate(465, 0)">
      <text x="0" y="30" class="contributions-text" text-anchor="end">
        ${totalLifetime.toLocaleString()} contributions
      </text>
      <text x="0" y="42" class="contributions-since" text-anchor="end">
        since ${formattedDate}
      </text>
    </g>
  </g>

  <g transform="translate(20, 65)">
    <g class="stat-card">
      <rect x="0" y="0" width="210" height="70" rx="10"
            fill="${palette.border}" opacity="0.08"/>
      <rect x="0" y="0" width="210" height="70" rx="10"
            fill="none" stroke="${palette.border}" stroke-width="1" opacity="0.2"/>
      <text x="15" y="22" class="stat-label">🔥 Current Streak</text>
      <text x="15" y="55" class="stat-value">${current}</text>
      <text x="${current > 99 ? 85 : current > 9 ? 70 : 60}" y="55" class="stat-unit">days</text>
      <circle cx="200" cy="50" r="3" fill="${statusColor(streakStatus, palette)}" opacity="0.8"/>
    </g>

    <g class="stat-card">
      <rect x="225" y="0" width="210" height="70" rx="10"
            fill="${palette.accent}" opacity="0.08"/>
      <rect x="225" y="0" width="210" height="70" rx="10"
            fill="none" stroke="${palette.accent}" stroke-width="1" opacity="0.2"/>
      <text x="240" y="22" class="stat-label">🏆 Longest</text>
      <text x="240" y="55" class="stat-value">${longest}</text>
      <text x="${longest > 99 ? 310 : longest > 9 ? 295 : 285}" y="55" class="stat-unit">days</text>
    </g>
  </g>

  ${showGraph ? renderGraph(normalizedGraph, palette) : ""}
</svg>
`.trim();
}

function renderGraph(graph: number[], palette: Palette): string {
  const barWidth = 12;
  const gap = 3;
  const startX = 20;
  const startY = 180;
  const max = Math.max(...graph);

  return `
  <line x1="20" y1="148" x2="475" y2="148"
        stroke="${palette.border}" stroke-width="1" opacity="0.15"/>
  <text x="20" y="164" class="stat-label">Activity — Last 30 days</text>

  <g transform="translate(${startX}, ${startY + 25})">
    ${graph
      .map((height, i) => {
        const x = i * (barWidth + gap);
        const actualHeight = Math.max(height, 2);

        let color: string;
        if (height > max * 0.7) {
          color = palette.graph[2];
        } else if (height > max * 0.3) {
          color = palette.graph[1];
        } else if (height > 0) {
          color = palette.graph[0];
        } else {
          color = palette.subtext;
        }

        const opacity = height > 0 ? 0.9 : 0.2;
        const delay = i * 0.02;

        return `
        <rect x="${x}" y="${-actualHeight}"
              width="${barWidth}" height="${actualHeight}"
              rx="3" fill="${color}" opacity="${opacity}"
              class="graph-bar"
              style="animation-delay: ${delay}s;">
        </rect>
      `;
      })
      .join("")}
  </g>
  `;
}
