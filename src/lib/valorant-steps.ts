export interface ValorantStep {
  id: number;
  title: string;
  description: string;
  detail: string;
}

export const VALORANT_STEPS: ValorantStep[] = [
  {
    id: 1,
    title: "Match d'entraînement",
    description: "Aller en match d'entraînement",
    detail:
      "Ouvre Valorant, va dans l'onglet Jouer et lance un match d'entraînement pour t'échauffer et calibrer ta sensibilité.",
  },
  {
    id: 2,
    title: "Quatre parties de vélocité",
    description: "Lancer quatre parties de vélocité",
    detail:
      "Enchaîne 4 parties en mode vélocité. Reste concentré sur ton crosshair et tes réflexes entre chaque manche.",
  },
  {
    id: 3,
    title: "Deathmatch",
    description: "Lancer une partie de deathmatch",
    detail:
      "Termine ta session avec une partie de deathmatch pour peaufiner ton aim et tes duels en situation réelle.",
  },
];
