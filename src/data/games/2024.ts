import type { InferOutput } from "valibot";
import {
  boolean,
  enum_,
  maxValue,
  minValue,
  number,
  object,
  pipe,
} from "valibot";

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

export const autoSchema = object({
  leaveStartingZone: boolean(),
  ampScores: pipe(number(), minValue(0), maxValue(99)),
  speakerScores: pipe(number(), minValue(0), maxValue(99)),
});
export type Auto = InferOutput<typeof autoSchema>;
export const autoDefaults: Auto = {
  leaveStartingZone: false,
  ampScores: 0,
  speakerScores: 0,
};

export const teleopSchema = object({
  ampScores: pipe(number(), minValue(0), maxValue(99)),
  speakerScores: pipe(number(), minValue(0), maxValue(99)),
  timesAmplified: pipe(number(), minValue(0), maxValue(99)),
  pickupType: enum_(PickupType),
});
export type Teleop = InferOutput<typeof teleopSchema>;
export const teleopDefaults: Teleop = {
  ampScores: 0,
  speakerScores: 0,
  timesAmplified: 0,
  pickupType: PickupType.None,
};

export const endGameSchema = object({
  // stageSeconds: number([minValue(0), maxValue(99)]), // TODO: Need better values here
  endStatus: enum_(EndStatus),
  trap: boolean(),
});
export type EndGame = InferOutput<typeof endGameSchema>;
export const endGameDefaults: EndGame = {
  // stageSeconds: 0,
  endStatus: EndStatus.NotAttempted,
  trap: false,
};
