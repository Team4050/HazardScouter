import {
  type InferOutput,
  boolean,
  enum_,
  maxLength,
  maxValue,
  minLength,
  minValue,
  number,
  object,
  pipe,
  string,
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

export const matchDataSchema = object({
  scouter: pipe(
    string(),
    minLength(1, "Name too short"),
    maxLength(50, "Name too long"),
  ),
  matchNumber: pipe(
    number(),
    minValue(1, "Match number too low"),
    maxValue(999, "Match number too high"),
  ),
  teamNumber: pipe(
    string(),
    minLength(1, "Team number too short"),
    maxLength(5, "Team number too long"),
  ),
  matchType: enum_(MatchType),
  alliance: enum_(Alliance),
  drivePosition: enum_(DrivePosition),
});
export type MatchData = InferOutput<typeof matchDataSchema>;
export const matchDataDefaults: MatchData = {
  scouter: "",
  matchNumber: 0,
  teamNumber: "",
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
  comments: string(),
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
