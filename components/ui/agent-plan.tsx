"use client";

import React from "react";
import {
  CheckCircle2,
  Circle,
  CircleDotDashed,
  Trophy,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { SkillTag } from "@/components/ui/skill-tag";


// Type definitions
export interface Subtask {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  tools?: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  level: number;
  dependencies: string[];
  subtasks: Subtask[];
  dateRange?: string;
  institution?: string;
  tools?: string[];
  icon?: React.ReactNode;
}

export default function Plan({ tasks: initialTasks, variant }: { tasks: Task[], variant?: "experience" | "education" | "skills" | "awards" }) {
  const tasks = initialTasks;
  const [expandedTasks, setExpandedTasks] = React.useState<Set<string>>(new Set());

  const toggleTask = (taskId: string) => {
    const newSet = new Set(expandedTasks);
    if (newSet.has(taskId)) newSet.delete(taskId);
    else newSet.add(taskId);
    setExpandedTasks(newSet);
  };
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const taskVariants: any = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : -5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: prefersReducedMotion ? "tween" : "spring", stiffness: 500, damping: 30 }
    }
  };

  const subtaskListVariants: any = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.25, staggerChildren: 0.05, when: "beforeChildren", ease: [0.2, 0.65, 0.3, 0.9] }
    }
  };

  return (
    <div className="text-foreground h-full overflow-visible p-1">
      <motion.div
        className="bg-white/40 dark:bg-white/[0.02] border-border rounded-2xl border border-dashed shadow-sm overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <LayoutGroup>
          <div className="p-5 md:p-8 overflow-hidden">
            <ul className="relative space-y-4 overflow-hidden text-left">
              {/* Vertical Progress Line */}
              <div className="absolute top-4 bottom-4 left-[20px] md:left-[28px] border-l-2 border-dashed border-neutral-300 dark:border-neutral-800" />

              {tasks.map((task, index) => {
                const isExpanded = true;
                const isCompleted = task.status === "completed";
                const isInProgress = task.status === "in-progress";

                return (
                  <motion.li
                    key={task.id}
                    className="relative"
                    initial="hidden"
                    animate="visible"
                    variants={taskVariants}
                  >
                    {/* Task row */}
                    <div className="flex items-start gap-4 md:gap-6 group">
                      {/* Indicator */}
                      <div className="relative z-10 flex-shrink-0 w-10 md:w-14 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={task.status}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10"
                          >
                            {/* Base circle background */}
                            <div className="absolute inset-0 bg-white dark:bg-neutral-900 rounded-full shadow-sm ring-4 ring-neutral-50/50 dark:ring-white/5 border border-neutral-100 dark:border-neutral-800" />

                            {(() => {
                              const isAwards = variant === "awards";
                              const isSkills = variant === "skills";
                              const isActive = isInProgress || isCompleted || isAwards || isSkills;

                              if (!isActive) {
                                return (
                                  <div className="relative z-10 bg-neutral-100 dark:bg-neutral-800 rounded-full p-1.5">
                                    <Circle className="h-4 w-4 md:h-5 md:w-5 text-neutral-400 dark:text-neutral-600" />
                                  </div>
                                );
                              }

                              // Determine colors based on status and variant with increased visibility
                              const ringColor = isAwards ? "border-amber-500/60" : isCompleted ? "border-emerald-500/60" : "border-blue-500/70";
                              const ringColorInner = isAwards ? "border-amber-500/80" : isCompleted ? "border-emerald-500/80" : "border-blue-500/100";
                              const iconColor = isAwards ? "text-amber-500 dark:text-amber-300" : isCompleted ? "text-emerald-500 dark:text-emerald-400" : "text-blue-500 dark:text-blue-300";
                              const iconGlow = isAwards ? "drop-shadow-[0_0_4px_rgba(245,158,11,0.4)]" : isCompleted ? "drop-shadow-[0_0_4px_rgba(16,185,129,0.4)]" : "drop-shadow-[0_0_4px_rgba(59,130,246,0.4)]";
                              const rippleColor = isAwards ? "bg-amber-400/20" : isCompleted ? "bg-emerald-400/20" : "bg-blue-400/20";

                              return (
                                <div className="relative flex items-center justify-center w-full h-full">
                                  {/* Concentric dashed rings - Always animate for an "alive" roadmap feel */}
                                  <div className={`absolute w-[90%] h-[90%] rounded-full border border-dashed ${ringColor} animate-[spin_10s_linear_infinite]`} />
                                  <div className={`absolute w-[60%] h-[60%] rounded-full border border-dashed ${ringColorInner} animate-[spin_6s_linear_infinite_reverse]`} />

                                  {/* Center content */}
                                  <div className={`relative z-10 ${iconColor} ${iconGlow} scale-90 md:scale-100 transition-all duration-300`}>
                                    {task.icon || (isAwards ? <Trophy className="h-4 w-4 md:h-5 md:w-5" /> : isCompleted ? <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5" /> : <div className="w-1.5 h-1.5 bg-current rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" />)}
                                  </div>

                                  {/* Subtle pulse (Ripple Effect) - Only for in-progress/ongoing items */}
                                  {isInProgress && (
                                    <div className={`absolute inset-0 rounded-full ${rippleColor} animate-ping opacity-30`} />
                                  )}
                                </div>
                              );
                            })()}
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Content */}
                      <div
                        className="flex-grow transition-all"
                      >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4">
                          <div className="flex flex-col gap-1 flex-grow min-w-0">
                            {task.dateRange && (
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-white/5 px-1.5 py-0.5 rounded">
                                  {task.dateRange}
                                </span>
                              </div>
                            )}
                            <div className={`${variant !== "skills" ? "grid grid-cols-[1fr_auto] items-center gap-x-3" : "flex"} w-full`}>
                              <h3 className="text-base md:text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100 break-words min-w-0">
                                {task.title}
                              </h3>
                              {/* Mobile Status Tag */}
                              {variant !== "skills" && (
                                <span className={`md:hidden flex-shrink-0 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border border-dashed whitespace-nowrap ${isCompleted
                                  ? "bg-green-500/15 text-green-700 border-green-500/40 dark:bg-green-500/20 dark:text-green-400"
                                  : isInProgress
                                    ? "bg-blue-500/15 text-blue-700 border-blue-500/40 dark:bg-blue-500/20 dark:text-blue-400 animate-pulse"
                                    : "bg-neutral-200 text-neutral-600 border-neutral-300 dark:bg-white/10 dark:text-neutral-300 dark:border-white/20"
                                  }`}>
                                  {task.status === "completed"
                                    ? (variant === "education" ? "graduated" : variant === "awards" ? "awarded" : task.status)
                                    : task.status === "in-progress"
                                      ? (variant === "education" || variant === "experience" ? "ongoing" : task.status)
                                      : task.status
                                  }
                                </span>
                              )}
                            </div>
                            {task.institution && (
                              <p className="text-sm font-medium text-theme-accent dark:text-theme-main opacity-90">
                                {task.institution}
                              </p>
                            )}
                          </div>

                          {/* Desktop Status Tag */}
                          {variant !== "skills" && (
                            <div className="hidden md:flex items-center gap-2 self-center">
                              <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border border-dashed whitespace-nowrap ${isCompleted
                                ? "bg-green-500/15 text-green-700 border-green-500/40 dark:bg-green-500/20 dark:text-green-400"
                                : isInProgress
                                  ? "bg-blue-500/15 text-blue-700 border-blue-500/40 dark:bg-blue-500/20 dark:text-blue-400 animate-pulse"
                                  : "bg-neutral-200 text-neutral-600 border-neutral-300 dark:bg-white/10 dark:text-neutral-300 dark:border-white/20"
                                }`}>
                                {task.status === "completed"
                                  ? (variant === "education" ? "graduated" : variant === "awards" ? "awarded" : task.status)
                                  : task.status === "in-progress"
                                    ? (variant === "education" || variant === "experience" ? "ongoing" : task.status)
                                    : task.status
                                }
                              </span>
                            </div>
                          )}
                        </div>

                        <p className="mt-2 text-sm font-light text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                          {task.description}
                        </p>

                        {task.tools && task.tools.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {task.tools.map((tool) => (
                              <SkillTag key={tool} variant="primary" size="sm" className="text-[10px] py-0.5 px-2 h-auto min-h-0">
                                {tool}
                              </SkillTag>
                            ))}
                          </div>
                        )}

                        {/* Nested Subtasks - Collapsible */}
                        {task.subtasks.length > 0 && (
                          <div className="mt-4">
                            <button
                              onClick={() => toggleTask(task.id)}
                              className="flex items-center gap-2 group/toggle py-1"
                            >
                              <span className="text-[10px] font-bold uppercase tracking-wider text-theme-accent group-hover/toggle:text-theme-main transition-colors">
                                {expandedTasks.has(task.id) ? "Hide Details" : "View Details"}
                              </span>
                              <motion.div
                                animate={{ rotate: expandedTasks.has(task.id) ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="size-3 text-theme-accent group-hover/toggle:text-theme-main" />
                              </motion.div>
                            </button>

                            <AnimatePresence>
                              {expandedTasks.has(task.id) && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-4 space-y-3 pl-2 border-l-2 border-dotted border-neutral-200 dark:border-neutral-800">
                                    {task.subtasks.map((subtask) => (
                                      <div key={subtask.id} className="group/sub">
                                        <div className="flex items-center gap-3">
                                          {subtask.status === "completed" ? (
                                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                                          ) : (
                                            <CircleDotDashed className="h-3.5 w-3.5 text-blue-400" />
                                          )}
                                          <h4 className={`text-sm font-semibold ${subtask.status === "completed" ? "text-neutral-500" : "text-neutral-700 dark:text-neutral-300"}`}>
                                            {subtask.title}
                                          </h4>
                                        </div>
                                        <p className="ml-6.5 mt-1 text-xs font-light text-neutral-500 dark:text-neutral-400">
                                          {subtask.description}
                                        </p>
                                        {subtask.tools && subtask.tools.length > 0 && (
                                          <div className="ml-6.5 mt-2 flex flex-wrap gap-1.5">
                                            {subtask.tools.map((tool) => (
                                              <SkillTag key={tool} variant="primary" size="sm" className="text-[10px] py-0 px-1.5 h-auto min-h-0">
                                                {tool}
                                              </SkillTag>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </LayoutGroup>
      </motion.div>
    </div>
  );
}
