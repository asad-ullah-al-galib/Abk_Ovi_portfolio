"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "group flex size-11 items-center justify-center rounded-full bg-neutral-200 text-neutral-600 transition hover:bg-neutral-300 dark:bg-white/10 dark:text-neutral-300 dark:hover:bg-white/20 border border-neutral-400/20 dark:border-white/10 shadow-sm",
        className
      )}
    >
      {isDark ? (
        <Sun className="size-5 text-white transition-colors group-hover:fill-orange-500 group-hover:text-orange-500" />
      ) : (
        <Moon className="size-5 fill-slate-700 text-slate-700 transition-colors dark:fill-neutral-300 dark:text-neutral-300" />
      )}
    </button>
  );
}
