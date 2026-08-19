export const SITE_URL = "https://valtterisavonen.fi";
export const SITE_NAME = "Valtteri Savonen";
export const SITE_HANDLE = "@valtterisavonen";
export const DEFAULT_DESCRIPTION =
  "Full Stack Engineer from Finland. Building products, freelancing, and writing about software.";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).href;
}

export function ogImageUrl(path: string): string {
  return absoluteUrl(path);
}
