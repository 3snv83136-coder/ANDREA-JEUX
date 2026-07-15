import { getGames } from "@/lib/db";
import { PlanningView } from "@/components/sections/PlanningView";

export default async function PlanningPage() {
  const games = await getGames();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-2 font-[family-name:var(--font-orbitron)] text-3xl font-black text-white">
        Planning
      </h1>
      <p className="mb-10 text-slate-400">
        Gère ta file d&apos;attente de jeux par console et par date.
      </p>
      <PlanningView games={games} />
    </div>
  );
}
