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
    const t2 = setTimeout(() => setFadeOut(true), 16000);
    const t3 = setTimeout(() => router.push("/accueil"), 17500);
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
        <div className="starwars-fade-text absolute inset-0 flex flex-col items-center justify-center px-4 text-center sm:px-6">
          <p className="starwars-prelude mb-6 font-medium text-[#4bd5ee] sm:mb-10">
            Il y a bien longtemps, dans une galaxie lointaine...
          </p>
          <h1 className="starwars-logo font-[family-name:var(--font-orbitron)] font-black uppercase leading-none text-[#ffe81f]">
            Andrea
          </h1>
        </div>
      )}

      {showCrawl && (
        <div className="starwars-crawl-perspective absolute inset-0 flex justify-center overflow-hidden px-3 sm:px-6">
          <div className="starwars-crawl-content">
            <h2 className="starwars-crawl-title mb-8 text-center font-black uppercase tracking-widest text-[#ffe81f] sm:mb-12">
              Andrea
            </h2>
            <p className="starwars-crawl-text text-justify font-bold leading-relaxed text-[#ffe81f]">
              Venu des confins de l&apos;espace, Andrea entame un voyage légendaire à
              travers le cosmos intersidéral.
            </p>
            <p className="starwars-crawl-text mt-6 text-justify font-bold leading-relaxed text-[#ffe81f] sm:mt-10">
              Sa quête le mène vers son père, retranché au zinc, et vers son frère
              Lucas, perdu quelque part dans l&apos;immensité stellaire.
            </p>
            <p className="starwars-crawl-text mt-6 text-justify font-bold leading-relaxed text-[#ffe81f] sm:mt-10">
              Guidé par la force des jeux en ligne, le jeune Andrea le King s&apos;apprête
              à écrire sa propre saga...
            </p>
          </div>
        </div>
      )}

      <div className="starwars-controls absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 px-4 pb-6 sm:px-8 sm:pb-8">
        <Link
          href="/accueil"
          className="text-xs font-bold uppercase tracking-wider text-[#4bd5ee]/60 transition hover:text-[#4bd5ee] sm:text-sm"
        >
          Andrea King
        </Link>
        <button
          type="button"
          onClick={handleSkip}
          className="rounded-lg border border-[#ffe81f]/40 px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#ffe81f]/70 transition hover:border-[#ffe81f] hover:text-[#ffe81f] sm:px-4 sm:text-sm"
        >
          Passer →
        </button>
      </div>
    </div>
  );
}
