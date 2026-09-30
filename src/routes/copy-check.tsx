import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SERVICE_OPTIONS } from "@/data/packages";
import { useCopy, useLang } from "@/lib/i18n";
import { submitLead } from "@/lib/submitLead";
import { SITE_URL, OG_IMAGE_URL } from "@/lib/seo";

const TITLE = "The 15-Minute Copy Check gratuito — Shamyo Singh";
const DESC =
  "Prenota una sessione gratuita di 15 minuti con il copywriter Shamyo Singh: parliamo del tuo sito, landing page o contenuti e ricevi indicazioni concrete.";

export const Route = createFileRoute("/copy-check")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/copy-check` },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/copy-check` }],
  }),
  component: CopyCheckPage,
});

/**
 * Integrazione calendario: imposta VITE_BOOKING_URL (es. link Calendly o
 * Google Calendar Appointment) per mostrare il pulsante di prenotazione diretta.
 * Senza, il form invia una richiesta che Shamyo conferma via email.
 */
const BOOKING_URL = import.meta.env.VITE_BOOKING_URL as string | undefined;

const COPY = {
  it: {
    back: "← Torna ai pacchetti",
    badge: "Gratis",
    title: "The 15-Minute Copy Check",
    lead: "Guardiamo insieme il tuo progetto.",
    body: "In 15 minuti parleremo del tuo progetto, delle tue esigenze e di ciò che vuoi migliorare. Alla fine avrai alcune indicazioni concrete su quali potrebbero essere i prossimi passi.",
    points: ["15 minuti", "Gratis", "Personalizzato", "Nessun impegno"],
    calendar: "Scegli subito l'orario sul calendario",
    fields: {
      name: "Nome", email: "Email", website: "Sito web (opzionale)", company: "Azienda / Brand (opzionale)",
      improve: "Cosa vuoi migliorare?", goal: "Qual è il tuo obiettivo?", service: "Quale servizio ti interessa?",
      language: "Lingua preferita", time: "Scegli il momento che preferisci", date: "Data", hour: "Ora",
      timeHint: "È una proposta: Shamyo ti conferma giorno e ora via email.",
    },
    select: "Seleziona…",
    submit: "Richiedi il tuo Copy Check",
    sending: "Invio in corso…",
    doneTitle: "Richiesta ricevuta!",
    doneBody: "Grazie! Shamyo ti scriverà all'indirizzo email indicato per confermare giorno e ora della sessione.",
    error: "Non è stato possibile inviare la richiesta. Riprova o scrivi a Shamyosingh63@gmail.com.",
  },
  en: {
    back: "← Back to packages",
    badge: "Free",
    title: "The 15-Minute Copy Check",
    lead: "Let's look at your project together.",
    body: "In 15 minutes we'll talk through your project, what you need and what you'd like to improve. You'll walk away with concrete pointers on what your next steps could be.",
    points: ["15 minutes", "Free", "Tailored to you", "No commitment"],
    calendar: "Pick a time on the calendar",
    fields: {
      name: "Name", email: "Email", website: "Website (optional)", company: "Company / Brand (optional)",
      improve: "What would you like to improve?", goal: "What's your goal?", service: "Which service are you interested in?",
      language: "Preferred language", time: "Choose your preferred time", date: "Date", hour: "Time",
      timeHint: "This is a suggestion: Shamyo will confirm the day and time by email.",
    },
    select: "Select…",
    submit: "Request your Copy Check",
    sending: "Sending…",
    doneTitle: "Request received!",
    doneBody: "Thanks! Shamyo will email you to confirm the day and time of your session.",
    error: "We couldn't send your request. Please try again or email Shamyosingh63@gmail.com.",
  },
};

const selectClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function CopyCheckPage() {
  const c = useCopy(COPY);
  const { lang } = useLang();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const today = new Date().toISOString().slice(0, 10);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const g = (k: string) => String(d.get(k) ?? "");
    setState("sending");
    const ok = await submitLead({
      kind: "copy_check",
      name: g("name"), email: g("email"), website: g("website"), company: g("company"),
      description: g("improve"), goal: g("goal"), service: g("service"), language: g("language"),
      preferredDate: g("date"), preferredTime: g("time"),
    });
    setState(ok ? "done" : "error");
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
      <Link to="/pacchetti" hash="copy-check" className="text-sm text-muted-foreground hover:text-foreground">
        {c.back}
      </Link>
      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <span className="inline-flex rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-foreground">{c.badge}</span>
          <h1 className="mt-5 font-heading text-5xl leading-[1.05] text-foreground sm:text-6xl">{c.title}</h1>
          <p className="mt-5 font-heading text-2xl text-brand">{c.lead}</p>
          <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">{c.body}</p>
          <ul className="mt-8 grid max-w-sm grid-cols-2 gap-3">
            {c.points.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Check aria-hidden className="h-4 w-4 text-brand" /> {p}
              </li>
            ))}
          </ul>
          {BOOKING_URL ? (
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-full border border-foreground px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-foreground hover:bg-foreground hover:text-background">
              {c.calendar}
            </a>
          ) : null}
        </div>

        <div className="rounded-[2rem] border-2 border-brand/30 bg-brand/5 p-6 sm:p-10">
          {state === "done" ? (
            <div className="py-12 text-center" role="status">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-foreground">
                <Send className="h-5 w-5" />
              </div>
              <h2 className="mt-6 font-heading text-3xl text-foreground">{c.doneTitle}</h2>
              <p className="mt-3 text-muted-foreground">{c.doneBody}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2"><Label htmlFor="cc-name">{c.fields.name}</Label><Input id="cc-name" name="name" required maxLength={100} autoComplete="name" /></div>
              <div className="space-y-2"><Label htmlFor="cc-email">{c.fields.email}</Label><Input id="cc-email" name="email" type="email" required maxLength={160} autoComplete="email" /></div>
              <div className="space-y-2"><Label htmlFor="cc-website">{c.fields.website}</Label><Input id="cc-website" name="website" maxLength={200} placeholder="www.…" /></div>
              <div className="space-y-2"><Label htmlFor="cc-company">{c.fields.company}</Label><Input id="cc-company" name="company" maxLength={120} /></div>
              <div className="space-y-2 sm:col-span-2"><Label htmlFor="cc-improve">{c.fields.improve}</Label><Textarea id="cc-improve" name="improve" rows={3} required maxLength={2000} /></div>
              <div className="space-y-2 sm:col-span-2"><Label htmlFor="cc-goal">{c.fields.goal}</Label><Input id="cc-goal" name="goal" required maxLength={600} /></div>
              <div className="space-y-2">
                <Label htmlFor="cc-service">{c.fields.service}</Label>
                <select id="cc-service" name="service" required defaultValue="" className={selectClass}>
                  <option value="" disabled>{c.select}</option>
                  {SERVICE_OPTIONS[lang].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cc-language">{c.fields.language}</Label>
                <select id="cc-language" name="language" defaultValue={lang === "it" ? "Italiano" : "English"} className={selectClass}>
                  <option value="Italiano">Italiano</option>
                  <option value="English">English</option>
                </select>
              </div>
              <fieldset className="space-y-2 sm:col-span-2">
                <legend className="text-sm font-medium text-foreground">{c.fields.time}</legend>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1"><Label htmlFor="cc-date" className="text-xs text-muted-foreground">{c.fields.date}</Label><Input id="cc-date" name="date" type="date" min={today} required /></div>
                  <div className="space-y-1"><Label htmlFor="cc-time" className="text-xs text-muted-foreground">{c.fields.hour}</Label><Input id="cc-time" name="time" type="time" min="09:00" max="19:00" step={900} required /></div>
                </div>
                <p className="text-xs text-muted-foreground">{c.fields.timeHint}</p>
              </fieldset>
              {state === "error" ? <p role="alert" className="text-sm text-destructive sm:col-span-2">{c.error}</p> : null}
              <button type="submit" disabled={state === "sending"} className="rounded-full bg-brand py-4 text-sm font-semibold uppercase tracking-[0.1em] text-brand-foreground shadow-lg shadow-brand/20 transition-opacity hover:opacity-90 disabled:opacity-60 sm:col-span-2">
                {state === "sending" ? c.sending : c.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
