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

export enum AutoClimb {
  None = "none",
  Attempted = "attempted",
  Successful = "successful",
}
export const autoSchema = object({
  fuelScored: saneScoreSchema,
  climb: enum_(AutoClimb),
});
export type Auto = InferOutput<typeof autoSchema>;
export const autoDefaults: Auto = {
  fuelScored: 0,
  climb: AutoClimb.None,
};

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
