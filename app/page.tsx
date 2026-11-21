import type { Metadata } from "next";
import { HomePage } from "@/components/site/HomeSections";
import { isCategorySlug } from "@/content/categories";

export const metadata: Metadata = {
  title: "Gil Creative Co. — Design with a point of view",
  description:
    "Branding, campaigns, motion, video and digital design by Gilbert Gospel Jacob in Port Harcourt, Nigeria.",
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  return <HomePage preselect={isCategorySlug(service) ? service : undefined} />;
}
