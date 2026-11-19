import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import Lenis from "lenis";
import { getGsap, prefersReducedMotion } from "@/lib/motion";

let lenisInstance: Lenis | null = null;
export const getLenis = () => lenisInstance;

/**
 * Lenis smooth scrolling synced with GSAP ScrollTrigger.
 * Disabled entirely when the visitor prefers reduced motion.
 * Also moves focus predictably: to a #hash target, or to <main> after a page change.
 */
export function SmoothScroll() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash });
  const firstPath = useRef(true);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = getGsap();
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenisInstance = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  // Recalculate scroll lengths after each page change.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      lenisInstance?.resize();
      getGsap().ScrollTrigger.refresh();
    });
    if (firstPath.current) {
      firstPath.current = false;
    } else if (!window.location.hash) {
      document.getElementById("main")?.focus({ preventScroll: true });
    }
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  // Move focus to the section a hash link points at.
  useEffect(() => {
    if (!hash) return;
    const id = requestAnimationFrame(() => {
      const target = document.getElementById(hash);
      if (!target) return;
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(id);
  }, [hash, pathname]);

  return null;
}
