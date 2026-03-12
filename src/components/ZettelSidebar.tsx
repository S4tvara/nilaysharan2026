"use client";

import { cn } from "@/lib/utils";

type Props = {
  nodes?: Array<{ id: string; label?: string }>;
  themes?: string[];
  topics?: string[];
  activeFilter?: string | null;
  onFilter?: (value: string | null, type: "theme" | "topic") => void;
  themeCounts?: Record<string, number>;
  topicCounts?: Record<string, number>;
  pathSource?: string | null;
  pathTarget?: string | null;
  path?: string[];
  onSourceChange?: (value: string | null) => void;
  onTargetChange?: (value: string | null) => void;
  onClearPath?: () => void;
  onSurprisePath?: () => void;
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
  nodes = [],
  themes = [],
  topics = [],
  activeFilter = null,
  onFilter,
  themeCounts = {},
  topicCounts = {},
  pathSource = null,
  pathTarget = null,
  path = [],
  onSourceChange,
  onTargetChange,
  onClearPath,
  onSurprisePath,
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

      <div className="px-5 py-3 border-t border-zinc-800/40">
        <p className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2">
          Warp Path
        </p>

        <div className="space-y-2">
          <select
            value={pathSource ?? ""}
            onChange={(e) => onSourceChange?.(e.target.value || null)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300"
          >
            <option value="">From note...</option>
            {nodes.map((node) => (
              <option key={`source-${node.id}`} value={node.id}>
                {node.label ?? node.id}
              </option>
            ))}
          </select>

          <select
            value={pathTarget ?? ""}
            onChange={(e) => onTargetChange?.(e.target.value || null)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300"
          >
            <option value="">To note...</option>
            {nodes.map((node) => (
              <option key={`target-${node.id}`} value={node.id}>
                {node.label ?? node.id}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            onClick={onSurprisePath}
            className="text-[11px] px-2 py-1 rounded bg-fuchsia-900/40 text-fuchsia-200 hover:bg-fuchsia-800/50"
          >
            Blow my mind
          </button>

          <button
            onClick={onClearPath}
            className="text-[11px] px-2 py-1 rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
          >
            Clear
          </button>
        </div>

        <p className="mt-2 text-[11px] text-zinc-500">
          {path.length > 1
            ? `${path.length - 1} jumps · ${path.join(" → ")}`
            : "Pick two notes to reveal shortest thought bridge."}
        </p>
      </div>
    </aside>
  );
}
