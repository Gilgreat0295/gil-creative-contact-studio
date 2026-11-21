"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { CategorySlug } from "@/content/categories";
import { getCategory } from "@/content/categories";
import { PROJECTS } from "@/content/projects";
import type { MediaAspect } from "@/content/types";
import { ProjectCard } from "@/components/site/ProjectCard";
import { parseWorkCategory, projectsInCategory, publishedCategories } from "@/lib/portfolio";
import { getGsap, prefersReducedMotion, useIsoLayoutEffect, useReveal } from "@/lib/motion";
import { rememberWorkFilter } from "@/lib/work-filter-memory";
import { cn } from "@/lib/utils";

// Repeating editorial rhythm: wide-left, narrow-right, narrow-left, wide-right.
const RHYTHM: { span: string; aspect: MediaAspect; offset?: string }[] = [
  { span: "md:col-span-7", aspect: "landscape" },
  { span: "md:col-span-5", aspect: "portrait", offset: "md:mt-32" },
  { span: "md:col-span-5", aspect: "portrait" },
  { span: "md:col-span-7", aspect: "landscape", offset: "md:mt-32" },
];

export function WorkIndex() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = parseWorkCategory(searchParams.get("category"));
  const filters = publishedCategories();
  const projects = projectsInCategory(category);
  const pageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const firstRender = useRef(true);

  useReveal(pageRef);

  useEffect(() => {
    rememberWorkFilter(category);
  }, [category]);

  // Brief transition when the filter changes.
  useIsoLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!gridRef.current || prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = getGsap();
    const items = gridRef.current.querySelectorAll(":scope > li");
    const tween = gsap.fromTo(items, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.06, clearProps: "all" });
    ScrollTrigger.refresh();
    return () => {
      tween.kill();
    };
  }, [category]);

  const setCategory = (next?: CategorySlug) => {
    router.push(next ? `/work?category=${next}` : "/work", { scroll: false });
  };

  const onFilterKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    const buttons = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>("button"));
    const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    e.preventDefault();
    const next =
      e.key === "Home" ? 0 : e.key === "End" ? buttons.length - 1 : e.key === "ArrowRight" ? (i + 1) % buttons.length : (i - 1 + buttons.length) % buttons.length;
    buttons[next]?.focus();
  };

  const filterClass = (active: boolean) =>
    cn(
      "flex h-11 shrink-0 items-center gap-2 border px-4 text-sm font-medium transition-colors duration-300 md:h-10",
      active ? "border-signal bg-signal text-signal-foreground" : "border-line-strong text-muted-foreground hover:border-foreground hover:text-foreground",
    );

  const label = category ? getCategory(category).label : "All Work";

  return (
    <div ref={pageRef} className="pb-28 pt-[calc(var(--header-height)+3rem)] md:pb-40 md:pt-[calc(var(--header-height)+5rem)]">
      <div className="container-x">
        <p className="text-eyebrow text-muted-foreground">Index</p>
        <h1 className="mt-6 text-display text-foreground">
          Work<span className="text-signal">.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lede text-muted-foreground">
          Branding, campaigns, motion, video and websites. Filter by discipline — each project has one full case study.
        </p>
      </div>

      <div className="sticky top-[var(--header-height)] z-30 mt-14 border-y border-line bg-background">
        <div className="container-x flex items-center gap-6 py-3">
          <div
            role="group"
            aria-label="Filter work by category"
            onKeyDown={onFilterKey}
            className="-mx-1 flex flex-1 gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none]"
          >
            <button type="button" aria-pressed={!category} onClick={() => setCategory(undefined)} className={filterClass(!category)}>
              All Work <span className="text-eyebrow opacity-70">{PROJECTS.length}</span>
            </button>
            {filters.map((c) => {
              const active = category === c.slug;
              return (
                <button key={c.slug} type="button" aria-pressed={active} onClick={() => setCategory(c.slug)} className={filterClass(active)}>
                  {c.label} <span className="text-eyebrow opacity-70">{projectsInCategory(c.slug).length}</span>
                </button>
              );
            })}
          </div>
          <p className="hidden shrink-0 text-eyebrow text-muted-foreground lg:block" aria-live="polite">
            {projects.length} {projects.length === 1 ? "project" : "projects"} · {label}
          </p>
        </div>
      </div>
      <p className="sr-only lg:hidden" aria-live="polite">
        {projects.length} {projects.length === 1 ? "project" : "projects"} in {label}
      </p>

      <ul ref={gridRef} className="container-x mt-14 grid gap-16 md:mt-20 md:grid-cols-12 md:gap-x-8 md:gap-y-24">
        {projects.map((p, i) => {
          const r = RHYTHM[i % RHYTHM.length]!;
          return (
            <li key={p.slug} className={cn(r.span, r.offset)}>
              <ProjectCard project={p} aspect={r.aspect} headingLevel="h2" reveal={false} priority={i < 2} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

