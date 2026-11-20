import Link from 'next/link';
import { categoryLabel, type Project } from '@/content/site';

type Props = { project: Project; index: number; from?: string; className?: string };

export function ProjectCard({ project, index, from, className = '' }: Props) {
  const href = `/work/${project.slug}${from ? `?from=${encodeURIComponent(from)}` : ''}`;
  return (
    <Link className={`project-card ${className}`} href={href} data-reveal>
      <div className={`project-art ${project.coverTone}`} aria-label={`${project.title} cover placeholder`}>
        <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="project-mark" aria-hidden="true">{project.coverMark}</span>
        <span className="art-caption">Media ready to replace</span>
      </div>
      <div className="project-meta">
        <div>
          <h3>{project.title}</h3>
          <p>{project.categories.map(categoryLabel).join(' · ')}</p>
          {project.label && <span className="project-label">{project.label}</span>}
        </div>
        <span aria-hidden="true">↗</span>
      </div>
    </Link>
  );
}
