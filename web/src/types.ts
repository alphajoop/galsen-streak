export type Theme = "senegal" | "ocean" | "github" | "sunset" | "forest";

export interface BadgeParams {
  username: string;
  theme: Theme;
  hide_graph: boolean;
}

export interface BadgeConfig extends BadgeParams {
  url: string;
  markdown: string;
}
