import { CATEGORIES, type CategorySlug, isCategorySlug } from "@/content/categories";
import { PROJECTS } from "@/content/projects";
import type { Project } from "@/content/types";

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects(projects: Project[] = PROJECTS): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
}

export function projectsInCategory(
  category: CategorySlug | undefined,
  projects: Project[] = PROJECTS,
): Project[] {
  if (!category) return projects;
  return projects.filter((p) => p.categories.includes(category));
}

/** Categories that have at least one published project — these get a Work filter. */
export function publishedCategories(projects: Project[] = PROJECTS) {
  return CATEGORIES.filter((c) => projects.some((p) => p.categories.includes(c.slug)));
}

export function hasPublishedWork(slug: CategorySlug, projects: Project[] = PROJECTS): boolean {
  return projects.some((p) => p.categories.includes(slug));
}

/** Only categories with published work are valid filters; anything else falls back to All Work. */
export function parseWorkCategory(
  value: unknown,
  projects: Project[] = PROJECTS,
): CategorySlug | undefined {
  return isCategorySlug(value) && hasPublishedWork(value, projects) ? value : undefined;
}

export function getNextProject(slug: string, projects: Project[] = PROJECTS): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length]!;
}
