export type Palette = {
  bg: string;
  bgGradient: string;
  border: string;
  title: string;
  accent: string;
  text: string;
  subtext: string;
  graph: [string, string, string];
  active: string;
  warning: string;
  error: string;
};

export const SENEGAL: Palette = {
  bg: "#0d1117",
  bgGradient: "#161b22",
  border: "#00853F",
  title: "#FDEF42",
  accent: "#E31B23",
  text: "#ffffff",
  subtext: "#8b949e",
  graph: ["#00853F", "#FDEF42", "#E31B23"],
  active: "#22c55e",
  warning: "#f59e0b",
  error: "#E31B23",
};
