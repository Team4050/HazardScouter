import {
  createCollection,
  localStorageCollectionOptions,
  useLiveQuery,
} from "@tanstack/react-db";
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
  const ids = matchCollection.toArray.map((m) => m.id);
  for (const id of ids) {
    matchCollection.delete(id);
  }
}

export function setScoutingPhaseData(
  id: string,
  phase: ScoutingPhase,
  data: PhaseDataMap[typeof phase],
) {
  if (!matchCollection.get(id)) return;

  const isLastPhase = phase === phaseOrder[phaseOrder.length - 1];

  matchCollection.update(id, (draft) => {
    draft.phases = {
      ...draft.phases,
      [phase]: data,
    };
    if (isLastPhase) {
      draft.finished = new Date();
    }
  });
}

export function useMatch(id: string) {
  // TODO: Inefficient - TanStack DB lacks single-item reactive queries
  const { data } = useLiveQuery(() => matchCollection);
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

  const blob = new Blob([JSON.stringify(matches, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download =
    `matches_${firstDay}-${lastDay}_${Date.now()}.json`.toLowerCase();
  a.click();
  URL.revokeObjectURL(url);

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
