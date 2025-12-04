import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { generateSEO, generateArticleJsonLd } from "@/lib/seo";
import { getPostWithFallback, getPostSlugs, getAllPosts } from "@/lib/mdx";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { BlogImage } from "@/components/BlogImage";
import { mdxComponents } from "@/components/MDXComponents";
import { BlogEngagement } from "@/components/BlogEngagement";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = getPostSlugs("en");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { post } = getPostWithFallback(slug, "en");

  if (!post) {
    return {};
  }

  return generateSEO({
    locale: "en",
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    image: post.hero,
    type: "article",
    publishedTime: post.date,
    tags: post.tags,
  });
}


export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const { post } = getPostWithFallback(slug, "en");
  const allPosts = getAllPosts("en");

  if (!post) {
    notFound();
  }

  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="min-h-screen pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateArticleJsonLd(post, "en") }}
      />

      <Container size="md">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-400 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
        >
          <Icon name="arrow-left" size={16} />
          Back to Blog
        </Link>

        <header className="mb-12">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 font-medium text-indigo-400">
              <Icon name="calendar" size={14} />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-medium text-zinc-400">
              <Icon name="clock" size={14} />
              {post.readingTime}
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {post.title}
          </h1>

          <p className="text-xl leading-relaxed text-zinc-400">{post.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-zinc-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {post.hero && (
          <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl">
            <BlogImage
              src={post.hero}
              alt={post.title}
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
        )}

        <div className="mb-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="prose prose-lg prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:text-indigo-300 prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-zinc-900">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [rehypePrettyCode, { theme: "github-dark", keepBackground: true }],
                ],
              },
            }}
          />
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <BlogEngagement 
            slug={slug} 
            title={post.title} 
            url={`https://sepehrmohseni.com/blog/${slug}`} 
          />
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2.5 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-indigo-500/25"
          >
            More Articles
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-8 text-2xl font-bold text-white">Related Articles</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group rounded-xl border border-white/5 bg-white/5 p-5 transition-all hover:border-white/10 hover:bg-white/10"
                >
                  <div className="mb-2 text-sm text-zinc-500">{formatDate(relatedPost.date)}</div>
                  <h3 className="mb-2 font-semibold text-white transition-colors group-hover:text-indigo-400">
                    {relatedPost.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-zinc-400">{relatedPost.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>

      <div className="h-20" />
    </article>
  );
}
