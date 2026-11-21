"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/content/categories";
import { site } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import { getFeaturedProjects, hasPublishedWork } from "@/lib/portfolio";
import { getGsap, isDesktop, prefersReducedMotion, useIsoLayoutEffect, useReveal } from "@/lib/motion";
import { Showreel } from "./Showreel";
import { FeatureExpand } from "./FeatureExpand";
import { ProjectCard } from "./ProjectCard";
import { ContactForm } from "./ContactForm";
import { getContactLinks, getSocialLinks } from "./contact-links";

const HEADLINE = ["Design", "with", "a", "point", "of", "view."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const desktop = isDesktop();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from("[data-hero-word]", { yPercent: 110, duration: desktop ? 1.2 : 0.9, stagger: 0.07 })
        .from("[data-hero-fade]", { autoAlpha: 0, y: desktop ? 16 : 0, duration: 0.9, stagger: 0.08 }, "-=0.8")
        .from("[data-hero-reel]", desktop ? { autoAlpha: 0, clipPath: "inset(0% 0% 100% 0%)", duration: 1.4, clearProps: "clipPath" } : { autoAlpha: 0, duration: 0.8 }, "-=0.9");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} aria-labelledby="hero-title" className="pt-[calc(var(--header-height)+3rem)] md:pt-[calc(var(--header-height)+5rem)]">
      <div className="container-x">
        <p data-hero-fade className="text-eyebrow text-muted-foreground">
          {site.name} — Independent creative practice
        </p>
        <h1 id="hero-title" className="mt-6 text-display text-foreground" aria-label="Design with a point of view.">
          {HEADLINE.map((w, i) => (
            <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span data-hero-word className="inline-block">
                {w === "view." ? <>view<span className="text-signal">.</span></> : w}
              </span>
              {i < HEADLINE.length - 1 && "\u00A0"}
            </span>
          ))}
        </h1>
        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <p data-hero-fade className="text-lede text-muted-foreground md:col-span-6 lg:col-span-5">
            I build visual identities, design campaigns and digital experiences, and bring ideas to life through motion and video.
          </p>
          <div data-hero-fade className="flex flex-wrap gap-3 md:col-span-6 md:justify-end lg:col-span-7">
            <Link href="/work" className={buttonVariants({ variant: "cta", size: "xl" })}>
              View work <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/#contact" className={buttonVariants({ variant: "cta-outline", size: "xl" })}>
              Start a project
            </Link>
          </div>
        </div>
        <p data-hero-fade className="mt-10 text-eyebrow text-muted-foreground md:mt-14">{site.availability}</p>
      </div>
      <div className="container-x mt-8 md:mt-10">
        <Showreel />
      </div>
    </section>
  );
}

function SectionHeading({ index, title, id, children }: { index: string; title: string; id: string; children?: React.ReactNode }) {
  return (
    <div className="container-x grid gap-6 border-t border-line pt-8 md:grid-cols-12 md:pt-10">
      <p className="text-eyebrow text-muted-foreground md:col-span-3" data-reveal>{index}</p>
      <div className="md:col-span-9">
        <h2 id={id} tabIndex={-1} className="text-headline text-foreground" data-reveal>{title}</h2>
        {children}
      </div>
    </div>
  );
}

