import * as React from "react";
import { Tag, TagProps } from "./tag";
import { getToolIcon } from "@/lib/tool-icons";
import { cn } from "@/lib/utils";

export interface SkillTagProps extends TagProps {
  tool?: string;
}

export function SkillTag({ tool, children, className, ...props }: SkillTagProps) {
  const toolName = tool || (typeof children === "string" ? children : "");
  const icon = getToolIcon(toolName);

  return (
    <Tag 
      {...props} 
      className={cn("inline-flex items-center gap-1.5", className)}
    >
      {icon}
      {children || tool}
    </Tag>
  );
}
