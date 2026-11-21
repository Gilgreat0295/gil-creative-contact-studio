"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { getGsap, prefersReducedMotion } from "@/lib/motion";

let lenisInstance: Lenis | null = null;
export const getLenis = () => lenisInstance;

export function SmoothScroll() {
  const pathname = usePathname();
  const firstPath = useRef(true);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = getGsap();
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: true });
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

  useEffect(() => {
    const focusHashTarget = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const target = document.getElementById(hash);
      if (!target) return;
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };

    const id = requestAnimationFrame(() => {
      lenisInstance?.resize();
      getGsap().ScrollTrigger.refresh();
      if (window.location.hash) {
        focusHashTarget();
      } else if (!firstPath.current) {
        document.getElementById("main")?.focus({ preventScroll: true });
      }
      firstPath.current = false;
    });
    window.addEventListener("hashchange", focusHashTarget);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("hashchange", focusHashTarget);
    };
  }, [pathname]);

  return null;
}
