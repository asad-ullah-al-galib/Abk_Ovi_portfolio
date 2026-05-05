"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export default function Cursor() {
  const auraRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  // lime-300 in dark, indigo-400 in light
  const cursorColor = isDark ? "#bef264" : "#818cf8";
  const dotColor = isDark ? "#84cc16" : "#3730a3";

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let auraX = 0;
    let auraY = 0;
    let dotX = 0;
    let dotY = 0;

    const auraSpeed = 0.12;
    const dotSpeed = 0.8; // Dot tracks mouse almost instantly

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    let rafId: number;
    const animate = () => {
      auraX += (mouseX - auraX) * auraSpeed;
      auraY += (mouseY - auraY) * auraSpeed;

      dotX += (mouseX - dotX) * dotSpeed;
      dotY += (mouseY - dotY) * dotSpeed;

      if (auraRef.current) {
        auraRef.current.style.transform = `translate(${auraX}px, ${auraY}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    const elements = document.querySelectorAll(".cursor-target");

    elements.forEach((el) => {
      const element = el as HTMLElement;

      element.addEventListener("mouseenter", () => {
        const text = element.getAttribute("data-cursor") || "Open";
        setLabel(text);
        auraRef.current?.classList.add("scale-125");
      });

      element.addEventListener("mouseleave", () => {
        setLabel("");
        auraRef.current?.classList.remove("scale-125");
        element.style.transform = "translate(0px, 0px)";
      });

      element.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        element.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });
    });

    window.addEventListener("mousemove", move);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={auraRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] flex items-center justify-center will-change-transform"
      >
        {/* Outer Circle Outline */}
        <div
          className="absolute left-0 top-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-transform duration-300"
          style={{ borderColor: cursorColor }}
        />
      </div>

      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center will-change-transform"
      >
        {/* Center Dot / Label */}
        <div
          className={`absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full transition-all duration-200 flex items-center justify-center ${
            label ? 'bg-black text-white px-3 py-1 text-xs shadow-lg mix-blend-difference dark:bg-white dark:text-black' : 'h-2.5 w-2.5'
          }`}
          style={label ? undefined : { backgroundColor: dotColor }}
        >
          {label}
        </div>
      </div>
    </>
  );
}