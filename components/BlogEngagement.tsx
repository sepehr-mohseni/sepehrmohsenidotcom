"use client";

import { useState, useEffect, useCallback } from "react";
import { Icon } from "./ui/Icon";

interface BlogEngagementProps {
  slug: string;
  title: string;
  url?: string;
}

interface EngagementData {
  likes: number;
  shares: number;
  views: number;
  liked: boolean;
}


export function BlogEngagement({ slug, title, url }: BlogEngagementProps) {
  const [data, setData] = useState<EngagementData>({
    likes: 0,
    shares: 0,
    views: 0,
    liked: false,
  });
  const [isLiking, setIsLiking] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const fullUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  useEffect(() => {
    const fetchEngagement = async () => {
      try {
        const res = await fetch(`/api/blog/${slug}/engagement`);
        if (res.ok) {
          const engagement = await res.json();
          setData(engagement);
        }
      } catch {
      }
    };

    fetchEngagement();
  }, [slug]);

  const handleLike = useCallback(async () => {
    if (isLiking) return;
    setIsLiking(true);

    setData((prev) => ({
      ...prev,
      liked: !prev.liked,
      likes: prev.liked ? prev.likes - 1 : prev.likes + 1,
    }));

    try {
      const res = await fetch(`/api/blog/${slug}/like`, { method: "POST" });
      if (res.ok) {
        const result = await res.json();
        setData((prev) => ({ ...prev, likes: result.likes, liked: result.liked }));
      }
    } catch {
      setData((prev) => ({
        ...prev,
        liked: !prev.liked,
        likes: prev.liked ? prev.likes + 1 : prev.likes - 1,
      }));
    } finally {
      setIsLiking(false);
    }
  }, [slug, isLiking]);

  const handleShare = useCallback(
    async (platform: string) => {
      setShowShareMenu(false);

      const shareUrls: Record<string, string> = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
      };

      if (platform === "copy") {
        await navigator.clipboard.writeText(fullUrl);
      } else if (shareUrls[platform]) {
        window.open(shareUrls[platform], "_blank", "width=600,height=400");
      }

      try {
        const res = await fetch(`/api/blog/${slug}/share`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ platform }),
        });
        if (res.ok) {
          const result = await res.json();
          setData((prev) => ({ ...prev, shares: result.shares }));
        }
      } catch {
      }
    },
    [slug, title, fullUrl]
  );

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleLike}
        disabled={isLiking}
        className={`group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
          data.liked
            ? "bg-pink-500/20 text-pink-400"
            : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
        }`}
        aria-label={data.liked ? "Unlike post" : "Like post"}
      >
        <svg
          className={`h-5 w-5 transition-transform ${data.liked ? "scale-110" : "group-hover:scale-110"}`}
          fill={data.liked ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span>{data.likes}</span>
      </button>

      <div className="relative">
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-zinc-400 transition-all hover:bg-white/10 hover:text-white"
          aria-label="Share post"
        >
          <Icon name="external" size={18} />
          <span>{data.shares}</span>
        </button>

        {showShareMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowShareMenu(false)}
            />
            <div className="absolute bottom-full left-0 z-50 mb-2 w-40 rounded-xl border border-white/10 bg-zinc-900 p-2 shadow-xl">
              {[
                { id: "twitter", label: "Twitter", icon: "twitter" },
                { id: "linkedin", label: "LinkedIn", icon: "linkedin" },
                { id: "copy", label: "Copy link", icon: "copy" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleShare(item.id)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <Icon name={item.icon as "twitter" | "linkedin" | "copy"} size={16} />
                  {item.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <span className="text-sm text-zinc-500">
        {data.views} {data.views === 1 ? "view" : "views"}
      </span>
    </div>
  );
}
