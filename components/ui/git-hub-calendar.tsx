"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  format,
  subDays,
  addDays,
  addMonths,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";

interface ContributionDay {
  date: string; // ISO date string e.g. "2025-09-13"
  count: number;
}

interface GitHubCalendarProps {
  data: ContributionDay[];
  total?: number;
  colors?: string[];
}

export function GitHubCalendar({
  data,
  total,
  colors,
}: GitHubCalendarProps) {
  const [contributions, setContributions] = useState<ContributionDay[]>(data);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setContributions(data);
  }, [data]);

  const isDark = mounted && resolvedTheme === "dark";
  
  // Default GitHub colors
  const defaultLightColors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
  const defaultDarkColors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
  
  const themeColors = colors || (isDark ? defaultDarkColors : defaultLightColors);
  const emptyColor = themeColors[0];

  const today = new Date();
  const startDate = subDays(today, 364);
  const weeks = 53;

  const getColor = (count: number) => {
    if (count === 0) return themeColors[0];
    if (count <= 2) return themeColors[1];
    if (count <= 5) return themeColors[2];
    if (count <= 9) return themeColors[3];
    return themeColors[4] ?? themeColors[themeColors.length - 1];
  };

  const renderWeeks = () => {
    const weeksArray = [];
    let currentWeekStart = startOfWeek(startDate, { weekStartsOn: 0 });

    for (let i = 0; i < weeks; i++) {
      const weekDays = eachDayOfInterval({
        start: currentWeekStart,
        end: endOfWeek(currentWeekStart, { weekStartsOn: 0 }),
      });

      weeksArray.push(
        <div key={i} className="flex flex-1 flex-col gap-[2px]">
          {weekDays.map((day, index) => {
            const contribution = contributions.find((c) =>
              isSameDay(new Date(c.date), day)
            );
            const count = contribution?.count ?? 0;
            const isEmpty = count === 0;
            const bgColor = isEmpty ? emptyColor : getColor(count);
            return (
              <div
                key={index}
                className="w-full aspect-square rounded-[2px] transition-all duration-150 hover:scale-110 border border-black/5 dark:border-white/5"
                style={{ backgroundColor: bgColor }}
                title={`${format(day, "MMM d, yyyy")}: ${count} contribution${count !== 1 ? "s" : ""}`}
              />
            );
          })}
        </div>
      );
      currentWeekStart = addDays(currentWeekStart, 7);
    }

    return weeksArray;
  };

  const renderMonthLabels = () => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      const currentMonth = addMonths(startDate, i);
      months.push(
        <span key={i} className="text-[11px] text-gray-400 dark:text-gray-500">
          {format(currentMonth, "MMM")}
        </span>
      );
    }
    return months;
  };

  if (!mounted) {
    return (
      <div className="w-full">
        <div className="w-full h-[150px] animate-pulse rounded-lg bg-neutral-200 dark:bg-white/5" />
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
      <div className="min-w-[750px] w-full">
        {/* Month labels */}
        <div className="flex w-full justify-between gap-[2px] mb-2 pl-7">
          {renderMonthLabels()}
        </div>

        <div className="flex gap-2">
          {/* Day-of-week labels */}
          <div className="flex flex-col justify-between pr-1" style={{ paddingTop: "2px" }}>
            {["", "Mon", "", "Wed", "", "Fri", ""].map((day, i) => (
              <span key={i} className="text-[9px] text-gray-400 dark:text-gray-500 h-3 leading-3">
                {day}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-[2px] flex-1 justify-between">
            {renderWeeks()}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
          <span className="text-gray-900 dark:text-white font-semibold whitespace-nowrap">
            {total !== undefined ? `${total} contributions in the last year on GitHub` : ""}
          </span>
          <div className="flex items-center gap-2 justify-end">
            <span>Less</span>
            <div className="flex gap-[3px]">
              {themeColors.map((c, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-[3px] border border-black/5 dark:border-white/5"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
