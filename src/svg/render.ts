import { format } from "date-fns";
import type { StreakResult } from "../streak/types";
import { THEMES, type Theme } from "./themes";

function getTheme(themeName: string): Theme {
  const themes = THEMES;
  const theme = themes[themeName];
  return theme ?? (themes.senegal as Theme);
}

function formatDate(dateString: string): string {
  return format(new Date(dateString), "MMMM d, yyyy");
}

export function renderSVG(
  streak: StreakResult,
  themeName: string = "senegal",
  showGraph: boolean = true,
): string {
  const theme = getTheme(themeName);
  const { current, longest, totalLifetime, accountCreatedAt, graph } = streak;

  const maxValue = Math.max(...graph, 1);
  const normalizedGraph = graph.map((val) => (val / maxValue) * 40);
  const formattedDate = formatDate(accountCreatedAt);

  return `
<svg width="495" height="${showGraph ? "220" : "155"}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${theme.bg};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${theme.bgGradient || theme.bg};stop-opacity:1" />
    </linearGradient>
    
    <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${theme.border};stop-opacity:0.5" />
      <stop offset="50%" style="stop-color:${theme.border};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${theme.border};stop-opacity:0.5" />
    </linearGradient>

    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;display=swap');
      
      .title { 
        font: 600 18px 'Inter', 'Segoe UI', system-ui, sans-serif; 
        fill: ${theme.title};
        letter-spacing: -0.5px;
      }
      
      .stat-label { 
        font: 400 11px 'Inter', 'Segoe UI', system-ui, sans-serif; 
        fill: ${theme.subtext};
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 600;
      }
      
      .stat-value { 
        font: 700 28px 'Inter', 'Segoe UI', system-ui, sans-serif; 
        fill: ${theme.text};
      }
      
      .stat-unit {
        font: 400 14px 'Inter', 'Segoe UI', system-ui, sans-serif;
        fill: ${theme.subtext};
      }
      
      .fire-emoji {
        font-size: 22px;
      }
      
      .contributions-text {
        font: 600 12px 'Inter', 'Segoe UI', system-ui, sans-serif;
        fill: ${theme.text};
        letter-spacing: 0.3px;
      }

      .contributions-since {
        font: 400 9px 'Inter', 'Segoe UI', system-ui, sans-serif;
        fill: ${theme.subtext};
        letter-spacing: 0.2px;
      }

      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.85; transform: scale(1.05); }
      }

      @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
      }

      @keyframes borderShine {
        0% { stroke-dashoffset: 1000; }
        100% { stroke-dashoffset: 0; }
      }

      .fire-emoji {
        animation: pulse 2s ease-in-out infinite;
        transform-origin: center;
      }

      .stat-card {
        animation: fadeInUp 0.6s ease-out forwards;
        opacity: 0;
      }

      .stat-card:nth-child(1) { animation-delay: 0.1s; }
      .stat-card:nth-child(2) { animation-delay: 0.2s; }
      .header-group { animation: slideInLeft 0.5s ease-out; }
      
      .border-animated {
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
        animation: borderShine 2s ease-out forwards;
      }

      .graph-bar {
        animation: fadeInUp 0.8s ease-out forwards;
        opacity: 0;
        transform-origin: bottom;
      }
    </style>
  </defs>

  <rect width="100%" height="100%" rx="12" fill="url(#bgGradient)" />
  <rect x="1" y="1" width="493" height="${showGraph ? "218" : "153"}" 
        rx="11" fill="none" stroke="url(#borderGradient)" 
        stroke-width="1.5" class="border-animated" opacity="0.4"/>

  <!-- Header -->
  <g class="header-group">
    <text x="20" y="35" class="fire-emoji">🔥</text>
    <text x="50" y="38" class="title">Galsen Streak</text>
    
    <!-- Total Lifetime Contributions -->
    <g transform="translate(465, 0)">
      <text x="0" y="30" class="contributions-text" text-anchor="end">
        ${totalLifetime.toLocaleString()} contributions
      </text>
      <text x="0" y="42" class="contributions-since" text-anchor="end">
        since ${formattedDate}
      </text>
    </g>
  </g>

  <!-- Stats Grid -->
  <g transform="translate(20, 65)">
    <!-- Current Streak Card -->
    <g class="stat-card">
      <rect x="0" y="0" width="210" height="70" rx="10" 
            fill="${theme.border}" opacity="0.08"/>
      <rect x="0" y="0" width="210" height="70" rx="10" 
            fill="none" stroke="${theme.border}" stroke-width="1" opacity="0.2"/>
      <text x="15" y="22" class="stat-label">🔥 Current Streak</text>
      <text x="15" y="55" class="stat-value">${current}</text>
      <text x="${current > 99 ? 85 : current > 9 ? 70 : 60}" y="55" class="stat-unit">days</text>
    </g>

    <!-- Longest Streak Card -->
    <g class="stat-card">
      <rect x="225" y="0" width="210" height="70" rx="10" 
            fill="${theme.accent}" opacity="0.08"/>
      <rect x="225" y="0" width="210" height="70" rx="10" 
            fill="none" stroke="${theme.accent}" stroke-width="1" opacity="0.2"/>
      <text x="240" y="22" class="stat-label">🏆 Longest</text>
      <text x="240" y="55" class="stat-value">${longest}</text>
      <text x="${longest > 99 ? 310 : longest > 9 ? 295 : 285}" y="55" class="stat-unit">days</text>
    </g>
  </g>

  ${showGraph ? renderGraph(normalizedGraph, theme) : ""}
</svg>
`.trim();
}

function renderGraph(graph: number[], theme: Theme): string {
  const barWidth = 12;
  const gap = 3;
  const startX = 20;
  const startY = 180;

  return `
  <line x1="20" y1="148" x2="475" y2="148" 
        stroke="${theme.border}" stroke-width="1" opacity="0.15"/>
  <text x="20" y="164" class="stat-label">Activity - Last 30 days</text>
  
  <g transform="translate(${startX}, ${startY + 25})">
    ${graph
      .map((height, i) => {
        const x = i * (barWidth + gap);
        const actualHeight = Math.max(height, 2);

        let color: string;
        if (height > 30) {
          color = theme.graph[2] || theme.accent;
        } else if (height > 15) {
          color = theme.graph[1] || theme.border;
        } else if (height > 5) {
          color = theme.graph[0] || theme.subtext;
        } else {
          color = theme.subtext;
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
