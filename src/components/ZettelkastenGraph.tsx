/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

type Node = {
  id: string;
  label?: string;
  x?: number;
  y?: number;
};

type Link = {
  source: string | Node;
  target: string | Node;
};

type GraphData = {
  nodes: Node[];
  links: Link[];
};

export default function ZettelkastenGraph({ data }: { data: GraphData }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [hoverNode, setHoverNode] = useState<Node | null>(null);

  const neighborMap = useRef<Map<string, Set<string>>>(new Map());

  useEffect(() => {
    const resize = () => {
      if (!containerRef.current) return;

      setSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    };

    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const map = new Map<string, Set<string>>();

    data.links.forEach((link) => {
      const source =
        typeof link.source === "string" ? link.source : link.source.id;
      const target =
        typeof link.target === "string" ? link.target : link.target.id;

      if (!map.has(source)) map.set(source, new Set());
      if (!map.has(target)) map.set(target, new Set());

      map.get(source)!.add(target);
      map.get(target)!.add(source);
    });

    neighborMap.current = map;
  }, [data]);

  const isNeighbor = (a: string, b: string) =>
    neighborMap.current.get(a)?.has(b);

  return (
    <div ref={containerRef} className="w-full h-full">
      {size.width > 0 && (
        <ForceGraph2D
          width={size.width}
          height={size.height}
          graphData={data}
          backgroundColor="#09090b"
          onNodeHover={(node) => setHoverNode(node as Node)}
          onNodeClick={(node) => {
            window.location.href = `/zettelkasten/${node.id}`;
          }} 
          linkColor={(link: any) => {
            if (!hoverNode) return "#3f3f46";

            const s = link.source.id;
            const t = link.target.id;

            return s === hoverNode.id || t === hoverNode.id
              ? "#e4e4e7"
              : "#27272a";
          }}
          nodeCanvasObject={(node: any, ctx, scale) => {
            const label = node.label || node.id;

            const active =
              hoverNode &&
              (node.id === hoverNode.id || isNeighbor(node.id, hoverNode.id));

            const radius = active ? 4 : 2.5;

            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);

            ctx.fillStyle = active ? "#e4e4e7" : "#71717a";
            ctx.shadowColor = active ? "#e4e4e7" : "transparent";
            ctx.shadowBlur = active ? 8 : 0;

            ctx.fill();

            const fontSize = 12 / scale;

            ctx.font = `${fontSize}px Inter`;
            ctx.fillStyle = "#e4e4e7";

            ctx.fillText(label, node.x + 6, node.y + 3);
          }}
        />
      )}
    </div>
  );
}
