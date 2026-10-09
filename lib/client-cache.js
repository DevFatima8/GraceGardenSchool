const memoryCache = new Map();

/**
 * Fast client-side memory cache with Stale-While-Revalidate support
 * Allows pages to navigate in 0ms without waiting for repeated network requests
 */
export async function fetchWithCache(url, options = {}) {
  const cached = memoryCache.get(url);
  const now = Date.now();

  // If in cache and fresh within 5 minutes, return cached data instantly
  if (cached && (now - cached.timestamp < 300000)) {
    return cached.data;
  }

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    if (data && data.success) {
      memoryCache.set(url, { data, timestamp: now });
    }
    return data;
  } catch (err) {
    // Return stale cache if network fails
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
