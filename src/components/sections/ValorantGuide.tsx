"use client";

import { useState } from "react";
import { VALORANT_STEPS } from "@/lib/valorant-steps";

export function ValorantGuide() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const step = VALORANT_STEPS[currentStep];
  const total = VALORANT_STEPS.length;
  const progress = completed ? 100 : ((currentStep + 1) / total) * 100;

  function handleNext() {
    if (currentStep < total - 1) {
      setCurrentStep((s) => s + 1);
      return;
    }
    setCompleted(true);
  }

  function handlePrevious() {
    if (completed) {
      setCompleted(false);
      return;
    }
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }

  function handleRestart() {
    setStarted(false);
    setCurrentStep(0);
    setCompleted(false);
  }

  if (!started) {
    return (
      <div className="rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-950/40 to-[var(--card)] p-6 text-center neon-border sm:p-10">
        <p className="text-5xl sm:text-6xl">🎯</p>
        <h2 className="mt-6 font-[family-name:var(--font-orbitron)] text-2xl font-black uppercase text-white sm:text-3xl">
          Valorant
        </h2>
        <p className="mx-auto mt-4 max-w-md text-slate-400">
          Guide step by step pour lancer ta session — 3 étapes pour être prêt à jouer.
        </p>
        <button
          type="button"
          onClick={() => setStarted(true)}
          className="mt-8 rounded-2xl bg-[#ff4655] px-10 py-4 font-[family-name:var(--font-orbitron)] text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-red-500/30 transition hover:bg-[#ff5566] hover:scale-105"
        >
          Lancer le guide
        </button>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 to-[var(--card)] p-10 text-center neon-border">
        <p className="text-6xl">✅</p>
        <h2 className="mt-6 font-[family-name:var(--font-orbitron)] text-2xl font-black text-white">
          Session terminée !
        </h2>
        <p className="mx-auto mt-4 max-w-md text-slate-400">
          Tu as complété les 3 étapes. Tu es prêt à détruire sur Valorant, Andrea le King.
        </p>
        <button
          type="button"
          onClick={handleRestart}
          className="mt-8 rounded-2xl border border-red-500/50 bg-red-500/10 px-8 py-3 font-bold text-red-300 transition hover:bg-red-500/20"
        >
          Recommencer le guide
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-[#ff4655] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-center text-sm font-bold uppercase tracking-widest text-red-400">
        Étape {step.id} / {total}
      </p>

      <div className="rounded-3xl border border-red-500/30 bg-[var(--card)] p-6 neon-border sm:p-10">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff4655] font-[family-name:var(--font-orbitron)] text-2xl font-black text-white">
          {step.id}
        </div>
        <h3 className="font-[family-name:var(--font-orbitron)] text-2xl font-black text-white sm:text-3xl">
          {step.title}
        </h3>
        <p className="mt-3 text-lg font-semibold text-red-300">{step.description}</p>
        <p className="mt-4 text-slate-400">{step.detail}</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-between">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="w-full rounded-xl border border-slate-600 px-6 py-3 font-bold text-slate-300 transition hover:border-slate-400 disabled:opacity-30 sm:w-auto"
        >
          ← Précédent
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="w-full rounded-xl bg-[#ff4655] px-8 py-3 font-[family-name:var(--font-orbitron)] text-sm font-bold text-white transition hover:bg-[#ff5566] sm:w-auto"
        >
          {currentStep === total - 1 ? "Terminer ✓" : "Étape suivante →"}
        </button>
      </div>

      <div className="flex justify-center gap-2">
        {VALORANT_STEPS.map((s, i) => (
          <div
            key={s.id}
            className={`h-2 w-10 rounded-full transition ${
              i < currentStep
                ? "bg-emerald-500"
                : i === currentStep
                  ? "bg-[#ff4655]"
                  : "bg-slate-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
