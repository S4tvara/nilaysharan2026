/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

type Node = {
  id: string;
  label?: string;
  x?: number;
  y?: number;
  group?: string;
};

type Link = {
  source: string | Node;
  target: string | Node;
};

type GraphData = {
  nodes: Node[];
  links: Link[];
};

const themeColors: Record<string, string> = {
  tech: "#38bdf8",
  systems: "#a78bfa",
  strategy: "#f472b6",
  general: "#71717a",
};

export default function ZettelkastenGraph({
  data,
  highlightedPath = [],
}: {
  data: GraphData;
  highlightedPath?: string[];
}) {
  const router = useRouter();
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

  const resolveNodeId = (node: string | Node) =>
    typeof node === "string" ? node : node.id;

  const pathNodeSet = useMemo(
    () => new Set(highlightedPath),
    [highlightedPath]
  );

  const pathEdgeSet = useMemo(() => {
    const edgeSet = new Set<string>();

    for (let i = 0; i < highlightedPath.length - 1; i += 1) {
      const a = highlightedPath[i];
      const b = highlightedPath[i + 1];

      edgeSet.add(`${a}::${b}`);
      edgeSet.add(`${b}::${a}`);
    }

    return edgeSet;
  }, [highlightedPath]);

  return (
    <div ref={containerRef} className="w-full h-full">
      {size.width > 0 && (
        <ForceGraph2D
          width={size.width}
          height={size.height}
          graphData={data}
          backgroundColor="#09090b"
          cooldownTicks={150}
          d3VelocityDecay={0.35}
          linkWidth={(link) => {
            const l = link as { source: Node; target: Node };
            const s = resolveNodeId(l.source);
            const t = resolveNodeId(l.target);

            return pathEdgeSet.has(`${s}::${t}`) ? 2.5 : 1;
          }}
          linkColor={(link) => {
            const l = link as { source: Node; target: Node };

            const s = resolveNodeId(l.source);
            const t = resolveNodeId(l.target);

            if (pathEdgeSet.has(`${s}::${t}`)) return "rgba(244,114,182,0.95)";

            if (!hoverNode) return "rgba(161,161,170,0.12)";

            if (s === hoverNode.id || t === hoverNode.id)
              return "rgba(228,228,231,0.6)";

            return "rgba(63,63,70,0.15)";
          }}
          onNodeHover={(node) => setHoverNode(node as Node)}
          onNodeClick={(node: any) => {
            router.push(
              `/zettelkasten/${node.id.toLowerCase().replace(/\s+/g, "-")}`
            );
          }}
          onRenderFramePre={(ctx) => {
            const groups: Record<string, Node[]> = {};

            data.nodes.forEach((node) => {
              if (!node.group) return;
              if (!groups[node.group]) groups[node.group] = [];
              groups[node.group].push(node);
            });

            Object.entries(groups).forEach(([group, nodes]) => {
              const valid = nodes.filter((n) => n.x && n.y);
              if (!valid.length) return;

              const cx =
                valid.reduce((sum, n) => sum + (n.x ?? 0), 0) / valid.length;

              const cy =
                valid.reduce((sum, n) => sum + (n.y ?? 0), 0) / valid.length;

              const radius = Math.sqrt(valid.length) * 35 + 40;

              const color = themeColors[group] ?? "#71717a";

              const gradient = ctx.createRadialGradient(
                cx,
                cy,
                radius * 0.2,
                cx,
                cy,
                radius
              );

              gradient.addColorStop(0, `${color}14`);
              gradient.addColorStop(1, "transparent");

              ctx.beginPath();
              ctx.arc(cx, cy, radius, 0, 2 * Math.PI);

              ctx.fillStyle = gradient;
              ctx.fill();
            });
          }}
          nodeCanvasObject={(obj, ctx, scale) => {
            const node = obj as Node;

            const label = node.label ?? node.id;

            const x = node.x ?? 0;
            const y = node.y ?? 0;

            const isOnPath = pathNodeSet.has(node.id);

            const active =
              isOnPath ||
              (hoverNode &&
                (node.id === hoverNode.id || isNeighbor(node.id, hoverNode.id)));

            const faded = hoverNode && !active && !isOnPath;

            const radius = isOnPath ? 5.5 : active ? 4.5 : 2.5;

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);

            ctx.fillStyle = isOnPath
              ? "#f472b6"
              : faded
              ? "rgba(113,113,122,0.35)"
              : active
              ? "#e4e4e7"
              : "#a1a1aa";

            ctx.shadowColor = isOnPath ? "#f472b6" : active ? "#e4e4e7" : "transparent";
            ctx.shadowBlur = isOnPath ? 15 : active ? 10 : 0;

            ctx.fill();

            const fontSize = 11 / scale;

            ctx.font = `${fontSize}px Inter`;

            ctx.fillStyle = isOnPath
              ? "#f9a8d4"
              : faded
              ? "rgba(113,113,122,0.5)"
              : active
              ? "#e4e4e7"
              : "#71717a";

            ctx.fillText(label, x + 7, y + fontSize / 3);
          }}
        />
      )}
    </div>
  );
}
