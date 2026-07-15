import { getGames } from "@/lib/db";
import { AdminPanel } from "@/components/sections/AdminPanel";

export default async function AdminPage() {
  const games = await getGames();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 font-[family-name:var(--font-orbitron)] text-3xl font-black text-white">
        Administration
      </h1>
      <p className="mb-10 text-slate-400">
        Ajoute, modifie ou supprime des jeux. Recherche sur internet pour importer les infos.
      </p>
      <AdminPanel initialGames={games} />
    </div>
  );
}
