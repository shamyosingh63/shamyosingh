import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import aboutImage from "../assets/about-shamyo.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Shamyo Singh Copywriter" },
      { name: "description", content: "Conosci Shamyo Singh: copywriter e content strategist con esperienza in SEO, landing page, email marketing e content strategy per brand italiani e internazionali." },
      { property: "og:title", content: "About — Shamyo Singh Copywriter" },
      { property: "og:description", content: "Conosci Shamyo Singh: copywriter e content strategist con esperienza in SEO, landing page, email marketing e content strategy." },
      { property: "og:image", content: aboutImage },
      { name: "twitter:image", content: aboutImage },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    title: "Ascolto",
    description: "Ogni progetto parte da una conversazione. Capire chi sei, cosa vendi e a chi parli è il primo passo per scrivere parole che suonino tue.",
  },
  {
    title: "Strategia",
    description: "Non scrivo a caso. Ogni parola risponde a un obiettivo: posizionarti, farti trovare, convincere, vendere o fidelizzare.",
  },
  {
    title: "Risultati",
    description: "Mi piace che il mio lavoro si misuri in numeri: traffico, conversioni, aperture, vendite. La creatività senza risultati è solo rumore.",
  },
];

function AboutPage() {
  return (
    <>
      {/* Hero — Split Screen */}
      <section className="mx-auto max-w-7xl px-6 pt-20 lg:px-8 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-card lg:aspect-[4/5]">
            <img
              src={aboutImage}
              alt="Shamyo Singh nel suo studio creativo"
              width={1008}
              height={1200}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">About</p>
            <h1 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl lg:text-6xl">
              Ciao, sono Shamyo
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Sono una copywriter e content strategist con una passione ossessiva per le parole giuste. Aiuto brand, aziende e istituzioni a trovare la voce che li rende riconoscibili, a costruire messaggi che arrivano dritti a chi conta e a trasformare lettori in clienti.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Ho lavorato con realtà come Save the Children, Tecnocasa, Fenice Academy, Isola del Vento, Lega Navale e Swag Marketing, oltre a oltre 60 brand e aziende in settori diversi: hospitality, ristorazione, travel, istituzioni e marketing.
            </p>
            <div className="mt-8 flex flex-wrap gap-8">
              <div>
                <p className="font-heading text-3xl text-foreground">60+</p>
                <p className="text-sm text-muted-foreground">brand accompagnati</p>
              </div>
              <div>
                <p className="font-heading text-3xl text-foreground">5</p>
                <p className="text-sm text-muted-foreground">aree di specializzazione</p>
              </div>
              <div>
                <p className="font-heading text-3xl text-foreground">∞</p>
                <p className="text-sm text-muted-foreground">tazze di caffè</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mt-20 border-t border-border/50 bg-card/30 lg:mt-28">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <h2 className="font-heading text-3xl text-foreground sm:text-4xl">Il mio modo di lavorare</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-border/60 bg-background p-8">
                <h3 className="font-heading text-2xl text-foreground">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <h2 className="font-heading text-3xl text-foreground sm:text-4xl">Esperienza</h2>
        <div className="mt-12 space-y-8">
          {[
            {
              role: "Copywriter & Content Strategist",
              company: "Freelance",
              period: "In corso",
              description: "Progetti di copywriting, SEO, content strategy, landing page e email marketing per brand italiani e internazionali.",
            },
            {
              role: "Content Specialist",
              company: "Agenzie e brand",
              period: "Passati",
              description: "Collaborazioni con agenzie di marketing, istituzioni e aziende per contenuti web, SEO e strategia editoriale.",
            },
          ].map((item) => (
            <div
              key={item.role}
              className="flex flex-col gap-2 border-b border-border/60 pb-8 md:flex-row md:items-start md:justify-between"
            >
              <div>
                <h3 className="font-heading text-xl text-foreground">{item.role}</h3>
                <p className="text-sm text-muted-foreground">{item.company}</p>
              </div>
              <p className="text-sm font-medium text-muted-foreground md:text-right">{item.period}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8 lg:pb-28">
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12 lg:flex-row lg:items-center lg:p-16">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl">Lavoriamo insieme?</h2>
            <p className="mt-4 max-w-lg text-primary-foreground/80">
              Se cerchi una copywriter che ascolti, capisca e scriva con cura, sono qui.
            </p>
          </div>
          <Link
            to="/contatti"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-brand-foreground transition-opacity hover:opacity-90"
          >
            Scrivimi
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
