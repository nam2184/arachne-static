type WebNode = {
  id: string;
  x: number;
  y: number;
  r: number;
  opacity?: number;
};

type WebEdge = {
  from: string;
  to: string;
  bend?: number;
  opacity?: number;
};

const nodes: WebNode[] = [
  { id: "a", x: 84, y: 128, r: 7 },
  { id: "b", x: 226, y: 218, r: 5, opacity: 0.72 },
  { id: "c", x: 412, y: 164, r: 8 },
  { id: "d", x: 598, y: 318, r: 10 },
  { id: "e", x: 802, y: 178, r: 6, opacity: 0.68 },
  { id: "f", x: 1044, y: 286, r: 9 },
  { id: "g", x: 1274, y: 172, r: 7 },
  { id: "h", x: 1380, y: 356, r: 5, opacity: 0.76 },
  { id: "i", x: 152, y: 520, r: 9 },
  { id: "j", x: 342, y: 430, r: 6, opacity: 0.7 },
  { id: "k", x: 520, y: 594, r: 8 },
  { id: "l", x: 742, y: 492, r: 12 },
  { id: "m", x: 946, y: 604, r: 7, opacity: 0.74 },
  { id: "n", x: 1168, y: 500, r: 10 },
  { id: "o", x: 1328, y: 642, r: 7 },
  { id: "p", x: 74, y: 814, r: 5, opacity: 0.75 },
  { id: "q", x: 274, y: 744, r: 8 },
  { id: "r", x: 448, y: 888, r: 6, opacity: 0.72 },
  { id: "s", x: 658, y: 792, r: 10 },
  { id: "t", x: 884, y: 914, r: 8 },
  { id: "u", x: 1088, y: 774, r: 6, opacity: 0.72 },
  { id: "v", x: 1288, y: 908, r: 9 },
  { id: "w", x: 214, y: 1080, r: 7 },
  { id: "x", x: 568, y: 1054, r: 9 },
  { id: "y", x: 998, y: 1088, r: 7 },
  { id: "z", x: 1384, y: 1044, r: 6, opacity: 0.7 },
];

const edges: WebEdge[] = [
  { from: "a", to: "b", bend: -24 },
  { from: "a", to: "c", bend: 34, opacity: 0.32 },
  { from: "b", to: "c", bend: 18 },
  { from: "b", to: "j", bend: -42 },
  { from: "c", to: "d", bend: -30 },
  { from: "c", to: "j", bend: 38, opacity: 0.28 },
  { from: "d", to: "e", bend: 42 },
  { from: "d", to: "l", bend: -26 },
  { from: "e", to: "f", bend: -38 },
  { from: "e", to: "l", bend: 34, opacity: 0.26 },
  { from: "f", to: "g", bend: 28 },
  { from: "f", to: "n", bend: -28 },
  { from: "g", to: "h", bend: -26 },
  { from: "h", to: "o", bend: 46, opacity: 0.31 },
  { from: "i", to: "j", bend: 30 },
  { from: "i", to: "q", bend: -28 },
  { from: "j", to: "k", bend: -24 },
  { from: "j", to: "l", bend: 52, opacity: 0.28 },
  { from: "k", to: "l", bend: 24 },
  { from: "k", to: "s", bend: -34 },
  { from: "l", to: "m", bend: -22 },
  { from: "l", to: "s", bend: 42, opacity: 0.34 },
  { from: "m", to: "n", bend: 36 },
  { from: "m", to: "u", bend: -28 },
  { from: "n", to: "o", bend: -24 },
  { from: "n", to: "u", bend: 34 },
  { from: "p", to: "q", bend: -18 },
  { from: "q", to: "r", bend: 36 },
  { from: "q", to: "s", bend: -52, opacity: 0.28 },
  { from: "r", to: "s", bend: -26 },
  { from: "r", to: "w", bend: 44 },
  { from: "s", to: "t", bend: 32 },
  { from: "s", to: "x", bend: -42 },
  { from: "t", to: "u", bend: -34 },
  { from: "t", to: "y", bend: 38 },
  { from: "u", to: "v", bend: 26 },
  { from: "v", to: "z", bend: -30 },
  { from: "w", to: "x", bend: -20 },
  { from: "x", to: "y", bend: 26 },
  { from: "y", to: "z", bend: -22 },
  { from: "d", to: "k", bend: 58, opacity: 0.24 },
  { from: "f", to: "m", bend: -62, opacity: 0.24 },
  { from: "k", to: "t", bend: 82, opacity: 0.22 },
  { from: "m", to: "s", bend: -70, opacity: 0.22 },
];

const nodeById = new Map(nodes.map((node) => [node.id, node]));

function edgePath(edge: WebEdge) {
  const from = nodeById.get(edge.from);
  const to = nodeById.get(edge.to);

  if (!from || !to) return "";

  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  const normalX = -dy / length;
  const normalY = dx / length;
  const bend = edge.bend ?? 0;
  const controlX = midX + normalX * bend;
  const controlY = midY + normalY * bend;

  return `M${from.x} ${from.y} Q${controlX.toFixed(1)} ${controlY.toFixed(1)} ${to.x} ${to.y}`;
}

function CornerWeb({ transform }: { transform: string }) {
  const cornerNodes = [
    [0, 0, 5],
    [92, 18, 3],
    [180, 48, 4],
    [270, 88, 3],
    [58, 112, 3],
    [148, 156, 4],
    [238, 214, 3],
    [28, 238, 4],
    [116, 290, 3],
  ];

  const cornerEdges = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 7],
    [0, 8],
    [1, 4],
    [4, 5],
    [5, 6],
    [2, 5],
    [3, 6],
    [7, 8],
    [4, 7],
    [5, 8],
  ];

  return (
    <g transform={transform} opacity="0.5">
      <g fill="none" stroke="white" strokeDasharray="3 10" strokeLinecap="round" strokeWidth="1">
        {cornerEdges.map(([from, to]) => {
          const a = cornerNodes[from];
          const b = cornerNodes[to];
          return <line key={`${from}-${to}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />;
        })}
      </g>
      <g fill="black" stroke="white" strokeWidth="1.5">
        {cornerNodes.map(([x, y, r], index) => (
          <circle key={index} cx={x} cy={y} r={r} />
        ))}
      </g>
    </g>
  );
}

export function BackgroundWeb() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black" aria-hidden="true">
      <svg className="h-full w-full" viewBox="0 0 1440 1200" preserveAspectRatio="xMidYMid slice">
        <rect width="1440" height="1200" fill="black" />

        <CornerWeb transform="translate(18 20)" />
        <CornerWeb transform="translate(1422 24) scale(-1 1)" />
        <CornerWeb transform="translate(46 1170) rotate(-82) scale(1.25)" />
        <CornerWeb transform="translate(1386 1156) rotate(178) scale(1.12)" />

        <g fill="none" stroke="white" strokeDasharray="4 13" strokeLinecap="round" strokeWidth="1.2">
          {edges.map((edge, index) => (
            <path key={index} d={edgePath(edge)} opacity={edge.opacity ?? 0.38} />
          ))}
        </g>

        <g fill="black" stroke="white" strokeWidth="2">
          {nodes.map((node) => (
            <circle key={node.id} cx={node.x} cy={node.y} r={node.r} opacity={node.opacity ?? 0.82} />
          ))}
        </g>
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(0,0,0,0.08),rgba(0,0,0,0.62)_62%,#000_100%)]" />
    </div>
  );
}
