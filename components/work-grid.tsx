'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import { projects, publishedCategories } from '@/content/site';
import { ProjectCard } from './project-card';

export function WorkGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requested = searchParams.get('category');
  const active = publishedCategories.some((category) => category.slug === requested) ? requested : 'all';
  const visible = active === 'all' ? projects : projects.filter((project) => project.categories.includes(active as never));
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const options = [{ label: 'All Work', slug: 'all' }, ...publishedCategories];

  function select(slug: string) {
    router.push(slug === 'all' ? '/work' : `/work?category=${slug}`, { scroll: false });
  }

  function handleKey(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const current = buttonRefs.current.findIndex((button) => button === document.activeElement);
    let next = current;
    if (event.key === 'ArrowRight') next = (current + 1) % options.length;
    if (event.key === 'ArrowLeft') next = (current - 1 + options.length) % options.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = options.length - 1;
    buttonRefs.current[next]?.focus();
  }

  return (
    <>
      <div className="filter-bar" role="toolbar" aria-label="Filter work by service" onKeyDown={handleKey}>
        {options.map((option, index) => (
          <button
            type="button"
            className={active === option.slug ? 'active' : ''}
            aria-pressed={active === option.slug}
            onClick={() => select(option.slug)}
            ref={(node) => { buttonRefs.current[index] = node; }}
            key={option.slug}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="filter-result" aria-live="polite">{visible.length} {visible.length === 1 ? 'project' : 'projects'} shown</p>
      <div className="work-grid" key={active}>
        {visible.map((project, index) => (
          <ProjectCard project={project} index={projects.indexOf(project)} from={active === 'all' ? undefined : active} key={project.slug} className={`work-card work-card-${index % 3}`} />
        ))}
      </div>
    </>
  );
}
