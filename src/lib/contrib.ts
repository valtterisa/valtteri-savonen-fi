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

const cacheTtlMs = 24 * 60 * 60 * 1000;

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
    const response = await fetch(apiUrl, { signal: AbortSignal.timeout(8000) });
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
