export interface Theme {
  value: string;
  label: string;
  emoji: string;
  colors: string[];
}

export const THEMES: Theme[] = [
  { value: "senegal", label: "Senegal", emoji: "🇸🇳", colors: ["#00853F", "#FDEF42", "#E31B23"] },
  { value: "ocean", label: "Ocean", emoji: "🌊", colors: ["#0a192f", "#64ffda", "#5ccfe6"] },
  { value: "github", label: "GitHub", emoji: "⚡", colors: ["#0d1117", "#58a6ff", "#f85149"] },
  { value: "sunset", label: "Sunset", emoji: "🌅", colors: ["#1a1a2e", "#ff6b9d", "#ffa400"] },
  { value: "forest", label: "Forest", emoji: "🌲", colors: ["#0f1419", "#7ee787", "#2ea043"] },
];

export const API_BASE = "https://galsen-streak.vercel.app";
