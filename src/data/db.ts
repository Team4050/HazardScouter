import type {
  Auto as Auto2024,
  EndGame as EndGame2024,
  Teleop as Teleop2024,
} from "@/data/games/2024";
import type { MatchData, PostMatch } from "@/data/games/shared";
import { effect } from "@maverick-js/signals";
import { Collection, createLocalStorageAdapter } from "signaldb";
import maverickReactivityAdapter from "signaldb-plugin-maverickjs";
import { createUseReactivityHook } from "signaldb-react";

type Auto = Auto2024;
type Teleop = Teleop2024;
type EndGame = EndGame2024;

type ID = { id: string };

enum MatchPhase {
  PreMatch = "preMatch",
  Auto = "auto",
  Teleop = "teleop",
  Endgame = "endgame",
  PostMatch = "postMatch",
}

// Data storage gist:
// - Use SignalDB for match data, synced to localstorage
//   - Create new collection for all types of data being collected (pre match, auto, teleop, endgame, post match)
//   - id field is a combination of match number and team number
// - Use Zustand for application state, synced to localstorage
//   - At a minimum, could contain the current id of the match being scouter
// - The universal id field can be used to query for all data for a given match

export const matchDataCollection = new Collection<MatchData & ID>({
  persistence: createLocalStorageAdapter(named(MatchPhase.PreMatch)),
  reactivity: maverickReactivityAdapter,
});

export const autoCollection = new Collection<Auto & ID>({
  persistence: createLocalStorageAdapter(named(MatchPhase.Auto)),
  reactivity: maverickReactivityAdapter,
});

export const teleopCollection = new Collection<Teleop & ID>({
  persistence: createLocalStorageAdapter(named(MatchPhase.Teleop)),
  reactivity: maverickReactivityAdapter,
});

export const endgameCollection = new Collection<EndGame & ID>({
  persistence: createLocalStorageAdapter(named(MatchPhase.Endgame)),
  reactivity: maverickReactivityAdapter,
});

export const postMatchCollection = new Collection<PostMatch & ID>({
  persistence: createLocalStorageAdapter(named(MatchPhase.PostMatch)),
  reactivity: maverickReactivityAdapter,
});

const collections = [
  matchDataCollection,
  autoCollection,
  teleopCollection,
  endgameCollection,
  postMatchCollection,
];

function named(phase: string): string {
  return `scouter-${phase}`;
}

export function idFromMatchData(matchData: MatchData): string {
  return `${matchData.matchNumber}-${matchData.teamNumber}`;
}

export function resetCollections() {
  for (const collection of collections) {
    collection.removeMany({});
  }
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
