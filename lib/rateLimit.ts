import { prisma } from "./db";
import { headers } from "next/headers";

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const RATE_LIMITS: Record<string, RateLimitConfig> = {
  contact: { windowMs: 60 * 60 * 1000, maxRequests: 3 },
  analytics: { windowMs: 1000, maxRequests: 10 },
  like: { windowMs: 60 * 1000, maxRequests: 10 }, 
  share: { windowMs: 60 * 1000, maxRequests: 20 }, 
  global: { windowMs: 60 * 1000, maxRequests: 100 },
};

export async function getClientIP(): Promise<string> {
  const headersList = await headers();
  return (
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    headersList.get("cf-connecting-ip") ||
    "unknown"
  );
}

export async function getUserAgent(): Promise<string> {
  const headersList = await headers();
  return headersList.get("user-agent") || "unknown";
}

export async function checkRateLimit(
  endpoint: string,
  identifier?: string
): Promise<{ allowed: boolean; remaining: number; resetAt: Date }> {
  const config: RateLimitConfig = RATE_LIMITS[endpoint] || { windowMs: 60 * 1000, maxRequests: 100 };
  const ip = identifier || (await getClientIP());
  const key = `${ip}:${endpoint}`;

  const now = new Date();
  const windowStart = new Date(now.getTime() - config.windowMs);

  await prisma.rateLimit.deleteMany({
    where: { windowStart: { lt: windowStart } },
  });

  const existing = await prisma.rateLimit.findUnique({
    where: { identifier_endpoint: { identifier: key, endpoint } },
  });

  if (!existing || existing.windowStart < windowStart) {
    await prisma.rateLimit.upsert({
      where: { identifier_endpoint: { identifier: key, endpoint } },
      update: { count: 1, windowStart: now },
      create: { identifier: key, endpoint, count: 1, windowStart: now },
    });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetAt: new Date(now.getTime() + config.windowMs),
    };
  }

  if (existing.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: new Date(existing.windowStart.getTime() + config.windowMs),
    };
  }

  await prisma.rateLimit.update({
    where: { identifier_endpoint: { identifier: key, endpoint } },
    data: { count: { increment: 1 } },
  });

  return {
    allowed: true,
    remaining: config.maxRequests - existing.count - 1,
    resetAt: new Date(existing.windowStart.getTime() + config.windowMs),
  };
}

export function rateLimitResponse(resetAt: Date) {
  return new Response(
    JSON.stringify({ error: "Too many requests. Please try again later." }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": Math.ceil((resetAt.getTime() - Date.now()) / 1000).toString(),
      },
    }
  );
}
