import { promises as fs } from "fs";
import path from "path";
import type { Game } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const GAMES_FILE = path.join(DATA_DIR, "games.json");

async function ensureDataFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(GAMES_FILE);
  } catch {
    await fs.writeFile(GAMES_FILE, "[]", "utf-8");
  }
}

export async function getGames(): Promise<Game[]> {
  await ensureDataFile();
  const raw = await fs.readFile(GAMES_FILE, "utf-8");
  return JSON.parse(raw) as Game[];
}

export async function saveGames(games: Game[]): Promise<void> {
  await ensureDataFile();
  await fs.writeFile(GAMES_FILE, JSON.stringify(games, null, 2), "utf-8");
}

export async function addGame(game: Game): Promise<Game> {
  const games = await getGames();
  games.push(game);
  await saveGames(games);
  return game;
}

export async function updateGame(id: string, updates: Partial<Game>): Promise<Game | null> {
  const games = await getGames();
  const index = games.findIndex((g) => g.id === id);
  if (index === -1) return null;
  games[index] = { ...games[index], ...updates, updatedAt: new Date().toISOString() };
  await saveGames(games);
  return games[index];
}

export async function deleteGame(id: string): Promise<boolean> {
  const games = await getGames();
  const filtered = games.filter((g) => g.id !== id);
  if (filtered.length === games.length) return false;
  await saveGames(filtered);
  return true;
}
