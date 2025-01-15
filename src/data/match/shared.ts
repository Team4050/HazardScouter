import {
  type InferOutput,
  boolean,
  enum_,
  maxLength,
  maxValue,
  minValue,
  number,
  object,
  pipe,
  string,
} from "valibot";

export const saneScoreSchema = pipe(number(), minValue(0), maxValue(99));

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

export const preMatchSchema = object({
  matchType: enum_(MatchType),
  alliance: enum_(Alliance),
  drivePosition: enum_(DrivePosition),
});
export type PreMatch = InferOutput<typeof preMatchSchema>;
export const preMatchDefaults: PreMatch = {
  matchType: MatchType.Practice,
  alliance: Alliance.Red,
  drivePosition: DrivePosition.Near,
};

export const teamReviewSchema = object({
  driverRating: pipe(number(), minValue(0), maxValue(10)),
  defenseRating: pipe(number(), minValue(0), maxValue(10)),
  speedRating: pipe(number(), minValue(0), maxValue(10)),
  malfunctioned: boolean(),
  unstable: boolean(),
  droppedGamePieces: boolean(),
  potentialPartner: boolean(),
  comments: pipe(string(), maxLength(10)),
});
export type TeamReview = InferOutput<typeof teamReviewSchema>;
export const teamReviewDefaults: TeamReview = {
  driverRating: 5,
  defenseRating: 5,
  speedRating: 5,
  malfunctioned: false,
  unstable: false,
  droppedGamePieces: false,
  potentialPartner: false,
  comments: "",
};
