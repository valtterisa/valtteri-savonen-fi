type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

const cache = new Map<string, CacheEntry<unknown>>();

const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000;

export function getMarbleCached<T>(key: string): T | undefined {
  const entry = cache.get(key);
  if (!entry) {
    return undefined;
  }

  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return undefined;
  }

  return entry.value as T;
}

export function setMarbleCached<T>(
  key: string,
  value: T,
  ttlMs = DEFAULT_TTL_MS
) {
  cache.set(key, {
    value,
    expiresAt: Date.now() + ttlMs,
  });
}

export function invalidateMarblePostsList() {
  cache.delete("posts:list");
}

export function invalidateMarblePost(slug: string) {
  cache.delete(`posts:${slug}`);
}

export function clearMarbleCache() {
  cache.clear();
}
