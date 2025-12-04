import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  locale: "en",
  title: "Blog",
  description:
    "Thoughts, tutorials, and insights about web development, software architecture, and the tech industry.",
  path: "/blog",
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
