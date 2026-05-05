"use client";

import { GitHubCalendar } from "@/components/ui/git-hub-calendar";

type Day = {
  date: string;
  contributionCount: number;
  color: string;
};

type Week = {
  firstDay: string;
  contributionDays: Day[];
};

export default function GithubHeatmap({
  weeks,
  total,
}: {
  weeks: Week[];
  total: number;
}) {
  // Convert GitHub GraphQL shape → GitHubCalendar shape
  const data = weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
    }))
  );

  return (
    <GitHubCalendar
      data={data}
      total={total}
    />
  );
}