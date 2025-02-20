import type { ScoutingPhase } from "@/data/match";
import { create } from "zustand";

interface AppState {
  matchPhase?: ScoutingPhase;
  setMatchPhase: (phase?: ScoutingPhase) => void;

  validPhases: Phases;
  isPhaseValid: (phase: ScoutingPhase) => boolean;
  setPhaseValid: (phase: ScoutingPhase, valid: boolean) => void;

  savingPhases: Phases;
  isPhaseSaving: (phase: ScoutingPhase) => boolean;
  setPhaseSaving: (phases: ScoutingPhase, saving: boolean) => void;
}

type Phases = {
  [phase in ScoutingPhase]: boolean;
};

export const useAppState = create<AppState>()((set, get) => ({
  matchPhase: undefined,
  validPhases: {
    preMatch: false,
    auto: false,
    teleop: false,
    endgame: false,
    postMatch: false,
  },
  savingPhases: {
    preMatch: false,
    auto: false,
    teleop: false,
    endgame: false,
    postMatch: false,
  },
  setMatchPhase: (matchPhase?: ScoutingPhase) => set({ matchPhase }),
  setPhaseValid: (phase, valid) =>
    set((state) => ({
      validPhases: { ...state.validPhases, [phase]: valid },
    })),
  setPhaseSaving: (phase, saving) =>
    set((state) => ({
      savingPhases: { ...state.savingPhases, [phase]: saving },
    })),
  isPhaseValid: (phase) => {
    return get().validPhases[phase];
  },
  isPhaseSaving: (phase) => {
    return get().savingPhases[phase];
  },
}));
