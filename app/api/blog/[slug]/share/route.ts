import { NextResponse } from "next/server";
import { trackShare, getBlogEngagement } from "@/lib/blog-engagement";
import { checkRateLimit, rateLimitResponse, getClientIP, getUserAgent } from "@/lib/rateLimit";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

interface SharePayload {
  platform: string;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const engagement = await getBlogEngagement(slug);

    return NextResponse.json({ shares: engagement.shares });
  } catch (error) {
    console.error("Get shares error:", error);
    return NextResponse.json({ shares: 0 });
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const ip = await getClientIP();

    const rateLimit = await checkRateLimit("share", ip);
    if (!rateLimit.allowed) {
      return rateLimitResponse(rateLimit.resetAt);
    }

    const data: SharePayload = await request.json();
    const userAgent = await getUserAgent();

    if (!data.platform) {
      return NextResponse.json(
        { error: "Platform is required" },
        { status: 400 }
      );
    }

    const validPlatforms = ["twitter", "linkedin", "facebook", "copy", "whatsapp"];
    if (!validPlatforms.includes(data.platform)) {
      return NextResponse.json(
        { error: "Invalid platform" },
        { status: 400 }
      );
    }

    const shares = await trackShare(slug, data.platform, ip, userAgent);

    return NextResponse.json({ shares });
  } catch (error) {
    console.error("Track share error:", error);
    return NextResponse.json(
      { error: "Failed to track share" },
      { status: 500 }
    );
  }
}
