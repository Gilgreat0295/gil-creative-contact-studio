import type { Metadata } from "next";
import { Suspense } from "react";
import { WorkIndex } from "@/components/site/WorkIndex";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected branding, visual design, motion, video and website projects by Gilbert Gospel Jacob. Filter by discipline.",
};

export default function WorkPage() {
  return (
    <Suspense fallback={<p className="container-x pt-[calc(var(--header-height)+5rem)] text-muted-foreground">Loading work…</p>}>
      <WorkIndex />
    </Suspense>
  );
}
