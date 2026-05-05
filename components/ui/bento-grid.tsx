"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { SkillTag } from "@/components/ui/skill-tag";
import Link from "next/link";

export interface BentoItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    status?: string;
    tags?: React.ReactNode[];
    meta?: string;
    cta?: string;
    colSpan?: number;
    hasPersistentHover?: boolean;
    href?: string;
    className?: string;
}

interface BentoGridProps {
    items: BentoItem[];
    className?: string;
    size?: "xs" | "sm" | "md" | "lg";
    hideExtras?: boolean;
    variant?: "grid" | "menu";
    rounded?: boolean;
}

function BentoGrid({ items, className, size = "md", hideExtras = false, variant = "grid", rounded = false }: BentoGridProps) {
    return (
        <div className={cn(
            "w-full",
            variant === "grid"
                ? (rounded
                    ? cn("grid grid-cols-1 md:grid-cols-3 gap-6", size === "xs" && "gap-4")
                    : "grid grid-cols-1 md:grid-cols-3 border-t border-l border-dashed border-neutral-400/40 dark:border-white/15")
                : "grid grid-cols-1 md:grid-cols-2 gap-3 p-3",
            className
        )}>
            {items.map((item, index) => {
                const content = (
                    <>
                        {variant === "grid" && (
                            <div
                                className={`absolute inset-0 ${item.hasPersistentHover
                                    ? "opacity-100"
                                    : "opacity-0 group-hover:opacity-100"
                                    } transition-opacity duration-300`}
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:4px_4px]" />
                            </div>
                        )}

                        {variant === "menu" ? (
                            <>
                                <div className="mt-1 w-10 h-10 shrink-0 rounded-lg flex items-center justify-center bg-black/5 dark:bg-white/10 group-hover:bg-[#e3fb71] transition-all duration-300 text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-900">
                                    {item.icon}
                                </div>
                                <div className="flex-grow space-y-1">
                                    <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 tracking-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-[12px] text-gray-600 dark:text-gray-300 leading-snug font-medium line-clamp-2">
                                        {item.description}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="relative flex flex-col space-y-3 h-full w-full">
                                <div className="flex items-center justify-between">
                                    <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                                        {/* Radar Background Style */}
                                        <div className="absolute inset-0 bg-white dark:bg-neutral-900 rounded-full shadow-sm ring-4 ring-neutral-50/50 dark:ring-white/5 border border-neutral-100 dark:border-neutral-800 transition-all duration-300 group-hover:ring-orange-500/10" />
                                        
                                        {/* Concentric rings */}
                                        <div className="absolute w-[90%] h-[90%] rounded-full border border-dashed border-orange-400/20 group-hover:border-orange-400/40 group-hover:animate-[spin_10s_linear_infinite] transition-all duration-300" />
                                        <div className="absolute w-[60%] h-[60%] rounded-full border border-dashed border-orange-400/30 group-hover:border-orange-400/50 group-hover:animate-[spin_6s_linear_infinite_reverse] transition-all duration-300" />
                                        
                                        <div className={cn("relative z-10 transition-colors duration-300 scale-90 md:scale-110", !item.className ? "text-neutral-700 dark:text-neutral-300 group-hover:text-orange-500" : "text-inherit")}>
                                            {item.icon}
                                        </div>
                                    </div>
                                    {item.status && (
                                        <span
                                            className={cn(
                                                "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm",
                                                "bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300",
                                                "transition-colors duration-300 group-hover:bg-black/10 dark:group-hover:bg-white/20"
                                            )}
                                        >
                                            {item.status}
                                        </span>
                                    )}
                                </div>

                                <div className={cn("space-y-2 flex-grow", size === "sm" || size === "xs" ? "space-y-1" : "space-y-2")}>
                                    <h3 className={cn("font-medium tracking-tight", !item.className && "text-gray-900 dark:text-gray-100 group-hover:text-orange-500 transition-colors duration-300", size === "xs" ? "text-sm" : size === "sm" ? "text-sm" : "text-[15px]")}>
                                        {item.title}
                                        {item.meta && (
                                            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 font-normal">
                                                {item.meta}
                                            </span>
                                        )}
                                    </h3>
                                    <p className={cn("leading-snug font-[425]", !item.className && "text-gray-600 dark:text-gray-300", size === "sm" || size === "xs" ? "text-xs line-clamp-2" : "text-sm")}>
                                        {item.description}
                                    </p>
                                </div>

                                {!hideExtras && (
                                    <div className="flex items-center justify-between mt-auto pt-2">
                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                            {item.tags?.map((tag, i) => (
                                                <SkillTag key={i} variant="primary" size="sm">
                                                    {tag}
                                                </SkillTag>
                                            ))}
                                        </div>
                                        <span className={cn("text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-2", !item.className && "text-gray-500 dark:text-gray-400")}>
                                            {item.cta || "Explore →"}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                );

                const commonClassName = cn(
                    "group relative transition-all duration-300 flex",
                    item.className || "bg-white dark:bg-black",
                    variant === "grid" ? [
                        "flex-col",
                        rounded
                            ? "rounded-xl border border-neutral-200 dark:border-white/10 shadow-[0_2px_15px_-3px_rgba(163,230,53,0.07)] dark:shadow-[0_4px_20px_-5px_rgba(163,230,53,0.1)] hover:shadow-[0_0_40px_-15px_rgba(163,230,53,0.15)]"
                            : "border-r border-b border-dashed border-neutral-400/40 dark:border-white/15",
                        "hover:bg-lime-500/[0.02] dark:hover:bg-lime-500/[0.03]",
                        item.colSpan === 2 ? "md:col-span-2" : item.colSpan === 3 ? "md:col-span-3" : "col-span-1",
                        size === "xs" ? "p-3" : size === "sm" ? "p-4" : size === "lg" ? "p-10" : "p-8"
                    ] : [
                        "flex-row items-start gap-4 p-4 rounded-xl border border-neutral-200 dark:border-white/10 shadow-[0_2px_15px_-3px_rgba(163,230,53,0.07)] dark:shadow-[0_4px_20px_-5px_rgba(163,230,53,0.1)]",
                        "hover:bg-lime-500/[0.02] dark:hover:bg-lime-500/[0.03] hover:shadow-[0_0_40px_-15px_rgba(163,230,53,0.15)]",
                        "transition-all duration-300"
                    ]
                );

                if (item.href) {
                    return (
                        <Link
                            key={index}
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className={commonClassName}
                        >
                            {content}
                        </Link>
                    );
                }

                return (
                    <div key={index} className={commonClassName}>
                        {content}
                    </div>
                );
            })}
        </div>
    );
}

export { BentoGrid };
