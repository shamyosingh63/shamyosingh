import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SITE_URL, OG_IMAGE_URL } from "@/lib/seo";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Shamyo Singh Copywriter" },
      { name: "description", content: "Portfolio di copywriting, SEO, content strategy, landing page e email marketing per clienti come Save the Children, Tecnocasa, Fenice Academy e altri." },
      { property: "og:title", content: "Portfolio — Shamyo Singh Copywriter" },
      { property: "og:description", content: "Portfolio di copywriting, SEO, content strategy, landing page e email marketing." },
      { property: "og:url", content: `${SITE_URL}/portfolio` },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:title", content: "Portfolio — Shamyo Singh Copywriter" },
      { name: "twitter:description", content: "Portfolio di copywriting, SEO, content strategy, landing page e email marketing." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/portfolio` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": "https://shamyosingh.vercel.app/portfolio/#collection",
          name: "Portfolio — Shamyo Singh Copywriter",
          description:
            "Una selezione di progetti di copywriting, SEO, content strategy, landing page e email marketing per istituzioni, brand locali, agenzie e aziende.",
          url: "https://shamyosingh.vercel.app/portfolio",
          isPartOf: { "@id": "https://shamyosingh.vercel.app/#website" },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: projects.map((project, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "CreativeWork",
                name: project.title,
                description: project.description,
                about: project.client,
                genre: project.category,
                creator: { "@id": "https://shamyosingh.vercel.app/#organization" },
              },
            })),
          },
        }),
      },
    ],
  }),
  component: PortfolioPage,
});

const projects = [
  {
    client: "Save the Children",
    category: "SEO Content & Copywriting",
    title: "Contenuti che fanno la differenza",
    description:
      "Produzione di contenuti SEO e copywriting per campagne istituzionali. Obiettivo: raccontare il cambiamento sociale con parole chiare e coinvolgenti.",
    result: "+45% traffico organico",
  },
  {
    client: "Tecnocasa",
    category: "SEO Content",
    title: "Contenuti che vendono immobili",
    description:
      "Ottimizzazione e creazione di contenuti SEO per il settore immobiliare, con focus su local search e intento d'acquisto.",
    result: "+60% visibilità locale",
  },
  {
    client: "Fenice Academy",
    category: "Landing Page, Email & Funnel",
    title: "Landing page che convertiono",
    description:
      "Copy per landing page di lancio, sequenze email e funnel di vendita per un'accademia di formazione digitale.",
    result: "+32% tasso di conversione",
  },
  {
    client: "Isola del Vento",
    category: "Copywriting & Content Strategy",
    title: "Raccontare un territorio",
    description:
      "Content strategy e copywriting per un brand legato al turismo e all'ospitalità, con focus su storytelling locale ed esperienze.",
    result: "+2.8x engagement social",
  },
  {
    client: "Lega Navale",
    category: "Web Copy & SEO",
    title: "Vela, mare e tradizione",
    description:
      "Contenuti web e ottimizzazione SEO per una delle più antiche istituzioni nautiche italiane.",
    result: "+38% traffico organico",
  },
  {
    client: "Swag Marketing",
    category: "Copywriting & Content Marketing",
    title: "Brand voice per il mondo digital",
    description:
      "Copywriting e content marketing per un'agenzia di marketing, con focus su tone of voice e contenuti B2B.",
    result: "+50% lead qualificati",
  },
];

function PortfolioPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-20 lg:px-8 lg:pt-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Portfolio</p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl text-foreground sm:text-5xl lg:text-6xl">
          Parole che hanno lasciato il segno
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Una selezione di progetti recenti: istituzioni, brand locali, agenzie e aziende che hanno scelto le mie parole per crescere.
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
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">{project.category}</p>
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
