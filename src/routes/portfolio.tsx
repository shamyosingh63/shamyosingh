import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Alessia Rossi Copywriter" },
      { name: "description", content: "Portfolio di copywriting: brand voice, landing page, campagne pubblicitarie, contenuti web e strategia editoriale per clienti italiani e internazionali." },
      { property: "og:title", content: "Portfolio — Alessia Rossi Copywriter" },
      { property: "og:description", content: "Portfolio di copywriting: brand voice, landing page, campagne pubblicitarie, contenuti web e strategia editoriale." },
    ],
  }),
  component: PortfolioPage,
});

const projects = [
  {
    client: "Bottega Verde",
    category: "Brand Voice",
    title: "Raccontare la bellezza naturale",
    description:
      "Definizione del tone of voice e revisione di tutti i testi del nuovo e-commerce. Obiettivo: rendere il brand più vicino, autentico e distintivo.",
    result: "+18% tempo medio sul sito",
  },
  {
    client: "FintechFlow",
    category: "Landing Page",
    title: "Semplificare il complesso",
    description:
      "Copy per la landing page di lancio di un'app di gestione finanziaria. Ho tradotto concetti tecnici in parole comprensibili e persuasive.",
    result: "+34% conversioni",
  },
  {
    client: "Casa editrice Zeta",
    category: "Social Copy",
    title: "Vendere libri in tre righe",
    description:
      "Creazione di copy per campagne social di lancio di nuove uscite editoriali, con un tono che rispetta l'identità di ogni autore.",
    result: "+2.5x engagement",
  },
  {
    client: "Nuvola Software",
    category: "Email Marketing",
    title: "Email che si leggono davvero",
    description:
      "Riprogettazione del welcome flow e delle newsletter mensili. Più personalità, meno rumore, più aperture.",
    result: "+42% open rate",
  },
  {
    client: "Osteria Al Ponte",
    category: "Copy pubblicitario",
    title: "Il sapore della tradizione",
    description:
      "Pay-off, menu e copy per campagna locale. Testi che raccontano persone, ingredienti e territorio.",
    result: "Sold-out cene evento",
  },
  {
    client: "Architetti Associati",
    category: "Content Strategy",
    title: "Dare voce allo spazio",
    description:
      "Piano editoriale e blog post per uno studio di architettura. Contenuti che posizionano il team come punto di riferimento nel settore.",
    result: "+60% traffico organico",
  },
];

function PortfolioPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-20 lg:px-8 lg:pt-28">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Portfolio</p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl text-foreground sm:text-5xl lg:text-6xl">
          Parole che hanno lasciato il segno
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Una selezione di progetti recenti: brand voice, contenuti web, campagne pubblicitarie e strategia editoriale.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-px bg-border/60 md:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={index}
              className="group bg-background p-8 transition-colors hover:bg-card/30 sm:p-10 lg:p-12"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{project.category}</p>
                  <h2 className="mt-3 font-heading text-2xl text-foreground sm:text-3xl">{project.title}</h2>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
              <div className="mt-8 flex flex-col gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-medium text-foreground">{project.client}</p>
                <p className="text-sm text-muted-foreground">{project.result}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
