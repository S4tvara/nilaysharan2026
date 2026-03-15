/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import Graph from "@/components/ZettelkastenGraph";
import ZettelSidebar from "@/components/ZettelSidebar";

type GraphData = {
  nodes: any[];
  links: any[];
};

function shortestPath(
  data: GraphData,
  sourceId: string,
  targetId: string
): string[] {
  if (sourceId === targetId) return [sourceId];

  const adjacency = new Map<string, Set<string>>();

  data.nodes.forEach((node) => adjacency.set(node.id, new Set()));

  data.links.forEach((link) => {
    const source =
      typeof link.source === "string" ? link.source : link.source.id;
    const target =
      typeof link.target === "string" ? link.target : link.target.id;

    if (!adjacency.has(source)) adjacency.set(source, new Set());
    if (!adjacency.has(target)) adjacency.set(target, new Set());

    adjacency.get(source)?.add(target);
    adjacency.get(target)?.add(source);
  });

  const queue = [sourceId];
  const visited = new Set([sourceId]);
  const parent = new Map<string, string | null>([[sourceId, null]]);

  while (queue.length) {
    const current = queue.shift()!;

    if (current === targetId) break;

    adjacency.get(current)?.forEach((neighbor) => {
      if (visited.has(neighbor)) return;

      visited.add(neighbor);
      parent.set(neighbor, current);
      queue.push(neighbor);
    });
  }

  if (!parent.has(targetId)) return [];

  const path: string[] = [];
  let cursor: string | null = targetId;

  while (cursor) {
    path.push(cursor);
    cursor = parent.get(cursor) ?? null;
  }

  return path.reverse();
}

export default function ZettelkastenClient({ data }: { data: GraphData }) {
  const [filter, setFilter] = useState<string | null>(null);
  const [filterType, setFilterType] =
    useState<"theme" | "topic" | null>(null);
  const [pathSource, setPathSource] = useState<string | null>(null);
  const [pathTarget, setPathTarget] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const surprisePath = () => {
    if (data.nodes.length < 2) return;

    const sourceIndex = Math.floor(Math.random() * data.nodes.length);
    let targetIndex = Math.floor(Math.random() * data.nodes.length);

    while (targetIndex === sourceIndex) {
      targetIndex = Math.floor(Math.random() * data.nodes.length);
    }

    setPathSource(data.nodes[sourceIndex].id);
    setPathTarget(data.nodes[targetIndex].id);
  };

  const clearPath = () => {
    setPathSource(null);
    setPathTarget(null);
  };

  const handleFilter = (value: string | null, type: "theme" | "topic") => {
    setFilter(value);
    setFilterType(value ? type : null);
  };

  const filteredData = useMemo(() => {
    if (!filter || !filterType) return data;

    const nodes = data.nodes.filter((n) =>
      filterType === "theme"
        ? n.themes.includes(filter)
        : n.topics.includes(filter)
    );

    const nodeSet = new Set(nodes.map((n) => n.id));

    const links = data.links.filter((l) => {
      const source = typeof l.source === "string" ? l.source : l.source.id;
      const target = typeof l.target === "string" ? l.target : l.target.id;

      return nodeSet.has(source) && nodeSet.has(target);
    });

    return { nodes, links };
  }, [data, filter, filterType]);

  const path = useMemo(() => {
    if (!pathSource || !pathTarget) return [];
    return shortestPath(data, pathSource, pathTarget);
  }, [data, pathSource, pathTarget]);

  const themes = [...new Set(data.nodes.flatMap((n) => n.themes))];
  const topics = [...new Set(data.nodes.flatMap((n) => n.topics))];

  const themeCounts = Object.fromEntries(
    themes.map((t) => [
      t,
      data.nodes.filter((n) => n.themes.includes(t)).length,
    ])
  );

  const topicCounts = Object.fromEntries(
    topics.map((t) => [
      t,
      data.nodes.filter((n) => n.topics.includes(t)).length,
    ])
  );

  return (
    <main className="flex min-h-[70vh] flex-col pb-16 md:h-[calc(100vh-120px)] md:flex-row md:pb-0 md:overflow-hidden">
      {/* Mobile header */}
      <div className="flex items-center justify-between gap-3 px-4 pb-2 pt-3 md:hidden">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
            Knowledge Map
          </p>
          <p className="text-xs text-zinc-500">
            Drag, zoom, and tap nodes to open notes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              surprisePath();
              setSidebarOpen(true);
            }}
            className="rounded-full border border-fuchsia-800/60 bg-fuchsia-950/50 px-3 py-1 text-xs text-fuchsia-100 transition-colors hover:border-fuchsia-600"
          >
            Surprise path
          </button>

          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="rounded-full border border-zinc-700 bg-zinc-900/70 px-3 py-1 text-xs text-zinc-100 transition-colors hover:border-zinc-500"
            aria-expanded={sidebarOpen}
          >
            {sidebarOpen ? "Hide filters" : "Filters"}
          </button>
        </div>
      </div>

      {/* Graph */}
      <div className="relative flex-1 min-h-[360px] pb-4 md:min-h-0 md:pb-0">
        <Graph data={filteredData} highlightedPath={path} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#09090b] to-transparent md:hidden" />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <ZettelSidebar
          nodes={data.nodes}
          themes={themes}
          topics={topics}
          activeFilter={filter}
          themeCounts={themeCounts}
          topicCounts={topicCounts}
          pathSource={pathSource}
          pathTarget={pathTarget}
          path={path.map(
            (id) => data.nodes.find((n) => n.id === id)?.label ?? id
          )}
          onSourceChange={setPathSource}
          onTargetChange={setPathTarget}
          onSurprisePath={surprisePath}
          onClearPath={clearPath}
          onFilter={handleFilter}
        />
      </div>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 md:hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-y-0" : "translate-y-[calc(100%-56px)]"
        }`}
      >
        <div className="mx-auto max-w-xl rounded-t-2xl border border-zinc-800 bg-zinc-950/95 shadow-2xl backdrop-blur">
          <button
            className="flex w-full items-center justify-between border-b border-zinc-800 px-4 py-3 text-left"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-expanded={sidebarOpen}
          >
            <span className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
              Filters & paths
            </span>
            <span className="text-xs text-zinc-300">
              {sidebarOpen ? "Close" : "Open"}
            </span>
          </button>

          <ZettelSidebar
            className="w-full max-h-[65vh]"
            nodes={data.nodes}
            themes={themes}
            topics={topics}
            activeFilter={filter}
            themeCounts={themeCounts}
            topicCounts={topicCounts}
            pathSource={pathSource}
            pathTarget={pathTarget}
            path={path.map(
              (id) => data.nodes.find((n) => n.id === id)?.label ?? id
            )}
            onSourceChange={setPathSource}
            onTargetChange={setPathTarget}
            onSurprisePath={surprisePath}
            onClearPath={clearPath}
            onFilter={handleFilter}
          />
        </div>
      </div>
    </main>
  );
}
