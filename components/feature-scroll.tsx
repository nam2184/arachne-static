"use client";

import { useEffect, useRef, useState } from "react";
import {
  Blocks,
  GitMerge,
  Hammer,
  PackageCheck,
  SearchCode,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const steps: Array<{
  icon: LucideIcon;
  title: string;
  eyebrow: string;
  description: string;
  prompt: string;
}> = [
  {
    icon: Blocks,
    eyebrow: "01 / project",
    title: "Sessions nest inside a project.",
    description:
      "A project is the container. Inside it, you create sessions for the current build, references, experiments, or prior codebases you want available.",
    prompt: "project/backend-rewrite -> sessions[current, openapi-ref, admin-ui]",
  },
  {
    icon: GitMerge,
    eyebrow: "02 / canvas",
    title: "The canvas decides who can share context.",
    description:
      "Drag sessions into a web and link them. Those dotted edges become the visible boundary for which peers can be queried.",
    prompt: "link current -> openapi-ref -> rust-service",
  },
  {
    icon: SearchCode,
    eyebrow: "03 / tools",
    title: "Tool calls can target linked peers.",
    description:
      "When the current agent needs a pattern, its read/glob/grep/plan tools can receive a peer_session_id and inspect the linked project directly.",
    prompt: "grep(pattern='OpenAPIClient', peer_session_id='openapi-ref')",
  },
  {
    icon: ShieldCheck,
    eyebrow: "04 / plan",
    title: "Plan mode keeps exploration read-only.",
    description:
      "Use plan mode when you want the agent to study linked sessions, compare patterns, and propose changes without mutating files.",
    prompt: "mode=plan -> inspect linked projects, no writes",
  },
  {
    icon: Hammer,
    eyebrow: "05 / build",
    title: "Build mode lets the agent implement.",
    description:
      "When the plan is right, switch to build mode. The agent can edit the current project while still reading peers for pattern fidelity.",
    prompt: "mode=build -> apply OpenAPI pattern in current session",
  },
  {
    icon: PackageCheck,
    eyebrow: "06 / providers",
    title: "Bring the provider you already use.",
    description:
      "Arachne supports OpenAI, Anthropic, OpenAI-compatible providers, and custom endpoints across the same linked-session workflow.",
    prompt: "provider=openai | anthropic | openai-compatible | custom",
  },
];

export function FeatureScroll() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          setActive(Number(visible.target.dataset.index));
        }
      },
      { rootMargin: "-28% 0px -42% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="container relative z-10 pb-28">
      <div className="mb-10 grid gap-4 border-y border-white/30 py-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-white/60">session flow</div>
        <h2 className="max-w-4xl text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.06em] text-white sm:text-5xl">
          Build context by connecting sessions, not by rewriting prompts.
        </h2>
      </div>

      <div className="grid gap-10">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const selected = index === active;

          return (
            <div
              key={step.title}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              data-index={index}
              className="grid min-h-[64vh] gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-center"
            >
              <div
                className={`feature-copy max-w-xl transition-all duration-500 ${
                  selected
                    ? "translate-y-0 opacity-100 blur-0"
                    : "pointer-events-none translate-y-8 opacity-0 blur-sm"
                }`}
              >
                <div className="mb-6 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.18em] text-white/55">
                  <span>{step.eyebrow}</span>
                  <span className="h-px flex-1 bg-white/25" />
                  <span>{index + 1}/{steps.length}</span>
                </div>
                <h3 className="text-5xl font-semibold uppercase leading-[0.92] tracking-[-0.07em] text-white sm:text-6xl">
                  {step.title}
                </h3>
                <p className="mt-6 font-mono text-sm leading-7 text-white/70">{step.description}</p>
              </div>

              <div
                className={`relative overflow-hidden border p-6 transition-all duration-500 ${
                  selected
                    ? "border-white bg-white text-black shadow-[18px_18px_0_rgba(255,255,255,0.14)]"
                    : "border-white/25 bg-black/68 text-white opacity-70"
                }`}
              >
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,currentColor_1px,transparent_1px)] [background-size:22px_22px]" />
                <div className="relative">
                  <div className="mb-16 flex items-center justify-between font-mono text-xs uppercase tracking-[0.16em] opacity-65">
                    <span>{step.eyebrow}</span>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-current">
                    <Icon className="h-9 w-9" />
                  </div>
                  <h4 className="max-w-2xl text-3xl font-semibold uppercase leading-none tracking-[-0.05em]">{step.title}</h4>
                  <div className="mt-10 border-l border-current pl-4 font-mono text-sm leading-6 opacity-75">
                    {step.prompt}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
