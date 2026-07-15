export type Platform =
  | "pc"
  | "ps5"
  | "ps4"
  | "xbox-series"
  | "xbox-one"
  | "switch"
  | "switch-2"
  | "mobile"
  | "retro";

export type GameStatus = "backlog" | "playing" | "completed" | "paused";

export interface Game {
  id: string;
  title: string;
  platform: Platform;
  status: GameStatus;
  plannedDate: string | null;
  coverUrl: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchResult {
  id: number;
  title: string;
  coverUrl: string | null;
  released: string | null;
  platforms: string[];
}
