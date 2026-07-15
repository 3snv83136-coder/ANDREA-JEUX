import { getGames } from "@/lib/db";
import { AdminPanel } from "@/components/sections/AdminPanel";

export default async function AdminPage() {
  const games = await getGames();

  return (
    <div className="page-container max-w-4xl">
      <h1 className="page-title mb-2">Administration</h1>
      <p className="mb-10 text-slate-400">
        Ajoute, modifie ou supprime des jeux. Recherche sur internet pour importer les infos.
      </p>
      <AdminPanel initialGames={games} />
    </div>
  );
}
