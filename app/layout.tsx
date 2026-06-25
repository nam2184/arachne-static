import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Arachne - Linked Project Context for Coding Agents",
  description:
    "Arachne links coding sessions on a canvas so agents can read peer project context through tool calls and follow existing patterns.",
  keywords: [
    "Arachne",
    "AI coding agent",
    "LLM agents",
    "Tauri",
    "Rust",
    "multi-agent coding",
    "project context",
    "code patterns",
    "peer session",
    "OpenAPI",
  ],
  openGraph: {
    title: "Arachne - Link sessions, share project patterns",
    description:
      "Create sessions inside projects, link them on a canvas, and let tools read peer sessions through peer_session_id.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} dark`}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
