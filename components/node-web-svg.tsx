type NodeWebSvgProps = {
  nodeTone?: "black" | "white";
  className?: string;
};

const nodes = [
  { id: "a", x: 52, y: 78, r: 12 },
  { id: "b", x: 174, y: 36, r: 9 },
  { id: "c", x: 316, y: 98, r: 14 },
  { id: "d", x: 458, y: 50, r: 10 },
  { id: "e", x: 570, y: 140, r: 13 },
  { id: "f", x: 104, y: 226, r: 15 },
  { id: "g", x: 258, y: 250, r: 10 },
  { id: "h", x: 408, y: 206, r: 16 },
  { id: "i", x: 532, y: 304, r: 9 },
  { id: "j", x: 46, y: 398, r: 11 },
  { id: "k", x: 214, y: 358, r: 13 },
  { id: "l", x: 366, y: 430, r: 10 },
  { id: "m", x: 574, y: 408, r: 14 },
];

const edges = [
  ["a", "b", -28],
  ["b", "c", 24],
  ["c", "d", -20],
  ["d", "e", 26],
  ["a", "f", 30],
  ["b", "f", -18],
  ["c", "g", -34],
  ["c", "h", 42],
  ["d", "h", -24],
  ["e", "i", 34],
  ["f", "g", -18],
  ["g", "h", 28],
  ["h", "i", -22],
  ["f", "j", -28],
  ["g", "k", 32],
  ["h", "l", -34],
  ["i", "m", 28],
  ["j", "k", -20],
  ["k", "l", 26],
  ["l", "m", -24],
  ["a", "g", 54],
  ["f", "l", -62],
  ["h", "m", 54],
] as const;

const nodeById = new Map(nodes.map((node) => [node.id, node]));

function edgePath(fromId: string, toId: string, bend: number) {
  const from = nodeById.get(fromId);
  const to = nodeById.get(toId);

  if (!from || !to) return "";

  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  const normalX = -dy / length;
  const normalY = dx / length;

  return `M${from.x} ${from.y} Q${(midX + normalX * bend).toFixed(1)} ${(midY + normalY * bend).toFixed(1)} ${to.x} ${to.y}`;
}

export function NodeWebSvg({ nodeTone = "white", className }: NodeWebSvgProps) {
  const whiteNodes = nodeTone === "white";
  const nodeFill = whiteNodes ? "white" : "black";
  const nodeStroke = whiteNodes ? "black" : "white";
  const lineStroke = whiteNodes ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.46)";

  return (
    <svg className={className} viewBox="0 0 620 470" fill="none" role="img" aria-label="Web of connected project nodes">
      <rect width="620" height="470" fill="transparent" />
      <g stroke={lineStroke} strokeDasharray="7 13" strokeLinecap="round" strokeWidth="2.8">
        {edges.map(([from, to, bend]) => (
          <path key={`${from}-${to}`} d={edgePath(from, to, bend)} />
        ))}
      </g>
      <g>
        {nodes.map((node) => (
          <circle key={node.id} cx={node.x} cy={node.y} r={node.r + 8} fill="white" opacity="0.08" />
        ))}
      </g>
      <g fill={nodeFill} stroke={nodeStroke} strokeWidth="3.2">
        {nodes.map((node) => (
          <circle key={node.id} cx={node.x} cy={node.y} r={node.r} />
        ))}
      </g>
    </svg>
  );
}
