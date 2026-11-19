import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { getCategory } from "@/content/categories";
import type { MediaAspect, Project } from "@/content/types";
import { MediaFrame } from "./MediaFrame";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  aspect?: MediaAspect;
  priority?: boolean;
  sizes?: string;
  reveal?: boolean;
  headingLevel?: "h2" | "h3";
  className?: string;
};

export function ProjectCard({ project, aspect, priority, sizes, reveal = true, headingLevel = "h3", className }: Props) {
  const Heading = headingLevel;
  return (
    <article className={cn("relative", className)}>
      <Link to="/work/$slug" params={{ slug: project.slug }} className="group block focus-visible:outline-offset-8">
        <MediaFrame
          media={project.cover}
          title={project.title}
          palette={project.palette}
          aspect={aspect}
          priority={priority}
          sizes={sizes}
          reveal={reveal}
          zoom
        />
        <div className="mt-5 flex items-start justify-between gap-6" data-reveal={reveal ? "" : undefined}>
          <div className="min-w-0">
            {project.label && (
              <p className="mb-2 flex items-center gap-2 text-eyebrow text-signal">
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-signal" />
                {project.label}
              </p>
            )}
            <Heading className="text-2xl font-bold tracking-[-0.035em] text-foreground md:text-[1.75rem]">
              <span className="link-line">{project.title}</span>
            </Heading>
            <p className="mt-2 max-w-md text-sm text-muted-foreground md:text-[0.95rem]">{project.summary}</p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-eyebrow text-muted-foreground" aria-label="Categories">
              {project.categories.map((c) => (
                <li key={c}>{getCategory(c).label}</li>
              ))}
            </ul>
          </div>
          <span
            aria-hidden="true"
            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-line-strong text-foreground transition-all duration-500 ease-cinematic group-hover:border-signal group-hover:bg-signal group-hover:text-signal-foreground"
          >
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-cinematic group-hover:rotate-45" />
          </span>
        </div>
      </Link>
    </article>
  );
}
