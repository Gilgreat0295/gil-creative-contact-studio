import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { MotionProvider } from '@/components/motion-provider';
import { WorkGrid } from '@/components/work-grid';

export const metadata: Metadata = {
  title: 'Work — Gil Creative Co.',
  description: 'Explore branding, visual design, motion, video and website projects by Gil Creative Co.',
};

export default function WorkPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="work-page">
        <section className="page-hero">
          <p className="eyebrow">Work index</p>
          <h1><span className="hero-line">Selected projects,</span><span className="hero-line hero-muted">sorted your way.</span></h1>
          <p>One body of work, viewed through the discipline that matters to your project.</p>
        </section>
        <section className="work-index" aria-label="Portfolio projects">
          <Suspense fallback={<p className="filter-result">Loading work…</p>}>
            <WorkGrid />
          </Suspense>
        </section>
      </main>
      <SiteFooter />
      <MotionProvider />
    </>
  );
}
