"use client";

import React from "react";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import { BlogPost } from "@/lib/blog";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BlogSectionProps {
  posts?: BlogPost[];
}

export function BlogSection({ posts = [] }: BlogSectionProps) {
  const router = useRouter();

  // If no posts provided, show nothing or placeholder
  if (posts.length === 0) {
    return (
      <div className="text-center py-10 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-xl">
        <p className="text-neutral-500 dark:text-neutral-400">No blog posts available yet.</p>
      </div>
    );
  }

  // Take only top 3 posts for the home page
  const displayPosts = posts.slice(0, 3);

  const blogBentoItems: BentoItem[] = displayPosts.map((post, idx) => ({
    title: post.title,
    description: post.description || (post.content.substring(0, 150).replace(/<[^>]*>?/gm, '') + '...'),
    icon: <span className="text-xl leading-none">{post.emoji || "📝"}</span>,
    meta: format(new Date(post.date), "dd MMM, yyyy"),
    status: `${Math.ceil(post.content.length / 1000)} min read`,
    tags: post.tags.map(tag => (
      <button
        key={tag}
        className="hover:text-theme-main transition-colors"
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          router.push(`/blogs?tag=${tag}`);
        }}
      >
        #{tag}
      </button>
    )),
    cta: "Read Article →",
    href: `/blogs/${post.slug}`,
    colSpan: 1,
    hasPersistentHover: false,
  }));

  return (
    <div className="relative z-10">
      <BentoGrid items={blogBentoItems} className="md:grid-cols-1" rounded={false} />
    </div>
  );
}
