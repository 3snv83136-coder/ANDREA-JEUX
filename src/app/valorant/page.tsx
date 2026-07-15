import { ValorantGuide } from "@/components/sections/ValorantGuide";

export default function ValorantPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 font-[family-name:var(--font-orbitron)] text-3xl font-black text-white">
        Valorant
      </h1>
      <p className="mb-10 text-slate-400">
        Suis le guide étape par étape pour lancer ta session de jeu.
      </p>
      <ValorantGuide />
    </div>
  );
}
