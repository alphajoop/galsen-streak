export type Theme = {
  bg: string;
  bgGradient?: string;
  border: string;
  title: string;
  accent: string;
  text: string;
  subtext: string;
  graph: string[];
  fire: string;
  shadow: string;
};

export const THEMES: Record<string, Theme> = {
  senegal: {
    bg: "#0d1117",
    bgGradient: "#161b22",
    border: "#00853F",
    title: "#FDEF42",
    accent: "#E31B23",
    text: "#ffffff",
    subtext: "#8b949e",
    graph: ["#00853F", "#FDEF42", "#E31B23"],
    fire: "#ff6b35",
    shadow: "rgba(0, 133, 63, 0.3)",
  },

  ocean: {
    bg: "#0a192f",
    bgGradient: "#172a45",
    border: "#64ffda",
    title: "#64ffda",
    accent: "#f07178",
    text: "#ccd6f6",
    subtext: "#8892b0",
    graph: ["#5ccfe6", "#64ffda", "#f07178"],
    fire: "#ff6b6b",
    shadow: "rgba(100, 255, 218, 0.2)",
  },

  github: {
    bg: "#0d1117",
    bgGradient: "#161b22",
    border: "#30363d",
    title: "#58a6ff",
    accent: "#f85149",
    text: "#c9d1d9",
    subtext: "#8b949e",
    graph: ["#0e4429", "#006d32", "#26a641", "#39d353"],
    fire: "#f85149",
    shadow: "rgba(88, 166, 255, 0.2)",
  },

  sunset: {
    bg: "#1a1a2e",
    bgGradient: "#16213e",
    border: "#e94560",
    title: "#ff6b9d",
    accent: "#ffa400",
    text: "#ffffff",
    subtext: "#a8a8a8",
    graph: ["#ff6b9d", "#c44569", "#e94560"],
    fire: "#ffa400",
    shadow: "rgba(233, 69, 96, 0.3)",
  },

  forest: {
    bg: "#0f1419",
    bgGradient: "#1a2028",
    border: "#2ea043",
    title: "#7ee787",
    accent: "#58a6ff",
    text: "#e6edf3",
    subtext: "#7d8590",
    graph: ["#0e4429", "#006d32", "#26a641", "#39d353"],
    fire: "#f78166",
    shadow: "rgba(46, 160, 67, 0.25)",
  },
};
