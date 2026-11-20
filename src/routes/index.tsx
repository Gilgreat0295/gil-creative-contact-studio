import { createFileRoute } from "@tanstack/react-router";
import { isCategorySlug, type CategorySlug } from "@/content/categories";
import { HomePage } from "@/components/site/HomeSections";

type HomeSearch = { service?: CategorySlug | undefined };

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): HomeSearch =>
    ({ service: isCategorySlug(search["service"]) ? search["service"] : undefined }),
  head: () => ({
    meta: [
      { title: "Gil Creative Co. — Design with a point of view" },
      {
        name: "description",
        content:
          "Gil Creative Co. is the independent practice of Gilbert Gospel Jacob: branding, campaigns, motion, video and digital design. Port Harcourt, Nigeria and remote.",
      },
      { property: "og:title", content: "Gil Creative Co. — Design with a point of view" },
      {
        property: "og:description",
        content: "Visual identities, campaigns, motion, video and websites by Gilbert Gospel Jacob. Port Harcourt, Nigeria and remote.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { service } = Route.useSearch();
  return <HomePage preselect={service} />;
}
