"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { site } from "@/content/site";

/**
 * Showreel frame. With no reel configured it shows a simple cover and no play
 * button. With a reel, playback starts only when the visitor presses play.
 */
export function Showreel() {
  const { src, poster, captionsSrc, title } = site.showreel;
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-surface sm:aspect-video md:aspect-[21/9]" data-hero-reel>
      {src && playing ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full bg-background object-contain"
          controls
          autoPlay
          playsInline
          poster={poster || undefined}
          aria-label={title}
          onLoadedData={() => videoRef.current?.focus()}
        >
          <source src={src} />
          {captionsSrc && <track kind="captions" src={captionsSrc} srcLang="en" label="English" default />}
        </video>
      ) : (
        <>
          {poster ? (
            <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
          ) : (
            <>
              <div aria-hidden="true" className="frame-grid absolute inset-0" />
              <img
                src="/brand/gil-creative-icon.png"
                alt=""
                className="absolute -bottom-[24%] -right-[12%] w-[92%] max-w-[62rem] opacity-[0.12] sm:w-[66%]"
              />
            </>
          )}
          <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-8">
            <div className="flex items-start justify-between text-eyebrow text-muted-foreground">
              <span>Showreel</span>
              <span className="hidden sm:inline">Branding · Campaigns · Motion · Digital</span>
            </div>
            <div className="flex items-end justify-between gap-6">
              <p aria-hidden={!src} className="max-w-[8ch] text-[clamp(2.5rem,8vw,7.5rem)] font-bold leading-[0.85] tracking-[-0.06em] text-foreground">
                Ideas in motion<span className="text-signal">.</span>
              </p>
              {src && (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group flex items-center gap-3 bg-primary px-5 py-4 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-signal hover:text-signal-foreground"
                  aria-label={`Play ${title}`}
                >
                  <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                  Play reel
                </button>
              )}
              {!src && process.env.NODE_ENV === "development" && (
                <span className="border border-signal px-2 py-1 text-eyebrow text-signal">Add showreel in site settings</span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
