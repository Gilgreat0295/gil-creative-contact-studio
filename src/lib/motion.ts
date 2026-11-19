import { useEffect, useLayoutEffect, type DependencyList, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Registers ScrollTrigger once, in the browser only. */
export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isDesktop(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;
}

/**
 * Reveals every [data-reveal] element inside `scope` as it enters the viewport.
 * Content is visible by default; animation only runs in the browser, and
 * reverting the context restores the original (visible) state.
 *  - data-reveal="media": frame opens from an inset, inner [data-reveal-inner] settles from a slight zoom
 *  - data-reveal (any other value): fades up
 */
export function useReveal(scope: RefObject<HTMLElement | null>, deps: DependencyList = []) {
  useIsoLayoutEffect(() => {
    const root = scope.current;
    if (!root || prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = getGsap();
    const desktop = isDesktop();

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((node) => {
        const trigger = { trigger: node, start: "top 90%", once: true };
        if (node.dataset.reveal === "media" && desktop) {
          const inner = node.querySelector<HTMLElement>("[data-reveal-inner]");
          gsap.fromTo(
            node,
            { clipPath: "inset(10% 6% 10% 6%)", autoAlpha: 0 },
            { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1, duration: 1.3, ease: "expo.out", scrollTrigger: trigger, clearProps: "clipPath" },
          );
          if (inner) {
            gsap.fromTo(inner, { scale: 1.12 }, { scale: 1, duration: 1.6, ease: "expo.out", scrollTrigger: trigger, clearProps: "transform" });
          }
        } else {
          gsap.fromTo(
            node,
            { autoAlpha: 0, y: desktop ? 28 : 0 },
            { autoAlpha: 1, y: 0, duration: desktop ? 0.9 : 0.6, ease: "power3.out", scrollTrigger: trigger, clearProps: "transform" },
          );
        }
      });
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
