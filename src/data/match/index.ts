import { Gamepad2, ListChecks, Route, Timer } from "lucide-react";
import type { Icon } from "@/util";

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
    icon: ListChecks,
  },
  auto: {
    title: "Auto",
    slug: "auto",
    icon: Route,
  },
  teleop: {
    title: "Teleop",
    slug: "teleop",
    icon: Gamepad2,
  },
  endgame: {
    title: "Endgame",
    slug: "endgame",
    icon: Timer,
  },
  postMatch: {
    title: "Post Match",
    slug: "post-match",
    icon: ListChecks,
  },
};

export const phaseRoutes = phaseOrder.map(
  (phase) => phaseDetails[phase].slug,
) as ["pre-match", "auto", "teleop", "endgame", "post-match"];

const slugToPhase = new Map(
  phaseOrder.map((phase) => [phaseDetails[phase].slug, phase]),
);

export function phaseSlugToTitle(slug: string): string {
  const phase = slugToPhase.get(slug);
  if (!phase) {
    throw new Error(`Unknown phase slug: ${slug}`);
  }
  return phaseDetails[phase].title;
}

// Pretty sure this is generally considered bad practice,
// but allows us to swap out years easily
export * from "@/data/match/2026";
export * from "@/data/match/shared";
