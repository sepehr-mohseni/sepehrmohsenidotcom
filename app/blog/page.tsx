import { getAllPosts } from "@/lib/mdx";
import { BlogList } from "@/components/BlogList";

export const revalidate = 3600;

export default function BlogPage() {
  const posts = getAllPosts("en");
  return <BlogList posts={posts} />;
}
