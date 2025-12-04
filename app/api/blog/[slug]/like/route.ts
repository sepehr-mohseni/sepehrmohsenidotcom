import { NextResponse } from "next/server";
import { toggleLike, hasUserLiked, getBlogEngagement } from "@/lib/blog-engagement";
import { checkRateLimit, rateLimitResponse, getClientIP, getUserAgent } from "@/lib/rateLimit";
import { createFingerprint } from "@/lib/analytics";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const ip = await getClientIP();
    const userAgent = await getUserAgent();
    const fingerprint = createFingerprint(ip, userAgent);

    const [engagement, liked] = await Promise.all([
      getBlogEngagement(slug),
      hasUserLiked(slug, fingerprint),
    ]);

    return NextResponse.json({
      likes: engagement.likes,
      liked,
    });
  } catch (error) {
    console.error("Get like error:", error);
    return NextResponse.json({ likes: 0, liked: false });
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const ip = await getClientIP();

    const rateLimit = await checkRateLimit("like", ip);
    if (!rateLimit.allowed) {
      return rateLimitResponse(rateLimit.resetAt);
    }

    const userAgent = await getUserAgent();
    const result = await toggleLike(slug, ip, userAgent);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Toggle like error:", error);
    return NextResponse.json(
      { error: "Failed to toggle like" },
      { status: 500 }
    );
  }
}
