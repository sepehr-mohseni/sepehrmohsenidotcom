import { NextResponse } from "next/server";
import { trackPageView } from "@/lib/analytics";
import { checkRateLimit, rateLimitResponse, getClientIP, getUserAgent } from "@/lib/rateLimit";

interface AnalyticsPayload {
  path: string;
  windowWidth?: number;
  windowHeight?: number;
  referrer?: string;
}

export async function POST(request: Request) {
  try {
    const ip = await getClientIP();
    
    const rateLimit = await checkRateLimit("analytics", ip);
    if (!rateLimit.allowed) {
      return rateLimitResponse(rateLimit.resetAt);
    }

    const globalLimit = await checkRateLimit("global", ip);
    if (!globalLimit.allowed) {
      return rateLimitResponse(globalLimit.resetAt);
    }

    const data: AnalyticsPayload = await request.json();
    const userAgent = await getUserAgent();

    if (!data.path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    const isUnique = await trackPageView({
      path: data.path,
      ip,
      userAgent,
      windowWidth: data.windowWidth,
      windowHeight: data.windowHeight,
      referrer: data.referrer,
    });

    return NextResponse.json({ ok: true, unique: isUnique });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
