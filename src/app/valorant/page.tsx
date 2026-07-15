import { ValorantGuide } from "@/components/sections/ValorantGuide";

export default function ValorantPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="page-title mb-2">Valorant</h1>
      <p className="mb-10 text-slate-400">
        Suis le guide étape par étape pour lancer ta session de jeu.
      </p>
      <ValorantGuide />
    </div>
  );
}
