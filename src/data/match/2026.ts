import {
  boolean,
  enum_,
  type InferOutput,
  maxValue,
  minValue,
  number,
  object,
  pipe,
} from "valibot";
import { saneScoreSchema } from "@/data/match/shared";

export enum PickupType {
  Outpost = "outpost",
  Floor = "floor",
  Both = "both",
  None = "none",
}

export enum Strategy {
  Defense = "defense",
  Offense = "offense",
  Both = "both",
}

// const coralSchema = pipe(number(), minValue(0), maxValue(12));

// const reefSchema = object({
//   coralLevel1: coralSchema,
//   coralLevel2: coralSchema,
//   coralLevel3: coralSchema,
//   coralLevel4: coralSchema,
// });

// export const autoSchema = object({
//   leaveStartingLine: boolean(),
//   reef: reefSchema,
//   processor: saneScoreSchema,
//   net: saneScoreSchema,
//   coralPreloaded: boolean(),
//   removedAlgae: boolean(),
// });
// export type Auto = InferOutput<typeof autoSchema>;
// export const autoDefaults: Auto = {
//   leaveStartingLine: false,
//   reef: {
//     coralLevel1: 0,
//     coralLevel2: 0,
//     coralLevel3: 0,
//     coralLevel4: 0,
//   },
//   processor: 0,
//   net: 0,
//   coralPreloaded: false,
//   removedAlgae: false,
// };

export const teleopSchema = object({
  fuelScored: saneScoreSchema,
  trench: boolean(),
  bump: boolean(),
  pickupType: enum_(PickupType),
  strategy: enum_(Strategy),
});
export type Teleop = InferOutput<typeof teleopSchema>;
export const teleopDefaults: Teleop = {
  fuelScored: 0,
  trench: false,
  bump: false,
  pickupType: PickupType.None,
  strategy: Strategy.Both,
};

export const endGameSchema = object({
  climbLevel: pipe(number(), minValue(0), maxValue(3)),
});
export type EndGame = InferOutput<typeof endGameSchema>;
export const endGameDefaults: EndGame = {
  climbLevel: 0,
};
