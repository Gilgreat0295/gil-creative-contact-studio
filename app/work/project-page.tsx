import type { Metadata } from 'next';
import { CaseStudyView } from '@/components/site/CaseStudyView';
import { getProject } from '@/lib/portfolio';

export function metadataForProject(slug: string): Metadata {
  const project = getProject(slug);
  if (!project) return { title: 'Project not found', robots: { index: false } };

  return {
    title: project.title,
    description: project.overview,
    openGraph: {
      title: `${project.title} — Gil Creative Co.`,
      description: project.summary,
      type: 'article',
      images: [],
    },
    twitter: {
      card: 'summary',
      title: `${project.title} — Gil Creative Co.`,
      description: project.summary,
      images: [],
    },
  };
}

export function StaticProjectPage({ slug }: { slug: string }) {
  const project = getProject(slug);
  if (!project) return null;
  return <CaseStudyView project={project} />;
}
