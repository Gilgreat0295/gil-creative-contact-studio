import { describe, expect, it } from "vitest";
import { CATEGORIES } from "@/content/categories";
import { PROJECTS } from "@/content/projects";
import {
  getFeaturedProjects,
  getNextProject,
  hasPublishedWork,
  parseWorkCategory,
  projectsInCategory,
  publishedCategories,
} from "@/lib/portfolio";
import { SERVICE_OPTIONS, buildMailto, enquirySchema } from "@/lib/enquiry";

describe("portfolio rules", () => {
  it("lists all seven services in the agreed order", () => {
    expect(CATEGORIES.map((c) => c.label)).toEqual([
      "Branding",
      "Visual Design",
      "Motion Design",
      "Video Editing",
      "Website Design",
      "UI/UX Design",
      "AI UGC Ads",
    ]);
  });

  it("features Savour, Nourri and StorgeTech first, in that order", () => {
    expect(getFeaturedProjects().map((p) => p.slug)).toEqual([
      "savour-by-meire",
      "nourri-food-and-drinks",
      "storgetech-solutions",
    ]);
  });

  it("shows one Savour case study under each of its four categories", () => {
    for (const c of ["visual-design", "motion-design", "video-editing", "website-design"] as const) {
      expect(projectsInCategory(c).filter((p) => p.slug === "savour-by-meire")).toHaveLength(1);
    }
  });

  it("only offers Work filters for categories with published work", () => {
    const filters = publishedCategories().map((c) => c.slug);
    expect(filters).not.toContain("ui-ux-design");
    expect(filters).not.toContain("ai-ugc-ads");
    expect(hasPublishedWork("ui-ux-design")).toBe(false);
    expect(parseWorkCategory("ai-ugc-ads")).toBeUndefined();
    expect(parseWorkCategory("motion-design")).toBe("motion-design");
  });

  it("labels JIMS COLLECTIONS as an identity exploration with its tagline", () => {
    const jims = PROJECTS.find((p) => p.slug === "jims-collections")!;
    expect(jims.label).toBe("Identity exploration");
    expect(jims.tagline).toBe("Made for your story");
  });

  it("wraps Next project from the last case study back to the first", () => {
    expect(getNextProject(PROJECTS[PROJECTS.length - 1]!.slug).slug).toBe(PROJECTS[0]!.slug);
  });
});

describe("enquiry rules", () => {
  it("offers all seven services plus Multiple services", () => {
    expect(SERVICE_OPTIONS).toHaveLength(8);
    expect(SERVICE_OPTIONS.at(-1)?.label).toBe("Multiple services");
  });

  it("rejects an enquiry with an invalid email", () => {
    const r = enquirySchema.safeParse({ name: "Ada", email: "not-an-email", service: "branding", brief: "A new identity for my café." });
    expect(r.success).toBe(false);
  });

  it("builds a prefilled draft to the configured address", () => {
    const url = buildMailto("gilcreative.co@gmail.com", {
      name: "Ada",
      email: "ada@example.com",
      service: "motion-design",
      brief: "Logo animation for launch.",
    });
    expect(url.startsWith("mailto:gilcreative.co@gmail.com?subject=")).toBe(true);
    expect(decodeURIComponent(url)).toContain("Service: Motion Design");
  });
});
