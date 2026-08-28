export type Palette = {
  bg: string;
  border: string;
  title: string;
  accent: string;
  text: string;
  subtext: string;
  graph: [string, string, string];
  active: string;
  error: string;
};

export const SENEGAL: Palette = {
  bg: "#09090b",
  border: "#00853F",
  title: "#FDEF42",
  accent: "#E31B23",
  text: "#ffffff",
  subtext: "#71717a",
  graph: ["#00853F", "#FDEF42", "#E31B23"],
  active: "#00853F",
  error: "#E31B23",
};
