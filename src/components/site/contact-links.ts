import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/enquiry";

export type ContactLink = { label: string; value: string; href: string; external: boolean };

/** Only configured destinations are returned, so empty settings never render a dead link. */
export function getContactLinks(): ContactLink[] {
  const links: ContactLink[] = [];
  if (site.contact.email) {
    links.push({ label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}`, external: false });
  }
  if (site.contact.whatsapp) {
    links.push({ label: "WhatsApp", value: `+${site.contact.whatsapp}`, href: whatsappUrl(site.contact.whatsapp), external: true });
  }
  return links;
}

export function getSocialLinks() {
  return site.socials.filter((s) => s.url.trim().length > 0);
}
