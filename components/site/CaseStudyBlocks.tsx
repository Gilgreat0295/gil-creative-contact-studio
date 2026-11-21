import type { CaseSection, MediaBlock } from "@/content/types";
import { MediaFigure } from "./MediaFrame";
import { cn } from "@/lib/utils";

type Ctx = { title: string; palette: string[] };

function Block({ block, ctx }: { block: MediaBlock; ctx: Ctx }) {
  switch (block.type) {
    case "full":
      return <MediaFigure media={block.media} title={ctx.title} palette={ctx.palette} sizes="100vw" />;
    case "pair":
      return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {block.items.map((m, i) => (
            <div key={i} className={cn(i === 1 && "md:mt-24")}>
              <MediaFigure media={m} title={ctx.title} palette={ctx.palette} sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
          ))}
        </div>
      );
    case "single": {
      const align = block.align ?? "center";
      const tall = block.media.aspect === "story" || block.media.aspect === "portrait";
      return (
        <div className="grid md:grid-cols-12">
          <div
            className={cn(
              tall ? "md:col-span-5" : "md:col-span-8",
              align === "right" && (tall ? "md:col-start-8" : "md:col-start-5"),
              align === "center" && (tall ? "md:col-start-4 lg:col-start-5" : "md:col-start-3"),
            )}
          >
            <MediaFigure media={block.media} title={ctx.title} palette={ctx.palette} sizes="(min-width: 768px) 60vw, 100vw" />
          </div>
        </div>
      );
    }
    case "text":
      return (
        <div className="grid md:grid-cols-12" data-reveal>
          <div className="md:col-span-6 md:col-start-4">
            {block.heading && <h3 className="text-2xl font-bold tracking-tight text-foreground">{block.heading}</h3>}
            <p className="mt-3 text-lede text-muted-foreground">{block.body}</p>
          </div>
        </div>
      );
  }
}

export function CaseStudySection({ section, index, ctx }: { section: CaseSection; index: number; ctx: Ctx }) {
  return (
    <section id={section.id} tabIndex={-1} aria-labelledby={`${section.id}-title`} className="mt-24 md:mt-36">
      <div className="container-x grid gap-4 border-t border-line pt-8 md:grid-cols-12 md:gap-8">
        <p className="text-eyebrow text-muted-foreground md:col-span-3" data-reveal>
          {String(index + 1).padStart(2, "0")}
        </p>
        <div className="md:col-span-9">
          <h2 id={`${section.id}-title`} className="text-title text-foreground" data-reveal>{section.title}</h2>
          {section.intro && <p className="mt-4 max-w-xl text-muted-foreground" data-reveal>{section.intro}</p>}
        </div>
      </div>
      <div className="container-x mt-10 space-y-6 md:mt-14 md:space-y-10">
        {section.blocks.map((b, i) => (
          <Block key={i} block={b} ctx={ctx} />
        ))}
      </div>
    </section>
  );
}

