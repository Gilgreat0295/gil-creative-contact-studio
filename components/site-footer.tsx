import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="footer-mark" href="/">Gil Creative Co.</Link>
      <p>Independent creative practice<br />Port Harcourt, Nigeria</p>
      <nav aria-label="Footer navigation">
        <Link href="/work">Work</Link><Link href="/#services">Services</Link><Link href="/#about">About</Link><Link href="/#contact">Contact</Link>
      </nav>
      <p className="footer-note">Available for remote projects.<br />© {new Date().getFullYear()} Gil Creative Co.</p>
    </footer>
  );
}
