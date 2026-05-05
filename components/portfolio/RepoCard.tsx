"use client";

import { Github, Terminal, Star, GitFork, ExternalLink } from "lucide-react";

const languageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

export default function RepoCard({ repo }: { repo: any }) {
  return (
    <div className="group relative flex flex-col gap-3 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md hover:border-neutral-300 dark:hover:border-white/20 focus-within:ring-2 focus-within:ring-neutral-300 dark:focus-within:ring-white/20 overflow-hidden">

      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"1.2\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.8\"/></svg>')",
        }}
      />

      {/* FULL CARD CLICK */}
      <a
        href={repo.url ?? repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${repo.name} on GitHub`}
        className="absolute inset-0 z-0 focus:outline-none"
      />

      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-md border-2 border-black dark:border-white/80">
            <Terminal className="size-4 text-neutral-800 dark:text-neutral-200" />
          </div>

          <h3 className="font-medium text-base text-neutral-800 dark:text-neutral-50">
            {repo.name}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {typeof (repo.stars ?? repo.stargazers_count) === "number" && (
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-neutral-300 dark:border-white/10 px-2 py-0.5 text-xs font-semibold text-neutral-600 dark:text-neutral-300 bg-white/60 dark:bg-white/5">
              <Star className="size-3" />
              {repo.stars ?? repo.stargazers_count}
            </span>
          )}

          <a
            href={repo.url ?? repo.html_url}
            target="_blank"
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <Github className="size-5" />
          </a>

          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <ExternalLink className="size-5" />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2.5 relative z-10">
        <p className="text-neutral-600 dark:text-neutral-200 text-sm leading-6">
          {repo.description || "No description provided."}
        </p>

        {/* Tech */}
        <ul className="flex gap-1 flex-wrap">
          {(repo.tech?.length ? repo.tech : repo.language ? [repo.language] : []).map((t: string, i: number) => (
            <li
              key={i}
              className="text-xs font-semibold text-orange-500 bg-orange-50 dark:bg-orange-500/10 px-2 py-0.5 rounded-md"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Meta (GitHub style) */}
      <div className="mt-2 flex items-center gap-4 text-sm text-neutral-500 relative z-10">
        {repo.language && (
          <div className="flex items-center gap-1">
            <span
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor: languageColors[repo.language] || "#ccc",
              }}
            />
            <span>{repo.language}</span>
          </div>
        )}

        <div className="flex items-center gap-1">
          <Star className="size-4" />
          <span className="font-semibold text-neutral-600 dark:text-neutral-300">{repo.stars ?? repo.stargazers_count}</span>
        </div>

        <div className="flex items-center gap-1">
          <GitFork className="size-4" />
          <span className="font-semibold text-neutral-600 dark:text-neutral-300">{repo.forks ?? repo.forks_count}</span>
        </div>
      </div>
    </div>
  );
}