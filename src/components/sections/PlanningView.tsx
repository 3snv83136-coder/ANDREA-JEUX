"use client";

import { useMemo, useState } from "react";
import type { Game, GameStatus, Platform } from "@/lib/types";
import { PLATFORMS, STATUSES } from "@/lib/constants";
import { GameCard } from "./GameCard";

interface PlanningViewProps {
  games: Game[];
}

export function PlanningView({ games }: PlanningViewProps) {
  const [platformFilter, setPlatformFilter] = useState<Platform | "all">("all");
  const [statusFilter, setStatusFilter] = useState<GameStatus | "all">("all");

  const filtered = useMemo(() => {
    return games.filter((g) => {
      if (platformFilter !== "all" && g.platform !== platformFilter) return false;
      if (statusFilter !== "all" && g.status !== statusFilter) return false;
      return true;
    });
  }, [games, platformFilter, statusFilter]);

  const scheduled = useMemo(() => {
    return [...filtered]
      .filter((g) => g.plannedDate)
      .sort((a, b) => (a.plannedDate! > b.plannedDate! ? 1 : -1));
  }, [filtered]);

  const unscheduled = filtered.filter((g) => !g.plannedDate);

  const stats = useMemo(() => {
    return STATUSES.map((s) => ({
      ...s,
      count: games.filter((g) => g.status === s.id).length,
    }));
  }, [games]);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.id}
            className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-center neon-border"
          >
            <p className="text-2xl font-bold" style={{ color: s.color }}>
              {s.count}
            </p>
            <p className="text-xs font-semibold text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <select
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value as Platform | "all")}
          className="w-full rounded-xl border border-[var(--border)] bg-slate-900 px-4 py-2.5 text-sm text-white sm:w-auto"
        >
          <option value="all">Toutes les consoles</option>
          {PLATFORMS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as GameStatus | "all")}
          className="w-full rounded-xl border border-[var(--border)] bg-slate-900 px-4 py-2.5 text-sm text-white sm:w-auto"
        >
          <option value="all">Tous les statuts</option>
          {STATUSES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {scheduled.length > 0 && (
        <section>
          <h2 className="mb-4 font-[family-name:var(--font-orbitron)] text-xl font-bold text-[var(--cyan)]">
            📅 Planning
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {scheduled.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      )}

      {unscheduled.length > 0 && (
        <section>
          <h2 className="mb-4 font-[family-name:var(--font-orbitron)] text-xl font-bold text-[var(--accent-glow)]">
            🎮 Sans date planifiée
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {unscheduled.map((game) => (
              <GameCard key={game.id} game={game} showDate={false} />
            ))}
          </div>
        </section>
      )}

      {filtered.length === 0 && (
        <p className="text-center text-slate-400">
          Aucun jeu trouvé. Ajoutez-en depuis l&apos;admin !
        </p>
      )}
    </div>
  );
}
