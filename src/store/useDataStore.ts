import { create } from "zustand";

import { config } from "../../config";
import {
  AutoData,
  EndGameData,
  PostMatchDataType,
  PreMatchData,
  TeleopData,
  autoDataDefaults,
  endGameDataDefaults,
  postMatchDataDefaults,
  preMatchDataDefaults,
  teleopDataDefaults,
} from "./schema";

export const usePreMatchStore = create<
  { data: PreMatchData } & { setData: (data: PreMatchData) => void }
>()((set) => ({
  data: preMatchDataDefaults,
  setData: (data) => set((state) => ({ ...state, data })),
}));

export const useAutoStore = create<
  { data: AutoData } & { setData: (data: AutoData) => void }
>()((set) => ({
  data: autoDataDefaults,
  setData: (data) => set((state) => ({ ...state, data })),
}));

export const useTeleopStore = create<
  { data: TeleopData } & { setData: (data: TeleopData) => void }
>()((set) => ({
  data: teleopDataDefaults,
  setData: (data) => set((state) => ({ ...state, data })),
}));

export const useEndGameStore = create<
  { data: EndGameData } & { setData: (data: EndGameData) => void }
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
