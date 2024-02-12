import { create } from "zustand";

import { config } from "../../config";
import {
  AutoDataType,
  EndGameDataType,
  PostMatchDataType,
  PreMatchDataType,
  TeleopDataType,
  autoDataDefaults,
  endGameDataDefaults,
  postMatchDataDefaults,
  preMatchDataDefaults,
  teleopDataDefaults,
} from "./schema";

// const storage = createJSONStorage(() => localStorage);

export const usePreMatchStore = create<
  { data: PreMatchDataType } & { setData: (data: PreMatchDataType) => void }
>()((set) => ({
  data: preMatchDataDefaults,
  setData: (data) => set((state) => ({ ...state, data })),
}));

export const useAutoStore = create<
  AutoDataType & { setData: (data: AutoDataType) => void }
>()((set) => ({
  ...autoDataDefaults,
  setData: (data) => set((state) => ({ ...state, ...data })),
}));

export const useTeleopStore = create<
  TeleopDataType & { setData: (data: TeleopDataType) => void }
>()((set) => ({
  ...teleopDataDefaults,
  setData: (data) => set((state) => ({ ...state, ...data })),
}));

export const useEndGameStore = create<
  EndGameDataType & { setData: (data: EndGameDataType) => void }
>()((set) => ({
  ...endGameDataDefaults,
  setData: (data) => set((state) => ({ ...state, ...data })),
}));

export const usePostMatchStore = create<
  PostMatchDataType & { setData: (data: PostMatchDataType) => void }
>()((set) => ({
  ...postMatchDataDefaults,
  setData: (data) => set((state) => ({ ...state, ...data })),
}));

export const useMetaStore = create<
  {
    currentPage: number;
    scanOnly: boolean;
  } & {
    setPage: (page: number) => void;
  }
>()((set) => ({
  currentPage: 0,
  scanOnly: config.scanOnly,

  setPage: (page) => set((state) => ({ ...state, currentPage: page })),
}));
