import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import portrait from "../assets/shamyo-portrait.jpg.asset.json";
import workspaceNotes from "../assets/workspace-notes.jpg";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Shamyo Singh Copywriter" },
      { name: "description", content: "Shamyo Singh, copywriter specializzato in contenuti strategici, landing page, email marketing e SEO. Parole autentiche, chiare e capaci di generare risultati." },
      { property: "og:title", content: "About — Shamyo Singh Copywriter" },
      { property: "og:description", content: "Copywriter specializzato in contenuti strategici, landing page, email marketing e SEO." },
      { property: "og:image", content: portrait.url },
      { name: "twitter:image", content: portrait.url },
    ],
  }),
  component: AboutPage,
});

const values = [
  { title: "Ascolto", description: "Ogni progetto parte da una conversazione. Capire chi sei, cosa vendi e a chi parli è il primo passo." },
  { title: "Strategia", description: "Non scrivo a caso. Ogni parola risponde a un obiettivo: posizionarti, farti trovare, convincere, vendere." },
  { title: "Risultati", description: "Il mio lavoro si misura in numeri: traffico, conversioni, aperture, vendite. La creatività senza risultati è rumore." },
];

function AboutPage() {
  useReveal();

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 top-40 h-96 w-96 rounded-full bg-brand/10 blur-3xl animate-float-slow" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pt-20 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:pt-28">
          <div className="reveal tilt-card relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-card shadow-2xl">
            <img src={portrait.url} alt="Ritratto di Shamyo Singh" width={1008} height={1260} className="h-full w-full object-cover" />
          </div>
          <div className="reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">About</p>
            <h1 className="mt-4 font-heading text-5xl leading-[1.05] text-foreground sm:text-6xl">
              Ciao, sono <em className="not-italic text-brand">Shamyo.</em>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Copywriter specializzato nella creazione di contenuti strategici, pagine web persuasive, email marketing e testi ottimizzati per i motori di ricerca.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Il mio obiettivo è semplice: aiutare aziende e professionisti a comunicare il proprio valore con parole autentiche, chiare e capaci di generare risultati.
            </p>
            <p className="mt-6 font-heading text-2xl italic text-foreground">
              Perché un buon testo non deve solo essere letto. Deve essere ricordato.
            </p>
            <div className="mt-10 flex flex-wrap gap-8">
              <div><p className="font-heading text-4xl text-foreground">60+</p><p className="text-sm text-muted-foreground">brand accompagnati</p></div>
              <div><p className="font-heading text-4xl text-foreground">6</p><p className="text-sm text-muted-foreground">aree di specializzazione</p></div>
              <div><p className="font-heading text-4xl text-foreground">∞</p><p className="text-sm text-muted-foreground">tazze di caffè</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="reveal grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">La mia filosofia</p>
            <h2 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl">
              Prima ascolto.<br /><em className="not-italic text-brand">Poi scrivo.</em>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Ogni progetto nasce dalla comprensione. Prima di mettere una parola sul foglio studio il pubblico, gli obiettivi, il mercato, la voce dell'azienda e il problema che vuole risolvere. Solo dopo nasce il testo.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Il copywriting efficace non riguarda il riempire una pagina di frasi belle. Riguarda trovare il messaggio giusto per la persona giusta.
            </p>
          </div>
          <div className="tilt-card relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl">
            <img src={workspaceNotes} alt="Appunti scritti a mano" width={1600} height={1200} loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <h2 className="reveal font-heading text-4xl text-foreground sm:text-5xl">Il mio modo di lavorare</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map((value, i) => (
              <div
                key={value.title}
                className="reveal tilt-card rounded-3xl border border-border/60 bg-background p-8 shadow-sm transition-all hover:shadow-xl"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <h3 className="font-heading text-3xl text-brand">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="reveal relative overflow-hidden rounded-[2.5rem] bg-primary p-10 text-primary-foreground shadow-2xl sm:p-16">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand/30 blur-3xl" />
          </div>
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-heading text-4xl sm:text-5xl">Lavoriamo insieme?</h2>
              <p className="mt-4 max-w-lg text-primary-foreground/80">
                Se cerchi un copywriter che ascolti, capisca e scriva con cura, sono qui.
              </p>
            </div>
            <Link to="/contatti" className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-brand-foreground shadow-xl transition-all hover:-translate-y-1">
              Scrivimi
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
