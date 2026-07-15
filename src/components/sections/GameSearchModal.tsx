"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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

interface GameSearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (result: SearchResult) => void;
}

export function GameSearchModal({ open, onClose, onSelect }: GameSearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [webLinks, setWebLinks] = useState<WebLink[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
      setWebLinks([]);
      setMessage("");
    }
  }, [open]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.length < 2) return;
    setLoading(true);
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = (await res.json()) as SearchResponse;
    setResults(data.results);
    setWebLinks(data.webLinks ?? []);
    setMessage(data.message ?? "");
    setLoading(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 neon-border">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-[family-name:var(--font-orbitron)] text-lg font-bold text-white">
            Recherche de jeux
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSearch} className="mb-4 flex gap-2">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nom du jeu..."
            className="flex-1 rounded-xl border border-[var(--border)] bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-cyan-600 px-5 py-3 font-bold text-white hover:bg-cyan-500 disabled:opacity-50"
          >
            {loading ? "..." : "Chercher"}
          </button>
        </form>

        {message && (
          <p className="mb-4 rounded-lg bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
            {message}
          </p>
        )}

        {webLinks.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {webLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-bold text-slate-300 hover:border-cyan-500 hover:text-cyan-300"
              >
                {link.name} ↗
              </a>
            ))}
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => onSelect(result)}
              className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-slate-900/50 p-3 text-left transition hover:border-violet-500"
            >
              <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-800">
                {result.coverUrl ? (
                  <Image
                    src={result.coverUrl}
                    alt={result.title}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-slate-500">
                    ?
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate font-bold text-white">{result.title}</p>
                {result.released && (
                  <p className="text-xs text-slate-400">{result.released}</p>
                )}
                {result.platforms.length > 0 && (
                  <p className="truncate text-xs text-slate-500">
                    {result.platforms.slice(0, 3).join(", ")}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
