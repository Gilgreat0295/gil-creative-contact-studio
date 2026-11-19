import { z } from "zod";
import { CATEGORIES, isCategorySlug } from "@/content/categories";

export const MULTIPLE_SERVICES = "multiple" as const;

export const SERVICE_OPTIONS = [
  ...CATEGORIES.map((c) => ({ value: c.slug as string, label: c.label as string })),
  { value: MULTIPLE_SERVICES, label: "Multiple services" },
];

export const enquirySchema = z.object({
  name: z.string().trim().min(1, "Please add your name.").max(100, "Keep your name under 100 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Please add your email.")
    .email("Please enter a valid email address.")
    .max(255, "Keep your email under 255 characters."),
  service: z
    .string()
    .refine((v) => v === MULTIPLE_SERVICES || isCategorySlug(v), "Please choose a service."),
  brief: z
    .string()
    .trim()
    .min(10, "Tell me a little more about the project.")
    .max(2000, "Keep the brief under 2000 characters."),
});

export type Enquiry = z.infer<typeof enquirySchema>;

export function serviceLabel(value: string): string {
  return SERVICE_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function buildBrief(e: Enquiry): string {
  return [
    `Name: ${e.name.trim()}`,
    `Email: ${e.email.trim()}`,
    `Service: ${serviceLabel(e.service)}`,
    "",
    "Project brief:",
    e.brief.trim(),
  ].join("\n");
}

export function buildSubject(e: Enquiry): string {
  return `Project enquiry: ${serviceLabel(e.service)} — ${e.name.trim()}`;
}

export function buildMailto(to: string, e: Enquiry): string {
  const params = `subject=${encodeURIComponent(buildSubject(e))}&body=${encodeURIComponent(buildBrief(e))}`;
  return `mailto:${to}?${params}`;
}

export function whatsappUrl(digits: string): string {
  return `https://wa.me/${digits.replace(/\D/g, "")}`;
}
