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

export const preMatchSchema = object({
  scouter: pipe(
    string(),
    minLength(1, "Scouter name must be greater than 1 character"),
    maxLength(50, "Scouter name must be less than 50 characters"),
  ),
  matchNumber: pipe(number(), minValue(1), maxValue(999)),
  teamNumber: string(),
  matchType: enum_(MatchType),
  alliance: enum_(Alliance),
  drivePosition: enum_(DrivePosition),
});
export type PreMatch = InferOutput<typeof preMatchSchema>;
export const preMatchDefaults: PreMatch = {
  scouter: "",
  matchNumber: 0,
  teamNumber: "",
  matchType: MatchType.Practice,
  alliance: Alliance.Red,
  drivePosition: DrivePosition.Near,
};

export const postMatchSchema = object({
  driverRating: pipe(number(), minValue(0), maxValue(10)),
  defenseRating: pipe(number(), minValue(0), maxValue(10)),
  speedRating: pipe(number(), minValue(0), maxValue(10)),
  died: boolean(),
  unstable: boolean(),
  droppedNotes: boolean(),
  potentialPartner: boolean(),
  comments: string(),
});
export type PostMatch = InferOutput<typeof postMatchSchema>;
export const postMatchDefaults: PostMatch = {
  driverRating: 5,
  defenseRating: 5,
  speedRating: 5,
  died: false,
  unstable: false,
  droppedNotes: false,
  potentialPartner: false,
  comments: "",
};
