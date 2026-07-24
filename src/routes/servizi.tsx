import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, PenLine, FileText, Megaphone, Mail, BookOpen, Sparkles } from "lucide-react";

export const Route = createFileRoute("/servizi")({
  head: () => ({
    meta: [
      { title: "Servizi — Alessia Rossi Copywriter" },
      { name: "description", content: "Scopri i servizi di copywriting per brand, contenuti web, copy pubblicitario, email marketing e strategia editoriale." },
      { property: "og:title", content: "Servizi — Alessia Rossi Copywriter" },
      { property: "og:description", content: "Scopri i servizi di copywriting per brand, contenuti web, copy pubblicitario, email marketing e strategia editoriale." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: PenLine,
    title: "Brand Voice",
    description:
      "Definisco il tono di voce del tuo brand partendo dalla tua identità, dai tuoi valori e dal pubblico che vuoi attrarre. Il risultato è un linguaggio distintivo, coerente e immediatamente riconoscibile su ogni canale.",
    deliverables: ["Tone of voice guidelines", "Messaging framework", "Glossario del brand"],
  },
  {
    icon: FileText,
    title: "Contenuti web",
    description:
      "Dalle landing page ai blog post, passando per le schede prodotto: scrivo testi pensati per essere letti fino in fondo, condivisi e per guidare l'utente verso l'azione.",
    deliverables: ["Landing page", "Blog post", "Schede prodotto", "SEO copy"],
  },
  {
    icon: Megaphone,
    title: "Copy pubblicitario",
    description:
      "Headline che fermano lo scroll, claim che restano in testa, pay-off che sintetizzano un'intera filosofia. Per campagne digital, print e out-of-home.",
    deliverables: ["Headline e claim", "Pay-off", "Script radio/TV", "Copy per social ads"],
  },
  {
    icon: Mail,
    title: "Email marketing",
    description:
      "Creo sequenze di email che non finiscono nella spam: welcome flow, newsletter, launch sequence e campagne di riattivazione, con un tono che costruisce fiducia.",
    deliverables: ["Welcome flow", "Newsletter", "Launch sequence", "Re-engagement"],
  },
  {
    icon: BookOpen,
    title: "Content strategy",
    description:
      "Piano editoriale, calendario contenuti e linee guida per mantenere alta la qualità della comunicazione nel tempo, senza perdere di vista gli obiettivi di business.",
    deliverables: ["Piano editoriale", "Content audit", "Calendario contenuti", "Brief creativi"],
  },
  {
    icon: Sparkles,
    title: "Revisione e editing",
    description:
      "Hai già un testo? Lo revisiono per renderlo più incisivo, scorrevole e aderente al tuo tono di voce. Dalla correzione bozze al rewriting completo.",
    deliverables: ["Proofreading", "Copy editing", "Rewriting", "Localizzazione italiano"],
  },
];

function ServicesPage() {
  return (
    <>
      {/* Page header */}
      <section className="mx-auto max-w-7xl px-6 pt-20 lg:px-8 lg:pt-28">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Servizi</p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl text-foreground sm:text-5xl lg:text-6xl">
          Tutto ciò di cui le tue parole hanno bisogno
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Dalla strategia al singolo claim, offro un approccio flessibile: posso seguirti su un progetto specifico o diventare la tua copywriter di riferimento.
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
              <service.icon className="h-7 w-7 text-muted-foreground" />
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
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Richiedi una proposta
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
