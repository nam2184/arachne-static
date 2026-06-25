"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  r: number;
  label: string;
  phase: number;
};

const nodes: Node[] = [
  { x: 0.5, y: 0.18, r: 18, label: "current", phase: 0 },
  { x: 0.22, y: 0.34, r: 12, label: "openapi", phase: 1.2 },
  { x: 0.78, y: 0.34, r: 12, label: "admin", phase: 2.1 },
  { x: 0.34, y: 0.64, r: 14, label: "rust svc", phase: 0.7 },
  { x: 0.68, y: 0.65, r: 14, label: "tests", phase: 1.7 },
  { x: 0.5, y: 0.82, r: 10, label: "cli", phase: 2.8 },
];

const edges = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 4],
  [3, 5],
  [4, 5],
  [1, 4],
  [2, 3],
];

export function ContextCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let animationFrame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      frame += 0.018;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#000";
      context.fillRect(0, 0, width, height);

      context.strokeStyle = "rgba(255,255,255,0.08)";
      context.lineWidth = 1;
      for (let x = 20; x < width; x += 28) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }
      for (let y = 20; y < height; y += 28) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      context.setLineDash([4, 9]);
      context.lineCap = "round";
      context.lineWidth = 1.5;
      edges.forEach(([from, to], index) => {
        const a = nodes[from];
        const b = nodes[to];
        const ax = a.x * width + Math.sin(frame + a.phase) * 4;
        const ay = a.y * height + Math.cos(frame + a.phase) * 4;
        const bx = b.x * width + Math.sin(frame + b.phase) * 4;
        const by = b.y * height + Math.cos(frame + b.phase) * 4;
        const pulse = 0.35 + Math.sin(frame * 2 + index) * 0.18;

        context.strokeStyle = `rgba(255,255,255,${pulse})`;
        context.beginPath();
        context.moveTo(ax, ay);
        context.lineTo(bx, by);
        context.stroke();
      });
      context.setLineDash([]);

      nodes.forEach((node, index) => {
        const x = node.x * width + Math.sin(frame + node.phase) * 4;
        const y = node.y * height + Math.cos(frame + node.phase) * 4;
        const glow = 0.12 + Math.sin(frame * 2 + index) * 0.05;

        context.beginPath();
        context.fillStyle = `rgba(255,255,255,${glow})`;
        context.arc(x, y, node.r + 12, 0, Math.PI * 2);
        context.fill();

        context.beginPath();
        context.fillStyle = "#fff";
        context.arc(x, y, node.r, 0, Math.PI * 2);
        context.fill();

        context.beginPath();
        context.fillStyle = "#000";
        context.arc(x, y, Math.max(node.r - 6, 3), 0, Math.PI * 2);
        context.fill();

        context.font = "11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
        context.textAlign = "center";
        context.fillStyle = "rgba(255,255,255,0.76)";
        context.fillText(node.label, x, y + node.r + 18);
      });

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" aria-label="Connected project context graph" />;
}
