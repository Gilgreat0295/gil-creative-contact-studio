import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="not-found">
        <p className="eyebrow">404</p>
        <h1>That page isn’t in the work.</h1>
        <Link className="button button-accent" href="/work">View all work <span aria-hidden="true">↗</span></Link>
      </main>
    </>
  );
}
