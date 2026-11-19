import type { CategorySlug } from "./categories";

/** Frame shape. Space is reserved from this ratio so media never shifts the layout. */
export type MediaAspect = "landscape" | "portrait" | "square" | "wide" | "screen" | "video" | "story";

type MediaBase = {
  /** Public path or absolute URL. Leave undefined until the asset is supplied. */
  src?: string;
  /** Describe what the image shows for screen readers. */
  alt: string;
  aspect: MediaAspect;
  caption?: string;
  /** What should go here — shown on the empty frame in the build preview. */
  needs?: string;
};

export type ImageMedia = MediaBase & {
  kind: "image";
  /** Optional responsive sources, e.g. "/work/savour/menu-800.jpg 800w, /work/savour/menu-1600.jpg 1600w". */
  srcSet?: string;
  sizes?: string;
};

export type VideoMedia = MediaBase & {
  kind: "video";
  poster?: string;
  /** WebVTT captions file. */
  captionsSrc?: string;
  transcript?: string;
};

export type Media = ImageMedia | VideoMedia;

export type MediaBlock =
  | { type: "full"; media: Media }
  | { type: "pair"; items: [Media, Media] }
  | { type: "single"; media: Media; align?: "left" | "right" | "center" }
  | { type: "text"; heading?: string; body: string };

export type CaseSection = {
  /** Used for the anchor link: /work/slug#id */
  id: string;
  title: string;
  intro?: string;
  blocks: MediaBlock[];
};

export type ProjectLabel = "Concept project" | "Identity exploration";

export type Project = {
  slug: string;
  title: string;
  /** One line used on cards. */
  summary: string;
  categories: CategorySlug[];
  /** Featured projects appear in Selected Work on the homepage, in `featuredOrder`. */
  featured?: boolean;
  featuredOrder?: number;
  label?: ProjectLabel;
  tagline?: string;
  /** The brand's own colours, used on empty frames until real media is supplied. */
  palette: string[];
  cover: Media;
  overview: string;
  role: string;
  deliverables: string[];
  direction: string;
  liveUrl?: string;
  prototypeUrl?: string;
  sections: CaseSection[];
};
