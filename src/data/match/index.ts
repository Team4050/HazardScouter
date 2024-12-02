import type { Icon } from "@/util";
import {
  IconDeviceGamepad2,
  IconListCheck,
  IconRoute2,
  IconStopwatch,
} from "@tabler/icons-react";

export type ScoutingPhase =
  | "preMatch"
  | "auto"
  | "teleop"
  | "endgame"
  | "postMatch";

export function scoutingPhaseName(phase?: ScoutingPhase): string | undefined {
  switch (phase) {
    case "preMatch":
      return "Pre-Match";
    case "auto":
      return "Auto";
    case "teleop":
      return "Teleop";
    case "endgame":
      return "Endgame";
    case "postMatch":
      return "Post Match";
  }
}

export const phaseOrder: ScoutingPhase[] = [
  "preMatch",
  "auto",
  "teleop",
  "endgame",
  "postMatch",
];

type PhaseDetail = {
  icon: Icon;
  title: string;
  slug: string;
  description?: string;
};

export const phaseDetails: { [key in ScoutingPhase]: PhaseDetail } = {
  preMatch: {
    title: "Pre-Match",
    slug: "pre-match",
    icon: IconListCheck,
  },
  auto: {
    title: "Auto",
    slug: "auto",
    icon: IconRoute2,
  },
  teleop: {
    title: "Teleop",
    slug: "teleop",
    icon: IconDeviceGamepad2,
  },
  endgame: {
    title: "Endgame",
    slug: "endgame",
    icon: IconStopwatch,
  },
  postMatch: {
    title: "Post-Match",
    slug: "post-match",
    icon: IconListCheck,
  },
};

// Pretty sure this is generally considered bad practice,
// but allows us to swap out years easily
export * from "@/data/match/2024";
export * from "@/data/match/shared";
