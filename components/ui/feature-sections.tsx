import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SkillTag } from "./skill-tag";

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  tags?: string[];
  link?: string;
  accent?: string;
}

import { Code2 } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  tags?: string[];
  link?: string;
  accent?: string;
  icon?: React.ReactNode;
}

export function FeatureCard({ title, description, image, tags, link, accent, icon }: FeatureCardProps) {
  return (
    <div className="group w-full max-w-5xl transition-all duration-300">
      {/* Framed Image Container */}
      <div className="p-1.5 md:p-2 rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-white/10 dark:bg-neutral-900/40">
        <div
          className="relative overflow-hidden rounded-xl border border-neutral-300 bg-black dark:border-white/5 shadow-inner"
          style={{ aspectRatio: "1460 / 864" }}
        >
          <Image
            fill
            className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.02] group-hover:opacity-100"
            src={image}
            alt={title}
          />
          {link && (
            <Link
              href={link}
              target="_blank"
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur px-6 py-3 rounded-full text-sm font-bold text-neutral-900 shadow-2xl scale-95 group-hover:scale-100 transition-transform duration-300">
                <ExternalLink className="size-4" />
                Preview Project
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Content Area - Outside the Frame */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="size-9 md:size-10 rounded-full bg-theme-main flex items-center justify-center shrink-0 shadow-sm border border-neutral-200 dark:border-white/5">
              {icon || <Code2 className="size-4 md:size-5 text-neutral-900" />}
            </div>
            <h3 className={cn("text-sm md:text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-50 truncate", accent)}>
              {title}
            </h3>
          </div>

          {link && (
            <Link
              href={link}
              target="_blank"
              className="flex items-center gap-2 bg-neutral-200/50 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 px-4 py-2 rounded-xl text-xs font-black text-neutral-900 dark:text-white transition-all shrink-0 border border-neutral-300 dark:border-white/5"
            >
              <ExternalLink className="size-3.5" />
              Open
            </Link>
          )}
        </div>

        <div className="mt-2 space-y-3">
          <p className="text-xs font-medium leading-relaxed text-neutral-500 dark:text-neutral-400 line-clamp-2">
            {description}
          </p>
          {tags && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <SkillTag key={tag} className="text-[9px] uppercase font-black px-2 py-0.5">
                  {tag}
                </SkillTag>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FeatureSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 justify-items-center gap-y-8 md:gap-y-10">
        {children}
      </div>
    </section>
  );
}
