import { create } from "zustand";

import {
  AutoData,
  EndGameData,
  PostMatchData,
  PreMatchData,
  TeleopData,
  autoDataDefaults,
  endGameDataDefaults,
  postMatchDataDefaults,
  preMatchDataDefaults,
  teleopDataDefaults,
} from "./schema";

const storeResetFns = new Set<() => void>();

export function resetStores() {
  for (const resetFn of storeResetFns) {
    resetFn();
  }
}

export const usePreMatchStore = create<
  { data: PreMatchData } & {
    setData: (data: PreMatchData) => void;
    reset: () => void;
  }
>()((set) => ({
  data: preMatchDataDefaults,
  setData: (data) => set((state) => ({ ...state, data })),
  reset: () => set({ data: preMatchDataDefaults }),
}));
storeResetFns.add(() => usePreMatchStore.getState().reset());

export const useAutoStore = create<
  { data: AutoData } & { setData: (data: AutoData) => void; reset: () => void }
>()((set) => ({
  data: autoDataDefaults,
  setData: (data) => set((state) => ({ ...state, data })),
  reset: () => set({ data: autoDataDefaults }),
}));
storeResetFns.add(() => useAutoStore.getState().reset());

export const useTeleopStore = create<
  { data: TeleopData } & {
    setData: (data: TeleopData) => void;
    reset: () => void;
  }
>()((set) => ({
  data: teleopDataDefaults,
  setData: (data) => set((state) => ({ ...state, data })),
  reset: () => set({ data: teleopDataDefaults }),
}));
storeResetFns.add(() => useTeleopStore.getState().reset());

export const useEndGameStore = create<
  { data: EndGameData } & {
    setData: (data: EndGameData) => void;
    reset: () => void;
  }
>()((set) => ({
  data: endGameDataDefaults,
  setData: (data) => set((state) => ({ ...state, data })),
  reset: () => set({ data: endGameDataDefaults }),
}));
storeResetFns.add(() => useEndGameStore.getState().reset());

export const usePostMatchStore = create<
  { data: PostMatchData } & {
    setData: (data: PostMatchData) => void;
    reset: () => void;
  }
>()((set) => ({
  data: postMatchDataDefaults,
  setData: (data) => set((state) => ({ ...state, data })),
  reset: () => set({ data: postMatchDataDefaults }),
}));
storeResetFns.add(() => usePostMatchStore.getState().reset());

// export const useMetaStore = create<
//   {
//     currentPage: number;
//     scanOnly: boolean;
//   } & {
//     setPage: (page: number) => void;
//   }
// >()((set) => ({
//   currentPage: 0,
//   scanOnly: config.scanOnly,

//   setPage: (page) => set((state) => ({ ...state, currentPage: page })),
// }));
