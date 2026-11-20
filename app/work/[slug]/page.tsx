import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { MotionProvider } from '@/components/motion-provider';
import { MediaBlock } from '@/components/media-block';
import { categoryLabel, projects } from '@/content/site';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Gil Creative Co.`,
    description: project.summary,
    openGraph: { title: `${project.title} — Gil Creative Co.`, description: project.summary, images: [] },
    twitter: { card: 'summary', title: `${project.title} — Gil Creative Co.`, description: project.summary, images: [] },
  };
}

export default async function CaseStudyPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ from?: string }> }) {
  const { slug } = await params;
  const { from } = await searchParams;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const nextProject = projects[(index + 1) % projects.length];
  const backHref = from ? `/work?category=${encodeURIComponent(from)}` : '/work';

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="case-page">
        <header className="case-hero">
          <div className="case-kicker">
            <Link className="text-link" href={backHref}>← Back to work</Link>
            <span>{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
          </div>
          {project.label && <p className="case-label">{project.label}</p>}
          <h1><span className="hero-line">{project.title}</span></h1>
          <div className="case-tags">{project.categories.map((category) => <span key={category}>{categoryLabel(category)}</span>)}</div>
        </header>

        <div className={`case-cover ${project.coverTone} signature-media`} aria-label={`${project.title} media placeholder`}>
          <span className="cover-mark" aria-hidden="true">{project.coverMark}</span>
          <p>Primary project media ready to replace</p>
        </div>

        <section className="case-overview" aria-labelledby="overview-title">
          <div><p className="eyebrow">Overview</p><h2 id="overview-title">{project.summary}</h2></div>
          <dl>
            <div><dt>Role</dt><dd>{project.role}</dd></div>
            <div><dt>Deliverables</dt><dd>{project.deliverables}</dd></div>
          </dl>
        </section>

        <section className="case-direction">
          <p className="eyebrow">Creative direction</p>
          <p>{project.direction}</p>
        </section>

        {project.sections.length > 1 && (
          <nav className="case-jump" aria-label="Case study sections">
            <span>Jump to</span>
            {project.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}
          </nav>
        )}

        <div className="case-sections">
          {project.sections.map((section, sectionIndex) => (
            <section className="case-section" id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
              <div className="case-section-head">
                <span>{String(sectionIndex + 1).padStart(2, '0')}</span>
                <div><h2 id={`${section.id}-title`}>{section.title}</h2><p>{section.body}</p></div>
              </div>
              <div className={`media-grid media-count-${section.media.length}`}>
                {section.media.map((media, mediaIndex) => <MediaBlock key={`${section.id}-${media.label}`} tone={project.coverTone} ratio={media.ratio} label={media.label} priority={sectionIndex === 0 && mediaIndex === 0} />)}
              </div>
            </section>
          ))}
        </div>

        {project.liveUrl && <div className="live-link"><a className="button button-accent" href={project.liveUrl}>Visit live project <span aria-hidden="true">↗</span></a></div>}

        <nav className="case-next" aria-label="Case study navigation">
          <span>Next project</span>
          <Link href={`/work/${nextProject.slug}${from ? `?from=${encodeURIComponent(from)}` : ''}`}>
            <strong>{nextProject.title}</strong><span aria-hidden="true">→</span>
          </Link>
        </nav>
      </main>
      <SiteFooter />
      <MotionProvider />
    </>
  );
}
