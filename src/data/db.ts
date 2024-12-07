import type {
  Auto,
  EndGame,
  PreMatch,
  ScoutingPhase,
  TeamReview,
  Teleop,
} from "@/data/match";
import { effect } from "@maverick-js/signals";
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
  if (phase === "postMatch") {
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
