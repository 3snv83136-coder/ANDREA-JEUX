import { GameSearchView } from "@/components/sections/GameSearchView";

export default function RecherchePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-2 font-[family-name:var(--font-orbitron)] text-3xl font-black text-white">
        Recherche de nouveaux jeux
      </h1>
      <p className="mb-10 text-slate-400">
        Trouve les dernières sorties et ajoute-les à ton planning en un clic.
      </p>
      <GameSearchView />
    </div>
  );
}
