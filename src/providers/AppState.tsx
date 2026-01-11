import type React from "react";
import { createContext, useState } from "react";
import type { ScoutingPhase } from "@/data/match";

type Phases = {
  [phase in ScoutingPhase]: boolean;
};

interface AppState {
  validPhases: Phases;
  isPhaseValid: (phase: ScoutingPhase) => boolean;
  setPhaseValid: (phase: ScoutingPhase, valid: boolean) => void;
  savingPhases: Phases;
  isPhaseSaving: (phase: ScoutingPhase) => boolean;
  setPhaseSaving: (phases: ScoutingPhase, saving: boolean) => void;
}

export const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [validPhases, setValidPhases] = useState<Phases>({
    preMatch: false,
    auto: false,
    teleop: false,
    endgame: false,
    postMatch: false,
  });
  const [savingPhases, setSavingPhases] = useState<Phases>({
    preMatch: false,
    auto: false,
    teleop: false,
    endgame: false,
    postMatch: false,
  });

  const setPhaseValid = (phase: ScoutingPhase, valid: boolean) => {
    setValidPhases((prev) => ({ ...prev, [phase]: valid }));
  };

  const setPhaseSaving = (phase: ScoutingPhase, saving: boolean) => {
    setSavingPhases((prev) => ({ ...prev, [phase]: saving }));
  };

  const isPhaseValid = (phase: ScoutingPhase) => validPhases[phase];
  const isPhaseSaving = (phase: ScoutingPhase) => savingPhases[phase];

  return (
    <AppContext.Provider
      value={{
        validPhases,
        isPhaseValid,
        setPhaseValid,
        savingPhases,
        isPhaseSaving,
        setPhaseSaving,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
