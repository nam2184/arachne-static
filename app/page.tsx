import {
  ArrowRight,
  Blocks,
  FileCode2,
  FolderGit2,
  Github,
  GitMerge,
  LayoutDashboard,
  PackageCheck,
  SearchCode,
  Terminal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BackgroundWeb } from "@/components/background-web";
import { ContextCanvas } from "@/components/context-canvas";
import { FeatureScroll } from "@/components/feature-scroll";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

const githubUrl = "https://github.com/nam2184/arachne";

const linkedSessions = [
  {
    icon: FolderGit2,
    name: "current app",
    pattern: "new project session",
  },
  {
    icon: FileCode2,
    name: "openapi ref",
    pattern: "schema layout, client pattern, errors",
  },
  {
    icon: Terminal,
    name: "rust service",
    pattern: "handlers, commands, event streams",
  },
  {
    icon: LayoutDashboard,
    name: "admin ui",
    pattern: "forms, tables, route conventions",
  },
];

const workflow = [
  { icon: Blocks, text: "create a project and nest sessions inside it" },
  { icon: GitMerge, text: "link sessions together on the canvas" },
  { icon: Terminal, text: "ask: can you follow the same OpenAPI pattern?" },
  { icon: SearchCode, text: "tools read linked peers through peer_session_id" },
];

function ContextPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[650px] overflow-hidden border border-white/40 bg-black text-white shadow-[18px_18px_0_rgba(255,255,255,0.08)]">
      <div className="flex items-center justify-between border-b border-white/30 px-4 py-3 font-mono text-xs uppercase tracking-[0.18em] text-white/75">
        <span className="flex items-center gap-2"><Terminal className="h-4 w-4" /> linked session canvas</span>
        <span>project: backend rewrite</span>
      </div>
      <div className="grid lg:grid-cols-[1fr_13rem]">
        <div className="h-[390px] border-b border-white/20 lg:border-b-0 lg:border-r lg:border-white/20">
          <ContextCanvas />
        </div>
        <div className="grid content-between gap-4 p-4">
          <div className="space-y-2">
            {linkedSessions.map((repo) => (
              <div key={repo.name} className="flex gap-3 border border-white/25 p-3">
                <repo.icon className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-white">{repo.name}</div>
                  <div className="mt-1 font-mono text-[11px] leading-5 text-white/55">{repo.pattern}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="border border-white bg-white p-3 text-black">
            <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
              <GitMerge className="h-4 w-4" /> current prompt
            </div>
            <p className="font-mono text-xs leading-5">can you follow the same OpenAPI pattern from the linked session?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <BackgroundWeb />
      <header className="container flex items-center justify-between py-6">
        <a href="#top" className="flex items-center gap-3" aria-label="Arachne home">
          <span className="flex h-10 w-10 items-center justify-center border-2 border-white"><Blocks className="h-5 w-5" /></span>
          <span className="font-mono text-sm font-semibold uppercase tracking-[0.28em]">arachne</span>
        </a>
        <Button asChild variant="outline" size="sm" className="hidden rounded-none border-2 border-white bg-black font-mono text-white hover:bg-white hover:text-black sm:inline-flex">
          <a href={githubUrl} target="_blank" rel="noreferrer">
            <Github /> github
          </a>
        </Button>
      </header>

      <section id="top" className="container grid gap-12 pb-20 pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:pb-28 lg:pt-20">
        <div>
          <Badge variant="outline" className="mb-6 rounded-none border-2 border-white bg-black font-mono text-white">
            linked project context
          </Badge>
          <h1 className="max-w-4xl text-5xl font-semibold uppercase leading-[0.95] tracking-[-0.08em] text-white sm:text-6xl lg:text-7xl">
            Link sessions. Share project patterns.
          </h1>
          <p className="mt-6 max-w-2xl font-mono text-base leading-8 text-white/75 sm:text-lg">
            Arachne lets you create sessions inside a project, link them on a canvas, and ask the current agent to follow patterns from a peer session. Tool calls can receive a `peer_session_id` and read the linked project for exact context. Built with Rust.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-none border-2 border-white bg-white font-mono text-black hover:bg-black hover:text-white">
              <a href={githubUrl} target="_blank" rel="noreferrer">
                view source <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-none border-2 border-white bg-black font-mono text-white hover:bg-white hover:text-black">
              <a href="#workflow">read flow</a>
            </Button>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3 font-mono text-xs uppercase tracking-[0.14em]">
            <div className="border-2 border-white p-4">
              <Blocks className="mb-3 h-7 w-7" /> nested sessions
            </div>
            <div className="border-2 border-white p-4">
              <GitMerge className="mb-3 h-7 w-7" /> linked canvas
            </div>
            <div className="border-2 border-white p-4">
              <SearchCode className="mb-3 h-7 w-7" /> peer reads
            </div>
          </div>
        </div>
        <ContextPreview />
      </section>

      <section className="container pb-24">
        <div className="grid gap-4 border-y border-white/30 py-5 font-mono text-xs uppercase tracking-[0.12em] text-white/70 md:grid-cols-4">
          <div className="flex items-center gap-2"><Blocks className="h-4 w-4" /> projects contain sessions</div>
          <div className="flex items-center gap-2"><GitMerge className="h-4 w-4" /> sessions link on canvas</div>
          <div className="flex items-center gap-2"><SearchCode className="h-4 w-4" /> peer_session_id tools</div>
          <div className="flex items-center gap-2"><PackageCheck className="h-4 w-4" /> openai and anthropic</div>
        </div>
      </section>

      <section id="workflow" className="container pb-24">
        <div className="mb-10 grid gap-4 border-y-2 border-white py-6 md:grid-cols-[0.95fr_1.05fr] md:items-end">
          <div>
            <Badge variant="secondary" className="mb-4 rounded-none border-2 border-white bg-white font-mono text-black">
              Why Arachne?
            </Badge>
            <h2 className="max-w-3xl text-4xl font-semibold uppercase leading-[1] tracking-[-0.06em] text-white sm:text-5xl">
              Ask one session to follow another session's project pattern.
            </h2>
          </div>
          <p className="font-mono text-sm leading-7 text-white/70">
            Create a session for the current work, connect it to sessions that know reference projects, then prompt normally. The agent can call tools against linked peers instead of relying on a hand-written summary.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {workflow.map((step, index) => (
            <Card key={step.text} className="rounded-none border-2 border-white bg-black text-white">
              <CardHeader>
                <step.icon className="mb-4 h-8 w-8" />
                <CardDescription className="font-mono text-sm uppercase leading-6 tracking-[0.08em] text-white">
                  {index + 1}. {step.text}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <FeatureScroll />

      <section id="architecture" className="container pb-24">
        <Card className="overflow-hidden rounded-none border-2 border-white bg-black text-white">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b-2 border-white p-8 lg:border-b-0 lg:border-r-2 lg:p-10">
              <Badge variant="secondary" className="mb-4 rounded-none border-2 border-white bg-white font-mono text-black">
                built with rust
              </Badge>
              <h2 className="text-4xl font-semibold uppercase leading-[1] tracking-[-0.06em] text-white sm:text-5xl">
                Built with Rust for durable projects and extensible agent behavior.
              </h2>
              <p className="mt-5 font-mono text-sm leading-7 text-white/70">
                Arachne persists projects and sessions so the canvas can become a long-running map of how work evolves. The agent crate is modular by design, making new tools, providers, and behaviors easier to add.
              </p>
            </div>
            <div className="grid gap-4 p-6 sm:p-8 lg:p-10">
              <div className="flex gap-4 border-2 border-white p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-white">
                  <Terminal className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.22em] text-white/50">persistence</div>
                  <div className="mt-1 font-mono text-base font-bold text-white">Projects, sessions, messages, and canvas state are kept around instead of disappearing after one run.</div>
                </div>
              </div>
              <div className="flex gap-4 border-2 border-white p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-white">
                  <SearchCode className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.22em] text-white/50">agent crate</div>
                  <div className="mt-1 font-mono text-base font-bold text-white">The modular `arachne-agents` crate keeps LLM, tool, session, and event logic isolated enough to extend.</div>
                </div>
              </div>
              <div className="flex gap-4 border-2 border-white p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-white">
                  <Blocks className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.22em] text-white/50">contributions</div>
                  <div className="mt-1 font-mono text-base font-bold text-white">New providers, tools, session behaviors, and UI ideas are welcome as the project grows.</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section className="container pb-24">
        <div className="border-2 border-white bg-white p-8 text-center text-black sm:p-12">
          <Blocks className="mx-auto mb-5 h-12 w-12" />
          <h2 className="mx-auto max-w-3xl text-4xl font-semibold uppercase leading-[1] tracking-[-0.06em] sm:text-5xl">
            Prompt the current session. Let linked sessions supply the pattern.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-mono text-sm leading-7 opacity-75">
            "Can you follow the same OpenAPI pattern?" becomes actionable because the agent can inspect the linked session's project instead of guessing from memory.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="rounded-none border-2 border-black bg-black font-mono text-white hover:bg-white hover:text-black">
              <a href={githubUrl} target="_blank" rel="noreferrer">
                star or fork <Github />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-white py-8">
        <div className="container flex flex-col justify-between gap-4 font-mono text-xs uppercase tracking-[0.1em] text-white/60 sm:flex-row sm:items-center">
          <div>monochrome terminal landing page for arachne</div>
          <a href={githubUrl} target="_blank" rel="noreferrer" className="text-white hover:underline">
            github.com/nam2184/arachne
          </a>
        </div>
      </footer>
    </main>
  );
}
