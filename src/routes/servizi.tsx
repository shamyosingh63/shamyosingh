import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, Search, PenLine, Layout, Mail } from "lucide-react";

export const Route = createFileRoute("/servizi")({
  head: () => ({
    meta: [
      { title: "Servizi — Shamyo Singh Copywriter" },
      { name: "description", content: "Scopri i servizi di copywriting, SEO, content marketing, landing page e email marketing di Shamyo Singh." },
      { property: "og:title", content: "Servizi — Shamyo Singh Copywriter" },
      { property: "og:description", content: "Scopri i servizi di copywriting, SEO, content marketing, landing page e email marketing." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: FileText,
    title: "Copywriting Blog & Article Writing",
    description:
      "Articoli e post di blog pensati per informare, coinvolgere e costruire autorità nel tuo settore. Ogni contenuto è studiato sul tono di voce del brand e sugli obiettivi del lettore.",
    deliverables: ["Articoli di blog", "Guest post", "Content pillar", "Editorial calendar"],
  },
  {
    icon: Search,
    title: "SEO Audits & Content Optimization",
    description:
      "Analisi completa dei contenuti esistenti e ottimizzazione SEO on-page: keyword research, struttura, meta tag e copy che aiutano Google a capire chi sei e cosa offri.",
    deliverables: ["SEO audit", "Keyword research", "Ottimizzazione on-page", "Content refresh"],
  },
  {
    icon: PenLine,
    title: "AI-Assisted Content & Content Marketing",
    description:
      "Strategie di content marketing potenziate dall'intelligenza artificiale, con supervisione umana a ogni passaggio. Più efficienza, senza perdere il tocco personale.",
    deliverables: ["Content strategy", "AI-assisted drafting", "Editing umano", "Distribuzione"],
  },
  {
    icon: Layout,
    title: "Landing Page Copywriting",
    description:
      "Testi per landing page che guidano il visitatore verso l'azione: headline, body copy, call to action e proof element organizzati per massimizzare conversioni.",
    deliverables: ["Headline & hook", "Body copy", "Call to action", "A/B test variants"],
  },
  {
    icon: Mail,
    title: "Email Sales & Soap Opera Sequences",
    description:
      "Sequenze email che raccontano una storia, creano suspense e portano il lettore a una decisione di acquisto. Dalle welcome series ai lanci a tempo limitato.",
    deliverables: ["Soap opera sequences", "Launch emails", "Welcome flow", "Re-engagement"],
  },
];

function ServicesPage() {
  return (
    <>
      {/* Page header */}
      <section className="mx-auto max-w-7xl px-6 pt-20 lg:px-8 lg:pt-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Servizi</p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl text-foreground sm:text-5xl lg:text-6xl">
          Tutto ciò di cui le tue parole hanno bisogno
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Dalla strategia al singolo articolo, offro un approccio flessibile: posso seguirti su un progetto specifico o diventare la tua copywriter di riferimento.
        </p>
      </section>

      {/* Services grid */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="flex flex-col rounded-2xl border border-border/60 bg-card/30 p-8 transition-colors hover:border-border"
            >
              <service.icon className="h-7 w-7 text-brand" />
              <h2 className="mt-6 font-heading text-2xl text-foreground">{service.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
              <ul className="mt-6 space-y-2">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="h-1 w-1 rounded-full bg-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-border/50 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <h2 className="font-heading text-3xl text-foreground sm:text-4xl">Come lavoriamo insieme</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Brief",
                description: "Partiamo dal tuo progetto, i tuoi obiettivi e il pubblico che vuoi raggiungere.",
              },
              {
                step: "02",
                title: "Proposta",
                description: "Ti presento un piano di lavoro, tempistiche e investimento trasparenti.",
              },
              {
                step: "03",
                title: "Copy",
                description: "Sviluppo i testi con revisioni incluse, fino a quando non sarai soddisfatto.",
              },
            ].map((item) => (
              <div key={item.step} className="relative pl-12">
                <span className="absolute left-0 top-0 font-heading text-4xl text-muted-foreground/40">
                  {item.step}
                </span>
                <h3 className="font-heading text-xl text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-border/60 bg-background p-8 sm:p-12 lg:flex-row lg:items-center lg:p-16">
          <div>
            <h2 className="font-heading text-3xl text-foreground sm:text-4xl">Pronta a iniziare?</h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Scrivimi per raccontarmi il tuo progetto. Risponderò entro 24 ore con una proposta su misura.
            </p>
          </div>
          <Link
            to="/contatti"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-brand-foreground transition-opacity hover:opacity-90"
          >
            Richiedi una proposta
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
