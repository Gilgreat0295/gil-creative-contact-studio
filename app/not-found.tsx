import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70vh] flex-col justify-center pt-[var(--header-height)]">
      <p className="text-eyebrow text-muted-foreground">404</p>
      <h1 className="mt-4 text-headline text-foreground">Page not found.</h1>
      <p className="mt-4 text-muted-foreground">This page doesn’t exist or has moved.</p>
      <Link href="/work" className="link-line mt-8 self-start text-foreground hover:text-signal">
        See the work
      </Link>
    </div>
  );
}
