"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { getLenis } from "./SmoothScroll";

const SECTION_LINKS = [
  { label: "Services", hash: "services" },
  { label: "About", hash: "about" },
  { label: "Contact", hash: "contact" },
] as const;

const linkClass = "link-line text-sm font-medium text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:text-foreground";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const panelId = useId();

  const close = (returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    headerRef.current?.querySelector<HTMLElement>(`#${CSS.escape(panelId)} a`)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close(true);
      }
      if (e.key === "Tab" && headerRef.current) {
        const focusables = Array.from(
          headerRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
        ).filter((el) => el.offsetParent !== null);
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
      lenis?.start();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, panelId]);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background">
      <div className="container-x flex h-[var(--header-height)] items-center justify-between">
        <Wordmark onNavigate={() => setOpen(false)} />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-9">
            <li>
              <Link href="/work" className={linkClass}>
                Work
              </Link>
            </li>
            {SECTION_LINKS.map((l) => (
              <li key={l.hash}>
                <Link href={`/#${l.hash}`} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="group -mr-2 flex h-11 items-center gap-3 px-2 text-sm font-medium md:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => (open ? close(true) : setOpen(true))}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span aria-hidden="true" className="relative block h-3 w-5">
            <span className={`absolute left-0 h-px w-5 bg-foreground transition-transform duration-500 ease-cinematic ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-px w-5 bg-foreground transition-transform duration-500 ease-cinematic ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      <div
        id={panelId}
        hidden={!open}
        className="h-[calc(100dvh-var(--header-height))] overflow-y-auto border-t border-line bg-background md:hidden"
      >
        <nav aria-label="Mobile" className="container-x flex h-full flex-col justify-between py-10">
          <ul className="space-y-2">
            <li>
              <Link href="/work" onClick={() => close(false)} className="block py-2 text-headline text-foreground transition-colors hover:text-signal">
                Work
              </Link>
            </li>
            {SECTION_LINKS.map((l) => (
              <li key={l.hash}>
                <Link href={`/#${l.hash}`} onClick={() => close(false)} className="block py-2 text-headline text-foreground transition-colors hover:text-signal">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-eyebrow text-muted-foreground">Port Harcourt, Nigeria · Remote</p>
        </nav>
      </div>
    </header>
  );
}
