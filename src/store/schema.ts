import {
  object,
  string,
  minValue,
  maxValue,
  enum_,
  number,
  Output,
  boolean,
  minLength,
  maxLength,
} from "valibot";

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

export enum DrivePosition {
  Near = "near",
  Middle = "middle",
  Far = "far",
}

export enum PickupType {
  Source = "source",
  Floor = "floor",
  Both = "both",
  None = "none",
}

export enum EndStatus {
  Parked = "parked",
  OnStage = "onstage",
  OnStageSpotlight = "onstage-spotlight",
  Harmony = "harmony",
  FailedAttempt = "failed-attempt",
  NotAttempted = "not-attempted",
}

export const preMatchDataSchema = object({
  scouter: string([minLength(1), maxLength(50)]),
  matchNumber: number([minValue(1), maxValue(999)]),
  teamNumber: number([minValue(1)]),
  matchType: enum_(MatchType),
  alliance: enum_(Alliance),
  drivePosition: enum_(DrivePosition),
});
export type PreMatchData = Output<typeof preMatchDataSchema>;
export const preMatchDataDefaults: PreMatchData = {
  scouter: "",
  matchNumber: 0,
  teamNumber: 0,
  matchType: MatchType.Practice,
  alliance: Alliance.Red,
  drivePosition: DrivePosition.Near,
};

export const autoDataSchema = object({
  leaveStartingZone: boolean(),
  ampScores: number([minValue(0), maxValue(99)]),
  speakerScores: number([minValue(0), maxValue(99)]),
});
export type AutoData = Output<typeof autoDataSchema>;
export const autoDataDefaults: AutoData = {
  leaveStartingZone: false,
  ampScores: 0,
  speakerScores: 0,
};

export const teleopDataSchema = object({
  ampScores: number([minValue(0), maxValue(99)]),
  speakerScores: number([minValue(0), maxValue(99)]),
  timesAmplified: number([minValue(0), maxValue(99)]),
  pickupType: enum_(PickupType),
});
export type TeleopData = Output<typeof teleopDataSchema>;
export const teleopDataDefaults: TeleopData = {
  ampScores: 0,
  speakerScores: 0,
  timesAmplified: 0,
  pickupType: PickupType.None,
};

export const endGameDataSchema = object({
  // stageSeconds: number([minValue(0), maxValue(99)]), // TODO: Need better values here
  endStatus: enum_(EndStatus),
  trap: boolean(),
});
export type EndGameData = Output<typeof endGameDataSchema>;
export const endGameDataDefaults: EndGameData = {
  // stageSeconds: 0,
  endStatus: EndStatus.NotAttempted,
  trap: false,
};

export const postMatchDataSchema = object({
  driverRating: number([minValue(0), maxValue(10)]),
  defenseRating: number([minValue(0), maxValue(10)]),
  speedRating: number([minValue(0), maxValue(10)]),
  died: boolean(),
  unstable: boolean(),
  droppedNotes: boolean(),
  potentialPartner: boolean(),
  comments: string(),
});
export type PostMatchData = Output<typeof postMatchDataSchema>;
export const postMatchDataDefaults: PostMatchData = {
  driverRating: 5,
  defenseRating: 5,
  speedRating: 5,
  died: false,
  unstable: false,
  droppedNotes: false,
  potentialPartner: false,
  comments: "",
};

export type MatchDataType = {
  preMatch: PreMatchData;
  auto: AutoData;
  teleop: TeleopData;
  endgame: EndGameData;
  postMatch: PostMatchData;
};
