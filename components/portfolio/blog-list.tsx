"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/lib/blog";
import { format } from "date-fns";
import Link from "next/link";

interface BlogListProps {
  initialPosts: BlogPost[];
  initialTag?: string | null;
}

export function BlogList({ initialPosts, initialTag = null }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSort, setActiveSort] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(initialTag);

  const allTags = useMemo(() => {
    return Array.from(new Set(initialPosts.flatMap(post => post.tags))).sort();
  }, [initialPosts]);

  const filteredAndSortedPosts = useMemo(() => {
    let result = initialPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });

    switch (activeSort) {
      case "All":
      case "Newest":
        result.sort((a, b) => b.timestamp - a.timestamp);
        break;
      case "Oldest":
        result.sort((a, b) => a.timestamp - b.timestamp);
        break;
    }

    return result;
  }, [searchQuery, activeSort, selectedTag, initialPosts]);

  return (
    <>
      {/* Search and Filters Section */}
      <section className="py-10 relative">
        <div className="mx-auto max-w-site px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Search Bar */}
            <div className="relative group max-w-sm w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-neutral-400 transition-colors group-focus-within:text-neutral-900 dark:group-focus-within:text-white" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-2xl border border-neutral-200 bg-[#f0f0ee] focus:bg-white focus:ring-1 focus:ring-neutral-400 outline-none transition-all dark:bg-white/5 dark:border-white/10 dark:focus:bg-white/10 dark:text-white text-sm"
              />
            </div>

            {/* Sort Tabs */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">
                Sort:
              </span>
              <div className="flex items-center p-1 rounded-xl border border-neutral-200 dark:border-white/10 bg-[#f0f0ee] dark:bg-white/5">
                {["All", "Newest", "Oldest"].map((sort) => (
                  <button
                    key={sort}
                    onClick={() => setActiveSort(sort)}
                    className={cn(
                      "px-4 py-1.5 text-xs font-bold transition-all rounded-lg",
                      activeSort === sort
                        ? "bg-[#e7eabf] text-neutral-900 dark:bg-[#3b4224] dark:text-lime-200 shadow-sm"
                        : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                    )}
                  >
                    {sort}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tag Cloud */}
          <div className="mt-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={cn(
                "px-4 py-1.5 text-xs font-medium rounded-xl border border-dashed transition-all",
                !selectedTag 
                  ? "bg-neutral-900 border-neutral-900 text-white dark:bg-white dark:border-white dark:text-black" 
                  : "bg-white/50 border-neutral-300 text-neutral-600 hover:border-neutral-900 dark:bg-white/5 dark:border-white/10 dark:text-neutral-400 dark:hover:border-white/40"
              )}
            >
              All Topics
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={cn(
                  "px-4 py-1.5 text-xs font-medium rounded-xl border border-dashed transition-all",
                  selectedTag === tag
                    ? "bg-[#e7eabf] border-[#d4ed5a] text-neutral-900 dark:bg-[#3b4224] dark:border-lime-500/30 dark:text-lime-100 shadow-sm"
                    : "bg-white/50 border-neutral-300 text-neutral-600 hover:border-neutral-900 dark:bg-white/5 dark:border-white/10 dark:text-neutral-400 dark:hover:border-white/40"
                )}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto max-w-site px-4 md:px-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col rounded-2xl border border-dashed border-neutral-300 dark:border-white/10 bg-white/40 dark:bg-black/20 overflow-hidden">
              {filteredAndSortedPosts.map((post, idx) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className={cn(
                    "group flex flex-col md:flex-row gap-6 py-8 px-6 md:px-10 transition-all hover:bg-white/60 dark:hover:bg-white/5",
                    idx !== filteredAndSortedPosts.length - 1 && "border-b border-dashed border-neutral-300 dark:border-white/10"
                  )}
                >
                  {/* Left Icon Box */}
                  <div className="shrink-0 pt-1">
                    <div className="w-14 h-14 rounded-2xl border border-dashed border-neutral-300 bg-white dark:bg-neutral-900 dark:border-white/10 shadow-sm flex items-center justify-center text-2xl group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                      {post.emoji || "📝"}
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="flex-grow flex flex-col">
                    <div className="flex items-center gap-2 text-xs font-medium text-neutral-400 dark:text-neutral-500 mb-2">
                      <span>{format(new Date(post.date), "dd MMM, yyyy")}</span>
                      <span>•</span>
                      <span>{Math.ceil(post.content.length / 1000)} min read</span>
                    </div>

                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 line-clamp-2 leading-relaxed">
                      {post.description || (post.content.substring(0, 300).replace(/<[^>]*>?/gm, '') + '...')}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 4).map(tag => (
                          <button
                            key={tag}
                            onClick={(e: React.MouseEvent) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSelectedTag(tag);
                            }}
                            className="px-2.5 py-1 rounded-lg border border-dashed border-[#d4ed5a] bg-[#e7eabf]/50 dark:border-lime-500/30 dark:bg-lime-500/10 text-[10px] font-bold text-neutral-800 dark:text-lime-100 hover:bg-[#d4ed5a] dark:hover:bg-lime-500/20 transition-colors"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                      <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 flex items-center gap-1 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                        Read <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {filteredAndSortedPosts.length > 0 && (
            <div className="flex items-center justify-center py-16 border-t border-dashed border-neutral-400/40 dark:border-white/15 mt-10">
              <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 tracking-wide uppercase">
                More articles coming soon...
              </p>
            </div>
          )}

          {filteredAndSortedPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-base text-neutral-500">No posts found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
