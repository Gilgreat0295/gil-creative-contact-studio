'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const links = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  function dismiss() {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Gil Creative Co. home">Gil Creative Co.</Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
      </nav>
      <button
        className="menu-trigger"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
        ref={triggerRef}
      >
        <span>{open ? 'Close' : 'Menu'}</span><span aria-hidden="true">{open ? '×' : '+'}</span>
      </button>
      {open && (
        <div className="mobile-menu" id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <nav aria-label="Mobile navigation">
            {links.map((link, index) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} ref={index === 0 ? firstLinkRef : undefined}>
                <span>0{index + 1}</span>{link.label}
              </Link>
            ))}
          </nav>
          <button type="button" className="menu-dismiss" onClick={dismiss}>Close menu</button>
          <p>Port Harcourt, Nigeria<br />Available remotely</p>
        </div>
      )}
    </header>
  );
}
