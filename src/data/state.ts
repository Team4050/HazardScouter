import { type PreMatch, preMatchDefaults } from "@/data/games/shared";
import { create } from "zustand";

type AccentColor = "blue" | "red" | "green";

interface AppState {
  currentMatch: PreMatch;
  setCurrentMatch: (match: PreMatch) => void;
  clearCurrentMatch: () => void;

  formPage?: string;
  setFormPageName: (name: string) => void;
  clearFormPageName: () => void;

  currentPageValid: boolean;
  setCurrentPageValid: (valid: boolean) => void;

  currentPageSaved: boolean;
  setCurrentPageSaved: (saved: boolean) => void;
}

export const useAppState = create<AppState>()((set) => ({
  currentMatch: preMatchDefaults,
  setCurrentMatch: (match: PreMatch) => set({ currentMatch: match }),
  clearCurrentMatch: () => set({ currentMatch: preMatchDefaults }),

  formPage: undefined,
  setFormPageName: (name: string) => set({ formPage: name }),
  clearFormPageName: () => set({ formPage: undefined }),

  currentPageValid: false,
  setCurrentPageValid: (valid: boolean) => set({ currentPageValid: valid }),

  currentPageSaved: false,
  setCurrentPageSaved: (saved: boolean) => set({ currentPageSaved: saved }),
}));
