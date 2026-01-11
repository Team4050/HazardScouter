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
import { saneScoreSchema } from "@/data/match/shared";

export enum PickupType {
  CoralStation = "coral-station",
  Floor = "floor",
  Both = "both",
  None = "none",
}

export enum Strategy {
  Defense = "defense",
  Offense = "offense",
  Both = "both",
}

export enum EndStatus {
  Parked = "parked",
  ParkedFailedClimb = "parked-failed-climb",
  ShallowCage = "shallow-cage",
  DeepCage = "deep-cage",
  NotAttempted = "not-attempted",
}

const coralSchema = pipe(number(), minValue(0), maxValue(12));

const reefSchema = object({
  coralLevel1: coralSchema,
  coralLevel2: coralSchema,
  coralLevel3: coralSchema,
  coralLevel4: coralSchema,
});

export const autoSchema = object({
  leaveStartingLine: boolean(),
  reef: reefSchema,
  processor: saneScoreSchema,
  net: saneScoreSchema,
  coralPreloaded: boolean(),
  removedAlgae: boolean(),
});
export type Auto = InferOutput<typeof autoSchema>;
export const autoDefaults: Auto = {
  leaveStartingLine: false,
  reef: {
    coralLevel1: 0,
    coralLevel2: 0,
    coralLevel3: 0,
    coralLevel4: 0,
  },
  processor: 0,
  net: 0,
  coralPreloaded: false,
  removedAlgae: false,
};

export const teleopSchema = object({
  reef: reefSchema,
  processor: saneScoreSchema,
  net: saneScoreSchema,
  pickupType: enum_(PickupType),
  strategy: enum_(Strategy),
  removedAlgae: boolean(),
});
export type Teleop = InferOutput<typeof teleopSchema>;
export const teleopDefaults: Teleop = {
  reef: {
    coralLevel1: 0,
    coralLevel2: 0,
    coralLevel3: 0,
    coralLevel4: 0,
  },
  processor: 0,
  net: 0,
  pickupType: PickupType.None,
  strategy: Strategy.Both,
  removedAlgae: false,
};

export const endGameSchema = object({
  // stageSeconds: number([minValue(0), maxValue(99)]), // TODO: Need better values here
  endStatus: enum_(EndStatus),
});
export type EndGame = InferOutput<typeof endGameSchema>;
export const endGameDefaults: EndGame = {
  // stageSeconds: 0,
  endStatus: EndStatus.NotAttempted,
};
