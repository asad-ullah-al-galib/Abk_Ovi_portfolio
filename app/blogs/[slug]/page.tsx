import React from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPostData, getSortedPostsData } from "@/lib/blog";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { PostStats } from "@/components/portfolio/post-stats";
import { FadingDots } from "@/components/ui/background-snippets";

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostData(slug);
  
  const allPosts = await getSortedPostsData();
  const currentIndex = allPosts.findIndex((p: { slug: string }) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f4f4f2] text-neutral-950 dark:bg-[#0a0a0a] dark:text-neutral-100 transition-colors duration-300">
      <Header currentPage="blogs" />

      <main className="pt-[88px] pb-24 relative">
        {/* Global Background Noise */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] bg-noise" />

        {/* Full-Width Post Header */}
        <header className="relative overflow-hidden bg-white/40 dark:bg-black/20 border-b border-dashed border-neutral-300 dark:border-white/10 px-6 py-12 md:py-20">
          <FadingDots />
          <div className="mx-auto max-w-site relative z-10">
            <Link 
              href="/blogs" 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-neutral-300 bg-white/50 text-neutral-500 hover:text-neutral-900 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400 dark:hover:text-white transition-all mb-8 text-[11px] font-bold"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to Blogs
            </Link>
            
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-6 text-neutral-900 dark:text-white leading-tight flex flex-wrap items-center gap-3">
              {post.title} {post.emoji && <span>{post.emoji}</span>}
            </h1>
            
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
              <span>{format(new Date(post.date), "dd MMM, yyyy")}</span>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <span>{Math.ceil(post.content.length / 1000)} MIN READ</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              {post.tags.map((tag: string) => (
                <Link 
                  key={tag}
                  href={`/blogs?tag=${tag}`}
                  className="px-3 py-1 rounded-full border border-dashed border-neutral-300 bg-white/50 text-[10px] font-bold text-neutral-500 hover:border-neutral-900 hover:text-neutral-900 transition-all dark:border-white/10 dark:bg-white/5 dark:text-neutral-400 dark:hover:border-white/40 dark:hover:text-white"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-site px-4 pt-16 relative z-10">
          <article className="max-w-4xl mx-auto">

            <div 
              className="prose prose-neutral dark:prose-invert prose-lg max-w-none 
                prose-headings:font-display prose-headings:font-black prose-headings:tracking-tight
                prose-p:text-justify prose-p:leading-relaxed
                prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-2xl prose-img:shadow-xl
                prose-code:text-orange-500 dark:prose-code:text-orange-400"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Post Footer Section */}
            <div className="mt-16 space-y-6">
              {/* Stats Bar (Interactive) */}
              <PostStats slug={slug} />

              {/* Navigation Cards */}
              <div className="flex flex-col sm:flex-row gap-3">
                {prevPost && (
                  <Link href={`/blogs/${prevPost.slug}`} className="flex-1 group p-3 md:p-4 rounded-xl border border-dashed border-neutral-300 dark:border-white/10 hover:border-neutral-900 dark:hover:border-white transition-all bg-neutral-100/30 dark:bg-white/5">
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-0.5 block">← Previous post</span>
                    <h4 className="text-xs md:text-sm font-bold text-neutral-900 dark:text-white group-hover:text-orange-500 transition-colors line-clamp-1">{prevPost.title}</h4>
                  </Link>
                )}
                {nextPost && (
                  <Link href={`/blogs/${nextPost.slug}`} className="flex-1 group p-3 md:p-4 rounded-xl border border-dashed border-neutral-300 dark:border-white/10 hover:border-neutral-900 dark:hover:border-white transition-all text-right bg-neutral-100/30 dark:bg-white/5">
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-0.5 block">Next post →</span>
                    <h4 className="text-xs md:text-sm font-bold text-neutral-900 dark:text-white group-hover:text-orange-500 transition-colors line-clamp-1">{nextPost.title}</h4>
                  </Link>
                )}
              </div>

              {/* Newsletter Box */}
              <div className="p-6 md:p-8 rounded-xl bg-neutral-200/50 dark:bg-white/5 border border-neutral-300 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white leading-tight">Let's stay in the Loop?</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">I'll send you updates on new blogs only. No spam!</p>
                </div>
                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 relative z-10">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-grow md:w-64 px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-white/80 dark:bg-black/50 text-sm outline-none focus:ring-2 focus:ring-lime-300 transition-all dark:text-white" 
                  />
                  <button className="px-6 py-2.5 rounded-xl bg-[#e3fb71] hover:bg-[#d4ed5a] text-neutral-900 font-bold text-sm transition-all shadow-sm shrink-0 border border-[#cbe458]">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
