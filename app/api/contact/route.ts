import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit, rateLimitResponse, getClientIP, getUserAgent } from "@/lib/rateLimit";
import { validateContactForm, detectSpam, type ContactFormData } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const ip = await getClientIP();
    const rateLimit = await checkRateLimit("contact", ip);
    
    if (!rateLimit.allowed) {
      return rateLimitResponse(rateLimit.resetAt);
    }

    const data: ContactFormData = await request.json();
    const userAgent = await getUserAgent();

    const validation = validateContactForm(data);
    if (!validation.valid) {
      return NextResponse.json(
        { ok: false, errors: validation.errors },
        { status: 400 }
      );
    }

    const isSpam = detectSpam(data);

    await prisma.contactSubmission.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        message: data.message.trim(),
        ip,
        userAgent,
        isSpam,
      },
    });

    if (isSpam && process.env.NODE_ENV === "production") {
      console.log(`[SPAM] Contact submission flagged: ${data.email} from ${ip}`);
    }

    return NextResponse.json(
      { ok: true },
      {
        headers: {
          "X-RateLimit-Remaining": rateLimit.remaining.toString(),
        },
      }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
