import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, PenLine, FileText, Search, Layout, Mail } from "lucide-react";

import heroImage from "../assets/hero-shamyo.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shamyo Singh — Copywriter & Content Strategist" },
      { name: "description", content: "Copywriter freelance e content strategist. Scrivo parole che posizionano, persuadono e vendono per brand, aziende e istituzioni." },
      { property: "og:title", content: "Shamyo Singh — Copywriter & Content Strategist" },
      { property: "og:description", content: "Copywriter freelance e content strategist. Scrivo parole che posizionano, persuadono e vendono." },
      { property: "og:image", content: heroImage },
      { name: "twitter:image", content: heroImage },
    ],
  }),
  component: HomePage,
});

const services = [
  {
    icon: FileText,
    title: "Copywriting Blog & Article Writing",
    description: "Articoli e contenuti blog pensati per informare, coinvolgere e posizionarti come voce autorevole nel tuo settore.",
  },
  {
    icon: Search,
    title: "SEO Audits & Content Optimization",
    description: "Analisi SEO e ottimizzazione dei contenuti per farti trovare dalle persone giuste nel momento giusto.",
  },
  {
    icon: PenLine,
    title: "AI-Assisted Content & Content Marketing",
    description: "Strategie content marketing potenziate dall'intelligenza artificiale, con il tocco umano che fa la differenza.",
  },
  {
    icon: Layout,
    title: "Landing Page Copywriting",
    description: "Testi per landing page che guidano il lettore verso l'azione: iscrizione, acquisto, contatto.",
  },
  {
    icon: Mail,
    title: "Email Sales & Soap Opera Sequences",
    description: "Sequenze email che raccontano una storia, costruiscono desiderio e portano a vendite concrete.",
  },
];

const featuredWork = [
  { client: "Save the Children", category: "SEO & Copywriting", title: "Contenuti che fanno la differenza" },
  { client: "Fenice Academy", category: "Funnel & Email Marketing", title: "Landing page che convertiono" },
  { client: "Isola del Vento", category: "Content Strategy", title: "Raccontare un territorio" },
];

const clients = [
  "Fenice Academy",
  "Isola del Vento",
  "Lega Navale",
  "Swag Marketing",
  "Tecnocasa",
  "Save the Children",
  "Travel & Hospitality",
  "Restaurants Palermo",
];

function HomePage() {
  return (
    <>
      {/* Hero — Editorial centered layout */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-16 text-center lg:px-8 lg:pt-14 lg:pb-24">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Copywriter & Content Strategist
          </p>
          <h1 className="mx-auto mt-8 max-w-4xl font-heading text-4xl leading-[1.1] text-foreground sm:text-5xl lg:text-6xl">
            It's time to make more money with your{" "}
            <em className="not-italic text-brand">words.</em>
          </h1>

          <div className="relative mx-auto mt-10 max-w-5xl">
            <div className="relative aspect-[16/10] overflow-hidden rounded-none border-[12px] border-background bg-card shadow-2xl sm:border-[20px]">
              <img
                src={heroImage}
                alt="Shamyo Singh al lavoro su un laptop in un ambiente editoriale"
                width={1408}
                height={1008}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            </div>

            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/servizi"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] text-brand-foreground transition-opacity hover:opacity-90"
              >
                Scopri i servizi
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contatti"
                className="inline-flex items-center rounded-full border border-foreground/20 bg-background px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] text-foreground transition-colors hover:bg-card/50"
              >
                Lavora con me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="border-t border-border/50 bg-card/30 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {clients.map((client) => (
              <span
                key={client}
                className="font-heading text-lg text-foreground/80 sm:text-xl"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Cosa faccio</p>
            <h2 className="mt-3 font-heading text-3xl text-foreground sm:text-4xl">Servizi su misura</h2>
          </div>
          <Link
            to="/servizi"
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            Vedi tutti i servizi <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl border border-border/60 bg-background p-8 transition-colors hover:border-border"
            >
              <service.icon className="h-7 w-7 text-brand transition-colors" />
              <h3 className="mt-6 font-heading text-xl text-foreground">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured work */}
      <section className="border-t border-border/50 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Portfolio</p>
              <h2 className="mt-3 font-heading text-3xl text-foreground sm:text-4xl">Progetti selezionati</h2>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Vedi tutti i progetti <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-px bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
            {featuredWork.map((work, index) => (
              <article
                key={index}
                className="group bg-background p-8 transition-colors hover:bg-card/30"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">{work.category}</p>
                <h3 className="mt-4 font-heading text-2xl text-foreground">{work.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{work.client}</p>
                <div className="mt-6 h-px w-8 bg-border transition-all group-hover:w-16" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quote / testimonial */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-8 lg:py-28">
        <blockquote className="font-heading text-2xl leading-snug text-foreground sm:text-3xl lg:text-4xl">
          “Shamyo ha trasformato il nostro modo di comunicare online. I contenuti sono chiari, persuasivi e portano risultati concreti.”
        </blockquote>
        <p className="mt-6 text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">
          — Team Marketing, Fenice Academy
        </p>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8 lg:pb-28">
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12 lg:flex-row lg:items-center lg:p-16">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl">Hai un progetto in mente?</h2>
            <p className="mt-4 max-w-lg text-primary-foreground/80">
              Raccontami il tuo brand, i tuoi obiettivi e il pubblico che vuoi raggiungere. Insieme troviamo le parole giuste.
            </p>
          </div>
          <Link
            to="/contatti"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-brand-foreground transition-opacity hover:opacity-90"
          >
            Inizia una conversazione
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
