import Link from "next/link";
import { getGames } from "@/lib/db";
import { GameCard } from "@/components/sections/GameCard";
import { PLATFORMS } from "@/lib/constants";

export default async function HomePage() {
  const games = await getGames();
  const playing = games.filter((g) => g.status === "playing").slice(0, 4);

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-600/10 via-transparent to-cyan-600/5" />

      <section className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
          Bienvenue sur
        </p>
        <h1 className="text-glow font-[family-name:var(--font-orbitron)] text-4xl font-black uppercase leading-tight tracking-wide text-white sm:text-6xl lg:text-7xl">
          ANDREA
          <br />
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            LE KING
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-xl font-semibold text-slate-300 sm:text-2xl">
          DES JEUX EN LIGNE
        </p>
        <p className="mx-auto mt-4 max-w-lg text-slate-400">
          Ton planning personnel de jeux vidéo — PC, PlayStation, Xbox, Nintendo et plus encore.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/planning"
            className="rounded-2xl bg-gradient-to-r from-violet-600 to-violet-500 px-8 py-4 font-[family-name:var(--font-orbitron)] text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:scale-105"
          >
            Voir le planning
          </Link>
          <Link
            href="/admin"
            className="rounded-2xl border border-cyan-500/50 bg-cyan-500/10 px-8 py-4 font-[family-name:var(--font-orbitron)] text-sm font-bold text-cyan-300 transition hover:bg-cyan-500/20"
          >
            Admin
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <h2 className="mb-6 text-center font-[family-name:var(--font-orbitron)] text-lg font-bold text-slate-300">
          Plateformes supportées
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {PLATFORMS.map((p) => (
            <span
              key={p.id}
              className="rounded-full border px-4 py-2 text-sm font-bold"
              style={{ borderColor: p.color, color: p.color }}
            >
              {p.label}
            </span>
          ))}
        </div>
      </section>

      {playing.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-8 font-[family-name:var(--font-orbitron)] text-2xl font-bold text-white">
            🎮 En cours de jeu
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {playing.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-10 neon-border">
          <p className="font-[family-name:var(--font-orbitron)] text-3xl font-black text-[var(--accent-glow)]">
            {games.length}
          </p>
          <p className="mt-2 text-slate-400">jeux dans la bibliothèque</p>
        </div>
      </section>
    </div>
  );
}
