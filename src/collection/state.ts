import { type MatchData, matchDataDefaults } from "@/collection/schema";
import { atom } from "recoil";

export const collectionState = atom<MatchData>({
  key: "collectionState",
  default: matchDataDefaults,
});
