import type { StoreApi, UseBoundStore } from "zustand";
import { create } from "zustand";

import {
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

type StoreStructure<T> = {
  data: T;
  setData: (data: T) => void;
  reset: () => void;
};

function createStore<T>(
  defaults: T,
): UseBoundStore<StoreApi<StoreStructure<T>>> {
  const store = create<StoreStructure<T>>((set) => ({
    data: defaults,
    setData: (data) => set((state) => ({ ...state, data })),
    reset: () => set({ data: defaults }),
  }));
  storeResetFns.add(() => store.getState().reset());
  return store;
}

export const usePreMatchStore = createStore(preMatchDataDefaults);
export const useAutoStore = createStore(autoDataDefaults);
export const useTeleopStore = createStore(teleopDataDefaults);
export const useEndGameStore = createStore(endGameDataDefaults);
export const usePostMatchStore = createStore(postMatchDataDefaults);
