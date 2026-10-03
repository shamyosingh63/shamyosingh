import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, MapPin, Send, Linkedin, Instagram } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useReveal } from "@/hooks/use-reveal";
import { SITE_URL, OG_IMAGE_URL } from "@/lib/seo";
import { useCopy, useLang } from "@/lib/i18n";
import { submitLeadDetailed } from "@/lib/submitLead";
import { PACKAGES } from "@/data/packages";

const searchSchema = z.object({
  package: z.enum(["START", "GROW", "AUTHORITY", "SEO"]).optional().catch(undefined),
});

export const Route = createFileRoute("/contatti")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Contatti — Shamyo Singh Copywriter" },
      { name: "description", content: "Contatta Shamyo Singh per un progetto di copywriting, SEO, landing page o email marketing. Rispondo entro 24 ore." },
      { property: "og:title", content: "Contatti — Shamyo Singh Copywriter" },
      { property: "og:description", content: "Contatta Shamyo Singh per copywriting, SEO, landing page ed email marketing." },
      { property: "og:url", content: `${SITE_URL}/contatti` },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:title", content: "Contatti — Shamyo Singh Copywriter" },
      { name: "twitter:description", content: "Contatta Shamyo Singh per copywriting, SEO, landing page ed email marketing." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contatti` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contatti — Shamyo Singh Copywriter",
          url: `${SITE_URL}/contatti`,
          mainEntity: {
            "@type": "Person",
            name: "Shamyo Singh",
            jobTitle: "Copywriter & SEO Specialist",
            email: "mailto:Shamyosingh63@gmail.com",
            url: SITE_URL,
            sameAs: [
              "https://www.linkedin.com/in/shamyo-singh-824053304",
              "https://www.instagram.com/_sham_y0",
            ],
          },
        }),
      },
    ],
  }),
  component: ContactPage,
});

const COPY = {
  it: {
    eyebrow: "Contatti",
    h1a: "Raccontami il tuo ", h1b: "progetto.",
    intro: "Ogni grande comunicazione nasce da una semplice conversazione. Compila il form o scrivimi direttamente: rispondo entro 24 ore lavorative.",
    formTitle: "Parliamo del tuo progetto.",
    name: "Nome", email: "Email", website: "Sito web (opzionale)", company: "Brand / Azienda (opzionale)",
    service: "Servizio", pkg: "Pacchetto (opzionale)", description: "Descrizione del progetto", goal: "Obiettivo principale",
    language: "Lingua preferita", select: "Seleziona…", none: "Nessuno / non so",
    submit: "Invia richiesta", sending: "Invio in corso…",
    doneTitle: "Grazie! La tua richiesta è stata inviata.", doneBody: "Ti risponderò al più presto con i prossimi passi.",
    error: "Invio non riuscito. Riprova o scrivi a Shamyosingh63@gmail.com.",
    services: ["Website Copy", "Landing Page", "SEO", "Email Copy", "Content Strategy", "Brand Messaging", "Pacchetto", "Non sono sicuro"],
  },
  en: {
    eyebrow: "Contact",
    h1a: "Tell me about your ", h1b: "project.",
    intro: "Great communication starts with a simple conversation. Fill in the form or write to me directly — I reply within one business day.",
    formTitle: "Let's talk about your project.",
    name: "Name", email: "Email", website: "Website (optional)", company: "Brand / Company (optional)",
    service: "Service", pkg: "Package (optional)", description: "Project description", goal: "Main goal",
    language: "Preferred language", select: "Select…", none: "None / not sure",
    submit: "Send Request", sending: "Sending…",
    doneTitle: "Thanks! Your request has been sent.", doneBody: "I'll get back to you shortly with the next steps.",
    error: "Something went wrong. Please try again or email Shamyosingh63@gmail.com.",
    services: ["Website Copy", "Landing Page", "SEO", "Email Copy", "Content Strategy", "Brand Messaging", "Package", "I'm not sure"],
  },
};

const selectClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function ContactPage() {
  useReveal();
  const c = useCopy(COPY);
  const { lang } = useLang();
  const { package: initialPackage } = Route.useSearch();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const g = (k: string) => String(d.get(k) ?? "");
    setState("sending");
    const res = await submitLeadDetailed({
      kind: "quote",
      name: g("name"), email: g("email"), website: g("website"), company: g("company"),
      service: g("service"), package: g("package"), description: g("description"), goal: g("goal"), language: g("language"),
    });
    setErrorDetail(res.ok ? "" : res.error);
    setState(res.ok ? "done" : "error");
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-32 h-96 w-96 rounded-full bg-brand/10 blur-3xl animate-float" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 pt-20 lg:px-8 lg:pt-28">
          <p className="reveal text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{c.eyebrow}</p>
          <h1 className="reveal mt-4 max-w-3xl font-heading text-5xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
            {c.h1a}<em className="not-italic text-brand">{c.h1b}</em>
          </h1>
          <p className="reveal mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{c.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div id="preventivo" className="reveal rounded-[2rem] border border-border/60 bg-card/30 p-6 shadow-lg sm:p-10">
            {state === "done" ? (
              <div className="py-12 text-center" role="status">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-foreground">
                  <Send className="h-5 w-5" />
                </div>
                <h2 className="mt-6 font-heading text-3xl text-foreground">{c.doneTitle}</h2>
                <p className="mt-3 text-muted-foreground">{c.doneBody}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
                <h2 className="font-heading text-3xl text-foreground sm:col-span-2">{c.formTitle}</h2>
                <div className="space-y-2"><Label htmlFor="name">{c.name}</Label><Input id="name" name="name" required maxLength={100} autoComplete="name" /></div>
                <div className="space-y-2"><Label htmlFor="email">{c.email}</Label><Input id="email" name="email" type="email" required maxLength={160} autoComplete="email" /></div>
                <div className="space-y-2"><Label htmlFor="website">{c.website}</Label><Input id="website" name="website" maxLength={200} placeholder="www.…" /></div>
                <div className="space-y-2"><Label htmlFor="company">{c.company}</Label><Input id="company" name="company" maxLength={120} /></div>
                <div className="space-y-2">
                  <Label htmlFor="service">{c.service}</Label>
                  <select id="service" name="service" required defaultValue={initialPackage ? c.services[6] : ""} className={selectClass}>
                    <option value="" disabled>{c.select}</option>
                    {c.services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="package">{c.pkg}</Label>
                  <select id="package" name="package" defaultValue={initialPackage ?? ""} className={selectClass}>
                    <option value="">{c.none}</option>
                    {PACKAGES.map((p) => <option key={p.id} value={p.id}>{p.id} — {p.subtitle}</option>)}
                  </select>
                </div>
                <div className="space-y-2 sm:col-span-2"><Label htmlFor="description">{c.description}</Label><Textarea id="description" name="description" rows={4} required maxLength={2000} /></div>
                <div className="space-y-2"><Label htmlFor="goal">{c.goal}</Label><Input id="goal" name="goal" required maxLength={600} /></div>
                <div className="space-y-2">
                  <Label htmlFor="language">{c.language}</Label>
                  <select id="language" name="language" key={lang} defaultValue={lang === "it" ? "Italiano" : "English"} className={selectClass}>
                    <option value="Italiano">Italiano</option>
                    <option value="English">English</option>
                  </select>
                </div>
                {state === "error" ? (
                  <div role="alert" className="text-sm text-destructive sm:col-span-2">
                    <p>{c.error}</p>
                    {errorDetail ? <p className="mt-1 break-words text-xs opacity-80">{errorDetail}</p> : null}
                  </div>
                ) : null}
                <Button type="submit" disabled={state === "sending"} className="w-full rounded-full bg-brand py-6 text-sm font-semibold uppercase tracking-[0.1em] text-brand-foreground shadow-xl shadow-brand/20 hover:opacity-90 sm:col-span-2">
                  {state === "sending" ? c.sending : c.submit}
                </Button>
              </form>
            )}
          </div>

          <div className="reveal flex flex-col justify-between gap-10">
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-3xl text-foreground">Preferisci scrivermi direttamente?</h2>
                <p className="mt-3 text-muted-foreground">Sono raggiungibile su email e social. Rispondo sempre.</p>
              </div>
              <div className="space-y-4">
                <a href="mailto:Shamyosingh63@gmail.com" className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-background p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  <Mail className="h-5 w-5 text-brand" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</p>
                    <p className="text-base font-medium text-foreground">Shamyosingh63@gmail.com</p>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/shamyo-singh-824053304" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-background p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  <Linkedin className="h-5 w-5 text-brand" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">LinkedIn</p>
                    <p className="text-base font-medium text-foreground">shamyo-singh</p>
                  </div>
                </a>
                <a href="https://www.instagram.com/_sham_y0/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-background p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  <Instagram className="h-5 w-5 text-brand" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Instagram</p>
                    <p className="text-base font-medium text-foreground">@_sham_y0</p>
                  </div>
                </a>
                <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-background p-5">
                  <MapPin className="h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Location</p>
                    <p className="text-base font-medium text-foreground">Italia — remoto ovunque</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/30 p-6">
              <h3 className="font-heading text-xl text-foreground">Tempistiche</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex justify-between"><span>Risposta a richieste</span><span className="font-medium text-foreground">Entro 24h</span></li>
                <li className="flex justify-between"><span>Proposta personalizzata</span><span className="font-medium text-foreground">2–3 giorni</span></li>
                <li className="flex justify-between"><span>Avvio progetto</span><span className="font-medium text-foreground">Su disponibilità</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
