import { type ReactNode } from "react";

export function PatternBand({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative border-y border-dashed border-neutral-400/20 dark:border-white/10 overflow-hidden ${className}`}
    >
      {/* Base Layer */}
      <div className="absolute inset-0 bg-white dark:bg-neutral-950 -z-10" />

      {/* Diagonal Grid - Theme Accent Color */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, oklch(var(--text-theme-accent) / 0.4) 0, oklch(var(--text-theme-accent) / 0.4) 1px, transparent 1px, transparent 20px),
            repeating-linear-gradient(-45deg, oklch(var(--text-theme-accent) / 0.4) 0, oklch(var(--text-theme-accent) / 0.4) 1px, transparent 1px, transparent 20px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Tight Padding */}
      <div className="relative mx-auto max-w-site min-h-[60px] flex flex-col items-center justify-center px-1 py-1 z-10">
        {children}
      </div>
    </div>
  );
}

export function SectionHeading({
  title,
  description,
  highlight
}: {
  title: string;
  description: string;
  highlight?: boolean;
}) {
  return (
    <div className="text-center py-2">
      <h2
        className={`inline-flex items-center gap-2 text-[13pt] font-black uppercase leading-none text-theme-dark dark:text-theme-light ${highlight ? "bg-sky-200 px-1" : ""
          }`}
      >
        {title}
      </h2>
      <p className="mt-1 text-base font-medium text-neutral-500 dark:text-neutral-300">
        {description}
      </p>
    </div>
  );
}
