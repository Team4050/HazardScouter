import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useDataStore = create<AppData>()(
  persist(
    (set, _get) => ({
      scouter: 0,
      match: {},
      appAlliance: undefined,

      setScouter: (scouter: Scouter) => set({ scouter }),
      setAppAlliance: (alliance: Alliance) => set({ appAlliance: alliance }),
      setPreMatchData: (data: PreMatchData) =>
        set({ match: { preMatch: data } }),
    }),
    {
      name: "app-data",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);

type Scouter = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface AppData {
  match: MatchData;
  scouter: Scouter;
  appAlliance: Alliance | undefined;

  setAppAlliance: (alliance: Alliance) => void;
  setScouter: (scouter: Scouter) => void;
  setPreMatchData: (data: PreMatchData) => void;
}

interface MatchData {
  preMatch?: PreMatchData;
  auto?: AutoData;
  teleop?: TeleopData;
  endGame?: EndGameData;
  postMatch?: PostMatchData;
}

export enum MatchType {
  Practice = "practice",
  Quals = "quals",
  Semi = "semi",
  Finals = "finals",
}

export enum Alliance {
  Red = "red",
  Blue = "blue",
}

export interface PreMatchData {
  scouter: string;
  matchNumber: number;
  teamNumber: number;
  matchType: MatchType;
  alliance: Alliance;
  drivePosition: 1 | 2 | 3;
}

export interface AutoData {
  leaveStartingZone: boolean;
  ampScores: number;
  speakerScores: number;
}

export interface TeleopData {
  ampScores: number;
  speakerScores: number;
  timesAmplified: number;
  pickupType: "source" | "floor" | "both" | "none";
}

export interface EndGameData {
  stageSeconds: number;
  endStatus:
    | "parked"
    | "onstage"
    | "onstage (spotlit)"
    | "harmony"
    | "failed attempt"
    | "not attempted";
  trap: boolean;
}

export interface PostMatchData {
  driverRating: number;
  defenseRating: number;
  speedRating: number;
  died: boolean;
  unstable: boolean;
  droppedNotes: boolean;
  potentialPartner: boolean;
  comments: string;
}
