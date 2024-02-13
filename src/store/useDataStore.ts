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
  { data: AutoDataType } & { setData: (data: AutoDataType) => void }
>()((set) => ({
  data: autoDataDefaults,
  setData: (data) => set((state) => ({ ...state, data })),
}));

export const useTeleopStore = create<
  { data: TeleopDataType } & { setData: (data: TeleopDataType) => void }
>()((set) => ({
  data: teleopDataDefaults,
  setData: (data) => set((state) => ({ ...state, data })),
}));

export const useEndGameStore = create<
  { data: EndGameDataType } & { setData: (data: EndGameDataType) => void }
>()((set) => ({
  data: endGameDataDefaults,
  setData: (data) => set((state) => ({ ...state, data })),
}));

export const usePostMatchStore = create<
  { data: PostMatchDataType } & { setData: (data: PostMatchDataType) => void }
>()((set) => ({
  data: postMatchDataDefaults,
  setData: (data) => set((state) => ({ ...state, data })),
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
