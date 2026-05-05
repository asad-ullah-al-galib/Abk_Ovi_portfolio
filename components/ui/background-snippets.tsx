import { cn } from "@/lib/utils";

export const GridWithPurpleGlow = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-neutral-950 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)] opacity-40 dark:opacity-20"></div>
    </div>
  );
};

export const FadingDots = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <div
        className={cn(
          "absolute inset-0",
          "bg-[radial-gradient(oklch(var(--text-theme-accent)/0.3)_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(oklch(var(--text-theme-accent)/0.3)_1.5px,transparent_1.5px)]",
          "[background-size:24px_24px]",
          "[mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)]",
          "[-webkit-mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)]"
        )}
      />
      {/* Top Fade Overlay to blend with Header */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#f4f4f2] via-[#f4f4f2]/50 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/50 dark:to-transparent z-10" />
    </div>
  );
};
