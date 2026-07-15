import { getGames } from "@/lib/db";
import { PlanningView } from "@/components/sections/PlanningView";

export default async function PlanningPage() {
  const games = await getGames();

  return (
    <div className="page-container">
      <h1 className="page-title mb-2">Planning</h1>
      <p className="mb-10 text-slate-400">
        Gère ta file d&apos;attente de jeux par console et par date.
      </p>
      <PlanningView games={games} />
    </div>
  );
}
