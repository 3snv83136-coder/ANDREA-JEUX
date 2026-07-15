"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SearchResult } from "@/lib/types";

interface WebLink {
  name: string;
  url: string;
}

interface SearchResponse {
  results: SearchResult[];
  webLinks?: WebLink[];
  message?: string;
}

const SUGGESTIONS = [
  "GTA 6",
  "Hollow Knight Silksong",
  "Elden Ring",
  "Zelda",
  "Final Fantasy",
  "Assassin's Creed",
];

export function GameSearchView() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [webLinks, setWebLinks] = useState<WebLink[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSearch(searchQuery?: string) {
    const q = (searchQuery ?? query).trim();
    if (q.length < 2) return;

    setQuery(q);
    setLoading(true);
    setSearched(true);

    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    const data = (await res.json()) as SearchResponse;
    setResults(data.results);
    setWebLinks(data.webLinks ?? []);
    setMessage(data.message ?? "");
    setLoading(false);
  }

  function handleAddToList(result: SearchResult) {
    sessionStorage.setItem(
      "andrea:pending-game",
      JSON.stringify({
        title: result.title,
        coverUrl: result.coverUrl ?? "",
        notes: result.released ? `Sortie : ${result.released}` : "",
      }),
    );
    router.push("/admin");
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 neon-border sm:p-6"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un nouveau jeu..."
            className="flex-1 rounded-xl border border-[var(--border)] bg-slate-900 px-4 py-3 text-base text-white outline-none focus:border-cyan-500 sm:px-5 sm:py-4 sm:text-lg"
          />
          <button
            type="submit"
            disabled={loading || query.length < 2}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 px-8 py-3.5 font-[family-name:var(--font-orbitron)] text-sm font-bold text-white transition hover:from-cyan-500 hover:to-cyan-400 disabled:opacity-50 sm:w-auto sm:py-4"
          >
            {loading ? "Recherche..." : "🔍 Chercher"}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs font-semibold text-slate-500">Suggestions :</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleSearch(s)}
              className="rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-400 transition hover:border-cyan-500/50 hover:text-cyan-300"
            >
              {s}
            </button>
          ))}
        </div>
      </form>

      {message && (
        <p className="rounded-xl bg-amber-500/10 px-5 py-3 text-sm text-amber-300">
          {message}
        </p>
      )}

      {webLinks.length > 0 && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <p className="mb-3 text-sm font-semibold text-slate-400">
            Rechercher aussi sur :
          </p>
          <div className="flex flex-wrap gap-2">
            {webLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-600 px-4 py-2 text-sm font-bold text-slate-300 transition hover:border-cyan-500 hover:text-cyan-300"
              >
                {link.name} ↗
              </a>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-2xl border border-[var(--border)] bg-slate-900/50"
            />
          ))}
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-12 text-center">
          <p className="text-4xl">🎮</p>
          <p className="mt-4 font-[family-name:var(--font-orbitron)] text-lg font-bold text-white">
            Aucun résultat trouvé
          </p>
          <p className="mt-2 text-slate-400">
            Essaie un autre nom ou utilise les liens externes ci-dessus.
          </p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((result) => (
            <article
              key={result.id}
              className="neon-border overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition hover:border-cyan-500/50"
            >
              <div className="relative aspect-video w-full bg-slate-900">
                {result.coverUrl ? (
                  <Image
                    src={result.coverUrl}
                    alt={result.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-cyan-900/30 to-violet-900/30">
                    <span className="font-[family-name:var(--font-orbitron)] text-4xl font-bold text-slate-600">
                      ?
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-[family-name:var(--font-orbitron)] text-sm font-bold leading-tight text-white">
                  {result.title}
                </h3>
                {result.released && (
                  <p className="mt-1 text-xs text-cyan-400">Sortie : {result.released}</p>
                )}
                {result.platforms.length > 0 && (
                  <p className="mt-2 line-clamp-2 text-xs text-slate-500">
                    {result.platforms.join(" · ")}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => handleAddToList(result)}
                  className="mt-4 w-full rounded-xl bg-violet-600 py-2.5 text-xs font-bold text-white transition hover:bg-violet-500"
                >
                  + Ajouter à ma liste
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {!searched && (
        <div className="rounded-2xl border border-dashed border-[var(--border)] p-12 text-center">
          <p className="text-5xl">🕹️</p>
          <p className="mt-4 font-[family-name:var(--font-orbitron)] text-xl font-bold text-white">
            Découvre de nouveaux jeux
          </p>
          <p className="mx-auto mt-2 max-w-md text-slate-400">
            Tape le nom d&apos;un jeu, explore les résultats et ajoute-le directement à ton
            planning.
          </p>
          <Link
            href="/planning"
            className="mt-6 inline-block rounded-xl border border-violet-500/50 px-6 py-3 text-sm font-bold text-violet-300 transition hover:bg-violet-500/10"
          >
            Voir mon planning actuel
          </Link>
        </div>
      )}
    </div>
  );
}
