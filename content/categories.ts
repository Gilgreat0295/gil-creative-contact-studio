/**
 * Shared taxonomy for Services, Work filters and the enquiry form.
 * The order here is the order used across the site.
 */
export const CATEGORIES = [
  {
    slug: "branding",
    label: "Branding",
    description: "Logo design, visual identity systems, and brand guidelines.",
    subcategories: [],
  },
  {
    slug: "visual-design",
    label: "Visual Design",
    description: "Campaign artwork, social graphics, menus, and print or outdoor advertising.",
    subcategories: ["Flyers / Posters", "Social Media", "Book Covers"],
  },
  {
    slug: "motion-design",
    label: "Motion Design",
    description: "Animated typography, logo animation, and motion graphics for campaigns.",
    subcategories: [],
  },
  {
    slug: "video-editing",
    label: "Video Editing",
    description: "Short-form social reels, promotional videos, and product or food edits.",
    subcategories: [],
  },
  {
    slug: "website-design",
    label: "Website Design",
    description: "Responsive website design and builds for businesses and brands.",
    subcategories: [],
  },
  {
    slug: "ui-ux-design",
    label: "UI & UX",
    description:
      "User flows, wireframes, interface design, and interactive prototypes for apps and digital products.",
    subcategories: [],
  },
  {
    slug: "ai-ugc-ads",
    label: "AI & UGC",
    description: "AI-assisted, creator-style video ads for product demos and paid social campaigns.",
    subcategories: [],
  },
] as const;

export type Category = (typeof CATEGORIES)[number];
export type CategorySlug = Category["slug"];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug) as CategorySlug[];

export function getCategory(slug: CategorySlug): Category {
  return CATEGORIES.find((c) => c.slug === slug)!;
}

export function isCategorySlug(value: unknown): value is CategorySlug {
  return typeof value === "string" && (CATEGORY_SLUGS as string[]).includes(value);
}
