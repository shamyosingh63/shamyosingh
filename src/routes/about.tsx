import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import aboutImage from "../assets/about-copywriter.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Alessia Rossi Copywriter" },
      { name: "description", content: "Copywriter freelance con anni di esperienza in brand voice, contenuti web e strategia editoriale. Scopri il mio approccio e i miei valori." },
      { property: "og:title", content: "About — Alessia Rossi Copywriter" },
      { property: "og:description", content: "Copywriter freelance con esperienza in brand voice, contenuti web e strategia editoriale." },
      { property: "og:image", content: aboutImage },
      { name: "twitter:image", content: aboutImage },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    title: "Ascolto",
    description: "Ogni progetto parte da una conversazione. Capire chi sei e cosa vuoi dire è il primo passo per scrivere parole che suonino tue.",
  },
  {
    title: "Precisione",
    description: "Credo nella forza della parola giusta al posto giusto. Nessun riempitivo, nessuna frase che non porti valore.",
  },
  {
    title: "Curiosità",
    description: "Mi piace immergermi in settori nuovi, imparare il linguaggio del tuo pubblico e trovare angoli inaspettati per raccontare ciò che fai.",
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
              alt="Studio luminoso con laptop, carte e materiali editoriali"
              width={912}
              height={1104}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">About</p>
            <h1 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl lg:text-6xl">
              Ciao, sono Alessia
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Sono una copywriter freelance con una passione ossessiva per le parole giuste. Aiuto brand e professionisti a trovare la voce che li rende riconoscibili, a costruire messaggi che arrivano dritti a chi conta e a trasformare lettori in clienti.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Ho lavorato con startup, e-commerce, case editrici, ristoranti e studi professionali. Ogni progetto è una storia diversa, ma l'obiettivo è sempre lo stesso: dare alle parole il peso giusto.
            </p>
            <div className="mt-8 flex flex-wrap gap-8">
              <div>
                <p className="font-heading text-3xl text-foreground">8+</p>
                <p className="text-sm text-muted-foreground">anni di esperienza</p>
              </div>
              <div>
                <p className="font-heading text-3xl text-foreground">120+</p>
                <p className="text-sm text-muted-foreground">progetti completati</p>
              </div>
              <div>
                <p className="font-heading text-3xl text-foreground">50+</p>
                <p className="text-sm text-muted-foreground">brand accompagnati</p>
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
              role: "Copywriter freelance",
              company: "Studio personale",
              period: "2019 — oggi",
              description: "Progetti di brand voice, contenuti web, copy pubblicitario e strategia editoriale per clienti italiani e internazionali.",
            },
            {
              role: "Senior Copywriter",
              company: "Agenzia creativa Pixel",
              period: "2016 — 2019",
              description: "Ideazione e sviluppo di campagne integrate, pay-off, concept e copy per brand nel settore lifestyle, tech e food.",
            },
            {
              role: "Content Editor",
              company: "Rivista online The Post",
              period: "2014 — 2016",
              description: "Scrittura e revisione di articoli, gestione del piano editoriale e coordinamento di redazione.",
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
            className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
          >
            Scrivimi
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
