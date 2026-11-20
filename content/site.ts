export const categories = [
  { label: 'Branding', slug: 'branding' },
  { label: 'Visual Design', slug: 'visual-design' },
  { label: 'Motion Design', slug: 'motion-design' },
  { label: 'Video Editing', slug: 'video-editing' },
  { label: 'Website Design', slug: 'website-design' },
  { label: 'UI/UX Design', slug: 'ui-ux-design' },
  { label: 'AI UGC Ads', slug: 'ai-ugc-ads' },
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];

export const services = [
  { name: 'Branding', category: 'branding', description: 'Logo design, visual identity systems, and brand guidelines.' },
  { name: 'Visual Design', category: 'visual-design', description: 'Campaign artwork, social graphics, menus, and print or outdoor advertising.' },
  { name: 'Motion Design', category: 'motion-design', description: 'Animated typography, logo animation, and motion graphics for campaigns.' },
  { name: 'Video Editing', category: 'video-editing', description: 'Short-form social reels, promotional videos, and product or food edits.' },
  { name: 'Website Design', category: 'website-design', description: 'Responsive website design and builds for businesses and brands.' },
  { name: 'UI/UX Design', category: 'ui-ux-design', description: 'User flows, wireframes, interface design, and interactive prototypes for apps and digital products.' },
  { name: 'AI UGC Ads', category: 'ai-ugc-ads', description: 'AI-assisted, creator-style video ads for product demos and paid social campaigns.' },
] as const;

export type ProjectSection = {
  id: string;
  title: string;
  body: string;
  media: Array<{ ratio: 'landscape' | 'portrait' | 'wide'; label: string }>;
};

