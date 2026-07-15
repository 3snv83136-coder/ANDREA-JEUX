import Image from "next/image";
import type { Game } from "@/lib/types";
import { getPlatformLabel, getStatusLabel, PLATFORMS, STATUSES } from "@/lib/constants";

interface GameCardProps {
  game: Game;
  showDate?: boolean;
}

export function GameCard({ game, showDate = true }: GameCardProps) {
  const platform = PLATFORMS.find((p) => p.id === game.platform);
  const status = STATUSES.find((s) => s.id === game.status);

  return (
    <article className="neon-border group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition hover:border-violet-500/50">
      <div className="relative aspect-[3/4] w-full bg-slate-900">
        {game.coverUrl ? (
          <Image
            src={game.coverUrl}
            alt={game.title}
            fill
            className="object-cover transition group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-900/40 to-cyan-900/20">
            <span className="px-4 text-center font-[family-name:var(--font-orbitron)] text-2xl font-bold text-violet-300/60">
              {game.title.charAt(0)}
            </span>
          </div>
        )}
        <span
          className="absolute right-2 top-2 rounded-full px-2 py-0.5 text-xs font-bold text-white"
          style={{ backgroundColor: status?.color }}
        >
          {getStatusLabel(game.status)}
        </span>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 font-[family-name:var(--font-orbitron)] text-sm font-bold leading-tight text-white">
          {game.title}
        </h3>
        <p className="mt-2 text-xs font-semibold" style={{ color: platform?.color }}>
          {getPlatformLabel(game.platform)}
        </p>
        {showDate && game.plannedDate && (
          <p className="mt-1 text-xs text-slate-400">
            📅 {new Date(game.plannedDate).toLocaleDateString("fr-FR")}
          </p>
        )}
        {game.notes && (
          <p className="mt-2 line-clamp-2 text-xs text-slate-500">{game.notes}</p>
        )}
      </div>
    </article>
  );
}
