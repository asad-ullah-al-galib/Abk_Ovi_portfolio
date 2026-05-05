import React from "react";
import {
  FileCode2,
  Terminal,
  Cpu,
  FileText,
  Binary,
  Table2,
  Brain,
  Users,
  MessageCircle,
  Clock,
  Search,
  Variable,
  Database,
  Github,
  GitBranch,
  Layers,
  Layout,
  Lightbulb,
  PieChart,
  Zap,
  Activity,
  Globe,
  Settings,
  Code2,
  Box,
  LineChart,
  BrainCircuit,
  MessageSquare,
  Wrench,
  FlaskConical,
  BarChart3,
  Atom,
  Wind,
  Layers3,
  Server,
  Figma,
  Type
} from "lucide-react";

export const getToolIcon = (tool: string) => {
  const t = tool.toLowerCase();
  if (t.includes("python")) return <FileCode2 className="size-3 text-blue-500" />;
  if (t.includes("c++") || t.includes("c ") || t === "c") return <Terminal className="size-3 text-slate-500" />;
  if (t.includes("r") && t.length < 3) return <PieChart className="size-3 text-blue-600" />;
  if (t.includes("fortran")) return <Cpu className="size-3 text-emerald-600" />;
  if (t.includes("latex")) return <FileText className="size-3 text-emerald-500" />;
  if (t.includes("math")) return <Variable className="size-3 text-purple-500" />;
  if (t.includes("numpy") || t.includes("binary")) return <Binary className="size-3 text-blue-400" />;
  if (t.includes("pandas") || t.includes("table")) return <Table2 className="size-3 text-blue-800" />;
  if (t.includes("scikit") || t.includes("brain") || t.includes("machine learning")) return <Brain className="size-3 text-orange-500" />;
  if (t.includes("teamwork") || t.includes("users")) return <Users className="size-3 text-blue-400" />;
  if (t.includes("communication") || t.includes("message")) return <MessageCircle className="size-3 text-emerald-400" />;
  if (t.includes("time management") || t.includes("clock")) return <Clock className="size-3 text-neutral-400" />;
  if (t.includes("research") || t.includes("search")) return <Search className="size-3 text-neutral-500" />;
  if (t.includes("database") || t.includes("sql") || t.includes("postgres")) return <Database className="size-3 text-blue-500" />;
  if (t.includes("github")) return <Github className="size-3 text-neutral-800 dark:text-neutral-200" />;
  if (t.includes("git")) return <GitBranch className="size-3 text-orange-600" />;
  if (t.includes("vercel") || t.includes("deploy") || t.includes("zap")) return <Zap className="size-3 text-yellow-500" />;
  if (t.includes("problem solving") || t.includes("lightbulb")) return <Lightbulb className="size-3 text-yellow-400" />;
  if (t.includes("react") && !t.includes("native")) return <Atom className="size-3 text-blue-400" />;
  if (t.includes("next.js") || t.includes("nextjs")) return <Globe className="size-3 text-neutral-900 dark:text-neutral-100" />;
  if (t.includes("tailwind")) return <Wind className="size-3 text-cyan-400" />;
  if (t.includes("typescript") || t.includes("ts")) return <Type className="size-3 text-blue-500" />;
  if (t.includes("figma")) return <Figma className="size-3 text-purple-500" />;
  if (t.includes("node")) return <Server className="size-3 text-emerald-500" />;
  if (t.includes("modeling") || t.includes("analysis")) return <BarChart3 className="size-3 text-theme-accent" />;

  return <Box className="size-3 text-neutral-400" />; // Default icon
};
