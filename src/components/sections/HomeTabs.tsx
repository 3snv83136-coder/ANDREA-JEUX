"use client";

import Link from "next/link";
import { useState } from "react";
import type { Game } from "@/lib/types";
import { PLATFORMS } from "@/lib/constants";
import { GameCard } from "@/components/sections/GameCard";
import { GameSearchView } from "@/components/sections/GameSearchView";

interface HomeTabsProps {
  games: Game[];
  playing: Game[];
}

const TABS = [
  { id: "jeux", label: "Jeux" },
  { id: "recherche", label: "Recherche de nouveaux jeux" },
  { id: "zinc", label: "Au zinc, on mange pas bien" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function HomeTabs({ games, playing }: HomeTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("jeux");

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-600/10 via-transparent to-cyan-600/5" />

      <div className="relative mx-auto max-w-6xl px-4 pt-12">
        <div className="flex flex-wrap justify-center gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-2xl px-5 py-3 font-[family-name:var(--font-orbitron)] text-xs font-bold transition sm:text-sm ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-violet-600 to-violet-500 text-white shadow-lg shadow-violet-500/30"
                  : "border border-[var(--border)] bg-[var(--card)] text-slate-400 hover:border-violet-500/50 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "jeux" && (
        <>
          <section className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:py-20">
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
                href="/recherche"
                className="rounded-2xl border border-cyan-500/50 bg-cyan-500/10 px-8 py-4 font-[family-name:var(--font-orbitron)] text-sm font-bold text-cyan-300 transition hover:bg-cyan-500/20"
              >
                Nouveaux jeux
              </Link>
              <Link
                href="/admin"
                className="rounded-2xl border border-violet-500/50 bg-violet-500/10 px-8 py-4 font-[family-name:var(--font-orbitron)] text-sm font-bold text-violet-300 transition hover:bg-violet-500/20"
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
        </>
      )}

      {activeTab === "recherche" && (
        <section className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <h2 className="mb-2 text-center font-[family-name:var(--font-orbitron)] text-2xl font-black text-white sm:text-3xl">
            Recherche de nouveaux jeux
          </h2>
          <p className="mb-8 text-center text-slate-400">
            Trouve les dernières sorties et ajoute-les à ton planning.
          </p>
          <GameSearchView />
        </section>
      )}

      {activeTab === "zinc" && (
        <section className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:py-28">
          <p className="mb-6 text-6xl">🍽️</p>
          <h2 className="text-glow font-[family-name:var(--font-orbitron)] text-3xl font-black uppercase leading-tight text-white sm:text-5xl">
            Au zinc,
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              on mange pas bien
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-lg text-slate-400">
            Entre deux sessions de jeu, la vérité sort du zinc. Pizza froide, nouilles instantanées et
            boissons énergétiques — le combo officiel du gamer.
          </p>
          <div className="mx-auto mt-12 grid max-w-md gap-4 text-left">
            {[
              "🍕 Pizza réchauffée au micro-ondes",
              "🍜 Nouilles 3 minutes chrono",
              "🥤 Boisson sucrée en quantité industrielle",
              "🥫 Rien de vert depuis 3 jours",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-5 py-3 text-sm font-semibold text-amber-200/80"
              >
                {item}
              </div>
            ))}
          </div>
          <p className="mt-12 font-[family-name:var(--font-orbitron)] text-sm font-bold uppercase tracking-widest text-amber-500/60">
            — Andrea le King, philosophe du zinc
          </p>
        </section>
      )}
    </div>
  );
}
