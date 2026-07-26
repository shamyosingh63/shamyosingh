import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

import writerDesk from "../assets/writer-desk.jpg.asset.json";
import handwriting from "../assets/handwriting.jpg.asset.json";
import collage from "../assets/storytelling-collage.jpeg.asset.json";
import bookshelf from "../assets/bookshelf.jpg.asset.json";
import handsDetail from "../assets/hands-detail.jpg.asset.json";
import magazinesStack from "../assets/magazines-stack.jpg";
import workspaceNotes from "../assets/workspace-notes.jpg";

type Item = {
  src: string;
  alt: string;
  client: string;
  category: string;
  metric: string;
  ratio: string;
};

const items: Item[] = [
  { src: collage.url, alt: "Collage editoriale di storytelling e copy", client: "Swag Marketing", category: "Brand voice & contenuti B2B", metric: "+50% lead qualificati", ratio: "aspect-[4/3]" },
  { src: writerDesk.url, alt: "Scrittore alla scrivania con macchina da scrivere", client: "Isola del Vento", category: "Content strategy & storytelling", metric: "+2.8x engagement", ratio: "aspect-[3/4]" },
  { src: handwriting.url, alt: "Mano che scrive appunti su un quaderno", client: "Fenice Academy", category: "Landing page & funnel email", metric: "+32% conversioni", ratio: "aspect-[3/2]" },
  { src: bookshelf.url, alt: "Libreria editoriale con riviste e libri d'arte", client: "Save the Children", category: "SEO content & copywriting", metric: "+45% traffico organico", ratio: "aspect-[4/5]" },
  { src: magazinesStack, alt: "Pila di riviste editoriali", client: "Tecnocasa", category: "SEO locale & contenuti web", metric: "+60% visibilità locale", ratio: "aspect-[4/3]" },
  { src: handsDetail.url, alt: "Dettaglio di mani al lavoro", client: "Lega Navale", category: "Web copy & SEO", metric: "+38% traffico organico", ratio: "aspect-[1/1]" },
  { src: workspaceNotes.url ?? workspaceNotes, alt: "Appunti di lavoro su carta", client: "Ristorazione locale", category: "Copy sito & campagne stagionali", metric: "+41% prenotazioni dirette", ratio: "aspect-[3/2]" },
];

export function Gallery() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
      <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Gallery</p>
          <h2 className="mt-4 font-heading text-4xl leading-tight text-foreground sm:text-5xl">
            Ogni progetto nasce da una sfida.<br />
            <em className="not-italic text-brand">Ogni parola da una strategia.</em>
          </h2>
        </div>
        <Link
          to="/portfolio"
          className="group inline-flex items-center gap-2 self-start rounded-full border border-foreground/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-foreground transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
        >
          Esplora i casi studio
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-14 gap-5 [column-fill:_balance] sm:columns-2 lg:columns-3">
        {items.map((item, i) => (
          <figure
            key={item.client}
            className="reveal group relative mb-5 break-inside-avoid overflow-hidden rounded-[1.75rem] bg-card shadow-sm transition-shadow duration-500 hover:shadow-2xl"
            style={{ transitionDelay: `${(i % 3) * 70}ms` }}
          >
            <div className={`${item.ratio} overflow-hidden`}>
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.07]"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
            <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-6 opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-background/70">
                {item.category}
              </p>
              <h3 className="mt-2 font-heading text-2xl text-background">{item.client}</h3>
              <p className="mt-2 inline-flex rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground">
                {item.metric}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
