import { create } from "zustand";

type AccentColor = "blue" | "red" | "green";

interface AppState {
  collectionId?: string;
  setCollectionId: (id: string) => void;

  pageName?: string;
  setPageName: (name?: string) => void;

  currentFormValid: boolean;
  setCurrentFormValid: (valid: boolean) => void;

  currentPageSaved: boolean;
  setCurrentPageSaved: (saved: boolean) => void;
}

export const useAppState = create<AppState>()((set) => ({
  collectionId: undefined,
  setCollectionId: (collectionId?: string) => set({ collectionId }),

  pageName: undefined,
  setPageName: (pageName?: string) => set({ pageName }),

  currentFormValid: false,
  setCurrentFormValid: (valid: boolean) => set({ currentFormValid: valid }),

  currentPageSaved: false,
  setCurrentPageSaved: (saved: boolean) => set({ currentPageSaved: saved }),
}));
