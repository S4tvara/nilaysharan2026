"use client";

import { cn } from "@/lib/utils";

type Props = {
  themes?: string[];
  topics?: string[];
  activeFilter?: string | null;
  onFilter?: (value: string | null, type: "theme" | "topic") => void;
  themeCounts?: Record<string, number>;
  topicCounts?: Record<string, number>;
};

const dummyThemes = ["Systems", "Strategy", "Tech", "Infra", "Security", "AI"];
const dummyTopics = [
  "Storage",
  "Distributed",
  "Game Theory",
  "Reliability",
  "Protocols",
  "Design",
];

export default function ZettelSidebar({
  themes = [],
  topics = [],
  activeFilter = null,
  onFilter,
  themeCounts = {},
  topicCounts = {},
}: Props) {
  const themeList = themes.length ? themes : dummyThemes;
  const topicList = topics.length ? topics : dummyTopics;

  return (
    <aside
      className={cn(
        "w-72 shrink-0 bg-zinc-950 border-r border-zinc-800/40",
        "text-sm leading-relaxed overflow-y-auto",
        "[&::-webkit-scrollbar]:w-1.5",
        "[&::-webkit-scrollbar-thumb]:bg-zinc-800/50",
        "[&::-webkit-scrollbar-track]:bg-zinc-950",
        "scrollbar-thin scrollbar-thumb-zinc-800/40 scrollbar-track-zinc-950"
      )}
    >
      {/* Header */}
      <div className="px-5 py-3">
        <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium text-center">
          Knowledge Map
        </p>
      </div>

      {/* Themes */}
      <div className="px-5 py-3">
        <p className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 text-center">
          Themes
        </p>

        <div className="grid grid-cols-3 gap-2">
          {themeList.map((t) => {
            const isActive = activeFilter === t;
            const count = themeCounts[t] ?? 0;

            return (
              <button
                key={t}
                onClick={() => onFilter?.(t, "theme")}
                className={cn(
                  "text-[12px] px-2 py-1 rounded text-center truncate",
                  isActive
                    ? "bg-cyan-900/40 text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                )}
              >
                {t}
                {count > 0 && (
                  <span className="ml-1 text-[10px] text-zinc-600">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Topics */}
      <div className="px-5 py-3">
        <p className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 text-center">
          Topics
        </p>

        <div className="grid grid-cols-3 gap-2">
          {topicList.map((t) => {
            const isActive = activeFilter === t;
            const count = topicCounts[t] ?? 0;

            return (
              <button
                key={t}
                onClick={() => onFilter?.(t, "topic")}
                className={cn(
                  "text-[12px] px-2 py-1 rounded text-center truncate",
                  isActive
                    ? "bg-violet-900/40 text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                )}
              >
                {t}
                {count > 0 && (
                  <span className="ml-1 text-[10px] text-zinc-600">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Core Notes */}
      <div className="px-5 py-3">
        <p className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2">
          Core Notes
        </p>

        <div className="space-y-1 text-zinc-300 text-[13px]">
          <button className="block w-full text-left hover:text-zinc-100">
            Sietch Vault
          </button>

          <button className="block w-full text-left hover:text-zinc-100">
            Octoguard
          </button>
        </div>
      </div>
    </aside>
  );
}