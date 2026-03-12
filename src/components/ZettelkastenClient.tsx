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
    <main className="flex h-[calc(100vh-120px)]">
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
        onSurprisePath={() => {
          if (data.nodes.length < 2) return;

          const sourceIndex = Math.floor(Math.random() * data.nodes.length);
          let targetIndex = Math.floor(Math.random() * data.nodes.length);

          while (targetIndex === sourceIndex) {
            targetIndex = Math.floor(Math.random() * data.nodes.length);
          }

          setPathSource(data.nodes[sourceIndex].id);
          setPathTarget(data.nodes[targetIndex].id);
        }}
        onClearPath={() => {
          setPathSource(null);
          setPathTarget(null);
        }}
        onFilter={(value, type) => {
          setFilter(value);
          setFilterType(value ? type : null);
        }}
      />

      <div className="flex-1 relative">
        <Graph data={filteredData} highlightedPath={path} />
      </div>
    </main>
  );
}
