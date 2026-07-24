import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, PenLine, FileText, Megaphone, BookOpen } from "lucide-react";

import heroImage from "../assets/hero-copywriter.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alessia Rossi — Copywriter freelance" },
      { name: "description", content: "Copywriter freelance specializzata in brand voice, contenuti web e strategia editoriale. Do alle parole il peso giusto per raccontare brand, prodotti e persone." },
      { property: "og:title", content: "Alessia Rossi — Copywriter freelance" },
      { property: "og:description", content: "Copywriter freelance specializzata in brand voice, contenuti web e strategia editoriale." },
      { property: "og:image", content: heroImage },
      { name: "twitter:image", content: heroImage },
    ],
  }),
  component: HomePage,
});

const services = [
  {
    icon: PenLine,
    title: "Brand Voice",
    description: "Definisco il tono di voce del tuo brand: distintivo, coerente e riconoscibile in ogni canale.",
  },
  {
    icon: FileText,
    title: "Contenuti web",
    description: "Dalle landing page ai blog post: testi pensati per essere letti, condivisi e convertire.",
  },
  {
    icon: Megaphone,
    title: "Copy pubblicitario",
    description: "Headline, claim, pay-off e campagne che colpiscono al primo sguardo e restano in testa.",
  },
];

const featuredWork = [
  { client: "Bottega Verde", category: "Brand Voice", title: "Raccontare la bellezza naturale" },
  { client: "FintechFlow", category: "Landing Page", title: "Semplificare il complesso" },
  { client: "Casa editrice Zeta", category: "Social Copy", title: "Vendere libri in tre righe" },
];

function HomePage() {
  return (
    <>
      {/* Hero — Split Screen */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid min-h-[calc(100vh-88px)] items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Copywriter freelance
            </p>
            <h1 className="mt-6 font-heading text-4xl leading-[1.1] text-foreground sm:text-5xl lg:text-6xl">
              Parole che vendono, <em className="not-italic underline decoration-1 underline-offset-4">emozionano</em>, restano.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Do alle parole il peso giusto per raccontare brand, prodotti e persone. Strategia, creatività e un pizzico di ossessione per la virgola.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/servizi"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Scopri i servizi
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contatti"
                className="inline-flex items-center rounded-full border border-input bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Scrivimi
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-card">
              <img
                src={heroImage}
                alt="Scrivania editoriale con macchina da scrivere, quaderno aperto e penna"
                width={1200}
                height={912}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="border-t border-border/50 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Cosa faccio</p>
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
                <service.icon className="h-7 w-7 text-muted-foreground transition-colors group-hover:text-foreground" />
                <h3 className="mt-6 font-heading text-xl text-foreground">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Portfolio</p>
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
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{work.category}</p>
              <h3 className="mt-4 font-heading text-2xl text-foreground">{work.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{work.client}</p>
              <div className="mt-6 h-px w-8 bg-border transition-all group-hover:w-16" />
            </article>
          ))}
        </div>
      </section>

      {/* Quote / testimonial */}
      <section className="border-t border-border/50 bg-card/30">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-8 lg:py-28">
          <BookOpen className="mx-auto h-8 w-8 text-muted-foreground" />
          <blockquote className="mt-8 font-heading text-2xl leading-snug text-foreground sm:text-3xl lg:text-4xl">
            “Alessia ha trasformato il nostro modo di comunicare. Ogni parola sembra pensata apposta per chi ci legge.”
          </blockquote>
          <p className="mt-6 text-sm font-medium text-muted-foreground">— Marco Bianchi, CEO di FintechFlow</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12 lg:flex-row lg:items-center lg:p-16">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl">Hai un progetto in mente?</h2>
            <p className="mt-4 max-w-lg text-primary-foreground/80">
              Raccontami il tuo brand, i tuoi obiettivi e il pubblico che vuoi raggiungere. Insieme troviamo le parole giuste.
            </p>
          </div>
          <Link
            to="/contatti"
            className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
          >
            Inizia una conversazione
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
