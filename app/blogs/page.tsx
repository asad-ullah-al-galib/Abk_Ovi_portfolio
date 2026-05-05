import React from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/footer";
import { getSortedPostsData } from "@/lib/blog";
import { BlogList } from "@/components/portfolio/blog-list";
import { FadingDots } from "@/components/ui/background-snippets";

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
  const posts = await getSortedPostsData();
  const { tag } = await searchParams;

  return (
    <div className="min-h-screen bg-[#f4f4f2] text-neutral-950 dark:bg-[#0a0a0a] dark:text-neutral-100 font-sans transition-colors duration-300 relative overflow-hidden">
      {/* Global Background Noise */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] bg-noise" />

      <Header currentPage="blogs" />

      <main className="pt-[88px]">
        {/* Blog Hero Section - Full Width Dotted Background */}
        <section className="relative border-b border-dashed border-neutral-300 dark:border-white/10 overflow-hidden bg-white/40 dark:bg-black/20">
          <FadingDots />
          <div className="mx-auto max-w-site px-6 py-20 relative z-10 text-left">
            <h1 className="font-display text-5xl font-black tracking-tight text-neutral-900 dark:text-neutral-50 md:text-7xl">
              Blogs<span className="text-orange-500">.</span>
            </h1>
            <p className="mt-4 text-lg font-medium text-neutral-500 dark:text-neutral-400 max-w-lg leading-relaxed">
              Notes on professional growth, leadership, and workplace practices.
            </p>
          </div>
        </section>


        <div className="relative">
          <BlogList initialPosts={posts} initialTag={tag} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
