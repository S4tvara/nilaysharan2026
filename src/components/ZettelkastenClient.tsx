/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import Graph from "@/components/ZettelkastenGraph";
import ZettelSidebar from "@/components/ZettelSidebar";

type GraphData = {
  nodes: any[];
  links: any[];
};

export default function ZettelkastenClient({ data }: { data: GraphData }) {
  const [filter, setFilter] = useState<string | null>(null);
  const [filterType, setFilterType] =
    useState<"theme" | "topic" | null>(null);

  const filteredData = useMemo(() => {
    if (!filter || !filterType) return data;

    const nodes = data.nodes.filter((n) =>
      filterType === "theme"
        ? n.themes.includes(filter)
        : n.topics.includes(filter)
    );

    const nodeSet = new Set(nodes.map((n) => n.id));

    const links = data.links.filter(
      (l) => nodeSet.has(l.source) && nodeSet.has(l.target)
    );

    return { nodes, links };
  }, [data, filter, filterType]);

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
        themes={themes}
        topics={topics}
        activeFilter={filter}
        themeCounts={themeCounts}
        topicCounts={topicCounts}
        onFilter={(value, type) => {
          setFilter(value);
          setFilterType(value ? type : null);
        }}
      />

      <div className="flex-1 relative">
        <Graph data={filteredData} />
      </div>
    </main>
  );
}