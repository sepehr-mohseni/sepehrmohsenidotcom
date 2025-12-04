"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { createTranslator } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { BlogImage } from "@/components/BlogImage";
import type { Post } from "@/lib/types";

const POSTS_PER_PAGE = 5;

const categories = [
  { id: "all", label: "All Posts", color: "indigo" },
  { id: "frontend", label: "Frontend", color: "purple" },
  { id: "backend", label: "Backend", color: "emerald" },
  { id: "devops", label: "DevOps", color: "orange" },
  { id: "database", label: "Database", color: "cyan" },
  { id: "architecture", label: "Architecture", color: "pink" },
];

const categoryMap: Record<string, string[]> = {
  frontend: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "CSS", "Frontend"],
  backend: ["Laravel", "PHP", "Node.js", "Python", "API", "REST"],
  devops: ["Docker", "Kubernetes", "CI/CD", "DevOps", "Cloud"],
  database: ["MySQL", "PostgreSQL", "Redis", "Database", "SQL"],
  architecture: ["System Design", "Architecture", "Distributed Systems", "Scalability"],
};

interface BlogListProps {
  posts: Post[];
}

export function BlogList({ posts }: BlogListProps) {
  const t = createTranslator("en");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return posts;
    const categoryTags = categoryMap[activeCategory] || [];
    return posts.filter((post) =>
      post.tags.some((tag) =>
        categoryTags.some((ct) => tag.toLowerCase().includes(ct.toLowerCase()))
      )
    );
  }, [posts, activeCategory]);


  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getCategoryColor = (color: string) => {
    const colors: Record<string, string> = {
      indigo: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",
      purple: "border-purple-500/30 bg-purple-500/10 text-purple-400",
      emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
      orange: "border-orange-500/30 bg-orange-500/10 text-orange-400",
      cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
      pink: "border-pink-500/30 bg-pink-500/10 text-pink-400",
    };
    return colors[color] || colors.indigo;
  };

  const getCategoryCount = (catId: string) =>
    posts.filter((p) =>
      p.tags.some((tag) =>
        (categoryMap[catId] || []).some((ct) =>
          tag.toLowerCase().includes(ct.toLowerCase())
        )
      )
    ).length;

  return (
    <div className="min-h-screen pt-24">
      <Container>
        <div className="mb-10 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-400">
            <Icon name="edit" size={16} />
            {posts.length} Articles
          </span>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">{t("blog.title")}</h1>
          <p className="mx-auto max-w-2xl text-zinc-400">{t("blog.subtitle")}</p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? getCategoryColor(cat.color)
                  : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              {cat.label}
              {cat.id !== "all" && (
                <span className="ml-1.5 text-xs opacity-60">({getCategoryCount(cat.id)})</span>
              )}
            </button>
          ))}
        </div>


        {paginatedPosts.length > 0 ? (
          <div className="space-y-6">
            {paginatedPosts.map((post, index) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="overflow-hidden rounded-xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 hover:border-white/10">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative h-48 w-full sm:h-auto sm:w-64 sm:shrink-0">
                      {post.hero ? (
                        <BlogImage
                          src={post.hero}
                          alt={post.title}
                          priority={index === 0 && currentPage === 1}
                          sizes="(max-width: 640px) 100vw, 256px"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-indigo-500 to-purple-500" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
                      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Icon name="calendar" size={12} />
                          {formatDate(post.date)}
                        </span>
                        <span>•</span>
                        <span>{post.readingTime}</span>
                      </div>
                      <h2 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-indigo-400 sm:text-xl">
                        {post.title}
                      </h2>
                      <p className="mb-3 line-clamp-2 text-sm text-zinc-400">{post.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-xs font-medium text-zinc-500">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
              <Icon name="edit" size={32} className="text-zinc-500" />
            </div>
            <p className="text-lg text-zinc-400">No posts in this category</p>
          </div>
        )}


        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-all hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon name="chevron-left" size={20} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all ${
                  currentPage === page
                    ? "bg-indigo-500 text-white"
                    : "border border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-all hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon name="chevron-right" size={20} />
            </button>
          </div>
        )}

        {filteredPosts.length > 0 && (
          <p className="mt-4 text-center text-sm text-zinc-500">
            Showing {(currentPage - 1) * POSTS_PER_PAGE + 1}-
            {Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length)} of {filteredPosts.length} posts
          </p>
        )}

        <div className="h-20" />
      </Container>
    </div>
  );
}
