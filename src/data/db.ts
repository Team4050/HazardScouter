import type {
  Auto,
  EndGame,
  MatchData,
  ScoutingPhase,
  TeamReview,
  Teleop,
} from "@/data/match";
import { effect } from "@maverick-js/signals";
import { Collection, createLocalStorageAdapter } from "signaldb";
import maverickReactivityAdapter from "signaldb-plugin-maverickjs";
import { createUseReactivityHook } from "signaldb-react";

type ID = { id: string };

// Data storage gist:
// - Use SignalDB for match data, synced to localstorage
//   - Create new collection for all types of data being collected (pre match, auto, teleop, endgame, post match)
//   - id field is a combination of match number and team number
// - Use Zustand for application state, synced to localstorage
//   - At a minimum, could contain the current id of the match being scouter
// - The universal id field can be used to query for all data for a given match

export type PhaseDataMap = {
  preMatch: MatchData;
  auto: Auto;
  teleop: Teleop;
  endgame: EndGame;
  postMatch: TeamReview;
};

type Match = {
  phases: {
    [K in ScoutingPhase]?: PhaseDataMap[K];
  };
  started: Date;
  finished?: Date;
};

export const matchCollection = new Collection<Match & ID>({
  persistence: createLocalStorageAdapter("hs-matches"),
  reactivity: maverickReactivityAdapter,
});

// export const matchDataCollection = new Collection<MatchData & ID>({
//   persistence: createLocalStorageAdapter(named("preMatch")),
//   reactivity: maverickReactivityAdapter,
// });

// export const autoCollection = new Collection<Auto & ID>({
//   persistence: createLocalStorageAdapter(named("auto")),
//   reactivity: maverickReactivityAdapter,
// });

// export const teleopCollection = new Collection<Teleop & ID>({
//   persistence: createLocalStorageAdapter(named("teleop")),
//   reactivity: maverickReactivityAdapter,
// });

// export const endgameCollection = new Collection<EndGame & ID>({
//   persistence: createLocalStorageAdapter(named("endgame")),
//   reactivity: maverickReactivityAdapter,
// });

// export const postMatchCollection = new Collection<TeamReview & ID>({
//   persistence: createLocalStorageAdapter(named("teamReview")),
//   reactivity: maverickReactivityAdapter,
// });

const collections = [
  matchCollection,
  //   matchDataCollection,
  //   autoCollection,
  //   teleopCollection,
  //   endgameCollection,
  //   postMatchCollection,
];

// function named(name: ScoutingPhase): string {
//   return `hs-${name}`;
// }

export function idFromPreMatchData(preMatch: MatchData): string {
  return `${preMatch.matchNumber}-${preMatch.teamNumber}`;
}

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
        // TODO: This is temporary
        finished,
      },
    },
  );
}

// Sometimes I truely can't be bothered to deal with Typescript... hence // @ts-ignore
export function set<T extends Record<string, any>>(
  collection: Collection<T & ID>,
  id: string,
  data: T,
) {
  // @ts-ignore
  const d = collection.findOne({ id });
  if (d) {
    // @ts-ignore
    collection.updateOne({ id }, { $set: data });
  } else {
    // @ts-ignore
    collection.insert({ id, ...data });
  }
}

export const useReactivity = createUseReactivityHook(effect);

export function newId(): string {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 12).padStart(12, "0")
  );
}
