export type Theme = "light" | "dark";

export const THEME_COOKIE = "theme";
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function parseTheme(value: string | undefined | null): Theme {
  return value === "light" ? "light" : "dark";
}

export function themeColor(theme: Theme): string {
  return theme === "dark" ? "#0a0a0a" : "#ffffff";
}

export function themeClass(theme: Theme): string {
  return theme === "dark" ? "dark" : "";
}

export function setThemeCookie(theme: Theme): void {
  document.cookie = [
    `${THEME_COOKIE}=${theme}`,
    "path=/",
    `max-age=${THEME_COOKIE_MAX_AGE}`,
    "SameSite=Lax",
  ].join("; ");
}
