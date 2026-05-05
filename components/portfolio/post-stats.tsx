"use client";

import React, { useState, useEffect } from "react";
import { Heart, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostStatsProps {
  slug: string;
}

export function PostStats({ slug }: PostStatsProps) {
  const [likes, setLikes] = useState(0); // Reset to 0
  const [views, setViews] = useState(0); // Reset to 0
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    // Load stats from localStorage
    const savedStats = localStorage.getItem(`post_stats_${slug}`);
    let currentStats = savedStats ? JSON.parse(savedStats) : { likes: 0, views: 0, liked: false };
    
    // Increment view count
    currentStats.views += 1;
    
    setLikes(currentStats.likes);
    setViews(currentStats.views);
    setHasLiked(currentStats.liked);
    
    localStorage.setItem(`post_stats_${slug}`, JSON.stringify(currentStats));
  }, [slug]);

  const handleLike = () => {
    const newLiked = !hasLiked;
    const newLikes = newLiked ? likes + 1 : likes - 1;
    
    setHasLiked(newLiked);
    setLikes(newLikes);
    
    // Save to localStorage
    const savedStats = localStorage.getItem(`post_stats_${slug}`);
    let currentStats = savedStats ? JSON.parse(savedStats) : { likes: 0, views: 0, liked: false };
    currentStats.likes = newLikes;
    currentStats.liked = newLiked;
    localStorage.setItem(`post_stats_${slug}`, JSON.stringify(currentStats));
  };

  return (
    <div className="flex items-center gap-6 py-6 border-y border-dashed border-neutral-300 dark:border-white/10 text-neutral-500 dark:text-neutral-400">
      <button 
        onClick={handleLike}
        className={cn(
          "flex items-center gap-2 px-4 py-1.5 rounded-full border border-dashed transition-all active:scale-95 group",
          hasLiked 
            ? "border-pink-500/50 bg-pink-500/10 text-pink-500" 
            : "border-neutral-300 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:border-pink-400/50 hover:bg-pink-500/5"
        )}
      >
        <Heart 
          className={cn(
            "w-4 h-4 transition-transform group-hover:scale-110", 
            hasLiked ? "fill-pink-500" : "fill-none"
          )} 
        />
        <span className="text-sm font-bold">{likes}</span>
      </button>
      
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-dashed border-blue-500/30 bg-blue-500/5 text-blue-500 dark:border-blue-400/20 dark:bg-blue-400/5 dark:text-blue-400">
        <Eye className="w-4 h-4" />
        <span className="text-sm font-bold">{views.toLocaleString()}</span>
      </div>
    </div>
  );
}