export type Project = {
  slug: string;
  title: string;
  label?: 'Concept project' | 'Identity exploration';
  categories: CategorySlug[];
  summary: string;
  role: string;
  deliverables: string;
  direction: string;
  coverTone: string;
  coverMark: string;
  featured: boolean;
  sections: ProjectSection[];
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: 'savour-by-meire',
    title: 'Savour By Meire',
    categories: ['visual-design', 'motion-design', 'video-editing', 'website-design'],
    summary: 'A connected campaign and digital system for a fine dining brand in Port Harcourt.',
    role: 'Visual designer, motion designer, video editor and website designer.',
    deliverables: 'Social campaign artwork, menu design, billboard design, motion assets, food reel edits and website design.',
    direction: 'The work uses Savour’s red, black and white palette with assertive typography and generous food-led compositions. Each discipline feels distinct while staying recognisably Savour.',
    coverTone: 'savour',
    coverMark: 'S',
    featured: true,
    sections: [
      { id: 'campaign', title: 'Campaign & visual design', body: 'Social artwork, menu layouts and outdoor concepts give the brand a direct, polished campaign language.', media: [{ ratio: 'landscape', label: 'Campaign artwork' }, { ratio: 'portrait', label: 'Menu design' }, { ratio: 'portrait', label: 'Billboard concept' }] },
      { id: 'motion', title: 'Motion design', body: 'Animated type and campaign transitions translate the graphic language into short, energetic sequences.', media: [{ ratio: 'wide', label: 'Motion asset — video pending' }] },
      { id: 'video', title: 'Food reel edits', body: 'Short edits are paced around texture, plating and the final reveal while keeping the food central.', media: [{ ratio: 'portrait', label: 'Food reel — video pending' }, { ratio: 'portrait', label: 'Social edit — video pending' }] },
      { id: 'website', title: 'Website design', body: 'The website extends the visual system into a clear digital experience built around discovery and reservations.', media: [{ ratio: 'wide', label: 'Website screen' }] },
    ],
  },
  {
    slug: 'nourri-food-drinks',
    title: 'Nourri Food & Drinks',
    categories: ['visual-design', 'website-design'],
    summary: 'A delivery-first website and campaign direction for a food and drinks brand.',
    role: 'Visual designer and website designer.',
    deliverables: 'Responsive website design and delivery-focused campaign concepts.',
    direction: 'Nourri’s red and orange lead the system. Riders, bags and delivery touchpoints frame the brand around speed, appetite and the handoff at the customer’s door.',
    coverTone: 'nourri',
    coverMark: 'N',
    featured: true,
    sections: [
      { id: 'digital', title: 'Delivery-first website', body: 'The site keeps ordering cues and delivery information close, with a bright visual system that stays clear on small screens.', media: [{ ratio: 'wide', label: 'Responsive website screens' }] },
      { id: 'campaign', title: 'Campaign concepts', body: 'The campaign language makes delivery part of the story through bold colour, direct offers and rider-led scenes where the supplied artwork supports them.', media: [{ ratio: 'landscape', label: 'Delivery campaign artwork' }, { ratio: 'portrait', label: 'Social campaign format' }] },
    ],
  },
  {
    slug: 'storgetech-solutions-limited',
    title: 'StorgeTech Solutions Limited',
    categories: ['visual-design', 'motion-design'],
    summary: 'Visual communications for a marine technology company, shaped by equipment, systems and engineering.',
    role: 'Visual designer and motion designer.',
    deliverables: 'Campaign concepts, visual communications and motion assets.',
    direction: 'Marine equipment and engineered systems informed the image treatment, structured typography and cool industrial palette. My contribution was translating technical subject matter into clear, engaging communication.',
    coverTone: 'storge',
    coverMark: 'ST',
    featured: true,
    sections: [
      { id: 'communications', title: 'Visual communications', body: 'A structured layout system gives technical messages a clear hierarchy while leaving space for the equipment and industry context.', media: [{ ratio: 'landscape', label: 'Marine technology campaign' }, { ratio: 'portrait', label: 'Technical communication format' }] },
      { id: 'motion', title: 'Motion work', body: 'Motion extends the same system through measured pacing, linework and type transitions inspired by engineered movement.', media: [{ ratio: 'wide', label: 'Motion sequence — video pending' }] },
    ],
  },
  {
    slug: 'brisk-n-slick',
    title: 'Brisk n Slick',
    label: 'Concept project',
    categories: ['visual-design'],
    summary: 'Black-and-gold campaign artwork and surreal visual concepts for a unisex salon.',
    role: 'Visual designer and art director.',
    deliverables: 'Campaign artwork and social design concepts.',
    direction: 'Hair, grooming tools and salon rituals become the raw material for surreal, high-contrast compositions. Black and gold keep the series premium and consistent.',
    coverTone: 'brisk',
    coverMark: 'B/S',
    featured: false,
    sections: [
      { id: 'campaign', title: 'Campaign artwork', body: 'A concept-led series built around hair, tools and the salon experience, balancing surreal image ideas with clear promotional space.', media: [{ ratio: 'landscape', label: 'Black-and-gold campaign' }, { ratio: 'portrait', label: 'Surreal salon artwork' }, { ratio: 'portrait', label: 'Social campaign format' }] },
    ],
  },
  {
    slug: 'jims-collections',
    title: 'JIMS COLLECTIONS',
    label: 'Identity exploration',
    categories: ['branding'],
    summary: 'A provisional identity exploration for a perfumery, beauty and fashion brand.',
    role: 'Brand identity designer.',
    deliverables: 'Early logo sketches, wordmark exploration and black-and-white refinements.',
    direction: 'The identity begins with versatile black-and-white forms designed to move across fragrance, beauty and fashion. The line “Made for your story” anchors the exploration.',
    coverTone: 'jims',
    coverMark: 'J',
    featured: false,
    sections: [
      { id: 'sketches', title: 'Early sketches', body: 'Loose marks and letterform studies explore how one identity could hold three product worlds without becoming generic.', media: [{ ratio: 'landscape', label: 'Early identity sketches' }] },
      { id: 'refinements', title: 'Black-and-white refinements', body: 'The strongest routes are reduced to simple, adaptable forms before colour, packaging or campaign applications are introduced.', media: [{ ratio: 'portrait', label: 'Wordmark refinement' }, { ratio: 'portrait', label: 'Monogram refinement' }] },
    ],
  },
];

export const contact = {
  email: '',
  whatsapp: '',
  socials: [] as Array<{ label: string; href: string }>,
};

export const showreel = {
  src: '',
  poster: '',
};

export function categoryLabel(slug: CategorySlug) {
  return categories.find((category) => category.slug === slug)?.label ?? slug;
}

export const publishedCategories = categories.filter((category) =>
  projects.some((project) => project.categories.includes(category.slug)),
);
