import { GameSearchView } from "@/components/sections/GameSearchView";

export default function RecherchePage() {
  return (
    <div className="page-container">
      <h1 className="page-title mb-2">Recherche de nouveaux jeux</h1>
      <p className="mb-10 text-slate-400">
        Trouve les dernières sorties et ajoute-les à ton planning en un clic.
      </p>
      <GameSearchView />
    </div>
  );
}
