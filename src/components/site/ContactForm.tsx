import { useEffect, useId, useRef, useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { SERVICE_OPTIONS, buildBrief, buildMailto, enquirySchema, type Enquiry } from "@/lib/enquiry";

const STORAGE_KEY = "gcc-enquiry-draft";
type FormValues = { name: string; email: string; service: string; brief: string };
const EMPTY: FormValues = { name: "", email: "", service: "", brief: "" };
type Errors = Partial<Record<keyof FormValues, string>>;

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy copy */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function ContactForm({ preselect }: { preselect?: string | undefined }) {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const loaded = useRef(false);
  const formId = useId();
  const email = site.contact.email;

  // Restore a saved draft, then apply any service picked from the Services list.
  useEffect(() => {
    let draft = EMPTY;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) draft = { ...EMPTY, ...JSON.parse(raw) };
    } catch {
      /* ignore unreadable drafts */
    }
    setValues(preselect ? { ...draft, service: preselect } : draft);
    loaded.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (preselect && loaded.current) setValues((v) => ({ ...v, service: preselect }));
  }, [preselect]);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch {
      /* storage may be unavailable */
    }
  }, [values]);

  const update = (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
    setStatus(null);
  };

  const validate = (): Enquiry | null => {
    const result = enquirySchema.safeParse(values);
    if (result.success) {
      setErrors({});
      return result.data;
    }
    const next: Errors = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof FormValues;
      if (!next[key]) next[key] = issue.message;
    }
    setErrors(next);
    const first = (["name", "email", "service", "brief"] as const).find((k) => next[k]);
    if (first) document.getElementById(`${formId}-${first}`)?.focus();
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = validate();
    if (!data) return;
    if (email) {
      window.location.href = buildMailto(email, data);
      setStatus({ tone: "ok", text: `Your email app should open with the brief ready to send. If it doesn't, write to ${email}.` });
      return;
    }
    const ok = await copyText(buildBrief(data));
    setStatus(
      ok
        ? { tone: "ok", text: "Project brief copied. Paste it into a message to get in touch." }
        : { tone: "error", text: "Couldn't copy automatically. Select your brief above and copy it manually." },
    );
  };

  const field = "w-full border border-input bg-surface px-4 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors duration-300 hover:border-line-strong focus-visible:border-signal focus-visible:outline-none aria-[invalid=true]:border-destructive";
  const label = "mb-2 block text-eyebrow text-muted-foreground";
  const err = (k: keyof FormValues) =>
    errors[k] ? (
      <p id={`${formId}-${k}-error`} className="mt-2 text-sm text-destructive">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof FormValues) => ({
    id: `${formId}-${k}`,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${formId}-${k}-error` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 md:grid-cols-2">
      <div>
        <label htmlFor={`${formId}-name`} className={label}>Name</label>
        <input {...a11y("name")} name="name" autoComplete="name" value={values.name} onChange={update("name")} className={`${field} h-13`} maxLength={100} />
        {err("name")}
      </div>
      <div>
        <label htmlFor={`${formId}-email`} className={label}>Email</label>
        <input {...a11y("email")} name="email" type="email" autoComplete="email" value={values.email} onChange={update("email")} className={`${field} h-13`} maxLength={255} />
        {err("email")}
      </div>
      <div className="md:col-span-2">
        <label htmlFor={`${formId}-service`} className={label}>Service</label>
        <select {...a11y("service")} name="service" value={values.service} onChange={update("service")} className={`${field} h-13 appearance-none`}>
          <option value="" disabled>Choose a service</option>
          {SERVICE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {err("service")}
      </div>
      <div className="md:col-span-2">
        <label htmlFor={`${formId}-brief`} className={label}>Project brief</label>
        <textarea
          {...a11y("brief")}
          name="brief"
          rows={6}
          value={values.brief}
          onChange={update("brief")}
          className={`${field} min-h-40 py-3`}
          placeholder="What are you working on, and what do you need?"
          maxLength={2000}
        />
        {err("brief")}
      </div>
      <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center">
        <Button type="submit" variant="cta" size="xl">
          {email ? <Mail aria-hidden="true" /> : <Copy aria-hidden="true" />}
          {email ? "Open email draft" : "Copy project brief"}
        </Button>
        <p role="status" aria-live="polite" className={`text-sm ${status?.tone === "error" ? "text-destructive" : "text-muted-foreground"}`}>
          {status && (
            <span className="inline-flex items-start gap-2">
              {status.tone === "ok" && <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-signal" />}
              {status.text}
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
