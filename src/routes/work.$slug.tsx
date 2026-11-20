import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getCategory, type CategorySlug } from "@/content/categories";
import { MediaFrame } from "@/components/site/MediaFrame";
import { CaseStudySection } from "@/components/site/CaseStudyBlocks";
import { getNextProject, getProject, parseWorkCategory } from "@/lib/portfolio";
import { getGsap, prefersReducedMotion, useIsoLayoutEffect, useReveal } from "@/lib/motion";
import { recallWorkFilter } from "@/lib/work-filter-memory";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { slug: project.slug };
  },
  head: ({ loaderData }) => {
    const project = loaderData ? getProject(loaderData.slug) : undefined;
    if (!project) {
      return { meta: [{ title: "Project not found — Gil Creative Co." }, { name: "robots", content: "noindex" }] };
    }
    const title = `${project.title} — Gil Creative Co.`;
    return {
      meta: [
        { title },
        { name: "description", content: project.overview },
        { property: "og:title", content: title },
        { property: "og:description", content: project.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: CaseNotFound,
  component: CaseStudy,
});

function CaseNotFound() {
  return (
    <div className="container-x flex min-h-[70vh] flex-col justify-center pt-[var(--header-height)]">
      <p className="text-eyebrow text-muted-foreground">404</p>
      <h1 className="mt-4 text-headline text-foreground">This project isn’t here.</h1>
      <Link to="/work" className="link-line mt-8 self-start text-foreground hover:text-signal">
        Back to work
      </Link>
    </div>
  );
}

function CaseStudy() {
  const { slug } = Route.useLoaderData();
  const project = getProject(slug)!;
  const next = getNextProject(slug);
  const pageRef = useRef<HTMLDivElement>(null);
  const [backCategory, setBackCategory] = useState<CategorySlug | undefined>(undefined);

  useEffect(() => {
    setBackCategory(parseWorkCategory(recallWorkFilter()));
  }, [slug]);

  useReveal(pageRef, [slug]);

  useIsoLayoutEffect(() => {
    if (!pageRef.current || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from("[data-case-intro]", { autoAlpha: 0, y: 24, duration: 1, ease: "expo.out", stagger: 0.08 });
    }, pageRef);
    return () => ctx.revert();
  }, [slug]);

  const ctx = { title: project.title, palette: project.palette };
  const showSectionNav = project.sections.length > 1;

  return (
    <article ref={pageRef} key={slug} className="pt-[calc(var(--header-height)+2rem)] md:pt-[calc(var(--header-height)+3rem)]">
      <div className="container-x">
        <Link
          to="/work"
          search={backCategory ? { category: backCategory } : {}}
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4 transition-transform duration-500 ease-cinematic group-hover:-translate-x-1" />
          Back to work
        </Link>

        <header className="mt-12 md:mt-20">
          {project.label && (
            <p data-case-intro className="mb-5 flex items-center gap-2 text-eyebrow text-signal">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-signal" />
              {project.label}
            </p>
          )}
          <h1 data-case-intro className="max-w-[16ch] text-headline text-foreground">{project.title}</h1>
          {project.tagline && (
            <p data-case-intro className="mt-5 text-lede text-foreground">“{project.tagline}”</p>
          )}
          <div data-case-intro className="mt-10 grid gap-8 md:grid-cols-12">
            <ul className="flex flex-wrap gap-2 md:col-span-5" aria-label="Categories">
              {project.categories.map((c) => (
                <li key={c}>
                  <Link
                    to="/work"
                    search={{ category: c }}
                    className="inline-flex h-9 items-center border border-line-strong px-3 text-eyebrow text-muted-foreground transition-colors hover:border-signal hover:text-signal"
                  >
                    {getCategory(c).label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-lede text-muted-foreground md:col-span-7">{project.overview}</p>
          </div>
        </header>
      </div>

      <div className="container-x mt-14 md:mt-20">
        <MediaFrame media={project.cover} title={project.title} palette={project.palette} aspect="wide" priority sizes="100vw" reveal={false} />
      </div>

      <div className="container-x mt-20 grid gap-12 md:mt-28 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4" data-reveal>
          <h2 className="text-eyebrow text-muted-foreground">My role</h2>
          <p className="mt-4 text-foreground">{project.role}</p>
        </div>
        <div className="md:col-span-3" data-reveal>
          <h2 className="text-eyebrow text-muted-foreground">Deliverables</h2>
          <ul className="mt-4 space-y-2 text-foreground">
            {project.deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-5" data-reveal>
          <h2 className="text-eyebrow text-muted-foreground">Creative direction</h2>
          <p className="mt-4 text-foreground">{project.direction}</p>
          {(project.liveUrl || project.prototypeUrl) && (
            <div className="mt-6 flex flex-wrap gap-6">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 font-semibold text-signal">
                  <span className="link-line">Visit live site</span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              )}
              {project.prototypeUrl && (
                <a href={project.prototypeUrl} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 font-semibold text-signal">
                  <span className="link-line">View prototype</span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {showSectionNav && (
        <nav aria-label="In this case study" className="container-x mt-20 md:mt-28">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-line py-5">
            <span className="text-eyebrow text-muted-foreground">In this case study</span>
            {project.sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="link-line text-sm font-medium text-foreground hover:text-signal">
                {s.title}
              </a>
            ))}
          </div>
        </nav>
      )}

      {project.sections.map((s, i) => (
        <CaseStudySection key={s.id} section={s} index={i} ctx={ctx} />
      ))}

      <div className="mt-28 border-t border-line md:mt-40">
        <Link to="/work/$slug" params={{ slug: next.slug }} className="group container-x block py-16 md:py-24">
          <p className="text-eyebrow text-muted-foreground">Next project</p>
          <p className="mt-4 flex items-end justify-between gap-6 text-headline text-foreground transition-colors duration-500 group-hover:text-signal">
            <span>{next.title}</span>
            <ArrowUpRight aria-hidden="true" className="h-[0.7em] w-[0.7em] shrink-0 transition-transform duration-700 ease-cinematic group-hover:rotate-45" />
          </p>
        </Link>
      </div>
    </article>
  );
}
