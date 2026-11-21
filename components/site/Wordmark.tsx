"use client";

import Link from "next/link";
import { site } from "@/content/site";

export function Wordmark({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="text-[1.05rem] font-bold tracking-[-0.04em] text-foreground transition-colors hover:text-signal"
      aria-label={`${site.name} — home`}
    >
      Gil Creative Co<span className="text-signal">.</span>
    </Link>
  );
}

