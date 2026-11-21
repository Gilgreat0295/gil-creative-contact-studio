/**
 * Site configuration — edit this file to update contact details, links,
 * the showreel and the About portrait. Empty strings hide the related UI.
 */
export const site = {
  name: "Gil Creative Co.",
  owner: "Gilbert Gospel Jacob",
  location: "Port Harcourt, Nigeria",
  availability: "Based in Port Harcourt, Nigeria. Available for remote projects.",

  contact: {
    /** Enquiry form opens an email draft to this address. Leave "" to show "Copy project brief". */
    email: "gilcreative.co@gmail.com",
    /** International format, digits only, e.g. "2348012345678". Leave "" to hide. */
    whatsapp: "2349050286634",
  },

  /** Add a URL to show a link. Empty URLs are hidden. */
  socials: [
    { label: "Instagram", url: "" },
    { label: "Behance", url: "" },
    { label: "LinkedIn", url: "" },
    { label: "Facebook", url: "" },
  ],

  /** Homepage showreel. The play button only appears when `src` is set. */
  showreel: {
    src: "",
    poster: "",
    captionsSrc: "",
    title: "Gil Creative Co. showreel",
  },

  /** About section portrait. Leave src "" until a portrait is ready. */
  portrait: {
    src: "",
    alt: "Portrait of Gilbert Gospel Jacob",
  },
} as const;

export type SiteConfig = typeof site;

