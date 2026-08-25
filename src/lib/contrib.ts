import {
  isJsonArray,
  isJsonObject,
  isNumber,
  isString,
  readJsonValue,
  type JsonObject,
  type JsonValue,
} from "./json";

export type ContributionDay = {
  date: string;
  count: number;
  level: number;
  tip: string;
};

export type ContributionGraph = {
  days: ContributionDay[];
  caption: string;
};

type RawContributionDay = {
  date: string;
  count: number;
  level: number;
};

const apiUrl =
  "https://github-contributions-api.jogruber.de/v4/valtterisa?y=last";

const cacheTtlMs = 8 * 60 * 60 * 1000;

let cachedGraph: ContributionGraph | null = null;
let cachedAt = 0;

function formatTip(day: Pick<RawContributionDay, "date" | "count">): string {
  const date = new Date(`${day.date}T00:00:00Z`);
  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  if (day.count === 0) {
    return `No contributions on ${formatted}`;
  }
  if (day.count === 1) {
    return "1 contribution on " + formatted;
  }
  return `${day.count} contributions on ${formatted}`;
}

function parseContributionDay(value: JsonObject): RawContributionDay | null {
  if (
    !isString(value.date) ||
    !isNumber(value.count) ||
    !isNumber(value.level)
  ) {
    return null;
  }

  return {
    date: value.date,
    count: value.count,
    level: value.level,
  };
}

function parseContributionsResponse(value: JsonValue | null): RawContributionDay[] {
  if (!isJsonObject(value) || !isJsonArray(value.contributions)) {
    return [];
  }

  return value.contributions
    .map((entry) => (isJsonObject(entry) ? parseContributionDay(entry) : null))
    .filter((day): day is RawContributionDay => day !== null);
}

function lastMonths(days: RawContributionDay[], months: number): RawContributionDay[] {
  const cutoff = new Date();
  cutoff.setUTCMonth(cutoff.getUTCMonth() - months);
  while (cutoff.getUTCDay() !== 0) {
    cutoff.setUTCDate(cutoff.getUTCDate() - 1);
  }

  const cutoffStr = cutoff.toISOString().slice(0, 10);
  const index = days.findIndex((day) => day.date >= cutoffStr);
  return index === -1 ? [] : days.slice(index);
}

function buildCaption(days: ContributionDay[]): string {
  const total = days.reduce((sum, day) => sum + day.count, 0);
  const startYear = days[0]?.date.slice(0, 4) ?? "";
  const endYear = days[days.length - 1]?.date.slice(0, 4) ?? "";
  const year =
    endYear !== startYear ? `${startYear}–${endYear} ytd` : startYear;
  return `${total} contributions in ${year}`;
}

async function fetchContributions(): Promise<ContributionDay[] | null> {
  try {
    const response = await fetch(apiUrl, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      return null;
    }

    const data = await readJsonValue(response);
    const trimmed = lastMonths(parseContributionsResponse(data), 12);

    return trimmed.map((day) => ({
      ...day,
      tip: formatTip(day),
    }));
  } catch {
    return null;
  }
}

export async function getContributionGraph(): Promise<ContributionGraph> {
  const now = Date.now();
  if (cachedGraph && now - cachedAt < cacheTtlMs) {
    return cachedGraph;
  }

  const days = await fetchContributions();
  if (days && days.length > 0) {
    cachedGraph = {
      days,
      caption: buildCaption(days),
    };
    cachedAt = now;
    return cachedGraph;
  }

  return cachedGraph ?? { days: [], caption: "" };
}

export function parseContributionGraph(
  value: JsonValue | null,
): ContributionGraph | null {
  if (!isJsonObject(value) || !isJsonArray(value.days) || !isString(value.caption)) {
    return null;
  }

  const days: ContributionDay[] = [];
  for (const entry of value.days) {
    if (!isJsonObject(entry)) {
      return null;
    }
    if (
      !isString(entry.date) ||
      !isNumber(entry.count) ||
      !isNumber(entry.level) ||
      !isString(entry.tip)
    ) {
      return null;
    }
    days.push({
      date: entry.date,
      count: entry.count,
      level: entry.level,
      tip: entry.tip,
    });
  }

  return { days, caption: value.caption };
}

export async function fetchContributionGraphClient(): Promise<ContributionGraph> {
  const response = await fetch("/api/contrib");
  if (!response.ok) {
    throw new Error("Failed to load contribution graph");
  }

  const raw = (await response.json()) as JsonValue;
  const parsed = parseContributionGraph(raw);
  if (!parsed || parsed.days.length === 0) {
    throw new Error("Invalid contribution graph");
  }

  return parsed;
}
