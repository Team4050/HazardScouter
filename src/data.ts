import { create } from "zustand";

export const useDataStore = create<MatchData>()((set) => ({
  preMatch: {
    scouter: "",
    matchNumber: 0,
    teamNumber: 0,
    matchType: "quals",
    alliance: "red",
    robotPosition: "1",
  },
  auto: {
    leaveStartingZone: false,
    ampScores: 0,
    speakerScores: 0,
  },
  teleop: {
    ampScores: 0,
    speakerScores: 0,
    timesAmplified: 0,
    pickupType: "none",
  },
  endGame: {
    stageSeconds: 0,
    endStatus: "not attempted",
    trap: false,
  },
  postMatch: {
    driverRating: 0,
    defenseRating: 0,
    speedRating: 0,
    died: false,
    unstable: false,
    droppedNotes: false,
    potentialPartner: false,
    comments: "",
  },

  setPreMatchData: (data: PreMatchData) => set({ preMatch: data }),
  setAutoData: (data: AutoData) => set({ auto: data }),
  setTeleopData: (data: TeleopData) => set({ teleop: data }),
  setEndGameData: (data: EndGameData) => set({ endGame: data }),
  setPostMatchData: (data: PostMatchData) => set({ postMatch: data }),
}));

interface MatchData {
  preMatch: PreMatchData;
  auto: AutoData;
  teleop: TeleopData;
  endGame: EndGameData;
  postMatch: PostMatchData;
}

interface PreMatchData {
  scouter: string;
  matchNumber: number;
  teamNumber: number;
  matchType: "quals" | "semi" | "finals";
  alliance: "red" | "blue";
  robotPosition: "1" | "2" | "3";
}

interface AutoData {
  leaveStartingZone: boolean;
  ampScores: number;
  speakerScores: number;
}

interface TeleopData {
  ampScores: number;
  speakerScores: number;
  timesAmplified: number;
  pickupType: "source" | "floor" | "both" | "none";
}

interface EndGameData {
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

interface PostMatchData {
  driverRating: number;
  defenseRating: number;
  speedRating: number;
  died: boolean;
  unstable: boolean;
  droppedNotes: boolean;
  potentialPartner: boolean;
  comments: string;
}
