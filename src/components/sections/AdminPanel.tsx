"use client";

import { useState } from "react";
import type { Game, GameStatus, Platform } from "@/lib/types";
import { PLATFORMS, STATUSES } from "@/lib/constants";
import { GameSearchModal } from "./GameSearchModal";

interface AdminPanelProps {
  initialGames: Game[];
}

const emptyForm = {
  title: "",
  platform: "pc" as Platform,
  status: "backlog" as GameStatus,
  plannedDate: "",
  coverUrl: "",
  notes: "",
};

export function AdminPanel({ initialGames }: AdminPanelProps) {
  const [games, setGames] = useState(initialGames);
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setError("Mot de passe incorrect");
      return;
    }
    const data = (await res.json()) as { token: string };
    setToken(data.token);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    setError("");

    const payload = {
      title: form.title,
      platform: form.platform,
      status: form.status,
      plannedDate: form.plannedDate || null,
      coverUrl: form.coverUrl || null,
      notes: form.notes,
    };

    try {
      if (editingId) {
        const res = await fetch(`/api/games/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-admin-token": token,
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Erreur mise à jour");
        const updated = (await res.json()) as Game;
        setGames((prev) => prev.map((g) => (g.id === editingId ? updated : g)));
        setEditingId(null);
      } else {
        const res = await fetch("/api/games", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-token": token,
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Erreur création");
        const created = (await res.json()) as Game;
        setGames((prev) => [...prev, created]);
      }
      setForm(emptyForm);
    } catch {
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!token || !confirm("Supprimer ce jeu ?")) return;
    const res = await fetch(`/api/games/${id}`, {
      method: "DELETE",
      headers: { "x-admin-token": token },
    });
    if (res.ok) setGames((prev) => prev.filter((g) => g.id !== id));
  }

  function startEdit(game: Game) {
    setEditingId(game.id);
    setForm({
      title: game.title,
      platform: game.platform,
      status: game.status,
      plannedDate: game.plannedDate ?? "",
      coverUrl: game.coverUrl ?? "",
      notes: game.notes,
    });
  }

  if (!token) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 neon-border">
        <h1 className="mb-6 text-center font-[family-name:var(--font-orbitron)] text-2xl font-bold text-[var(--accent-glow)]">
          🔐 Admin
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe admin"
            className="w-full rounded-xl border border-[var(--border)] bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-violet-600 py-3 font-bold text-white transition hover:bg-violet-500"
          >
            Connexion
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-slate-500">
          Mot de passe par défaut : andrea2026
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <GameSearchModal
        open={showSearch}
        onClose={() => setShowSearch(false)}
        onSelect={(result) => {
          setForm((f) => ({
            ...f,
            title: result.title,
            coverUrl: result.coverUrl ?? "",
          }));
          setShowSearch(false);
        }}
      />

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 neon-border">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-[family-name:var(--font-orbitron)] text-xl font-bold text-white">
            {editingId ? "Modifier un jeu" : "Ajouter un jeu"}
          </h2>
          <button
            type="button"
            onClick={() => setShowSearch(true)}
            className="rounded-xl border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 text-sm font-bold text-cyan-300 transition hover:bg-cyan-500/20"
          >
            🌐 Rechercher sur internet
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Titre du jeu"
            className="rounded-xl border border-[var(--border)] bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500 sm:col-span-2"
          />
          <select
            value={form.platform}
            onChange={(e) => setForm({ ...form, platform: e.target.value as Platform })}
            className="rounded-xl border border-[var(--border)] bg-slate-900 px-4 py-3 text-white outline-none"
          >
            {PLATFORMS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as GameStatus })}
            className="rounded-xl border border-[var(--border)] bg-slate-900 px-4 py-3 text-white outline-none"
          >
            {STATUSES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={form.plannedDate}
            onChange={(e) => setForm({ ...form, plannedDate: e.target.value })}
            className="rounded-xl border border-[var(--border)] bg-slate-900 px-4 py-3 text-white outline-none"
          />
          <input
            value={form.coverUrl}
            onChange={(e) => setForm({ ...form, coverUrl: e.target.value })}
            placeholder="URL de la jaquette (optionnel)"
            className="rounded-xl border border-[var(--border)] bg-slate-900 px-4 py-3 text-white outline-none"
          />
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Notes"
            rows={2}
            className="rounded-xl border border-[var(--border)] bg-slate-900 px-4 py-3 text-white outline-none sm:col-span-2"
          />
          {error && <p className="text-sm text-red-400 sm:col-span-2">{error}</p>}
          <div className="flex gap-3 sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-violet-600 px-6 py-3 font-bold text-white transition hover:bg-violet-500 disabled:opacity-50"
            >
              {loading ? "..." : editingId ? "Mettre à jour" : "Ajouter"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
                className="rounded-xl border border-slate-600 px-6 py-3 font-bold text-slate-300"
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="mb-4 font-[family-name:var(--font-orbitron)] text-xl font-bold text-white">
          Bibliothèque ({games.length})
        </h2>
        <div className="space-y-2">
          {games.map((game) => (
            <div
              key={game.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[var(--border)] bg-slate-900/50 px-4 py-3"
            >
              <div>
                <p className="font-bold text-white">{game.title}</p>
                <p className="text-xs text-slate-400">
                  {PLATFORMS.find((p) => p.id === game.platform)?.label} —{" "}
                  {STATUSES.find((s) => s.id === game.status)?.label}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(game)}
                  className="rounded-lg bg-violet-600/20 px-3 py-1 text-xs font-bold text-violet-300"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(game.id)}
                  className="rounded-lg bg-red-600/20 px-3 py-1 text-xs font-bold text-red-300"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
