import { cn } from "@/lib/utils";
import { useState } from "react";

export const SoftYellowGlow = () => {
  return (
   <div className="min-h-screen w-full relative bg-white dark:bg-neutral-950">
      {/* Soft Yellow Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, #FFF991 0%, transparent 70%)
          `,
          opacity: 0.6,
          mixBlendMode: "multiply",
        }}
      />
     {/* Your Content/Components */}
    </div>
  );
};

export const DiagonalGrid = () => {
  return (
    <div className="min-h-screen w-full bg-[#fafafa] dark:bg-neutral-900 relative text-gray-900 dark:text-gray-100">
    {/* Diagonal Grid with Light */}
    <div
      className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-40"
      style={{
        backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
        `,
        backgroundSize: "40px 40px",
      }}
    />
    {/* Your Content/Components */}
  </div>
  );
};
