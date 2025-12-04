import { prisma } from "./db";
import crypto from "crypto";

interface AnalyticsData {
  path: string;
  ip?: string;
  userAgent?: string;
  windowWidth?: number;
  windowHeight?: number;
  referrer?: string;
}

export function createFingerprint(
  ip: string,
  userAgent: string,
  windowWidth?: number,
  windowHeight?: number
): string {
  const data = `${ip}|${userAgent}|${windowWidth || 0}|${windowHeight || 0}`;
  return crypto.createHash("sha256").update(data).digest("hex").slice(0, 16);
}

export async function isUniqueView(
  fingerprint: string,
  path: string,
  thresholdHours: number = 2
): Promise<boolean> {
  const threshold = new Date(Date.now() - thresholdHours * 60 * 60 * 1000);

  const existing = await prisma.pageView.findFirst({
    where: {
      fingerprint,
      path,
      createdAt: { gte: threshold },
    },
  });

  return !existing;
}

export async function trackPageView(data: AnalyticsData): Promise<boolean> {
  const fingerprint = createFingerprint(
    data.ip || "unknown",
    data.userAgent || "unknown",
    data.windowWidth,
    data.windowHeight
  );

  const isUnique = await isUniqueView(fingerprint, data.path);

  if (isUnique) {
    await prisma.pageView.create({
      data: {
        path: data.path,
        fingerprint,
        ip: data.ip,
        userAgent: data.userAgent,
        windowWidth: data.windowWidth,
        windowHeight: data.windowHeight,
        referrer: data.referrer,
      },
    });
  }

  return isUnique;
}

export async function getPageAnalytics(path: string) {
  const [totalViews, uniqueViews, last24h, last7d] = await Promise.all([
    prisma.pageView.count({ where: { path } }),
    prisma.pageView.groupBy({
      by: ["fingerprint"],
      where: { path },
    }),
    prisma.pageView.count({
      where: {
        path,
        createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
    }),
    prisma.pageView.count({
      where: {
        path,
        createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
    }),
  ]);

  return {
    totalViews,
    uniqueVisitors: uniqueViews.length,
    last24h,
    last7d,
  };
}
