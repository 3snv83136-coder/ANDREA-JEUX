import { promises as fs } from "fs";
import path from "path";
import { kv } from "@vercel/kv";
import type { Game } from "./types";
import seedGames from "../../data/games.json";

const DATA_DIR = path.join(process.cwd(), "data");
const GAMES_FILE = path.join(DATA_DIR, "games.json");
const GAMES_KEY = "andrea:games";

function hasKvStorage(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function ensureDataFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(GAMES_FILE);
  } catch {
    await fs.writeFile(GAMES_FILE, JSON.stringify(seedGames, null, 2), "utf-8");
  }
}

async function readFromFile(): Promise<Game[]> {
  await ensureDataFile();
  const raw = await fs.readFile(GAMES_FILE, "utf-8");
  return JSON.parse(raw) as Game[];
}

async function writeToFile(games: Game[]): Promise<void> {
  await ensureDataFile();
  await fs.writeFile(GAMES_FILE, JSON.stringify(games, null, 2), "utf-8");
}

async function readFromKv(): Promise<Game[]> {
  const games = await kv.get<Game[]>(GAMES_KEY);
  if (!games || games.length === 0) {
    await kv.set(GAMES_KEY, seedGames);
    return seedGames as Game[];
  }
  return games;
}

async function writeToKv(games: Game[]): Promise<void> {
  await kv.set(GAMES_KEY, games);
}

export async function getGames(): Promise<Game[]> {
  if (hasKvStorage()) return readFromKv();
  return readFromFile();
}

export async function saveGames(games: Game[]): Promise<void> {
  if (hasKvStorage()) {
    await writeToKv(games);
    return;
  }
  await writeToFile(games);
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
