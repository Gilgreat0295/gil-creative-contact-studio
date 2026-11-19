import { Link } from "@tanstack/react-router";
import { site } from "@/content/site";
import { getContactLinks, getSocialLinks } from "./contact-links";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  const contacts = getContactLinks();
  const socials = getSocialLinks();
  return (
    <footer className="border-t border-line">
      <div className="container-x grid gap-10 py-14 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{site.availability}</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
          <ul className="space-y-3 text-sm">
            <li><Link to="/work" className="link-line text-foreground">Work</Link></li>
            <li><Link to="/" hash="services" className="link-line text-foreground">Services</Link></li>
            <li><Link to="/" hash="about" className="link-line text-foreground">About</Link></li>
            <li><Link to="/" hash="contact" className="link-line text-foreground">Contact</Link></li>
          </ul>
          {contacts.length > 0 && (
            <ul className="space-y-3 text-sm">
              {contacts.map((c) => (
                <li key={c.label}>
                  <a href={c.href} className="link-line text-foreground" {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}>
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          {socials.length > 0 && (
            <ul className="space-y-3 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noreferrer" className="link-line text-foreground">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
      <div className="container-x flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-eyebrow text-muted-foreground">
        <span>© {site.name}</span>
        <span>Design · Motion · Digital</span>
      </div>
    </footer>
  );
}
