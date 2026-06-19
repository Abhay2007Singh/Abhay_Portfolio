"use client";

import type { ArchDiagram as ArchDiagramType } from "@/data/architecture";

const NODE_W = 100;
const NODE_H = 36;

interface Props {
  diagram: ArchDiagramType;
}

export default function ArchDiagram({ diagram }: Props) {
  const { nodes, edges } = diagram;

  const getNode = (id: string) => nodes.find((n) => n.id === id);

  // Compute bounding box to auto-size viewBox
  const maxX = Math.max(...nodes.map((n) => n.x + NODE_W / 2)) + 20;
  const maxY = Math.max(...nodes.map((n) => n.y + NODE_H / 2)) + 30;
  const viewBox = `0 0 ${maxX} ${maxY}`;

  return (
    <svg
      viewBox={viewBox}
      className="w-full h-auto"
      aria-label="Architecture diagram"
      role="img"
    >
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#2A3535" />
        </marker>
      </defs>

      {/* Edges */}
      {edges.map((e, i) => {
        const from = getNode(e.from);
        const to = getNode(e.to);
        if (!from || !to) return null;

        // Connect right edge of from → left edge of to (same row)
        // or bottom of from → top of to (different row)
        const sameRow = Math.abs(from.y - to.y) < 20;

        const x1 = sameRow ? from.x + NODE_W / 2 : from.x;
        const y1 = sameRow ? from.y : from.y + NODE_H / 2;
        const x2 = sameRow ? to.x - NODE_W / 2 : to.x;
        const y2 = sameRow ? to.y : to.y - NODE_H / 2;

        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;

        // Slight curve for cross-row edges
        const path = sameRow
          ? `M${x1},${y1} L${x2},${y2}`
          : `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`;

        return (
          <g key={i}>
            <path
              d={path}
              fill="none"
              stroke="#1E2626"
              strokeWidth="1.5"
              markerEnd="url(#arrow)"
            />
            {e.label && (
              <text
                x={mx}
                y={sameRow ? my - 7 : mx > x1 ? my - 7 : my - 7}
                textAnchor="middle"
                fontSize="8"
                fill="#6B7F7F"
                fontFamily="JetBrains Mono, monospace"
              >
                {e.label}
              </text>
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => (
        <g key={node.id} transform={`translate(${node.x - NODE_W / 2}, ${node.y - NODE_H / 2})`}>
          <rect
            width={NODE_W}
            height={NODE_H}
            rx="6"
            fill="#111414"
            stroke={node.color}
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />
          {node.label.split("\n").map((line, li) => (
            <text
              key={li}
              x={NODE_W / 2}
              y={node.label.includes("\n") ? 13 + li * 13 : NODE_H / 2 + 4}
              textAnchor="middle"
              fontSize="10"
              fill={node.color}
              fontFamily="JetBrains Mono, monospace"
              fontWeight="500"
            >
              {line}
            </text>
          ))}
        </g>
      ))}
    </svg>
  );
}
