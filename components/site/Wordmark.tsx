"use client";

import Link from "next/link";
import { site } from "@/content/site";

export function Wordmark({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="block transition-opacity duration-300 hover:opacity-80"
      aria-label={`${site.name} — home`}
    >
      <img
        src="/brand/gil-creative-logo.png"
        alt={site.name}
        width={527}
        height={77}
        className="h-auto w-[10.5rem] sm:w-[12.5rem]"
      />
    </Link>
  );
}
