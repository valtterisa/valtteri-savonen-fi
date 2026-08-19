export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export function isJsonObject(value: JsonValue): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isJsonArray(value: JsonValue): value is JsonArray {
  return Array.isArray(value);
}

export function isString(value: JsonValue): value is string {
  return typeof value === "string";
}

export function isNumber(value: JsonValue): value is number {
  return typeof value === "number";
}

export async function readJsonValue(
  response: Response,
): Promise<JsonValue | null> {
  try {
    const value = (await response.json()) as JsonValue;
    return value;
  } catch {
    return null;
  }
}

export function getErrorMessage(error: Error | string): string {
  if (error instanceof Error) {
    return error.message;
  }
  return error;
}