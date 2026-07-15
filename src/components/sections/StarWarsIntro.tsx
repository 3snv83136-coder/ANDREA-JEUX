"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function StarWarsIntro() {
  const router = useRouter();
  const [showCrawl, setShowCrawl] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowCrawl(true), 2500);
    const t2 = setTimeout(() => setFadeOut(true), 14000);
    const t3 = setTimeout(() => router.push("/accueil"), 15500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [router]);

  function handleSkip() {
    router.push("/accueil");
  }

  return (
    <div
      className={`starwars-scene fixed inset-0 z-[100] overflow-hidden bg-black transition-opacity duration-[1500ms] ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="starwars-stars" />

      {!showCrawl && (
        <div className="starwars-fade-text absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="starwars-prelude mb-8 text-sm font-medium tracking-[0.35em] text-[#4bd5ee] sm:text-base">
            Il y a bien longtemps, dans une galaxie lointaine...
          </p>
          <h1 className="starwars-logo font-[family-name:var(--font-orbitron)] text-5xl font-black uppercase leading-none tracking-[0.15em] text-[#ffe81f] sm:text-7xl md:text-8xl">
            Andrea
          </h1>
        </div>
      )}

      {showCrawl && (
        <div className="starwars-crawl-perspective absolute inset-0 flex justify-center overflow-hidden">
          <div className="starwars-crawl-content">
            <h2 className="mb-8 text-center text-4xl font-black uppercase tracking-widest text-[#ffe81f] sm:text-5xl">
              Andrea
            </h2>
            <p className="text-justify text-lg font-bold leading-relaxed text-[#ffe81f] sm:text-xl">
              Venu des confins de l&apos;espace, Andrea entame un voyage légendaire à
              travers le cosmos intersidéral.
            </p>
            <p className="mt-6 text-justify text-lg font-bold leading-relaxed text-[#ffe81f] sm:text-xl">
              Sa quête le mène vers son père, retranché au zinc, et vers son frère
              Lucas, perdu quelque part dans l&apos;immensité stellaire.
            </p>
            <p className="mt-6 text-justify text-lg font-bold leading-relaxed text-[#ffe81f] sm:text-xl">
              Guidé par la force des jeux en ligne, le jeune Andrea le King s&apos;apprête
              à écrire sa propre saga...
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleSkip}
        className="absolute bottom-8 right-8 z-10 rounded-lg border border-[#ffe81f]/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#ffe81f]/70 transition hover:border-[#ffe81f] hover:text-[#ffe81f]"
      >
        Passer →
      </button>

      <Link
        href="/accueil"
        className="absolute bottom-8 left-8 z-10 text-xs font-bold uppercase tracking-wider text-[#4bd5ee]/60 transition hover:text-[#4bd5ee]"
      >
        Andrea King
      </Link>
    </div>
  );
}
