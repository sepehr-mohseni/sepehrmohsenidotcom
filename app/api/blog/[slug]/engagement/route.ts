import { NextResponse } from "next/server";
import { getBlogEngagement, hasUserLiked, incrementBlogView } from "@/lib/blog-engagement";
import { getClientIP, getUserAgent } from "@/lib/rateLimit";
import { createFingerprint, isUniqueView } from "@/lib/analytics";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const ip = await getClientIP();
    const userAgent = await getUserAgent();
    const fingerprint = createFingerprint(ip, userAgent);

    const isUnique = await isUniqueView(fingerprint, `/blog/${slug}`);
    if (isUnique) {
      await incrementBlogView(slug);
    }

    const [engagement, liked] = await Promise.all([
      getBlogEngagement(slug),
      hasUserLiked(slug, fingerprint),
    ]);

    return NextResponse.json({
      likes: engagement.likes,
      shares: engagement.shares,
      views: engagement.views,
      liked,
    });
  } catch (error) {
    console.error("Get engagement error:", error);
    return NextResponse.json({
      likes: 0,
      shares: 0,
      views: 0,
      liked: false,
    });
  }
}
