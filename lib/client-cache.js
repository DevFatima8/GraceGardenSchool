const memoryCache = new Map();

/**
 * Fast client-side memory cache with Stale-While-Revalidate support
 * Allows pages to navigate in 0ms without waiting for repeated network requests
 */
export async function fetchWithCache(url, options = {}) {
  const cached = memoryCache.get(url);
  const now = Date.now();

  // Short TTL so admin edits appear quickly after refresh
  if (cached && (now - cached.timestamp < 15000)) {
    return cached.data;
  }

  try {
    const res = await fetch(url, { ...options, cache: 'no-store' });
    const data = await res.json();
    if (data && data.success) {
      memoryCache.set(url, { data, timestamp: now });
    }
    return data;
  } catch (err) {
    if (cached) return cached.data;
    throw err;
  }
}

export function invalidateCache(url) {
  if (url) {
    memoryCache.delete(url);
  } else {
    memoryCache.clear();
  }
}
