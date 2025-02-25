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
    title: "Pre Match",
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
    title: "Post Match",
    slug: "post-match",
    icon: IconListCheck,
  },
};

export const phaseRoutes = phaseOrder.map(
  (phase) => phaseDetails[phase].slug,
) as ["pre-match", "auto", "teleop", "endgame", "post-match"];

export function phaseSlugToTitle(slug: string): string {
  return phaseDetails[
    phaseOrder.find((phase) => phaseDetails[phase].slug === slug)!
  ].title;
}

// Pretty sure this is generally considered bad practice,
// but allows us to swap out years easily
export * from "@/data/match/2025";
export * from "@/data/match/shared";
