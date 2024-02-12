import { z } from "zod";

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

export const preMatchDataSchema = z.object({
  scouter: z.string().length(2),
  matchNumber: z.coerce.number().min(1).max(999),
  teamNumber: z.coerce.number().min(1),
  matchType: z.nativeEnum(MatchType),
  alliance: z.nativeEnum(Alliance),
  drivePosition: z.coerce.number().min(1).max(3),
});
export type PreMatchDataType = z.infer<typeof preMatchDataSchema>;
export const preMatchDataDefaults: PreMatchDataType = {
  scouter: "",
  matchNumber: 0,
  teamNumber: 0,
  matchType: MatchType.Practice,
  alliance: Alliance.Red,
  drivePosition: 1,
};

export const autoDataSchema = z.object({
  leaveStartingZone: z.boolean(),
  ampScores: z.coerce.number(),
  speakerScores: z.coerce.number(),
});
export type AutoDataType = z.infer<typeof autoDataSchema>;
export const autoDataDefaults: AutoDataType = {
  leaveStartingZone: false,
  ampScores: 0,
  speakerScores: 0,
};

export const teleopDataSchema = z.object({
  ampScores: z.coerce.number(),
  speakerScores: z.coerce.number(),
  timesAmplified: z.coerce.number(),
  pickupType: z.nativeEnum(PickupType),
});
export type TeleopDataType = z.infer<typeof teleopDataSchema>;
export const teleopDataDefaults: TeleopDataType = {
  ampScores: 0,
  speakerScores: 0,
  timesAmplified: 0,
  pickupType: PickupType.None,
};

export const endGameDataSchema = z.object({
  stageSeconds: z.coerce.number(),
  endStatus: z.nativeEnum(EndStatus),
  trap: z.boolean(),
});
export type EndGameDataType = z.infer<typeof endGameDataSchema>;
export const endGameDataDefaults: EndGameDataType = {
  stageSeconds: 0,
  endStatus: EndStatus.NotAttempted,
  trap: false,
};

export const postMatchDataSchema = z.object({
  driverRating: z.coerce.number(),
  defenseRating: z.coerce.number(),
  speedRating: z.coerce.number(),
  died: z.boolean(),
  unstable: z.boolean(),
  droppedNotes: z.boolean(),
  potentialPartner: z.boolean(),
  comments: z.string(),
});
export type PostMatchDataType = z.infer<typeof postMatchDataSchema>;
export const postMatchDataDefaults: PostMatchDataType = {
  driverRating: 0,
  defenseRating: 0,
  speedRating: 0,
  died: false,
  unstable: false,
  droppedNotes: false,
  potentialPartner: false,
  comments: "",
};
