import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/site/CaseStudyView";
import { PROJECTS } from "@/content/projects";
import { getProject } from "@/lib/portfolio";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found", robots: { index: false } };
  return {
    title: project.title,
    description: project.overview,
    openGraph: {
      title: `${project.title} — Gil Creative Co.`,
      description: project.summary,
      type: "article",
      images: [],
    },
    twitter: {
      card: "summary",
      title: `${project.title} — Gil Creative Co.`,
      description: project.summary,
      images: [],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <CaseStudyView project={project} />;
}
