'use client';

import { useEffect, useRef, useState } from 'react';
import { categories, contact } from '@/content/site';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';

type Draft = { name: string; email: string; service: string; brief: string };
const emptyDraft: Draft = { name: '', email: '', service: '', brief: '' };
const storageKey = 'gil-creative-project-draft';

function formatBrief(draft: Draft) {
  return `Project enquiry for Gil Creative Co.\n\nName: ${draft.name}\nEmail: ${draft.email}\nService: ${draft.service}\n\nProject brief:\n${draft.brief}`;
}

export function ContactForm() {
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof Draft, string>>>({});
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let initial = emptyDraft;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) initial = { ...initial, ...JSON.parse(saved) };
    } catch { /* keep the form usable if storage is unavailable */ }
    const requestedService = new URLSearchParams(window.location.search).get('service');
    if (requestedService && [...categories.map((item) => item.label), 'Multiple services'].includes(requestedService)) {
      initial = { ...initial, service: requestedService };
    }
    setDraft(initial);
    if (emailRef.current) emailRef.current.value = initial.email;
  }, []);

  function update(field: keyof Draft, value: string) {
    setDraft((current) => {
      const next = { ...current, [field]: value };
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* storage is an enhancement */ }
      return next;
    });
    setErrors((current) => ({ ...current, [field]: undefined }));
    setMessage('');
  }

  function currentDraft() {
    return { ...draft, email: emailRef.current?.value ?? draft.email };
  }

  function validate(current: Draft) {
    const next: Partial<Record<keyof Draft, string>> = {};
    if (!current.name.trim()) next.name = 'Add your name.';
    if (!/^\S+@\S+\.\S+$/.test(current.email)) next.email = 'Add a valid email address.';
    if (!current.service) next.service = 'Choose a service.';
    if (current.brief.trim().length < 12) next.brief = 'Tell me a little more about the project.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function copyBrief() {
    const current = currentDraft();
    if (!validate(current)) return;
    try {
      await navigator.clipboard.writeText(formatBrief(current));
      setMessage('Project brief copied. You can paste it into any message.');
    } catch {
      setMessage('Copying was blocked by your browser. Your text is still saved here.');
    }
  }

  function openEmail() {
    const current = currentDraft();
    if (!validate(current) || !contact.email) return;
    const subject = encodeURIComponent(`Project enquiry — ${current.service}`);
    const body = encodeURIComponent(formatBrief(current));
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="contact-layout">
      <div className="contact-intro">
        <p className="eyebrow">Project enquiry</p>
        <h2 id="contact-title">Let’s talk about<br />your project.</h2>
        <p>Share the shape of the project, what you need and where you are in the process. Your draft stays on this device.</p>
        {(contact.email || contact.whatsapp || contact.socials.length > 0) && (
          <div className="contact-links">
            {contact.email && <a href={`mailto:${contact.email}`}>Email</a>}
            {contact.whatsapp && <a href={contact.whatsapp}>WhatsApp</a>}
            {contact.socials.map((social) => <a href={social.href} key={social.href}>{social.label}</a>)}
          </div>
        )}
      </div>
      <form className="enquiry-form" onSubmit={(event) => event.preventDefault()} noValidate>
        <label>
          <span>Name</span>
          <Input className="form-control" value={draft.name} onChange={(event) => update('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} autoComplete="name" placeholder="Your name" />
          {errors.name && <small id="name-error">{errors.name}</small>}
        </label>
        <label>
          <span>Email</span>
          <Input ref={emailRef} className="form-control" type="text" inputMode="email" defaultValue="" onInput={(event) => update('email', event.currentTarget.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} autoComplete="email" placeholder="you@example.com" />
          {errors.email && <small id="email-error">{errors.email}</small>}
        </label>
        <label>
          <span>Service</span>
          <NativeSelect className="form-select" value={draft.service} onChange={(event) => update('service', event.target.value)} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? 'service-error' : undefined}>
            <NativeSelectOption value="">Select a service</NativeSelectOption>
            {categories.map((category) => <NativeSelectOption value={category.label} key={category.slug}>{category.label}</NativeSelectOption>)}
            <NativeSelectOption value="Multiple services">Multiple services</NativeSelectOption>
          </NativeSelect>
          {errors.service && <small id="service-error">{errors.service}</small>}
        </label>
        <label>
          <span>Project brief</span>
          <Textarea className="form-control form-textarea" value={draft.brief} onChange={(event) => update('brief', event.target.value)} aria-invalid={Boolean(errors.brief)} aria-describedby={errors.brief ? 'brief-error' : undefined} placeholder="What are you making, and what do you need help with?" />
          {errors.brief && <small id="brief-error">{errors.brief}</small>}
        </label>
        <button className="button button-accent form-submit" type="button" onClick={contact.email ? openEmail : copyBrief}>
          {contact.email ? 'Open email draft' : 'Copy project brief'} <span aria-hidden="true">↗</span>
        </button>
        <p className="form-message" aria-live="polite">{message}</p>
      </form>
    </div>
  );
}
