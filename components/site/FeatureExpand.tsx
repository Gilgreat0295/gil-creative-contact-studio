"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import { getCategory } from "@/content/categories";
import { MediaFrame } from "./MediaFrame";
import { getGsap, isDesktop, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/motion";

/**
 * Signature desktop interaction: as the visitor scrolls, the featured image
 * opens from an inset window to fill its frame. Mobile and reduced motion get
 * the full frame with no scroll effect.
 */
export function FeatureExpand({ project }: { project: Project }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(isDesktop() && !prefersReducedMotion());
  }, []);

  useIsoLayoutEffect(() => {
    if (!enabled || !sectionRef.current || !frameRef.current) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });
      tl.fromTo(frameRef.current, { clipPath: "inset(16% 22% 16% 22%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0);
      tl.fromTo("[data-expand-inner]", { scale: 1.15 }, { scale: 1, ease: "none" }, 0);
      tl.fromTo("[data-expand-caption]", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.3 }, 0.7);
    }, sectionRef);
    return () => ctx.revert();
  }, [enabled]);

  return (
    <div ref={sectionRef} className={enabled ? "relative h-[220vh]" : "relative"}>
      <div className={enabled ? "sticky top-[var(--header-height)] flex h-[calc(100vh-var(--header-height))] items-center" : ""}>
        <div className="container-x w-full">
          <Link href={`/work/${project.slug}`} className="group block focus-visible:outline-offset-8">
            <div ref={frameRef} className="relative">
              <div data-expand-inner>
                <MediaFrame
                  media={project.cover}
                  title={project.title}
                  palette={project.palette}
                  aspect="wide"
                  reveal={!enabled}
                  centerCover={enabled}
                  className={enabled ? "max-h-[calc(100vh-var(--header-height)-9rem)] w-full" : undefined}
                />
              </div>
            </div>
            <div data-expand-caption className="mt-5 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-eyebrow text-muted-foreground">01 — Featured</p>
                <h3 className="mt-2 text-title text-foreground">
                  <span className="link-line">{project.title}</span>
                </h3>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-eyebrow text-muted-foreground" aria-label="Categories">
                  {project.categories.map((c) => (
                    <li key={c}>{getCategory(c).label}</li>
                  ))}
                </ul>
              </div>
              <span className="flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-signal">
                View case study
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-500 ease-cinematic group-hover:rotate-45" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

