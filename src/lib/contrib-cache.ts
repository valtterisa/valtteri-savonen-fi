export const CONTRIB_CACHE_SECONDS = 60 * 60 * 8;

export function setContribCacheHeaders(headers: Headers): void {
  headers.set(
    "Cache-Control",
    `public, s-maxage=${CONTRIB_CACHE_SECONDS}, stale-while-revalidate=86400`,
  );
}
