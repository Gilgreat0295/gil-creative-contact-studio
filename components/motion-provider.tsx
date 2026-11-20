'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ duration: 1.05, anchors: true, smoothWheel: true });
    const onTick = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      gsap.from('.hero-line', { yPercent: 112, opacity: 0, duration: .9, stagger: .09, ease: 'power3.out', delay: .08 });
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, { y: 44, opacity: 0, duration: .75, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } });
      });
      const signature = document.querySelector('.signature-media');
      if (signature) {
        gsap.matchMedia().add('(min-width: 900px)', () => {
          gsap.fromTo(signature, { scale: .9 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: signature, start: 'top 92%', end: 'top 28%', scrub: .7 } });
        });
      }
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      context.revert();
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
