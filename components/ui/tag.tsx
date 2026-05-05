import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        // Primary: Lime green accent (main design language)
        primary:
          "bg-[#EEF2CD] text-neutral-900 border border-dashed border-neutral-400/40 shadow-sm hover:opacity-90 dark:bg-[#3b4224] dark:text-white dark:border-[#555d38]",
        // Secondary: Muted lime (alternative)
        secondary:
          "bg-lime-50 text-neutral-700 border border-lime-200 hover:bg-lime-100 dark:bg-lime-500/10 dark:text-lime-300 dark:border-lime-500/40 dark:hover:bg-lime-500/20",
        // Neutral: Gray accent (for metadata/skills)
        neutral:
          "bg-neutral-200 text-neutral-700 border border-neutral-300 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-300 dark:border-neutral-600 dark:hover:bg-neutral-600",
        // Outline: Minimal style
        outline:
          "border border-neutral-300 text-neutral-600 bg-transparent hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-400 dark:hover:bg-white/5",
        // Footer: Custom footer tag styling
        footer:
          "bg-[#e7e9b5] text-[#2a2a2a] border border-[#d6d9a3] hover:opacity-90 dark:bg-[#e7e9b5]/20 dark:text-[#e7e9b5] dark:border-[#e7e9b5]/30",
      },
      size: {
        // Small: For blog tags, metadata
        sm: "px-2 py-1 text-xs",
        // Medium: Default tag size
        md: "px-2.5 py-1.5 text-sm",
        // Large: For prominent tags
        lg: "px-3 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
  VariantProps<typeof tagVariants> {
  asChild?: boolean;
  href?: string;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size, href, asChild, ...props }, ref) => {
    const Component = href ? "a" : asChild ? "span" : "span";

    return (
      <Component
        ref={ref as any}
        className={cn(tagVariants({ variant, size, className }))}
        href={href}
        target={href ? "_blank" : undefined}
        rel={href ? "noopener noreferrer" : undefined}
        {...props}
      />
    );
  }
);

Tag.displayName = "Tag";

export { Tag, tagVariants, type TagProps };
