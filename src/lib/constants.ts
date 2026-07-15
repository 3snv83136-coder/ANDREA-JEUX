import type { GameStatus, Platform } from "./types";

export const PLATFORMS: { id: Platform; label: string; color: string }[] = [
  { id: "pc", label: "PC", color: "#3b82f6" },
  { id: "ps5", label: "PlayStation 5", color: "#2563eb" },
  { id: "ps4", label: "PlayStation 4", color: "#1d4ed8" },
  { id: "xbox-series", label: "Xbox Series X|S", color: "#22c55e" },
  { id: "xbox-one", label: "Xbox One", color: "#16a34a" },
  { id: "switch", label: "Nintendo Switch", color: "#ef4444" },
  { id: "switch-2", label: "Nintendo Switch 2", color: "#dc2626" },
  { id: "mobile", label: "Mobile", color: "#a855f7" },
  { id: "retro", label: "Retro / Autres", color: "#f59e0b" },
];

export const STATUSES: { id: GameStatus; label: string; color: string }[] = [
  { id: "backlog", label: "À jouer", color: "#6366f1" },
  { id: "playing", label: "En cours", color: "#22d3ee" },
  { id: "completed", label: "Terminé", color: "#34d399" },
  { id: "paused", label: "En pause", color: "#fbbf24" },
];

export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "andrea2026";

export function getPlatformLabel(id: Platform): string {
  return PLATFORMS.find((p) => p.id === id)?.label ?? id;
}

export function getStatusLabel(id: GameStatus): string {
  return STATUSES.find((s) => s.id === id)?.label ?? id;
}
