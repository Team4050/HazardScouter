import type { ScoutingPhase } from "@/data/match";
import { create } from "zustand";

interface AppState {
  matchPhase?: ScoutingPhase;
  setMatchPhase: (phase?: ScoutingPhase) => void;
}

export const useAppState = create<AppState>()((set) => ({
  matchPhase: undefined,
  setMatchPhase: (matchPhase?: ScoutingPhase) => set({ matchPhase }),
}));
