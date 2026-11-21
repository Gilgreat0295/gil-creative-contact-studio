import type { Project } from "./types";

/**
 * Portfolio content. Add a project by adding an entry; tag it with as many
 * categories as apply. Drop files into /public/work/<slug>/ and set `src`.
 * The order of this array is the order on the Work page.
 */
export const PROJECTS: Project[] = [
  {
    slug: "savour-by-meire",
    title: "Savour By Meire",
    summary: "Campaigns, menus, motion and web for a fine dining brand in Port Harcourt.",
    categories: ["visual-design", "motion-design", "video-editing", "website-design"],
    featured: true,
    featuredOrder: 1,
    palette: ["#B3121B", "#0A0A0A", "#FFFFFF"],
    cover: {
      kind: "image",
      alt: "Savour By Meire campaign artwork in red, black and white",
      aspect: "wide",
      needs: "Hero campaign artwork · 2400×1030",
    },
    overview:
      "Savour By Meire is a fine dining brand in Port Harcourt. I work across its visual output — social campaigns, menus, outdoor advertising, motion, food reels and the website.",
    role:
      "I design the campaign artwork and print pieces, animate assets for social, edit the food reels and designed the website. Each piece is built to sit inside the same red, black and white system.",
    deliverables: [
      "Social campaign artwork",
      "Menu design",
      "Billboard design",
      "Motion assets",
      "Food reel edits",
      "Website design",
    ],
    direction:
      "Red, black and white do most of the work. The food stays the hero, typography stays confident, and every format — from a phone screen to a billboard — reads as the same restaurant.",
    sections: [
      {
        id: "visual-design",
        title: "Visual Design",
        intro: "Social campaign artwork, menu design and billboard design.",
        blocks: [
          {
            type: "pair",
            items: [
              { kind: "image", alt: "Savour By Meire social campaign post", aspect: "portrait", needs: "Social campaign post · 1080×1350" },
              { kind: "image", alt: "Savour By Meire social campaign post", aspect: "portrait", needs: "Social campaign post · 1080×1350" },
            ],
          },
          {
            type: "single",
            align: "right",
            media: { kind: "image", alt: "Savour By Meire menu design", aspect: "portrait", needs: "Menu design spread" },
          },
          {
            type: "full",
            media: { kind: "image", alt: "Savour By Meire billboard design", aspect: "wide", needs: "Billboard design or mock-up · 2400×1030" },
          },
        ],
      },
      {
        id: "motion-design",
        title: "Motion Design",
        intro: "Animated assets for social campaigns.",
        blocks: [
          {
            type: "pair",
            items: [
              { kind: "video", alt: "Savour By Meire animated campaign asset", aspect: "story", needs: "Motion asset · 1080×1920 MP4 + poster" },
              { kind: "video", alt: "Savour By Meire animated campaign asset", aspect: "story", needs: "Motion asset · 1080×1920 MP4 + poster" },
            ],
          },
        ],
      },
      {
        id: "video-editing",
        title: "Video Editing",
        intro: "Short-form food reels for social.",
        blocks: [
          {
            type: "single",
            align: "left",
            media: { kind: "video", alt: "Savour By Meire food reel", aspect: "story", needs: "Food reel · 1080×1920 MP4 + poster" },
          },
        ],
      },
      {
        id: "website-design",
        title: "Website Design",
        intro: "The restaurant's website.",
        blocks: [
          {
            type: "full",
            media: { kind: "image", alt: "Savour By Meire website homepage", aspect: "screen", needs: "Website screenshot · desktop 2560×1600" },
          },
          {
            type: "pair",
            items: [
              { kind: "image", alt: "Savour By Meire website on mobile", aspect: "portrait", needs: "Website screenshot · mobile" },
              { kind: "image", alt: "Savour By Meire website menu page", aspect: "portrait", needs: "Website screenshot · inner page" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "nourri-food-and-drinks",
    title: "Nourri Food & Drinks",
    summary: "Website and delivery-led campaign concepts for a delivery-only food brand.",
    categories: ["visual-design", "website-design"],
    featured: true,
    featuredOrder: 2,
    palette: ["#E11D2A", "#F97316", "#FFF7ED"],
    cover: {
      kind: "image",
      alt: "Nourri Food & Drinks campaign artwork in red and orange",
      aspect: "portrait",
      needs: "Campaign artwork · 1600×2000",
    },
    overview:
      "Nourri Food & Drinks is a delivery-only brand. There is no dining room, so the delivery is the experience — and that is where the work focuses.",
    role:
      "I designed the website and developed campaign concepts built around the delivery experience.",
    deliverables: ["Website design", "Campaign concepts", "Social artwork"],
    direction:
      "Nourri's red and orange carry every piece. The campaigns centre on the moments a customer actually sees: the rider, the delivery bag and the scooter arriving at the door.",
    sections: [
      {
        id: "website-design",
        title: "Website Design",
        blocks: [
          {
            type: "full",
            media: { kind: "image", alt: "Nourri Food & Drinks website homepage", aspect: "screen", needs: "Website screenshot · desktop 2560×1600" },
          },
        ],
      },
      {
        id: "visual-design",
        title: "Campaign concepts",
        intro: "Concepts built around riders, delivery bags and scooters.",
        blocks: [
          {
            type: "pair",
            items: [
              { kind: "image", alt: "Nourri campaign concept featuring a delivery rider", aspect: "portrait", needs: "Campaign concept · rider" },
              { kind: "image", alt: "Nourri campaign concept featuring a delivery bag", aspect: "portrait", needs: "Campaign concept · delivery bag" },
            ],
          },
          {
            type: "full",
            media: { kind: "image", alt: "Nourri campaign concept featuring a delivery scooter", aspect: "landscape", needs: "Campaign concept · scooter" },
          },
        ],
      },
    ],
  },
  {
    slug: "storgetech-solutions",
    title: "StorgeTech Solutions Limited",
    summary: "Visual communications and motion for a marine technology company.",
    categories: ["visual-design", "motion-design"],
    featured: true,
    featuredOrder: 3,
    palette: ["#0B2A4A", "#1F6FB2", "#E6EEF5"],
    cover: {
      kind: "image",
      alt: "StorgeTech Solutions campaign visual inspired by marine equipment",
      aspect: "landscape",
      needs: "Campaign visual · 2400×1600",
    },
    overview:
      "StorgeTech Solutions Limited is a marine technology company. Its work is technical, so its communications need to be clear while still feeling considered.",
    role:
      "I design StorgeTech's visual communications, create motion pieces and develop campaign concepts. I take the technical subject matter and turn it into visuals people can read at a glance.",
    deliverables: ["Visual communications", "Motion graphics", "Campaign concepts"],
    direction:
      "The direction comes from the industry itself — marine equipment, engineering detail and the scale of work at sea.",
    sections: [
      {
        id: "visual-design",
        title: "Visual communications",
        blocks: [
          {
            type: "full",
            media: { kind: "image", alt: "StorgeTech campaign visual", aspect: "wide", needs: "Campaign visual · 2400×1030" },
          },
          {
            type: "pair",
            items: [
              { kind: "image", alt: "StorgeTech social graphic", aspect: "square", needs: "Social graphic · 1080×1080" },
              { kind: "image", alt: "StorgeTech social graphic", aspect: "square", needs: "Social graphic · 1080×1080" },
            ],
          },
        ],
      },
      {
        id: "motion-design",
        title: "Motion Design",
        blocks: [
          {
            type: "full",
            media: { kind: "video", alt: "StorgeTech motion piece", aspect: "video", needs: "Motion piece · 1920×1080 MP4 + poster" },
          },
        ],
      },
    ],
  },
  {
    slug: "brisk-n-slick",
    title: "Brisk n Slick",
    summary: "Black-and-gold campaign artwork and surreal concepts for a unisex salon.",
    categories: ["visual-design"],
    palette: ["#0A0A0A", "#C9A227", "#F5E6B8"],
    cover: {
      kind: "image",
      alt: "Brisk n Slick black-and-gold campaign artwork",
      aspect: "portrait",
      needs: "Campaign artwork · 1600×2000",
    },
    overview:
      "Brisk n Slick is a unisex salon. The campaigns use black and gold and lean into surreal concepts built around hair, grooming tools and the salon experience.",
    role: "I created the campaign artwork and developed the visual concepts.",
    deliverables: ["Campaign artwork", "Surreal visual concepts", "Social graphics"],
    direction:
      "Black and gold set a premium tone. Hair, combs, clippers and the salon chair are pulled into surreal compositions so the posts stop the scroll.",
    sections: [
      {
        id: "visual-design",
        title: "Campaign artwork",
        blocks: [
          {
            type: "pair",
            items: [
              { kind: "image", alt: "Brisk n Slick surreal concept built around hair", aspect: "portrait", needs: "Campaign artwork · hair concept" },
              { kind: "image", alt: "Brisk n Slick surreal concept built around grooming tools", aspect: "portrait", needs: "Campaign artwork · grooming tools" },
            ],
          },
          {
            type: "single",
            align: "center",
            media: { kind: "image", alt: "Brisk n Slick concept built around the salon experience", aspect: "square", needs: "Campaign artwork · salon experience" },
          },
        ],
      },
    ],
  },
  {
    slug: "ba-sam-global-furniture",
    title: "BA-SAM GLOBAL FURNITURE",
    summary: "Brand identity work for BA-SAM GLOBAL FURNITURE.",
    categories: ["branding"],
    palette: ["#1C1A17", "#B79A72", "#F2EADF"],
    cover: {
      kind: "image",
      alt: "BA-SAM GLOBAL FURNITURE branding project",
      aspect: "landscape",
      needs: "Brand identity cover · 2400×1600",
    },
    overview:
      "A branding project for BA-SAM GLOBAL FURNITURE, presented as a complete project on Behance.",
    role: "Brand identity designer.",
    deliverables: ["Brand identity", "Brand presentation"],
    direction:
      "The identity gives the furniture brand a clear, recognisable presence across its core applications.",
    behanceUrl:
      "https://www.behance.net/gallery/198257509/Branding-BA-SAM-GLOBAL-FURNITURE",
    sections: [
      {
        id: "brand-identity",
        title: "Brand identity",
        intro: "Explore the complete BA-SAM GLOBAL FURNITURE branding project on Behance.",
        blocks: [
          {
            type: "text",
            heading: "Complete project",
            body: "The full identity presentation and project imagery are available through the Behance link above.",
          },
        ],
      },
    ],
  },
  {
    slug: "jims-collections",
    title: "JIMS COLLECTIONS",
    summary: "A provisional identity exploration for a perfumery, beauty and fashion brand.",
    categories: ["branding"],
    label: "Identity exploration",
    tagline: "Made for your story",
    palette: ["#0A0A0A", "#FFFFFF", "#8A8A8A"],
    cover: {
      kind: "image",
      alt: "JIMS COLLECTIONS wordmark exploration in black and white",
      aspect: "landscape",
      needs: "Wordmark refinement · 2400×1600",
    },
    overview:
      "JIMS COLLECTIONS brings together perfumery, beauty and fashion. This is a provisional identity exploration — the route from first sketches to refined black-and-white marks.",
    role: "I explored identity directions, from hand sketches to refined black-and-white marks.",
    deliverables: ["Early sketches", "Logo refinements", "Tagline lock-up"],
    direction:
      "Working in black and white keeps the focus on form. The tagline “Made for your story” stays at the centre of the exploration.",
    sections: [
      {
        id: "sketches",
        title: "Early sketches",
        blocks: [
          {
            type: "pair",
            items: [
              { kind: "image", alt: "JIMS COLLECTIONS early logo sketch", aspect: "square", needs: "Sketch scan" },
              { kind: "image", alt: "JIMS COLLECTIONS early logo sketch", aspect: "square", needs: "Sketch scan" },
            ],
          },
        ],
      },
      {
        id: "refinements",
        title: "Black-and-white refinements",
        blocks: [
          {
            type: "full",
            media: { kind: "image", alt: "JIMS COLLECTIONS refined black-and-white wordmark", aspect: "wide", needs: "Refined mark · black on white" },
          },
          {
            type: "single",
            align: "right",
            media: { kind: "image", alt: "JIMS COLLECTIONS refined mark with the tagline Made for your story", aspect: "landscape", needs: "Mark with tagline lock-up" },
          },
        ],
      },
    ],
  },
];
