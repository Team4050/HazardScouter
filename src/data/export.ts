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
      if (typeof value === "object" && value !== null) {
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          flat[`${phase}.${key}.${nestedKey}`] = nestedValue as
            | string
            | number
            | boolean;
        }
      } else {
        flat[`${phase}.${key}`] = value as string | number | boolean;
      }
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

function flattenAndSort(matches: Match[]): {
  keys: string[];
  rows: FlatRecord[];
} {
  const rows = matches.map(flattenMatch);

  const allKeys = new Set<string>();
  for (const row of rows) {
    for (const key of Object.keys(row)) {
      allKeys.add(key);
    }
  }

  const frontmatterSet = new Set(frontmatterFields);
  const keys = [...allKeys].sort((a, b) => {
    const aFront = frontmatterSet.has(a);
    const bFront = frontmatterSet.has(b);
    if (aFront && bFront) {
      return frontmatterFields.indexOf(a) - frontmatterFields.indexOf(b);
    }
    if (aFront) {
      return -1;
    }
    if (bFront) {
      return 1;
    }
    const aPhase = a.split(".")[0];
    const bPhase = b.split(".")[0];
    const aPhaseIdx = phaseIndex.get(aPhase) ?? Number.MAX_SAFE_INTEGER;
    const bPhaseIdx = phaseIndex.get(bPhase) ?? Number.MAX_SAFE_INTEGER;
    if (aPhaseIdx !== bPhaseIdx) {
      return aPhaseIdx - bPhaseIdx;
    }
    return a.localeCompare(b);
  });

  return { keys, rows };
}

function matchesToCsv(matches: Match[]): string {
  const { keys, rows } = flattenAndSort(matches);
  const header = keys.map(escapeCsvField).join(",");
  const dataRows = rows.map((row) =>
    keys.map((key) => escapeCsvField(row[key])).join(","),
  );
  return [header, ...dataRows].join("\n");
}

function escapeTsvField(value: unknown): string {
  return String(value ?? "").replace(/[\t\n\r]/g, " ");
}

function matchesToTsv(matches: Match[]): string {
  const { keys, rows } = flattenAndSort(matches);
  const header = keys.join("\t");
  const dataRows = rows.map((row) =>
    keys.map((key) => escapeTsvField(row[key])).join("\t"),
  );
  return [header, ...dataRows].join("\n");
}

export function triggerDownload(
  content: string,
  filename: string,
  mimeType: string,
) {
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

export async function copyTsvToClipboard(matches: Match[]): Promise<void> {
  const tsv = matchesToTsv(matches);
  await navigator.clipboard.writeText(tsv);
}

export function downloadJson(matches: Match[], filenameBase: string) {
  const json = JSON.stringify(matches, null, 2);
  triggerDownload(json, `${filenameBase}.json`, "application/json");
}