export function SelectedWork() {
  const ref = useRef<HTMLElement>(null);
  const [first, ...rest] = getFeaturedProjects();
  return (
    <section ref={ref} aria-labelledby="selected-title" className="mt-28 md:mt-40">
      <SectionHeading index="(01)" title="Selected work" id="selected-title" />
      <div className="mt-12 md:mt-16">{first && <FeatureExpand project={first} />}</div>
      <div className="container-x mt-20 grid gap-16 md:mt-28 md:grid-cols-12 md:gap-x-8">
        {rest[0] && (
          <ProjectCard project={rest[0]} aspect="portrait" className="md:col-span-5" sizes="(min-width: 768px) 40vw, 100vw" />
        )}
        {rest[1] && (
          <ProjectCard project={rest[1]} aspect="landscape" className="md:col-span-7 md:mt-48" sizes="(min-width: 768px) 55vw, 100vw" />
        )}
        {rest.slice(2).map((p) => (
          <ProjectCard key={p.slug} project={p} aspect="landscape" className="md:col-span-6" />
        ))}
      </div>
      <div className="container-x mt-16 flex md:mt-24 md:justify-center">
        <Link href="/work" className={buttonVariants({ variant: "cta-outline", size: "xl" })}>
          View all work <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section aria-labelledby="services" className="mt-28 md:mt-40">
      <SectionHeading index="(02)" title="Services" id="services">
        <p className="mt-6 max-w-xl text-lede text-muted-foreground" data-reveal>
          Seven disciplines. One practice. Pick one or combine them.
        </p>
      </SectionHeading>
      <ol className="container-x mt-12 md:mt-16">
        {CATEGORIES.map((c, i) => {
          const published = hasPublishedWork(c.slug);
          const inner = (
            <>
              <span className="text-eyebrow text-muted-foreground md:col-span-3">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-title text-foreground transition-transform duration-700 ease-cinematic group-hover:translate-x-2 md:col-span-4">
                {c.label}
              </span>
              <span className="text-muted-foreground md:col-span-3">{c.description}</span>
              <span className="flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-signal md:col-span-2 md:justify-end">
                {published ? "See work" : "Enquire"}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-500 ease-cinematic group-hover:rotate-45" />
              </span>
            </>
          );
          const rowClass = "group grid gap-3 border-t border-line py-7 md:grid-cols-12 md:items-center md:gap-8 md:py-9";
          return (
            <li key={c.slug} data-reveal className={i === CATEGORIES.length - 1 ? "border-b border-line" : ""}>
              {published ? (
                <Link href={`/work?category=${c.slug}`} className={rowClass} aria-label={`${c.label} — see work`}>
                  {inner}
                </Link>
              ) : (
                <Link href={`/?service=${c.slug}#contact`} className={rowClass} aria-label={`${c.label} — start an enquiry`}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function About() {
  const { portrait } = site;
  return (
    <section aria-labelledby="about" className="mt-28 md:mt-40">
      <SectionHeading index="(03)" title="About" id="about" />
      <div className="container-x mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5 lg:col-span-4 md:col-start-1 lg:col-start-4">
          {portrait.src ? (
            <div className="relative aspect-[4/5] overflow-hidden bg-surface" data-reveal="media">
              <div data-reveal-inner className="absolute inset-0">
                <img src={portrait.src} alt={portrait.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
            </div>
          ) : (
            <dl className="grid gap-6 border-l border-line-strong pl-6 text-sm" data-reveal>
              <div>
                <dt className="text-eyebrow text-muted-foreground">Studio</dt>
                <dd className="mt-1 text-foreground">{site.name}</dd>
              </div>
              <div>
                <dt className="text-eyebrow text-muted-foreground">Led by</dt>
                <dd className="mt-1 text-foreground">{site.owner}</dd>
              </div>
              <div>
                <dt className="text-eyebrow text-muted-foreground">Based in</dt>
                <dd className="mt-1 text-foreground">{site.location}</dd>
              </div>
              <div>
                <dt className="text-eyebrow text-muted-foreground">Working</dt>
                <dd className="mt-1 text-foreground">On site and remote</dd>
              </div>
              {process.env.NODE_ENV === "development" && (
                <p className="text-eyebrow text-signal">Portrait slot · add it in site settings</p>
              )}
            </dl>
          )}
        </div>
        <div className="md:col-span-7 lg:col-span-5">
          <p className="text-[clamp(1.35rem,2.4vw,2.1rem)] font-medium leading-[1.25] tracking-[-0.025em] text-foreground" data-reveal>
            I’m Gilbert Gospel Jacob, the designer behind Gil Creative Co. I work across branding, campaigns, motion and digital design.
          </p>
          <p className="mt-8 max-w-xl text-lede text-muted-foreground" data-reveal>
            My work ranges from visual campaigns for restaurants and delivery brands to websites and creative communications for businesses in marine technology and other industries. I’m based in Port Harcourt and available for remote projects.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Contact({ preselect }: { preselect?: string | undefined }) {
  const contacts = getContactLinks();
  const socials = getSocialLinks();
  return (
    <section aria-labelledby="contact" className="mt-28 pb-28 md:mt-40 md:pb-40">
      <SectionHeading index="(04)" title="Let’s talk about your project." id="contact" />
      <div className="container-x mt-12 grid gap-14 md:mt-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3">
          {(contacts.length > 0 || socials.length > 0) && (
            <ul className="space-y-6" data-reveal>
              {contacts.map((c) => (
                <li key={c.label}>
                  <p className="text-eyebrow text-muted-foreground">{c.label}</p>
                  <a href={c.href} className="link-line mt-1 inline-block break-all text-foreground hover:text-signal" {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}>
                    {c.value}
                  </a>
                </li>
              ))}
              {socials.length > 0 && (
                <li>
                  <p className="text-eyebrow text-muted-foreground">Elsewhere</p>
                  <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                    {socials.map((s) => (
                      <li key={s.label}>
                        <a href={s.url} target="_blank" rel="noreferrer" className="link-line text-foreground hover:text-signal">{s.label}</a>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
            </ul>
          )}
        </div>
        <div className="md:col-span-9" data-reveal>
          <ContactForm preselect={preselect} />
        </div>
      </div>
    </section>
  );
}

export function HomePage({ preselect }: { preselect?: string | undefined }) {
  return (
    <div>
      <Hero />
      <RevealScope>
        <SelectedWork />
        <Services />
        <About />
        <Contact preselect={preselect} />
      </RevealScope>
    </div>
  );
}

function RevealScope({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  return <div ref={ref}>{children}</div>;
}
