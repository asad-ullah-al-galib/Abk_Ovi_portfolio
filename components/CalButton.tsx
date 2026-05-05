"use client";

import { CalendarPlus } from "lucide-react";

const calButtonProps = {
  "data-cal-link": "connectwithshuvo/30min",
  "data-cal-namespace": "30min",
  "data-cal-config":
    '{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}',
  type: "button" as const
};

export default function CalButton({
  className = "",
  label = "Book a Call",
}) {
  return (
    <button
      className={`inline-flex items-center gap-2 ${className}`}
      {...calButtonProps}
    >
      <CalendarPlus className="size-5" />
      <span>{label}</span>
    </button>
  );
}