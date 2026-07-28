import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Send, Linkedin, Instagram } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useReveal } from "@/hooks/use-reveal";
import { SITE_URL, OG_IMAGE_URL } from "@/lib/seo";

export const Route = createFileRoute("/contatti")({
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

const services = [
  "Copywriting",
  "Blog & Article Writing",
  "SEO Audits & Content Optimization",
  "AI-Assisted Content",
  "Landing Pages",
  "Email Sales & Sequences",
  "Altro",
];

function ContactPage() {
  useReveal();
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service],
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const company = data.get("company");
    const message = data.get("message");
    const body = `Nome: ${name}\nEmail: ${email}\nAzienda: ${company}\nServizi: ${selectedServices.join(", ")}\n\n${message}`;
    window.location.href = `mailto:Shamyosingh63@gmail.com?subject=${encodeURIComponent("Nuovo progetto — " + name)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-32 h-96 w-96 rounded-full bg-brand/10 blur-3xl animate-float" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 pt-20 lg:px-8 lg:pt-28">
          <p className="reveal text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Contatti</p>
          <h1 className="reveal mt-4 max-w-3xl font-heading text-5xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
            Raccontami il tuo <em className="not-italic text-brand">progetto.</em>
          </h1>
          <p className="reveal mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Ogni grande comunicazione nasce da una semplice conversazione. Compila il form o scrivimi direttamente: rispondo entro 24 ore lavorative.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal tilt-card rounded-[2rem] border border-border/60 bg-card/30 p-8 shadow-lg sm:p-10">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-foreground">
                  <Send className="h-5 w-5" />
                </div>
                <h2 className="mt-6 font-heading text-3xl text-foreground">Messaggio inviato!</h2>
                <p className="mt-3 text-muted-foreground">Grazie per avermi contattato. Ti risponderò al più presto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome e cognome</Label>
                  <Input id="name" name="name" type="text" placeholder="Mario Rossi" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="mario@esempio.it" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Azienda / brand (opzionale)</Label>
                  <Input id="company" name="company" type="text" placeholder="Il tuo brand" />
                </div>
                <div className="space-y-3">
                  <Label>Servizi di interesse</Label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`rounded-full border px-4 py-2 text-sm transition-all ${
                          selectedServices.includes(service)
                            ? "border-brand bg-brand text-brand-foreground shadow-md shadow-brand/20"
                            : "border-border/60 bg-background text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Messaggio</Label>
                  <Textarea id="message" name="message" placeholder="Descrivimi il tuo progetto, i tuoi obiettivi e le tempistiche..." rows={5} required />
                </div>
                <Button type="submit" className="w-full rounded-full bg-brand py-6 text-sm font-semibold uppercase tracking-[0.1em] text-brand-foreground shadow-xl shadow-brand/20 hover:opacity-90">
                  Invia richiesta
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
