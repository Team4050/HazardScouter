import type { Match } from "@/data/db";
import { phaseOrder } from "@/data/match";

export type ExportFormat = "json" | "csv";

type FlatRecord = Record<string, string | number | boolean>;

function flattenMatch(match: Match): FlatRecord {
  const flat: FlatRecord = {
    // id exists at runtime on parsed JSON data but isn't on the Match type
    ...("id" in match && { id: String(match.id) }),
    scouter: match.scouter,
    matchNumber: match.matchNumber,
    teamNumber: match.teamNumber,
    started:
      match.started instanceof Date
        ? match.started.toISOString()
        : String(match.started),
    ...(match.finished && {
      finished:
        match.finished instanceof Date
          ? match.finished.toISOString()
          : String(match.finished),
    }),
  };

  for (const [phase, data] of Object.entries(match.phases)) {
    if (!data) {
      continue;
    }
    for (const [key, value] of Object.entries(data)) {
      flat[`${phase}.${key}`] = value as string | number | boolean;
    }
  }

  return flat;
}

const frontmatterFields = [
  "id",
  "scouter",
  "matchNumber",
  "teamNumber",
  "started",
  "finished",
];

const phaseIndex = new Map<string, number>(phaseOrder.map((p, i) => [p, i]));

function escapeCsvField(value: unknown): string {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function matchesToCsv(matches: Match[]): string {
  const rows = matches.map(flattenMatch);

  // Collect all keys, ordered by preferredOrder then alphabetically for unknowns
  const allKeys = new Set<string>();
  for (const row of rows) {
    for (const key of Object.keys(row)) {
      allKeys.add(key);
    }
  }

  const frontmatterSet = new Set(frontmatterFields);
  const sortedKeys = [...allKeys].sort((a, b) => {
    const aFront = frontmatterSet.has(a);
    const bFront = frontmatterSet.has(b);
    // Frontmatter fields come first, in their defined order
    if (aFront && bFront) {
      return frontmatterFields.indexOf(a) - frontmatterFields.indexOf(b);
    }
    if (aFront) {
      return -1;
    }
    if (bFront) {
      return 1;
    }
    // Phase fields: sort by phase order, then alphabetically within phase
    const aPhase = a.split(".")[0];
    const bPhase = b.split(".")[0];
    const aPhaseIdx = phaseIndex.get(aPhase) ?? Number.MAX_SAFE_INTEGER;
    const bPhaseIdx = phaseIndex.get(bPhase) ?? Number.MAX_SAFE_INTEGER;
    if (aPhaseIdx !== bPhaseIdx) {
      return aPhaseIdx - bPhaseIdx;
    }
    return a.localeCompare(b);
  });

  const header = sortedKeys.map(escapeCsvField).join(",");
  const dataRows = rows.map((row) =>
    sortedKeys.map((key) => escapeCsvField(row[key])).join(","),
  );

  return [header, ...dataRows].join("\n");
}

function triggerDownload(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadCsv(matches: Match[], filenameBase: string) {
  const csv = matchesToCsv(matches);
  triggerDownload(csv, `${filenameBase}.csv`, "text/csv");
}

export function downloadJson(matches: Match[], filenameBase: string) {
  const json = JSON.stringify(matches, null, 2);
  triggerDownload(json, `${filenameBase}.json`, "application/json");
}
