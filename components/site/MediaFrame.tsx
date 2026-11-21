"use client";

import type { Media, MediaAspect } from "@/content/types";
import { cn } from "@/lib/utils";

export const ASPECT_CLASS: Record<MediaAspect, string> = {
  landscape: "aspect-[3/2]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  wide: "aspect-[16/9] md:aspect-[21/9]",
  screen: "aspect-[16/10]",
  video: "aspect-video",
  story: "aspect-[9/16]",
};

type Props = {
  media: Media;
  /** Project name, shown on the text-led cover when media is missing. */
  title?: string | undefined;
  palette?: string[] | undefined;
  aspect?: MediaAspect | undefined;
  priority?: boolean | undefined;
  sizes?: string | undefined;
  /** Zoom the image slightly when a parent .group is hovered. */
  zoom?: boolean | undefined;
  reveal?: boolean | undefined;
  /** Centre the text-led cover (used where the frame is cropped by motion). */
  centerCover?: boolean | undefined;
  className?: string | undefined;
};

/**
 * One frame for every image or video. Space is reserved from the aspect ratio.
 * Missing media renders a clean, text-led cover; in the build preview it also
 * shows what file belongs there.
 */
export function MediaFrame({ media, title, palette, aspect, priority, sizes, zoom, reveal = true, centerCover, className }: Props) {
  const shape = ASPECT_CLASS[aspect ?? media.aspect];
  return (
    <div
      className={cn("relative overflow-hidden bg-surface", shape, className)}
      data-reveal={reveal ? "media" : undefined}
    >
      <div data-reveal-inner className="absolute inset-0">
        <div className={cn("absolute inset-0", zoom && "media-zoom")}>
          {media.src ? <MediaContent media={media} priority={priority} sizes={sizes} /> : <EmptyFrame media={media} title={title} palette={palette} center={centerCover} />}
        </div>
      </div>
    </div>
  );
}

function MediaContent({ media, priority, sizes }: { media: Media; priority?: boolean | undefined; sizes?: string | undefined }) {
  if (media.kind === "video") {
    return (
      <video
        className="absolute inset-0 h-full w-full bg-background object-contain"
        controls
        playsInline
        preload="metadata"
        poster={media.poster}
        aria-label={media.alt}
      >
        <source src={media.src} />
        {media.captionsSrc && <track kind="captions" src={media.captionsSrc} srcLang="en" label="English" default />}
      </video>
    );
  }
  return (
    <img
      src={media.src}
      srcSet={media.srcSet}
      sizes={media.sizes ?? sizes ?? "(min-width: 1024px) 60vw, 100vw"}
      alt={media.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

function EmptyFrame({ media, title, palette, center }: { media: Media; title?: string | undefined; palette?: string[] | undefined; center?: boolean | undefined }) {
  const isDev = process.env.NODE_ENV === "development";
  return (
    <div aria-hidden="true" className={cn("frame-grid absolute inset-0 flex flex-col justify-between p-4 md:p-6", center && "px-[24%] py-[9%]")}>
      <div className="flex items-start justify-between gap-4 text-eyebrow text-muted-foreground">
        <span>{media.kind === "video" ? "Video" : "Image"}</span>
        {isDev && (
          <span className="border border-signal px-2 py-1 text-right text-signal">
            Missing media{media.needs ? ` · ${media.needs}` : ""}
          </span>
        )}
      </div>
      {title && (
        <p className={cn("max-w-[14ch] text-[clamp(1.5rem,4vw,3.75rem)] font-bold leading-[0.95] tracking-[-0.045em] text-foreground/90", center && "mx-auto text-center")}>
          {title}
        </p>
      )}
      <div className="flex items-end justify-between gap-4">
        <span className="text-eyebrow text-muted-foreground">{media.caption ?? media.alt}</span>
        {palette && palette.length > 0 && (
          <span className="flex shrink-0">
            {palette.map((c) => (
              <span key={c} className="block h-5 w-5 border border-line-strong md:h-6 md:w-6" style={{ backgroundColor: c }} />
            ))}
          </span>
        )}
      </div>
    </div>
  );
}

export function MediaFigure(props: Props) {
  const { media } = props;
  return (
    <figure>
      <MediaFrame {...props} />
      {(media.caption || (media.kind === "video" && media.transcript)) && (
        <figcaption className="mt-3 space-y-2 text-sm text-muted-foreground">
          {media.caption && <p>{media.caption}</p>}
          {media.kind === "video" && media.transcript && (
            <details>
              <summary className="cursor-pointer text-foreground">Transcript</summary>
              <p className="mt-2 whitespace-pre-line">{media.transcript}</p>
            </details>
          )}
        </figcaption>
      )}
    </figure>
  );
}

