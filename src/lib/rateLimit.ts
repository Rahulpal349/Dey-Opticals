interface RateLimitContext {
  tokenCount: number;
  lastReset: number;
}

const rateLimitMap = new Map<string, RateLimitContext>();

export function rateLimit(identifier: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const context = rateLimitMap.get(identifier);

  if (!context) {
    rateLimitMap.set(identifier, { tokenCount: 1, lastReset: now });
    return true;
  }

  if (now - context.lastReset > windowMs) {
    // Reset window
    context.tokenCount = 1;
    context.lastReset = now;
    return true;
  }

  if (context.tokenCount >= limit) {
    return false; // Rate limit exceeded
  }

  context.tokenCount += 1;
  return true;
}
