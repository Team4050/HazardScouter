import {
  type Auto,
  type EndGame,
  type PreMatch,
  type ScoutingPhase,
  type TeamReview,
  type Teleop,
  phaseOrder,
} from "@/data/match";
import { shortDayName } from "@/util";
import { effect } from "@maverick-js/signals";
import download from "downloadjs";
import { Collection, createLocalStorageAdapter } from "signaldb";
import maverickReactivityAdapter from "signaldb-plugin-maverickjs";
import { createUseReactivityHook } from "signaldb-react";

type ID = { id: string };

export type PhaseDataMap = {
  preMatch: PreMatch;
  auto: Auto;
  teleop: Teleop;
  endgame: EndGame;
  postMatch: TeamReview;
};

export type Match = {
  scouter: string;
  matchNumber: number;
  teamNumber: number;
  started: Date;
  finished?: Date;
  phases: {
    [K in ScoutingPhase]?: PhaseDataMap[K];
  };
};

export const matchCollection = new Collection<Match & ID>({
  persistence: createLocalStorageAdapter("hs-matches"),
  reactivity: maverickReactivityAdapter,
});

const collections = [matchCollection];

export function resetCollections() {
  for (const collection of collections) {
    collection.removeMany({});
  }
}

export function setScoutingPhaseData(
  id: string,
  phase: ScoutingPhase,
  data: PhaseDataMap[typeof phase],
) {
  const phases = matchCollection.findOne({ id })?.phases || undefined;

  let finished = undefined;
  if (phase === phaseOrder[phaseOrder.length - 1]) {
    finished = new Date();
  }

  matchCollection.updateOne(
    { id },
    {
      $set: {
        phases: {
          ...phases,
          [phase]: data,
        },
        finished,
      },
    },
  );
}

export const useReactivity = createUseReactivityHook(effect);
export const useMatch = (id: string) =>
  useReactivity(() => matchCollection.findOne({ id }), [id]);

export function newId(): string {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 12).padStart(12, "0")
  );
}

export function downloadMatches() {
  const matches = matchCollection
    .find({ finished: { $ne: undefined } })
    .fetch()
    .sort(
      (a, b) =>
        new Date(a.finished!).getTime() - new Date(b.finished!).getTime(),
    );

  const firstDay = shortDayName(matches[0].finished!);
  const lastDay = shortDayName(matches[matches.length - 1].finished!);

  download(
    JSON.stringify(matches, null, 2),
    `matches_${firstDay}-${lastDay}_${Date.now()}.json`.toLowerCase(),
    "application/json",
  );
}
