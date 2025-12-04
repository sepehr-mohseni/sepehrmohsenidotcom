import { prisma } from "./db";
import { createFingerprint } from "./analytics";

export async function ensureBlogPost(slug: string) {
  return prisma.blogPost.upsert({
    where: { slug },
    update: {},
    create: { slug },
  });
}

export async function getBlogEngagement(slug: string) {
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: { likes: true, shares: true, views: true },
  });

  return post || { likes: 0, shares: 0, views: 0 };
}

export async function hasUserLiked(slug: string, fingerprint: string): Promise<boolean> {
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return false;

  const like = await prisma.postLike.findUnique({
    where: { postId_fingerprint: { postId: post.id, fingerprint } },
  });

  return !!like;
}

export async function toggleLike(
  slug: string,
  ip: string,
  userAgent: string
): Promise<{ liked: boolean; likes: number }> {
  const fingerprint = createFingerprint(ip, userAgent);
  const post = await ensureBlogPost(slug);

  const existingLike = await prisma.postLike.findUnique({
    where: { postId_fingerprint: { postId: post.id, fingerprint } },
  });

  if (existingLike) {
    await prisma.$transaction([
      prisma.postLike.delete({ where: { id: existingLike.id } }),
      prisma.blogPost.update({
        where: { slug },
        data: { likes: { decrement: 1 } },
      }),
    ]);
    const updated = await prisma.blogPost.findUnique({ where: { slug } });
    return { liked: false, likes: updated?.likes || 0 };
  } else {
    await prisma.$transaction([
      prisma.postLike.create({ data: { postId: post.id, fingerprint } }),
      prisma.blogPost.update({
        where: { slug },
        data: { likes: { increment: 1 } },
      }),
    ]);
    const updated = await prisma.blogPost.findUnique({ where: { slug } });
    return { liked: true, likes: updated?.likes || 0 };
  }
}

export async function trackShare(
  slug: string,
  platform: string,
  ip?: string,
  userAgent?: string
): Promise<number> {
  const post = await ensureBlogPost(slug);
  const fingerprint = ip && userAgent ? createFingerprint(ip, userAgent) : null;

  await prisma.$transaction([
    prisma.postShare.create({
      data: { postId: post.id, platform, fingerprint },
    }),
    prisma.blogPost.update({
      where: { slug },
      data: { shares: { increment: 1 } },
    }),
  ]);

  const updated = await prisma.blogPost.findUnique({ where: { slug } });
  return updated?.shares || 0;
}

export async function incrementBlogView(slug: string): Promise<void> {
  await ensureBlogPost(slug);
  await prisma.blogPost.update({
    where: { slug },
    data: { views: { increment: 1 } },
  });
}
