import {
  createCollection,
  localStorageCollectionOptions,
  useLiveQuery,
} from "@tanstack/react-db";
import download from "downloadjs";
import {
  type Auto,
  type EndGame,
  type PreMatch,
  phaseOrder,
  type ScoutingPhase,
  type TeamReview,
  type Teleop,
} from "@/data/match";
import { shortDayName } from "@/util";

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

export const matchCollection = createCollection<Match & ID, string>(
  localStorageCollectionOptions({
    storageKey: "hs-matches",
    getKey: (item) => item.id,
  }),
);

export function resetCollections() {
  for (const match of matchCollection.toArray) {
    matchCollection.delete(match.id);
  }
}

export function setScoutingPhaseData(
  id: string,
  phase: ScoutingPhase,
  data: PhaseDataMap[typeof phase],
) {
  const existing = matchCollection.get(id);
  if (!existing) return;

  let finished: Date | undefined;
  if (phase === phaseOrder[phaseOrder.length - 1]) {
    finished = new Date();
  }

  matchCollection.update(id, (draft) => {
    draft.phases = {
      ...existing.phases,
      [phase]: data,
    };
    if (finished) {
      draft.finished = finished;
    }
  });
}

export function useMatch(id: string) {
  const { data } = useLiveQuery(() => matchCollection, [id]);
  return data?.find((m) => m.id === id);
}

export function newId(): string {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 12).padStart(12, "0")
  );
}
// biome-ignore-start lint/style/noNonNullAssertion: We're finding all cases where finished != undefined, so safe to assume non-null
export function downloadMatches(del = false) {
  const matches = matchCollection.toArray
    .filter((m) => m.finished !== undefined)
    .sort(
      (a, b) =>
        new Date(a.finished!).getTime() - new Date(b.finished!).getTime(),
    );

  if (matches.length === 0) {
    return;
  }

  const firstDay = shortDayName(matches[0].finished!);
  const lastDay = shortDayName(matches[matches.length - 1].finished!);

  download(
    JSON.stringify(matches, null, 2),
    `matches_${firstDay}-${lastDay}_${Date.now()}.json`.toLowerCase(),
    "application/json",
  );

  if (del) {
    for (const match of matches) {
      matchCollection.delete(match.id);
    }
  }
}
// biome-ignore-end lint/style/noNonNullAssertion: We're finding all cases where finished != undefined, so safe to assume non-null

export async function parseMatchesFile(file: File): Promise<Match[]> {
  const reader = new FileReader();
  reader.readAsText(file);

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      try {
        const matches = JSON.parse(reader.result as string);
        resolve(matches);
      } catch (error) {
        reject(error);
      }
    };
  });
}
